const IN = (o = {}) => houseInt({ time: 'day', ...o });
const fatLie = (x, face, acc = {}) => person('fatima', { x, y: 1470, pose: P.lie(), face, acc }) + blanket(x + 40, 1520, 360, '#a85a6a');
const SPECS = [
// 1
{ L: 'الدوا', f: (lt, D) => ({ world: IN() + brazier(820, 1560, lt) + person('bouchaib', { x: 760, gy: 1520, dir: -1, pose: { ...P.stand(), aR: [70, 20] }, face: { eyes: 'wide', mouth: 'O' } }) + nailRod(700, 1300, 200, 1) + yas({ x: 330, gy: 1540, dir: 1, pose: { ...P.point(), aR: [100, 0], lean: 10 }, face: { eyes: 'angry', mouth: 'scream' } }) + popMark(520, 1000, span(lt, .1, .6), '✋', 120), light: light(820, 1500, 1000, '#ff5a2a', .7, .5, 'b'), cam: mv(lt, D, C(540, 1250, 1.45), C(540, 1250, 1.6)), shake: shake(lt, .1, 14) }) },
// 2
{ f: (lt, D) => ({ world: IN() + person('bouchaib', { x: 540, gy: 1520, dir: -1, pose: { ...P.stand(), head: 8 }, face: { eyes: 'angry', mouth: 'frown' } }), light: light(780, 1450, 900, '#ff3a1a', .85, .6, 'b'), cam: mv(lt, D, C(540, 1100, 3.0), C(540, 1090, 3.4)) }) },
// 3
{ f: (lt, D) => { const y = yas({ x: 520, gy: 1560, dir: 1, pose: { ...P.stand(), aR: [100 + 30 * span(lt, 0, .6), 30] }, face: { eyes: 'open', mouth: 'smile' } }); const h = stick.last.handR;
  return { world: IN() + y + pills(h[0] + 20, h[1] - 20, -10), light: light(h[0], h[1], 900, '#ffe2a8', .6, .45, 'w'), cam: mv(lt, D, C(600, 1200, 2.3), C(620, 1200, 2.6)) }; } },
// 4
{ f: (lt, D) => { const y = yas({ x: 380, gy: 1540, dir: 1, pose: { ...P.sitFloor(), aR: { to: [560, 1380] } }, face: { eyes: 'open', mouth: 'smile' } });
  return { world: IN() + fatLie(700, { eyes: 'tired', mouth: 'wavy' }, { sweat: 1, blush: 1 }) + y + cup(560, 1395), light: light(795, 680, 1200, '#ffe2a8', .55, .35, 'w'), cam: mv(lt, D, C(560, 1360, 1.8), C(560, 1360, 2.0)) }; } },
// 5
{ f: (lt, D) => { const k = span(lt, .3, 1.2); const f = fatLie(600, { eyes: 'closed', mouth: 'flat' }, { sweat: 1 }); const h = stick.last.head;
  return { world: IN() + f + `<path d="M${h[0] - 70} ${h[1] - 60 - (1 - k) * 200} h120 l10 40 h-140z" fill="#f4f4f4" ${ol(4)}/>` + hand(h[0] - 10, h[1] - 120 - (1 - k) * 200, 1), light: light(h[0], h[1], 800, '#ffe2a8', .6, .4, 'w'), cam: mv(lt, D, C(h[0] + 60, h[1] + 20, 2.6), C(h[0] + 60, h[1] + 20, 2.9)) }; } },
// 6 hours pass
{ f: (lt, D) => { const k = span(lt, 0, D, lin); const win = k < .5 ? '#cfe3ea' : '#f0a868';
  return { world: IN({ time: k < .5 ? 'day' : 'dawn' }) + fatLie(640, { eyes: 'closed', mouth: 'flat' }) + yas({ x: 300, gy: 1520, dir: 1, pose: { ...P.sitFloor(), head: 10 + wob(lt, .5, 4) }, face: { eyes: blink(lt) || 'tired', mouth: 'flat' } }) + `<g opacity=".5">${[...Array(3)].map((_, i) => `<path d="M795 ${680} L${300 + k * 700 + i * 40} ${1500}" stroke="#ffe2a8" stroke-width="40" opacity=".15"/>`).join('')}</g>` + popMark(820, 1000, span(lt, .2, .8), '⏳', 110), light: light(795, 680, 1300, k < .5 ? '#ffe2a8' : '#f0a868', .55, .4, 'w'), cam: mv(lt, D, C(540, 1330, 1.6), C(540, 1330, 1.7)) }; } },
// 7 whispers
{ f: (lt, D) => { let s = IN() + `<rect x="60" y="760" width="300" height="700" fill="#fff1d0"/>`;
  [['wom1', 130, 1], ['man1', 250, 1], ['wom2', 370, -1]].forEach(([w, x, d], i) => s += person(w, { x, gy: 1490, s: .9, dir: d, pose: { ...P.stand(), aR: { to: 'mouth' }, lean: 10 }, face: { eyes: 'side', mouth: 'flat' } }));
  return { world: s, light: light(210, 1100, 900, '#fff1d0', .65, .3, 'door'), cam: mv(lt, D, C(260, 1200, 2.0), C(280, 1190, 2.2)) }; } },
// 8 bouchaib waits
{ f: (lt, D) => ({ world: IN() + `<rect x="60" y="760" width="300" height="700" fill="#fff1d0"/>` + person('bouchaib', { x: 210, gy: 1480, dir: 1, pose: { ...P.stand(), aL: [40, 110], aR: [40, 110] }, face: { eyes: blink(lt) || 'angry', mouth: 'smile' } }), light: light(210, 1100, 800, '#fff1d0', .7, .25, 'door'), cam: mv(lt, D, C(230, 1150, 2.4), C(230, 1140, 2.7)) }) },
// 9 eyes open
{ L: 'فاطمة فاقت', f: (lt, D) => { const f = person('fatima', { x: 600, y: 1470, pose: P.lie(), face: { eyes: lt > D * .5 ? 'open' : 'closed', mouth: 'flat' } }); const h = stick.last.head;
  return { world: IN({ time: 'dawn' }) + f + blanket(640, 1520, 360, '#a85a6a'), light: light(h[0], h[1], 800, '#f0a868', .55, .45, 'w'), cam: mv(lt, D, C(h[0] + 20, h[1], 3.4), C(h[0] + 20, h[1], 3.6)) }; } },
// 10 hungry
{ f: (lt, D) => ({ world: IN({ time: 'dawn' }) + blanket(560, 1560, 360, '#a85a6a') + person('fatima', { x: 540, gy: 1560, dir: 0, pose: { ...P.sitFloor(), aR: { to: [560, 1380] } }, face: { eyes: 'tired', mouth: 'smile' } }), light: light(795, 680, 1200, '#f0a868', .5, .45, 'w'), cam: mv(lt, D, C(540, 1350, 2.6), C(540, 1340, 2.9)) }) },
// 11 mother kisses hand
{ f: (lt, D) => { const y = yas({ x: 620, gy: 1560, dir: -1, pose: { ...P.stand(), aR: [70, 10] }, face: { eyes: 'happy', mouth: 'wavy' }, acc: { blush: 1 } }); const h = stick.last.handR;
  return { world: IN({ time: 'dawn' }) + y + person('mha', { x: 400, gy: 1560, dir: 1, pose: { ...P.stand(), lean: 25, head: 10 + wob(lt, 2, 6), aL: { to: h }, aR: { to: [h[0] - 10, h[1] + 20] } }, face: { eyes: 'happy', mouth: 'O' }, acc: { tear: 1 } }), light: light(795, 680, 1200, '#f0a868', .5, .45, 'w'), cam: mv(lt, D, C(520, 1250, 2.0), C(520, 1240, 2.2)) }; } },
// 12 zgharit
{ f: (lt, D) => { let s = village({ time: 'day' });
  [['wom1', 150], ['wom2', 330], ['mha', 760], ['kid2', 900], ['man1', 520], ['kid1', 640]].forEach(([w, x], i) => s += person(w, { x, gy: 1600 + (i % 2) * 40, s: .85, dir: x < 540 ? 1 : -1, pose: w.startsWith('wom') || w === 'mha' ? { ...P.stand(), aR: { to: 'mouth' }, aL: [150, 10] } : P.armsUp(lt + i), p: { dy: -Math.abs(wob(lt + i * .2, 2, 14)) }, face: { eyes: 'happy', mouth: 'open' } }) + (w.startsWith('wom') || w === 'mha' ? waves(x + 90, 1170, lt + i) : ''));
  return { world: s, light: light(860, 260, 1800, '#fff1c0', .3, .35, 's'), cam: mv(lt, D, C(540, 1270, 1.2), C(540, 1270, 1.3)) }; } },
// 13 mol daw
{ L: 'مول الضو', f: (lt, D) => ({ world: village({ time: 'day' }) + `<circle cx="540" cy="1300" r="${300 + wob(lt, .5, 30)}" fill="#fff3b0" opacity=".5" filter="url(#soft)"/>` + [...Array(12)].map((_, i) => `<path d="M540 1300 l${Math.cos(i / 12 * 6.28 + lt * .4) * 600} ${Math.sin(i / 12 * 6.28 + lt * .4) * 600}" stroke="#fff3b0" stroke-width="30" opacity=".25"/>`).join('') + yas({ x: 540, gy: 1620, dir: 0, pose: { ...P.stand(), aL: [40, 90], aR: [-40, -90] }, face: { eyes: 'happy', mouth: 'grin' } }), light: light(540, 1250, 1000, '#fff3b0', .45, .5, 'g'), cam: mv(lt, D, C(540, 1300, 1.9), C(540, 1280, 2.2)) }) },
// 14 gifts
{ f: (lt, D) => ({ world: IN() + yas({ x: 540, gy: 1460, dir: 0, pose: P.shrug(), face: { eyes: 'wide', mouth: 'smile' }, acc: { blush: 1 } }) + gifts(560, 1580, span(lt, 0, D * .9, lin)), light: light(795, 680, 1300, '#ffe2a8', .5, .35, 'w'), cam: mv(lt, D, C(540, 1300, 1.8), C(540, 1300, 1.95)) }) },
// 15
CTA,
// 16 people from far
{ L: 'مول الضو', f: (lt, D) => { let s = village({ time: 'day' }); for (let i = 0; i < 9; i++) { const p = ((lt * .12 + i / 9) % 1); s += person(['man1', 'wom1', 'man2', 'wom2', 'shib', 'man3', 'kid1', 'wom1', 'man2'][i], { x: lerp(1150, 420, p), gy: lerp(1290, 1720, p), s: lerp(.35, 1, p), dir: -1, pose: P.walk(lt + i), face: { mouth: 'smile' } }); }
  return { world: s, light: light(860, 260, 1800, '#fff1c0', .3, .35, 's'), cam: mv(lt, D, C(620, 1250, 1.25), C(600, 1250, 1.3)) }; } },
// 17 bouchaib peeks
{ L: 'بوشعيب', f: (lt, D) => ({ world: village({ time: 'day' }) + person('bouchaib', { x: 260, gy: 1560, dir: 1, pose: { ...P.stand(), lean: 18 }, face: { eyes: 'side', mouth: 'frown' } }) + mudHouse(-300, 1640, 520, 380, { c: '#a56e44' }), light: light(860, 260, 1800, '#fff1c0', .4, .3, 's'), cam: mv(lt, D, C(240, 1250, 2.4), C(250, 1250, 2.6)) }) },
// 18 empty business
{ f: (lt, D) => ({ world: village({ time: 'day' }) + `<path d="M380 1520 h340 v-30 h-340z" fill="#7a5632" ${ol(5)}/>` + person('bouchaib', { x: 560, gy: 1560, dir: 0, pose: { ...P.slump(), aR: [30, 40] }, face: { eyes: 'tired', mouth: 'frown' } }) + `<path d="M640 1460 q30 -60 70 0 q-35 30 -70 0z" fill="#8a6a3a" ${ol(4)}/>` + [0, 1, 2].map(i => `<circle cx="${620 + wob(lt, 2, 40, i) + i * 20}" cy="${1300 + wob(lt, 3, 30, i + .3)}" r="5" fill="${INK}"/>`).join(''), light: light(860, 260, 1800, '#fff1c0', .4, .3, 's'), cam: mv(lt, D, C(560, 1300, 2.0), C(560, 1300, 2.2)) }) },
// 19 night whisper
{ f: (lt, D) => ({ world: village({ time: 'night', moon: [820, 330, 70] }) + person('bouchaib', { x: 600, gy: 1600, dir: -1, pose: { ...P.stand(), aR: [60, 70] }, face: { eyes: 'angry', mouth: 'smile' } }) + yas({ x: 150, gy: 1600, dir: 1, pose: { ...P.stand(), lean: 14 }, face: { eyes: 'side', mouth: 'O' } }) + mudHouse(-380, 1660, 500, 420, { time: 'night' }), light: light(820, 330, 1400, '#9fb4ff', .8, .3, 'm'), cam: mv(lt, D, C(450, 1250, 1.7), C(500, 1250, 2.0)) }) },
// 20 broken powerbank
{ L: 'الباتري', f: (lt, D) => ({ world: IN() + powerbank(700, 1560, -6, 1) + yas({ x: 380, gy: 1560, dir: 1, pose: P.headGrab(), face: { eyes: 'wide', mouth: 'frown' } }), light: light(795, 680, 1300, '#ffe2a8', .55, .35, 'w'), cam: mv(lt, D, C(540, 1330, 1.9), C(560, 1340, 2.1)) }) },
// 21 18%
{ f: (lt, D) => ({ world: IN({ time: 'night' }) + phoneBig(540, 1000, 1.05 + lt * .02, { mode: 'battery', bat: 18 }) + hand(390, 1260, 2) + hand(690, 1260, 2), light: light(540, 1000, 900, '#ff4a3a', .6, .3, 'p'), cam: C(540, 960, 1) }) },
// 22 hooves far
{ L: 'عسكر القايد', f: (lt, D) => { let s = village({ time: 'night', moon: [820, 330, 70] }); for (let i = 0; i < 4; i++) { const x = lerp(1300, 700, span(lt, 0, D, lin)) + i * 110; s += horse(x + i * 60, 1480 + i * 25, lt + i * .2, -1, 'soldier', .6) + torch(x + i * 60 - 40, 1060 + i * 25, lt + i, .7); }
  return { world: s, light: light(900, 1150, 700, '#ff9a2a', .78, .5, 'tt'), cam: mv(lt, D, C(800, 1250, 1.3), C(760, 1250, 1.4)) }; } },
// 23 hamid runs
{ f: (lt, D) => ({ world: village({ time: 'night', moon: [820, 330, 70] }) + person('hamid', { x: lerp(900, 380, span(lt, 0, D * .8, lin)), gy: 1620, dir: -1, pose: P.run(lt), face: { eyes: 'wide', mouth: 'scream' } }) + yas({ x: 200, gy: 1600, dir: 1, pose: P.stand(), face: { eyes: 'wide', mouth: 'O' } }), light: light(820, 330, 1400, '#9fb4ff', .75, .35, 'm'), cam: mv(lt, D, C(560, 1280, 1.6), C(440, 1280, 1.7)) }) },
// 24 taken
{ f: (lt, D) => { const x0 = lerp(200, 700, span(lt, 0, D, lin)); const y = yas({ x: x0, gy: 1620, dir: 1, pose: { ...P.walk(lt, 1), aL: { to: [x0 + 40, 1460] }, aR: { to: [x0 + 50, 1460] } }, face: { eyes: 'tired', mouth: 'frown' } });
  return { world: village({ time: 'night', moon: [820, 330, 70] }) + person('soldier', { x: x0 - 220, gy: 1620, dir: 1, pose: P.walk(lt + .4, 1) }) + y + rope(x0 + 45, 1460) + person('soldier', { x: x0 + 220, gy: 1620, dir: 1, pose: P.walk(lt + .1, 1) }) + torch(x0 + 300, 1260, lt, .8), light: light(x0 + 300, 1260, 900, '#ff9a2a', .8, .5, 'tt'), cam: mv(lt, D, C(x0, 1300, 1.5), C(x0 + 40, 1300, 1.55)) }; } },
// 25 sword at neck
{ L: 'القصبة', f: (lt, D) => { const y = yas({ x: 680, gy: 1600, dir: -1, pose: { ...P.stand(), lean: -10 }, face: { eyes: 'wide', mouth: 'wavy' }, acc: { sweat: 1 } }); const h = stick.last.head;
  return { world: casbah({ t: lt }) + person('caid', { x: 300, gy: 1600, dir: 1, pose: { ...P.point(), aR: [95, 0] }, face: { eyes: 'angry', mouth: 'flat' } }) + sword(stick.last.handR[0], stick.last.handR[1], -6, 1.05) + y, light: light(540, 900, 1100, '#ff9a2a', .7, .45, 'tt'), cam: mv(lt, D, C(500, 1250, 1.6), C(560, 1220, 1.9)), shake: shake(lt, .1, 8) }; } },
// 26 bouchaib laughs
{ f: (lt, D) => ({ world: casbah({ t: lt }) + person('caid', { x: 300, gy: 1600, dir: 1, pose: P.stand(), face: { eyes: 'angry', mouth: 'flat' } }) + person('bouchaib', { x: 560, gy: 1600, dir: -1, pose: { ...P.stand(), lean: wob(lt, 3, 6), aL: [40, 90], aR: [40, 90] }, face: { eyes: 'happy', mouth: 'grin' } }), light: light(540, 900, 1100, '#ff9a2a', .7, .45, 'tt'), cam: mv(lt, D, C(520, 1200, 2.0), C(560, 1190, 2.3)) }) },
// 27 light on, caid steps back
{ f: (lt, D) => { const k = span(lt, D * .3, D * .7); const y = yas({ x: 720, gy: 1600, dir: -1, pose: { ...P.point(), aR: [120, 0] }, face: { eyes: 'open', mouth: 'smile' } }); const hr = stick.last.handR;
  return { world: casbah({ t: lt }) + person('caid', { x: lerp(400, 220, k), gy: 1600, dir: 1, pose: mixPose(P.stand(), P.shock(), k), face: { eyes: 'wide', mouth: 'O' } }) + y + phone(hr[0], hr[1] - 20, 0, 1, { torch: 1 }) + `<path d="M${hr[0]} ${hr[1] - 50} L${hr[0] - 800} ${hr[1] - 500} L${hr[0] - 800} ${hr[1] + 300}Z" fill="#fffbe0" opacity=".25"/>`, light: light(hr[0], hr[1] - 50, 1000, '#fff6cc', .8, .55, 'ph'), cam: mv(lt, D, C(500, 1250, 1.6), C(480, 1250, 1.7)), shake: shake(lt, D * .3, 10) }; } },
// 28
CTA,
// 29 greedy
{ L: 'القايد', f: (lt, D) => ({ world: casbah({ t: lt }) + person('caid', { x: 520, gy: 1600, dir: 1, pose: { ...P.stand(), aR: [80 + wob(lt, 2, 6), 30], lean: 8 }, face: { eyes: 'side', mouth: 'grin' } }), light: light(540, 900, 1000, '#ff9a2a', .72, .45, 'tt'), cam: mv(lt, D, C(560, 1150, 2.5), C(570, 1150, 2.8)) }) },
// 30 he'll kill me
{ f: (lt, D) => ({ world: casbah({ t: lt }) + yas({ x: 540, gy: 1600, dir: 0, pose: P.stand(), face: { eyes: 'wide', mouth: 'wavy' }, acc: { sweat: span(lt, 0, D) } }) + thought(740, 1000, span(lt, .2, .8), sword(-120, 0, 0, .7) + `<text x="120" y="30" font-size="90" text-anchor="middle">🌅</text>`), light: light(540, 1100, 900, '#ff9a2a', .75, .45, 'tt'), cam: mv(lt, D, C(560, 1150, 2.0), C(580, 1100, 2.2)) }) },
// 31 16%
{ f: (lt, D) => ({ world: casbah({ t: lt }) + phoneBig(540, 1000, 1.05 + lt * .02, { mode: 'battery', bat: 16 }) + hand(390, 1260, 2) + hand(690, 1260, 2), light: light(540, 1000, 900, '#ff4a3a', .65, .3, 'p'), cam: C(540, 960, 1) }) },
// 32 full moon
{ L: 'القمر', f: (lt, D) => ({ world: casbah({ t: lt, moon: [540, 380, 120] }), light: light(540, 380, 1500, '#cfd8ff', .55, .4, 'm'), cam: mv(lt, D, C(540, 1100, 1.1), C(540, 700, 1.3)) }) },
// 33 remembers app
{ f: (lt, D) => ({ world: casbah({ t: lt }) + yas({ x: 420, gy: 1600, dir: 1, pose: P.think(), face: { eyes: 'side', mouth: 'flat' } }) + thought(730, 850, span(lt, .2, .8), moon(-60, 0, 60) + `<circle cx="70" cy="-40" r="8" fill="#f2c94c"/><circle cx="110" cy="30" r="6" fill="#f2c94c"/><circle cx="40" cy="60" r="5" fill="#f2c94c"/>`) + idea(420, 900, span(lt, D * .7, D)), light: light(540, 1000, 1000, '#ff9a2a', .72, .45, 'tt'), cam: mv(lt, D, C(560, 1150, 1.7), C(560, 1130, 1.9)) }) },
// 34 app 1760
{ f: (lt, D) => ({ world: casbah({ t: lt }) + phoneBig(540, 1000, 1.05 + lt * .02, { mode: 'app', ecl: .1 }) + hand(390, 1260, 2) + hand(690, 1260, 2), light: light(540, 1000, 900, '#4aa3ff', .6, .3, 'p'), cam: C(540, 960, 1) }) },
// 35 eclipse found
{ f: (lt, D) => ({ world: casbah({ t: lt }) + phoneBig(540, 1000, 1.1, { mode: 'app', ecl: span(lt, 0, D, lin) * .9 }) + hand(390, 1260, 2) + hand(690, 1260, 2), light: light(540, 1000, 900, '#4aa3ff', .6, .3, 'p'), cam: mv(lt, D, C(540, 860, 1.3), C(540, 860, 1.55)) }) },
// 36 tells caid
{ f: (lt, D) => ({ world: casbah({ t: lt, moon: [800, 330, 70] }) + person('caid', { x: 300, gy: 1600, dir: 1, pose: { ...P.stand(), aL: [40, 110], aR: [40, 110] }, face: { eyes: 'side', mouth: 'flat' } }) + yas({ x: 680, gy: 1600, dir: -1, pose: { ...P.point(), aR: [160, -10] }, face: { eyes: 'angry', mouth: 'open' } }), light: light(540, 900, 1100, '#ff9a2a', .7, .45, 'tt'), cam: mv(lt, D, C(500, 1200, 1.5), C(520, 1200, 1.7)) }) },
// 37 red sky
{ f: (lt, D) => ({ world: casbah({ time: 'eclipse', t: lt, moon: [540, 420, 140, 1, span(lt, 0, D * .7)] }) + `<rect x="-600" y="-600" width="2300" height="2000" fill="#8a0a0a" opacity="${.35 * span(lt, 0, D * .7)}"/>`, light: '', cam: mv(lt, D, C(540, 800, 1.3), C(540, 760, 1.45)) }) },
// 38 caid laughs, threat
{ f: (lt, D) => { const c = person('caid', { x: 480, gy: 1600, dir: 1, pose: { ...P.point(), aR: [150, 20], lean: wob(lt, 3, 5) }, face: { eyes: lt < D / 2 ? 'happy' : 'angry', mouth: lt < D / 2 ? 'grin' : 'open' } }); const hr = stick.last.handR;
  return { world: casbah({ t: lt }) + c + sword(hr[0], hr[1], -30, 1.0), light: light(540, 900, 1000, '#ff9a2a', .72, .45, 'tt'), cam: mv(lt, D, C(520, 1150, 2.0), C(520, 1130, 2.3)), shake: shake(lt, D / 2, 10) }; } },
// 39
{ L: 'دير فولو 🔔', f: CTA.f },
];
