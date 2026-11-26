const SPECS = [
// 1 hook
{ L: 'فيقت فـ 1760', f: (lt, D) => { const k = span(lt, 0, .6, back);
  const y = yas({ x: 470, gy: 1500, s: 1.15, pose: mixPose(P.sitFloor(), P.shock(), k), face: { eyes: 'wide', mouth: k > .5 ? 'scream' : 'O' }, acc: { sweat: k } });
  const ph = phone(...stick.last.handR, 20, 1.1, { screen: '#8fd0ff' });
  return { world: houseInt({ time: 'night' }) + candleAlarm(820, 1450, .2, 0, 1, lt) + y + ph + popMark(760, 760, span(lt, .4, 1.1), '1760', 150), light: light(820, 1300, 1000, '#ffb35c', .75, .55, 'c'), cam: mv(lt, D, C(560, 1150, 1.25), C(560, 1120, 1.45)), shake: shake(lt, .3, 14) }; } },
// 2 smell
{ f: (lt, D) => { const y = yas({ x: 470, gy: 1500, s: 1.15, pose: { ...P.sitFloor(), head: -10 + wob(lt, 1, 6) }, face: { eyes: 'side', mouth: 'wavy' } });
  return { world: houseInt({ time: 'dawn' }) + goat(1010, 820, lt).replace('translate(1010 820)', 'translate(990 840) scale(.7)') + smoke(800, 700, lt, .6) + y, light: light(795, 680, 1100, '#f0a868', .6, .45, 'w'), cam: mv(lt, D, C(620, 1000, 1.7), C(620, 980, 1.9)) }; } },
// 3 name
{ f: (lt, D) => ({ world: houseInt({ time: 'dawn' }) + candleAlarm(860, 1450, .3, 1, 0, lt) + yas({ x: 520, gy: 1480, s: 1.2, dir: 0, pose: { ...P.stand(), aR: [-150 - wob(lt, 3, 20), -30] }, face: { eyes: blink(lt) || 'happy', mouth: 'smile' } }), light: light(795, 680, 1200, '#f0a868', .55, .4, 'w'), cam: mv(lt, D, C(540, 1150, 1.5), C(540, 1120, 1.65)) }) },
// 4 flashback casa
{ f: (lt, D) => { const y = yas({ x: 520, y: 1350, s: 1.1, dir: -1, pose: { ...P.phone(lt), lean: -14 }, face: { eyes: blink(lt) || 'tired', mouth: 'smile' }, hidden: { legs: 1 } });
  const pp = phone(...stick.last.handL, 15, 1.1);
  return { world: cityRoom({ night: 1 }) + bed(540, 1460, { c: '#26375e' }) + y + pp + blanket(560, 1440, 560, '#26375e'), light: light(...stick.last.handL, 900, '#4aa3ff', .75, .55, 'p'), cam: mv(lt, D, C(540, 1150, 1.35), C(540, 1150, 1.5)) }; } },
// 5 on mat
{ f: (lt, D) => ({ world: houseInt({ time: 'night' }) + yas({ x: 680, y: 1430, s: 1.1, pose: { ...P.lie(), head: -10 }, face: { eyes: 'closed', mouth: 'flat' } }) + zzz(300, 1300, lt) + candleAlarm(870, 1450, .25, 0, 1, lt), light: light(870, 1300, 1000, '#ffb35c', .75, .5, 'c'), cam: mv(lt, D, C(560, 1300, 1.4), C(560, 1300, 1.6)) }) },
// 6 candle detail
{ f: (lt, D) => ({ world: houseInt({ time: 'night' }) + candleAlarm(560, 1450, .3, 0, 1, lt), light: light(560, 1250, 700, '#ffb35c', .8, .6, 'c'), cam: mv(lt, D, C(560, 1330, 2.6), C(570, 1330, 3.0)) }) },
// 7 tick... clank
{ f: (lt, D) => { const melt = span(lt, 0, D * .65, lin) * .6 + .3, drop = span(lt, D * .65, D * .72);
  return { world: houseInt({ time: 'night' }) + candleAlarm(560, 1450, melt, drop, 1, lt) + popMark(560, 1050, span(lt, D * .72, D * .85), 'طاااق!', 110), light: light(560, 1250, 700, '#ffb35c', .8, .6, 'c'), cam: mv(lt, D, C(560, 1300, 2.4), C(560, 1300, 2.6)), shake: shake(lt, D * .72, 22) }; } },
// 8 wake up jump
{ f: (lt, D) => { const k = span(lt, .1, .6, back);
  return { world: houseInt({ time: 'dawn' }) + yas({ x: 480, gy: 1500, s: 1.15, dir: 1, pose: mixPose(P.lie(), P.shock(), k), rot: lerp(-90, 0, k), face: { eyes: 'wide', mouth: 'O' } }) + waves(900, 700, lt, '#3a2a1a'), light: light(795, 680, 1100, '#f0a868', .6, .5, 'w'), cam: mv(lt, D, C(560, 1150, 1.35), C(580, 1100, 1.5)), shake: shake(lt, .2, 10) }; } },
// 9 running out
{ L: 'فين أنا؟', f: (lt, D) => ({ world: village({ time: 'dawn' }) + yas({ x: lerp(80, 900, lt / D), gy: 1560, s: 1, pose: P.run(lt), face: { eyes: 'wide', mouth: 'open' } }) + speedLines(lerp(80, 900, lt / D), 1270, 1), light: light(300, 1080, 1400, '#ffb070', .45, .4, 'd'), cam: mv(lt, D, C(380, 1200, 1.3), C(700, 1200, 1.3)) }) },
// 10 no cars no light
{ f: (lt, D) => ({ world: village({ time: 'day' }) + yas({ x: 540, gy: 1560, s: 1.1, dir: 0, pose: lt < D / 2 ? P.shrug() : P.headGrab(), face: { eyes: 'wide', mouth: lt < D / 2 ? 'frown' : 'scream' } }), light: light(860, 260, 1700, '#fff1c0', .3, .35, 's'), cam: mv(lt, D, C(540, 1200, 1.55), C(540, 1180, 1.75)) }) },
// 11 village + mountain
{ f: (lt, D) => ({ world: village({ time: 'day' }) + yas({ x: 330, gy: 1560, s: .9, dir: 1, pose: P.stand(), face: { eyes: 'open', mouth: 'O' } }), light: light(860, 260, 1800, '#fff1c0', .25, .35, 's'), cam: mv(lt, D, C(500, 1250, 1.1), C(500, 1000, 1.05)) }) },
// 12 city wall
{ f: (lt, D) => ({ world: village({ time: 'day' }), light: light(860, 260, 1800, '#fff1c0', .25, .35, 's'), cam: mv(lt, D, C(850, 1150, 1.7), C(980, 1140, 2.1)) }) },
// 13 no signal
{ f: (lt, D) => ({ world: village({ time: 'day' }) + phoneBig(540, 1000, 1.05 + lt * .02, { mode: 'nosignal', bg: '#20304a' }) + hand(390, 1260, 2) + hand(690, 1260, 2), light: '', cam: C(540, 960, 1) }) },
// 14 battery 87
{ f: (lt, D) => ({ world: village({ time: 'day' }) + phoneBig(540, 1000, 1.05 + lt * .02, { mode: 'battery', bat: 87 }) + hand(390, 1260, 2) + hand(690, 1260, 2), light: '', cam: C(540, 960, 1) }) },
// 15 people stare
{ f: (lt, D) => { let s = village({ time: 'day' });
  [['man1', 120, 1], ['wom1', 260, 1], ['man2', 820, -1], ['wom2', 960, -1], ['kid1', 380, 1], ['shib', 700, -1]].forEach(([w, x, d], i) => s += person(w, { x, gy: 1540 + (i % 2) * 40, s: .85, dir: d, pose: { ...P.stand(), lean: -6 }, face: { eyes: i % 2 ? 'wide' : 'side', mouth: 'O' } }));
  s += yas({ x: 540, gy: 1640, s: 1, dir: 0, pose: P.shrug(), face: { eyes: 'wide', mouth: 'wavy' }, acc: { sweat: 1, blush: 1 } });
  return { world: s, light: light(860, 260, 1800, '#fff1c0', .3, .35, 's'), cam: mv(lt, D, C(540, 1280, 1.15), C(540, 1290, 1.3)) }; } },
// 16 Hamid approaches
{ L: 'حميد', f: (lt, D) => { const hx = lerp(150, 380, span(lt, 0, D * .6, lin)), walking = lt < D * .6;
  return { world: village({ time: 'day' }) + person('hamid', { x: hx, gy: 1600, dir: 1, pose: walking ? P.walk(lt) : { ...P.think() }, face: { eyes: blink(lt) || 'open', mouth: 'O' } }) + yas({ x: 720, gy: 1600, s: 1, dir: -1, pose: P.stand(), face: { eyes: 'open', mouth: 'flat' } }), light: light(860, 260, 1800, '#fff1c0', .3, .35, 's'), cam: mv(lt, D, C(540, 1300, 1.6), C(540, 1310, 1.75)) }; } },
// 17 from casa
{ f: (lt, D) => ({ world: village({ time: 'day' }) + person('hamid', { x: 380, gy: 1600, dir: 1, pose: P.stand(), face: { eyes: 'open', mouth: 'flat' } }) + yas({ x: 680, gy: 1600, s: 1, dir: -1, pose: { ...P.stand(), aR: { to: [700, 1340] }, lean: -6 }, face: { eyes: 'happy', mouth: 'smile' } }), light: light(860, 260, 1800, '#fff1c0', .3, .35, 's'), cam: mv(lt, D, C(640, 1250, 2.0), C(640, 1240, 2.2)) }) },
// 18 Hamid laughs
{ f: (lt, D) => ({ world: village({ time: 'day' }) + person('hamid', { x: 460, gy: 1600, dir: 0, pose: { ...P.stand(), lean: wob(lt, 3, 8), aL: [40, 90], aR: [-40, -90], dy: -Math.abs(wob(lt, 3, 14)) }, face: { eyes: 'happy', mouth: 'grin' } }), light: light(860, 260, 1800, '#fff1c0', .3, .35, 's'), cam: mv(lt, D, C(470, 1330, 2.6), C(470, 1320, 2.9)) }) },
// 19 CTA
CTA,
// 20 Hamid intro
{ L: 'حميد', f: (lt, D) => ({ world: village({ time: 'day' }) + person('hamid', { x: 540, gy: 1600, dir: 0, pose: { ...P.stand(), aR: [-150 - wob(lt, 3, 20), -30] }, face: { eyes: blink(lt) || 'happy', mouth: 'smile' } }) + popMark(700, 1120, span(lt, .3, .9), '10', 90), light: light(860, 260, 1800, '#fff1c0', .3, .35, 's'), cam: mv(lt, D, C(540, 1330, 2.2), C(540, 1330, 2.4)) }) },
// 21 to grandpa
{ L: 'دار با لحسن', f: (lt, D) => { const k = span(lt, 0, D * .8, lin);
  return { world: village({ time: 'day' }) + person('balhcen', { x: 860, gy: 1560, dir: -1, pose: P.stand(), face: { eyes: blink(lt, .5) || 'open', mouth: 'smile' } }) + person('hamid', { x: lerp(200, 520, k), gy: 1600, dir: 1, pose: P.walk(lt), face: { mouth: 'smile' } }) + yas({ x: lerp(60, 380, k), gy: 1600, dir: 1, pose: P.walk(lt + .3), face: { eyes: 'open', mouth: 'flat' } }), light: light(860, 260, 1800, '#fff1c0', .3, .35, 's'), cam: mv(lt, D, C(420, 1260, 1.35), C(600, 1260, 1.4)) }; } },
// 22 welcome
{ f: (lt, D) => ({ world: village({ time: 'day' }) + person('balhcen', { x: 560, gy: 1580, dir: 0, pose: { ...P.shrug(), aL: [80 + wob(lt, 1, 6), 40], aR: [-80 - wob(lt, 1, 6), -40] }, face: { eyes: blink(lt) || 'happy', mouth: 'smile' } }), light: light(860, 260, 1800, '#fff1c0', .3, .35, 's'), cam: mv(lt, D, C(560, 1230, 2.2), C(560, 1220, 2.45)) }) },
// 23 bread oil tea
{ f: (lt, D) => ({ world: houseInt({ time: 'day' }) + yas({ x: 300, gy: 1500, dir: 1, pose: P.sitFloor(), face: { eyes: 'happy', mouth: 'smile' } }) + person('balhcen', { x: 800, gy: 1500, dir: -1, pose: { ...P.sitFloor(), aR: [70, 20] }, face: { mouth: 'smile' } }) + teaTray(560, 1520) + `<path d="M${590} ${1430} q${10} ${-30 - wob(lt, 1, 10)} 0 -60" stroke="#fff" stroke-width="5" fill="none" opacity=".5"/>`, light: light(795, 680, 1400, '#ffe2a8', .45, .35, 'w'), cam: mv(lt, D, C(560, 1330, 1.6), C(560, 1440, 2.1)) }) },
// 24 the bag
{ f: (lt, D) => { const a = span(lt, D * .15, D * .35, back), b = span(lt, D * .4, D * .6, back), c = span(lt, D * .65, D * .85, back);
  return { world: houseInt({ time: 'day' }) + bag(540, 1560) + `<g transform="translate(330 ${1420 - a * 60}) scale(${a})">${powerbank(0, 0, -10)}</g><g transform="translate(540 ${1380 - b * 60}) scale(${b})">${pills(0, 0, 8)}</g><g transform="translate(750 ${1420 - c * 60}) scale(${c})">${lighter(0, 0)}</g>`, light: light(540, 1300, 900, '#ffe2a8', .55, .35, 'w'), cam: mv(lt, D, C(540, 1420, 2.3), C(540, 1420, 2.5)) }; } },
// 25 that's all I have
{ f: (lt, D) => ({ world: houseInt({ time: 'day' }) + yas({ x: 540, gy: 1520, dir: 0, pose: P.think(), face: { eyes: 'tired', mouth: 'frown' } }) + powerbank(380, 1580, -8) + pills(560, 1600, 4) + lighter(720, 1590), light: light(795, 680, 1300, '#ffe2a8', .5, .35, 'w'), cam: mv(lt, D, C(540, 1350, 1.9), C(540, 1330, 2.2)) }) },
// 26 night falls
{ L: 'الليل', f: (lt, D) => ({ world: village({ time: 'night', moon: [820, 330, 70] }), light: light(820, 330, 1400, '#9fb4ff', .55 + span(lt, 0, D) * .2, .3, 'm'), cam: mv(lt, D, C(540, 900, 1.05), C(540, 1150, 1.15)) }) },
// 27 Aisha Qandisha
{ f: (lt, D) => ({ world: village({ time: 'night', moon: [820, 330, 70] }) + person('hamid', { x: 520, gy: 1600, dir: 1, pose: { ...P.stand(), aL: { to: 'mouth' }, lean: -6 + wob(lt, 6, 2) }, face: { eyes: 'wide', mouth: 'wavy' } }) + shakeLines(520, 1200, .8, '#cfd8ff'), light: light(820, 330, 1400, '#9fb4ff', .78, .3, 'm'), cam: mv(lt, D, C(520, 1300, 2.5), C(520, 1300, 2.8)) }) },
// 28 laugh + torch
{ f: (lt, D) => { const on = lt > D * .45;
  const y = yas({ x: 420, gy: 1600, dir: 1, pose: on ? { ...P.point(), aR: [150, 0] } : { ...P.stand(), lean: wob(lt, 3, 6) }, face: { eyes: 'happy', mouth: 'grin' } });
  const hr = stick.last.handR;
  return { world: village({ time: 'night', moon: [820, 330, 70] }) + y + phone(hr[0], hr[1] - 20, 0, 1, { torch: on }) + (on ? `<path d="M${hr[0]} ${hr[1] - 60} L${hr[0] + 900} ${hr[1] - 700} L${hr[0] + 1000} ${hr[1] - 300}Z" fill="#fffbe0" opacity=".25"/>` : ''), light: on ? light(hr[0], hr[1] - 60, 1100, '#fff6cc', .8, .6, 't') : light(820, 330, 1400, '#9fb4ff', .8, .3, 'm'), cam: mv(lt, D, C(500, 1300, 1.9), C(520, 1290, 2.1)), shake: shake(lt, D * .45, 8) }; } },
// 29 silence
{ f: (lt, D) => { let s = village({ time: 'night', moon: [820, 330, 70] });
  [['man1', 560], ['wom1', 700], ['man2', 840], ['wom2', 980], ['shib', 1100]].forEach(([w, x], i) => s += person(w, { x, gy: 1560 + (i % 2) * 30, s: .85, dir: -1, pose: P.stand(), face: { eyes: 'wide', mouth: 'flat' } }));
  s += yas({ x: 150, gy: 1620, dir: 1, pose: { ...P.point(), aR: [120, 0] }, face: { eyes: 'open', mouth: 'flat' } }); const hr = stick.last.handR;
  return { world: s + phone(hr[0], hr[1] - 20, 0, 1, { torch: 1 }), light: light(800, 1250, 800, '#fff6cc', .85, .45, 't'), cam: mv(lt, D, C(620, 1250, 1.2), C(640, 1250, 1.3)) }; } },
// 30 women scream, men kneel
{ L: 'مول الضو', f: (lt, D) => { let s = village({ time: 'night', moon: [820, 330, 70] }); const k = span(lt, .2, .8);
  s += person('wom1', { x: 230, gy: 1560, s: .9, dir: 1, pose: P.headGrab(), face: { eyes: 'wide', mouth: 'scream' } });
  s += person('wom2', { x: 850, gy: 1560, s: .9, dir: -1, pose: P.shock(), face: { eyes: 'wide', mouth: 'scream' } });
  s += person('man1', { x: 420, gy: 1620, s: .9, dir: 1, pose: mixPose(P.stand(), { ...P.sitFloor(), lean: 40, aL: [100, 0], aR: [100, 0], lL: [100, -120], lR: [90, -120] }, k), dy: 60 * k, face: { eyes: 'closed', mouth: 'O' } });
  s += person('man2', { x: 660, gy: 1620, s: .9, dir: -1, pose: mixPose(P.stand(), { ...P.sitFloor(), lean: 40, aL: [100, 0], aR: [100, 0], lL: [100, -120], lR: [90, -120] }, k), face: { eyes: 'closed', mouth: 'O' } });
  return { world: s, light: light(540, 1000, 1000, '#fff6cc', .8, .45, 't'), cam: mv(lt, D, C(540, 1280, 1.4), C(540, 1290, 1.55)), shake: shake(lt, .25, 12) }; } },
// 31 shibani shouts
{ f: (lt, D) => ({ world: village({ time: 'night', moon: [820, 330, 70] }) + person('shib', { x: 520, gy: 1600, dir: 1, pose: { ...P.point(), aR: [100 + wob(lt, 4, 6), 10] }, face: { eyes: 'wide', mouth: 'scream' } }) + popMark(820, 1000, span(lt, .4, 1), '!', 140), light: light(800, 1000, 1000, '#fff6cc', .75, .5, 't'), cam: mv(lt, D, C(560, 1250, 2.3), C(560, 1240, 2.6)), shake: shake(lt, .3, 10) }) },
// 32 crowd cheers
{ f: (lt, D) => { let s = village({ time: 'night', moon: [820, 330, 70] });
  [['man1', 150], ['wom1', 300], ['kid1', 430], ['man2', 680], ['kid2', 800], ['wom2', 930]].forEach(([w, x], i) => s += person(w, { x, gy: 1600 + (i % 2) * 40, s: .85, dir: x < 540 ? 1 : -1, pose: P.armsUp(lt + i * .3), p: { dy: -Math.abs(wob(lt + i * .2, 2, 16)) }, face: { eyes: 'happy', mouth: 'grin' } }));
  s += yas({ x: 540, gy: 1520, s: .95, dir: 0, pose: { ...P.stand(), aR: [-170, 0] }, face: { eyes: 'wide', mouth: 'O' } }); const hr = stick.last.handR;
  return { world: s + phone(hr[0], hr[1] - 30, 0, 1, { torch: 1 }) + `<circle cx="${hr[0]}" cy="${hr[1] - 70}" r="160" fill="#fff6cc" opacity=".35" filter="url(#soft)"/>`, light: light(hr[0], hr[1] - 70, 1100, '#fff6cc', .8, .55, 't'), cam: mv(lt, D, C(540, 1250, 1.2), C(540, 1250, 1.32)) }; } },
// 33 i'm just human
{ f: (lt, D) => ({ world: village({ time: 'night', moon: [820, 330, 70] }) + yas({ x: 540, gy: 1600, dir: 0, pose: { ...P.stand(), aL: [100, 30], aR: [-100, -30] }, face: { eyes: 'wide', mouth: 'open' }, acc: { sweat: span(lt, 0, D) } }), light: light(540, 1100, 900, '#fff6cc', .75, .45, 't'), cam: mv(lt, D, C(540, 1250, 2.2), C(540, 1240, 2.4)) }) },
// 34 joy in eyes
{ f: (lt, D) => { let s = village({ time: 'night', moon: [820, 330, 70] });
  s += person('kid1', { x: 360, gy: 1540, dir: 1, pose: P.stand(), face: { eyes: 'happy', mouth: 'smile' }, acc: { blush: 1 } }) + person('hamid', { x: 540, gy: 1560, dir: 0, pose: P.stand(), face: { eyes: 'happy', mouth: 'grin' }, acc: { blush: 1 } }) + person('kid2', { x: 720, gy: 1540, dir: -1, pose: P.stand(), face: { eyes: 'happy', mouth: 'smile' }, acc: { blush: 1 } });
  return { world: s, light: light(540, 1150, 900, '#ffd99a', .75, .5, 't'), cam: mv(lt, D, C(540, 1300, 2.4), C(540, 1300, 2.1)) }; } },
// 35 photo
{ f: (lt, D) => { let s = houseInt({ time: 'night' }) + person('balhcen', { x: 680, gy: 1520, dir: -1, pose: { ...P.stand(), aR: { to: [600, 1260] } }, face: { eyes: 'open', mouth: 'smile' } }) + person('hamid', { x: 860, gy: 1520, dir: -1, pose: { ...P.stand(), aL: [160, 0] }, face: { eyes: 'happy', mouth: 'grin' } });
  s += yas({ x: 230, gy: 1520, dir: 1, pose: { ...P.point(), aR: [95, -10] }, face: { eyes: 'side', mouth: 'smile' } }); const hr = stick.last.handR;
  return { world: s + phone(hr[0] + 10, hr[1], 90, 1.1, { screen: '#cfe3ff' }), light: light(560, 1100, 1100, '#ffb35c', .7, .45, 'c'), overlay: flash(lt, D * .6), cam: mv(lt, D, C(540, 1260, 1.45), C(560, 1260, 1.6)) }; } },
// 36 sees face
{ f: (lt, D) => { const ph = `<rect x="-176" y="-350" width="352" height="700" fill="#c9a26a"/>` + `<g transform="translate(0 60) scale(1.6)"><circle cx="0" cy="-30" r="96" fill="url(#headG)" stroke="${INK}" stroke-width="8"/><path d="M-96 -55 Q-104 -170 0 -168 Q104 -170 96 -55 Q0 -90 -96 -55Z" fill="#f1ede2" stroke="${INK}" stroke-width="6"/><path d="M-80 -10 Q-80 100 0 98 Q80 100 80 -10 Q0 40 -80 -10Z" fill="#efece4" stroke="${INK}" stroke-width="5"/><ellipse cx="-30" cy="-30" rx="8" ry="11" fill="${INK}"/><ellipse cx="32" cy="-30" rx="8" ry="11" fill="${INK}"/><path d="M-20 20 Q0 34 20 20" stroke="${INK}" stroke-width="6" fill="none"/></g>`;
  return { world: houseInt({ time: 'night' }) + phoneBig(540, 1000, 1.05 + lt * .03, { mode: 'photo', photo: ph }) + hand(360, 1280, 2) + hand(720, 1280, 2), light: light(540, 900, 1100, '#ffe2a8', .6, .4, 'c'), cam: C(540, 980, 1) }; } },
// 37 tears
{ f: (lt, D) => { const b = person('balhcen', { x: 520, gy: 1560, dir: 1, pose: { ...P.stand(), aR: { to: [700, 1260] }, head: 10 }, face: { eyes: 'closed', mouth: 'wavy' } }); const h = stick.last.head;
  return { world: houseInt({ time: 'night' }) + b + phone(720, 1270, 0, 1.3) + tear(h[0] - 10, h[1] + 10, lt) + tear(h[0] + 50, h[1] + 10, lt + .4), light: light(700, 1200, 900, '#ffe2a8', .7, .5, 'c'), cam: mv(lt, D, C(580, 1150, 2.4), C(580, 1140, 2.7)) }; } },
// 38 CTA
CTA,
// 39 eye on battery
{ L: 'الباتري', f: (lt, D) => { const y = yas({ x: 540, gy: 1560, dir: 1, pose: P.phone(lt), face: { eyes: 'side', mouth: 'frown' } }); const hl = stick.last.handL;
  return { world: houseInt({ time: 'night' }) + y + phone(hl[0], hl[1] - 10, 15, 1.1, { bat: 70 }), light: light(hl[0], hl[1], 800, '#4aa3ff', .8, .55, 'p'), cam: mv(lt, D, C(560, 1200, 2.3), C(560, 1190, 2.6)) }; } },
// 40 70%
{ f: (lt, D) => ({ world: houseInt({ time: 'night' }) + phoneBig(540, 1000, 1.05, { mode: 'battery', bat: 70 - Math.floor(span(lt, D * .4, D, lin) * 3) }) + hand(390, 1260, 2) + hand(690, 1260, 2), light: light(540, 1000, 1000, '#4aa3ff', .6, .3, 'p'), cam: mv(lt, D, C(540, 960, 1), C(540, 960, 1.08)) }) },
// 41 crying from house
{ L: 'فاطمة مريضة', f: (lt, D) => ({ world: village({ time: 'dawn' }) + waves(250, 1250, lt, '#3a2a1a') + yas({ x: 720, gy: 1600, dir: lt < .5 ? 1 : -1, pose: P.stand(), face: { eyes: 'wide', mouth: 'O' } }), light: light(300, 1080, 1400, '#ffb070', .5, .4, 'd'), cam: mv(lt, D, C(520, 1250, 1.4), C(480, 1250, 1.5)) }) },
// 42 Fatima fever
{ f: (lt, D) => { let s = houseInt({ time: 'day' }) + person('fatima', { x: 600, y: 1470, pose: { ...P.lie() }, face: { eyes: 'tired', mouth: 'wavy' }, acc: { sweat: 1, blush: 1 } }) + blanket(560, 1520, 360, '#a85a6a');
  s += person('mha', { x: 820, gy: 1520, dir: -1, pose: { ...P.sitFloor(), lean: 20, aR: [90, 10] }, face: { eyes: 'closed', mouth: 'frown' }, acc: { tear: 1 } });
  return { world: s, light: light(795, 680, 1200, '#ffe2a8', .6, .35, 'w'), cam: mv(lt, D, C(540, 1380, 1.8), C(540, 1380, 2.0)) }; } },
// 43 bouchaib enters
{ f: (lt, D) => ({ world: houseInt({ time: 'day' }) + `<rect x="60" y="760" width="300" height="700" fill="#fff1d0"/>` + person('bouchaib', { x: lerp(120, 330, span(lt, 0, D * .7, lin)), gy: 1480, dir: 1, pose: P.walk(lt, 1), face: { eyes: 'angry', mouth: 'flat' } }), light: light(210, 1100, 900, '#fff1d0', .7, .3, 'door'), cam: mv(lt, D, C(380, 1200, 1.6), C(420, 1200, 1.75)) }) },
// 44 bouchaib close
{ f: (lt, D) => ({ world: houseInt({ time: 'day' }) + brazier(780, 1500, lt) + person('bouchaib', { x: 520, gy: 1520, dir: 1, pose: { ...P.stand(), head: -6 }, face: { eyes: 'angry', mouth: 'smile' } }), light: light(780, 1450, 900, '#ff5a2a', .82, .6, 'b'), cam: mv(lt, D, C(540, 1150, 2.6), C(540, 1140, 3.0)) }) },
// 45 evil eye, burn
{ f: (lt, D) => ({ world: houseInt({ time: 'day' }) + person('fatima', { x: 700, y: 1470, pose: P.lie(), face: { eyes: 'tired', mouth: 'wavy' }, acc: { sweat: 1 } }) + blanket(740, 1520, 360, '#a85a6a') + brazier(420, 1560, lt) + person('bouchaib', { x: 260, gy: 1520, dir: 1, pose: { ...P.point(), aR: [100 + wob(lt, 3, 5), 0] }, face: { eyes: 'angry', mouth: 'open' } }), light: light(420, 1500, 900, '#ff5a2a', .8, .6, 'b'), cam: mv(lt, D, C(500, 1300, 1.6), C(500, 1300, 1.8)) }) },
// 46 nail heats
{ f: (lt, D) => ({ world: houseInt({ time: 'night' }) + brazier(540, 1500, lt, 1.5) + nailRod(330, 1480, 0, span(lt, 0, D * .9, lin)) + hand(330, 1480, 1.3), light: light(540, 1450, 700, '#ff5a2a', .85, .7, 'b'), cam: mv(lt, D, C(470, 1460, 2.6), C(480, 1470, 2.9)) }) },
// 47 Hamid begs
{ f: (lt, D) => { const y = yas({ x: 620, gy: 1580, dir: -1, pose: P.stand(), face: { eyes: 'wide', mouth: 'O' } });
  const h = person('hamid', { x: 420, gy: 1600, dir: 1, pose: { ...P.stand(), aL: { to: [600, 1300] }, aR: { to: [610, 1340] }, lean: 14 }, face: { eyes: 'closed', mouth: 'frown' } }); const hh = stick.last.head;
  return { world: houseInt({ time: 'day' }) + y + h + tear(hh[0] + 10, hh[1] + 10, lt) + tear(hh[0] + 40, hh[1], lt + .5), light: light(795, 680, 1200, '#ffe2a8', .6, .35, 'w'), cam: mv(lt, D, C(520, 1250, 2.0), C(520, 1240, 2.3)) }; } },
// 48 CTA end
{ L: 'دير فولو 🔔', f: CTA.f },
];
