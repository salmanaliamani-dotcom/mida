const PR = o => prison({ moonlit: 1, ...o });
const crowd = (lt, face = { eyes: 'open', mouth: 'flat' }, pose, y0 = 1700, n = 8) => { let s = ''; const who = ['man1', 'wom1', 'man2', 'shib', 'wom2', 'man3', 'kid1', 'wom1', 'man1', 'man2']; for (let i = 0; i < n; i++) { const x = 60 + i * (960 / (n - 1)); s += person(who[i % who.length], { x, gy: y0 + (i % 2) * 40, s: .8, dir: x < 540 ? 1 : -1, pose: pose ? pose(i) : P.stand(), face: typeof face === 'function' ? face(i) : face }); } return s; };
const SPECS = [
// 1
{ L: 'الحبس', f: (lt, D) => ({ world: PR() + yas({ x: 420, gy: 1520, dir: 1, pose: { ...P.sitFloor(), head: 14, aL: { to: [500, 1440] }, aR: { to: [510, 1450] } }, face: { eyes: blink(lt) || 'tired', mouth: 'frown' } }), light: light(700, 600, 1100, '#9fb4ff', .82, .35, 'm'), cam: mv(lt, D, C(540, 1250, 1.4), C(540, 1260, 1.55)) }) },
// 2
{ f: (lt, D) => ({ world: PR() + phone(540, 1150, 0, 3.2, { on: lt < D * .55, screen: '#8fd0ff' }) + hand(470, 1260, 2.2) + hand(610, 1270, 2.2), light: lt < D * .55 ? light(540, 1150, 700, '#4aa3ff', .85, .5, 'p') : light(700, 600, 1100, '#9fb4ff', .9, .2, 'm'), cam: C(540, 1150, 1.3) }) },
// 3 whistle at window
{ f: (lt, D) => { const k = span(lt, D * .3, D * .8), hy = lerp(700, 530, k);
  return { world: PR() + `<g clip-path="url(#winc)"><defs><clipPath id="winc"><rect x="560" y="420" width="260" height="200"/></clipPath></defs><circle cx="690" cy="${hy}" r="70" fill="url(#headG)" ${ol(6)}/><circle cx="668" cy="${hy - 10}" r="8" fill="${INK}"/><circle cx="712" cy="${hy - 10}" r="8" fill="${INK}"/><ellipse cx="690" cy="${hy + 30}" rx="8" ry="10" fill="#5a1717"/></g>` + [0, 1, 2, 3].map(i => `<path d="M${595 + i * 60} 420 v200" stroke="#3a3a3a" stroke-width="14"/>`).join('') + popMark(880, 560, span(lt, .2, .6), '♪', 90) + yas({ x: 380, gy: 1520, dir: 1, pose: P.sitFloor(), face: { eyes: 'side', mouth: 'O' } }), light: light(690, 520, 900, '#9fb4ff', .8, .35, 'm'), cam: mv(lt, D, C(560, 1050, 1.35), C(640, 800, 1.7)) }; } },
// 4 bread & water
{ f: (lt, D) => { const k = span(lt, 0, D * .6);
  return { world: PR() + `<circle cx="690" cy="${520}" r="70" fill="url(#headG)" ${ol(6)}/><circle cx="668" cy="510" r="8" fill="${INK}"/><circle cx="712" cy="510" r="8" fill="${INK}"/><path d="M675 545 q15 10 30 0" stroke="${INK}" stroke-width="5" fill="none"/>` + [0, 1, 2, 3].map(i => `<path d="M${595 + i * 60} 420 v200" stroke="#3a3a3a" stroke-width="14"/>`).join('') + bread(690, lerp(600, 720, k)) + cup(760, lerp(620, 760, k)) + hand(650, lerp(610, 730, k), 1.2) + hand(800, lerp(630, 770, k), 1.2), light: light(690, 560, 700, '#9fb4ff', .78, .4, 'm'), cam: mv(lt, D, C(690, 620, 2.6), C(690, 640, 2.9)) }; } },
// 5 is it true?
{ f: (lt, D) => ({ world: PR() + `<circle cx="690" cy="530" r="70" fill="url(#headG)" ${ol(6)}/><circle cx="668" cy="520" r="${8 + wob(lt, .3, 1)}" fill="${INK}"/><circle cx="712" cy="520" r="8" fill="${INK}"/><ellipse cx="690" cy="560" rx="10" ry="12" fill="#5a1717"/>` + [0, 1, 2, 3].map(i => `<path d="M${595 + i * 60} 420 v200" stroke="#3a3a3a" stroke-width="14"/>`).join('') + popMark(840, 420, span(lt, .4, 1), '?', 100), light: light(690, 560, 600, '#9fb4ff', .78, .4, 'm'), cam: mv(lt, D, C(690, 540, 3.4), C(690, 540, 3.7)) }) },
// 6 if phone is right
{ f: (lt, D) => ({ world: PR() + yas({ x: 520, gy: 1540, dir: 0, pose: P.shrug(), face: { eyes: 'side', mouth: 'wavy' } }), light: light(700, 600, 1100, '#9fb4ff', .78, .35, 'm'), cam: mv(lt, D, C(530, 1200, 2.2), C(530, 1190, 2.4)) }) },
// 7 misses mom
{ f: (lt, D) => ({ world: PR() + yas({ x: 380, gy: 1540, dir: 1, pose: { ...P.sitFloor(), head: 10 }, face: { eyes: 'closed', mouth: 'frown' }, acc: { tear: 1 } }) + thought(700, 1000, span(lt, .2, .8), `<g transform="translate(-60 -10) scale(.55)">${person('mha', { x: 0, y: 60, dir: 0, pose: P.stand(), face: { eyes: 'happy', mouth: 'smile' } })}</g>` + [0, 1, 2, 3].map(i => `<rect x="${30 + i * 30}" y="${-40 + (i % 2) * 20}" width="22" height="${90 - (i % 2) * 20}" fill="#3a4a62"/>`).join('')), light: light(700, 600, 1100, '#9fb4ff', .78, .35, 'm'), cam: mv(lt, D, C(540, 1180, 1.6), C(540, 1170, 1.75)) }) },
// 8 crowd at casbah
{ L: 'الخسوف', f: (lt, D) => ({ world: casbah({ t: lt, moon: [820, 300, 70] }) + crowd(lt) + torch(140, 1380, lt, .8) + torch(940, 1380, lt + .5, .8), light: light(540, 1200, 1300, '#ff9a2a', .6, .4, 'tt'), cam: mv(lt, D, C(540, 1250, 1.1), C(540, 1250, 1.2)) }) },
// 9 full moon
{ f: (lt, D) => ({ world: casbah({ t: lt, moon: [540, 420, 130] }), light: light(540, 420, 1400, '#cfd8ff', .5, .45, 'm'), cam: mv(lt, D, C(540, 700, 1.3), C(540, 560, 1.5)) }) },
// 10 please phone
{ f: (lt, D) => ({ world: casbah({ t: lt }) + yas({ x: 540, gy: 1600, dir: 0, pose: { ...P.stand(), aL: { to: [540, 1300] }, aR: { to: [545, 1310] }, lean: wob(lt, 6, 1.5) }, face: { eyes: 'side', mouth: 'wavy' }, acc: { sweat: 1 } }) + `<circle cx="680" cy="900" r="40" fill="#f4f0dc"/>`, light: light(540, 1000, 900, '#ff9a2a', .78, .45, 'tt'), cam: mv(lt, D, C(540, 1120, 2.5), C(540, 1110, 2.8)) }) },
// 11 an hour, nothing
{ f: (lt, D) => ({ world: casbah({ t: lt, moon: [820, 300, 70] }) + crowd(lt, i => ({ eyes: blink(lt, i) || 'tired', mouth: 'flat' }), i => ({ ...P.stand(), head: 8 })) + popMark(540, 900, span(lt, .2, .8), '⏳', 120), light: light(540, 1200, 1300, '#ff9a2a', .62, .4, 'tt'), cam: mv(lt, D, C(540, 1250, 1.15), C(540, 1250, 1.2)) }) },
// 12 sword drawn, liar
{ f: (lt, D) => { const c = person('caid', { x: 300, gy: 1600, dir: 1, pose: { ...P.point(), aR: [lerp(60, 160, span(lt, 0, .6)), 20] }, face: { eyes: 'angry', mouth: 'open' } }); const hr = stick.last.handR;
  return { world: casbah({ t: lt, moon: [820, 300, 70] }) + c + sword(hr[0], hr[1], -60, 1) + person('bouchaib', { x: 760, gy: 1600, dir: -1, pose: { ...P.point(), aR: [100, 0] }, face: { eyes: 'angry', mouth: 'scream' } }) + yas({ x: 540, gy: 1640, dir: 0, s: .9, pose: P.shock(), face: { eyes: 'wide', mouth: 'O' } }), light: light(540, 1100, 1100, '#ff9a2a', .7, .45, 'tt'), cam: mv(lt, D, C(540, 1220, 1.45), C(540, 1220, 1.6)), shake: shake(lt, .5, 10) }; } },
// 13 look at the moon
{ f: (lt, D) => ({ world: casbah({ t: lt, moon: [880, 240, 60, .2] }) + person('hamid', { x: 460, gy: 1620, dir: 1, pose: { ...P.point(), aR: [155, 0] }, face: { eyes: 'wide', mouth: 'scream' } }), light: light(500, 1200, 900, '#ff9a2a', .72, .45, 'tt'), cam: mv(lt, D, C(520, 1250, 1.8), C(620, 900, 1.35)) }) },
// 14
CTA,
// 15 eclipse progressing
{ L: 'الخسوف', f: (lt, D) => ({ world: casbah({ time: 'eclipse', t: lt, moon: [540, 520, 170, lerp(.2, .85, span(lt, 0, D, lin))] }), light: '', cam: mv(lt, D, C(540, 620, 1.7), C(540, 600, 1.9)) }) },
// 16 blood moon
{ f: (lt, D) => ({ world: casbah({ time: 'eclipse', t: lt, moon: [540, 520, 170, 1, span(lt, 0, D * .6)] }) + `<rect x="-600" y="-600" width="2300" height="2600" fill="#8a0a0a" opacity="${.35 * span(lt, 0, D * .6)}"/>`, light: '', cam: mv(lt, D, C(540, 700, 1.3), C(540, 680, 1.4)) }) },
// 17 everyone drops
{ f: (lt, D) => { const k = span(lt, 0, .8); const kneel = { ...P.sitFloor(), lean: 45, aL: [110, 0], aR: [110, 0], lL: [100, -120], lR: [90, -120] };
  const c = person('caid', { x: 540, gy: 1520, dir: 1, pose: mixPose(P.point(), P.shock(), k), face: { eyes: 'wide', mouth: 'O' } });
  return { world: casbah({ time: 'eclipse', t: lt, moon: [820, 280, 70, 1, 1] }) + `<rect x="-600" y="-600" width="2300" height="2600" fill="#8a0a0a" opacity=".3"/>` + crowd(lt, { eyes: 'closed', mouth: 'O' }, () => mixPose(P.stand(), kneel, k), 1760) + c + sword(lerp(700, 760, k), lerp(1300, 1560, k), lerp(-60, 80, k), 1), light: light(540, 1200, 1300, '#ff4a2a', .6, .4, 'tt'), cam: mv(lt, D, C(540, 1300, 1.15), C(540, 1310, 1.25)), shake: shake(lt, D * .5, 10) }; } },
// 18 caid kneels
{ f: (lt, D) => ({ world: casbah({ time: 'eclipse', t: lt }) + `<rect x="-600" y="-600" width="2300" height="2600" fill="#8a0a0a" opacity=".25"/>` + person('caid', { x: 380, gy: 1600, dir: 1, pose: { ...P.sitFloor(), lean: 30, aL: [80, 20], aR: [70, 30], lL: [100, -120], lR: [90, -120] }, face: { eyes: 'wide', mouth: 'wavy' }, acc: { sweat: 1 } }) + yas({ x: 720, gy: 1600, dir: -1, pose: P.stand(), face: { eyes: 'open', mouth: 'flat' } }), light: light(540, 1100, 1000, '#ff7a3a', .7, .45, 'tt'), cam: mv(lt, D, C(540, 1250, 1.7), C(540, 1250, 1.9)) }) },
// 19 I want water
{ L: 'الما', f: (lt, D) => ({ world: casbah({ t: lt }) + yas({ x: 540, gy: 1600, dir: 0, pose: { ...P.point(), aR: [120, 10] }, face: { eyes: 'angry', mouth: 'smile' } }) + popMark(780, 980, span(lt, D * .5, D * .9), '💧', 120), light: light(540, 1000, 900, '#ff9a2a', .7, .45, 'tt'), cam: mv(lt, D, C(560, 1150, 2.2), C(570, 1140, 2.5)) }) },
// 20 kids sick, the well
{ f: (lt, D) => ({ world: village({ time: 'day' }) + well(760, 1640, { water: 1, dirt: 1 }) + person('kid1', { x: 220, y: 1560, pose: P.lie(), face: { eyes: 'tired', mouth: 'wavy' }, acc: { sweat: 1 } }) + person('kid2', { x: 420, gy: 1640, dir: 1, pose: P.slump(), face: { eyes: 'tired', mouth: 'frown' }, acc: { sweat: 1 } }), light: light(860, 260, 1800, '#fff1c0', .35, .3, 's'), cam: mv(lt, D, C(500, 1350, 1.35), C(620, 1350, 1.5)) }) },
// 21 open well, animals, dirt
{ f: (lt, D) => ({ world: village({ time: 'day' }) + well(480, 1660, { water: 1, dirt: 1, goat: 1, t: lt }), light: light(860, 260, 1800, '#fff1c0', .35, .3, 's'), cam: mv(lt, D, C(580, 1450, 1.9), C(560, 1470, 2.2)) }) },
// 22 cover well, boil water
{ f: (lt, D) => ({ world: village({ time: 'day' }) + well(260, 1640, { cover: 1 }) + fire(720, 1660, lt, .5, 200) + pot(720, 1600, lt) + person('wom2', { x: 900, gy: 1660, dir: -1, pose: { ...P.stand(), aR: [80, 30] }, face: { eyes: 'happy', mouth: 'smile' } }) + yas({ x: 500, gy: 1660, dir: 1, pose: P.point(), face: { eyes: 'open', mouth: 'open' } }), light: light(720, 1500, 900, '#ffb060', .4, .4, 'f'), cam: mv(lt, D, C(540, 1350, 1.35), C(560, 1350, 1.45)) }) },
// 23 filter + soap
{ f: (lt, D) => ({ world: houseInt({ time: 'day' }) + filterJar(400, 1520) + `<g opacity="${span(lt, D * .4, D * .6)}">${soap(760, 1480)}</g>`, light: light(560, 1200, 1000, '#ffe2a8', .5, .35, 'w'), cam: mv(lt, D, C(560, 1300, 2.0), C(580, 1300, 2.2)) }) },
// 24 wash hands line
{ f: (lt, D) => { let s = village({ time: 'day' }); ['kid1', 'kid2', 'hamid', 'kid1'].forEach((w, i) => s += person(w, { x: 360 + i * 150, gy: 1640, dir: -1, pose: { ...P.stand(), aL: [70, 20 + wob(lt + i, 3, 20)], aR: [70, -20 - wob(lt + i, 3, 20)] }, face: { eyes: 'happy', mouth: 'grin' } }));
  s += yas({ x: 160, gy: 1640, dir: 1, pose: { ...P.stand(), aR: { to: [270, 1380] } }, face: { eyes: 'happy', mouth: 'open' } }) + jug(270, 1440, .6);
  return { world: s, light: light(860, 260, 1800, '#fff1c0', .3, .35, 's'), cam: mv(lt, D, C(500, 1350, 1.55), C(520, 1350, 1.7)) }; } },
// 25 two months, no one sick
{ f: (lt, D) => { const k = span(lt, 0, D, lin); let s = village({ time: k < .5 ? 'day' : 'dawn' });
  ['kid1', 'kid2', 'hamid', 'fatima'].forEach((w, i) => s += person(w, { x: 200 + i * 220 + wob(lt, .4, 60, i * .3), gy: 1640, dir: i % 2 ? -1 : 1, pose: P.run(lt + i * .2), face: { eyes: 'happy', mouth: 'grin' } }));
  return { world: s + popMark(540, 1000, span(lt, .1, .5), '60', 120), light: light(860, 260, 1800, '#fff1c0', .3, .35, 's'), cam: mv(lt, D, C(540, 1350, 1.3), C(540, 1350, 1.4)) }; } },
// 26 like brother, like grandpa
{ f: (lt, D) => { const y = yas({ x: 460, gy: 1600, dir: 0, pose: { ...P.stand(), aL: [150, 10], aR: [-150, -10] }, face: { eyes: 'happy', mouth: 'grin' } }); const hd = stick.last.head;
  return { world: village({ time: 'dawn' }) + y + person('hamid', { x: hd[0], y: hd[1] - 120, dir: 0, s: .9, pose: { ...P.sit(), aL: [150, 10], aR: [-150, -10] }, face: { eyes: 'happy', mouth: 'grin' } }) + person('balhcen', { x: 760, gy: 1600, dir: -1, pose: { ...P.stand(), aR: { to: [600, 1300] } }, face: { eyes: 'happy', mouth: 'smile' } }), light: light(300, 1080, 1400, '#ffb070', .45, .45, 'd'), cam: mv(lt, D, C(560, 1180, 1.4), C(560, 1170, 1.5)) }; } },
// 27
CTA,
// 28 7% and bouchaib
{ L: 'الغدر', f: (lt, D) => ({ world: houseInt({ time: 'night' }) + phoneBig(540, 1000, 1.05, { mode: 'battery', bat: 7 }) + hand(390, 1260, 2) + hand(690, 1260, 2) + `<g opacity="${span(lt, D * .5, D * .8)}"><rect x="-600" y="-600" width="2300" height="2600" fill="#000" opacity=".6"/><ellipse cx="540" cy="980" rx="300" ry="90" fill="#000"/><ellipse cx="440" cy="980" rx="40" ry="26" fill="#fff"/><ellipse cx="640" cy="980" rx="40" ry="26" fill="#fff"/><circle cx="450" cy="980" r="14" fill="${INK}"/><circle cx="650" cy="980" r="14" fill="${INK}"/></g>`, light: light(540, 1000, 900, '#ff4a3a', .6, .3, 'p'), cam: C(540, 960, 1) }) },
// 29 phone stolen
{ f: (lt, D) => { const k = span(lt, D * .2, D * .6);
  return { world: houseInt({ time: 'night' }) + yas({ x: 760, y: 1440, pose: { ...P.lie() }, face: { eyes: lt > D * .6 ? 'wide' : 'closed', mouth: 'flat' } }) + bag(380, 1560) + `<path d="M${lerp(-100, 330, k)} 1300 L${lerp(-200, 230, k)} 1300" stroke="#1b1716" stroke-width="40" stroke-linecap="round"/>` + hand(lerp(-100, 330, k), 1300 + span(lt, D * .6, D) * -0, 1.4) + (lt < D * .6 ? phone(380, 1470, 70, 1) : phone(lerp(330, -200, span(lt, D * .6, D)), 1300, 70, 1, { on: 0 })), light: light(795, 680, 1100, '#9fb4ff', .85, .3, 'm'), cam: mv(lt, D, C(500, 1350, 1.7), C(500, 1350, 1.85)) }; } },
// 30 running, crying everywhere
{ f: (lt, D) => ({ world: village({ time: 'night', moon: [820, 330, 70] }) + waves(80, 1300, lt, '#cfd8ff') + waves(260, 1320, lt + .3, '#cfd8ff') + waves(880, 1280, lt + .6, '#cfd8ff') + yas({ x: lerp(200, 800, lt / D), gy: 1640, dir: 1, pose: P.run(lt), face: { eyes: 'wide', mouth: 'open' } }), light: light(820, 330, 1400, '#9fb4ff', .75, .35, 'm'), cam: mv(lt, D, C(450, 1300, 1.4), C(650, 1300, 1.45)) }) },
// 31 kids sick, hamid down
{ f: (lt, D) => ({ world: houseInt({ time: 'night' }) + person('hamid', { x: 640, y: 1470, pose: P.lie(), face: { eyes: 'tired', mouth: 'wavy' }, acc: { sweat: 1, blush: 1 } }) + blanket(660, 1520, 400, '#6a7a4a') + person('mha', { x: 300, gy: 1520, dir: 1, pose: { ...P.sitFloor(), lean: 20 }, face: { eyes: 'closed', mouth: 'frown' }, acc: { tear: 1 } }), light: light(560, 1300, 900, '#ffb35c', .8, .45, 'c'), cam: mv(lt, D, C(560, 1380, 1.8), C(580, 1380, 2.1)) }) },
// 32 oleander in the well
{ f: (lt, D) => ({ world: village({ time: 'night', moon: [820, 330, 70] }) + well(540, 1720, { water: 1, poison: 1, leaves: 1 }) + popMark(540, 1300, span(lt, D * .55, D * .9), '☠', 130), light: light(540, 1560, 900, '#9fb4ff', .75, .4, 'm'), cam: mv(lt, D, C(540, 1550, 2.6), C(540, 1560, 3.0)), shake: shake(lt, D * .55, 8) }) },
// 33 bouchaib holds phone
{ f: (lt, D) => { const b = person('bouchaib', { x: 540, gy: 1640, dir: 0, pose: { ...P.stand(), aR: [-170, 0] }, face: { eyes: 'angry', mouth: 'grin' } }); const hr = stick.last.handR;
  return { world: village({ time: 'night', moon: [820, 330, 70] }) + crowd(lt, { eyes: 'side', mouth: 'flat' }, null, 1800, 6) + b + phone(hr[0], hr[1] - 30, 0, 1.2, { on: 0 }) + torch(200, 1380, lt, .8) + torch(880, 1380, lt + .4, .8), light: light(540, 1200, 1100, '#ff9a2a', .7, .5, 'tt'), cam: mv(lt, D, C(540, 1300, 1.3), C(540, 1270, 1.5)) }; } },
// 34 lord of misfortune
{ f: (lt, D) => ({ world: village({ time: 'night', moon: [820, 330, 70] }) + person('bouchaib', { x: 520, gy: 1640, dir: 1, pose: { ...P.point(), aR: [110 + wob(lt, 4, 6), 0] }, face: { eyes: 'angry', mouth: 'scream' } }) + torch(880, 1380, lt + .4, .8), light: light(880, 1250, 1000, '#ff7a2a', .75, .55, 'tt'), cam: mv(lt, D, C(560, 1230, 2.3), C(560, 1220, 2.6)), shake: shake(lt, .3, 10) }) },
// 35 stones
{ f: (lt, D) => { let s = village({ time: 'night', moon: [820, 330, 70] }); const ang = { ...P.point(), aR: [170, -40] };
  [['man1', 120, 1], ['man2', 300, 1], ['wom2', 780, -1], ['man3', 950, -1]].forEach(([w, x, d], i) => { s += person(w, { x, gy: 1660 + (i % 2) * 30, s: .9, dir: d, pose: ang, face: { eyes: 'angry', mouth: 'open' } }); const h = stick.last.handR; s += stone(h[0], h[1] - 10, 20); });
  s += yas({ x: 540, gy: 1640, dir: 0, pose: P.shock(), face: { eyes: 'wide', mouth: 'scream' }, acc: { sweat: 1 } });
  return { world: s, light: light(540, 1250, 1100, '#ff9a2a', .72, .45, 'tt'), cam: mv(lt, D, C(540, 1300, 1.35), C(540, 1290, 1.5)) }; } },
// 36 first stone, black
{ f: (lt, D) => { const k = span(lt, 0, D * .35, lin), hit = D * .35;
  return { world: village({ time: 'night', moon: [820, 330, 70] }) + yas({ x: 540, gy: 1640, dir: 0, pose: lt > hit ? { ...P.shock(), lean: -20 } : P.shock(), face: { eyes: lt > hit ? 'dead' : 'wide', mouth: 'O' } }) + (lt < hit ? stone(lerp(1100, 560, k), lerp(900, 1180, k), 26) : popMark(560, 1100, span(lt, hit, hit + .3), '💥', 140)), light: light(540, 1200, 1000, '#ff9a2a', .72, .45, 'tt'), overlay: `<rect width="1080" height="1920" fill="#000" opacity="${span(lt, hit + .4, D * .9, lin)}"/>`, cam: mv(lt, D, C(540, 1200, 2.2), C(540, 1200, 2.4)), shake: shake(lt, hit, 26, .5) }; } },
// 37
{ L: 'دير فولو 🔔', f: CTA.f },
];
