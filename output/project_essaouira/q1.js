const crew=(t,o={})=>({omar:at(220,1850,.62,Object.assign({lid:.3},o.omar)),hussein:at(420,1850,.66,Object.assign({lid:.3},o.hussein)),larbi:at(620,1850,.6,Object.assign({lid:.4,ritem:'tea',r:[100,150]},o.larbi)),younes:at(840,1850,.58,Object.assign({lid:.25},o.younes))});
function portShot(t,o={}){useBG('port');GRADE.setAttribute('opacity',o.grade??.15);WARM.setAttribute('opacity',o.warm??.3);for(let i=0;i<5;i++)gull(FG,((i*230+t*60)%1400)-160,260+(i%3)*90,.8,t);}
const SHOTS=[
// 1-2 six pm, Essaouira port
[1,(t)=>{if(t<T(2)){useBG('card');cam(t,540,960,1);show({},t);clockFace(FG,540,850,280,t<T(1,'الستة')?12:6,0);return;}
  portShot(t);cam(t,540,kf(t,[[T(2),900],[T(3),1000]]),kf(t,[[T(2),1.15],[T(3),1.0]]));show({},t);boat(MID,640,1020,.45,undefined,{t});boat(MID,880,1100,.4,'#c0392b',{t,stripe:'#fff'});}],
// 3 gulls, sea smell
[3,(t)=>{portShot(t);cam(t,540,kf(t,[[T(3),700],[T(4),900]]),1.1);show({},t);for(let i=0;i<4;i++)boat(MID,150+i*260,1080+(i%2)*60,.38,i%2?'#c0392b':undefined,{t});for(let i=0;i<6;i++)gull(FG,((i*190+t*90)%1300)-100,400+(i%3)*80,1.2,t);}],
// 4 you work at the port logging boats
[4,(t)=>{portShot(t);cam(t,540,1050,1.15);show({you:at(540,1950,.95,{ritem:'notebook',r:[100,120],l:[40,40],litem:'pencil',lid:.3,ey:.5,smile:.1})},t);boat(MID,820,1050,.4,undefined,{t});
  if(t>=T(4,'خارجة')){const g=G(FX,300,460,popS(t,T(4,'خارجة')));el('path',{d:'M-60 0 L60 0 M20 -40 L60 0 L20 40',stroke:'#2ecc71','stroke-width':16,fill:'none'},g);}if(t>=T(4,'داخلة')){const g=G(FX,780,460,popS(t,T(4,'داخلة')));el('path',{d:'M60 0 L-60 0 M-20 -40 L-60 0 L-20 40',stroke:'#ffd166','stroke-width':16,fill:'none'},g);}}],
// 5-6 this morning at 4 a blue boat 'Mabrouka' left with four fishermen
[5,(t)=>{useBG('dock');GRADE.setAttribute('opacity',.3);cam(t,540,1000,1.0);show({},t);if(t<T(5,'خرجات'))clockFace(FX,540,500,120,4,0);
  const k=cl((t-T(5,'خرجات'))/2.5);boat(MID,lerp(540,700,k),lerp(1250,980,k),lerp(.8,.35,k),undefined,{t,name:t>=T(5,'مبروكة')?'مبروكة':''});
  if(t>=T(6,'ربعة')){for(let i=0;i<4;i++){const g=G(FX,270+i*180,1600,popS(t,T(6,'ربعة')+i*.1));el('circle',{r:40,fill:'#ffd166',stroke:'#17120f','stroke-width':5},g);el('path',{d:'M-50 110 Q0 30 50 110Z',fill:'#ffd166',stroke:'#17120f','stroke-width':5},g);}}}],
// 7-10 the crew introductions
[7,(t)=>{const who=t<T(8)?'omar':t<T(9)?'hussein':t<T(10)?'larbi':'younes';const ln={omar:7,hussein:8,larbi:9,younes:10}[who];
  const p={omar:{lid:.35,smile:.2},hussein:{lid:.3,l:[-150,160]},larbi:{lid:.45,smile:.3,ritem:'tea',r:[100,140]},younes:{lid:.2,smile:.3}}[who];closeUp(t,'port',who,p,ln,{talk:false,z0:1.25,z1:1.35,warm:.3,grade:.12});
  if(who==='hussein'&&t>=T(8,'وشم')){const a=G(FX,540-150*1.2*1.3+0,1080+160*1.2,1);const g=G(FX,250,1250,popS(t,T(8,'وشم'))*1.3);el('circle',{r:70,fill:'url(#skinC)',stroke:'#17120f','stroke-width':5},g);el('path',{d:'M0 -40 L0 40 M-30 20 Q0 50 30 20 M-16 -30 L16 -30',stroke:'#1d3a6a','stroke-width':8,fill:'none','stroke-linecap':'round'},g);}
  if(who==='younes'&&t>=T(10,'تسعطاش'))BIG('19',820,480,popS(t,T(10,'تسعطاش')),140);
  if(who==='omar'&&t>=T(7,'بلحيتو'))el('circle',{cx:540,cy:1080-150*1.2+120,r:160,fill:'none',stroke:'#ffd166','stroke-width':6,opacity:Math.abs(Math.sin(t*4))},FX);}],
// 11-13 Mabrouka coming back — only one aboard: Younes
[11,(t)=>{portShot(t,{warm:.4});const z=t<T(12)?1.0:1.6;cam(t,t<T(12)?540:700,t<T(12)?1000:1000,kf(t,[[T(11),1.0],[T(12),1.0],[T(12)+.5,1.7]]));const k=cl((t-T(11))/3);
  const bx=lerp(760,700,k),by=lerp(960,1080,k),bs=lerp(.35,.55,k);show({younes:at(bx-40,by-40,bs*.55,{lid:.1,ey:.3})},t);boat(MID,bx,by,bs,undefined,{t,name:'مبروكة'});
  if(t>=T(12,'واحد'))BIG('1',540,520,popS(t,T(12,'واحد')),200);}],
// 14-16 boat docks; Younes steps off, pale; people rush
[14,(t)=>{portShot(t,{warm:.35});cam(t,540,1100,1.05);boat(MID,560,1300,.9,undefined,{t,name:'مبروكة'});const off=t>=T(15);
  show({younes:at(off?520:560,off?1950:1300,off?.85:.5,{lid:.05,browUp:.8,brow:-.6,smile:-.6,dark:0}),fisher:t>=T(16)?at(lerp(-100,180,cl((t-T(16))/.8)),1950,.85,{walk:t*8}):null,mother:t>=T(16)?at(lerp(1200,880,cl((t-T(16))/.8)),1950,.85,{walk:t*8,lid:.1,browUp:.8}):null},t);
  if(off)el('ellipse',{cx:520,cy:1950-560*.85-150*.85,rx:130,ry:130,fill:'#e9e2b0',opacity:.25},FG);}],
// 17-19 Younes: the wave at noon hit; the three fell; searched for hours
[17,(t)=>{const L=t<T(18)?17:t<T(19)?18:19;if(L===17){const tr=Math.sin(t*40)*3;closeUp(t,'port','younes',{lid:.05,browUp:.9,brow:-.6,hdx:tr},17,{warm:.3,grade:.12});if(t>=T(17,'الطناش'))clockFace(FX,850,460,90,12,0);return;}
  useBG('nightsea');cam(t,540,1000,1.0);GRADE.setAttribute('opacity',.1);show({},t);el('rect',{x:-500,y:600,width:2080,height:1600,fill:'#3a6a8a',opacity:.6},MID);
  if(L===18){const k=cl((t-T(18))/1.2);const w=G(MID,lerp(-300,200,k),1100);el('path',{class:'o',d:'M-400 400 Q-200 -500 100 -200 Q-50 -150 0 0 Q200 100 400 400Z',fill:'#4f9fd0'},w);boat(MID,600,1150,.7,undefined,{t});if(t>=T(18,'والتلاتة')){for(let i=0;i<3;i++){const g=G(FX,250+i*290,1600,popS(t,T(18,'والتلاتة')+i*.12));el('circle',{r:40,fill:'#3b4766',stroke:'#fff','stroke-width':5},g);txt(g,0,20,50,'?','#fff',{direction:'ltr'});}}}
  else{boat(MID,540,1150,.7,undefined,{t});for(let i=0;i<3;i++){const ph=((t*.6+i/3)%1);el('circle',{cx:540,cy:1150,r:100+ph*500,fill:'none',stroke:'#cfe6ff','stroke-width':6,opacity:1-ph},FG);}if(t>=T(19,'ساعات'))clockFace(FX,540,480,100,(t*2)%12,(t*120)%60);}}],
// 20-21 his mother hugs him; fishermen's wives cry
[20,(t)=>{portShot(t,{warm:.35});cam(t,540,1050,t<T(21)?1.25:1.0);show({younes:at(470,1950,.85,{lid:.6,smile:-.3}),mother:at(630,1950,.85,{lid:.6,smile:-.3,l:[-200,60],r:[-60,60]}),wife1:t>=T(21)?at(160,1950,.8,{lid:.8,brow:-.6,smile:-.6,l:[-40,-20],r:[40,-20]}):null,wife2:t>=T(21)?at(920,1950,.8,{lid:.8,brow:-.6,smile:-.6,l:[-40,-20],r:[40,-20]}):null},t);
  if(t>=T(21)){for(const x of [160,920])for(let i=0;i<2;i++){const ph=((t*1.2+i/2)%1);el('path',{d:`M${x+(i?30:-30)} ${1950-560*.8-150*.8+20+ph*100} q-8 14 0 20 q8 -6 0 -20Z`,fill:'#8fd3ff',opacity:1-ph},FG);}}}],
// 22-26 you board to write the report: too clean; net folded & dry; Younes's clothes dry; crates full of sardines
[22,(t)=>{useBG('deck');GRADE.setAttribute('opacity',.12);WARM.setAttribute('opacity',.3);cam(t,540,kf(t,[[T(22),1300],[T(24),1500]]),kf(t,[[T(22),1.0],[T(23),1.05]]));
  if(t<T(23))show({you:at(540,2000,.9,{ritem:'notebook',r:[100,120],lid:.3})},t);else show({},t);
  const net=G(MID,240,1600);el('path',{class:'o',d:'M-150 60 Q-160 -40 -60 -60 Q60 -80 140 -30 Q170 40 120 70Z',fill:'#6a8a5a'},net);for(let i=0;i<8;i++)el('path',{d:`M${-130+i*35} -50 L${-120+i*35} 60`,stroke:'#3e5a32','stroke-width':4},net);
  for(let i=0;i<3;i++){const c=G(MID,620+i*150,1500+i*40,1);el('rect',{class:'o',x:-70,y:-60,width:140,height:90,rx:8,fill:'#e9e2d0'},c);for(let k=0;k<5;k++)el('ellipse',{cx:-48+k*24,cy:-58,rx:13,ry:5,fill:'#9fb3c8',stroke:'#17120f','stroke-width':2},c);}
  if(t>=T(23,'نقية')&&t<T(24)){for(let i=0;i<5;i++){const a=t*2+i;el('path',{d:'M0 -20 L5 -5 L20 0 L5 5 L0 20 L-5 5 L-20 0 L-5 -5Z',fill:'#fff',transform:`translate(${300+i*120} ${1100+Math.sin(a)*60})`},FG);}}
  if(t>=T(24,'وناشفة')){const g=G(FX,240,520,popS(t,T(24,'وناشفة')));sunIcon(g,0,0,.8);X(g,0,0,1,.6);fxDrop(g);}
  if(t>=T(25)){const sh=G(MID,880,1350,1.0);el('path',{class:'o',d:'M-60 -80 L60 -80 L80 60 L-80 60Z',fill:'#ff7a1a'},sh);el('path',{class:'o',d:'M-50 80 L-10 80 L-10 140 L-60 140Z M10 80 L50 80 L60 140 L10 140Z',fill:'#2b2f38'},sh);if(t>=T(25,'ناشفين')){const g=G(FX,780,520,popS(t,T(25,'ناشفين')));sunIcon(g,0,0,.8);}}
  if(t>=T(26,'عامرين'))el('rect',{x:520,y:1400,width:500,height:240,fill:'none',stroke:'#ffd166','stroke-width':8},FG);}],
// 27-30 weather board: wind 10 km/h light, waves 0.5 m, sea calm as oil
[27,(t)=>{useBG('board');GRADE.setAttribute('opacity',.08);WARM.setAttribute('opacity',.2);cam(t,540,900,1.05);show({},t);const b=G(FG,540,900);
  if(t>=T(28)){const r=G(b,0,-250,popS(t,T(28,'الريح')));el('path',{d:'M-260 -10 q60 -30 120 0 t120 0 M-260 40 q60 -30 120 0 t120 0',stroke:'#1d5fa8','stroke-width':10,fill:'none'},r);txt(r,170,30,70,'10 km/h','#17120f',{direction:'ltr'});}
  if(t>=T(29)){const r=G(b,0,0,popS(t,T(29,'نص')));el('path',{d:'M-260 20 q40 -20 80 0 t80 0 t80 0',stroke:'#1d5fa8','stroke-width':10,fill:'none'},r);txt(r,170,30,70,'0.5 m','#17120f',{direction:'ltr'});}
  if(t>=T(30)){const r=G(b,0,250,popS(t,T(30,'هادي')));el('path',{d:'M-280 0 L280 0',stroke:'#1d5fa8','stroke-width':10},r);OK(r,0,90,1,.7);}}],
// 31-32 you write two words: something's off
[31,(t)=>{useBG('card');cam(t,540,960,1);show({},t);notebook(FG,540,900,1.1,['شي حاجة ما مشاتش.'],t,[T(32)]);if(t<T(32))show({you:at(540,1850,1.0,{ritem:'notebook',r:[90,110],l:[30,40],litem:'pencil',lid:.4,ey:.6})},t);}],
[33,Q(1,33)],[34,CTA2(34)],
// 35-38 answer 1: not the whole truth: calm sea, dry net, dry clothes
[35,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(36)){answerCard(t,T(35),1);return;}
  const rows=[[36,'0.5 m','الموج'],[37,'',''],[38,'','']];
  if(t<T(37)){const g=G(FG,540,820,1.2);el('path',{d:'M-300 0 q50 -25 100 0 t100 0 t100 0 t100 0 t100 0 t100 0',stroke:'#4f9fd0','stroke-width':14,fill:'none'},g);BIG('0.5 m',540,560,popS(t,T(36,'نص')),110);X(FX,540,1200,popS(t,T(36,'تقلب')),1);return;}
  if(t<T(38)){const net=G(FG,540,900,2);el('path',{class:'o',d:'M-150 60 Q-160 -40 -60 -60 Q60 -80 140 -30 Q170 40 120 70Z',fill:'#6a8a5a'},net);sunIcon(FX,800,480,popS(t,T(37,'ناشفة'))*.8);X(FX,540,1300,popS(t,T(37,'تلاحتش')),.8);return;}
  const sh=G(FG,320,900,1.6);el('path',{class:'o',d:'M-60 -80 L60 -80 L80 60 L-80 60Z',fill:'#ff7a1a'},sh);const w=G(FG,780,900,1.6);el('path',{class:'o',d:'M-60 -80 L60 -80 L80 60 L-80 60Z',fill:'#5f8fb0'},w);for(let i=0;i<5;i++){const ph=((t*1.3+i/5)%1);el('path',{d:`M${780-40+i*20} ${980+ph*120} q-8 14 0 20 q8 -6 0 -20Z`,fill:'#8fd3ff',opacity:1-ph},FG);}
  if(t>=T(38,'فازك'))txt(FX,540,1240,90,'≠','#ffd166',{direction:'ltr'});}],
// 39-41 that night Younes went home with his mother; you stay by Mabrouka; weak yellow quay light
[39,(t)=>{useBG('dock');GRADE.setAttribute('opacity',.3);cam(t,540,1100,1.0);boat(MID,520,1350,.75,undefined,{t,name:'مبروكة'});
  if(t<T(40))show({younes:at(lerp(500,1200,cl((t-T(39))/2.5)),1950,.8,{walk:t*6,lid:.5}),mother:at(lerp(380,1080,cl((t-T(39))/2.5)),1950,.8,{walk:t*6,lid:.5})},t);else show({you:at(860,1950,.85,{lid:.3,ex:-.6})},t);
  waves(FG,1500,'#3a5a7a',.4,t);}],
// 42-46 you open the engine hatch; morning note by Omar: tank 120 L full; left at 4; burns 10 L/h
[42,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(43)){useBG('deck');GRADE.setAttribute('opacity',.45);const h=G(MID,540,1500,1.4);el('rect',{class:'o',x:-160,y:-90,width:320,height:180,rx:16,fill:'#2b2f38'},h);el('rect',{class:'o',x:-170,y:-100,width:340,height:40,rx:10,fill:'#1d5fa8',transform:`rotate(${-eout((t-T(42,'وحليتي'))/.6)*70} -170 -80)`},h);return;}
  notebook(FG,540,820,1.15,['خزّان المازوط: 120 L. عامر.','خرجنا مع 4 ديال الصباح.','المحرك: 10 L فالساعة.'],t,[T(44),T(45),T(46)]);if(t>=T(44,'عامر'))fuelGauge(FX,540,1500,.9,120);}],
// 47-48 phone light on the gauge: 70 L left
[47,(t)=>{useBG('deck');GRADE.setAttribute('opacity',.5);cam(t,540,1000,1.0);show({},t);const lv=t<T(48,'سبعين')?120:lerp(120,70,eout((t-T(48,'سبعين'))/.6));fuelGauge(FG,540,1050,1.6,lv);el('circle',{cx:540,cy:900,r:420,fill:'url(#glowB)',opacity:.35},FG);}],
// 49-53 you calculate: out 4 am, back 6 pm = 14 h; 14 h engine would empty the tank; but 70 L left
[49,(t)=>{useBG('card');cam(t,540,960,1);show({},t);
  if(t>=T(50)){const a=G(FX,330,560,popS(t,T(50,'الربعة')));clockFace(a,0,0,110,4,0);const b=G(FX,750,560,popS(t,T(50,'الستة')));clockFace(b,0,0,110,6,0);el('path',{d:'M470 560 L610 560 M570 520 L610 560 L570 600',stroke:'#ffd166','stroke-width':12,fill:'none'},FX);}
  if(t>=T(51,'ربعطاش'))BIG('14 h',540,940,popS(t,T(51,'ربعطاش')),150);
  if(t>=T(52)&&t<T(53)){const g=G(FX,540,1350);txt(g,0,0,80,'14 × 10 = 140 L','#fff',{direction:'ltr'});X(FX,840,1330,popS(t,T(52,'خاوي')),.5);}
  if(t>=T(53)){fuelGauge(FX,540,1550,.8,70);}}],
// 54-59 standing in the boat, cold wind; where did it spend the day? engine mostly off; it went somewhere and stopped; not fishing
[54,(t)=>{if(t<T(57)){useBG('dock');GRADE.setAttribute('opacity',.35);cam(t,540,1150,1.25);boat(MID,540,1500,.9,undefined,{t,name:'مبروكة'});show({you:at(540,1500,.7,{lid:.3,brow:.5,ex:Math.sin(t)*.6})},t);fxWind(t);if(t>=T(55))QM(820,560);return;}
  useBG('card');cam(t,540,960,1);show({},t);const c=chart(FG,t);const k=cl((t-T(58))/1.5);el('path',{d:`M770 740 Q${lerp(770,380,k)} ${lerp(740,1100,k)} ${lerp(770,370,k)} ${lerp(740,1160,k)}`,stroke:'#e53935','stroke-width':8,'stroke-dasharray':'20 12',fill:'none'},FG);
  if(t>=T(58,'ووقفات'))el('circle',{cx:370,cy:1160,r:40+6*Math.sin(t*6),fill:'none',stroke:'#e53935','stroke-width':10},FG);if(t>=T(59,'كتصيد')){const n=G(FX,800,460,popS(t,T(59,'كتصيد')));el('path',{class:'o',d:'M-90 30 Q-100 -40 -30 -50 Q40 -60 90 -20 Q110 30 70 50Z',fill:'#6a8a5a'},n);X(n,0,0,1,.9);}}],
// 60-62 at the end of the quay a cigarette glow; someone watching; you look up: light off, shadow gone
[60,(t)=>{useBG('dock');GRADE.setAttribute('opacity',.45);cam(t,kf(t,[[T(60),540],[T(60)+1,860]]),1200,kf(t,[[T(60),1.0],[T(60)+1,1.7]]));const gone=t>=T(62,'طفا');
  show(gone?{}:{smoker:at(900,1560,.5,{dark:.95,ritem:'cig',r:[-10,-60],rbend:-1})},t);if(!gone){const pulse=.6+.4*Math.sin(t*3);el('circle',{cx:900-0,cy:1560-560*.5-150*.5+40,r:12,fill:'#ff6a2a',opacity:pulse},FG);}
  if(t>=T(61,'كيشوف')&&!gone){for(const sx of [-1,1])el('circle',{cx:900+sx*14,cy:1560-560*.5-150*.5-4,r:4,fill:'#fff'},FG);}}],
[63,Q(2,63)],[64,CTA2(64)],
// 65-69 answer 2: 5 hours: 120-70=50 L, /10 = 5 h; 2.5 out + 2.5 back; 9 h stopped
[65,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(66)){answerCard(t,T(65),2);if(t>=T(65,'خمسة'))BIG('5 h',540,1150,popS(t,T(65,'خمسة')),160);return;}
  const r=[[66,'120 − 70 = 50 L',T(66,'خمسين')],[67,'50 ÷ 10 = 5 h',T(67,'خمسة')],[68,'2.5 h + 2.5 h',T(68,'جوج')],[69,'14 − 5 = 9 h',T(69,'وتسعة')]];
  r.forEach(([ln,s,tt],i)=>{if(t>=tt){const g=G(FX,540,560+i*230,popS(t,tt));el('rect',{class:'o',x:-380,y:-80,width:760,height:150,rx:30,fill:i===3?'#ffd166':'#f4f6fb'},g);txt(g,0,26,76,s,'#17120f',{direction:'ltr'});}});}],
// 70-74 morning: Younes's house, blue door in the medina; his mother opens, eyes red; Younes by the window; you ask gently
[70,(t)=>{if(t<T(73)){useBG('alley');GRADE.setAttribute('opacity',.05);WARM.setAttribute('opacity',.15);cam(t,540,1050,kf(t,[[T(70),1.0],[T(72),1.15]]));const open=t>=T(72);show(open?{mother:at(540,1900,.95,{lid:.55,brow:-.4,smile:-.4,dark:0}),you:at(160,1980,.9,{ex:.8,lid:.3})}:{you:at(lerp(-100,200,cl((t-T(70))/1.5)),1980,.9,{walk:t*6,lid:.3,ex:.6})},t);
   if(open)for(const sx of [-52,52])el('ellipse',{cx:540+sx*.95,cy:1900-560*.95-150*.95-8*.95,rx:30,ry:20,fill:'#ff5a5a',opacity:.35},FG);return;}
  useBG('room');GRADE.setAttribute('opacity',.05);WARM.setAttribute('opacity',.15);cam(t,540,1050,1.05);show({younes:at(700,1950,.9,{lid:.45,ex:-.2,ey:-.3,hrot:-5}),you:at(300,1950,.9,{lid:.3,ex:.8,mouth:t>=T(74)?talkIn(t,74):0})},t);}],
// 75-80 Younes: left at 4, sea dark; went south 1-2 h; saw the sun rise over Seagull Island, red, behind the rock; then fished; the wave... silent
[75,(t)=>{const L=t<T(76)?75:t<T(77)?76:t<T(79)?77:t<T(80)?79:80;
  if(L===75||L===79||L===80){closeUp(t,'room','younes',{lid:L===80?.7:.35,ey:L===80?.8:-.2,smile:-.3},L===80?null:L,{all:L!==75,warm:.15,grade:.05});if(L===75&&t>=T(75,'الربعة'))clockFace(FX,850,460,80,4,0);return;}
  useBG('nightsea');show({},t);cam(t,540,1000,1.0);GRADE.setAttribute('opacity',L===76?.2:.05);
  if(L===76){boat(MID,lerp(400,700,cl((t-T(76))/2)),1150,.5,undefined,{t});return;}
  WARM.setAttribute('opacity',.5);const k=cl((t-T(77,'طلعات'))/2);el('rect',{x:-500,y:-500,width:2080,height:1400,fill:'url(#dawnG)',opacity:k},MID);el('circle',{cx:540,cy:lerp(900,760,k),r:90,fill:'#ff6a3a'},MID);el('path',{d:'M260 905 Q340 760 460 810 Q540 720 640 790 Q740 760 820 905Z',fill:'#1a1c22'},MID);
  if(t>=T(77,'جزيرة'))LBL('جزيرة النوارس',540,1000,popS(t,T(77,'جزيرة')),46);}],
// 81-87 you write; go to the port office; open the sea chart: Essaouira here, sea west, island 2.5 h SW, empty
[81,(t)=>{if(t<T(83)){useBG('office');GRADE.setAttribute('opacity',.05);cam(t,540,1050,1.0);show({you:at(t<T(82)?320:lerp(-60,420,cl((t-T(82))/1.2)),1950,.9,{walk:t>=T(82)?t*6:undefined,ritem:'notebook',r:[100,120],lid:.35})},t);return;}
  useBG('card');cam(t,540,960,1);show({},t);const c=chart(FG,t);
  if(t>=T(84,'هنا'))el('circle',{cx:540+230,cy:900-160,r:40+6*Math.sin(t*6),fill:'none',stroke:'#e53935','stroke-width':10},FG);
  if(t>=T(85,'الغرب')){const g=G(FX,300,560,popS(t,T(85,'الغرب')));el('path',{d:'M120 0 L-120 0 M-70 -50 L-120 0 L-70 50',stroke:'#1d5fa8','stroke-width':20,fill:'none'},g);}
  if(t>=T(86,'جوج')){el('path',{d:'M770 740 L370 1160',stroke:'#17120f','stroke-width':6,'stroke-dasharray':'14 10'},FG);LBL('2.5 h',600,940,popS(t,T(86,'جوج')),48,'#ffd166');}
  if(t>=T(87))for(let i=0;i<3;i++)gull(FG,330+i*40,1110-(i%2)*20,.5,t);}],
// 88-93 finger on the island, then on where the sun rises; reread Younes's sentence; the sun always rises in the east
[88,(t)=>{useBG('card');cam(t,540,960,1);show({},t);const c=chart(FG,t);
  const fx=t<T(89)?370:lerp(370,960,eout((t-T(89))/.8)),fy=t<T(89)?1160:lerp(1160,700,eout((t-T(89))/.8));const f=G(FG,fx,fy+50);el('rect',{class:'o',x:-26,y:0,width:52,height:200,rx:26,fill:'url(#skinP)'},f);
  if(t>=T(89,'الشمس'))sunIcon(FG,960,560,.7);
  if(t>=T(90)&&t<T(92))LBL('شفتها طالعة من فوق جزيرة النوارس',540,1600,popS(t,T(90)),44,'#fff6c8');
  if(t>=T(92,'الشرق')){const g=G(FX,540,1600,popS(t,T(92,'الشرق')));el('path',{d:'M-200 0 L200 0 M150 -50 L200 0 L150 50',stroke:'#ffd166','stroke-width':20,fill:'none'},g);txt(g,0,-50,70,'E','#ffd166',{direction:'ltr'});}
  if(t>=T(93,'كنتي'))QM(540,420,popS(t,T(93,'كنتي')));}],
[94,Q(3,94)],[95,CTA2(95)],
];
function fxDrop(p){}
function fxWind(t){for(let i=0;i<5;i++){const ph=((t*.9+i*.2)%1);const x=1300-ph*1700;el('path',{d:`M${x} ${700+i*120} q-90 -34 -180 0 t-180 0`,stroke:'#dbeeff','stroke-width':8,fill:'none',opacity:.5*Math.sin(ph*Math.PI),'stroke-linecap':'round'},FX);}}
