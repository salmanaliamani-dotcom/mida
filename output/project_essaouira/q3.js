function eqRows(t,rows,y0=560,gap=220){rows.forEach(([s,tt,hl],i)=>{if(t>=tt){const g=G(FX,540,y0+i*gap,popS(t,tt));el('rect',{class:'o',x:-400,y:-80,width:800,height:150,rx:30,fill:hl?'#ffd166':'#f4f6fb'},g);txt(g,0,26,72,s,'#17120f',{direction:'ltr'});}});}
function zodiac(p,x,y,s,t,o={}){const g=G(p,x,y+Math.sin(t*2.2)*8,s);el('path',{class:'o',d:'M-260 0 Q-280 -60 -200 -70 L220 -70 Q280 -50 260 20 Q240 60 180 60 L-200 60 Q-270 60 -260 0Z',fill:'#e05a1a'},g);el('path',{d:'M-230 -20 L230 -20',stroke:'#b23e0c','stroke-width':10},g);el('rect',{class:'o',x:-300,y:-60,width:50,height:120,rx:10,fill:'#2b2f38'},g);if(o.flag!==false){el('path',{d:'M200 -70 L200 -200',stroke:'#17120f','stroke-width':6},g);el('path',{d:`M200 -200 L${200-(o.flagDir??1)*80} -180 L200 -160Z`,fill:'#ff3b30'},g);}return g;}
function signalTable(p,x,y,s,t,rows){const g=paper(p,x,y,860*s,820*s,-2);const R=[[1,'كلشي مزيان'],[2,'تسناو'],[3,'كاين الخطر، رجعو']];
  R.forEach(([n,s2],i)=>{if(t>=rows[i]){lights(g,-250*s,(-260+i*170)*s,n,n,.7*s);txt(g,330*s,(-245+i*170)*s,48*s,s2,'#2a1a12',{'text-anchor':'start'});}});
  if(t>=rows[3]){[2,3,2].forEach((n,j)=>lights(g,(-320+j*150)*s,250*s,n,n,.45*s));txt(g,330*s,265*s,48*s,'أجيو دابا','#c0392b',{'text-anchor':'start'});}return g;}
function blinkSeq(t,t0,seq,unit=.45,gap=.9){let tt=t0;for(const n of seq){for(let i=0;i<n;i++){if(t>=tt&&t<tt+unit*.6)return 1;tt+=unit;}tt+=gap;}return 0;}
const SHOTS=[
// 1-4 answer 6: should be 19: 20 − 9 + 8 = 19; you counted 20 -> one unregistered: the black boat
[1,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(1,'تسعطاش')){answerCard(t,T(1),6);return;}if(t<T(2))BIG('19',540,600,popS(t,T(1,'تسعطاش')),220);
  if(t>=T(2)&&t<T(4))eqRows(t,[['20 − 9 + 8 = 19',T(2,'كيعطيو')],['عدّيتي: 20',T(3,'عشرين'),true]]);
  if(t>=T(4)){boat(FG,540,1050,.9,'#1a1a1f',{t,stripe:'#2a2a30'});BIG('+1',540,560,popS(t,T(4,'زايدة')),200,'#ff3b30');}}],
// 5-9 at dawn back to the black boat; nobody; open the small hatch by the engine; a sea chart with a red circle west of Seagull Island
[5,(t)=>{if(t<T(8)){useBG('dawnport');WARM.setAttribute('opacity',.3);cam(t,560,kf(t,[[T(5),1050],[T(7),1250]]),kf(t,[[T(5),1.0],[T(7),1.4]]));boat(MID,560,1400,.9,'#1a1a1f',{t,stripe:'#2a2a30'});
   if(t>=T(7))show({you:at(560,1500,.6,{lid:.25,ey:.7,r:[60,140]})},t);else show({},t);return;}
  useBG('card');cam(t,540,960,1);show({},t);chart(FG,t);if(t>=T(9,'دائرة')){const k=cl((t-T(9,'دائرة'))/.6);el('path',{d:arcPath(80,k*Math.PI*2*.99),fill:'none',stroke:'#e53935','stroke-width':12,transform:'translate(260 1160)'},FG);}}],
// 10-12 tide table: high tide 10:40 am; handwritten 'tonight, when the tide rises'
[10,(t)=>{useBG('card');cam(t,540,960,1);show({},t);const g=paper(FG,540,880,860,760,-2);txt(g,0,-260,58,'جدول البحر','#2a1a12');
  if(t>=T(11)){const w=G(g,-220,-60);el('path',{d:'M-120 40 q60 -100 120 0 t120 0',stroke:'#1d5fa8','stroke-width':10,fill:'none'},w);txt(g,150,-40,90,'10:40','#1d5fa8',{direction:'ltr'});}
  if(t>=T(12,'الليلة'))txt(g,0,190,70,'الليلة. ملي يطلع البحر.','#c0392b',{'font-style':'italic'});}],
// 13-16 old captain Ba Allal, 60 years at sea; you show the map; he sips tea, stares at the sea
[13,(t)=>{useBG('port');GRADE.setAttribute('opacity',.1);WARM.setAttribute('opacity',.35);cam(t,600,1050,t<T(16)?1.1:1.35);
  show({allal:at(680,1950,.95,{lid:.45,smile:.1,ritem:t>=T(16)?'cup':'',r:t>=T(16,'جغمة')&&t<T(16,'وشاف')?[60,-30]:[100,150],ex:t>=T(16,'وشاف')?.9:0}),you:at(220,1980,.9,{lid:.3,ex:.8,ritem:t>=T(15)?'map':'',r:[140,60]})},t);
  if(t>=T(14,'ستين'))BIG('60',860,460,popS(t,T(14,'ستين')),150);}],
// 17-19 Allal: the island has a small hidden harbour behind rocks; big boats only at high tide; nobody goes at night unless hiding something
[17,(t)=>{const L=t<T(18)?17:t<T(19)?18:19;if(L===19){closeUp(t,'port','allal',{lid:.4,brow:.6,smile:-.2},19,{all:true,warm:.35,grade:.1});return;}
  useBG('cove');GRADE.setAttribute('opacity',.05);cam(t,540,1050,1.0);show({},t);const tide=L===18?(Math.sin(t*1.2)+1)/2:.5;el('rect',{x:-500,y:1000+120-tide*240,width:2080,height:1500,fill:'#2f6f8f',opacity:.5},MID);
  boat(MID,540,1180-tide*120,.55,'#1a1a1f',{t,stripe:'#2a2a30'});if(L===18)LBL(tide>.5?'البحر عالي ✓':'البحر هابط ✗',540,460,1,52,tide>.5?'#2ecc71':'#ff3b30','#fff');}],
// 20-21 tide rises and falls twice a day; ~12 h 25 min between highs
[20,(t)=>{useBG('card');cam(t,540,960,1);show({},t);let d='';for(let i=0;i<=100;i++){const x=90+i*9;const y=900-Math.cos(i/100*Math.PI*4)*220;d+=(i?'L':'M')+x+' '+y.toFixed(1);}
  const k=cl((t-T(20,'كيطلع'))/1.5);el('path',{d,stroke:'#4fc3ff','stroke-width':12,fill:'none','stroke-dasharray':'2000','stroke-dashoffset':2000*(1-k)},FG);
  if(t>=T(21)){el('path',{d:'M90 640 L540 640',stroke:'#ffd166','stroke-width':8},FG);for(const x of [90,540])el('path',{d:`M${x} 600 L${x} 680`,stroke:'#ffd166','stroke-width':8},FG);LBL('12:25',315,520,popS(t,T(21,'طناش')),70,'#ffd166');}}],
// 22-24 back to the note: high tide 10:40 am -> the black boat leaves tonight at high tide
[22,(t)=>{useBG('card');cam(t,540,960,1);show({},t);const g=paper(FG,540,880,860,600,-2);txt(g,100,-60,110,'10:40','#1d5fa8',{direction:'ltr'});if(t>=T(24)){boat(FX,540,1450,.6,'#1a1a1f',{t,stripe:'#2a2a30'});QM(820,1400);}}],
[25,Q(7,25)],[26,CTA2(26)],
// 27-29 answer 7: about 23:05: 10:40 + 12:25; tonight before midnight the black boat goes
[27,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(27,'الحداش')){answerCard(t,T(27),7);return;}
  eqRows(t,[['10:40 + 12:25',T(28)],['= 23:05',T(27,'الحداش'),true]]);if(t>=T(29)){clockFace(FG,540,1300,180,11,5);boat(FX,540,1650,.5,'#1a1a1f',{t,stripe:'#2a2a30'});}}],
// 30-35 evening, Younes's house; everything in front of him: fuel note, market receipt, the map; he looks at the papers, then his mother; she puts a hand on his shoulder: tell the truth, son; tears
[30,(t)=>{useBG('room');GRADE.setAttribute('opacity',.1);WARM.setAttribute('opacity',.25);const cu=t>=T(33);cam(t,540,cu?1000:1150,cu?1.15:1.0);
  show({younes:at(540,1950,.9,{lid:.4,ey:t<T(33,'فمّو')?.8:0,ex:t>=T(33,'فمّو')?.7:0,smile:-.4,brow:-.3}),mother:t>=T(33,'فمّو')?at(820,1950,.9,{lid:.4,brow:-.2,smile:-.2,l:[-200,40],mouth:talkIn(t,34)}):null,you:t<T(33)?at(180,1980,.9,{lid:.3,ex:.8}):null},t);
  if(t>=T(31)&&t<T(33)){const items=[[T(32,'المازوط'),'120 L / 70 L'],[T(32,'السوق'),'بون السوق'],[T(32,'والخريطة'),'الخريطة']];items.forEach(([tt,s],i)=>{if(t>=tt){const g=G(FG,240+i*300,1500,popS(t,tt));el('rect',{class:'o',x:-120,y:-80,width:240,height:160,rx:8,fill:'#f6efdc',transform:`rotate(${(i-1)*6})`},g);txt(g,0,14,38,s,'#2a1a12');}});}
  if(t>=T(35)){for(let i=0;i<2;i++){const ph=((t*1.1+i/2)%1);el('path',{d:`M${540+(i?40:-40)} ${1950-560*.9-150*.9+30+ph*120} q-8 14 0 20 q8 -6 0 -20Z`,fill:'#8fd3ff',opacity:1-ph},FG);}}}],
// 36-40 Younes: they said if I talk I'll never work at sea again; memorize the wave story; Si Larbi didn't want; at the island he argued with Omar; they left him on the rock; told me to go back alone
[36,(t)=>{const L=[36,37,38,39,40].filter(l=>t>=T(l)).pop();if(L<=37){closeUp(t,'room','younes',{lid:.55,ey:.6,smile:-.5,brow:-.5},L,{all:false,warm:.2,grade:.1});if(L===37&&t>=T(37,'كلمة'))LBL('قصة الموجة',540,460,popS(t,T(37,'كلمة')),56,'#fff6c8');return;}
  useBG('rocks');GRADE.setAttribute('opacity',.15);cam(t,540,1200,1.0);
  if(L===38){show({larbi:at(540,1900,.95,{lid:.4,brow:.6,smile:-.5,ritem:'tea',r:[100,140]})},t);X(FX,820,500,popS(t,T(38,'باغي')),.6);return;}
  if(L===39){show({larbi:at(380,1500,.6,{lid:.2,brow:.8,smile:-.6,l:[-200,0],lpoint:true,mouth:Math.abs(Math.sin(t*9))*.6}),omar:at(720,1500,.62,{lid:.3,brow:.8,smile:-.6,r:[200,0],rpoint:true,mouth:Math.abs(Math.sin(t*8+1))*.6})},t);return;}
  const k=cl((t-T(40,'نرجع'))/2);show({larbi:at(540,1300,.5,{lid:.6,brow:-.5,smile:-.5,l:[-170,-40]})},t);boat(MID,lerp(700,1200,k),1500,.6,undefined,{t});}],
// 41-49 he hands you a folded note fallen from Omar's pocket; a small table: 1 light all good; 2 wait; 3 danger go back; 2-3-2 come now; signals from the island to the black boat
[41,(t)=>{if(t<T(43)){closeUp(t,'room','younes',{lid:.4,smile:-.3,ritem:'note',r:[120,60],rbend:-1},42,{all:false,warm:.2,grade:.1});return;}
  useBG('card');cam(t,540,960,1);show({},t);signalTable(FG,540,900,1,t,[T(45),T(46),T(47),T(48)]);if(t>=T(49))LBL('الجزيرة ← الفلوكة الكحلة',540,1480,popS(t,T(49)),46,'#fff6c8');}],
// 50-55 night on the Skala rampart; cold wind, black sea; 10:30 a small light far out: 2 ... 3 ... 2
[50,(t)=>{useBG('rampart');GRADE.setAttribute('opacity',.1);cam(t,t<T(52)?540:820,t<T(52)?1250:900,t<T(52)?1.0:1.8);show(t<T(52)?{you:at(560,1700,.8,{lid:.2,ex:.8,ey:-.2})}:{},t);
  if(t>=T(52,'العشرة')&&t<T(53))clockFace(FX,200,400,80,10,30);
  const on=t>=T(53)?blinkSeq(t,T(53),[2],.4)||blinkSeq(t,T(54),[3],.4)||blinkSeq(t,T(55),[2],.4):(t>=T(52,'ضو')?(Math.floor(t*2)%2):0);
  el('circle',{cx:860,cy:880,r:on?12:5,fill:'#ffe27a',opacity:on?1:.4},MID);if(on)el('circle',{cx:860,cy:880,r:60,fill:'url(#glowG)'},MID);
  if(t>=T(53))[[T(53),2],[T(54),3],[T(55),2]].forEach(([tt,n],i)=>{if(t>=tt)lights(FX,540,460+i*110,n,n,.6);});}],
[56,Q(8,56)],[57,CTA2(57)],
// 58-59 answer 8: 'come now': 2,3,2 = Omar's signal to the black boat
[58,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(58,'أجيو')){answerCard(t,T(58),8);return;}LBL('أجيو دابا',540,560,popS(t,T(58,'أجيو')),90,'#ffd166');[[2,T(59,'جوج')],[3,T(59,'ثلاثة')],[2,T(59,'جوج')+1.2]].forEach(([n,tt],i)=>{if(t>=tt)lights(FX,540,860+i*150,n,n,.8);});if(t>=T(59,'الإشارة'))boat(FX,540,1500,.5,'#1a1a1f',{t,stripe:'#2a2a30'});}],
// 60-62 you run down to the port; the black boat is gone; you call the coast guard
[60,(t)=>{useBG('dock');GRADE.setAttribute('opacity',.35);cam(t,560,1250,1.05);const gone=t>=T(61);show({you:at(t<T(61)?lerp(1150,600,cl((t-T(60))/1.2)):600,1980,.9,{walk:t<T(61)?t*9:undefined,lid:.1,browUp:.8,r:t>=T(62)?[60,-40]:[110,250],ritem:t>=T(62)?'phone':'',rbend:-1})},t);
  if(!gone)boat(MID,860,1350,.7,'#1a1a1f',{t,stripe:'#2a2a30'});else{el('path',{d:'M700 1330 L1020 1330',stroke:'#ff3b30','stroke-width':8,'stroke-dasharray':'20 12'},MID);X(FX,860,560,popS(t,T(61,'بقاتش')),.6);}}],
// 63-66 in 15 min officer Nadia arrives: blue uniform, white cap; a fast zodiac, two men; you board; 'left 30 min before us, hurry'
[63,(t)=>{useBG('dock');GRADE.setAttribute('opacity',.3);cam(t,540,1200,t<T(66)?1.0:1.3);zodiac(MID,560,1450,.9,t);
  show({nadia:at(540,1980,.9,{lid:.2,brow:.6,mouth:t>=T(66)?talkIn(t,66):0}),guard:t>=T(64,'جوج')?at(860,1980,.85,{lid:.3}):null,you:t>=T(65)?at(220,1980,.85,{lid:.2,ex:.7}):null},t);
  if(t<T(63,'نادية'))LBL('15 min',540,460,popS(t,T(63)),70,'#ffd166');if(t>=T(66,'بنص'))LBL('30 min',820,460,popS(t,T(66,'بنص')),60,'#ff3b30','#fff');}],
// 67-69 zodiac out, lights off; black sea, starry sky; waves splash cold water
[67,(t)=>{useBG('nightsea');GRADE.setAttribute('opacity',.1);cam(t,540,1100,1.0,t>=T(69)?5:0);zodiac(MID,540,1350,1.2,t);show({nadia:at(400,1450,.55,{lid:.2,brow:.5}),you:at(680,1450,.52,{lid:.15,browUp:.6})},t);
  if(t>=T(69)){for(let i=0;i<10;i++){const ph=((t*1.5+i/10)%1);el('circle',{cx:300+((i*97)%500),cy:1250-ph*200,r:8,fill:'#cfe6ff',opacity:1-ph},FG);}}waves(FG,1500,'#3a5a7a',.4,t);}],
// 70-76 after 20 min, a new light from the island; not like before: 3 short, 3 long, 3 short; repeated 1,2,3 times
[70,(t)=>{useBG('nightsea');GRADE.setAttribute('opacity',.1);cam(t,540,860,t<T(72)?1.2:1.6);show({},t);
  let on=0;if(t>=T(72)){const tt=(t-T(72))%5.4;const pat=[[0,.25],[.5,.25],[1,.25],[1.6,.8],[2.5,.8],[3.4,.8],[4.3,.25],[4.7,.25],[5.1,.25]];on=pat.some(([a,d])=>tt>=a&&tt<a+d)?1:0;}else if(t>=T(70,'ضو'))on=1;
  el('circle',{cx:430,cy:820,r:on?10:4,fill:'#fff6c8',opacity:on?1:.3},MID);if(on)el('circle',{cx:430,cy:820,r:50,fill:'url(#glowG)'},MID);
  const row=(y,s,tt)=>{if(t>=tt){const g=G(FX,540,y,popS(t,tt));for(let i=0;i<3;i++)el(s==='s'?'circle':'rect',s==='s'?{cx:-120+i*120,cy:0,r:26,fill:'#ffe27a'}:{x:-170+i*120,y:-20,width:100,height:40,rx:20,fill:'#ffe27a'},g);}};
  row(1300,'s',T(72));row(1420,'l',T(73));row(1540,'s',T(74));if(t>=T(76))LBL('×'+Math.min(3,1+Math.floor((t-T(76))/.5)),540,1700,1,56,'#fff');}],
// 77-83 the guards exchange looks; Nadia stops the engine: 'not their signal; an old signal every sailor knows'; from the north side, far from the hidden harbour; someone alone on the rock; weak light like a dying battery
[77,(t)=>{const L=[77,78,79,80,81,82,83].filter(l=>t>=T(l)).pop();if(L<=78){useBG('nightsea');cam(t,540,1200,1.1);zodiac(MID,540,1450,1.1,t);show({nadia:at(380,1520,.6,{lid:.2,brow:.5,r:L===78?[60,120]:[110,250]}),guard:at(700,1520,.6,{lid:.2,ex:-.8})},t);return;}
  if(L<=81){closeUp(t,'nightsea','nadia',{lid:.2,brow:.5},L,{all:L>=80,grade:.1,warm:0});return;}
  if(L>=82){useBG('rocks');cam(t,540,1300,1.2);GRADE.setAttribute('opacity',.1);show({larbi:at(540,1500,.6,{lid:.6,smile:-.5,brow:-.5,r:[100,-40],rbend:-1,ritem:'torch'})},t);const lit=.4+.6*Math.abs(Math.sin(t*3));el('circle',{cx:540+100*.6,cy:1500-560*.6+(-40-90)*.6,r:90*lit,fill:'url(#glowG)'},FG);return;}
  useBG('card');cam(t,540,960,1);show({},t);const c=chart(FG,t);
  const nx=370,ny=1080;const lit=.4+.6*Math.abs(Math.sin(t*3));el('circle',{cx:nx,cy:ny,r:20*lit,fill:'#ffe27a'},FG);el('circle',{cx:nx,cy:ny,r:80*lit,fill:'url(#glowG)'},FG);LBL('N',nx,ny-100,1,40,'#fff');
  el('circle',{cx:290,cy:1170,r:30,fill:'none',stroke:'#e53935','stroke-width':8},FG);
  if(L>=82){show({larbi:at(540,1850,.75,{dark:.85,lid:.6,smile:-.5,r:[90,60],ritem:'torch'})},t);}}],
// 84-86 your heart pounds; you remember Younes: 'they left him on the rock'
[84,(t)=>{if(t<T(85)){useBG('nightsea');cam(t,540,950,1.4);GRADE.setAttribute('opacity',.1);show({you:CU({lid:0,browUp:1,brow:-.6,smile:-.4})},t);const ph=((t-T(84))*3.2)%1;const b=1+.25*Math.exp(-ph*8);const h=G(FX,540,1300,b*1.2);el('path',{d:'M0 30 C-60 -20 -40 -70 0 -40 C40 -70 60 -20 0 30Z',fill:'#ff3b4e',stroke:'#17120f','stroke-width':5},h);return;}
  useBG('room');cam(t,540,950,1.3);WARM.setAttribute('opacity',.2);show({younes:CU({lid:.5,smile:-.4,ey:.5})},t);el('rect',{x:0,y:0,width:1080,height:1920,fill:'#c9a46a',opacity:.18,style:'mix-blend-mode:multiply'},FX);if(t>=T(86))LBL('خلاوه فوق الصخر',540,460,popS(t,T(86)),56,'#fff6c8');}],
[87,Q(9,87)],[88,CTA2(88)],
];
