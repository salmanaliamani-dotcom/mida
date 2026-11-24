const Q=(n,line)=>(t)=>{useBG('card');cam(t,540,960,1);show({},t);quizCard(t,T(line),n);};
const SHOTS=[
// 1 clock 23:40
[1,(t)=>{useBG('card');cam(t,540,960,kf(t,[[0,1.1],[2.3,1]]));show({},t);const m=t<T(1,'وأربعين')?0:40;const h=t<T(1,'الحداش')?12:11;
  const g=clockFace(FG,540,820,300,h,m);el('circle',{cx:540,cy:820,r:420,fill:'url(#glowB)',opacity:.2},FG);if(t>=T(1,'الليل'))el('path',{d:'M840 360 a70 70 0 1 0 60 110 a55 55 0 1 1 -60 -110Z',fill:'#ffe9a8',opacity:eout((t-T(1,'الليل'))/.3)},FG);}],
// 2-3 hotel in the Atlas, storm
[2,(t)=>{useBG('ext');cam(t,540,kf(t,[[T(2),900],[T(4)-.1,1100]]),kf(t,[[T(2),1.0],[T(4)-.1,1.15]]));GRADE.setAttribute('opacity',.35);const st=t>=T(3)?1.6:.8;snow(t,t>=T(3)?140:60,1,st*3);
  if(t>=T(3,'الطريق')){const k=eout((t-T(3,'الطريق'))/.4);el('path',{d:'M-100 1600 Q200 1540 420 1680',stroke:'#ff3b30','stroke-width':16,fill:'none','stroke-dasharray':'30 20',opacity:k},FG);const x=G(FG,300,1630,k);el('path',{d:'M-40 -40 L40 40 M40 -40 L-40 40',stroke:'#ff3b30','stroke-width':18,'stroke-linecap':'round'},x);}}],
// 4 you are a guest; a scream from 3rd floor
[4,(t)=>{const scream=t>=T(4,'غوات')-.05;if(!scream||t<T(4,'غوات')+.6){useBG('salon');cam(t,540,940,1.25,scream?10:0);WARM.setAttribute('opacity',.4);
   show({you:CU({ritem:'tea',r:[90,120],ey:scream?-1:.3,lid:scream?0:.35,browUp:scream?1:0,brow:scream?-.6:0,hrot:scream?-8:0})},t);
   const fl=G(FG,840,1060);for(let i=0;i<3;i++)el('ellipse',{cx:-40+i*40,cy:-30*Math.sin(t*9+i),rx:36,ry:70+10*Math.sin(t*7+i),fill:'url(#fireG)'},fl);}
  else{useBG('ext');cam(t,540,kf(t,[[T(4,'غوات')+.6,1000],[T(5),760]]),kf(t,[[T(4,'غوات')+.6,1.2],[T(5),1.8]]));GRADE.setAttribute('opacity',.35);snow(t,80,1,4);
   const w=G(FX,540,560,1+Math.sin(t*30)*.05);for(let i=0;i<3;i++)el('path',{d:`M${-90-i*40} ${-60-i*30} Q0 ${-120-i*50} ${90+i*40} ${-60-i*30}`,stroke:'#fff','stroke-width':10,fill:'none',opacity:.8-i*.2},w);}}],
// 5-6 Zahra in front of room 7, pale, keys trembling
[5,(t)=>{useBG('corridor');const close=t>=T(6);cam(t,close?560:540,close?860:1050,close?kf(t,[[T(6),1.3],[T(7),1.7]]):kf(t,[[T(5),1.0],[T(6),1.1]]));GRADE.setAttribute('opacity',.25);WARM.setAttribute('opacity',.25);
  const tr=close&&t>=T(6,'كترعد')?Math.sin(t*60)*6:0;show({zahra:at(560,1760,.85,{r:[120+tr,130],ritem:'keys',ex:-.3,lid:.05,browUp:1,brow:-.5,smile:-.6,dark:0}),you:at(160,1900,.9,{ex:.8,lid:.15,browUp:.6})},t);
  if(t>=T(6,'صفر')){const z=CH.zahra.head;}
  if(t>=T(5,'سبعة'))el('circle',{cx:540,cy:280,r:90,fill:'url(#glowG)',opacity:.6*Math.abs(Math.sin(t*4))},FG);}],
// 7 Mansour the watchmaker (memory insert)
[7,(t)=>{useBG('card');cam(t,540,960,1);show({mansour:at(540,1750,1.05,{ritem:t>=T(7,'صانع')?'watch':'',r:[90,90],lid:.3,smile:.3})},t);
  if(t>=T(7,'صانع')){for(let i=0;i<3;i++){const a=t*.6+i*2.1;clockFace(FG,540+Math.cos(a)*360,560+Math.sin(a)*120,70,3+i*4,15*i);}}
  el('rect',{x:0,y:0,width:1080,height:1920,fill:'#c9a46a',opacity:.18,style:'mix-blend-mode:multiply'},FX);}],
// 8-9 locked from inside; opened with Zahra's key
[8,(t)=>{useBG('corridor');cam(t,700,1000,kf(t,[[T(8),1.4],[T(9),1.7]]));WARM.setAttribute('opacity',.25);
  const turn=t>=T(9)?(t-T(9))*400:0;show({zahra:at(720,1760,.85,{r:t>=T(9)?[-60,40]:[110,250],ritem:t>=T(9)?'key':'',rirot:-90+Math.min(turn,90),ex:-.8,lid:.1,browUp:.6})},t);
  if(t<T(9)){const L=G(FG,710,880,popS(t,T(8,'مسدود')));el('rect',{class:'o',x:-40,y:-10,width:80,height:70,rx:10,fill:'#d8b648'},L);el('path',{class:'o',d:'M-26 -10 L-26 -40 Q0 -70 26 -40 L26 -10',fill:'none','stroke-width':10},L);}}],
// 10-12 room empty: bed made, suitcase, window wide open, cold
[10,(t)=>{useBG('room');const w=t>=T(12);cam(t,w?820:540,w?700:1000,w?kf(t,[[T(12),1.2],[T(13),1.5]]):kf(t,[[T(10),1.0],[T(12),1.08]]));GRADE.setAttribute('opacity',.35);show({},t);
  if(t>=T(11,'الفراش'))el('circle',{cx:250,cy:1180,r:popS(t,T(11,'الفراش'))*160,fill:'none',stroke:'#ffd166','stroke-width':10},FG);
  if(t>=T(11,'والفاليزة'))el('circle',{cx:620,cy:1260,r:popS(t,T(11,'والفاليزة'))*130,fill:'none',stroke:'#ffd166','stroke-width':10},FG);
  if(w){snow(t,90,1,-3);for(let i=0;i<4;i++){const ph=((t*.8+i/4)%1);el('path',{d:`M${700-ph*500} ${520+i*70} q-60 -20 -120 0`,stroke:'#cfe6ff','stroke-width':8,fill:'none',opacity:Math.sin(ph*Math.PI)},FG);}}}],
// 13 you look down from the window
[13,(t)=>{useBG('room');cam(t,820,760,1.5);GRADE.setAttribute('opacity',.35);show({you:at(820,1900,1.0,{ey:t>=T(13,'وشفتي')?1:0,hdy:t>=T(13,'وشفتي')?20:0,l:[-130,40],r:[130,40],lid:.1})},t);snow(t,50,1,-2);}],
// 14-15 snow pristine, no footprints; third floor
[14,(t)=>{useBG('down');cam(t,540,kf(t,[[T(14),900],[T(16),1100]]),kf(t,[[T(14),1.0],[T(16),1.1]]));GRADE.setAttribute('opacity',.25);snow(t,60,.8,1);
  if(t>=T(14,'أثر')){const k=popS(t,T(14,'أثر'));footprint(FG,480,1300,0,k*1.6,'#9aa8c0',.6);footprint(FG,600,1450,0,k*1.6,'#9aa8c0',.6);const x=G(FG,540,1380,k);el('path',{d:'M-140 -140 L140 140 M140 -140 L-140 140',stroke:'#ff3b30','stroke-width':22,'stroke-linecap':'round'},x);}
  if(t>=T(15)){const k=popS(t,T(15));const g=G(FX,180,560,k);for(let i=0;i<3;i++){el('rect',{class:'o',x:-60,y:-i*110,width:120,height:100,rx:10,fill:i===2?'#ffd166':'#3b4766'},g);}txt(g,0,-190,64,'3','#17120f',{direction:'ltr'});}}],
// 16-17 Mansour vanished, road cut -> answer is inside the hotel
[16,(t)=>{useBG('ext');const inside=t>=T(17,'داخل');cam(t,540,inside?900:1050,inside?kf(t,[[T(17,'داخل'),1.2],[T(18),1.9]]):1.05);GRADE.setAttribute('opacity',.35);snow(t,100,1,3);
  if(t<T(17)){const g=G(FX,540,500,popS(t,T(16)));el('circle',{r:130,fill:'#3b4766',stroke:'#fff','stroke-width':8},g);txt(g,0,40,140,'?','#fff',{direction:'ltr'});}
  if(inside){el('rect',{x:440,y:1070,width:200,height:150,fill:'url(#glowG)',opacity:.9},FG);}}],
// 18 Q1
[18,Q(1,18)],[19,CTA(19)],
// 20-22 answer 1
[20,(t)=>{if(t<T(21)){useBG('card');cam(t,540,960,1);show({},t);answerCard(t,T(20),1);const x=G(FX,540,1000,popS(t,T(20,'ما')));el('rect',{class:'o',x:-120,y:-160,width:240,height:300,rx:10,fill:'#0b1226'},x);el('path',{d:'M-160 -200 L160 200 M160 -200 L-160 200',stroke:'#ff3b30','stroke-width':26,'stroke-linecap':'round'},x);return;}
  if(t<T(22)){useBG('down');cam(t,540,1000,1.05);snow(t,50,.8,1);const k=popS(t,T(21));const x=G(FG,540,1300,k);el('path',{d:'M-140 -140 L140 140 M140 -140 L-140 140',stroke:'#ff3b30','stroke-width':22,'stroke-linecap':'round'},x);
    if(t>=T(21,'عالية')){const g=G(FG,880,300,popS(t,T(21,'عالية')));el('path',{d:'M0 0 L0 900 M-40 60 L0 0 L40 60 M-40 840 L0 900 L40 840',stroke:'#ffd166','stroke-width':14,fill:'none'},g);}return;}
  useBG('room');cam(t,820,700,1.3);GRADE.setAttribute('opacity',.3);snow(t,60,1,-2);const g=G(FX,540,420,popS(t,T(22,'يغلّطنا')));el('rect',{class:'o',x:-230,y:-80,width:460,height:160,rx:40,fill:'#ff3b30'},g);el('path',{d:'M-160 0 L160 0 M110 -50 L160 0 L110 50',stroke:'#fff','stroke-width':16,fill:'none'},g);}],
// 23 then how did he leave a room locked from inside?
[23,(t)=>{useBG('corridor');cam(t,540,840,kf(t,[[T(23),1.2],[T(24),1.4]]));WARM.setAttribute('opacity',.2);show({},t);const L=G(FG,540,900,popS(t,T(23,'مسدودة')));el('rect',{class:'o',x:-60,y:-10,width:120,height:100,rx:14,fill:'#d8b648'},L);el('path',{class:'o',d:'M-40 -10 L-40 -60 Q0 -110 40 -60 L40 -10',fill:'none','stroke-width':14},L);
  if(t>=T(23,'كيفاش'))txt(FX,540,520,240,'؟','#ffd166',{stroke:'#17120f','stroke-width':12,'paint-order':'stroke'});}],
// 24-26 back to the door; key not on table nor in lock — on the floor
[24,(t)=>{useBG('room');cam(t,540,1100,1.05);GRADE.setAttribute('opacity',.3);show({you:at(540,1900,.95,{ex:t<T(26)?(Math.sin(t*2)*.8):0,ey:t>=T(26)?1:0,lid:.15})},t);
  if(t>=T(25,'الطبلة')){const k=popS(t,T(25,'الطبلة'));const x=G(FG,860,1180,k*.6);el('path',{d:'M-60 -60 L60 60 M60 -60 L-60 60',stroke:'#ff3b30','stroke-width':16,'stroke-linecap':'round'},x);}
  if(t>=T(25,'فالقفل')){const g=G(FX,880,500,popS(t,T(25,'فالقفل')));el('rect',{class:'o',x:-70,y:-70,width:140,height:140,rx:20,fill:'#d8b648'},g);el('circle',{cx:0,cy:-10,r:16,fill:'#17120f'},g);el('path',{d:'M0 0 L0 40',stroke:'#17120f','stroke-width':12},g);el('path',{d:'M-90 -90 L90 90 M90 -90 L-90 90',stroke:'#ff3b30','stroke-width':16,'stroke-linecap':'round'},g);}
  if(t>=T(26)){const g=G(FG,300,1700,popS(t,T(26))*1.3,30);ITEMS.key(g);el('circle',{r:90,fill:'url(#glowG)',opacity:.8},g);}}],
// 27-29 you kneel; big gap under door; thin drag line on the rug
[27,(t)=>{useBG('doorlow');cam(t,540,kf(t,[[T(27),1100],[T(28),1320]]),kf(t,[[T(27),1.0],[T(28),1.5]]));GRADE.setAttribute('opacity',.3);show({},t);
  if(t>=T(28,'فراغ')){el('rect',{x:140,y:1300,width:800,height:46,fill:'none',stroke:'#ffd166','stroke-width':8,opacity:Math.abs(Math.sin(t*5))},FG);}
  if(t>=T(28,'الصبع')){const k=eout((t-T(28,'الصبع'))/.4);const f=G(FG,lerp(1100,700,k),1323);el('rect',{class:'o',x:0,y:-18,width:400,height:36,rx:18,fill:'url(#skinP)'},f);}
  if(t>=T(29,'خط')){const k=eout((t-T(29,'خط'))/.6);el('path',{d:`M540 1350 L${540-k*20} ${1350+k*400}`,stroke:'#e9c46a','stroke-width':8,'stroke-dasharray':'14 10'},FG);}}],
// 30 Zahra: old doors lock with a key from inside or outside (lip-sync)
[30,(t)=>closeUp(t,'corridor','zahra',{ritem:'keys',r:[120,120],lid:.2,brow:-.2,smile:-.2},30,{warm:.25})],
// 31-32 you push the key; it slides under the door
[31,(t)=>{useBG('doorlow');cam(t,540,1330,1.6);GRADE.setAttribute('opacity',.3);show({},t);const k=t<T(31,'ودفعتيه')?0:eout((t-T(31,'ودفعتيه'))/(T(32,'صعوبة')-T(31,'ودفعتيه')));
  const g=G(FG,560,lerp(1600,1300,k),2.6,90);ITEMS.key(g);const h=G(FG,560,lerp(1760,1460,k));el('ellipse',{class:'o',rx:60,ry:40,fill:'url(#skinP)'},h);
  if(t>=T(31,'الزربية')&&k<.05)el('circle',{cx:560,cy:1600,r:120,fill:'url(#glowG)',opacity:.6},FG);}],
// 33 Q2
[33,Q(2,33)],[34,CTA(34)],
// 35-37 answer 2: lock outside, slide key under
[35,(t)=>{if(t<T(35,'كتسدها')+.2){useBG('card');cam(t,540,960,1);show({},t);answerCard(t,T(35),2);return;}
  if(t<T(36)){useBG('corridor');cam(t,540,900,1.3);WARM.setAttribute('opacity',.2);const sl=t>=T(35,'كتزلق');show({rashid:at(700,1800,.85,{dark:.95,r:sl?[60,330]:[-60,60],ritem:'key',lid:.3})},t);return;}
  useBG('doorlow');cam(t,540,1200,1.1);show({},t);const g=G(FG,540,1420,3,90);ITEMS.key(g);el('circle',{cx:540,cy:1420,r:120,fill:'url(#glowG)',opacity:.6},FG);
  if(t>=T(37)){const a=G(FX,540,560,popS(t,T(37,'الباب')));el('rect',{class:'o',x:-120,y:-160,width:240,height:320,rx:12,fill:'url(#wood)'},a);el('path',{d:'M180 0 L340 0 M290 -50 L340 0 L290 50',stroke:'#2ecc71','stroke-width':20,fill:'none'},a);}
  if(t>=T(37,'السرجم')){const b=G(FX,540,880,popS(t,T(37,'السرجم'))*.8);el('rect',{class:'o',x:-120,y:-160,width:240,height:320,rx:10,fill:'#0b1226'},b);el('path',{d:'M-150 -190 L150 190 M150 -190 L-150 190',stroke:'#ff3b30','stroke-width':24,'stroke-linecap':'round'},b);}}],
// 38-41 three clocks: table, wall, nightstand — all stopped
[38,(t)=>{useBG('room');cam(t,540,kf(t,[[T(38),1000],[T(41),950]]),kf(t,[[T(38),1.0],[T(41),1.05]]));GRADE.setAttribute('opacity',.3);show({},t);
  const cs=[[860,1170,55,'الطبلة'],[560,330,80,'فالحيط'],[560,1130,50,'الكومودينة']];
  cs.forEach(([x,y,r,w],i)=>{const k=t<T(39,'ثلاثة')?1:1;clockFace(FG,x,y,r,[3,7,10][i],[10,40,25][i]);if(t>=T(40,w))el('circle',{cx:x,cy:y,r:r+30+8*Math.sin(t*6),fill:'none',stroke:'#ffd166','stroke-width':8},FG);});
  if(t>=T(39,'ثلاثة'))txt(FX,540,500,200,'3','#ffd166',{direction:'ltr',stroke:'#17120f','stroke-width':12,'paint-order':'stroke',opacity:t<T(40)?1:0});
  if(t>=T(41)){const g=G(FX,540,520,popS(t,T(41)));el('rect',{class:'o',x:-60,y:-90,width:40,height:180,rx:10,fill:'#fff'},g);el('rect',{class:'o',x:20,y:-90,width:40,height:180,rx:10,fill:'#fff'},g);}}],
// 42 a watchmaker never leaves a clock stopped
[42,(t)=>{useBG('card');cam(t,540,960,1);show({mansour:at(540,1750,1.05,{r:[70,40],ritem:'watch',rirot:0,lid:.3,smile:.2})},t);if(t>=T(42,'واقفة')){const g=G(FX,540,500,popS(t,T(42,'واقفة')));clockFace(g,0,0,110,6,0);el('path',{d:'M-150 -150 L150 150',stroke:'#ff3b30','stroke-width':22,'stroke-linecap':'round'},g);}
  el('rect',{x:0,y:0,width:1080,height:1920,fill:'#c9a46a',opacity:.18,style:'mix-blend-mode:multiply'},FX);}],
// 43-48 the small hands point to one spot: the mountain painting
[43,(t)=>{useBG('room');const z=t<T(45)?kf(t,[[T(43),1.0],[T(44),1.15]]):1.0;cam(t,540,kf(t,[[T(43),1000],[T(47),800]]),z);GRADE.setAttribute('opacity',.3);show({},t);
  const tgt=[300,520];const cs=[[860,1170,55],[560,330,80],[560,1130,50]];
  cs.forEach(([x,y,r])=>{const a=Math.atan2(tgt[0]-x,-(tgt[1]-y));const hl=t>=T(45,'الصغار');const g=G(FG,x,y);el('circle',{class:'o',r,fill:'#fbf6e8'},g);el('path',{d:`M0 0 L${Math.sin(.9)*r*.75} ${-Math.cos(.9)*r*.75}`,stroke:'#17120f','stroke-width':r*.07},g);
    el('path',{d:`M0 0 L${Math.sin(a)*r*.55} ${-Math.cos(a)*r*.55}`,stroke:hl?'#ff3b30':'#17120f','stroke-width':r*.13,'stroke-linecap':'round'},g);
    if(t>=T(47,'بعينيك')){const k=eout((t-T(47,'بعينيك'))/.8);el('path',{d:`M${x} ${y} L${lerp(x,tgt[0],k)} ${lerp(y,tgt[1],k)}`,stroke:'#ff3b30','stroke-width':6,'stroke-dasharray':'16 12'},FG);}});
  if(t>=T(47,'نفس')){el('circle',{cx:tgt[0],cy:tgt[1],r:30+10*Math.sin(t*8),fill:'#ff3b30'},FG);}
  if(t>=T(48,'لوحة'))el('rect',{x:150,y:410,width:300,height:220,fill:'none',stroke:'#ffd166','stroke-width':12,opacity:Math.abs(Math.sin(t*4))},FG);}],
// 49 Q3
[49,Q(3,49)],[50,CTA(50)],
// 51-53 answer 3: clocks stopped to act like arrows
[51,(t)=>{if(t<T(52)){useBG('card');cam(t,540,960,1);show({},t);answerCard(t,T(51),3);if(t>=T(51,'الفلاشات')){for(let i=0;i<3;i++){const g=G(FX,250+i*290,1000,popS(t,T(51,'الفلاشات')+i*.1));el('path',{d:'M-90 0 L60 0 M10 -50 L60 0 L10 50',stroke:'#ffd166','stroke-width':24,fill:'none','stroke-linecap':'round'},g);}}return;}
  useBG('room');cam(t,320,560,kf(t,[[T(52),1.4],[T(54),1.9]]));GRADE.setAttribute('opacity',.25);show({},t);el('rect',{x:150,y:410,width:300,height:220,fill:'none',stroke:'#ffd166','stroke-width':10},FG);
  if(t>=T(53,'رسالة')){const g=G(FX,780,420,popS(t,T(53,'رسالة')));el('rect',{class:'o',x:-90,y:-60,width:180,height:120,rx:10,fill:'#f6efdc'},g);el('path',{d:'M-90 -60 L0 10 L90 -60',fill:'none',stroke:'#17120f','stroke-width':6},g);}}],
// 54-57 take down the painting; note glued behind; two words, shaky
[54,(t)=>{useBG('card');cam(t,540,960,1);show({},t);const flip=t>=T(55,'فاللور');const k=t<T(54,'بشوية')?0:eout((t-T(54,'بشوية'))/.6);
  const g=G(FG,540,lerp(700,900,k),1.4);if(!flip){el('rect',{class:'o',x:-140,y:-100,width:280,height:200,rx:6,fill:'#c9a46a','stroke-width':8},g);el('rect',{x:-118,y:-80,width:236,height:160,fill:'#8fb3d9'},g);el('path',{d:'M-118 80 L-40 -40 L10 20 L60 -50 L118 80Z',fill:'#5a6a86'},g);}
  else{el('rect',{class:'o',x:-140,y:-100,width:280,height:200,rx:6,fill:'#9a7a4a','stroke-width':8},g);const n=G(g,0,0,popS(t,T(55,'ورقة'))||.001,-4);el('rect',{class:'o',x:-80,y:-50,width:160,height:100,rx:4,fill:'#fff6c8'},n);
    if(t>=T(56,'جوج'))for(let i=0;i<2;i++){el('path',{d:`M${-60+i*70} 0 q10 -${18+i*4} 20 0 t20 0`,stroke:'#17120f','stroke-width':4,fill:'none',transform:t>=T(57)?`translate(${Math.sin(t*50)*2} 0)`:''},n);}}}],
// 58-60 the writing is mirrored — look at the note on screen
[58,(t)=>{useBG('card');cam(t,540,960,1);show({},t);const g=paper(FG,540,760,820,360,-3);const tx=txt(g,0,40,120,'خلف الساعة','#2a1a12',{transform:'scale(-1 1)'});
  if(t>=T(59,'المراية')){const m=G(FX,540,1080,popS(t,T(59,'المراية')));el('rect',{class:'o',x:-140,y:-30,width:280,height:60,rx:30,fill:'#9fd4ff'},m);el('path',{d:'M0 -30 L0 30',stroke:'#fff','stroke-width':8},m);}
  if(t>=T(60))el('rect',{x:120,y:570,width:840,height:380,fill:'none',stroke:'#ffd166','stroke-width':10,opacity:Math.abs(Math.sin(t*4))},FG);}],
// 61-62 Zahra sees the note, silent, grips her shawl
[61,(t)=>{useBG('reception');cam(t,540,kf(t,[[T(61),960],[T(62),1080]]),kf(t,[[T(61),1.3],[T(62),1.6]]));WARM.setAttribute('opacity',.2);const grip=t>=T(62,'شدّات');
  show({zahra:CU({lid:.05,browUp:.8,brow:-.4,smile:-.5,ex:.2,ey:.5,r:grip?[40,60]:[110,250],l:grip?[-40,60]:[-110,250],rot:0})},t);if(grip)el('circle',{cx:540,cy:1150,r:60+6*Math.sin(t*30),fill:'none',stroke:'#ffd166','stroke-width':6},FG);}],
// 63 why is Zahra afraid of a small note?
[63,(t)=>{useBG('reception');cam(t,540,900,1.4);WARM.setAttribute('opacity',.2);show({zahra:CU({lid:.1,browUp:.6,brow:-.4,smile:-.5,ex:-.6})},t);txt(FX,820,520,200,'؟','#ffd166',{stroke:'#17120f','stroke-width':12,'paint-order':'stroke',opacity:popS(t,T(63,'خافت'))});}],
// 64-65 you hide the note; from then you watch Zahra differently
[64,(t)=>{const later=t>=T(65);useBG(later?'reception':'corridor');cam(t,540,later?900:1000,later?1.2:1.3);WARM.setAttribute('opacity',.2);
  if(!later)show({you:CU({r:t<T(64,'فجيبك')?[100,60]:[60,230],ritem:t<T(64,'فجيبك')?'note':'',ex:.6,lid:.25,smile:-.1})},t);
  else{show({you:at(200,1900,.9,{ex:1,lid:.45,brow:.6}),zahra:at(760,1760,.85,{ex:-.2,lid:.2,smile:-.2})},t);el('ellipse',{cx:760,cy:1050,rx:200,ry:260,fill:'none',stroke:'#ffd166','stroke-width':6,'stroke-dasharray':'18 12'},FG);}}],
// 66-67 Q4 read it backwards
[66,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(67)){quizCard(t,T(66),4);return;}const g=paper(FG,540,900,820,360,-3);txt(g,0,40,120,'خلف الساعة','#2a1a12',{transform:'scale(-1 1)'});
  const a=G(FX,540,1180,popS(t,T(67,'للول')));el('path',{d:'M260 0 L-260 0 M-200 -50 L-260 0 L-200 50',stroke:'#ffd166','stroke-width':20,fill:'none'},a);}],
[68,CTA(68)],
// 69 answer 4: "behind the clock"
[69,(t)=>{useBG('card');cam(t,540,960,1);show({},t);answerCard(t,T(69),4);const g=paper(FX,540,1000,820,300,0);const k=t<T(69,'خلف')?0:eout((t-T(69,'خلف'))/.5);txt(g,0,40,120,'خلف الساعة','#2a1a12',{transform:`scale(${lerp(-1,1,k)} 1)`});}],
// 70-72 but the hotel is full of clocks
[70,(t)=>{useBG('card');cam(t,540,960,1);show({},t);const cs=[[300,760,'الكوزينة',71],[780,760,'الاستقبال',71],[540,1150,'الصالون',71]];
  if(t>=T(70,'بالساعات'))for(let i=0;i<9;i++){const a=i/9*Math.PI*2+t*.3;clockFace(FG,540+Math.cos(a)*400,960+Math.sin(a)*600,40,i,i*7);}
  if(t>=T(71)){FG.innerHTML='';[[300,760,T(71,'فالكوزينة')],[780,760,T(71,'فالاستقبال')],[540,1150,T(71,'كبيرة')]].forEach(([x,y,t0],i)=>{const k=popS(t,t0);if(k<=0)return;const g=G(FG,x,y,k);if(i<2)clockFace(g,0,0,120,i?9:4,i?5:50);else bigClock(g,0,300,.55,{h:11,m:40});});}
  if(t>=T(72,'شكون'))txt(FX,540,380,200,'؟','#ffd166',{stroke:'#17120f','stroke-width':12,'paint-order':'stroke'});}],
// 73 everyone gathered in the salon by the fire
[73,(t)=>{useBG('salon');cam(t,540,1060,kf(t,[[T(73),.9],[T(74),1.0]]));WARM.setAttribute('opacity',.4);
  show({zahra:at(130,1800,.62,{ex:.4}),ilyas:at(300,1830,.62,{ex:.3}),hamid:at(470,1850,.62,{ex:.1}),salma:at(640,1850,.62,{ex:-.1}),rashid:at(810,1830,.62,{ex:-.3}),you:at(970,1800,.62,{ex:-.6})},t);
  const f=G(FG,840,1060);for(let i=0;i<3;i++)el('ellipse',{cx:-40+i*40,cy:-30*Math.sin(t*9+i),rx:36,ry:70+10*Math.sin(t*7+i),fill:'url(#fireG)'},f);bigClock(FG,560,1180,.8,{h:11,m:40});}],
// 74 Zahra: at 23:40 I was at reception with Ilyas
[74,(t)=>{closeUp(t,'reception','zahra',{lid:.2,brow:.1,smile:-.1,ex:.2},74,{warm:.25});if(t>=T(74,'وإلياس')){show({zahra:CU({mouth:talkIn(t,74),lid:.2,ex:.4}),ilyas:at(900,1700,.8,{ex:-.6,smile:.2})},t);} clockFace(FX,180,300,70,11,40);}],
// 75 Ilyas red cap: true, we were counting the day's money
[75,(t)=>{closeUp(t,'reception','ilyas',{lid:.25,smile:.2,ritem:t>=T(75,'الفلوس')?'note':'',r:[100,100]},75,{warm:.25});}],
// 76 uncle Hamid: in the kitchen kneading
[76,(t)=>{closeUp(t,'kitchen','hamid',{lid:.2,smile:.3,l:[-60+Math.sin(t*8)*20,220],r:[60-Math.sin(t*8)*20,220]},76,{warm:.25});const d=G(FG,540,1080+1.2*220);el('ellipse',{class:'o',rx:110,ry:50,fill:'#f2e3c4'},d);}],
// 77 Zahra: he was singing, heard at reception
[77,(t)=>{useBG('kitchen');cam(t,540,950,1.25);WARM.setAttribute('opacity',.25);show({hamid:CU({mouth:Math.abs(Math.sin(t*6))*.5,lid:.4,smile:.4})},t);
  for(let i=0;i<3;i++){const ph=((t*.7+i/3)%1);txt(FX,780+ph*120,700-ph*300,70,'♪','#ffd166',{direction:'ltr',opacity:Math.sin(ph*Math.PI)});}}],
// 78 Salma red coat: alone in my room reading
[78,(t)=>{closeUp(t,'bedroom','salma',{lid:.25,smile:.1,ritem:t>=T(78,'كنقرا')?'notebook':'',r:[80,80]},78,{warm:.15});if(t>=T(78,'بوحدي'))txt(FX,850,520,90,'1','#ffd166',{direction:'ltr'});}],
// 79 Dr Rashid glasses, leather bag: slept early, tired from the road
[79,(t)=>{closeUp(t,'bedroom','rashid',{lid:.4,smile:.1,litem:t>=T(79,'والشنطة')?'bag':'',l:[-110,230]},79,{warm:.15});}],
// 80 and you, by the fire; Hamid passed with tea
[80,(t)=>{useBG('salon');cam(t,600,1000,1.15);WARM.setAttribute('opacity',.45);const pass=t>=T(80,'وحميد');show({you:at(420,1850,.85,{ex:pass?.7:0,lid:.3,smile:.2,ritem:pass?'tea':'',r:[90,120]}),hamid:pass?at(lerp(1200,820,eout((t-T(80,'وحميد'))/.6)),1850,.85,{ritem:'tray',r:[110,150],lid:.3,smile:.3}):null},t);
  const f=G(FG,840,1060);for(let i=0;i<3;i++)el('ellipse',{cx:-40+i*40,cy:-30*Math.sin(t*9+i),rx:36,ry:70+10*Math.sin(t*7+i),fill:'url(#fireG)'},f);}],
// 81 Q5
[81,(t)=>{useBG('card');cam(t,540,960,1);show({},t);quizCard(t,T(81),5);}],[82,CTA(82)],
// 83-86 answer 5: Salma and Rashid; alone ≠ guilty; find who lies
[83,(t)=>{useBG('card');cam(t,540,960,1);if(t<T(83,'جوج')+.3){show({},t);answerCard(t,T(83),5);return;}
  const two=t>=T(83,'سلمى');show({salma:at(330,1750,.9,{lid:.2,ex:.3,op:two?1:.3}),rashid:at(750,1750,.9,{lid:.3,ex:-.3,op:t>=T(83,'ورشيد')?1:.3})},t);
  if(t>=T(85)){const k=popS(t,T(85,'مجرم'));const g=G(FX,540,420,k);el('rect',{class:'o',x:-200,y:-70,width:400,height:140,rx:30,fill:'#3b4766'},g);el('path',{d:'M-100 0 L100 0',stroke:'#fff','stroke-width':14},g);el('path',{d:'M-30 -50 L30 50',stroke:'#ff3b30','stroke-width':14},g);}
  if(t>=T(86,'كيكذب')){FX.innerHTML='';txt(FX,540,420,220,'؟','#ffd166',{stroke:'#17120f','stroke-width':12,'paint-order':'stroke'});}}],
// 87-88 morning, dining room; Rashid drinks coffee alone
[87,(t)=>{useBG('dining');cam(t,540,kf(t,[[T(87),950],[T(89),1000]]),kf(t,[[T(87),1.0],[T(89),1.1]]));WARM.setAttribute('opacity',.25);GRADE.setAttribute('opacity',.1);
  show({rashid:at(540,1900,.95,{litem:'cup',l:[-40,60],lid:.35,ey:.3})},t);if(t>=T(87,'الصباح')){el('circle',{cx:880,cy:330,r:60,fill:'#ffe08a',opacity:.8},FX);}}],
// 89 you fake dizziness, fall on chair beside him
[89,(t)=>{useBG('dining');cam(t,540,1000,1.1);WARM.setAttribute('opacity',.25);GRADE.setAttribute('opacity',.1);const f=t>=T(89,'وطحتي');const wob=t<T(89,'وطحتي')?Math.sin(t*6)*8:0;
  show({rashid:at(760,1900,.9,{litem:'cup',l:[-40,60],lid:.35,ex:-.6}),you:at(330,f?1960:1900,.9,{lean:wob+(f?10:0),lid:.6,hrot:wob,smile:-.2})},t);
  if(!f)for(let i=0;i<3;i++){const a=t*5+i*2.1;el('circle',{cx:330+Math.cos(a)*90,cy:1000+Math.sin(a)*30,r:12,fill:'#ffd166'},FG);}}],
// 90 Rashid jumps: don't worry, I'm a doctor
[90,(t)=>{const j=t<T(90,'نقز')+.3?Math.sin(cl((t-T(90,'نقز'))/.3)*Math.PI)*60:0;closeUp(t,'dining','rashid',{hdy:-j,lid:.1,browUp:.6,smile:.2,ex:.3},90,{warm:.25,grade:.1});}],
// 91-92 thumb on your wrist; 'pulse is fine'
[91,(t)=>{useBG('card');cam(t,540,960,1);show({},t);const g=G(FG,540,900,1.4);el('path',{class:'o',d:'M-500 -60 L60 -60 L60 60 L-500 60Z',fill:'#56656a'},g);el('rect',{class:'o',x:40,y:-70,width:300,height:140,rx:60,fill:'url(#skinP)'},g);
  const k=eout((t-T(91,'وحط'))/.5);const th=G(g,lerp(420,140,k),lerp(-260,-40,k));el('path',{class:'o',d:'M0 0 Q-20 -10 -10 -60 L60 -140 Q90 -150 100 -120 L40 -40 Z',fill:'url(#skinC)'},th);
  if(t>=T(91,'الكبير'))el('circle',{cx:540+140*1.4,cy:900-40*1.4,r:46,fill:'none',stroke:'#ff3b30','stroke-width':8,opacity:Math.abs(Math.sin(t*6))},FG);
  if(t>=T(92)){const ph=((t*1.2)%1);el('path',{d:`M200 1250 L380 1250 L420 1170 L460 1330 L500 1250 L880 1250`,stroke:'#2ecc71','stroke-width':10,fill:'none','stroke-dasharray':'900','stroke-dashoffset':900*(1-ph)},FG);}
  const ly=T(92,'وقال');if(t>=ly){show({},t);} }],
// 93-96 back to his coffee as if nothing; you smile, but something is off
[93,(t)=>{useBG('dining');const me=t>=T(94);cam(t,me?330:760,1000,1.3);WARM.setAttribute('opacity',.25);GRADE.setAttribute('opacity',.1);
  show({rashid:at(760,1900,.9,{litem:'cup',l:[-40,60],lid:.35,ey:.4}),you:at(330,1900,.9,{smile:t>=T(94,'وابتاسمتي')?.6:0,lid:.3,ex:.6,brow:t>=T(95)?.6:0})},t);
  if(t>=T(95,'ما'))txt(FX,330,560,180,'؟','#ffd166',{stroke:'#17120f','stroke-width':12,'paint-order':'stroke'});
  if(t>=T(96,'طبيب')){const g=G(FX,760,520,popS(t,T(96,'طبيب')));el('circle',{r:80,fill:'#fff',stroke:'#17120f','stroke-width':6},g);el('path',{d:'M-40 0 L40 0 M0 -40 L0 40',stroke:'#ff3b30','stroke-width':18},g);}}],
// 97 Q6
[97,(t)=>{useBG('card');cam(t,540,960,1);show({},t);quizCard(t,T(97),6);}],[98,CTA(98)],
// 99-102 answer 6: thumb has its own pulse; doctors use two fingers
[99,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(99,'شدّ')){answerCard(t,T(99),6);return;}
  const two=t>=T(101);const g=G(FG,540,900,1.3);el('rect',{class:'o',x:-120,y:-70,width:500,height:140,rx:60,fill:'url(#skinP)'},g);
  if(!two){const th=G(g,90,-30);el('path',{class:'o',d:'M0 0 Q-20 -10 -10 -60 L60 -140 Q90 -150 100 -120 L40 -40 Z',fill:'url(#skinC)'},th);if(t>=T(100,'نبض'))for(let i=0;i<2;i++)el('circle',{cx:90,cy:-50,r:(30+((t*1.5+i/2)%1)*90),fill:'none',stroke:'#ff3b30','stroke-width':6,opacity:1-((t*1.5+i/2)%1)},g);
    const x=G(FX,540,500,popS(t,T(100,'يغلّط')));el('path',{d:'M-80 -80 L80 80 M80 -80 L-80 80',stroke:'#ff3b30','stroke-width':22,'stroke-linecap':'round'},x);}
  else{for(let i=0;i<2;i++)el('rect',{class:'o',x:40+i*60,y:-200,width:50,height:180,rx:25,fill:'url(#skinC)'},g);const ok=G(FX,540,500,popS(t,T(101,'السبابة')));el('circle',{r:80,fill:'#2ecc71'},ok);el('path',{d:'M-34 0 L-8 28 L40 -28',stroke:'#fff','stroke-width':18,fill:'none'},ok);}
  if(t>=T(102)){FG.innerHTML='';show({rashid:at(540,1750,1.0,{lid:.4,ex:.5,smile:.1})},t);const g2=G(FX,540,500,popS(t,T(102,'طبيب')));el('circle',{r:80,fill:'#fff',stroke:'#17120f','stroke-width':6},g2);el('path',{d:'M-40 0 L40 0 M0 -40 L0 40',stroke:'#ff3b30','stroke-width':18},g2);el('path',{d:'M-110 -110 L110 110',stroke:'#ff3b30','stroke-width':16},g2);}}],
// 103-105 reception: when did Dr Rashid arrive? she checks the register
[103,(t)=>{useBG('reception');const q=t>=T(104);cam(t,540,960,1.05);WARM.setAttribute('opacity',.25);
  show({zahra:at(620,1640,.85,{lid:.25,ex:-.6,mouth:t>=T(105)?talkIn(t,105):0,l:t>=T(105,'قلبات')&&t<T(105,'وقالت')?[-80,200]:[-110,250]}),you:at(160,1900,.9,{ex:.8,lid:.2,mouth:q&&t<T(105)?talkIn(t,104):0})},t);
  if(t>=T(105,'فالكناش')){const b=G(FG,540,1080);el('rect',{class:'o',x:-150,y:-20,width:300,height:60,rx:6,fill:'#7a1f2b'},b);el('rect',{x:-140,y:-14,width:280,height:20,fill:'#f4ecd8'},b);}
  if(t>=T(105,'فالطوموبيل')){const c=G(FX,540,420,popS(t,T(105,'فالطوموبيل')));el('rect',{class:'o',x:-170,y:-50,width:340,height:110,rx:30,fill:'#c0392b'},c);el('rect',{class:'o',x:-100,y:-110,width:200,height:70,rx:20,fill:'#9fd4ff'},c);el('circle',{cx:-100,cy:60,r:32,fill:'#17120f'},c);el('circle',{cx:100,cy:60,r:32,fill:'#17120f'},c);}}],
// 106-108 the road has been blocked 2 days; even the milk truck
[106,(t)=>{if(t<T(107)){closeUp(t,'reception','zahra',{lid:.2,ex:.3,brow:.3},106,{all:true,warm:.25});return;}
  useBG('ext');cam(t,320,1600,1.4);GRADE.setAttribute('opacity',.3);snow(t,100,1,2);el('path',{d:'M-200 1640 Q200 1500 600 1700',stroke:'#fff','stroke-width':120,fill:'none'},FG);
  if(t>=T(107,'جوج')){const g=G(FX,540,420,popS(t,T(107,'جوج')));for(let i=0;i<2;i++){el('rect',{class:'o',x:-130+i*140,y:-80,width:120,height:150,rx:12,fill:'#fff'},g);el('rect',{x:-130+i*140,y:-80,width:120,height:40,rx:12,fill:'#ff3b30'},g);}}
  if(t>=T(108)){const k=eout((t-T(108))/1.5);const tr=G(FG,lerp(-200,150,k),1560,.9);el('rect',{class:'o',x:-120,y:-150,width:240,height:150,rx:12,fill:'#f4f4f6'},tr);el('rect',{class:'o',x:120,y:-110,width:110,height:110,rx:12,fill:'#2f7dd1'},tr);el('circle',{cx:-60,cy:10,r:30,fill:'#17120f'},tr);el('circle',{cx:170,cy:10,r:30,fill:'#17120f'},tr);
    if(k>.7){const x=G(FX,300,1100,popS(t,T(108)+1.1));el('path',{d:'M-70 -70 L70 70 M70 -70 L-70 70',stroke:'#ff3b30','stroke-width':20,'stroke-linecap':'round'},x);}}}],
// 109-112 parking: knee-deep snow, only 2 cars buried to the roof, none is Rashid's
[109,(t)=>{useBG('parking');cam(t,540,kf(t,[[T(109),1100],[T(111),1180]]),kf(t,[[T(109),1.0],[T(111),1.15]]));GRADE.setAttribute('opacity',.25);snow(t,60,.9,1);
  if(t<T(111))show({you:at(540,1950,.95,{lid:.2,ex:Math.sin(t)*.6,ey:.3})},t);else show({},t);
  if(t>=T(110)&&t<T(111))el('rect',{x:-200,y:1720,width:1500,height:300,fill:'url(#snowG)'},FG);
  if(t>=T(111,'جوج'))txt(FX,540,480,200,'2','#ffd166',{direction:'ltr',stroke:'#17120f','stroke-width':12,'paint-order':'stroke'});
  if(t>=T(112,'ماشي')){FX.innerHTML='';[300,780].forEach((x,i)=>{const g=G(FX,x,760,popS(t,T(112,'ماشي')+i*.15));el('path',{d:'M-60 -60 L60 60 M60 -60 L-60 60',stroke:'#ff3b30','stroke-width':18,'stroke-linecap':'round'},g);});}}],
// 113 Q7
[113,(t)=>{useBG('card');cam(t,540,960,1);show({},t);quizCard(t,T(113),7);}],[114,CTA(114)],
];
