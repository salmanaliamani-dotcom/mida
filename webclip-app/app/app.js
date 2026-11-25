/* =====================================================================
 * MY APP — Web Clip / PWA application
 * Everything (name, images, tools, URLs) comes from ../config.json.
 * Runs identically inside: the Home Screen Web Clip, Safari, and the
 * native WKWebView wrapper (native-ios/), which takes over browsing.
 * ===================================================================== */
(() => {
  'use strict';

  const VERSION = '1.0.0';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const root = document.documentElement;

  /* ---------------- environment ---------------- */
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPod|iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isStandalone = navigator.standalone === true || matchMedia('(display-mode: standalone)').matches;
  const nativeBridge = window.webkit?.messageHandlers?.webclip || null;
  const isNative = !!nativeBridge;
  const postNative = msg => { try { nativeBridge.postMessage(msg); } catch {} };

  /* ---------------- storage ---------------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('webclip.' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem('webclip.' + k, JSON.stringify(v)); } catch {} },
    del(k) { try { localStorage.removeItem('webclip.' + k); } catch {} },
  };
  const DEFAULT_PREFS = { theme: 'dark', animations: true, showSplash: true, openMode: 'inapp', haptics: true };
  const prefs = { ...DEFAULT_PREFS, ...store.get('prefs', {}) };
  let favs = store.get('favs', []);
  let recents = store.get('recents', []);

  /* ---------------- state ---------------- */
  let cfg = null;
  let tools = [];              // flat list
  const toolById = new Map();
  let frameable = {};          // tool id → bool (from frame-check.php)

  const asset = p => (!p ? '' : /^(https?:|data:|blob:|\/)/.test(p) ? p : '../' + p.replace(/^\.?\//, ''));

  /* ---------------- haptics ---------------- */
  const haptic = (() => {
    let label;
    return (style = 'light') => {
      if (!prefs.haptics) return;
      if (isNative) return postNative({ action: 'haptic', style });
      try {
        if (navigator.vibrate) { navigator.vibrate(style === 'heavy' ? 24 : 10); return; }
        // iOS 18+: toggling a native switch control produces a system haptic tick.
        if (!label) {
          label = document.createElement('label');
          label.style.cssText = 'position:fixed;left:-200px;top:0;opacity:0;pointer-events:none';
          const input = document.createElement('input');
          input.type = 'checkbox'; input.setAttribute('switch', '');
          label.appendChild(input); document.body.appendChild(label);
        }
        label.click();
      } catch {}
    };
  })();

  /* ---------------- toast ---------------- */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.classList.add('is-on');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('is-on'), 2000);
  }

  /* ---------------- image helpers ---------------- */
  function imgOrPlaceholder(src, label, phClass = '') {
    const img = new Image();
    img.alt = ''; img.decoding = 'async'; img.draggable = false;
    img.onerror = () => {
      const ph = document.createElement('div');
      ph.className = 'ph ' + phClass;
      ph.textContent = label;
      img.replaceWith(ph);
    };
    if (src) img.src = src; else queueMicrotask(img.onerror);
    return img;
  }
  const fileName = p => (p || '').split('/').pop() || 'image.png';

  function toolIcon(tool) {
    const wrap = document.createElement('span');
    wrap.className = 'tool__icon';
    wrap.appendChild(imgOrPlaceholder(asset(tool.image), fileName(tool.image)));
    return wrap;
  }

  /* ---------------- preferences ---------------- */
  function applyPrefs() {
    root.dataset.theme = prefs.theme;
    root.classList.toggle('no-anim', !prefs.animations);
    $('meta[name="theme-color"]').content = prefs.theme === 'oled' ? '#000000' : '#030806';
    $$('[data-pref]').forEach(el => { el.checked = !!prefs[el.dataset.pref]; });
    $$('#themeSeg button').forEach(b => b.classList.toggle('is-on', b.dataset.v === prefs.theme));
    $$('#openSeg button').forEach(b => b.classList.toggle('is-on', b.dataset.v === prefs.openMode));
  }
  function savePrefs() { store.set('prefs', prefs); applyPrefs(); }

  /* ---------------- favorites / recents ---------------- */
  const isFav = id => favs.includes(id);
  function toggleFav(id) {
    favs = isFav(id) ? favs.filter(x => x !== id) : [id, ...favs];
    store.set('favs', favs);
    haptic('medium');
    toast(isFav(id) ? 'أُضيفت إلى المفضلة' : 'أُزيلت من المفضلة');
    renderDynamic();
    if (browserTool?.id === id) $('#bFav').classList.toggle('is-on', isFav(id));
  }
  function addRecent(id) {
    recents = [{ id, t: Date.now() }, ...recents.filter(r => r.id !== id)].slice(0, 10);
    store.set('recents', recents);
  }

  /* ================================================================
   * RENDERING
   * ================================================================ */
  function makeTile(tool, i = 0) {
    const el = document.createElement('button');
    el.className = 'tool';
    el.style.setProperty('--i', i);
    el.dataset.id = tool.id;
    el.setAttribute('aria-label', tool.name);
    el.appendChild(toolIcon(tool));
    const name = document.createElement('span');
    name.className = 'tool__name'; name.textContent = tool.name;
    el.appendChild(name);
    if (isFav(tool.id)) {
      const f = document.createElement('span');
      f.className = 'tool__fav';
      f.innerHTML = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="m12 20-1.2-1.1C6 14.6 3 11.9 3 8.5 3 5.9 5 4 7.5 4c1.7 0 3.4.8 4.5 2.1C13.1 4.8 14.8 4 16.5 4 19 4 21 5.9 21 8.5c0 3.4-3 6.1-7.8 10.4z"/></svg>';
      el.appendChild(f);
    }
    bindPress(el, () => openTool(tool), () => openSheet(tool));
    return el;
  }

  function makeItem(tool, i = 0, query = '') {
    const el = document.createElement('button');
    el.className = 'item';
    el.style.setProperty('--i', i);
    el.appendChild(toolIcon(tool));
    const txt = document.createElement('div');
    txt.className = 'item__txt';
    txt.innerHTML = `<b>${highlight(tool.name, query)}</b><small>${highlight(tool.description || '', query)} · ${escapeHtml(tool.categoryTitle)}</small>`;
    el.appendChild(txt);
    el.insertAdjacentHTML('beforeend', '<svg class="item__chev" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    bindPress(el, () => openTool(tool), () => openSheet(tool));
    return el;
  }

  /** Tap → action, long-press → secondary, with scale feedback. */
  function bindPress(el, onTap, onLong) {
    let timer, long = false, sx = 0, sy = 0;
    el.addEventListener('pointerdown', e => {
      long = false; sx = e.clientX; sy = e.clientY;
      el.classList.add('is-pressed');
      timer = setTimeout(() => { long = true; el.classList.remove('is-pressed'); haptic('heavy'); onLong(); }, 520);
    });
    const cancel = () => { clearTimeout(timer); el.classList.remove('is-pressed'); };
    el.addEventListener('pointermove', e => { if (Math.hypot(e.clientX - sx, e.clientY - sy) > 10) cancel(); });
    el.addEventListener('pointerup', cancel);
    el.addEventListener('pointercancel', cancel);
    el.addEventListener('pointerleave', cancel);
    el.addEventListener('contextmenu', e => e.preventDefault());
    el.addEventListener('click', e => { if (long) { e.preventDefault(); return; } onTap(); });
  }

  function renderCategories() {
    const host = $('#categories');
    host.innerHTML = '';
    cfg.categories.forEach(cat => {
      const card = document.createElement('article');
      card.className = 'category';
      card.id = cat.id;

      const hero = document.createElement('div');
      hero.className = 'category__hero';
      hero.appendChild(imgOrPlaceholder(asset(cat.image), fileName(cat.image), 'ph--hero'));
      const info = document.createElement('div');
      info.className = 'category__info';
      info.innerHTML = `<div><h2>${escapeHtml(cat.title)}</h2>${cat.subtitle ? `<p>${escapeHtml(cat.subtitle)}</p>` : ''}</div>
        <span class="category__count">${cat.tools.length} أدوات</span>`;
      hero.appendChild(info);
      card.appendChild(hero);

      const grid = document.createElement('div');
      grid.className = 'category__tools';
      cat.tools.forEach((t, i) => grid.appendChild(makeTile(toolById.get(t.id), i)));
      card.appendChild(grid);
      host.appendChild(card);
    });
  }

  function renderDynamic() {
    // favorites strip + recents strip on home
    const favTools = favs.map(id => toolById.get(id)).filter(Boolean);
    $('#favStrip').hidden = favTools.length === 0;
    $('#favRow').replaceChildren(...favTools.map((t, i) => makeTile(t, i)));

    const recentTools = recents.map(r => toolById.get(r.id)).filter(Boolean).slice(0, 8);
    $('#recentStrip').hidden = recentTools.length === 0;
    $('#recentRow').replaceChildren(...recentTools.map((t, i) => makeTile(t, i)));

    // fav markers on category tiles
    $$('#categories .tool').forEach(el => {
      const has = isFav(el.dataset.id);
      const mark = el.querySelector('.tool__fav');
      if (has && !mark) el.replaceWith(Object.assign(makeTile(toolById.get(el.dataset.id)), { style: 'opacity:1;transform:none;animation:none' }));
      if (!has && mark) mark.remove();
    });

    // favorites view
    const list = $('#favList');
    if (favTools.length) list.replaceChildren(...favTools.map((t, i) => makeItem(t, i)));
    else list.innerHTML = emptyState('heart', 'لا توجد مفضلة بعد', 'اضغط مطولاً على أي أداة أو استخدم زر ♥ داخل المتصفح لإضافتها.');

    renderSearch();
  }

  /* ---------------- search ---------------- */
  const norm = s => (s || '').toLowerCase()
    .replace(/[ً-ٰٟ]/g, '')
    .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
  const escapeHtml = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function highlight(text, q) {
    if (!q) return escapeHtml(text);
    const n = norm(text), nq = norm(q), i = n.indexOf(nq);
    if (i < 0 || n.length !== text.length) return escapeHtml(text);
    return escapeHtml(text.slice(0, i)) + '<mark>' + escapeHtml(text.slice(i, i + q.length)) + '</mark>' + escapeHtml(text.slice(i + q.length));
  }

  function renderSearch() {
    const q = $('#searchInput').value.trim();
    const out = $('#searchResults');
    if (!q) {
      const rt = recents.map(r => toolById.get(r.id)).filter(Boolean);
      const base = rt.length ? rt : tools;
      out.replaceChildren();
      out.insertAdjacentHTML('beforeend', `<div class="list__label">${rt.length ? 'المستخدمة مؤخراً' : 'كل الأدوات'}</div>`);
      base.forEach((t, i) => out.appendChild(makeItem(t, i)));
      return;
    }
    const nq = norm(q);
    const hits = tools.filter(t => norm(`${t.name} ${t.description} ${t.categoryTitle} ${t.url}`).includes(nq));
    if (!hits.length) { out.innerHTML = emptyState('search', 'لا توجد نتائج', `لم نجد أداة تطابق «${escapeHtml(q)}».`); return; }
    out.replaceChildren(...hits.map((t, i) => makeItem(t, i, q)));
  }

  function emptyState(icon, title, text) {
    const icons = {
      heart: '<path d="m12 20-1.2-1.1C6 14.6 3 11.9 3 8.5 3 5.9 5 4 7.5 4c1.7 0 3.4.8 4.5 2.1C13.1 4.8 14.8 4 16.5 4 19 4 21 5.9 21 8.5c0 3.4-3 6.1-7.8 10.4z" fill="none" stroke="currentColor" stroke-width="1.6"/>',
      search: '<circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m16 16 4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    };
    return `<div class="empty"><svg viewBox="0 0 24 24">${icons[icon]}</svg><b>${title}</b>${text}</div>`;
  }

  /* ---------------- views ---------------- */
  let currentView = 'home';
  function go(view) {
    if (view === currentView) { $(`.view[data-view="${view}"]`).scrollTo({ top: 0, behavior: 'smooth' }); return; }
    haptic();
    currentView = view;
    $$('.view').forEach(v => v.classList.toggle('is-active', v.dataset.view === view));
    $$('.tab').forEach(t => t.classList.toggle('is-active', t.dataset.go === view));
    if (view === 'search') { renderSearch(); setTimeout(() => $('#searchInput').focus(), 50); }
  }

  /* ================================================================
   * ACTION SHEET
   * ================================================================ */
  let sheetTool = null;
  function openSheet(tool) {
    sheetTool = tool;
    $('#sheetIcon').replaceChildren(toolIcon(tool));
    $('#sheetTitle').textContent = tool.name;
    $('#sheetDesc').textContent = tool.description || hostOf(tool.url);
    $('#sheetFav').textContent = isFav(tool.id) ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة';
    const s = $('#sheet');
    s.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => s.classList.add('is-open')));
  }
  function closeSheet() {
    const s = $('#sheet');
    s.classList.remove('is-open');
    setTimeout(() => { s.hidden = true; }, 380);
  }

  /* ================================================================
   * IN-APP BROWSER
   * ================================================================ */
  const hostOf = u => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return u; } };
  let browserTool = null, iframe = null, depth = 0, pendingNav = null, firstLoad = true, slowTimer, progTimer;

  function openExternal(url) {
    // In a Home Screen Web Clip, iOS opens _blank links in an in-app Safari sheet (stays inside the app).
    if (isNative) return postNative({ action: 'external', url });
    const w = window.open(url, '_blank'); // ('noopener' would make this always return null)
    if (w) { try { w.opener = null; } catch {} }
    else {
      const a = Object.assign(document.createElement('a'), { href: url, target: '_blank', rel: 'noopener' });
      document.body.appendChild(a); a.click(); a.remove();
    }
  }

  function openTool(tool) {
    if (!tool) return;
    haptic();
    addRecent(tool.id);
    setTimeout(renderDynamic, 600);

    if (isNative) {
      return postNative({ action: 'open', id: tool.id, url: tool.url, title: tool.name,
        icon: new URL(asset(tool.image), location.href).href, favorite: isFav(tool.id) });
    }
    const blocked = tool.mode === 'external' || (tool.mode !== 'frame' && frameable[tool.id] === false);
    if (prefs.openMode === 'safari' || blocked) {
      if (blocked && prefs.openMode !== 'safari') toast('يُفتح هذا الموقع في نافذة Safari الآمنة');
      return openExternal(tool.url);
    }
    openBrowser(tool);
  }

  function openBrowser(tool) {
    browserTool = tool;
    $('#bTitle').textContent = tool.name;
    $('#bDomain').textContent = hostOf(tool.url);
    $('#bIcon').src = $('#bLoadIcon').src = asset(tool.image);
    $('#bFav').classList.toggle('is-on', isFav(tool.id));
    const b = $('#browser');
    b.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => b.classList.add('is-open')));
    history.pushState({ browser: tool.id }, '');
    depth = 1;
    load();
  }

  function setProgress(p) {
    const bar = $('#bProgress');
    bar.style.opacity = p >= 100 ? '0' : '1';
    bar.style.width = p + '%';
  }

  function showLoading(on) {
    const l = $('#bLoading');
    if (on) { l.hidden = false; l.classList.remove('is-out'); $('#bSlowOpen').hidden = true; }
    else { l.classList.add('is-out'); setTimeout(() => { if (l.classList.contains('is-out')) l.hidden = true; }, 420); }
  }

  const ERR_ICONS = {
    offline: '<svg viewBox="0 0 24 24"><path d="M3 3l18 18M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 5-2.7M19 13a10 10 0 0 0-2.3-1.6M2 9.5a15 15 0 0 1 4.5-2.8M22 9.5A15 15 0 0 0 11 5.1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="20" r="1.3" fill="currentColor"/></svg>',
    blocked: '<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  };
  let errorKind = null;
  function showError(kind) {
    errorKind = kind;
    clearTimeout(slowTimer); clearInterval(progTimer); setProgress(100);
    showLoading(false);
    $('#bErrIcon').innerHTML = ERR_ICONS[kind] || ERR_ICONS.offline;
    $('#bErrTitle').textContent = kind === 'offline' ? 'لا يوجد اتصال بالإنترنت' : 'تعذّر عرض الموقع هنا';
    $('#bErrText').textContent = kind === 'offline'
      ? 'تحقق من اتصال Wi-Fi أو بيانات الهاتف ثم أعد المحاولة.'
      : 'هذا الموقع لا يسمح بعرضه داخل تطبيقات أخرى. يمكنك فتحه في نافذة Safari الآمنة دون مغادرة التطبيق.';
    $('#bError').hidden = false;
  }

  function load() {
    $('#bError').hidden = true; errorKind = null;
    if (!navigator.onLine) return showError('offline');

    showLoading(true);
    let p = 8; setProgress(p);
    clearInterval(progTimer);
    progTimer = setInterval(() => { p += (90 - p) * 0.08; setProgress(p); }, 200);
    clearTimeout(slowTimer);
    slowTimer = setTimeout(() => { $('#bSlowOpen').hidden = false; }, 9000);

    if (iframe) iframe.remove();
    firstLoad = true;
    iframe = document.createElement('iframe');
    iframe.setAttribute('allow', 'fullscreen; clipboard-write; autoplay; encrypted-media; picture-in-picture');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.setAttribute('title', browserTool.name);
    iframe.addEventListener('load', onFrameLoad);
    iframe.src = browserTool.url;
    $('#bBody').prepend(iframe);
  }

  function onFrameLoad() {
    clearTimeout(slowTimer); clearInterval(progTimer);
    setProgress(100);
    showLoading(false);
    if (firstLoad) { firstLoad = false; }
    else if (pendingNav === 'back') depth = Math.max(1, depth - 1);
    else if (pendingNav === 'fwd') depth++;
    else depth++;
    pendingNav = null;
    // Same-origin pages: show the live document title.
    try { const t = iframe.contentDocument?.title; if (t) $('#bTitle').textContent = t; } catch {}
  }

  function closeBrowser() {
    const b = $('#browser');
    b.classList.remove('is-open');
    clearTimeout(slowTimer); clearInterval(progTimer);
    setTimeout(() => {
      if (!b.classList.contains('is-open')) {
        b.hidden = true;
        if (iframe) { iframe.remove(); iframe = null; }
        browserTool = null;
      }
    }, 500);
  }

  /** Leaves the browser and unwinds the history entries it created. */
  function browserHome() {
    haptic();
    if (history.state?.browser) {
      const n = depth;
      depth = 0;
      history.go(-n);
      setTimeout(() => { if (browserTool) closeBrowser(); }, 450);
    } else closeBrowser();
  }

  // Back/forward travel through the joint session history, which includes the
  // iframe's own navigations. Leaving our pushed entry closes the browser.
  window.addEventListener('popstate', e => {
    if (!e.state?.browser && browserTool) closeBrowser();
  });

  function bindBrowser() {
    $('#bClose').onclick = browserHome;
    $('#bHome').onclick = browserHome;
    $('#bBack').onclick = () => { haptic(); pendingNav = 'back'; history.back(); };
    $('#bFwd').onclick = () => { haptic(); pendingNav = 'fwd'; history.forward(); };
    $('#bReload').onclick = () => {
      haptic();
      if (!iframe || errorKind) return load();
      showLoading(true); setProgress(15);
      try { firstLoad = true; iframe.contentWindow.location.replace(browserTool.url); }
      catch { load(); }
    };
    $('#bOpenOut').onclick = () => { haptic(); browserTool && openExternal(browserTool.url); };
    $('#bExternal').onclick = () => browserTool && openExternal(browserTool.url);
    $('#bSlowOpen').onclick = () => browserTool && openExternal(browserTool.url);
    $('#bRetry').onclick = () => { haptic(); load(); };
    $('#bFav').onclick = () => browserTool && toggleFav(browserTool.id);
  }

  /* ================================================================
   * CONNECTIVITY
   * ================================================================ */
  function updateOnline() {
    const on = navigator.onLine;
    $('#offlineBar').hidden = on;
    if (on && errorKind === 'offline' && browserTool) load();
    if (!on && browserTool && iframe && !$('#bLoading').hidden) showError('offline');
  }

  /* ================================================================
   * SPLASH + BOOT
   * ================================================================ */
  function splashProgress(p) {
    $('#splashBar').style.width = p + '%';
    $('#splashPct').textContent = Math.round(p) + '%';
  }

  function preload(urls, onEach) {
    return Promise.all(urls.map(u => new Promise(res => {
      const i = new Image();
      i.onload = i.onerror = () => { onEach(); res(); };
      i.src = u;
    })));
  }

  async function fetchFrameability() {
    try {
      const ctrl = new AbortController();
      setTimeout(() => ctrl.abort(), 4000);
      const r = await fetch('../frame-check.php', { signal: ctrl.signal });
      if (!(r.headers.get('content-type') || '').includes('json')) return {};
      return await r.json();
    } catch { return {}; }
  }

  async function boot() {
    const t0 = performance.now();
    applyPrefs();
    splashProgress(5);

    try {
      const r = await fetch('../config.json', { cache: 'no-cache' });
      cfg = await r.json();
    } catch {
      $('#splashName').textContent = 'تعذّر تحميل الإعدادات';
      $('#splashPct').textContent = 'تحقق من الاتصال ثم أعد فتح التطبيق';
      return;
    }
    splashProgress(25);

    document.title = cfg.APP_NAME;
    $('#splashName').textContent = cfg.APP_NAME;
    $('#appTitle').textContent = cfg.APP_NAME;
    $('meta[name="apple-mobile-web-app-title"]').content = cfg.APP_NAME;
    const brand = $('#brandIcon');
    brand.onerror = () => brand.remove();
    brand.src = asset(cfg.APP_ICON);

    const splashImg = $('#splashImg');
    splashImg.onload = () => splashImg.parentNode.classList.add('has-img');
    splashImg.onerror = () => splashImg.remove();
    splashImg.src = asset(cfg.LOADING_IMAGE);

    cfg.categories.forEach(cat => cat.tools.forEach(t => {
      const tool = { mode: 'auto', ...t, categoryId: cat.id, categoryTitle: cat.title };
      tools.push(tool); toolById.set(tool.id, tool);
    }));

    const h = new Date().getHours();
    $('#hello').textContent = h < 12 ? 'صباح الخير' : 'مساء الخير';
    $('#versionNote').textContent = `الإصدار ${VERSION}${isStandalone ? ' · وضع التطبيق' : isNative ? ' · تطبيق iOS' : ''}`;

    // Preload images while the splash runs.
    const urls = [cfg.APP_ICON, ...cfg.categories.map(c => c.image), ...tools.map(t => t.image)].filter(Boolean).map(asset);
    let done = 0;
    const framePromise = isNative ? Promise.resolve({}) : fetchFrameability();
    await Promise.race([
      preload(urls, () => { done++; splashProgress(25 + (done / urls.length) * 65); }),
      sleep(4000),
    ]);
    frameable = await Promise.race([framePromise, sleep(1500).then(() => ({}))]);
    framePromise.then(m => { frameable = m; });

    renderCategories();
    renderDynamic();
    splashProgress(100);

    const minMs = prefs.showSplash ? (cfg.LOADING_MIN_MS ?? 1600) : 250;
    await sleep(Math.max(0, minMs - (performance.now() - t0)));

    $('#app').hidden = false;
    const splash = $('#splash');
    splash.classList.add('is-out');
    setTimeout(() => splash.remove(), 700);
    requestAnimationFrame(() => $('.views').classList.add('is-ready'));

    if (isIOS && !isStandalone && !isNative && !store.get('hideInstallHint', false)) $('#installHint').hidden = false;
    updateOnline();
  }

  /* ================================================================
   * EVENTS
   * ================================================================ */
  function bindUI() {
    $$('[data-go]').forEach(b => b.addEventListener('click', () => go(b.dataset.go)));
    $('#searchInput').addEventListener('input', renderSearch);
    $('#searchInput').addEventListener('keydown', e => { if (e.key === 'Enter') e.target.blur(); });

    $$('[data-pref]').forEach(el => el.addEventListener('change', () => { prefs[el.dataset.pref] = el.checked; haptic(); savePrefs(); }));
    $$('#themeSeg button').forEach(b => b.addEventListener('click', () => { prefs.theme = b.dataset.v; haptic(); savePrefs(); }));
    $$('#openSeg button').forEach(b => b.addEventListener('click', () => { prefs.openMode = b.dataset.v; haptic(); savePrefs(); }));

    const clearRecents = () => { recents = []; store.set('recents', []); renderDynamic(); toast('تم مسح السجل'); };
    $('#clearRecents').onclick = clearRecents;
    $('#clearRecentsInline').onclick = clearRecents;
    $('#clearFavs').onclick = () => { if (confirm('مسح كل المفضلة؟')) { favs = []; store.set('favs', []); renderDynamic(); toast('تم مسح المفضلة'); } };
    $('#resetAll').onclick = () => {
      if (!confirm('إعادة ضبط التطبيق وحذف كل البيانات المحفوظة؟')) return;
      ['prefs', 'favs', 'recents', 'hideInstallHint'].forEach(store.del);
      location.reload();
    };

    $('#installHintClose').onclick = () => { $('#installHint').hidden = true; store.set('hideInstallHint', true); };

    $$('#sheet [data-close]').forEach(el => el.addEventListener('click', closeSheet));
    $('#sheetOpen').onclick = () => { closeSheet(); openTool(sheetTool); };
    $('#sheetFav').onclick = () => { closeSheet(); toggleFav(sheetTool.id); };
    $('#sheetSafari').onclick = () => { closeSheet(); addRecent(sheetTool.id); openExternal(sheetTool.url); };
    $('#sheetCopy').onclick = async () => {
      closeSheet();
      try { await navigator.clipboard.writeText(sheetTool.url); toast('تم نسخ الرابط'); } catch { toast(sheetTool.url); }
    };

    bindBrowser();
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);
    document.addEventListener('gesturestart', e => e.preventDefault()); // no pinch-zoom of the app shell
  }

  /* ---------------- native bridge hooks (called by the iOS wrapper) ---------------- */
  window.WebClipApp = {
    toggleFavorite: id => toggleFav(id),
    isFavorite: id => isFav(id),
    getTool: id => toolById.get(id) || null,
  };

  /* ---------------- service worker (offline shell) ---------------- */
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost') && !isNative) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }

  bindUI();
  boot();
})();
