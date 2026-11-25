const Y=1.7,IZ=-500,CX=-27,CZ=IZ+5;
function zodAt(t,x,z,ry=0){zod.visible=true;zod.position.set(x,Math.sin(t*2.2)*.12,z);zod.rotation.y=ry;zod.rotation.z=Math.sin(t*1.7)*.04;zod.userData.flag.rotation.y=Math.sin(t*9)*.25;}
function crewZ(t,z,o={}){put('nadia',Object.assign({x:-1.6,y:.35,z:z-.3,ry:-90,s:.8,lid:.2,brow:.5},o.nadia||{}),t);put('you',Object.assign({x:.6,y:.35,z:z+.4,ry:-90,s:.8,lid:.15},o.you||{}),t);put('guard',Object.assign({x:1.8,y:.35,z:z-.4,ry:-90,s:.8},o.guard||{}),t);}
function islandMap(t){const g=G(FX,540,900);el('rect',{class:'o',x:-470,y:-620,width:940,height:1140,rx:16,fill:'#0f2236'},g);el('path',{class:'o',d:'M-200 -40 Q-160 -260 40 -240 Q240 -230 250 -20 Q250 200 40 230 Q-180 220 -200 -40Z',fill:'#3a3c44'},g);el('path',{d:'M-200 -40 Q-260 -10 -210 60',stroke:'#4fc3ff','stroke-width':10,fill:'none'},g);const hc=G(g,-230,20);el('circle',{r:44,fill:'none',stroke:'#ffd166','stroke-width':8},hc);txt(g,0,-560,48,'N','#fff',{direction:'ltr'});txt(g,0,500,48,'S','#fff',{direction:'ltr'});const lr=G(g,40,-200);const lit=.4+.6*Math.abs(Math.sin(t*3));el('circle',{r:12*lit+4,fill:'#ffe27a'},lr);return g;}
function windArrows(p,t,k=1,x0=540,y0=900){for(let i=0;i<5;i++){const ph=((t*.7+i/5)%1);const y=y0-500+ph*1000;el('path',{d:`M${x0-300+i*150} ${y-60} L${x0-300+i*150} ${y+60} M${x0-330+i*150} ${y+30} L${x0-300+i*150} ${y+60} L${x0-270+i*150} ${y+30}`,stroke:'#cfe6ff','stroke-width':8,fill:'none',opacity:k*Math.sin(ph*Math.PI)},p);}}
function coveSet(t){blackBoat.visible=true;blackBoat.position.set(CX-2,Math.sin(t*1.4)*.08,CZ);blackBoat.rotation.y=0;}
const SHOTS=[
// 1-2 answer 9: SOS; sent by Si Larbi left alone on the rock
[1,(t)=>{if(t<T(2)){CARD(t);if(t<T(1,'إس')){answerCard(t,T(1),9);return;}BIG('SOS',540,560,popS(t,T(1,'إس')),220);const row=(y,s,tt)=>{if(t>=tt){const g=G(FX,540,y,popS(t,tt));for(let i=0;i<3;i++)el(s==='s'?'circle':'rect',s==='s'?{cx:-120+i*120,cy:0,r:26,fill:'#ffe27a'}:{x:-170+i*120,y:-20,width:100,height:40,rx:20,fill:'#ffe27a'},g);}};
   row(900,'s',T(1,'قصار'));row(1020,'l',T(1,'طوال'));row(1140,'s',T(1,'قصار')+1.2);if(t>=T(1,'عتقوني'))LBL('عتقوني',540,1350,popS(t,T(1,'عتقوني')),80,'#ff3b30','#fff');return;}
  setEnv('island','night');put('larbi',{x:4,y:4.3,z:IZ-30,ry:10,lid:.6,smile:-.5,brow:-.5,item:'bell',pose:'torch'},t);C3(t,[4.8,8.4,IZ-25],[4,8,IZ-30],40);}],
// 3-4 reach the cove unheard; engine sound carries far over water
[3,(t)=>{setEnv('island','night');const z=IZ+60;zodAt(t,0,z,-Math.PI/2);if(t<T(4)){put('nadia',{x:0,y:.35,z,s:.8,lid:.2,brow:.5,mouth:talkIn(t,3)},t);C3(t,[.4,3.4,z+4.4],[0,3,z],40);return;}crewZ(t,z);C3(t,[10,5,z+10],[0,1.5,z],44);
  for(let i=0;i<4;i++){const ph=((t*.8+i/4)%1);el('path',{d:`M${540+ph*400} ${1200-ph*200} a${60+ph*200} ${60+ph*200} 0 0 1 0 ${120+ph*400}`,stroke:'#ffd166','stroke-width':6,fill:'none',opacity:1-ph},FX);}}],
// 5-7 the little flag: wind from the north to the south; sound goes with the wind
[5,(t)=>{setEnv('island','night');const z=IZ+60;zodAt(t,0,z,-Math.PI/2);crewZ(t,z,{nadia:{mouth:t>=T(7)?talkIn(t,7):0,pose:t<T(6)?'point':'idle'}});C3(t,t<T(7)?[5,3.2,z+2]:[6,4.5,z+9],t<T(7)?[2.6,2.4,z]:[0,1.8,z],t<T(7)?30:42);
  if(t>=T(6)){const g=G(FX,880,500,popS(t,T(6)));el('circle',{r:110,fill:'#fff',stroke:'#17120f','stroke-width':5},g);txt(g,0,-122,40,'N','#fff',{direction:'ltr'});el('path',{d:'M0 -80 L0 80 M-30 50 L0 80 L30 50',stroke:'#1d5fa8','stroke-width':14,fill:'none'},g);}if(t>=T(7))windArrows(FX,t,1,540,1100);}],
// 8-11 two approaches: north (close but exposed), south (+10 min, behind rocks)
[8,(t)=>{CARD(t);islandMap(t);const k1=cl((t-T(10))/1.2),k2=cl((t-T(11))/1.6);
  if(t>=T(10)){el('path',{d:`M540 260 Q300 ${lerp(260,600,k1)} ${lerp(540,320,k1)} ${lerp(260,900,k1)}`,stroke:'#ff3b30','stroke-width':10,'stroke-dasharray':'18 12',fill:'none'},FX);LBL('1: الشمال',760,330,popS(t,T(10)),46,'#ff3b30','#fff');}
  if(t>=T(11)){el('path',{d:`M540 1650 Q240 ${lerp(1650,1300,k2)} ${lerp(540,320,k2)} ${lerp(1650,920,k2)}`,stroke:'#2ecc71','stroke-width':10,'stroke-dasharray':'18 12',fill:'none'},FX);LBL('2: الجنوب (+10 min)',760,1600,popS(t,T(11)),42,'#2ecc71','#fff');}}],
// 12-13 everyone looks at you; 'you choose'
[12,(t)=>{setEnv('island','night');const z=IZ+60;zodAt(t,0,z,-Math.PI/2);crewZ(t,z,{nadia:{ry:-40,ex:.8,mouth:t>=T(13)?talkIn(t,13):0},guard:{ry:-140,ex:-.6},you:{ry:0,lid:.1,browUp:.7}});C3(t,[.6,3.6,z+6.5],[.4,2.4,z],40);}],
// 14-18 Larbi's light on the rock; two boat lights in the cove; Omar and Lhoussine there; black boat too
[14,(t)=>{setEnv('island','night');coveSet(t);const L=[14,15,16,17,18].filter(l=>t>=T(l)).pop()||14;
  put('larbi',{x:4,y:4.3,z:IZ-30,ry:10,lid:.6,smile:-.5,item:'bell',pose:'torch'},t);if(L>=17){put('omar',{x:CX+.5,y:1.2,z:CZ+4,ry:90,lid:.3,dark:.3},t);put('hussein',{x:CX+2.2,y:1.2,z:CZ+4,ry:90,lid:.3},t);}
  if(L>=16){signal.visible=true;signal.position.set(CX+1,3,CZ+1);signal.scale.setScalar(5);}
  const c={14:[[-10,14,IZ+40],[-8,3,IZ-5]],15:[[4.8,8.4,IZ-25],[4,8,IZ-30]],16:[[-40,8,IZ+30],[CX,1,CZ]],17:[[CX+1,4.6,CZ+11],[CX+1.3,3.4,CZ+4]],18:[[-42,7,IZ+24],[CX-2,1,CZ]]}[L];C3(t,c[0],c[1],40);if(L===17&&t<T(17,'ولكن'))X(FX,540,460,popS(t,T(17,'ما')),.6);}],
// 19-21 one chance; Nadia: decide fast, the tide will fall; if they hear us they flee
[19,(t)=>{if(t<T(20)){CARD(t);BIG('1',540,800,popS(t,T(19,'وحدة')),300);return;}setEnv('island','night');const z=IZ+60;zodAt(t,0,z,-Math.PI/2);put('nadia',{x:0,y:.35,z,s:.8,lid:.15,brow:.7,mouth:t<T(21)?talkIn(t,20):talkAll(t,21)},t);C3(t,[.4,3.4,z+4.4],[0,3,z],40);
  if(t>=T(20,'يهبط')){const g=G(FX,840,480,popS(t,T(20,'يهبط')));el('path',{d:'M0 -70 L0 70 M-40 30 L0 70 L40 30',stroke:'#4fc3ff','stroke-width':18,fill:'none'},g);}}],
[22,Q(10,22)],[23,CTA2(23)],
// 24-26 answer 10: from the south
[24,(t)=>{CARD(t);if(t<T(24,'الجنوب')){answerCard(t,T(24),10);return;}islandMap(t);windArrows(FX,t,.8);
  if(t<T(26)){LBL('الجنوب ✓',540,1660,popS(t,T(24,'الجنوب')),56,'#2ecc71','#fff');}else{LBL('الشمال ✗',540,300,popS(t,T(26)),56,'#ff3b30','#fff');for(let i=0;i<3;i++){const ph=((t*.8+i/3)%1);el('path',{d:`M440 ${380+ph*400} a${40+ph*120} ${40+ph*120} 0 0 0 200 0`,stroke:'#ff3b30','stroke-width':6,fill:'none',opacity:1-ph},FX);}}}],
// 27-31 south approach; engine off, oars; silence; wind whistles; the cove appears
[27,(t)=>{setEnv('island','night');const L=[27,28,29,30,31].filter(l=>t>=T(l)).pop()||27;const z=IZ+V(t,[[T(27),40],[T(32),14]]);const x=V(t,[[T(27),-6],[T(32),-22]]);zodAt(t,x,z,-.8);crewZ(t,z,{nadia:{x:x-1.4,pose:L>=28?'carry':'idle'},you:{x:x+.4},guard:{x:x+1.6,pose:L>=28?'carry':'idle'}});
  C3(t,L>=31?[x+6,6,z+12]:[x+8,4,z+8],L>=31?[CX,1,CZ]:[x,1.5,z],42);if(L===28)X(FX,200,460,popS(t,T(28,'طفات')),.6);if(L===29)txt(FX,540,460,110,'...','#fff',{direction:'ltr'});if(L>=30)windArrows(FX,t,.5,540,700);}],
// 32-33 the black boat; Omar and Lhoussine carrying nailed wooden crates
[32,(t)=>{setEnv('island','night');coveSet(t);put('omar',{x:CX+.5,y:1.2,z:CZ+4,ry:60,lid:.3,pose:'carry',item:'crate'},t);put('hussein',{x:CX+2.6,y:1.2,z:CZ+4.2,ry:60,lid:.3,pose:'carry',item:'crate'},t);put('smoker',{x:CX-2,y:.55,z:CZ,ry:40,item:'cig',pose:'chin'},t);signal.visible=true;signal.position.set(CX+1,3,CZ+1);signal.scale.setScalar(4);C3(t,[CX+6,5.5,CZ+14],[CX+1,2.4,CZ+3],40);}],
// 34-37 spotlight: 'Coast guard, don't move'; hands up; Omar frozen; the smoker tries the engine
[34,(t)=>{setEnv('island','night');coveSet(t);const on=t>=T(34,'الضو');zodAt(t,CX+8,CZ+14,-2.2);zod.userData.spot.intensity=on?60:0;zod.userData.spot.target.position.set(-10,0,-8);
  const up=t>=T(35,'ورفع');put('omar',{x:CX+.5,y:1.2,z:CZ+4,ry:60,lid:on?0:.3,browUp:on?1:0,pose:t>=T(36)?'idle':'carry',item:t<T(36)?'crate':''},t);put('hussein',{x:CX+2.6,y:1.2,z:CZ+4.2,ry:60,lid:0,browUp:1,pose:up?'up':'carry',item:t<T(35,'طيح')?'crate':''},t);put('smoker',{x:CX-2,y:.55,z:CZ,ry:40,lid:0,pose:t>=T(37,'يشعل')?'knock':'chin',item:t<T(37,'يشعل')?'cig':''},t);
  put('nadia',{x:CX+8,y:.35,z:CZ+14,ry:-130,s:.8,lid:.1,brow:.8,pose:'point',mouth:t>=T(34,'وقالت')?talkIn(t,34):0},t);C3(t,[CX+8,6,CZ+20],[CX+1,2.4,CZ+3],42,t>=T(34,'خفر')&&t<T(35)?4:0);if(t>=T(34,'خفر')&&t<T(35))LBL('خفر السواحل',540,460,popS(t,T(34,'خفر')),60,'#1d5fa8','#fff');}],
// 38-39 tide falling, the boat can't leave; a guard pulls the key
[38,(t)=>{setEnv('island','night');coveSet(t);blackBoat.position.y=-.4*cl((t-T(38))/2);C3(t,[CX+4,4.2,CZ+8],[CX-2,1,CZ],40);const g=G(FX,840,480,popS(t,T(38,'كيهبط')));el('path',{d:'M0 -70 L0 70 M-40 30 L0 70 L40 30',stroke:'#4fc3ff','stroke-width':18,fill:'none'},g);
  if(t>=T(39))put('guard',{x:CX-1.4,y:.6,z:CZ+.3,ry:30,lid:.2,pose:'give',item:t>=T(39,'الساروت')?'key':''},t);}],
// 40-42 Omar: 'we did nothing; the wave at noon; Younes left us'
[40,(t)=>{setEnv('island','night');coveSet(t);zodAt(t,CX+8,CZ+14,-2.2);zod.userData.spot.intensity=60;zod.userData.spot.target.position.set(-10,0,-8);put('omar',{x:CX+.5,y:1.2,z:CZ+4,ry:20,lid:.35,smile:-.1,ex:.3,mouth:t<T(42)?talkIn(t,40):talkAll(t,42)},t);C3(t,[CX+1,4.8,CZ+8.6],[CX+.5,4.2,CZ+4],40);if(t>=T(42,'الطناش'))clockFace(FX,850,460,80,12,0);}],
// 43-45 you don't answer; light on his face; your notebook's first page
[43,(t)=>{if(t<T(45)){setEnv('island','night');coveSet(t);zodAt(t,CX+8,CZ+14,-2.2);zod.userData.spot.intensity=60;zod.userData.spot.target.position.set(-10,0,-8);put('omar',{x:CX+.5,y:1.2,z:CZ+4,ry:30,lid:.2,ex:.6},t);put('you',{x:CX+2.6,y:1.2,z:CZ+5,ry:-60,lid:.4,brow:.6,ex:-.8,item:'notebook',pose:'hold'},t);C3(t,[CX+1.6,4.6,CZ+12],[CX+1.6,3.4,CZ+4.4],40);return;}
  CARD(t);notebook(FX,540,900,1.15,['شي حاجة ما مشاتش.'],t,[0]);}],
[46,(t)=>{CARD(t);quizCard(t,T(46),11);}],[47,CTA2(47)],
// 48-52 answer 11
[48,(t)=>{CARD(t);if(t<T(48,'قال')){answerCard(t,T(48),11);return;}
  if(t<T(51))[[T(48,'الطناش'),'الريّس: من بعد 12:00',false],[T(49,'سبعة'),'يونس: الشمس 07:00',false],[T(50,'بخمسة'),'5 h قبل الموجة',true]].forEach(([tt,s,h],i)=>{if(t>=tt){const g=G(FX,540,560+i*230,popS(t,tt));el('rect',{class:'o',x:-420,y:-80,width:840,height:150,rx:30,fill:h?'#ffd166':'#f4f6fb'},g);txt(g,0,24,62,s,'#17120f');}});
  else{[[T(51,'هادي'),'0.5 m'],[T(51,'ناشفة'),'شبكة ناشفة'],[T(51,'السوق'),'حوت السوق'],[T(51,'والمازوط'),'70 L']].forEach(([tt,s],i)=>{if(t>=tt)LBL(s,540,520+i*170,popS(t,tt),56,'#fff6c8');});if(t>=T(52))X(FX,540,1350,popS(t,T(52,'موجة')),1.2);}}],
// 53-57 crates loaded; north side: Si Larbi on the rock, cold, torch; drops it, cries
[53,(t)=>{setEnv('island','night');if(t<T(54)){coveSet(t);zodAt(t,CX+4,CZ+8,-2.2);put('nadia',{x:CX+4,y:.35,z:CZ+8,ry:-100,s:.8,pose:'carry',item:'crate'},t);C3(t,[CX+10,5,CZ+16],[CX+3,1.5,CZ+6],42);return;}
  const drop=t>=T(56,'طيح');put('larbi',{x:4,y:4.3,z:IZ-30,ry:10,lid:drop?.8:.5,smile:-.6,brow:-.6,cry:drop?1:0,pose:drop?'idle':'torch',item:drop?'':'bell',mouth:t>=T(57)?talkIn(t,57):0},t);C3(t,drop?[4.4,8.4,IZ-25.6]:[7,8.8,IZ-23],drop?[4,8,IZ-30]:[4,7.2,IZ-30],40);}],
// 58-62 dawn at Essaouira; everyone on the quay; Younes hugs Si Larbi; Larbi's wife with the unopened box; 'no need, I'm back'
[58,(t)=>{setEnv('port','dawn');gullsOn(t);const L=[58,59,60,61,62].filter(l=>t>=T(l)).pop()||58;if(L<=59){zodAt(t,V(t,[[T(58),40],[T(59)+1.5,12]]),24,Math.PI);if(L===59){['fisher','mother','wife1','wife2'].forEach((k,i)=>put(k,{x:-4+i*2.2,y:Y,z:19,ry:0,lid:.3},t));}C3(t,[0,7,38],[6,1.5,20],42);return;}
  put('larbi',{x:0,y:Y,z:9,ry:20,lid:.5,smile:.5,pose:L===60?'hug':'idle',mouth:L===62?talkIn(t,62):0},t);if(L===60)put('younes',{x:1.5,y:Y,z:9,ry:-60,lid:.6,smile:.6,pose:'hug'},t);if(L>=61)put('wife2',{x:2.2,y:Y,z:9.4,ry:-30,lid:.5,smile:.4,pose:'hold',item:'box'},t);put('mother',{x:-3,y:Y,z:8,ry:20,lid:.3,smile:.3},t);
  C3(t,[1,4.6,V(t,[[T(60),17],[TE(62),15.5]])],[1,3.4,9],40);}],
// 63-65 Omar, Lhoussine and the smoker taken; Nadia to Younes; Younes: 'sorry, I wanted someone to understand'
[63,(t)=>{const L=[63,64,65].filter(l=>t>=T(l)).pop()||63;setEnv('port','dawn');if(L===63){const k=t*5;['omar','hussein','smoker'].forEach((kd,i)=>put(kd,{x:V(t,[[T(63),-6+i*1.8],[T(64),6+i*1.8]]),y:Y,z:12+i*.3,ry:90,walk:k+i,lid:.6,ey:.6,smile:-.4,pose:'cross'},t));put('guard',{x:V(t,[[T(63),-9],[T(64),3]]),y:Y,z:12.6,ry:90,walk:k+3},t);C3(t,[0,5,26],[0,2.6,12],42);return;}
  if(L===64){put('nadia',{x:1.6,y:Y,z:9,ry:-25,lid:.25,smile:.3,mouth:talkIn(t,64)},t);put('younes',{x:-1.6,y:Y,z:9,ry:25,lid:.5,ey:.4},t);C3(t,[0,4.8,18],[0,3.4,9],40);return;}
  CU(t,'port','younes',{lid:.4,smile:.2,ex:.6},65,{tod:'dawn'});}],
// 66-68 in the morning Mabrouka goes out again with Younes and Si Larbi; gulls above
[66,(t)=>{setEnv('port','day');gullsOn(t,V(t,[[T(66),10],[TE(68),30]]),20,3);mab.visible=true;const x=V(t,[[T(66),9],[TE(68)+.5,30]]),z=V(t,[[T(66),24],[TE(68)+.5,10]]);mab.position.set(x,Math.sin(t*1.6)*.1,z);mab.rotation.y=.6;
  if(t>=T(67)){put('younes',{x:x-1.2,y:.55,z:z-.3,ry:20,lid:.3,smile:.5,pose:'wave'},t);put('larbi',{x:x+.4,y:.55,z:z+.2,ry:20,lid:.4,smile:.5,item:'tea',pose:'hold'},t);}C3(t,[x-8,6,z+14],[x,2,z],42);}],
// 69-70 twelve puzzles, one story
[69,(t)=>{CARD(t);const k=popS(t,T(69),.4);const g=G(FX,540,700,k);el('circle',{r:230,fill:'#ffd166',stroke:'#17120f','stroke-width':12},g);txt(g,0,70,220,'12','#17120f',{direction:'ltr'});
  if(t>=T(70)){const c=G(FX,540,1550,1);const kk=Math.min(12,Math.floor((t-T(70))*6));for(let i=0;i<12;i++){const x=-450+(i%6)*180,y=(Math.floor(i/6))*130;const pz=G(c,x+90,y,1.1);el('path',{d:'M-34 -34 L-8 -34 A12 12 0 1 1 8 -34 L34 -34 L34 -8 A12 12 0 1 0 34 8 L34 34 L-34 34Z',fill:i<kk?'#ffd166':'#3b4766'},pz);}}}],
];
