const TREE = (lt, fireK = 0, o = {}) => village({ time: 'dawn' }) + treeStake(540, 1660, { wood: 1 }) + yas({ x: 540, gy: 1600, dir: 0, pose: { ...P.stand(), aL: [20, 0], aR: [-20, 0] }, face: o.face || { eyes: 'wide', mouth: 'wavy' }, acc: o.acc || {} }) + rope(540, 1380).replace(/q-60 40 -160 30/, 'q60 0 60 0') + `<path d="M440 1390 h200 M450 1440 h180" stroke="#b08a4a" stroke-width="10"/>` + fire(540, 1660, lt, fireK, 420) + (fireK > 0 ? smoke(540, 1300, lt, fireK) : '');
const NIGHTV = () => village({ time: 'night', moon: [820, 330, 70] });
const SPECS = [
// 1
{ L: 'النار', f: (lt, D) => ({ world: TREE(lt), light: light(300, 1080, 1400, '#ffb070', .5, .4, 'd'), cam: mv(lt, D, C(540, 1250, 2.0), C(540, 1300, 1.5)) }) },
// 2
{ f: (lt, D) => { const b = person('bouchaib', { x: 540, gy: 1640, dir: 0, pose: { ...P.stand(), aR: [-120, -20] }, face: { eyes: 'angry', mouth: 'grin' } }); const hr = stick.last.handR;
  return { world: village({ time: 'dawn' }) + b + torch(hr[0], hr[1] - 40, lt, 1), light: light(hr[0], hr[1] - 80, 900, '#ff8a2a', .75, .55, 'tt'), cam: mv(lt, D, C(540, 1250, 2.2), C(540, 1240, 2.5)) }; } },
// 3
{ f: (lt, D) => ({ world: TREE(lt, 0, { face: { eyes: 'angry', mouth: 'flat' } }) + thought(780, 1000, span(lt, .2, .8), `<g transform="translate(-20 60) scale(.5)">${person('kid1', { x: -120, y: 0, pose: P.lie(), face: { eyes: 'tired' } })}${person('kid2', { x: 160, y: 0, pose: P.lie(), face: { eyes: 'tired' } })}</g>`), light: light(300, 1080, 1400, '#ffb070', .5, .4, 'd'), cam: mv(lt, D, C(580, 1150, 2.2), C(600, 1120, 2.4)) }) },
// 4
{ f: (lt, D) => ({ world: TREE(lt, 0, { face: { eyes: 'angry', mouth: 'scream' } }) + popMark(760, 1000, span(lt, D * .4, D * .8), '🌿☠', 100), light: light(300, 1080, 1400, '#ffb070', .5, .4, 'd'), cam: mv(lt, D, C(540, 1150, 2.6), C(540, 1150, 2.8)), shake: shake(lt, .2, 10) }) },
// 5
{ f: (lt, D) => ({ world: TREE(lt, 0, { face: { eyes: 'side', mouth: 'smile' } }) + popMark(780, 1000, span(lt, .3, .9), '?', 120), light: light(300, 1080, 1400, '#ffb070', .5, .4, 'd'), cam: mv(lt, D, C(560, 1150, 2.8), C(560, 1150, 3.0)) }) },
// 6 green hands
{ f: (lt, D) => ({ world: village({ time: 'dawn' }) + `<rect x="-600" y="-600" width="2300" height="2600" fill="#26201e"/>` + [380, 700].map((x, i) => `<path d="M${x} 1400 l${i ? -60 : 60} -400" stroke="${INK}" stroke-width="40" stroke-linecap="round"/><circle cx="${x}" cy="1400" r="110" fill="#3f8a3a" ${ol(10)}/><ellipse cx="${x - 30}" cy="1370" rx="30" ry="12" fill="#2a6a2a"/><ellipse cx="${x + 30}" cy="1430" rx="26" ry="10" fill="#2a6a2a"/>`).join(''), light: '', cam: mv(lt, D, C(540, 1250, 1.1), C(540, 1300, 1.25)) }) },
// 7 hides hands, witness
{ f: (lt, D) => ({ world: village({ time: 'dawn' }) + person('bouchaib', { x: 360, gy: 1640, dir: 1, pose: { ...P.stand(), aL: [-40, 60], aR: [-40, 60] }, face: { eyes: 'side', mouth: 'wavy' }, acc: { sweat: 1 } }) + person('man1', { x: 760, gy: 1640, dir: -1, pose: { ...P.point(), aR: [100, 0] }, face: { eyes: 'angry', mouth: 'open' } }), light: light(300, 1080, 1400, '#ffb070', .5, .4, 'd'), cam: mv(lt, D, C(560, 1250, 1.6), C(560, 1250, 1.75)) }) },
// 8 torch thrown
{ f: (lt, D) => { const k = span(lt, 0, D * .5, lin);
  return { world: TREE(lt, span(lt, D * .5, D) * .6) + torch(lerp(900, 560, k), lerp(1200, 1600, k) - Math.sin(k * Math.PI) * 300, lt, 1) + person('bouchaib', { x: 950, gy: 1680, dir: -1, pose: { ...P.point(), aR: [140, 0] }, face: { eyes: 'angry', mouth: 'grin' } }), light: light(560, 1550, 1000, '#ff8a2a', .6, .6, 'f'), cam: mv(lt, D, C(620, 1350, 1.35), C(600, 1350, 1.45)), shake: shake(lt, D * .5, 12) }; } },
// 9 fire smoke
{ f: (lt, D) => ({ world: TREE(lt, .8 + span(lt, 0, D) * .4, { face: { eyes: 'closed', mouth: 'scream' }, acc: { sweat: 1 } }), light: light(540, 1550, 1100, '#ff6a1a', .65, .65, 'f'), cam: mv(lt, D, C(540, 1250, 1.8), C(540, 1250, 2.0)), shake: shake(lt, 0, 6, D) }) },
// 10 stone hits bouchaib
{ f: (lt, D) => { const k = span(lt, 0, D * .35, lin), hit = D * .35, fall = span(lt, hit, hit + .5);
  return { world: village({ time: 'dawn' }) + person('bouchaib', { x: 540, gy: 1640, dir: -1, pose: mixPose(P.stand(), P.lie(), fall), rot: lerp(0, 80, fall), face: { eyes: lt > hit ? 'dead' : 'angry', mouth: 'O' } }) + (lt < hit ? stone(lerp(-50, 500, k), lerp(1100, 1350, k), 24) : popMark(500, 1250, span(lt, hit, hit + .3), '💥', 120)), light: light(300, 1080, 1400, '#ffb070', .5, .4, 'd'), cam: mv(lt, D, C(520, 1300, 1.7), C(540, 1350, 1.8)), shake: shake(lt, hit, 18) }; } },
// 11 hamid stands
{ f: (lt, D) => ({ world: village({ time: 'dawn' }) + person('hamid', { x: 540 + wob(lt, 8, 3), gy: 1640, dir: 0, pose: { ...P.stand(), aR: [-60, -40] }, face: { eyes: 'tired', mouth: 'flat' }, acc: { sweat: 1 } }) + shakeLines(540, 1260, .7), light: light(300, 1080, 1400, '#ffb070', .5, .45, 'd'), cam: mv(lt, D, C(540, 1350, 2.2), C(540, 1330, 2.5)) }) },
// 12 boiled water only
{ f: (lt, D) => ({ world: village({ time: 'dawn' }) + person('hamid', { x: 460, gy: 1640, dir: 1, pose: { ...P.point(), aR: [80, 0] }, face: { eyes: 'tired', mouth: 'open' } }) + thought(760, 1060, span(lt, .2, .8), pot(0, 60, lt)), light: light(300, 1080, 1400, '#ffb070', .5, .45, 'd'), cam: mv(lt, D, C(560, 1280, 1.9), C(580, 1260, 2.1)) }) },
// 13 grandpa saves
{ f: (lt, D) => { const k = span(lt, 0, D * .7, lin);
  return { world: TREE(lt, 1 - k, { face: { eyes: 'wide', mouth: 'O' } }) + person('balhcen', { x: 840, gy: 1680, dir: -1, pose: { ...P.point(), aR: [120 + wob(lt, 4, 30), 0] }, face: { eyes: 'angry', mouth: 'open' } }) + [...Array(6)].map((_, i) => `<circle cx="${lerp(760, 560, ((lt * 2 + i / 6) % 1))}" cy="${1500 + i * 10}" r="16" fill="#8a6a4a"/>`).join(''), light: light(540, 1550, 1000, '#ff8a2a', .55, .5 * (1 - k), 'f'), cam: mv(lt, D, C(620, 1350, 1.4), C(620, 1350, 1.5)) }; } },
// 14
CTA,
// 15 soldiers take bouchaib
{ L: 'الدوا', f: (lt, D) => { const x0 = lerp(300, 700, span(lt, 0, D, lin));
  return { world: village({ time: 'day' }) + person('soldier', { x: x0 - 200, gy: 1640, dir: 1, pose: P.walk(lt, 1) }) + person('bouchaib', { x: x0, gy: 1640, dir: 1, pose: { ...P.walk(lt + .3, 1), head: 20 }, face: { eyes: 'tired', mouth: 'frown' } }) + person('soldier', { x: x0 + 200, gy: 1640, dir: 1, pose: P.walk(lt + .1, 1) }), light: light(860, 260, 1800, '#fff1c0', .35, .3, 's'), cam: mv(lt, D, C(x0, 1300, 1.5), C(x0, 1300, 1.55)) }; } },
// 16 instructions
{ f: (lt, D) => ({ world: village({ time: 'day' }) + yas({ x: 320, gy: 1640, dir: 1, pose: { ...P.point(), aR: [100 + wob(lt, 3, 15), 0] }, face: { eyes: 'angry', mouth: 'open' } }) + person('wom1', { x: 650, gy: 1640, dir: -1, pose: P.stand(), face: { eyes: 'open', mouth: 'flat' } }) + person('wom2', { x: 830, gy: 1660, dir: -1, pose: P.stand(), face: { eyes: 'open', mouth: 'flat' } }) + fire(560, 1700, lt, .35, 150) + pot(560, 1660, lt), light: light(860, 260, 1800, '#fff1c0', .35, .3, 's'), cam: mv(lt, D, C(560, 1300, 1.45), C(560, 1300, 1.55)) }) },
// 17 recipe
{ f: (lt, D) => { const n = Math.min(6, Math.floor(span(lt, D * .25, D * .75, lin) * 6.99)); let s = houseInt({ time: 'day' }) + jug(300, 1560) + `<text x="300" y="1340" text-anchor="middle" font-family="Alexandria" font-weight="900" font-size="70" fill="#fff" stroke="${INK}" stroke-width="8" paint-order="stroke">1L</text>`;
  for (let i = 0; i < n; i++) s += `<g transform="translate(${480 + (i % 3) * 110} ${1420 + Math.floor(i / 3) * 110})"><ellipse cx="0" cy="0" rx="40" ry="24" fill="#fff" ${ol(4)}/><path d="M36 -4 l60 -30" stroke="#999" stroke-width="10" stroke-linecap="round"/></g>`;
  if (lt > D * .8) s += `<g transform="translate(860 1700)"><ellipse cx="0" cy="0" rx="40" ry="24" fill="#cfd8e0" ${ol(4)}/><path d="M-40 0 a40 24 0 0 1 40 -24 v24z" fill="#fff"/></g>`;
  return { world: s, light: light(560, 1300, 1000, '#ffe2a8', .45, .35, 'w'), cam: mv(lt, D, C(560, 1480, 1.7), C(560, 1500, 1.8)) }; } },
// 18 sip by sip
{ f: (lt, D) => { const h = person('hamid', { x: 640, gy: 1560, dir: -1, pose: P.sitFloor(), face: { eyes: 'tired', mouth: 'O' } }); const m = stick.last.mouth;
  return { world: houseInt({ time: 'night' }) + h + person('mha', { x: 380, gy: 1560, dir: 1, pose: { ...P.stand(), lean: 20, aR: { to: [m[0] - 30, m[1] + 20] } }, face: { eyes: 'happy', mouth: 'smile' } }) + cup(m[0] - 30, m[1] + 40), light: light(560, 1300, 900, '#ffb35c', .75, .45, 'c'), cam: mv(lt, D, C(520, 1300, 2.0), C(540, 1290, 2.2)) }; } },
// 19 all night house to house
{ f: (lt, D) => ({ world: NIGHTV() + yas({ x: lerp(100, 900, (lt / D * 1.6) % 1), gy: 1640, dir: 1, pose: { ...P.run(lt), aR: [60, 40] }, face: { eyes: 'tired', mouth: 'open' }, acc: { sweat: 1 } }) + jug(lerp(100, 900, (lt / D * 1.6) % 1) + 70, 1460), light: light(820, 330, 1400, '#9fb4ff', .72, .35, 'm'), cam: mv(lt, D, C(540, 1300, 1.25), C(540, 1300, 1.3)) }) },
// 20 first kid up
{ f: (lt, D) => { const k = span(lt, D * .3, D * .7);
  return { world: houseInt({ time: 'dawn' }) + person('kid1', { x: 540, gy: 1540, dir: 1, pose: mixPose(P.lie(), P.sitFloor(), k), rot: lerp(-90, 0, k), face: { eyes: k > .5 ? 'open' : 'closed', mouth: k > .5 ? 'smile' : 'flat' } }), light: light(795, 680, 1200, '#f0a868', .55, .5, 'w'), cam: mv(lt, D, C(540, 1350, 2.2), C(540, 1340, 2.4)) }; } },
// 21 kids play
{ f: (lt, D) => { let s = village({ time: 'dusk' }); const bx = 540 + Math.sin(lt * 2) * 300, by = 1560 - Math.abs(Math.sin(lt * 4)) * 200;
  ['kid1', 'kid2', 'hamid', 'fatima'].forEach((w, i) => s += person(w, { x: 200 + i * 220 + wob(lt, .5, 40, i), gy: 1660, dir: bx > 200 + i * 220 ? 1 : -1, pose: P.run(lt + i * .3), face: { eyes: 'happy', mouth: 'grin' } }));
  return { world: s + `<circle cx="${bx}" cy="${by}" r="30" fill="#fff" ${ol(5)}/><path d="M${bx - 20} ${by - 10} l20 10 l20 -10" stroke="${INK}" stroke-width="4" fill="none"/>`, light: light(300, 1080, 1400, '#ff9a5a', .45, .45, 'd'), cam: mv(lt, D, C(540, 1350, 1.3), C(540, 1350, 1.4)) }; } },
// 22 none died
{ f: (lt, D) => ({ world: village({ time: 'dusk' }) + yas({ x: 540, gy: 1640, dir: 0, pose: P.sitFloor(), face: { eyes: 'happy', mouth: 'smile' }, acc: { tear: 1 } }), light: light(300, 1080, 1400, '#ff9a5a', .5, .45, 'd'), cam: mv(lt, D, C(540, 1350, 2.3), C(540, 1340, 2.5)) }) },
// 23 crowd cheers
{ L: 'الحقيقة', f: (lt, D) => { let s = village({ time: 'day' });
  [['man1', 120], ['wom1', 260], ['caid', 400], ['balhcen', 700], ['wom2', 840], ['man2', 980]].forEach(([w, x], i) => s += person(w, { x, gy: 1620 + (i % 2) * 40, s: .85, dir: x < 540 ? 1 : -1, pose: P.armsUp(lt + i * .3), face: { eyes: 'happy', mouth: 'grin' } }));
  return { world: s + yas({ x: 560, gy: 1720, dir: 0, pose: P.stand(), face: { eyes: 'wide', mouth: 'flat' } }), light: light(860, 260, 1800, '#fff1c0', .3, .35, 's'), cam: mv(lt, D, C(540, 1280, 1.2), C(540, 1280, 1.3)) }; } },
// 24 not mol daw
{ f: (lt, D) => ({ world: village({ time: 'day' }) + yas({ x: 540, gy: 1640, dir: 0, pose: { ...P.stand(), aL: [100, 60], aR: [-100, -60] }, face: { eyes: 'open', mouth: 'open' } }), light: light(860, 260, 1800, '#fff1c0', .3, .35, 's'), cam: mv(lt, D, C(540, 1250, 2.2), C(540, 1240, 2.4)) }) },
// 25 boil, wash, teach
{ f: (lt, D) => ({ world: village({ time: 'day' }) + yas({ x: 540, gy: 1700, dir: 0, pose: { ...P.stand(), aR: [-150, -20] }, face: { eyes: 'happy', mouth: 'open' } }) + `<g transform="translate(220 1050) scale(${span(lt, D * .35, D * .45, back)})">${pot(0, 60, lt)}</g><g transform="translate(540 900) scale(${span(lt, D * .55, D * .65, back)})">${soap(0, 0)}</g><g transform="translate(860 1050) scale(${span(lt, D * .75, D * .85, back)})"><path d="M-80 -60 h80 v120 h-80z M0 -60 h80 v120 h-80z" fill="#f7f3ea" ${ol(5)}/><path d="M-60 -30 h40 M-60 0 h40 M20 -30 h40 M20 0 h40" stroke="#999" stroke-width="5"/></g>`, light: light(860, 260, 1800, '#fff1c0', .3, .35, 's'), cam: mv(lt, D, C(540, 1250, 1.35), C(540, 1250, 1.4)) }) },
// 26 hug
{ f: (lt, D) => { const y = yas({ x: 600, gy: 1640, dir: -1, pose: { ...P.stand(), aL: { to: [500, 1450] }, aR: { to: [490, 1470] } }, face: { eyes: 'happy', mouth: 'smile' }, acc: { tear: 1 } });
  return { world: village({ time: 'dusk' }) + y + person('hamid', { x: 480, gy: 1640, dir: 1, pose: { ...P.stand(), lean: 10, aL: { to: [600, 1440] }, aR: { to: [610, 1450] } }, face: { eyes: 'happy', mouth: 'grin' } }) + `<path d="M540 1180 q-20 -30 0 -50 q20 20 0 50z" fill="#e0405a"/>`, light: light(300, 1080, 1400, '#ff9a5a', .45, .45, 'd'), cam: mv(lt, D, C(540, 1300, 2.0), C(540, 1290, 2.2)) }; } },
// 27 1%
{ f: (lt, D) => ({ world: NIGHTV() + phoneBig(540, 1000, 1.05, { mode: 'battery', bat: 1 }) + hand(390, 1260, 2) + hand(690, 1260, 2), light: light(540, 1000, 900, '#ff4a3a', .6, .3, 'p'), cam: C(540, 960, 1) }) },
// 28 last photo
{ f: (lt, D) => { let s = village({ time: 'night', moon: [820, 330, 70] }); [['caid', 180], ['balhcen', 330], ['hamid', 470], ['fatima', 600], ['mha', 720], ['kid1', 840], ['wom2', 960]].forEach(([w, x], i) => s += person(w, { x, gy: 1560, s: .85, dir: 0, pose: lt > D * .4 ? { ...P.stand(), aL: [150, 10] } : P.stand(), face: { eyes: 'happy', mouth: lt > D * .4 ? 'grin' : 'smile' } }));
  s += yas({ x: 540, gy: 1900, dir: 0, s: 1.1, pose: { ...P.stand(), aR: [-170, 0] }, face: { eyes: 'happy', mouth: 'grin' } }); const hr = stick.last.handR;
  return { world: s + phone(hr[0], hr[1] - 30, 180, 1.1), light: light(540, 1300, 1100, '#ffb35c', .65, .4, 'tt'), overlay: flash(lt, D * .75, .3), cam: mv(lt, D, C(560, 1400, 1.1), C(560, 1400, 1.15)) }; } },
// 29 screen dies
{ f: (lt, D) => ({ world: NIGHTV() + phoneBig(540, 1000, 1.05, { mode: lt < D * .4 ? 'battery' : 'dead', bat: 0 }) + hand(390, 1260, 2) + hand(690, 1260, 2), light: '', cam: mv(lt, D, C(540, 960, 1), C(540, 960, 1.06)) }) },
// 30
CTA,
// 31 sleep by candle -> alarm in casa
{ L: 'كازا', f: (lt, D) => lt < D * .45 ? { world: houseInt({ time: 'night' }) + yas({ x: 680, y: 1430, s: 1.1, pose: P.lie(), face: { eyes: 'closed', mouth: 'smile' } }) + candleAlarm(260, 1450, .5, 0, 1, lt), light: light(260, 1300, 1000, '#ffb35c', .78, .5, 'c'), cam: mv(lt, D, C(480, 1300, 1.4), C(480, 1300, 1.5)) } : { world: cityRoom() + bed(540, 1460, { c: '#26375e' }) + yas({ x: 520, y: 1350, s: 1.1, dir: 1, pose: P.shock(), face: { eyes: 'wide', mouth: 'scream' }, hidden: { legs: 1 } }) + blanket(560, 1440, 560, '#26375e') + alarmPhone(220, 1400, lt, 1) + alarmPhone(860, 1250, lt + .2, 1) + alarmPhone(900, 1400, lt + .4, 1) + alarmPhone(160, 1250, lt + .1, 1), light: light(540, 800, 1500, '#e8f4ff', .35, .35, 'r'), cam: mv(lt, D, C(540, 1250, 1.35), C(540, 1250, 1.45)), shake: shake(lt, D * .45, 16) } },
// 32 casa, 100%
{ f: (lt, D) => { const y = yas({ x: 520, y: 1350, s: 1.1, dir: 1, pose: P.phone(lt), face: { eyes: 'wide', mouth: 'O' }, hidden: { legs: 1 } }); const hl = stick.last.handL;
  return { world: cityRoom() + bed(540, 1460, { c: '#26375e' }) + y + phone(hl[0], hl[1] - 10, 15, 1.1, { bat: 100 }) + blanket(560, 1440, 560, '#26375e'), light: light(540, 800, 1500, '#e8f4ff', .35, .35, 'r'), cam: mv(lt, D, C(540, 1200, 1.8), C(540, 1200, 2.0)) }; } },
// 33 last photo missing
{ f: (lt, D) => ({ world: cityRoom() + phoneBig(540, 1000, 1.05, { mode: 'photo', bg: '#f4f4f4', photo: [0, 1, 2, 3, 4, 5].map(i => `<rect x="${-160 + (i % 3) * 110}" y="${-300 + Math.floor(i / 3) * 110}" width="100" height="100" fill="${['#7fb6dc', '#e0a73c', '#3f6b2e', '#c8231f', '#8d6aa8', '#b98d5e'][i]}"/>`).join('') + `<rect x="-160" y="-80" width="100" height="100" fill="none" stroke="#bbb" stroke-width="4" stroke-dasharray="10 8"/><text x="-110" y="-10" text-anchor="middle" font-size="60" fill="#bbb">?</text>` }) + hand(390, 1260, 2) + hand(690, 1260, 2), light: '', cam: mv(lt, D, C(540, 960, 1), C(450, 900, 1.6)) }) },
// 34 just a dream
{ f: (lt, D) => ({ world: cityRoom() + bed(540, 1460, { c: '#26375e' }) + yas({ x: 520, y: 1350, s: 1.1, dir: 0, pose: { ...P.shrug(), lean: wob(lt, 3, 5) }, face: { eyes: 'happy', mouth: 'grin' }, hidden: { legs: 1 } }) + blanket(560, 1440, 560, '#26375e'), light: light(540, 800, 1500, '#e8f4ff', .35, .35, 'r'), cam: mv(lt, D, C(540, 1200, 1.8), C(540, 1190, 2.0)) }) },
// 35 museum
{ L: 'المتحف', f: (lt, D) => ({ world: museum() + yas({ x: lerp(100, 300, span(lt, 0, D * .7, lin)), gy: 1620, dir: 1, pose: lt < D * .7 ? P.walk(lt, 1) : P.stand(), face: { eyes: 'open', mouth: 'flat' } }), light: light(540, 600, 1500, '#fff6d8', .35, .35, 'mu'), cam: mv(lt, D, C(540, 1150, 1.05), C(520, 1150, 1.1)) }) },
// 36 painting 1760
{ f: (lt, D) => ({ world: museum(), light: light(540, 600, 1500, '#fff6d8', .35, .35, 'mu'), cam: mv(lt, D, C(540, 900, 1.3), C(540, 980, 1.6)) }) },
// 37 people laughing, kid holds man's hand
{ f: (lt, D) => ({ world: museum(), light: light(540, 600, 1500, '#fff6d8', .3, .35, 'mu'), cam: mv(lt, D, C(540, 850, 1.7), C(570, 830, 2.4)) }) },
// 38 red cap
{ f: (lt, D) => ({ world: museum(), light: light(600, 760, 600, '#fff6d8', .5, .4, 'mu'), cam: mv(lt, D, C(590, 800, 2.6), C(600, 790, 3.6)), shake: shake(lt, .1, 6) }) },
// 39 caption
{ f: (lt, D) => ({ world: museum() + `<rect x="300" y="1060" width="480" height="110" rx="8" fill="#f7f3ea" ${ol(4)}/><text x="540" y="1110" text-anchor="middle" direction="rtl" font-family="Alexandria" font-weight="900" font-size="38" fill="${INK}">مول الضو</text><text x="540" y="1152" text-anchor="middle" direction="rtl" font-family="Alexandria" font-weight="800" font-size="26" fill="#5a4a3a">اللي قرانا نغليو الما</text>`, light: light(540, 1100, 800, '#fff6d8', .5, .4, 'mu'), cam: mv(lt, D, C(540, 1110, 2.8), C(540, 1110, 3.2)) }) },
// 40 not a dream
{ f: (lt, D) => ({ world: museum() + yas({ x: 540, gy: 1640, dir: 0, pose: P.shock(), face: { eyes: 'wide', mouth: 'O' }, acc: { tear: span(lt, D * .3, D) } }), light: light(540, 600, 1500, '#fff6d8', .4, .35, 'mu'), cam: mv(lt, D, C(540, 1300, 2.0), C(540, 1280, 2.4)) }) },
// 41 home, sleep
{ f: (lt, D) => ({ world: cityRoom({ night: 1 }) + bed(540, 1460, { c: '#26375e' }) + yas({ x: 660, y: 1400, s: 1.1, pose: P.lie(), face: { eyes: 'closed', mouth: 'smile' } }) + blanket(600, 1460, 520, '#26375e') + zzz(380, 1280, lt), light: light(270, 650, 1300, '#4a6aa8', .78, .3, 'n'), cam: mv(lt, D, C(540, 1300, 1.4), C(540, 1300, 1.55)) }) },
// 42 eyes open... candle
{ f: (lt, D) => ({ world: houseInt({ time: 'night' }) + yas({ x: 680, y: 1430, s: 1.1, pose: { ...P.lie(), head: -10 }, face: { eyes: lt > D * .35 ? 'wide' : 'closed', mouth: 'O' } }) + candleAlarm(260, 1450, .2, 0, 1, lt), light: light(260, 1300, 1000, '#ffb35c', .78, .55, 'c'), cam: mv(lt, D, C(420, 1300, 1.6), C(360, 1300, 2.2)) }) },
];
