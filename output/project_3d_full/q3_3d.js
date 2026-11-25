const Y=1.7,IZ=-500;
function eqRows(t,rows,y0=560,gap=220){rows.forEach(([s,tt,hl],i)=>{if(t>=tt){const g=G(FX,540,y0+i*gap,popS(t,tt));el('rect',{class:'o',x:-400,y:-80,width:800,height:150,rx:30,fill:hl?'#ffd166':'#f4f6fb'},g);txt(g,0,26,72,s,'#17120f',{direction:'ltr'});}});}
function signalTable(p,x,y,s,t,rows){const g=paper(p,x,y,860*s,820*s,-2);[[1,'كلشي مزيان'],[2,'تسناو'],[3,'كاين الخطر، رجعو']].forEach(([n,s2],i)=>{if(t>=rows[i]){lights(g,-250*s,(-260+i*170)*s,n,n,.7*s);txt(g,330*s,(-245+i*170)*s,48*s,s2,'#2a1a12',{'text-anchor':'start'});}});
  if(t>=rows[3]){[2,3,2].forEach((n,j)=>lights(g,(-320+j*150)*s,250*s,n,n,.45*s));txt(g,330*s,265*s,48*s,'أجيو دابا','#c0392b',{'text-anchor':'start'});}return g;}
function blinkSeq(t,t0,seq,unit=.45,gap=.9){let tt=t0;for(const n of seq){for(let i=0;i<n;i++){if(t>=tt&&t<tt+unit*.6)return 1;tt+=unit;}tt+=gap;}return 0;}
function zodAt(t,x,z,ry=0){zod.visible=true;zod.position.set(x,Math.sin(t*2.2)*.12,z);zod.rotation.y=ry;zod.rotation.z=Math.sin(t*1.7)*.04;}
const SHOTS=[
// 1-4 answer 6: 19 boats; you counted 20 -> the black boat
[1,(t)=>{if(t<T(4)){CARD(t);if(t<T(1,'تسعطاش')){answerCard(t,T(1),6);return;}if(t<T(2))BIG('19',540,600,popS(t,T(1,'تسعطاش')),220);if(t>=T(2))eqRows(t,[['20 − 9 + 8 = 19',T(2,'كيعطيو')],['عدّيتي: 20',T(3,'عشرين'),true]]);return;}
  setEnv('port','night');blackBoat.visible=true;blackBoat.position.set(16,Math.sin(t*1.4)*.08,26);blackBoat.rotation.y=Math.PI/2;C3(t,[8,6,40],[16,1,26],40);BIG('+1',540,520,popS(t,T(4,'زايدة')),200,'#ff3b30');}],
// 5-9 dawn: back to the black boat; open the small hatch; a sea chart circled red west of the island
[5,(t)=>{if(t<T(8)){setEnv('port','dawn');blackBoat.visible=true;blackBoat.position.set(16,Math.sin(t*1.4)*.08,26);blackBoat.rotation.y=Math.PI/2;
   if(t>=T(7))put('you',{x:16,y:.55,z:26.4,ry:180,pose:'hold',lid:.25,ey:.7},t);C3(t,t<T(7)?[6,6,40]:[17,4.6,31.5],t<T(7)?[16,1,26]:[16,1.4,26],40);return;}
  CARD(t);chart(FX,t);if(t>=T(9,'دائرة')){const k=cl((t-T(9,'دائرة'))/.6);el('path',{d:arcPath(80,k*Math.PI*2*.99),fill:'none',stroke:'#e53935','stroke-width':12,transform:'translate(260 1160)'},FX);}}],
// 10-12 tide table: high tide 10:40; 'tonight, when the tide rises'
[10,(t)=>{CARD(t);const g=paper(FX,540,880,860,760,-2);txt(g,0,-260,58,'جدول البحر','#2a1a12');if(t>=T(11)){el('path',{d:'M-340 -20 q60 -100 120 0 t120 0',stroke:'#1d5fa8','stroke-width':10,fill:'none'},g);txt(g,150,-40,90,'10:40','#1d5fa8',{direction:'ltr'});}if(t>=T(12,'الليلة'))txt(g,0,190,70,'الليلة. ملي يطلع البحر.','#c0392b');}],
// 13-16 Ba Allal, 60 years at sea; you show the map; he sips tea, stares at the sea
[13,(t)=>{setEnv('port','day');gullsOn(t);put('allal',{x:1.6,y:Y+.55,z:9,ry:-25,sit:true,lid:.45,smile:.1,item:t>=T(16)?'cup':'',pose:t>=T(16,'جغمة')&&t<T(16,'وشاف')?'drink':'idle',ex:t>=T(16,'وشاف')?.9:0},t);put('you',{x:-1.6,y:Y,z:9,ry:30,lid:.3,ex:.8,item:t>=T(15)?'map':'',pose:t>=T(15)?'give':'idle'},t);
  C3(t,[0,4.6,V(t,[[T(13),19],[T(16),15]])],[0,3,9],40);if(t>=T(14,'ستين'))BIG('60',860,460,popS(t,T(14,'ستين')),150);}],
// 17-19 the island's hidden harbor; big boats only at high tide; nobody goes at night unless hiding something
[17,(t)=>{const L=t<T(18)?17:t<T(19)?18:19;if(L===19){CU(t,'port','allal',{lid:.4,brow:.6,smile:-.2,pose:'point'},19,{all:true,tod:'day'});return;}
  setEnv('island','day');blackBoat.visible=true;blackBoat.position.set(-27,Math.sin(t*1.4)*.08-(L===18?(Math.sin(t*1.2)<0?.6:0):0),IZ+6);blackBoat.rotation.y=0;C3(t,[-48,9,IZ+30],[-26,1,IZ+4],42);
  if(L===18){const hi=Math.sin(t*1.2)>0;LBL(hi?'البحر عالي ✓':'البحر هابط ✗',540,460,1,52,hi?'#2ecc71':'#ff3b30','#fff');}}],
// 20-21 tide twice a day; 12h25 between highs
[20,(t)=>{CARD(t);let d='';for(let i=0;i<=100;i++){const x=90+i*9;const y=900-Math.cos(i/100*Math.PI*4)*220;d+=(i?'L':'M')+x+' '+y.toFixed(1);}const k=cl((t-T(20,'كيطلع'))/1.5);el('path',{d,stroke:'#4fc3ff','stroke-width':12,fill:'none','stroke-dasharray':'2000','stroke-dashoffset':2000*(1-k)},FX);
  if(t>=T(21)){el('path',{d:'M90 640 L540 640',stroke:'#ffd166','stroke-width':8},FX);for(const x of [90,540])el('path',{d:`M${x} 600 L${x} 680`,stroke:'#ffd166','stroke-width':8},FX);LBL('12:25',315,520,popS(t,T(21,'طناش')),70,'#ffd166');}}],
// 22-24 back to the note: 10:40 -> black boat leaves tonight at high tide
[22,(t)=>{if(t<T(24)){CARD(t);const g=paper(FX,540,880,860,600,-2);txt(g,100,-60,110,'10:40','#1d5fa8',{direction:'ltr'});return;}setEnv('port','dusk');blackBoat.visible=true;blackBoat.position.set(16,Math.sin(t*1.4)*.08,26);blackBoat.rotation.y=Math.PI/2;C3(t,[10,4,36],[16,1.4,26],36);QM(820,480);}],
[25,Q(7,25)],[26,CTA2(26)],
// 27-29 answer 7: about 23:05
[27,(t)=>{CARD(t);if(t<T(27,'الحداش')){answerCard(t,T(27),7);return;}eqRows(t,[['10:40 + 12:25',T(28)],['= 23:05',T(27,'الحداش'),true]]);if(t>=T(29))clockFace(FX,540,1300,180,11,5);}],
// 30-35 evening at Younes's: everything in front of him; he looks at his mother; 'tell the truth, son'; tears
[30,(t)=>{setEnv('room','interior');const L=[30,31,32,33,34,35].filter(l=>t>=T(l)).pop()||30;
  put('younes',{x:-300,y:.95,z:297.6,ry:0,sit:true,lid:.4,ey:t<T(33,'فمّو')?.8:0,ex:t>=T(33,'فمّو')?.7:0,smile:-.4,brow:-.3,cry:L>=35?1:0},t);if(L>=33)put('mother',{x:-298.2,y:.1,z:298,ry:-30,lid:.4,brow:-.2,smile:-.2,pose:L>=34?'give':'idle',mouth:talkIn(t,34)},t);if(L<33)put('you',{x:-301.8,y:.1,z:299,ry:40,lid:.3,ex:.8,pose:L>=31?'give':'idle'},t);
  C3(t,L<33?[-300,4.6,307]:[-299.2,4,304.5],[-299.6,2.5,298],40);
  if(L>=31&&L<33){[[T(32,'المازوط'),'120 L / 70 L'],[T(32,'السوق'),'بون السوق'],[T(32,'والخريطة'),'الخريطة']].forEach(([tt,s],i)=>{if(t>=tt){const g=G(FX,240+i*300,1520,popS(t,tt));el('rect',{class:'o',x:-120,y:-80,width:240,height:160,rx:8,fill:'#f6efdc',transform:`rotate(${(i-1)*6})`},g);txt(g,0,14,38,s,'#2a1a12');}});}}],
// 36-40 Younes confesses; Larbi argued with Omar on the island; left on the rock
[36,(t)=>{const L=[36,37,38,39,40].filter(l=>t>=T(l)).pop()||36;if(L<=37){setEnv('room','interior');put('younes',{x:-300,y:.95,z:297.6,sit:true,lid:.55,ey:.6,smile:-.5,brow:-.5,cry:1,mouth:talkIn(t,L)},t);C3(t,[-299.6,3.1,302.4],[-300,2.6,297.6],40);if(L===37&&t>=T(37,'كلمة'))LBL('قصة الموجة',540,460,popS(t,T(37,'كلمة')),56,'#fff6c8');return;}
  setEnv('island','day');const px=4,py=4.3,pz=IZ-30;
  if(L===38){put('larbi',{x:px,y:py,z:pz,ry:0,lid:.4,brow:.6,smile:-.5,item:'tea',pose:'hold'},t);C3(t,[px+.4,py+3.6,pz+5.4],[px,py+3.2,pz],40);X(FX,820,500,popS(t,T(38,'باغي')),.6);return;}
  if(L===39){put('larbi',{x:px-1.4,y:py,z:pz,ry:40,lid:.2,brow:.8,smile:-.6,pose:'point',mouth:Math.abs(Math.sin(t*9))*.6},t);put('omar',{x:px+1.4,y:py,z:pz,ry:-40,lid:.3,brow:.8,smile:-.6,pose:'point',left:true,mouth:Math.abs(Math.sin(t*8+1))*.6},t);C3(t,[px,py+3.4,pz+6.5],[px,py+2.6,pz],40);return;}
  put('larbi',{x:px,y:py,z:pz,ry:160,lid:.6,brow:-.5,smile:-.5},t);mab.visible=true;mab.position.set(V(t,[[T(40,'نرجع'),px+6],[T(40,'نرجع')+3,px+40]]),0,pz-8);mab.rotation.y=.1;C3(t,[mab.position.x-9,6,pz-24],[mab.position.x,1.5,pz-8],44);}],
// 41-49 the folded note: signal table
[41,(t)=>{if(t<T(43)){CU(t,'room','younes',{lid:.4,smile:-.3,item:'map',pose:'give'},42,{dz:-1.4});return;}CARD(t);signalTable(FX,540,900,1,t,[T(45),T(46),T(47),T(48)]);if(t>=T(49))LBL('الجزيرة ← الفلوكة الكحلة',540,1480,popS(t,T(49)),46,'#fff6c8');}],
// 50-55 night on the Skala; 10:30 a small light far out: 2 ... 3 ... 2
[50,(t)=>{setEnv('port+island','night');const far=t>=T(52);put('you',{x:-16,y:5.25,z:6,ry:180,lid:.2,ey:-.1},t);
  const on=t>=T(53)?blinkSeq(t,T(53),[2],.4)||blinkSeq(t,T(54),[3],.4)||blinkSeq(t,T(55),[2],.4):(t>=T(52,'ضو')?(Math.floor(t*2)%2):0);signal.visible=true;signal.position.set(-20,8,IZ+10);signal.scale.setScalar(on?14:4);signal.material.opacity=on?1:.3;
  C3(t,far?[-16,10,0]:[-15,9.5,14],far?[-20,8,IZ+10]:[-16,6,-40],far?14:44);if(t>=T(52,'العشرة')&&t<T(53))clockFace(FX,200,400,80,10,30);
  if(t>=T(53))[[T(53),2],[T(54),3],[T(55),2]].forEach(([tt,n],i)=>{if(t>=tt)lights(FX,540,460+i*110,n,n,.6);});}],
[56,Q(8,56)],[57,CTA2(57)],
// 58-59 answer 8: come now
[58,(t)=>{CARD(t);if(t<T(58,'أجيو')){answerCard(t,T(58),8);return;}LBL('أجيو دابا',540,560,popS(t,T(58,'أجيو')),90,'#ffd166');[[2,T(59,'جوج')],[3,T(59,'ثلاثة')],[2,T(59,'جوج')+1.2]].forEach(([n,tt],i)=>{if(t>=tt)lights(FX,540,860+i*150,n,n,.8);});}],
// 60-62 run to the port; black boat gone; call the coast guard
[60,(t)=>{setEnv('port','night');const gone=t>=T(61);put('you',{x:t<T(61)?V(t,[[T(60),-8],[T(61),10]]):10,y:Y,z:20,ry:t<T(61)?90:150,walk:t<T(61)?t*11:undefined,lid:.1,browUp:.8,pose:t>=T(62)?'ear':'idle',item:t>=T(62)?'phone':''},t);if(!gone){blackBoat.visible=true;blackBoat.position.set(16,0,26);blackBoat.rotation.y=Math.PI/2;}
  C3(t,gone?[8,5,30]:[2,6,36],gone?[12,3,22]:[10,2,22],40);if(gone&&t<T(62))X(FX,700,560,popS(t,T(61,'بقاتش')),.6);}],
// 63-66 Nadia arrives with a zodiac and two men; you board; 'left 30 min before us, hurry'
[63,(t)=>{setEnv('port','night');zodAt(t,8,26,0);put('nadia',{x:2,y:Y,z:19,ry:0,lid:.2,brow:.6,mouth:t>=T(66)?talkIn(t,66):0},t);if(t>=T(64,'جوج')){put('guard',{x:7,y:.5,z:26,ry:-30,lid:.3},t);}if(t>=T(65))put('you',{x:-.5,y:Y,z:19.5,ry:30,lid:.2,ex:.7},t);
  C3(t,t<T(66)?[2,5,31]:[1.4,5.4,25.5],t<T(66)?[4,2.4,21]:[1.6,4.6,19],40);if(t<T(63,'نادية'))LBL('15 min',540,460,popS(t,T(63)),70,'#ffd166');if(t>=T(66,'بنص'))LBL('30 min',820,460,popS(t,T(66,'بنص')),60,'#ff3b30','#fff');}],
// 67-69 zodiac out, lights off; dark sea, stars; cold spray
[67,(t)=>{setEnv('island','night');const z=IZ+V(t,[[T(67),110],[T(70),60]]);zodAt(t,0,z,-Math.PI/2);put('nadia',{x:-1.6,y:.35,z:z-.3,ry:-90,s:.8,lid:.2,brow:.5},t);put('you',{x:.6,y:.35,z:z+.4,ry:-90,s:.8,lid:.15,browUp:.6},t);put('guard',{x:1.8,y:.35,z:z-.4,ry:-90,s:.8},t);
  C3(t,[9,4,z+8],[0,1.5,z-2],44,t>=T(69)?6:0);}],
// 70-76 a new light from the island: 3 short, 3 long, 3 short, repeated
[70,(t)=>{setEnv('island','night');zodAt(t,0,IZ+60,-Math.PI/2);let on=0;if(t>=T(72)){const tt=(t-T(72))%5.4;on=[[0,.25],[.5,.25],[1,.25],[1.6,.8],[2.5,.8],[3.4,.8],[4.3,.25],[4.7,.25],[5.1,.25]].some(([a,d])=>tt>=a&&tt<a+d)?1:0;}else if(t>=T(70,'ضو'))on=1;
  signal.visible=true;signal.position.set(4,15,IZ-30);signal.scale.setScalar(on?12:3);signalL.intensity=on?40:0;signalL.position.set(4,15,IZ-28);C3(t,[2,15,IZ+70],[4,15,IZ-30],t<T(72)?30:16);
  const row=(y,s,tt)=>{if(t>=tt){const g=G(FX,540,y,popS(t,tt));for(let i=0;i<3;i++)el(s==='s'?'circle':'rect',s==='s'?{cx:-120+i*120,cy:0,r:26,fill:'#ffe27a'}:{x:-170+i*120,y:-20,width:100,height:40,rx:20,fill:'#ffe27a'},g);}};row(1400,'s',T(72));row(1500,'l',T(73));row(1600,'s',T(74));if(t>=T(76))LBL('×'+Math.min(3,1+Math.floor((t-T(76))/.5)),540,1740,1,52,'#fff');}],
// 77-83 guards exchange looks; Nadia stops the engine; 'an old signal every sailor knows'; north side, alone on the rock, weak light
[77,(t)=>{const L=[77,78,79,80,81,82,83].filter(l=>t>=T(l)).pop()||77;setEnv('island','night');const z=IZ+60;zodAt(t,0,z,-Math.PI/2);
  if(L<=78){put('nadia',{x:-1.6,y:.35,z:z-.3,ry:-60,s:.8,lid:.2,brow:.5,pose:L===78?'hold':'idle'},t);put('guard',{x:1.6,y:.35,z:z-.3,ry:-120,s:.8,lid:.3,ex:-.8},t);C3(t,[0,3.6,z+6],[0,2.4,z],40);return;}
  if(L<=81){put('nadia',{x:0,y:.35,z,ry:0,s:.8,lid:.2,brow:.5,mouth:L===79?talkIn(t,79):talkAll(t,L)},t);C3(t,[.4,3.4,z+4.4],[0,3,z],40);return;}
  put('larbi',{x:4,y:4.3,z:IZ-30,ry:10,lid:.6,smile:-.5,brow:-.5,item:'bell',pose:'torch'},t);C3(t,[4.8,8.4,IZ-25],[4,8,IZ-30],40);}],
// 84-86 your heart pounds; Younes's words: they left him on the rock
[84,(t)=>{if(t<T(85)){setEnv('island','night');const z=IZ+60;zodAt(t,0,z,-Math.PI/2);put('you',{x:0,y:.35,z,s:.8,lid:0,browUp:1,brow:-.6,smile:-.4},t);C3(t,[.3,3.3,z+4.2],[0,3,z],40);const ph=((t-T(84))*3.2)%1;const b=1+.25*Math.exp(-ph*8);const h=G(FX,540,1420,b*1.2);el('path',{d:'M0 30 C-60 -20 -40 -70 0 -40 C40 -70 60 -20 0 30Z',fill:'#ff3b4e',stroke:'#17120f','stroke-width':5},h);return;}
  CU(t,'room','younes',{lid:.5,smile:-.4,ey:.5,cry:1},null,{talk:false});el('rect',{x:0,y:0,width:1080,height:1920,fill:'#c9a46a',opacity:.18,style:'mix-blend-mode:multiply'},FX);if(t>=T(86))LBL('خلاوه فوق الصخر',540,460,popS(t,T(86)),56,'#fff6c8');}],
[87,Q(9,87)],[88,CTA2(88)],
];
