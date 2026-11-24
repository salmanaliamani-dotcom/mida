const Q=(n,line)=>(t)=>{useBG('card');cam(t,540,960,1);show({},t);quizCard(t,T(line),n);};
const X=(p,x,y,k,s=1)=>{const g=G(p,x,y,k*s);el('path',{d:'M-70 -70 L70 70 M70 -70 L-70 70',stroke:'#ff3b30','stroke-width':20,'stroke-linecap':'round'},g);return g;};
const OK=(p,x,y,k,s=1)=>{const g=G(p,x,y,k*s);el('circle',{r:80,fill:'#2ecc71',stroke:'#17120f','stroke-width':6},g);el('path',{d:'M-34 0 L-8 28 L40 -28',stroke:'#fff','stroke-width':18,fill:'none','stroke-linecap':'round'},g);return g;};
const QM=(x,y,k=1)=>{if(k>0)txt(FX,x,y,200*k,'؟','#ffd166',{stroke:'#17120f','stroke-width':12,'paint-order':'stroke'});};
function fireAt(t,x,y){const f=G(FG,x,y);for(let i=0;i<3;i++)el('ellipse',{cx:-40+i*40,cy:-30*Math.sin(t*9+i),rx:36,ry:70+10*Math.sin(t*7+i),fill:'url(#fireG)'},f);}
function oldPhoto(p,x,y,s,crack=true){const g=G(p,x,y,s);el('rect',{class:'o',x:-230,y:-300,width:460,height:600,rx:8,fill:'#6a4a2e','stroke-width':8},g);el('rect',{x:-200,y:-270,width:400,height:540,fill:'url(#sepia)'},g);
  bigClock(g,-40,200,.55,{wide:0,sepia:true,h:3,m:0});const m=G(g,110,250,.42);el('path',{class:'o',d:'M-90 30 L90 30 L98 300 L-98 300Z',fill:'#8a6a42'},m);el('circle',{class:'o',cx:0,cy:-120,r:140,fill:'#d9b27a'},m);el('path',{class:'o',d:'M-140 -140 Q-140 -270 0 -270 Q140 -270 140 -140 Q100 -210 0 -210 Q-100 -210 -140 -140Z',fill:'#5a3a22'},m);
  if(crack)el('path',{d:'M-200 -200 L-60 -40 L-120 80 M-60 -40 L80 -100 L200 -60',stroke:'#fff',opacity:.7,'stroke-width':4,fill:'none'},g);
  el('rect',{x:-200,y:-270,width:400,height:540,fill:'#a07a40',opacity:.25,style:'mix-blend-mode:multiply'},g);return g;}
const SHOTS=[
// 1-3 answer 14: the first letters spell Rashid; someone wanted to warn Mansour
[1,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(1,'مخبية')){answerCard(t,T(1),14);return;}
  const lines=['رد بالك، شي حد جاي.','شاف الساعة الذهبية ديالك.','يتبعك من مدينة لمدينة.','دابا راه قريب منك.'];const p=paper(FG,540,820,900,720,-2);
  lines.forEach((s,i)=>{txt(p,380,-200+i*130,62,s,'#2a1a12',{'text-anchor':'start'});const hk=t>=T(2,['الراء','والشين','والياء','والدال'][i]);if(hk||t>=T(1,'اللولين')){el('circle',{cx:360,cy:-220+i*130,r:40,fill:'none',stroke:hk?'#ff3b30':'#ffd166','stroke-width':hk?9:5},p);}});
  if(t>=T(2,'رشيد')){const g=G(FX,540,1420,popS(t,T(2,'رشيد')));el('rect',{class:'o',x:-230,y:-80,width:460,height:150,rx:30,fill:'#ff3b30'},g);txt(g,0,40,110,'رشيد','#fff');}
  if(t>=T(3)){FG.innerHTML='';FX.innerHTML='';show({salma:at(540,1750,1.0,{dark:.9,ritem:'letter',r:[100,60],rbend:-1})},t);QM(820,520,popS(t,T(3)));}}],
// 4-5 Zahra: Mansour is my brother; this hotel was our father's
[4,(t)=>{closeUp(t,'reception','zahra',{lid:.25,smile:.1,brow:-.2,ex:.2},t<T(5)?4:5,{all:t>=T(5),warm:.3});if(t>=T(4,'خويا')){const g=G(FX,820,500,popS(t,T(4,'خويا')));el('path',{d:'M0 30 C-60 -20 -40 -70 0 -40 C40 -70 60 -20 0 30Z',fill:'#ff3b5c',stroke:'#17120f','stroke-width':5},g);}}],
// 6-9 old photo at reception: young Mansour by the big clock with his tools; 'he repaired it 30 years ago'; yellowed, cracked glass
[6,(t)=>{useBG('reception');const cu=t>=T(7);cam(t,540,cu?760:960,cu?kf(t,[[T(7),1.6],[T(9),1.9]]):1.1);WARM.setAttribute('opacity',.25);show(cu?{}:{zahra:at(760,1720,.85,{l:[-170,-80],lpoint:true,lid:.2,ex:-.6})},t);oldPhoto(FG,540,760,.6,t>=T(9,'مشقوق'));
  if(t>=T(8,'ثلاثين'))txt(FX,540,420,150,'30','#ffd166',{direction:'ltr',stroke:'#17120f','stroke-width':12,'paint-order':'stroke'});}],
// 10-13 you look at photo then at the big clock; closer; there's a difference
[10,(t)=>{const clk=t>=T(10,'شفتي',)&&t>=T(10,'الكبيرة')-.1;useBG('card');cam(t,540,960,1);show({},t);
  if(t<T(10,'الكبيرة')-.1){oldPhoto(FG,540,900,1.1,true);return;}
  oldPhoto(FG,290,900,.55,true);const g=G(FG,790,1180,.55);bigClock(g,0,0,1,{wide:1,h:5,m:12});
  if(t>=T(12)){const k=popS(t,T(12));el('rect',{x:640,y:1110,width:300,height:200,fill:'none',stroke:'#ffd166','stroke-width':10,opacity:.0},FG);QM(540,520,k);}}],
[14,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(15)){quizCard(t,T(14),15);return;}oldPhoto(FG,290,900,.55,true);bigClock(G(FG,790,1180,.55),0,0,1,{wide:1,h:5,m:12});
  for(let i=0;i<2;i++)el('rect',{x:i?620:60,y:520,width:i?340:460,height:760,fill:'none',stroke:'#ffd166','stroke-width':8,opacity:Math.abs(Math.sin(t*4+i))},FG);}],[16,CTA(16)],
// 17-20 answer 15: the base: thin then, now wide & tall to the wall -> room for a person
[17,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(17,'القاعدة')){answerCard(t,T(17),15);return;}
  const old=t<T(19);if(old){oldPhoto(FG,540,900,1.0,false);el('rect',{x:540-40-60,y:900+200*.55*1-30,width:240,height:170,fill:'none',stroke:'#ffd166','stroke-width':10},FG);return;}
  const w=t<T(19,'عريضة')?0:eout((t-T(19,'عريضة'))/.6);bigClock(G(FG,540,1180,1),0,0,1,{wide:w,h:5,m:12});if(t>=T(19,'للحيط'))el('path',{d:'M380 1180 L700 1180',stroke:'#ffd166','stroke-width':8,'stroke-dasharray':'20 12'},FG);
  if(t>=T(20,'لبنادم')){show({mansour:at(540,1370,.36,{dark:.95,op:.85})},t);}}],
// 21-23 you approach: pendulum still; no chime
[21,(t)=>{useBG('salon');cam(t,560,kf(t,[[T(21),950],[T(22),900]]),kf(t,[[T(21),1.0],[T(22),1.6]]));WARM.setAttribute('opacity',.3);show(t<T(22)?{you:at(lerp(250,400,cl((t-T(21))/1.5)),1880,.9,{walk:t*5,ex:.6,lid:.2})}:{},t);bigClock(MID,560,1180,.8,{wide:1,h:5,m:12});
  if(t>=T(22))el('rect',{x:500,y:900,width:120,height:200,fill:'none',stroke:'#ffd166','stroke-width':8},FG);if(t>=T(23,'كتدقش')){const g=G(FX,800,520,popS(t,T(23,'كتدقش')));el('path',{d:'M-30 -18 L-12 -18 L10 -38 L10 38 L-12 18 L-30 18Z',fill:'#fff'},g);el('path',{d:'M-50 -50 L50 50',stroke:'#ff5a4e','stroke-width':10},g);}}],
// 24-25 ear on the wood: something faint like breathing
[24,(t)=>{useBG('salon');cam(t,600,900,1.6);WARM.setAttribute('opacity',.3);bigClock(MID,560,1180,.8,{wide:1,h:5,m:12});show({you:at(760,1720,.9,{hrot:-15,hdx:-30,lid:t>=T(25)?.9:.3,ex:-.4})},t);
  if(t>=T(25,'النفس')){for(let i=0;i<3;i++){const ph=((t*.6+i/3)%1);el('path',{d:`M${560-ph*20} ${1000-ph*80} q30 -14 60 0`,stroke:'#cfe0ff','stroke-width':6,fill:'none',opacity:.7*Math.sin(ph*Math.PI)},FG);}}}],
// 26-31 phone 5:17, clock 5:17; a minute passes; minute hand moves, pendulum still, time correct
[26,(t)=>{useBG('card');cam(t,540,960,1);show({},t);const m=t<T(30,'تحرك')?17:lerp(17,18,eout((t-T(30,'تحرك'))/.6));
  const ph=G(FG,290,900,1);el('rect',{class:'o',x:-150,y:-280,width:300,height:560,rx:40,fill:'#14161b'},ph);el('rect',{x:-130,y:-260,width:260,height:520,rx:26,fill:'#1d3566'},ph);txt(ph,0,-40,90,t<T(29)?'05:17':'05:18','#fff',{direction:'ltr'});
  if(t>=T(27)){const g=G(FG,790,900,1);clockFace(g,0,0,190,5,m);}
  if(t>=T(29)&&t<T(30)){const k=cl((t-T(29))/.8);el('path',{d:arcPath(80,k*Math.PI*2*.99),fill:'none',stroke:'#ffd166','stroke-width':16,transform:'translate(540 1300)'},FX);}
  if(t>=T(31)){OK(FX,790,1250,popS(t,T(31,'صحيح')),.7);const g=G(FX,290,1300,popS(t,T(31)));el('rect',{class:'o',x:-40,y:-60,width:30,height:120,rx:8,fill:'#fff'},g);el('rect',{class:'o',x:10,y:-60,width:30,height:120,rx:8,fill:'#fff'},g);}}],
// 32 from inside: a small 'tick'
[32,(t)=>{useBG('salon');cam(t,560,1150,2.0);WARM.setAttribute('opacity',.3);bigClock(MID,560,1180,.8,{wide:1,h:5,m:18});if(t>=T(32,'تك')){const k=popS(t,T(32,'تك'));const g=G(FX,780,600,k);el('rect',{class:'o',x:-120,y:-70,width:240,height:130,rx:40,fill:'#fff'},g);txt(g,0,30,80,'تك!','#17120f');}}],
[33,Q(16,33)],[34,CTA(34)],
// 35-38 answer 16: someone moves the hands from inside -> Mansour hiding behind the clock; you don't open: Rashid still searching
[35,(t)=>{if(t<T(35,'كيحرك')){useBG('card');cam(t,540,960,1);show({},t);answerCard(t,T(35),16);return;}
  if(t<T(37)){useBG('salon');cam(t,560,950,1.2);WARM.setAttribute('opacity',.3);bigClock(MID,560,1180,.8,{wide:1,h:5,m:18});const xr=t>=T(36);el('rect',{x:440,y:1120,width:240,height:200,fill:'#000',opacity:xr?.55:0},FG);if(xr)show({mansour:at(560,1330,.3,{lid:.3,l:[-60,-200],lbend:-1})},t);
    if(!xr){const h=G(FG,560,720,1);el('circle',{r:26,fill:'url(#skinC)',stroke:'#17120f','stroke-width':4},h);}return;}
  useBG('salon');cam(t,520,950,1.1);WARM.setAttribute('opacity',.3);bigClock(MID,560,1180,.8,{wide:1,h:5,m:18});show({you:at(250,1880,.9,{l:[-110,250],r:[110,250],lid:.3,brow:.5,ex:.5}),rashid:t>=T(38)?at(900,1880,.85,{dark:.85,ex:-.8,lid:.3}):null},t);if(t<T(38))X(FX,540,500,popS(t,T(37,'حليتيهاش')),.8);}],
// 39-43 dinner: you stand and announce: tomorrow 9am police come, road open; then I'll open the big clock; Rashid stops eating
[39,(t)=>{useBG('dining');const sp=t>=T(40);const ra=t>=T(43);cam(t,ra?760:sp?300:540,ra?960:sp?960:1000,ra?1.5:sp?1.25:1.0);WARM.setAttribute('opacity',.3);GRADE.setAttribute('opacity',.25);
  show({you:at(300,sp?1820:1900,.85,{lid:.25,brow:.3,mouth:t>=T(41)&&t<T(43)?talkAll(t,t<T(42)?41:42):0,r:sp?[150,-40]:[110,250],rbend:-1}),zahra:at(520,1900,.7,{ex:-.6}),salma:at(660,1900,.7,{ex:-.8}),rashid:at(820,1900,.75,{ex:-.9,lid:ra?0:.3,browUp:ra?.8:0,litem:'cup',l:[-60,80]}),hamid:at(960,1900,.7,{ex:-.9}),ilyas:at(140,1900,.7,{ex:.6})},t);
  if(t>=T(41,'التسعود')&&t<T(42))clockFace(FX,880,440,80,9,0);if(t>=T(41,'البوليس')&&t<T(42)){const g=G(FX,200,440,popS(t,T(41,'البوليس'))*.35);const c=makeChar(g,'police');c.update({t,x:0,y:0,s:1,lid:.3});}
  if(t>=T(42,'الساعة')&&t<T(43))bigClock(G(FX,880,620,.3),0,0,1,{wide:1,h:9,m:0});}],
// 44-48 at night you take Hamid's flour, sprinkle a thin layer before the clock, hide behind the sofa
[44,(t)=>{const st=t<T(45)?0:t<T(46)?1:2;if(st<2){useBG('kitchen');cam(t,540,1000,1.1);GRADE.setAttribute('opacity',.6);show({you:at(lerp(200,540,cl((t-T(44))/1.4)),1880,.9,{walk:st===0?t*5:undefined,ritem:st===1?'flourbag':'',r:[110,140],lid:.2,ex:.5})},t);return;}
  useBG('salon');cam(t,560,1200,1.1);GRADE.setAttribute('opacity',.6);bigClock(MID,560,1180,.8,{wide:1,h:2,m:20});const k=cl((t-T(46,'ورشيتي'))/2.5);
  el('ellipse',{cx:560,cy:1460,rx:360*k,ry:70*k,fill:'#f4efe4',opacity:t>=T(47)?.18:.55},FG);
  if(t<T(48))show({you:at(820,1880,.9,{ritem:'flourbag',r:[-40,200],rirot:120,lid:.2,ey:.6})},t);else show({you:at(520,1640,.55,{lid:.2,ex:.6,op:1})},t);
  if(t<T(48)&&t>=T(46)){for(let i=0;i<8;i++){const ph=((t*1.5+i/8)%1);el('circle',{cx:700-ph*60+i*6,cy:1200+ph*240,r:5,fill:'#fff',opacity:1-ph},FG);}}
  if(t>=T(48,'الكنبة')){el('rect',{x:240,y:1380,width:560,height:240,rx:40,fill:'#2f5a4a'},FG);}}],
[49,Q(17,49)],[50,CTA(50)],
// 51-52 answer 17: flour keeps prints; anyone approaching leaves shoe marks
[51,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(51,'الطحين')){answerCard(t,T(51),17);return;}
  el('rect',{x:120,y:900,width:840,height:600,rx:40,fill:'#f4efe4',opacity:.8},FG);const n=Math.floor(cl((t-T(52,'الصباط'))/1.2)*6);for(let i=0;i<n;i++)footprint(FG,300+i*100+((i%2)?20:-20),1400-i*80,0,1.4,'#8a7a5a',.8);}],
// 53-56 2:30 am; light footsteps on stairs; a tall shadow with glasses; Rashid
[53,(t)=>{if(t<T(54)){useBG('card');cam(t,540,960,1);show({},t);clockFace(FG,540,850,260,2,30);return;}
  useBG('stairs');cam(t,540,kf(t,[[T(54),1100],[T(56),900]]),kf(t,[[T(54),1.0],[T(56),1.4]]));GRADE.setAttribute('opacity',.55);const k=cl((t-T(54))/3);
  show({rashid:at(lerp(300,620,k),lerp(700,1500,k),lerp(.45,.75,k),{dark:t<T(56)?.95:.4,walk:t*4,lid:.3})},t);
  if(t>=T(55,'بالنظارات')&&t<T(56)){const g=G(FX,540,500,popS(t,T(55,'بالنظارات')));for(const sx of [-60,60])el('circle',{cx:sx,cy:0,r:46,fill:'none',stroke:'#ffd166','stroke-width':12},g);el('path',{d:'M-14 0 L14 0',stroke:'#ffd166','stroke-width':12},g);}}],
// 57-58 he takes out the ring of keys; shoes print the flour step by step
[57,(t)=>{useBG('salon');cam(t,560,kf(t,[[T(57),1100],[T(58),1300]]),kf(t,[[T(57),1.0],[T(58),1.3]]));GRADE.setAttribute('opacity',.6);bigClock(MID,560,1180,.8,{wide:1,h:2,m:31});el('ellipse',{cx:560,cy:1460,rx:360,ry:70,fill:'#f4efe4',opacity:.2},MID);
  const k=cl((t-T(57))/(T(59)-T(57)));show({rashid:at(lerp(950,640,k),lerp(1600,1500,k),.8,{dark:.5,walk:t*5,ritem:t>=T(57,'حلقة')?'keys':'',r:[110,150],lid:.3})},t);
  if(t>=T(58)){const n=Math.floor(cl((t-T(58))/1.8)*7);for(let i=0;i<n;i++)footprint(MID,900-i*45,1520-((i%2)?14:-14),-90,1.0,'#cfc6b0',.9);}}],
// 59-61 lights on: Rashid in the middle of the flour, a trail behind; he startles, drops the keys
[59,(t)=>{useBG('salon');const on=t>=T(59,'الضو');cam(t,620,1180,kf(t,[[T(59),1.0],[T(61),1.25]]),t>=T(61)&&t<T(61)+.4?6:0);GRADE.setAttribute('opacity',on?.05:.6);WARM.setAttribute('opacity',on?.35:0);if(on&&t<T(59,'الضو')+.12)el('rect',{x:0,y:0,width:1080,height:1920,fill:'#fff',opacity:.7},FX);
  bigClock(MID,560,1180,.8,{wide:1,h:2,m:32});el('ellipse',{cx:560,cy:1460,rx:360,ry:70,fill:'#f4efe4',opacity:on?.85:.2},MID);for(let i=0;i<7;i++)footprint(MID,900-i*45,1520-((i%2)?14:-14),-90,1.0,'#8a7a5a',.9);
  const drop=t>=T(61,'وطيّح');show({rashid:at(640,1500,.8,{lid:t>=T(61)?0:.3,browUp:t>=T(61)?1:0,brow:-.5,ritem:drop?'':'keys',r:[110,150],hdy:t>=T(61)&&t<T(61)+.3?-20:0})},t);if(drop){const g=G(FG,700,lerp(1460,1590,cl((t-T(61,'وطيّح'))/.3)),1.6);ITEMS.keys(g);}}],
// 62-64 he smiles calmly: sorry, couldn't sleep; heard the big clock chiming, came down
[62,(t)=>{closeUp(t,'salon','rashid',{lid:.35,smile:.6,brow:.2,ex:.3},t<T(63)?62:t<T(64)?63:64,{all:t>=T(63),warm:.3,grade:.05});if(t>=T(64,'كتدق')){for(let i=0;i<3;i++){const ph=((t*.9+i/3)%1);el('path',{d:`M${820+ph*60} ${520-ph*40} q20 30 0 60`,stroke:'#ffd166','stroke-width':8,fill:'none',opacity:1-ph},FX);}}}],
// 65-66 he looks at you, waiting to be believed; everyone wakes: Zahra, Hamid, Ilyas, Salma
[65,(t)=>{if(t<T(66)){useBG('salon');cam(t,540,950,1.4);WARM.setAttribute('opacity',.3);GRADE.setAttribute('opacity',.05);show({rashid:CU({lid:.35,smile:.4,ex:.6,ey:.1})},t);return;}
  useBG('salon');cam(t,540,1100,.95);WARM.setAttribute('opacity',.3);GRADE.setAttribute('opacity',.05);bigClock(MID,560,1180,.8,{wide:1,h:2,m:33});
  const ap=(k,x,w)=>t>=T(66,w)?at(x,1880,.75,{lid:.4,ex:0,browUp:.6}):null;show({rashid:at(640,1600,.75,{lid:.3,smile:.2}),you:at(940,1880,.8,{ex:-.6,lid:.2}),zahra:ap('zahra',120,'زهرة'),hamid:ap('hamid',300,'وحميد'),ilyas:ap('ilyas',460,'وإلياس'),salma:ap('salma',800,'وسلمى')},t);}],
[67,Q(18,67)],[68,CTA(68)],
// 69-71 answer 18: the clock hasn't chimed since that night; Hamid said so; Rashid heard nothing — he came because he understood
[69,(t)=>{if(t<T(69,'الكبيرة')){useBG('card');cam(t,540,960,1);show({},t);answerCard(t,T(69),18);return;}
  if(t<T(70)){useBG('salon');cam(t,560,850,1.3);WARM.setAttribute('opacity',.3);bigClock(MID,560,1180,.8,{wide:1,h:2,m:33});const g=G(FX,820,520,popS(t,T(69,'دقاتش')));el('path',{d:'M-30 -18 L-12 -18 L10 -38 L10 38 L-12 18 L-30 18Z',fill:'#fff'},g);el('path',{d:'M-50 -50 L50 50',stroke:'#ff5a4e','stroke-width':10},g);return;}
  if(t<T(71)){closeUp(t,'kitchen','hamid',{lid:.25,brow:.3},70,{all:true,warm:.3,grade:.05});if(t>=T(70,'ثلاثين'))txt(FX,820,480,130,'30','#ffd166',{direction:'ltr',stroke:'#17120f','stroke-width':10,'paint-order':'stroke'});return;}
  useBG('salon');cam(t,640,950,1.4);WARM.setAttribute('opacity',.3);show({rashid:CU({x:640,lid:.5,smile:-.4,brow:-.6,ey:.5})},t);X(FX,820,520,popS(t,T(71,'والو')),.6);}],
// 72-73 Hamid and Ilyas block the stairs; nowhere to run
[72,(t)=>{useBG('salon');cam(t,360,1150,1.05);WARM.setAttribute('opacity',.3);show({hamid:at(220,1880,.85,{lid:.2,brow:.6,l:[-170,60],r:[170,60]}),ilyas:at(420,1880,.85,{lid:.2,brow:.6,l:[-170,60],r:[170,60]}),rashid:at(760,1700,.75,{lid:0,browUp:1,brow:-.5,ex:-.8})},t);
  if(t>=T(73))X(FX,300,520,popS(t,T(73,'يهرب')),.7);}],
// 74-77 you knock 3 times on the clock; silence; from inside 3 knocks reply; the base side opens slowly
[74,(t)=>{useBG('salon');cam(t,560,kf(t,[[T(74),1000],[T(77),1150]]),kf(t,[[T(74),1.3],[T(77),1.25]]));WARM.setAttribute('opacity',.35);const op=t<T(77)?0:eout((t-T(77,'تحل'))/1.2);
  bigClock(MID,560,1180,.8,{wide:1,h:2,m:34,open:op});const kn=[T(74,'ثلاث')+.0,T(74,'ثلاث')+.25,T(74,'مرات')];const rp=[T(76,'ثلاث'),T(76,'ثلاث')+.25,T(76,'ضربات')];
  show({you:at(860,1880,.9,{lid:.2,ex:-.6,l:kn.some(k=>t>=k&&t<k+.12)?[-230,-60]:[-200,-40]})},t);
  kn.forEach(k=>{if(t>=k&&t<k+.5){const g=G(FG,690,1100,popS(t,k)*.5,0,{opacity:1-(t-k)/.5});for(let i=0;i<8;i++){const a=i*Math.PI/4;el('path',{d:`M${Math.cos(a)*30} ${Math.sin(a)*30} L${Math.cos(a)*70} ${Math.sin(a)*70}`,stroke:'#ffd166','stroke-width':10},g);}}});
  rp.forEach(k=>{if(t>=k&&t<k+.5){const g=G(FG,560,1250,popS(t,k)*.6,0,{opacity:1-(t-k)/.5});for(let i=0;i<8;i++){const a=i*Math.PI/4;el('path',{d:`M${Math.cos(a)*30} ${Math.sin(a)*30} L${Math.cos(a)*70} ${Math.sin(a)*70}`,stroke:'#4fc3ff','stroke-width':10},g);}}});
  if(t>=T(75)&&t<T(76))txt(FX,540,480,110,'...','#fff',{direction:'ltr'});}],
// 78-80 an old man with white beard and small glasses steps out: Mansour, a gold watch shining
[78,(t)=>{useBG('salon');cam(t,560,kf(t,[[T(78),1150],[T(79),960]]),kf(t,[[T(78),1.2],[T(80),1.5]]));WARM.setAttribute('opacity',.35);bigClock(MID,560,1180,.8,{wide:1,h:2,m:34,open:1});
  const k=eout((t-T(78))/1.2);show({mansour:at(lerp(560,480,k),lerp(1330,1880,k),lerp(.4,.9,k),{lid:.3,smile:t>=T(79)?.4:0,ritem:t>=T(80,'ساعة')?'watch':'',r:[100,100]})},t);
  if(t>=T(80,'كتلمع')){const g=G(FX,780,620,1+Math.sin(t*8)*.1);el('path',{d:'M0 -60 L14 -14 L60 0 L14 14 L0 60 L-14 14 L-60 0 L-14 -14Z',fill:'#fff'},g);}}],
// 81-82 Zahra runs and hugs him; Mansour: I knew someone would understand the language of clocks
[81,(t)=>{useBG('salon');if(t<T(82)){const k=eout((t-T(81))/.8);cam(t,520,950,1.1);WARM.setAttribute('opacity',.4);show({mansour:at(480,1880,.9,{lid:.6,smile:.6,l:[-150,60],r:[150,60]}),zahra:at(lerp(950,640,k),1880,.88,{walk:k<1?t*9:undefined,lid:.6,smile:.6,l:[-200,60],r:[-40,60]})},t);if(k>=1)el('path',{d:'M560 540 C500 490 520 440 560 470 C600 440 620 490 560 540Z',fill:'#ff3b5c',stroke:'#17120f','stroke-width':5},FX);return;}
  closeUp(t,'salon','mansour',{lid:.3,smile:.4,ritem:'watch',r:[90,100],ex:.6},82,{warm:.4,grade:.05});}],
[83,Q(19,83)],[84,CTA(84)],
// 85-86 answer 19: Salma wrote the letter; she followed Rashid
[85,(t)=>{if(t<T(85,'سلمى')){useBG('card');cam(t,540,960,1);show({},t);answerCard(t,T(85),19);return;}useBG('bedroom');cam(t,540,960,1.2);WARM.setAttribute('opacity',.2);
  show({salma:CU({lid:.25,smile:.3,ritem:t<T(86)?'letter':'notebook',r:[100,80],rbend:-1})},t);if(t>=T(86)){for(let i=0;i<3;i++){const g=G(FX,200+i*340,460,popS(t,T(86,'فندق')+i*.15)*.5);el('path',{class:'o',d:'M-90 60 L-90 -40 L0 -110 L90 -40 L90 60Z',fill:'#7a5a48'},g);if(i<2)el('path',{d:'M110 0 L230 0 M190 -30 L230 0 L190 30',stroke:'#ffd166','stroke-width':12,fill:'none'},g);}}}],
// 87-89 dawn: snow stopped, road open; police take Rashid; stolen clocks found in his bag
[87,(t)=>{useBG('dawn');cam(t,540,kf(t,[[T(87),1000],[T(89),1300]]),kf(t,[[T(87),1.0],[T(89),1.15]]));WARM.setAttribute('opacity',.35);GRADE.setAttribute('opacity',.05);
  if(t>=T(88))show({police:at(560,1900,.8,{lid:.3,brow:.4,l:[-160,120]}),rashid:at(300,1900,.78,{lid:.6,ey:.8,smile:-.5,l:[60,200],r:[-60,200]})},t);
  if(t>=T(89,'الساعات')){const b=G(FG,820,1700,1.2);ITEMS.bag(b);for(let i=0;i<3;i++){const g=G(FX,250+i*290,520,popS(t,T(89,'الساعات')+i*.15)*.9);clockFace(g,0,0,70,i*4,i*15,{fill:'#ffe9a8',rim:'#7a5a12'});}}}],
// 90-97 by the fire, Mansour explains everything (recap visuals)
[90,(t)=>{const L=t<T(91)?90:t<T(92)?91:t<T(93)?92:t<T(94)?93:t<T(95)?94:t<T(96)?95:t<T(97)?96:97;useBG('salon');WARM.setAttribute('opacity',.45);GRADE.setAttribute('opacity',.05);
  if(L===90){cam(t,540,1100,.95);fireAt(t,840,1060);show({zahra:at(130,1880,.7,{ex:.4,smile:.3}),ilyas:at(290,1880,.7,{ex:.3,smile:.3}),mansour:at(480,1880,.75,{lid:.3,smile:.3,mouth:0}),salma:at(660,1880,.7,{ex:-.3,smile:.3}),hamid:at(820,1880,.7,{ex:-.4,smile:.3}),you:at(970,1880,.7,{ex:-.6,smile:.3})},t);return;}
  cam(t,540,960,1.25);show({mansour:CU({lid:.3,smile:.2,mouth:talkAll(t,L)*(L===91?(t>=quoteStart(91)?1:0):1)})},t);
  const P=G(FX,540,500,.8);el('rect',{class:'o',x:-260,y:-200,width:520,height:400,rx:30,fill:'#f6efdc'},P);
  if(L===91){const r=G(P,0,0);el('path',{class:'o',d:'M-80 60 L-80 -40 L0 -110 L80 -40 L80 60Z',fill:'#7a5a48'},r);txt(r,0,150,60,'?','#ff3b30',{direction:'ltr'});}
  if(L===92){el('rect',{class:'o',x:-120,y:-160,width:240,height:280,fill:'url(#wood)'},P);const k=G(P,lerp(0,0,1),lerp(140,100,cl((t-T(92,'وزلقت'))/.6)),1.4,90);ITEMS.key(k);}
  if(L===93){el('rect',{class:'o',x:-140,y:-160,width:280,height:300,fill:'#0b1226'},P);for(let i=0;i<10;i++)el('circle',{cx:-120+(i*53)%240,cy:-140+(i*97)%260,r:4,fill:'#fff'},P);}
  if(L===94){[[-150,-60],[0,60],[150,-60]].forEach(([x,y])=>clockFace(P,x,y,60,8,0));if(t>=T(94,'للورقة'))el('rect',{class:'o',x:-60,y:100,width:120,height:70,fill:'#fff6c8'},P);}
  if(L===95){bigClock(G(P,0,150,.33),0,0,1,{wide:1,h:5,m:17});}
  if(L===96){bigClock(G(P,-60,150,.33),0,0,1,{wide:1,h:5,m:17});const g=G(P,140,-40);el('path',{d:'M-30 -18 L-12 -18 L10 -38 L10 38 L-12 18 L-30 18Z',fill:'#17120f'},g);el('path',{d:'M-50 -50 L50 50',stroke:'#ff5a4e','stroke-width':10},g);}
  if(L===97){const m=G(P,0,190,.36);const c=makeChar(m,'ilyas');c.update({t,x:0,y:-300,s:1,lid:.3,smile:.5,ritem:'tray',r:[110,150]});}}],
// 98-99 Mansour hands you a small pocket watch: 'keep it; time always tells the truth, if you know how to listen'
[98,(t)=>{if(t<T(99)){useBG('salon');cam(t,540,1050,1.2);WARM.setAttribute('opacity',.45);GRADE.setAttribute('opacity',.05);const k=eout((t-T(98,'مدّ'))/.6);show({mansour:at(700,1880,.95,{lid:.3,smile:.5,l:[-110-80*k,150-40*k],litem:'watch'}),you:at(260,1900,.95,{lid:.2,smile:.3,ex:.6})},t);return;}
  closeUp(t,'salon','mansour',{lid:.3,smile:.5,ritem:'watch',r:[90,100]},99,{all:true,warm:.45,grade:.05});}],
// 100 in the salon the big clock chimes again
[100,(t)=>{useBG('salon');cam(t,560,kf(t,[[T(100),900],[T(101),850]]),kf(t,[[T(100),1.1],[T(101),1.4]]));WARM.setAttribute('opacity',.45);GRADE.setAttribute('opacity',.05);bigClock(MID,560,1180,.8,{wide:1,h:7,m:0,pend:t*3.2,glow:.5});
  for(let i=0;i<3;i++){const ph=((t*.9+i/3)%1);el('path',{d:`M${700+ph*80} ${700-ph*40} q20 30 0 60`,stroke:'#ffd166','stroke-width':8,fill:'none',opacity:1-ph},FG);}}],
// 101-102 twenty puzzles, one story; how many did you solve?
[101,(t)=>{useBG('card');cam(t,540,960,1);show({},t);const k=popS(t,T(101),.4);const g=G(FX,540,700,k);el('circle',{r:230,fill:'#ffd166',stroke:'#17120f','stroke-width':12},g);txt(g,0,70,220,'20','#17120f',{direction:'ltr'});
  if(t>=T(102)){const c=G(FX,540,1550,1);const kk=Math.min(20,Math.floor((t-T(102))*8));for(let i=0;i<20;i++){const x=-450+(i%10)*100,y=(Math.floor(i/10))*110;const pz=G(c,x,y,.9);el('path',{d:'M-34 -34 L-8 -34 A12 12 0 1 1 8 -34 L34 -34 L34 -8 A12 12 0 1 0 34 8 L34 34 L-34 34Z',fill:i<kk?'#ffd166':'#3b4766'},pz);}}}],
];
