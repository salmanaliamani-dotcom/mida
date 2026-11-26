// world.js — sets, props and cast for "Yassine 1760". Uses stick.js helpers.
const GROUND = 1460;
const ol = (w = 6) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
let _gid = 0; const gid = p => p + (_gid++);
function lg(id, stops, x2 = 0, y2 = 1) { return `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`; }
const rnd = s => { let x = Math.sin(s * 999.1) * 43758.5453; return x - Math.floor(x); };

// ---------------- CAST ----------------
const CAST = {
  yassine: { acc: { cap: '#c8231f' }, shirt: '#2f6fb0' },
  hamid: { s: .72, acc: { hair: '#2b1a10' }, robe: '#9a7444', short: 1 },
  balhcen: { acc: { beard: '#efece4', hair: '#c9c6bf' }, turban: '#f1ede2', robe: '#c2a77a' },
  fatima: { s: .58, acc: { hijab: '#d9748f' }, robe: '#e7a1b0', short: 1 },
  mha: { acc: { hijab: '#6d4a8a' }, robe: '#8d6aa8' },
  bouchaib: { acc: { hijab: '#221d1c', mustache: '#1b1716' }, robe: '#26201e', amulets: 1 },
  caid: { s: 1.08, acc: { beard: '#2a1c12', mustache: '#2a1c12' }, turban: '#f6f2e6', big: 1, robe: '#efe9da', cloak: '#8f1d1d' },
  soldier: { acc: { mustache: '#2a1c12' }, fez: '#a3231d', robe: '#6b5a44' },
  shib: { acc: { beard: '#d9d6cf', hair: '#bdbab3' }, turban: '#e9e2cf', robe: '#7d6a4a' },
  man1: { acc: { mustache: '#3a2a1a' }, turban: '#e8e0cc', robe: '#8a7350' },
  man2: { acc: { beard: '#3a2a1a' }, fez: '#8c2a22', robe: '#5f6b4a' },
  man3: { acc: {}, turban: '#d8cfb8', robe: '#a0825a' },
  wom1: { acc: { hijab: '#efeae0' }, robe: '#efeae0' },
  wom2: { acc: { hijab: '#3f6e6a' }, robe: '#5b8a7f' },
  kid1: { s: .62, acc: { hair: '#2b1a10' }, robe: '#7a8f5a', short: 1 },
  kid2: { s: .6, acc: { hijab: '#e0a73c' }, robe: '#d88b3a', short: 1 },
};
// person: who, x, gy (ground y of feet), pose overrides
function person(who, o = {}) {
  const c = CAST[who] || {}; const s = (o.s || 1) * (c.s || 1);
  const pose = o.pose || P.stand();
  const rot = o.rot ?? pose.rot ?? 0;
  const x = o.x ?? 540, y = (o.y ?? ((o.gy ?? GROUND) - 178 * s));
  const dir = o.dir ?? 1, d = dir === 0 ? 1 : dir;
  let pre = '';
  const robe = o.robe ?? c.robe;
  if (robe && !o.noRobe) {
    const bot = c.short ? 70 : 125;
    pre += `<g transform="translate(${x} ${y + (pose.dy || 0)}) rotate(${rot}) scale(${s})"><path d="M${-34} ${-128} Q0 ${-150} ${34} ${-128} L${62} ${bot} Q0 ${bot + 16} ${-62} ${bot} Z" fill="${robe}" ${ol(6)}/>
      <path d="M0 -125 L0 ${bot}" stroke="#000" stroke-opacity=".15" stroke-width="5"/>${c.cloak ? `<path d="M${-40} ${-130} L${-78} ${bot + 6} L${-30} ${bot} Z M${40} ${-130} L${78} ${bot + 6} L${30} ${bot} Z" fill="${c.cloak}" ${ol(5)}/>` : ''}</g>`;
  }
  if (c.shirt && !o.noRobe) pre += `<g transform="translate(${x} ${y + (pose.dy || 0)}) rotate(${rot}) scale(${s})"><path d="M-30 -128 Q0 -146 30 -128 L34 6 Q0 14 -34 6Z" fill="${c.shirt}" ${ol(6)}/></g>`;
  const body = stick({ ...pose, ...(o.p || {}), x, y, s, dir, rot, face: o.face || {}, acc: { ...c.acc, ...(o.acc || {}) }, hidden: o.hidden || {} });
  const L = stick.last; const [hx, hy] = L.head, R = L.headR;
  let post = '';
  const tilt = rot;
  if (c.turban) post += `<g transform="rotate(${tilt} ${hx} ${hy})"><path d="M${hx - R * 1.02} ${hy - R * .25} Q${hx - R * 1.1} ${hy - R * (c.big ? 1.55 : 1.3)} ${hx} ${hy - R * (c.big ? 1.6 : 1.32)} Q${hx + R * 1.1} ${hy - R * (c.big ? 1.55 : 1.3)} ${hx + R * 1.02} ${hy - R * .25} Q${hx} ${hy - R * .5} ${hx - R * 1.02} ${hy - R * .25}Z" fill="${c.turban}" stroke="${INK}" stroke-width="${6 * s}"/>
     <path d="M${hx - R * .9} ${hy - R * .7} Q${hx} ${hy - R * 1.05} ${hx + R * .9} ${hy - R * .6} M${hx - R * .8} ${hy - R * 1.0} Q${hx} ${hy - R * 1.3} ${hx + R * .7} ${hy - R * .95}" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="${5 * s}"/></g>`;
  if (c.fez) post += `<g transform="rotate(${tilt} ${hx} ${hy})"><path d="M${hx - R * .55} ${hy - R * .82} L${hx - R * .42} ${hy - R * 1.45} L${hx + R * .42} ${hy - R * 1.45} L${hx + R * .55} ${hy - R * .82} Q${hx} ${hy - R * .7} ${hx - R * .55} ${hy - R * .82}Z" fill="${c.fez}" stroke="${INK}" stroke-width="${6 * s}"/><path d="M${hx} ${hy - R * 1.45} q${R * .3} ${R * .1} ${R * .35} ${R * .5}" stroke="#151312" stroke-width="${5 * s}" fill="none"/></g>`;
  if (c.amulets) post += [-1, 0, 1].map(i => `<path d="M${hx + i * 22 * s} ${hy + R + 30 * s} l${-9 * s} ${18 * s} l${18 * s} 0z" fill="#b08a3c" stroke="${INK}" stroke-width="${3 * s}"/>`).join('') + `<path d="M${hx - 34 * s} ${hy + R + 14 * s} Q${hx} ${hy + R + 44 * s} ${hx + 34 * s} ${hy + R + 14 * s}" fill="none" stroke="#6b4b22" stroke-width="${3 * s}"/>`;
  stick.last = L;
  return pre + body + post;
}
const blink = (t, ph = 0) => (((t + ph) % 2.7) < .1 ? 'closed' : null);
const breathe = (t, ph = 0) => wob(t, .35, 2, ph);

// ---------------- SKY / LAND ----------------
function sky(time, id = 'sk') {
  const pal = { day: ['#7fb6dc', '#cfe3ea'], dawn: ['#3c4f7a', '#f0a868'], dusk: ['#2b2f55', '#e0835a'], night: ['#070b1a', '#1b2645'], eclipse: ['#05060d', '#1a0d12'] }[time] || ['#7fb6dc', '#cfe3ea'];
  let s = `<defs>${lg(id, [[0, pal[0]], [1, pal[1]]])}</defs><rect x="-600" y="-600" width="${W + 1200}" height="${GROUND + 600}" fill="url(#${id})"/>`;
  if (time === 'night' || time === 'eclipse') for (let i = 0; i < 70; i++) s += `<circle cx="${rnd(i) * 1600 - 260}" cy="${rnd(i + 50) * 900 - 200}" r="${1.5 + rnd(i + 9) * 2.5}" fill="#fff" opacity="${.4 + rnd(i + 3) * .6}"/>`;
  return s;
}
function moon(x, y, r, eclipse = 0, red = 0) {
  const col = red > 0 ? `rgb(${Math.round(lerp(245, 170, red))},${Math.round(lerp(240, 50, red))},${Math.round(lerp(220, 30, red))})` : '#f4f0dc';
  const cid = gid('mc');
  return `<circle cx="${x}" cy="${y}" r="${r * 2.2}" fill="${col}" opacity=".12" filter="url(#soft)"/><circle cx="${x}" cy="${y}" r="${r}" fill="${col}" ${ol(5)}/>
   <circle cx="${x - r * .3}" cy="${y - r * .2}" r="${r * .18}" fill="#000" opacity=".08"/><circle cx="${x + r * .35}" cy="${y + r * .3}" r="${r * .12}" fill="#000" opacity=".08"/>
   <defs><clipPath id="${cid}"><circle cx="${x}" cy="${y}" r="${r}"/></clipPath></defs>
   ${eclipse > 0 ? `<circle clip-path="url(#${cid})" cx="${x + r * 2.1 - eclipse * r * 2.1}" cy="${y - r * .15}" r="${r * 1.05}" fill="#120a0c" opacity="${red > 0 ? .25 : .92}"/>` : ''}`;
}
function mountains(time) {
  const c = time === 'night' || time === 'eclipse' ? ['#141a2c', '#1d2438'] : time === 'dawn' ? ['#5a4a5e', '#7a5f62'] : ['#8b8f8a', '#a59a82'];
  return `<path d="M-500 ${GROUND - 260} L-200 ${GROUND - 520} L60 ${GROUND - 330} L300 ${GROUND - 610} L620 ${GROUND - 340} L900 ${GROUND - 560} L1250 ${GROUND - 300} L1600 ${GROUND - 470} L1600 ${GROUND} L-500 ${GROUND}Z" fill="${c[0]}" ${ol(5)}/>
  <path d="M-500 ${GROUND - 140} L-100 ${GROUND - 300} L250 ${GROUND - 190} L560 ${GROUND - 330} L860 ${GROUND - 200} L1200 ${GROUND - 320} L1600 ${GROUND - 180} L1600 ${GROUND} L-500 ${GROUND}Z" fill="${c[1]}" ${ol(5)}/>
  <path d="M300 ${GROUND - 610} l-40 60 l30 -10 l20 30 l25 -40 z M900 ${GROUND - 560} l-35 55 l25 -8 l18 25 l22 -35z" fill="#fff" opacity="${time === 'night' ? .25 : .7}"/>`;
}
function cityWall(x, y, w, h, time) {
  const c = time === 'night' || time === 'eclipse' ? '#3a2f2a' : time === 'dawn' ? '#9a6a4e' : '#c08a5c';
  let s = `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${c}" ${ol(5)}/>`;
  for (let i = 0; i < w / 30; i++) s += `<rect x="${x + i * 30}" y="${y - h - 18}" width="18" height="20" fill="${c}" ${ol(4)}/>`;
  for (let t = 0; t < 3; t++) { const tx = x + w * (.1 + t * .4); s += `<rect x="${tx}" y="${y - h - 70}" width="60" height="${h + 70}" fill="${c}" ${ol(5)}/>` + [0, 1, 2].map(i => `<rect x="${tx + i * 22}" y="${y - h - 88}" width="14" height="20" fill="${c}" ${ol(3)}/>`).join(''); }
  s += `<path d="M${x + w * .45} ${y} L${x + w * .45} ${y - h * .55} Q${x + w * .5} ${y - h * .9} ${x + w * .55} ${y - h * .55} L${x + w * .55} ${y}Z" fill="#2a1d16" ${ol(4)}/>`;
  for (let i = 0; i < 8; i++) s += `<path d="M${x + rnd(i + 7) * w} ${y - rnd(i + 2) * h} h${20 + rnd(i) * 30}" stroke="#000" stroke-opacity=".18" stroke-width="4"/>`;
  return s;
}
function mudHouse(x, gy, w, h, o = {}) {
  const c = o.c || '#b37b4e', time = o.time || 'day';
  const dark = time === 'night' || time === 'eclipse';
  let s = `<rect x="${x}" y="${gy - h}" width="${w}" height="${h}" fill="${dark ? '#4a3428' : c}" ${ol(6)}/>
   <path d="M${x - 10} ${gy - h} h${w + 20}" stroke="${INK}" stroke-width="10"/>
   <rect x="${x + w * .38}" y="${gy - h * .62}" width="${w * .24}" height="${h * .62}" rx="${w * .12}" fill="#3a2414" ${ol(5)}/>
   <rect x="${x + w * .1}" y="${gy - h * .7}" width="${w * .14}" height="${h * .16}" fill="${o.lit ? '#ffcf7a' : '#2a1a10'}" ${ol(4)}/>`;
  for (let i = 0; i < 5; i++) s += `<path d="M${x + 10 + rnd(i + x) * (w - 40)} ${gy - 20 - rnd(i + x + 3) * (h - 40)} q10 -4 26 0" stroke="#000" stroke-opacity=".16" stroke-width="4" fill="none"/>`;
  s += `<path d="M${x + w * .7} ${gy - h - 4} l0 -30 l14 0 l0 30" fill="#6b4a32" ${ol(3)}/>`;
  return s;
}
function ground(time, c) {
  const col = c || (time === 'night' || time === 'eclipse' ? '#3a2e26' : time === 'dawn' ? '#8a6040' : '#b98d5e');
  let s = `<rect x="-600" y="${GROUND}" width="${W + 1200}" height="1200" fill="${col}" ${ol(6)}/>`;
  for (let i = 0; i < 24; i++) s += `<path d="M${rnd(i + 1) * 1500 - 220} ${GROUND + 30 + rnd(i + 30) * 420} q20 -6 44 0" stroke="#000" stroke-opacity=".18" stroke-width="5" fill="none"/>`;
  for (let i = 0; i < 10; i++) s += `<ellipse cx="${rnd(i + 70) * 1500 - 220}" cy="${GROUND + 60 + rnd(i + 90) * 380}" rx="${8 + rnd(i) * 10}" ry="6" fill="#6b5a48" ${ol(3)}/>`;
  return s;
}
function palm(x, gy, h = 420) {
  return `<path d="M${x} ${gy} Q${x + 30} ${gy - h / 2} ${x + 10} ${gy - h}" stroke="#5a3d24" stroke-width="26" fill="none"/><path d="M${x} ${gy} Q${x + 30} ${gy - h / 2} ${x + 10} ${gy - h}" stroke="${INK}" stroke-width="5" fill="none" opacity=".5"/>` +
    [-150, -110, -60, 0, 60, 110, 150].map(a => { const [ex, ey] = pt(x + 10, gy - h, 180 - a, 170); return `<path d="M${x + 10} ${gy - h} Q${(x + 10 + ex) / 2} ${ey - 60} ${ex} ${ey}" stroke="#3f6b2e" stroke-width="22" fill="none" stroke-linecap="round"/>`; }).join('');
}
// exterior village: o.time, o.wall (show city wall), o.view (x offset)
function village(o = {}) {
  const time = o.time || 'day', dark = time === 'night' || time === 'eclipse';
  let s = sky(time, gid('sk'));
  if (o.moon) s += moon(...o.moon);
  else if (time === 'day') s += `<circle cx="860" cy="260" r="70" fill="#fff4c8" opacity=".9"/>`;
  else if (time === 'dawn') s += `<circle cx="300" cy="${GROUND - 380}" r="90" fill="#ffd08a" opacity=".9"/>`;
  s += mountains(time);
  if (o.wall !== false) s += cityWall(o.wallX ?? 620, GROUND - 230, 820, 150, time);
  s += `<rect x="-600" y="${GROUND - 240}" width="${W + 1200}" height="240" fill="${dark ? '#2e251f' : time === 'dawn' ? '#7a5638' : '#a87e52'}"/>`;
  s += mudHouse(-260, GROUND - 40, 300, 260, { time, lit: dark, c: '#a56e44' });
  s += mudHouse(80, GROUND - 60, 240, 220, { time, c: '#b88454', lit: dark });
  s += palm(980, GROUND - 30, 380);
  s += mudHouse(760, GROUND + 10, 340, 300, { time, c: '#9c6a42', lit: dark });
  s += ground(time);
  return s;
}
// interior of the mud room: o.time ('night','dawn','day'), candle shown
function houseInt(o = {}) {
  const time = o.time || 'day';
  const wall = time === 'night' ? '#3a2a20' : '#6a4a32', floor = time === 'night' ? '#2b1e16' : '#4e3626';
  let s = `<rect x="-600" y="-600" width="${W + 1200}" height="${GROUND + 600}" fill="${wall}"/>`;
  for (let i = 0; i < 18; i++) s += `<path d="M${rnd(i + 3) * 1500 - 220} ${200 + rnd(i + 11) * 1100} q30 -8 70 0" stroke="#000" stroke-opacity=".2" stroke-width="6" fill="none"/>`;
  for (let i = 0; i < 9; i++) s += `<path d="M${-300 + i * 200} 120 l60 0" stroke="#2a1a10" stroke-width="16" stroke-linecap="round"/>`;
  s += `<rect x="-600" y="90" width="${W + 1200}" height="40" fill="#3b2616" ${ol(5)}/>`;
  const win = time === 'night' ? '#1b2645' : time === 'dawn' ? '#f0a868' : '#cfe3ea';
  s += `<rect x="700" y="560" width="190" height="230" rx="95" fill="${win}" ${ol(7)}/><path d="M795 560 v230 M700 690 h190" stroke="#3b2616" stroke-width="10"/>`;
  s += `<rect x="-600" y="${GROUND - 40}" width="${W + 1200}" height="1200" fill="${floor}" ${ol(6)}/>`;
  s += `<path d="M120 ${GROUND - 10} L960 ${GROUND - 10} L1040 ${GROUND + 120} L40 ${GROUND + 120}Z" fill="#c9a45c" ${ol(6)}/>` + [0, 1, 2, 3, 4, 5].map(i => `<path d="M${120 + i * 150} ${GROUND - 10} L${60 + i * 170} ${GROUND + 120}" stroke="#8a6a32" stroke-width="5"/>`).join('');
  s += `<path d="M60 600 h110 v40 h-110z" fill="#5a3a22" ${ol(4)}/><path d="M80 600 q10 -60 30 -60 q20 0 30 60" fill="#b06a3a" ${ol(4)}/>`;
  return s;
}
function candleAlarm(x, y, melt = 0, dropped = 0, lit = 1, t = 0) {
  const h = lerp(160, 70, melt);
  const fl = lit ? `<path d="M${x} ${y - h - 50 + wob(t, 6, 3)} q16 24 0 46 q-16 -22 0 -46z" fill="#ffcf5a" stroke="#c46a1a" stroke-width="3"/><circle cx="${x}" cy="${y - h - 20}" r="70" fill="#ffb347" opacity=".18" filter="url(#soft)"/>` : '';
  const nailY = dropped ? lerp(y - h * .5, y + 6, clamp(dropped)) : y - h * .55;
  return `<ellipse cx="${x}" cy="${y + 22}" rx="80" ry="18" fill="#b9b2a2" ${ol(5)}/><ellipse cx="${x}" cy="${y + 16}" rx="56" ry="10" fill="#d8d2c4"/>
   <rect x="${x - 26}" y="${y - h}" width="52" height="${h + 10}" rx="8" fill="#f0e6cc" ${ol(5)}/><path d="M${x - 18} ${y - h + 6} q4 30 -2 50" stroke="#e0d2ae" stroke-width="7" fill="none"/>
   <path d="M${x} ${y - h - 4} v-12" stroke="${INK}" stroke-width="4"/>${fl}
   <g transform="rotate(${dropped ? 70 * clamp(dropped) : 0} ${x + 40} ${nailY})"><path d="M${x + 22} ${nailY} h50" stroke="#6b6b6b" stroke-width="7" stroke-linecap="round"/><path d="M${x + 70} ${nailY - 9} v18" stroke="#555" stroke-width="7" stroke-linecap="round"/></g>`;
}
function phone(x, y, ang = 0, scale = 1, o = {}) {
  const on = o.on ?? 1, bat = o.bat;
  return `<g transform="translate(${x} ${y}) rotate(${ang}) scale(${scale})"><rect x="-26" y="-46" width="52" height="92" rx="10" fill="#1b1b1f" ${ol(4)}/>
   <rect x="-21" y="-39" width="42" height="76" rx="5" fill="${on ? (o.screen || '#8fd0ff') : '#0c0c10'}"/>
   ${o.torch ? `<circle cx="0" cy="-40" r="10" fill="#fffbe6"/>` : ''}
   ${bat != null && on ? `<rect x="-14" y="-30" width="28" height="13" rx="3" fill="none" stroke="#fff" stroke-width="2.5"/><rect x="-12" y="-28" width="${24 * bat / 100}" height="9" fill="${bat < 20 ? '#ff4a3a' : '#5ee06a'}"/>` : ''}</g>`;
}
// big phone screen close-up (battery %, no signal, app etc.)
function phoneBig(x, y, s, o = {}) {
  const bat = o.bat ?? 87;
  let scr = '';
  if (o.mode === 'battery') scr = `<rect x="-120" y="-60" width="220" height="110" rx="18" fill="none" stroke="#fff" stroke-width="10"/><rect x="100" y="-25" width="18" height="40" rx="5" fill="#fff"/><rect x="-108" y="-48" width="${196 * bat / 100}" height="86" rx="10" fill="${bat < 20 ? '#ff4a3a' : bat < 50 ? '#f2c94c' : '#5ee06a'}"/>
     <text x="0" y="150" text-anchor="middle" font-family="Alexandria" font-weight="900" font-size="110" fill="#fff">${bat}%</text>`;
  else if (o.mode === 'nosignal') scr = [0, 1, 2, 3].map(i => `<rect x="${-90 + i * 50}" y="${40 - i * 40}" width="34" height="${40 + i * 40}" rx="6" fill="#555"/>`).join('') + `<path d="M-120 -140 L120 120 M120 -140 L-120 120" stroke="#ff4a3a" stroke-width="22" stroke-linecap="round"/>`;
  else if (o.mode === 'photo') scr = o.photo || '';
  else if (o.mode === 'app') scr = `<rect x="-170" y="-330" width="340" height="660" fill="#0a1230"/>` + [...Array(30)].map((_, i) => `<circle cx="${rnd(i) * 320 - 160}" cy="${rnd(i + 5) * 600 - 300}" r="3" fill="#fff"/>`).join('') + moon(0, -40, 90, o.ecl ?? .6) + `<text x="0" y="160" text-anchor="middle" font-family="Alexandria" font-weight="900" font-size="64" fill="#fff">1760</text><rect x="-120" y="200" width="240" height="60" rx="30" fill="#ff5a4a"/>`;
  else if (o.mode === 'dead') scr = '';
  else if (o.mode === 'clock') scr = `<text x="0" y="40" text-anchor="middle" font-family="Alexandria" font-weight="900" font-size="150" fill="#fff">--:--</text>`;
  const on = o.mode !== 'dead';
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-200" y="-380" width="400" height="760" rx="50" fill="#16161a" ${ol(8)}/>
    <rect x="-176" y="-350" width="352" height="700" rx="30" fill="${on ? (o.bg || '#1d3557') : '#050507'}"/><g>${on ? scr : ''}</g>
    <rect x="-50" y="-340" width="100" height="22" rx="11" fill="#000"/></g>`;
}
function hand(x, y, s = 1) { return `<circle cx="${x}" cy="${y}" r="${19 * s}" fill="#f6f5f2" stroke="${INK}" stroke-width="${5 * s}"/>`; }
function torch(x, y, t = 0, s = 1) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-6 0 L6 0 L4 120 L-4 120Z" fill="#6b4a2a" ${ol(4)}/><path d="M-14 0 q14 ${-70 + wob(t, 5, 8)} 28 0 q-14 10 -28 0z" fill="#ff9a2a" stroke="#c4421a" stroke-width="3"/><path d="M-7 -2 q7 ${-38 + wob(t, 7, 5)} 14 0z" fill="#ffe27a"/></g>`; }
function brazier(x, y, t = 0, glow = 1) { return `<path d="M${x - 70} ${y} L${x + 70} ${y} L${x + 50} ${y + 60} L${x - 50} ${y + 60}Z" fill="#5a4a3e" ${ol(5)}/>` + [...Array(7)].map((_, i) => `<circle cx="${x - 50 + i * 17}" cy="${y - 6 + wob(t + i, 1.5, 2)}" r="14" fill="${i % 2 ? '#ff6a1a' : '#c42a10'}" ${ol(3)}/>`).join('') + `<circle cx="${x}" cy="${y - 20}" r="90" fill="#ff6a1a" opacity="${.2 * glow}" filter="url(#soft)"/>`; }
function nailRod(x, y, ang, hot = 0) { return `<g transform="translate(${x} ${y}) rotate(${ang})"><path d="M0 0 h150" stroke="${hot > 0 ? `rgb(${Math.round(lerp(110, 255, hot))},${Math.round(lerp(110, 70, hot))},${Math.round(lerp(110, 30, hot))})` : '#6b6b6b'}" stroke-width="10" stroke-linecap="round"/><path d="M0 0 h50" stroke="#5a3a22" stroke-width="16" stroke-linecap="round"/></g>`; }
function bed(x, y, o = {}) { return `<path d="M${x - 260} ${y} h520 v60 h-520z" fill="#c9a45c" ${ol(5)}/><path d="M${x - 250} ${y - 40} q260 -30 500 0 v50 h-500z" fill="${o.c || '#8c4a3a'}" ${ol(5)}/>`; }
function blanket(x, y, w = 520, c = '#8c4a3a') { return `<path d="M${x - w / 2} ${y - 50} q${w / 2} -40 ${w} 0 l10 70 h${-w - 20}z" fill="${c}" ${ol(6)}/><path d="M${x - w / 3} ${y - 40} q20 30 0 60 M${x + w / 6} ${y - 50} q20 30 0 60" stroke="#000" stroke-opacity=".2" stroke-width="5" fill="none"/>`; }
function teaTray(x, y) { return `<ellipse cx="${x}" cy="${y}" rx="120" ry="26" fill="#c9b27a" ${ol(5)}/><path d="M${x - 70} ${y - 10} q0 -70 40 -80 q40 10 40 80z" fill="#d8d6cf" ${ol(5)}/><path d="M${x + 10} ${y - 50} q40 -10 50 -40" stroke="${INK}" stroke-width="6" fill="none"/><rect x="${x + 40}" y="${y - 40}" width="30" height="40" rx="4" fill="#d9a441" opacity=".85" ${ol(4)}/><ellipse cx="${x - 100}" cy="${y - 10}" rx="40" ry="14" fill="#c48a44" ${ol(4)}/>`; }
function bag(x, y) { return `<path d="M${x - 70} ${y} q-10 -110 70 -120 q80 10 70 120z" fill="#2c4a6b" ${ol(6)}/><path d="M${x - 40} ${y - 70} h80" stroke="#1a2a3b" stroke-width="8"/>`; }
function powerbank(x, y, ang = 0, broken = 0) { return `<g transform="translate(${x} ${y}) rotate(${ang})"><rect x="-60" y="-34" width="120" height="68" rx="8" fill="#26303a" ${ol(5)}/><rect x="-48" y="-24" width="96" height="48" fill="#284a7a"/>${[0, 1, 2].map(i => `<path d="M${-48 + i * 32} -24 v48" stroke="#6fa0d8" stroke-width="2"/>`).join('')}${broken ? `<path d="M-40 -20 L-5 5 L-20 10 L30 24" stroke="#fff" stroke-width="4" fill="none"/>` : ''}</g>`; }
function pills(x, y, ang = 0) { return `<g transform="translate(${x} ${y}) rotate(${ang})"><rect x="-50" y="-24" width="100" height="48" rx="8" fill="#e8eef2" ${ol(4)}/>${[0, 1, 2, 3].map(i => `<circle cx="${-33 + i * 22}" cy="0" r="8" fill="#fff" stroke="#999" stroke-width="2"/>`).join('')}</g>`; }
function lighter(x, y, flame = 0, t = 0) { return `<rect x="${x - 14}" y="${y - 30}" width="28" height="56" rx="5" fill="#d23a2a" ${ol(4)}/>${flame ? `<path d="M${x} ${y - 70 + wob(t, 6, 3)} q14 20 0 38 q-14 -18 0 -38z" fill="#ffcf5a" stroke="#c46a1a" stroke-width="3"/>` : ''}`; }
function stone(x, y, r = 22) { return `<path d="M${x - r} ${y} q${-r * .2} ${-r} ${r * .6} ${-r} q${r} ${r * .2} ${r * .5} ${r} q${-r * .6} ${r * .4} ${-r * 1.1} 0z" fill="#8a8178" ${ol(4)}/>`; }
function well(x, gy, o = {}) {
  let s = `<ellipse cx="${x}" cy="${gy - 140}" rx="190" ry="48" fill="#4a4038" ${ol(6)}/><path d="M${x - 190} ${gy - 140} v130 q190 60 380 0 v-130" fill="#8a7a68" ${ol(6)}/>`;
  for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) s += `<path d="M${x - 180 + i * 64 + (r % 2) * 30} ${gy - 120 + r * 40} h50" stroke="#5a4a3e" stroke-width="5"/>`;
  if (o.water) s += `<ellipse cx="${x}" cy="${gy - 136}" rx="160" ry="36" fill="${o.poison ? '#3f5a2a' : '#2a4a6a'}"/>`;
  if (o.leaves) s += [...Array(9)].map((_, i) => `<ellipse cx="${x - 120 + rnd(i) * 240}" cy="${gy - 140 + rnd(i + 4) * 20 - 10}" rx="22" ry="7" fill="#2f6b2a" transform="rotate(${rnd(i + 9) * 180} ${x - 120 + rnd(i) * 240} ${gy - 140})" ${ol(2)}/>`).join('');
  if (o.cover) s += `<path d="M${x - 200} ${gy - 160} h400 v30 h-400z" fill="#7a5632" ${ol(5)}/><path d="M${x - 200} ${gy - 175} h400" stroke="#5a3a22" stroke-width="5"/>`;
  if (o.goat) s += goat(x + 280, gy, o.t || 0);
  if (o.dirt) s += `<path d="M${x - 60} ${gy - 150} q20 -20 40 0 M${x + 40} ${gy - 145} q10 -14 26 0" stroke="#3a2a1a" stroke-width="7" fill="none"/>`;
  return s;
}
function goat(x, gy, t = 0) { return `<g transform="translate(${x} ${gy})"><ellipse cx="0" cy="-90" rx="80" ry="45" fill="#efe8dc" ${ol(5)}/>${[-50, -25, 25, 50].map((lx, i) => `<path d="M${lx} -60 l${wob(t + i, 1, 4)} 60" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`).join('')}<circle cx="-85" cy="-${130 + wob(t, .5, 4)}" r="30" fill="#efe8dc" ${ol(5)}/><path d="M-95 -158 q-10 -30 -30 -30 M-75 -158 q0 -30 -16 -34" stroke="${INK}" stroke-width="6" fill="none"/><circle cx="-95" cy="-${132 + wob(t, .5, 4)}" r="4" fill="${INK}"/></g>`; }
function horse(x, gy, t = 0, dir = 1, rider = 'soldier', s = 1, gallop = 1) {
  const k = Math.sin(t * 9) * gallop;
  const body = `<g transform="translate(${x} ${gy + Math.abs(k) * -10}) scale(${dir * s} ${s})">
   ${[-80, -50, 60, 90].map((lx, i) => `<path d="M${lx} -150 l${(i % 2 ? 1 : -1) * k * 30} 75 l${(i % 2 ? -1 : 1) * k * 10} 70" stroke="#3a2618" stroke-width="16" stroke-linecap="round" fill="none"/>`).join('')}
   <ellipse cx="0" cy="-190" rx="140" ry="65" fill="#5a3a24" ${ol(6)}/><path d="M100 -220 L170 -330 L230 -300 L200 -270 L140 -190z" fill="#5a3a24" ${ol(6)}/>
   <path d="M120 -260 L160 -330 l-20 -10" stroke="#1a120c" stroke-width="16" fill="none"/><path d="M-130 -210 q-60 20 -50 90" stroke="#1a120c" stroke-width="18" fill="none" stroke-linecap="round"/><circle cx="200" cy="-310" r="5" fill="#000"/>
   <path d="M-60 -250 h110 l-10 40 h-90z" fill="#8f1d1d" ${ol(4)}/></g>`;
  const r = rider ? person(rider, { x: x - 10 * dir, y: gy - 330 * s + Math.abs(k) * -10, s: s * .8, dir, pose: { ...P.sit(), aR: [70, 30] } }) : '';
  return body + r;
}
function casbah(o = {}) {
  const time = o.time || 'night';
  let s = sky(time, gid('sk'));
  if (o.moon) s += moon(...o.moon);
  const c = time === 'night' || time === 'eclipse' ? '#4a362a' : '#b88454';
  s += `<rect x="-600" y="${GROUND - 900}" width="${W + 1200}" height="900" fill="${c}" ${ol(6)}/>`;
  for (let i = 0; i < 40; i++) s += `<rect x="${-600 + i * 60}" y="${GROUND - 935}" width="36" height="38" fill="${c}" ${ol(4)}/>`;
  for (let i = 0; i < 30; i++) s += `<path d="M${rnd(i + 2) * 1500 - 220} ${GROUND - 860 + rnd(i + 5) * 800} h${30 + rnd(i) * 40}" stroke="#000" stroke-opacity=".2" stroke-width="5"/>`;
  s += `<path d="M380 ${GROUND} L380 ${GROUND - 420} Q540 ${GROUND - 640} 700 ${GROUND - 420} L700 ${GROUND}Z" fill="#20150f" ${ol(7)}/><path d="M340 ${GROUND} L340 ${GROUND - 430} Q540 ${GROUND - 700} 740 ${GROUND - 430} L740 ${GROUND}" fill="none" stroke="#d8b98a" stroke-width="18"/>`;
  s += `<rect x="-600" y="${GROUND}" width="${W + 1200}" height="1200" fill="#5c4a3a" ${ol(6)}/>` + [...Array(12)].map((_, i) => `<path d="M${-300 + i * 140} ${GROUND} l-80 600" stroke="#000" stroke-opacity=".15" stroke-width="5"/>`).join('');
  s += torch(170, GROUND - 620, o.t || 0, 1.1) + torch(910, GROUND - 620, (o.t || 0) + .3, 1.1);
  return s;
}
function prison(o = {}) {
  let s = `<rect x="-600" y="-600" width="${W + 1200}" height="${GROUND + 600}" fill="#2a2420"/>`;
  for (let r = 0; r < 26; r++) for (let i = 0; i < 12; i++) s += `<rect x="${-400 + i * 170 + (r % 2) * 85}" y="${-300 + r * 70}" width="160" height="62" fill="#352d27" stroke="#1a1512" stroke-width="5"/>`;
  s += `<rect x="560" y="420" width="260" height="200" fill="${o.moonlit ? '#1d2a4a' : '#0c1020'}" ${ol(7)}/>` + [0, 1, 2, 3].map(i => `<path d="M${595 + i * 60} 420 v200" stroke="#3a3a3a" stroke-width="14"/>`).join('');
  if (o.moonlit) s += `<circle cx="760" cy="470" r="28" fill="#f4f0dc"/>` + `<path d="M560 620 L380 ${GROUND} L1100 ${GROUND} L820 620Z" fill="#9fb4ff" opacity=".08"/>`;
  s += `<rect x="-600" y="${GROUND - 20}" width="${W + 1200}" height="1200" fill="#1e1915" ${ol(6)}/>` + [...Array(10)].map((_, i) => `<path d="M${rnd(i) * 1200 - 60} ${GROUND + 40 + rnd(i + 2) * 300} q30 -8 60 0" stroke="#000" stroke-opacity=".3" stroke-width="5" fill="none"/>`).join('');
  return s;
}
function treeStake(x, gy, o = {}) {
  let s = `<path d="M${x - 40} ${gy} Q${x - 20} ${gy - 500} ${x - 60} ${gy - 900} L${x + 40} ${gy - 900} Q${x + 30} ${gy - 500} ${x + 50} ${gy}Z" fill="#4a3220" ${ol(6)}/>` +
    `<path d="M${x - 40} ${gy - 800} Q${x - 240} ${gy - 900} ${x - 320} ${gy - 1100} M${x + 30} ${gy - 760} Q${x + 220} ${gy - 860} ${x + 330} ${gy - 1050}" stroke="#4a3220" stroke-width="34" fill="none" stroke-linecap="round"/>` +
    [...Array(7)].map((_, i) => `<circle cx="${x - 360 + i * 120}" cy="${gy - 1120 - rnd(i) * 120}" r="${110 + rnd(i + 3) * 40}" fill="#3a5a2a" ${ol(5)}/>`).join('');
  if (o.wood) s += [...Array(14)].map((_, i) => `<rect x="${x - 230 + (i % 7) * 66}" y="${gy - 40 - Math.floor(i / 7) * 34}" width="80" height="30" rx="12" fill="#7a5632" transform="rotate(${rnd(i) * 20 - 10} ${x - 200 + (i % 7) * 66} ${gy - 30})" ${ol(4)}/>`).join('');
  return s;
}
function fire(x, y, t, k = 1, w = 260) {
  if (k <= 0) return '';
  return [...Array(9)].map((_, i) => { const fx = x - w / 2 + i * w / 8, h = (110 + rnd(i) * 120) * k * (1 + .2 * Math.sin(t * 9 + i)); return `<path d="M${fx - 30} ${y} q30 ${-h} ${30 + wob(t, 3, 10, i)} ${-h * 1.3} q30 ${h * .5} 30 ${h * 1.3}z" fill="${i % 2 ? '#ff8a1a' : '#ffcf3a'}" stroke="#c4421a" stroke-width="3" opacity=".95"/>`; }).join('') + `<circle cx="${x}" cy="${y - 100 * k}" r="${200 * k}" fill="#ff7a1a" opacity=".25" filter="url(#soft)"/>`;
}
function smoke(x, y, t, k = 1) { return [...Array(6)].map((_, i) => { const p = ((t * .4 + i / 6) % 1); return `<circle cx="${x + wob(t, .5, 40, i) + i * 10}" cy="${y - p * 600}" r="${50 + p * 90}" fill="#777" opacity="${(1 - p) * .35 * k}" filter="url(#blur6)"/>`; }).join(''); }
function cityRoom(o = {}) {
  let s = `<rect x="-600" y="-600" width="${W + 1200}" height="${GROUND + 600}" fill="#cfd6dd"/>` + `<rect x="80" y="420" width="380" height="460" fill="${o.night ? '#16213a' : '#9fd0f0'}" ${ol(7)}/><path d="M270 420 v460 M80 650 h380" stroke="#fff" stroke-width="12"/>`;
  s += [...Array(8)].map((_, i) => `<rect x="${110 + i * 42}" y="${700 + (i % 3) * 40}" width="30" height="${180 - (i % 3) * 40}" fill="#3a4a62"/>`).join('');
  s += `<rect x="760" y="900" width="70" height="90" rx="10" fill="#f4f4f4" ${ol(4)}/><circle cx="782" cy="945" r="7" fill="${INK}"/><circle cx="808" cy="945" r="7" fill="${INK}"/>`;
  s += `<rect x="-600" y="${GROUND - 20}" width="${W + 1200}" height="1200" fill="#9a7a5a" ${ol(6)}/>` + [...Array(10)].map((_, i) => `<path d="M${-300 + i * 160} ${GROUND - 20} v1200" stroke="#7a5a3e" stroke-width="5"/>`).join('');
  s += `<rect x="640" y="${GROUND - 220}" width="200" height="200" fill="#6a4a32" ${ol(6)}/>`;
  return s;
}
function alarmPhone(x, y, t, ring) { const sh = ring ? wob(t, 14, 6) : 0; return `<g transform="translate(${x + sh} ${y}) rotate(${sh})">${phone(0, 0, -80, 1.2, { screen: ring ? '#ff6a4a' : '#8fd0ff' })}</g>` + (ring ? `<path d="M${x - 70} ${y - 50} q-16 30 0 60 M${x + 70} ${y - 50} q16 30 0 60" stroke="#ff4a3a" stroke-width="6" fill="none"/>` : ''); }
function museum(o = {}) {
  let s = `<rect x="-600" y="-600" width="${W + 1200}" height="${GROUND + 600}" fill="#e9e4da"/>` + `<rect x="-600" y="${GROUND - 20}" width="${W + 1200}" height="1200" fill="#b7a58c" ${ol(6)}/>` + `<path d="M-600 1180 h${W + 1200}" stroke="#cfc8b8" stroke-width="16"/>`;
  s += `<circle cx="540" cy="-100" r="500" fill="#fff6d8" opacity=".5" filter="url(#soft)"/>`;
  s += painting(540, 720, 1);
  s += `<rect x="440" y="1080" width="200" height="50" rx="6" fill="#f7f3ea" ${ol(3)}/><text x="540" y="1116" text-anchor="middle" font-family="Alexandria" font-weight="800" font-size="30" fill="${INK}">1760</text>`;
  return s;
}
function painting(cx, cy, s = 1, caption = 0) {
  const w = 760, h = 560;
  let p = `<g transform="translate(${cx} ${cy}) scale(${s})"><rect x="${-w / 2 - 40}" y="${-h / 2 - 40}" width="${w + 80}" height="${h + 80}" fill="#8a5a24" ${ol(8)}/><rect x="${-w / 2 - 22}" y="${-h / 2 - 22}" width="${w + 44}" height="${h + 44}" fill="#c4913c"/>
   <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#d9b77a"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h * .5}" fill="#c9a26a"/>
   <path d="M${-w / 2} ${-20} l120 -120 l140 90 l160 -140 l200 150 l140 -80 v100z" fill="#9a7a5a" opacity=".8"/>
   <rect x="80" y="-90" width="300" height="70" fill="#a87a4a"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<rect x="${84 + i * 33}" y="-108" width="18" height="20" fill="#a87a4a"/>`).join('')}
   <rect x="${-w / 2}" y="40" width="${w}" height="${h / 2 - 40}" fill="#b08a5a"/>`;
  const fig = (x, sc, extra = '') => `<g transform="translate(${x} 140) scale(${sc})"><circle cx="0" cy="-90" r="34" fill="#f1ece0" stroke="#3a2a1a" stroke-width="5"/><path d="M0 -56 v70 M0 -30 l-30 30 M0 -30 l30 30 M0 14 l-20 50 M0 14 l20 50" stroke="#3a2a1a" stroke-width="7" stroke-linecap="round"/>${extra}</g>`;
  p += fig(-300, .9) + fig(-200, .95) + fig(-100, .85) + fig(220, .9) + fig(300, .95);
  p += fig(60, 1.1, `<path d="M-34 -100 q34 -40 68 0z M30 -104 q30 -4 40 8 l-40 4z" fill="#b8231f" stroke="#3a2a1a" stroke-width="4"/>`);
  p += fig(-20, .7, `<path d="M30 -20 l0 -40" stroke="#efe6cc" stroke-width="10"/><path d="M30 -70 q6 8 0 14 q-6 -6 0 -14z" fill="#ffcf5a"/>`);
  p += `<path d="M10 120 L40 120" stroke="#3a2a1a" stroke-width="6"/>`;
  p += `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="url(#paint)" opacity=".25"/></g>`;
  return p;
}
// CTA card
function ctaCard(lt) {
  const k = span(lt, 0, .5, back);
  return `<rect x="-600" y="-600" width="${W + 1200}" height="${H + 1200}" fill="#1a1530"/>` + [...Array(14)].map((_, i) => `<path d="M540 960 L${540 + Math.cos(i / 14 * Math.PI * 2 + lt * .3) * 1600} ${960 + Math.sin(i / 14 * Math.PI * 2 + lt * .3) * 1600} L${540 + Math.cos((i + .5) / 14 * Math.PI * 2 + lt * .3) * 1600} ${960 + Math.sin((i + .5) / 14 * Math.PI * 2 + lt * .3) * 1600}Z" fill="#2a2250"/>`).join('') +
    person('yassine', { x: 300, gy: 1560, s: 1.2, dir: 1, pose: { ...P.point(), aR: [140 + wob(lt, 2, 6), 0] }, face: { eyes: blink(lt) || 'happy', mouth: 'grin' } }) +
    `<g transform="translate(720 ${760 + wob(lt, 1.2, 10)}) rotate(${wob(lt, 3, 12)}) scale(${k})"><path d="M-110 60 Q-110 -120 0 -130 Q110 -120 110 60 L140 100 H-140Z" fill="#ffc83a" ${ol(8)}/><circle cx="0" cy="125" r="32" fill="#ffc83a" ${ol(7)}/><path d="M-60 -60 q20 -40 50 -44" stroke="#fff" stroke-width="12" fill="none" opacity=".6"/></g>` +
    `<g transform="translate(560 1660) scale(${k})"><rect x="-230" y="-70" width="460" height="140" rx="70" fill="#ff3b5c" ${ol(7)}/><text x="0" y="28" text-anchor="middle" font-family="Alexandria" font-weight="900" font-size="80" fill="#fff" direction="rtl">فولو +</text></g>`;
}

// ---------- shot helpers ----------
const C = (x, y, z, r = 0) => ({ x, y, z, r });
const mv = (lt, D, a, b, f = lin) => camLerp(a, b, span(lt, 0, D, f));
const yas = (o = {}) => person('yassine', o);
const flash = (lt, at, d = .25) => { const k = clamp(1 - Math.abs(lt - at) / d); return k > 0 ? `<rect width="${W}" height="${H}" fill="#fff" opacity="${k}"/>` : ''; };
const waves = (x, y, t, c = '#fff') => [0, 1, 2].map(i => { const p = (t * .8 + i / 3) % 1; return `<path d="M${x - 30 - p * 80} ${y - 40 - p * 60} q${-30 - p * 30} ${40 + p * 60} 0 ${80 + p * 120}" stroke="${c}" stroke-width="7" fill="none" opacity="${1 - p}"/>`; }).join('');
const CTA = { L: 'دير فولو 🔔', f: (lt, D) => ({ world: ctaCard(lt), light: '', cam: mv(lt, D, C(540, 1000, 1.0), C(540, 1000, 1.08)) }) };
const tear = (x, y, t) => { const p = (t * .7) % 1; return `<path d="M${x} ${y + p * 90} q-10 20 0 30 q10 -10 0 -30z" fill="#9fd3f0" stroke="#4d7f9c" stroke-width="3" opacity="${1 - p * .6}"/>`; };
function cup(x, y) { return `<path d="M${x - 22} ${y - 30} h44 l-6 50 h-32z" fill="#c48a44" ${ol(4)}/><ellipse cx="${x}" cy="${y - 30}" rx="22" ry="6" fill="#4a7aa8"/>`; }
function gifts(x, y, k) { const items = [(a, b) => `<ellipse cx="${a}" cy="${b}" rx="60" ry="22" fill="#c48a44" ${ol(4)}/>`, (a, b) => `<path d="M${a - 30} ${b + 20} q-6 -60 30 -60 q36 0 30 60z" fill="#e0a73c" ${ol(4)}/><path d="M${a - 30} ${b - 20} h60" stroke="#8a5a1a" stroke-width="5"/>`, (a, b) => `<ellipse cx="${a}" cy="${b}" rx="22" ry="28" fill="#f4ecd8" ${ol(4)}/>`, (a, b) => `<path d="M${a - 34} ${b + 20} q0 -50 34 -50 q34 0 34 50z" fill="#efe2a0" ${ol(4)}/>`];
  let s = ''; const n = Math.floor(k * 14); for (let i = 0; i < n; i++) s += items[i % 4](x - 160 + (i % 5) * 80, y - Math.floor(i / 5) * 50); return s; }
function rope(x, y) { return `<path d="M${x - 30} ${y - 10} q30 20 60 0 M${x - 30} ${y + 10} q30 -20 60 0" stroke="#b08a4a" stroke-width="8" fill="none"/><path d="M${x} ${y} q-60 40 -160 30" stroke="#b08a4a" stroke-width="6" fill="none"/>`; }
function sword(x, y, ang, s = 1) { return `<g transform="translate(${x} ${y}) rotate(${ang}) scale(${s})"><path d="M0 -10 Q200 -30 330 0 Q200 14 0 10Z" fill="#d8dde2" ${ol(4)}/><rect x="-14" y="-30" width="14" height="60" rx="5" fill="#c4913c" ${ol(3)}/><rect x="-70" y="-9" width="56" height="18" rx="7" fill="#5a3a22" ${ol(3)}/></g>`; }
function idea(x, y, k) { return popMark(x, y, k, '💡', 110); }
function bread(x, y) { return `<ellipse cx="${x}" cy="${y}" rx="44" ry="20" fill="#c48a44" ${ol(4)}/><path d="M${x - 20} ${y - 6} q10 -8 20 0 q10 -8 20 0" stroke="#8a5a1a" stroke-width="4" fill="none"/>`; }
function pot(x, y, t, steam = 1) { return `<path d="M${x - 80} ${y - 90} h160 l-10 90 q-70 20 -140 0z" fill="#3a3a3a" ${ol(5)}/>` + (steam ? [0, 1, 2].map(i => `<path d="M${x - 40 + i * 40} ${y - 100 - ((t * 60 + i * 30) % 90)} q12 -20 0 -40" stroke="#fff" stroke-width="7" fill="none" opacity=".5"/>`).join('') : ''); }
function filterJar(x, y) { return `<path d="M${x - 70} ${y - 300} h140 v280 q-70 30 -140 0z" fill="#d9c9a8" ${ol(6)}/><rect x="${x - 62}" y="${y - 250}" width="124" height="60" fill="#e8d48a"/><rect x="${x - 62}" y="${y - 190}" width="124" height="60" fill="#2a2a2a"/><rect x="${x - 62}" y="${y - 130}" width="124" height="60" fill="#9a8a6a"/><path d="M${x} ${y - 20} v40" stroke="#4a8ad8" stroke-width="10"/><ellipse cx="${x}" cy="${y + 40}" rx="40" ry="10" fill="#4a8ad8"/>`; }
function soap(x, y) { return `<rect x="${x - 50}" y="${y - 26}" width="100" height="52" rx="16" fill="#efe6b0" ${ol(4)}/><circle cx="${x + 40}" cy="${y - 40}" r="12" fill="none" stroke="#9fd3f0" stroke-width="4"/><circle cx="${x + 60}" cy="${y - 70}" r="8" fill="none" stroke="#9fd3f0" stroke-width="4"/>`; }
function jug(x, y, pour = 0) { return `<g transform="rotate(${-40 * pour} ${x} ${y})"><path d="M${x - 40} ${y - 90} q-10 90 40 100 q50 -10 40 -100z" fill="#b06a3a" ${ol(5)}/></g>` + (pour ? `<path d="M${x + 40} ${y - 70} q30 40 20 120" stroke="#6fb0e8" stroke-width="10" fill="none"/>` : ''); }
