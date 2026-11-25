/* Installation landing page logic.
 * - Fills the page from config.json
 * - Detects device / browser and explains requirements
 * - Starts the genuine iOS profile download (a normal navigation — iOS shows its own prompt)
 * - Walks the user through the manual install in Settings
 */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const STATE_KEY = 'webclip.install.step';
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };

  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPod|iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const inAppOrOtherBrowser = /CriOS|FxiOS|EdgiOS|OPiOS|OPT\/|YaBrowser|DuckDuckGo|GSA\/|FBAN|FBAV|FB_IAB|Instagram|Line\/|Snapchat|musical_ly|TikTok|Twitter|LinkedInApp|WhatsApp/i.test(ua);
  const iosMajor = (() => { const m = ua.match(/OS (\d+)_/); return m ? +m[1] : null; })();

  const installBtn = $('#installBtn');
  const notice = $('#notice');

  /* ---------- haptics (iOS 18+ switch trick, Vibration API elsewhere) ---------- */
  const haptic = (() => {
    let label;
    return () => {
      try {
        if (navigator.vibrate) { navigator.vibrate(12); return; }
        if (!label) {
          label = document.createElement('label');
          label.style.cssText = 'position:fixed;opacity:0;pointer-events:none;left:-99px';
          const input = document.createElement('input');
          input.type = 'checkbox'; input.setAttribute('switch', '');
          label.appendChild(input); document.body.appendChild(label);
        }
        label.click();
      } catch {}
    };
  })();

  /* ---------- config ---------- */
  async function loadConfig() {
    try {
      const res = await fetch('config.json', { cache: 'no-cache' });
      return await res.json();
    } catch { return null; }
  }

  function applyConfig(cfg) {
    if (!cfg) return;
    $$('[data-cfg-text]').forEach(el => { const v = cfg[el.dataset.cfgText]; if (v) el.textContent = v; });
    $$('[data-cfg-src]').forEach(el => { const v = cfg[el.dataset.cfgSrc]; if (v) el.src = v; });
    document.title = `تثبيت ${cfg.APP_NAME}`;
    const domain = cfg.WEBSITE_DOMAIN && !/YOUR-DOMAIN/i.test(cfg.WEBSITE_DOMAIN) ? cfg.WEBSITE_DOMAIN : location.hostname;
    $$('[data-cfg-text="WEBSITE_DOMAIN"]').forEach(el => { el.textContent = domain; });
  }

  // Use the PHP generator when PHP runs on the host, otherwise the static file built by scripts/build-profile.mjs.
  async function resolveEndpoint(cfg) {
    const candidates = [cfg?.PROFILE_ENDPOINT || 'profile.php', cfg?.STATIC_PROFILE || 'profile.mobileconfig'];
    for (const url of candidates) {
      try {
        const res = await fetch(url, { method: 'HEAD', cache: 'no-store' });
        if (res.ok && /aspen-config|pkcs7|octet-stream/i.test(res.headers.get('content-type') || '')) return url;
      } catch {}
    }
    return candidates[0];
  }

  /* ---------- steps ---------- */
  function setStep(n) {
    $$('.step').forEach(li => {
      const s = +li.dataset.step;
      li.classList.toggle('is-active', s === n);
      li.classList.toggle('is-done', s < n);
    });
    $('#allowPanel').hidden = n !== 2;
    $('#tutorial').hidden = n !== 3;
    $('#donePanel').hidden = n !== 4;
    store.set(STATE_KEY, String(n));
  }

  function reveal(el) {
    requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  function showNotice(html, withCopy) {
    notice.innerHTML = html;
    if (withCopy) {
      const b = document.createElement('button');
      b.className = 'ghost-btn'; b.type = 'button'; b.textContent = 'نسخ رابط الصفحة';
      b.onclick = async () => {
        try { await navigator.clipboard.writeText(location.href); b.textContent = 'تم النسخ ✓'; }
        catch { prompt('انسخ الرابط:', location.href); }
      };
      notice.appendChild(b);
    }
    notice.hidden = false;
  }

  function environmentChecks() {
    if (!isIOS) {
      showNotice('هذه الصفحة مخصّصة لأجهزة <b>iPhone</b>. افتح الرابط على جهاز iPhone باستخدام <b>Safari</b> لتثبيت التطبيق.', true);
    } else if (inAppOrOtherBrowser) {
      showNotice('أنت تستخدم متصفحاً لا يدعم تثبيت ملفات التعريف. افتح هذه الصفحة في <b>Safari</b> ثم اضغط «ابدأ التثبيت».', true);
    }
    if (iosMajor && iosMajor < 15) {
      $('#profilePath').textContent = 'الإعدادات ← عام ← ملفات التعريف';
    }
  }

  /* ---------- init ---------- */
  (async () => {
    environmentChecks();
    const cfg = await loadConfig();
    applyConfig(cfg);
    installBtn.href = await resolveEndpoint(cfg);

    const saved = +store.get(STATE_KEY) || 1;
    if (saved > 1) setStep(saved);
  })();

  // Normal link navigation: Safari downloads the profile and shows the native iOS prompt.
  installBtn.addEventListener('click', () => {
    haptic();
    setTimeout(() => { setStep(2); reveal($('#allowPanel')); }, 600);
  });

  $('#toTutorial').addEventListener('click', () => { haptic(); setStep(3); reveal($('#tutorial')); });
  $('#doneBtn').addEventListener('click', () => { haptic(); setStep(4); reveal($('#donePanel')); });

  // User went to Settings and came back → continue the tutorial.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && store.get(STATE_KEY) === '2') {
      setStep(3);
    }
  });
})();
