const Y=1.7; // quay height
function crew3(t,o={}){[['omar',-3.3],['hussein',-1.1],['larbi',1.1],['younes',3.3]].forEach(([k,x])=>put(k,Object.assign({x,y:Y,z:9,ry:0,pose:k==='larbi'?'hold':'idle',item:k==='larbi'?'tea':''},o[k]||{}),t));}
const SHOTS=[
// 1-2 six pm, Essaouira port: rampart walkway, then harbor
[1,(t)=>{setEnv('port','dusk');gullsOn(t);if(t<T(2)){C3(t,[V(t,[[0,-16.4],[2.4,-16]]),V(t,[[0,7.4],[2.4,8]]),V(t,[[0,28],[2.4,20]])],[-10,6.4,-30],42);if(t>=T(1,'الستة')-.05)clockFace(FX,840,330,120,6,0);return;}
  C3(t,[V(t,[[T(2),-8],[T(3),-2]]),V(t,[[T(2),14],[T(3),11]]),V(t,[[T(2),34],[T(3),30]])],[8,1,-14],44);}],
// 3 gulls over boats; sea smell
[3,(t)=>{setEnv('port','dusk');gullsOn(t,12,-10,5);C3(t,[V(t,[[T(3),26],[T(4),16]]),V(t,[[T(3),1.7],[T(4),2.5]]),V(t,[[T(3),2],[T(4),-3]])],[8,3.2,-16],44);}],
// 4 you work at the port logging boats
[4,(t)=>{setEnv('port','dusk');gullsOn(t);const wk=cl((t-T(4))/1.8);const walking=wk<1;put('you',{x:V(t,[[T(4),7],[T(4)+1.8,0]]),y:Y,z:9,ry:walking?-80:0,walk:walking?t*9:undefined,pose:walking?'idle':'write',item:walking?'':'notebook',lid:.35,ey:walking?0:.6},t);
  if(walking)C3(t,[4,5.5,21],[2,3.6,9],40);else C3(t,[.6,5.1,V(t,[[T(4)+1.8,17],[TE(4),15.5]])],[0,4.3,9],40);
  if(t>=T(4,'خارجة')&&t<T(4,'وكل'))LBL('←',860,560,popS(t,T(4,'خارجة')),90,'#2ecc71','#fff');if(t>=T(4,'داخلة'))LBL('→',860,560,popS(t,T(4,'داخلة')),90,'#ffd166','#17120f');}],
// 5-6 4 am: blue Mabrouka leaves with four fishermen
[5,(t)=>{setEnv('port','night');mab.visible=true;mabL.intensity=10;const k=eout(cl((t-T(5,'خرجات'))/3));mab.position.set(V(t,[[T(5,'خرجات'),10],[T(5,'خرجات')+3,30]]),Math.sin(t*1.6)*.1,V(t,[[T(5,'خرجات'),24],[T(5,'خرجات')+3,16]]));mab.rotation.y=.15;
  const m=mab.position;C3(t,[m.x-4,8,m.z+16],[m.x,1,m.z],44);if(t<T(5,'خرجات'))clockFace(FX,840,330,110,4,0);if(t>=T(5,'مبروكة'))LBL('مبروكة',540,620,popS(t,T(5,'مبروكة')),60,'#1f6fc2','#fff');
  if(t>=T(6,'ربعة')){for(let i=0;i<4;i++){const g=G(FX,270+i*180,460,popS(t,T(6,'ربعة')+i*.1));el('circle',{r:40,fill:'#ffd166',stroke:'#17120f','stroke-width':5},g);el('path',{d:'M-50 110 Q0 30 50 110Z',fill:'#ffd166',stroke:'#17120f','stroke-width':5},g);}}}],
// 7-10 crew introductions (close-ups on the quay)
[7,(t)=>{const who=t<T(8)?'omar':t<T(9)?'hussein':t<T(10)?'larbi':'younes';const ln={omar:7,hussein:8,larbi:9,younes:10}[who];
  CU(t,'port',who,{lid:who==='larbi'?.45:.3,smile:.2,pose:who==='larbi'?'hold':who==='hussein'?'cross':'idle',item:who==='larbi'?'tea':''},ln,{talk:false,d0:6,d1:5.2});
  if(who==='younes'&&t>=T(10,'تسعطاش'))BIG('19',820,480,popS(t,T(10,'تسعطاش')),140);
  if(who==='hussein'&&t>=T(8,'وشم')){const g=G(FX,840,520,popS(t,T(8,'وشم'))*1.2);el('circle',{r:70,fill:'url(#skinC)',stroke:'#17120f','stroke-width':5},g);el('path',{d:'M0 -40 L0 40 M-30 20 Q0 50 30 20 M-16 -30 L16 -30',stroke:'#1d3a6a','stroke-width':8,fill:'none','stroke-linecap':'round'},g);}}],
// 11-13 Mabrouka returning with only Younes
[11,(t)=>{setEnv('port','dusk');gullsOn(t);mab.visible=true;const k=cl((t-T(11))/3.5);mab.position.set(V(t,[[T(11),30],[T(11)+3.5,10]]),Math.sin(t*1.6)*.1,V(t,[[T(11),4],[T(11)+3.5,24]]));mab.rotation.y=-.2;
  put('younes',{x:mab.position.x-.8,y:mab.position.y+.55,z:mab.position.z,ry:30,lid:.1,ey:.2},t);const m=mab.position;
  const close=t>=T(12);C3(t,close?[m.x+.5,4.2,m.z+7]:[m.x-6,8,m.z+20],close?[m.x-.8,2.8,m.z]:[m.x,1,m.z],close?36:44);if(t>=T(12,'واحد'))BIG('1',540,500,popS(t,T(12,'واحد')),200);}],
// 14-16 docks; Younes steps off pale; people rush in
[14,(t)=>{setEnv('port','dusk');gullsOn(t);mab.visible=true;mab.position.set(9,Math.sin(t*1.6)*.1,24);mab.rotation.y=0;const off=t>=T(15);
  put('younes',off?{x:4,y:Y,z:19,ry:10,lid:.05,browUp:.9,brow:-.6,smile:-.6,cry:0}:{x:8.2,y:.55,z:24,ry:-20,lid:.05},t);
  if(t>=T(16)){const k=cl((t-T(16))/1);put('fisher',{x:V(t,[[T(16),-6],[T(16)+1,1.5]]),y:Y,z:17,ry:80,walk:k<1?t*9:undefined},t);put('mother',{x:V(t,[[T(16),12],[T(16)+1,6]]),y:Y,z:17,ry:-80,walk:k<1?t*9:undefined,lid:.1,browUp:.8},t);}
  C3(t,off?[4.5,5.3,26]:[2,6,34],off?[4,4.4,19]:[7,2,22],40);}],
// 17-19 Younes: the wave at noon, three fell, searched for hours
[17,(t)=>{const L=t<T(18)?17:t<T(19)?18:19;if(L===17){CU(t,'port','younes',{lid:.05,browUp:.9,brow:-.6,hz:Math.sin(t*40)*2},17,{d0:5.4,d1:4.6});if(t>=T(17,'الطناش'))clockFace(FX,850,460,90,12,0);return;}
  setEnv('island','day');mab.visible=true;mab.position.set(-10,Math.sin(t*2.5)*.4,-480);mab.rotation.z=L===18?Math.sin(t*3)*.25:Math.sin(t)*.05;
  C3(t,[-2,6,-462],[-10,1,-480],48,L===18?6:0);if(L===18&&t>=T(18,'والتلاتة')){for(let i=0;i<3;i++){const g=G(FX,250+i*290,1600,popS(t,T(18,'والتلاتة')+i*.12));el('circle',{r:40,fill:'#3b4766',stroke:'#fff','stroke-width':5},g);txt(g,0,20,50,'?','#fff',{direction:'ltr'});}}
  if(L===19&&t>=T(19,'ساعات'))clockFace(FX,540,480,100,(t*2)%12,(t*120)%60);}],
// 20-21 mother hugs him; wives cry
[20,(t)=>{setEnv('port','dusk');put('younes',{x:-.8,y:Y,z:9,ry:30,lid:.6,smile:-.3,pose:'hug'},t);put('mother',{x:.8,y:Y,z:9,ry:-30,lid:.7,smile:-.3,pose:'hug',cry:1},t);
  if(t>=T(21)){put('wife1',{x:-4.2,y:Y,z:8,ry:20,lid:.8,brow:-.6,smile:-.6,pose:'wipe',cry:1},t);put('wife2',{x:4.2,y:Y,z:8,ry:-20,lid:.8,brow:-.6,smile:-.6,pose:'wipe',cry:1},t);}
  C3(t,[0,5,V(t,[[T(20),15],[T(21),19]])],[0,3.6,9],42);}],
// 22-26 on the deck: too clean; dry net; dry clothes; full crates
[22,(t)=>{setEnv('deck','dusk');const L=[22,23,24,25,26].filter(l=>t>=T(l)).pop()||22;
  if(L===22){put('you',{x:300+V(t,[[T(22),6],[T(22)+1.5,2]]),y:1.2,z:2.5,ry:-80,walk:t<T(22)+1.5?t*8:undefined,item:'notebook',pose:t<T(22)+1.5?'idle':'hold'},t);C3(t,[304,6,13],[300,2.5,1],42);return;}
  const cams={23:[[306,9,12],[300,1,0]],24:[[294,4,3],[297,1.5,-1.6]],25:[[300,5,8],[300,2,1]],26:[[300,4.5,5],[300,1.5,1.2]]};const c=cams[L];C3(t,c[0],c[1],40);
  if(L===25){put('younes',{x:302,y:1.2,z:-.5,ry:0,lid:.2,smile:-.2},t);if(t>=T(25,'ناشفين')){const g=G(FX,820,520,popS(t,T(25,'ناشفين')));sunIcon(g,0,0,.8);}}
  if(L===24&&t>=T(24,'وناشفة')){const g=G(FX,820,520,popS(t,T(24,'وناشفة')));sunIcon(g,0,0,.8);}
  if(L===23&&t>=T(23,'نقية'))for(let i=0;i<5;i++){el('path',{d:'M0 -20 L5 -5 L20 0 L5 5 L0 20 L-5 5 L-20 0 L-5 -5Z',fill:'#fff',transform:`translate(${240+i*150} ${900+Math.sin(t*2+i)*80})`},FX);}}],
// 27-30 weather board: wind 10 km/h, waves 0.5 m, calm
[27,(t)=>{CARD(t);const b=G(FX,540,900);el('rect',{class:'o',x:-400,y:-460,width:800,height:880,rx:20,fill:'#1d5fa8'},b);el('rect',{x:-370,y:-430,width:740,height:820,rx:12,fill:'#f4f6fb'},b);
  if(t>=T(28)){const r=G(b,0,-250,popS(t,T(28,'الريح')));el('path',{d:'M-260 -10 q60 -30 120 0 t120 0 M-260 40 q60 -30 120 0 t120 0',stroke:'#1d5fa8','stroke-width':10,fill:'none'},r);txt(r,170,30,70,'10 km/h','#17120f',{direction:'ltr'});}
  if(t>=T(29)){const r=G(b,0,0,popS(t,T(29,'نص')));el('path',{d:'M-260 20 q40 -20 80 0 t80 0 t80 0',stroke:'#1d5fa8','stroke-width':10,fill:'none'},r);txt(r,170,30,70,'0.5 m','#17120f',{direction:'ltr'});}
  if(t>=T(30)){const r=G(b,0,250,popS(t,T(30,'هادي')));el('path',{d:'M-280 0 L280 0',stroke:'#1d5fa8','stroke-width':10},r);OK(r,0,90,1,.7);}}],
// 31-32 notebook: something is off
[31,(t)=>{if(t<T(32)){CU(t,'port','you',{pose:'write',item:'notebook',lid:.45,ey:.6,brow:.5},null,{talk:false,d0:5,d1:4.6});return;}CARD(t);notebook(FX,540,900,1.1,['شي حاجة ما مشاتش.'],t,[T(32)]);}],
[33,Q(1,33)],[34,CTA2(34)],
// 35-38 answer 1
[35,(t)=>{CARD(t);if(t<T(36)){answerCard(t,T(35),1);return;}
  if(t<T(37)){const g=G(FX,540,820,1.2);el('path',{d:'M-300 0 q50 -25 100 0 t100 0 t100 0 t100 0 t100 0 t100 0',stroke:'#4f9fd0','stroke-width':14,fill:'none'},g);BIG('0.5 m',540,560,popS(t,T(36,'نص')),110);X(FX,540,1200,popS(t,T(36,'تقلب')),1);return;}
  if(t<T(38)){setEnv('deck','dusk');C3(t,[294,4,3],[297,1.5,-1.6],38);sunIcon(FX,800,480,popS(t,T(37,'ناشفة'))*.8);X(FX,540,1300,popS(t,T(37,'تلاحتش')),.8);return;}
  setEnv('deck','dusk');put('younes',{x:299,y:1.2,z:1,ry:15,lid:.3},t);put('fisher',{x:301.6,y:1.2,z:1,ry:-15,lid:.6,cry:1},t);C3(t,[300.3,4.5,9.5],[300.3,3.3,1],40);if(t>=T(38,'فازك'))LBL('≠',540,480,popS(t,T(38,'فازك')),90,'#ffd166');}],
// 39-41 night: Younes goes home with his mother; you stay by Mabrouka
[39,(t)=>{setEnv('port','night');mab.visible=true;mab.position.set(9,Math.sin(t*1.6)*.1,24);mabL.intensity=0;
  if(t<T(40)){const k=cl((t-T(39))/3);put('younes',{x:V(t,[[T(39),2],[T(39)+3,14]]),y:Y,z:19,ry:90,walk:t*7,lid:.5},t);put('mother',{x:V(t,[[T(39),.5],[T(39)+3,12.5]]),y:Y,z:19.6,ry:90,walk:t*7+1,lid:.5},t);C3(t,[2,6,32],[7,3,19],42);return;}
  put('you',{x:5,y:Y,z:20.5,ry:60,lid:.35,ex:.6},t);C3(t,[0,5.5,30],[7,2.5,22],42);}],
// 42-46 engine hatch; Omar's morning note
[42,(t)=>{if(t<T(43)){setEnv('deck','night');const lid=ENVS.deck.userData.lid;lid.rotation.z=-eout((t-T(42,'وحليتي'))/.6)*1.2;lid.position.x=-5.6-eout((t-T(42,'وحليتي'))/.6)*.6;put('you',{x:296,y:1.2,z:1.8,ry:-60,pose:'hold',item:'torch',lid:.3,ey:.6},t);C3(t,[298,5,8],[294.4,1.6,0],40);return;}
  CARD(t);notebook(FX,540,820,1.15,['خزّان المازوط: 120 L. عامر.','خرجنا مع 4 ديال الصباح.','المحرك: 10 L فالساعة.'],t,[T(44),T(45),T(46)]);if(t>=T(44,'عامر'))fuelGauge(FX,540,1500,.9,120);}],
// 47-48 gauge shows 70 L
[47,(t)=>{CARD(t);const lv=t<T(48,'سبعين')?120:lerp(120,70,eout((t-T(48,'سبعين'))/.6));fuelGauge(FX,540,1050,1.6,lv);el('circle',{cx:540,cy:900,r:420,fill:'url(#glowB)',opacity:.35},FX);}],
// 49-53 calculation
[49,(t)=>{CARD(t);if(t>=T(50)){const a=G(FX,330,560,popS(t,T(50,'الربعة')));clockFace(a,0,0,110,4,0);const b=G(FX,750,560,popS(t,T(50,'الستة')));clockFace(b,0,0,110,6,0);el('path',{d:'M470 560 L610 560 M570 520 L610 560 L570 600',stroke:'#ffd166','stroke-width':12,fill:'none'},FX);}
  if(t>=T(51,'ربعطاش'))BIG('14 h',540,940,popS(t,T(51,'ربعطاش')),150);if(t>=T(52)&&t<T(53)){txt(FX,540,1350,80,'14 × 10 = 140 L','#fff',{direction:'ltr'});X(FX,880,1330,popS(t,T(52,'خاوي')),.5);}if(t>=T(53))fuelGauge(FX,540,1550,.8,70);}],
// 54-59 cold wind on the boat; where did it go? engine off mostly; it went and stopped; not fishing
[54,(t)=>{if(t<T(57)){setEnv('deck','night');put('you',{x:300,y:1.2,z:2,ry:0,lid:.3,brow:.5,ex:Math.sin(t)*.6,pose:'chin'},t);C3(t,[300.5,4.6,8.5],[300,4,2],40);if(t>=T(55))QM(820,560);return;}
  CARD(t);chart(FX,t);const k=cl((t-T(58))/1.5);el('path',{d:`M770 740 Q${lerp(770,380,k)} ${lerp(740,1100,k)} ${lerp(770,370,k)} ${lerp(740,1160,k)}`,stroke:'#e53935','stroke-width':8,'stroke-dasharray':'20 12',fill:'none'},FX);if(t>=T(58,'ووقفات'))el('circle',{cx:370,cy:1160,r:40+6*Math.sin(t*6),fill:'none',stroke:'#e53935','stroke-width':10},FX);}],
// 60-62 a cigarette glow at the quay end; someone watching; then gone
[60,(t)=>{setEnv('port','night');const gone=t>=T(62,'طفا');if(!gone)put('smoker',{x:12,y:Y,z:20,ry:-110,item:'cig',pose:'chin',lid:.4},t);C3(t,[V(t,[[T(60),-2],[T(60)+1.2,6]]),4.5,V(t,[[T(60),30],[T(60)+1.2,25]])],[12,3.6,20],V(t,[[T(60),44],[T(60)+1.2,24]]));}],
[63,Q(2,63)],[64,CTA2(64)],
// 65-69 answer 2: 5 hours
[65,(t)=>{CARD(t);if(t<T(66)){answerCard(t,T(65),2);if(t>=T(65,'خمسة'))BIG('5 h',540,1150,popS(t,T(65,'خمسة')),160);return;}
  [[T(66,'خمسين'),'120 − 70 = 50 L'],[T(67,'خمسة'),'50 ÷ 10 = 5 h'],[T(68,'جوج'),'2.5 h + 2.5 h'],[T(69,'وتسعة'),'14 − 5 = 9 h']].forEach(([tt,s],i)=>{if(t>=tt){const g=G(FX,540,560+i*230,popS(t,tt));el('rect',{class:'o',x:-380,y:-80,width:760,height:150,rx:30,fill:i===3?'#ffd166':'#f4f6fb'},g);txt(g,0,26,76,s,'#17120f',{direction:'ltr'});}});}],
// 70-74 Younes's house: blue door; mother opens, red eyes; Younes by window; you ask gently
[70,(t)=>{if(t<T(73)){setEnv('alley','day');const open=t>=T(72);const d=ENVS.alley.userData.door;d.children[0].position.x=open?-1.6:0;
   if(open)put('mother',{x:0,y:.1,z:296,ry:0,lid:.55,brow:-.4,smile:-.4,cry:0},t);put('you',{x:V(t,[[T(70),6],[T(70)+1.8,2.6]]),y:.1,z:299,ry:t<T(70)+1.8?-80:-30,walk:t<T(70)+1.8?t*8:undefined,lid:.3},t);C3(t,[1.5,4.3,V(t,[[T(70),312],[T(72),307]])],[0,3,296],42);return;}
  setEnv('room','interior');put('younes',{x:-298.6,y:.95,z:296.4,ry:-160,sit:true,lid:.45,hy:20},t);put('you',{x:-301,y:.1,z:298,ry:50,lid:.3,mouth:t>=T(74)?talkIn(t,74):0},t);C3(t,[-297,4.6,306],[-299.5,2.5,297],42);}],
// 75-80 Younes's story; sunrise over the island
[75,(t)=>{const L=t<T(76)?75:t<T(77)?76:t<T(79)?77:t<T(80)?79:80;
  if(L===75||L===79||L===80){setEnv('room','interior');put('younes',{x:-300,y:.1,z:299,ry:0,lid:L===80?.7:.35,ey:L===80?.8:-.2,smile:-.3,mouth:L===80?0:(L===75?talkIn(t,75):talkAll(t,L))},t);C3(t,[-299.5,3.5,V(t,[[T(L),305],[T(L)+3,304]])],[-300,3.2,299],40);if(L===75&&t>=T(75,'الربعة'))clockFace(FX,850,460,80,4,0);return;}
  if(L===76){setEnv('island','night');mab.visible=true;mabL.intensity=10;mab.position.set(V(t,[[T(76),40],[T(77),10]]),0,-420);mab.rotation.y=-.3;C3(t,[mab.position.x+8,7,-404],[mab.position.x,1,-420],44);return;}
  setEnv('island','dawn');mab.visible=true;mab.position.set(-40,Math.sin(t)*.1,-505);mab.rotation.y=Math.PI/2;C3(t,[-62,4,-505],[0,6,-500],46);if(t>=T(77,'جزيرة'))LBL('جزيرة النوارس',540,1000,popS(t,T(77,'جزيرة')),46);}],
// 81-87 office, sea chart
[81,(t)=>{if(t<T(83)){setEnv('office','interior');put('you',{x:-300+V(t,[[T(82),-5],[T(82)+1.5,-1.5]]),y:.1,z:2.5,ry:t<T(82)+1.5?80:0,walk:t>=T(82)&&t<T(82)+1.5?t*8:undefined,item:'notebook',lid:.35},t);C3(t,[-299,5.5,12],[-300,3,1],44);return;}
  CARD(t);chart(FX,t);if(t>=T(84,'هنا'))el('circle',{cx:770,cy:740,r:40+6*Math.sin(t*6),fill:'none',stroke:'#e53935','stroke-width':10},FX);
  if(t>=T(85,'الغرب')){const g=G(FX,300,560,popS(t,T(85,'الغرب')));el('path',{d:'M120 0 L-120 0 M-70 -50 L-120 0 L-70 50',stroke:'#1d5fa8','stroke-width':20,fill:'none'},g);}
  if(t>=T(86,'جوج')){el('path',{d:'M770 740 L370 1160',stroke:'#17120f','stroke-width':6,'stroke-dasharray':'14 10'},FX);LBL('2.5 h',600,940,popS(t,T(86,'جوج')),48,'#ffd166');}}],
// 88-93 finger on island, then sunrise side; the sun rises in the east
[88,(t)=>{CARD(t);chart(FX,t);const fx=t<T(89)?370:lerp(370,960,eout((t-T(89))/.8)),fy=t<T(89)?1160:lerp(1160,700,eout((t-T(89))/.8));const f=G(FX,fx,fy+50);el('rect',{class:'o',x:-26,y:0,width:52,height:200,rx:26,fill:'url(#skinP)'},f);
  if(t>=T(89,'الشمس'))sunIcon(FX,960,560,.7);if(t>=T(90)&&t<T(92))LBL('شفتها طالعة من فوق جزيرة النوارس',540,1600,popS(t,T(90)),44,'#fff6c8');
  if(t>=T(92,'الشرق')){const g=G(FX,540,1600,popS(t,T(92,'الشرق')));el('path',{d:'M-200 0 L200 0 M150 -50 L200 0 L150 50',stroke:'#ffd166','stroke-width':20,fill:'none'},g);txt(g,0,-50,70,'E','#ffd166',{direction:'ltr'});}if(t>=T(93,'كنتي'))QM(540,420,popS(t,T(93,'كنتي')));}],
[94,Q(3,94)],[95,CTA2(95)],
];
