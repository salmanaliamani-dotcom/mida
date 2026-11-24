const Q=(n,line)=>(t)=>{useBG('card');cam(t,540,960,1);show({},t);quizCard(t,T(line),n);};
const X=(p,x,y,k,s=1)=>{const g=G(p,x,y,k*s);el('path',{d:'M-70 -70 L70 70 M70 -70 L-70 70',stroke:'#ff3b30','stroke-width':20,'stroke-linecap':'round'},g);return g;};
const OK=(p,x,y,k,s=1)=>{const g=G(p,x,y,k*s);el('circle',{r:80,fill:'#2ecc71',stroke:'#17120f','stroke-width':6},g);el('path',{d:'M-34 0 L-8 28 L40 -28',stroke:'#fff','stroke-width':18,fill:'none','stroke-linecap':'round'},g);return g;};
const QM=(x,y,k=1)=>{if(k>0)txt(FX,x,y,200*k,'؟','#ffd166',{stroke:'#17120f','stroke-width':12,'paint-order':'stroke'});};
const fire=(x,y)=>{const f=G(FG,x,y);for(let i=0;i<3;i++)el('ellipse',{cx:-40+i*40,cy:-30*Math.sin(t0g*9+i),rx:36,ry:70+10*Math.sin(t0g*7+i),fill:'url(#fireG)'},f);};let t0g=0;
function bootsRow(t,o={}){[[300,40,6,'ربعين'],[540,42,7,'وجوج'],[780,44,8,'وربعة']].forEach(([x,n,ln,w])=>{boot(FG,x,1500,1.1,n,n===44);if(t>=T(ln)&&t<T(ln)+1.2&&o.hl!==false)el('circle',{cx:x+20,cy:1380,r:190,fill:'none',stroke:'#ffd166','stroke-width':10},FG);});}
const SHOTS=[
// 1-3 answer 7: Rashid lies; came on foot, was nearby before
[1,(t)=>{if(t<T(2)){useBG('card');cam(t,540,960,1);show({},t);answerCard(t,T(1),7);if(t>=T(1,'كيكذب'))show({rashid:at(540,1850,.7,{lid:.3,ex:-.4,smile:.2})},t);return;}
  if(t<T(3)){useBG('ext');cam(t,540,1300,1.2);GRADE.setAttribute('opacity',.45);snow(t,90,1,2);const nf=t>=T(2,'وطلع');
    if(!nf){const c=G(FX,540,500,popS(t,T(2,'فالطوموبيل')));el('rect',{class:'o',x:-170,y:-50,width:340,height:110,rx:30,fill:'#c0392b'},c);el('rect',{class:'o',x:-100,y:-110,width:200,height:70,rx:20,fill:'#9fd4ff'},c);X(c,0,0,1,1.4);}
    else{const k=cl((t-T(2,'وطلع'))/1.4);show({rashid:at(lerp(-60,420,k),lerp(1950,1700,k),lerp(.7,.5,k),{walk:t*7,dark:.6,lid:.3,litem:'bag',l:[-110,230]})},t);for(let i=0;i<8;i++){if(i/8<k)footprint(FG,lerp(-60,420,i/8)+((i%2)?20:-20),lerp(1980,1730,i/8),0,.9,'#7d8aa6',.7);}}return;}
  useBG('card');cam(t,540,960,1);show({rashid:at(540,1750,.95,{lid:.35,ex:.5,brow:.5,smile:.2,dark:.2})},t);if(t>=T(3,'حاجة'))QM(820,520);}],
// 4-9 back door at night: three snow boots 40/42/44; the 44 is wet
[4,(t)=>{useBG('backdoor');const z=t<T(5)?1.0:t<T(9)?1.05:1.6;cam(t,t<T(9)?540:780,t<T(9)?1150:1420,kf(t,[[T(4),1.0],[T(5),1.05],[T(9),1.05],[T(9)+.5,1.6]]));GRADE.setAttribute('opacity',.45);
  if(t<T(5))show({you:at(540,1950,.9,{walk:t*6,ex:-.4,lid:.2})},t);else show({},t);
  if(t>=T(5,'ثلاثة'))bootsRow(t);
  if(t>=T(6)){[[300,'ديال',6,'ilyas'],[540,'ديال',7,'hamid']].forEach(([x,w,ln,k])=>{if(t>=T(ln,'ديال')){const g=G(FX,x,700,popS(t,T(ln,'ديال'))*.32);const c=makeMini(g,k);}});}
  if(t>=T(8,'مول')){QM(780,760,popS(t,T(8,'مول'))*.8);}}],
// 10-14 outside: big footprints along the wall, stop under window 7, loop back
[10,(t)=>{useBG('wallout');cam(t,kf(t,[[T(10),400],[T(12),300],[T(13),420]]),kf(t,[[T(10),1500],[T(12),900],[T(14),1300]]),kf(t,[[T(10),1.0],[T(12),1.15],[T(14),.95]]));GRADE.setAttribute('opacity',.4);snow(t,70,.9,1);
  const path=[[220,1640],[380,1700],[520,1650],[600,1520],[620,1380],[560,1250],[470,1180],[380,1230],[330,1360],[300,1500],[250,1620]];
  const k=t<T(11)?0:t<T(13)?cl((t-T(11))/(T(13)-T(11)))*.55:.55+cl((t-T(13))/(T(14)-T(13)))*.45;
  path.forEach(([x,y],i)=>{if(i/path.length<=k){const nx=path[Math.min(i+1,path.length-1)];const r=Math.atan2(nx[0]-x,-(nx[1]-y))*57;footprint(FG,x,y,r,1.1,'#5d6a86',.75);}});
  if(t>=T(12,'السرجم')){el('rect',{x:50,y:-310,width:180,height:170,fill:'none',stroke:'#ffd166','stroke-width':10,opacity:Math.abs(Math.sin(t*4))},FG);txt(FG,140,-340,80,'7','#ffd166',{direction:'ltr'});}
  if(t>=T(14)){const g=G(FX,540,480,popS(t,T(14)));el('path',{d:'M-150 60 Q-150 -100 0 -100 Q150 -100 150 60 M110 20 L150 60 L190 20',stroke:'#ffd166','stroke-width':18,fill:'none','stroke-linecap':'round'},g);}}],
[15,Q(8,15)],[16,CTA(16)],
// 17-19 answer 8: he is searching too; whoever knows wouldn't search the snow
[17,(t)=>{if(t<T(17,'كيقلب')){useBG('card');cam(t,540,960,1);show({},t);answerCard(t,T(17),8);return;}
  if(t<T(18)){useBG('wallout');cam(t,400,1300,1.1);GRADE.setAttribute('opacity',.45);snow(t,60,.9,1);show({rashid:at(420,1700,.8,{dark:.85,ey:-1,hrot:-10,l:[-150,-20],lid:.1})},t);const g=G(FX,760,480,popS(t,T(17,'منصور')));el('circle',{r:70,fill:'none',stroke:'#ffd166','stroke-width':16},g);el('path',{d:'M50 50 L120 120',stroke:'#ffd166','stroke-width':22,'stroke-linecap':'round'},g);return;}
  useBG('card');cam(t,540,960,1);show({rashid:at(540,1750,.95,{dark:.85,lid:.3,ex:.3})},t);if(t>=T(19,'ما'))QM(820,520);if(t>=T(18,'فالثلج'))X(FX,540,420,popS(t,T(18,'فالثلج')),.9);}],
// 20-22 morning kitchen, Hamid kneading, flour to his cheeks, whispers
[20,(t)=>{useBG('kitchen');const cu=t>=T(21,'والطحين');cam(t,540,cu?880:1000,cu?kf(t,[[T(21,'والطحين'),1.3],[T(22),1.7]]):1.05);WARM.setAttribute('opacity',.3);GRADE.setAttribute('opacity',.08);
  show({hamid:at(540,1780,1.05,{l:[-60+Math.sin(t*8)*20,220],r:[60-Math.sin(t*8)*20,220],lid:.3,smile:.2,mouth:t>=T(22)?talkIn(t,22)*.7:0,lean:t>=T(22)?5:0,hdx:t>=T(22)?20:0})},t);const d=G(FG,540,1780-560*1.05+220*1.05);el('ellipse',{class:'o',rx:120,ry:54,fill:'#f2e3c4'},d);}],
// 23-24 every night a tray: bread, olives, teapot; morning empty, put back
[23,(t)=>{useBG('kitchen');cam(t,540,1100,1.25);WARM.setAttribute('opacity',.3);GRADE.setAttribute('opacity',t<T(24)?.45:.05);show({},t);const g=G(FG,540,1100,1.6);el('ellipse',{class:'o',cx:0,cy:0,rx:220,ry:50,fill:'#c9b16a'},g);
  const empty=t>=T(24,'خاوية');if(!empty){if(t>=T(23,'خبزة')){const b=G(g,-120,-20,popS(t,T(23,'خبزة')));el('path',{class:'o',d:'M-60 0 Q-60 -60 0 -60 Q60 -60 60 0Z',fill:'#d99a4e'},b);}
    if(t>=T(23,'وزيتون')){const o=G(g,10,-10,popS(t,T(23,'وزيتون')));el('ellipse',{class:'o',rx:40,ry:16,fill:'#fff'},o);for(let i=0;i<4;i++)el('ellipse',{cx:-20+i*13,cy:-8,rx:8,ry:6,fill:'#3a4a1a'},o);}
    if(t>=T(23,'وبراد')){const tp=G(g,130,-10,popS(t,T(23,'وبراد')));ITEMS.tea(tp);}}
  else{const b=G(g,-120,-10);el('path',{d:'M-40 0 Q-30 -10 -20 0',stroke:'#d99a4e','stroke-width':6,fill:'none'},b);}
  if(t<T(24))el('circle',{cx:860,cy:330,r:60,fill:'#ffe9a8',opacity:.8},FX);else el('circle',{cx:860,cy:330,r:70,fill:'#ffd166'},FX);}],
// 25-27 one more thing: the big clock in the salon stopped chiming since that night; 30 years
[25,(t)=>{if(t<T(26)){closeUp(t,'kitchen','hamid',{lid:.2,brow:.3,ex:.3},25,{all:true,warm:.3,grade:.05});return;}
  useBG('salon');cam(t,560,kf(t,[[T(26),900],[T(28),800]]),kf(t,[[T(26),1.0],[T(28),1.3]]));WARM.setAttribute('opacity',.35);show({},t);bigClock(MID,560,1180,.8,{h:11,m:40});
  if(t<T(27,'ودابا')){for(let i=0;i<3;i++){const ph=((t*.9+i/3)%1);el('path',{d:`M${560+140+ph*80} ${700-ph*40} q20 30 0 60`,stroke:'#ffd166','stroke-width':8,fill:'none',opacity:1-ph},FG);}}
  if(t>=T(27,'ثلاثين'))txt(FX,540,420,170,'30','#ffd166',{direction:'ltr',stroke:'#17120f','stroke-width':12,'paint-order':'stroke',opacity:t<T(27,'ودابا')?1:0});
  if(t>=T(27,'سكتات')){const g=G(FX,800,520,popS(t,T(27,'سكتات')));el('path',{d:'M-30 -18 L-12 -18 L10 -38 L10 38 L-12 18 L-30 18Z',fill:'#fff'},g);el('path',{d:'M-50 -50 L50 50',stroke:'#ff5a4e','stroke-width':10},g);}}],
// 28-29 out of the kitchen: the tray on the counter, hot bread, steaming teapot
[28,(t)=>{useBG('kitchen');cam(t,540,1120,1.4);WARM.setAttribute('opacity',.35);GRADE.setAttribute('opacity',.05);show({},t);const g=G(FG,540,1100,1.6);ITEMS.tray(g);
  if(t>=T(29)){for(let i=0;i<3;i++){const ph=((t*.8+i/3)%1);el('path',{d:`M${540+100+i*14} ${960-ph*200} q-20 -30 0 -60`,stroke:'#fff','stroke-width':8,fill:'none',opacity:.6*(1-ph)},FG);}}}],
[30,Q(9,30)],[31,CTA(31)],
// 32-35 answer 9: someone feeds a hidden person -> Mansour alive, inside; who brings the tray?
[32,(t)=>{if(t<T(33)){useBG('card');cam(t,540,960,1);show({},t);answerCard(t,T(32),9);return;}
  useBG('card');cam(t,540,960,1);const alive=t>=T(34);show({mansour:at(540,1750,1.0,{dark:alive?.6:.95,lid:.3,smile:.2})},t);const tr=G(FG,540,1150,1.4);ITEMS.tray(tr);
  if(alive)el('path',{d:'M300 400 L380 400 L410 340 L450 460 L480 400 L780 400',stroke:'#2ecc71','stroke-width':12,fill:'none'},FX);if(t>=T(34,'داخل')){const g=G(FX,540,560,popS(t,T(34,'داخل')));el('path',{class:'o',d:'M-120 60 L-120 -40 L0 -120 L120 -40 L120 60Z',fill:'#7a5a48'},g);}
  if(t>=T(35))QM(540,780);}],
// 36-38 Salma comes with her camera; couldn't sleep, took night photos; shows you one
[36,(t)=>{if(t<T(37,'ما')){useBG('salon');cam(t,540,950,1.1);WARM.setAttribute('opacity',.3);show({salma:at(lerp(900,640,eout((t-T(36))/.8)),1850,.9,{walk:t<T(36)+.8?t*7:undefined,ritem:'camera',r:[90,110],lid:.2,smile:.2}),you:at(250,1880,.9,{ex:.8,lid:.25})},t);return;}
  closeUp(t,'salon','salma',{ritem:'camera',r:t<T(38)?[90,110]:[120,-20],rbend:-1,lid:.2,smile:.2},37,{warm:.3});if(t>=T(37,'تصاور')&&t<T(38)){for(let i=0;i<2;i++)if(Math.floor(t*3)%3===i)el('rect',{x:0,y:0,width:1080,height:1920,fill:'#fff',opacity:.25},FX);}}],
// 39-42 the photo: dark stairs, camera time 02:10, someone coming down, red cap, tray with teapot
[39,(t)=>{useBG('stairs');cam(t,540,kf(t,[[T(39),1000],[T(42),900]]),kf(t,[[T(39),1.0],[T(42),1.15]]));GRADE.setAttribute('opacity',.55);
  const who=t>=T(41,'واحد');show({ilyas:who?at(560,1300,.75,{dark:t<T(42,'طاقية')?.92:.55,ritem:t>=T(42,'صينية')?'tray':'',r:[110,170],walk:t*1.5,lid:.3}):null},t);
  el('rect',{x:30,y:180,width:1020,height:1560,fill:'none',stroke:'#fff','stroke-width':14},FX);
  if(t>=T(40,'الجوج')){const g=G(FX,780,1660);el('rect',{x:-200,y:-50,width:400,height:90,rx:12,fill:'#000',opacity:.6},g);txt(g,0,22,64,'02:10','#ff8a2a',{direction:'ltr'});}
  if(t>=T(42,'حمرا'))el('circle',{cx:560,cy:1300-150*.75-90,r:110,fill:'none',stroke:'#ffd166','stroke-width':8},FG);}],
// 43-45 you ask Ilyas where he was at 2; 'asleep since 11'; turns to the wall
[43,(t)=>{useBG('reception');cam(t,700,960,1.25);WARM.setAttribute('opacity',.25);const away=t>=T(45,'دار');
  show({ilyas:at(720,1760,.9,{flip:away,hrot:away?-10:0,ex:away?.9:-.3,lid:.2,mouth:t>=T(44)&&t<T(45)?talkIn(t,44):0}),you:at(200,1900,.9,{ex:.9,lid:.25,mouth:t<T(44)?talkIn(t,43):0})},t);
  if(t>=T(44,'الحداش'))clockFace(FX,880,440,80,11,0);if(t>=T(43,'الجوج')&&t<T(44))clockFace(FX,880,440,80,2,0);}],
[46,Q(10,46)],[47,CTA(47)],
// 48-50 answer 10: Ilyas lies; photo doesn't; you show him; he looks down
[48,(t)=>{if(t<T(49)){useBG('card');cam(t,540,960,1);show({},t);answerCard(t,T(48),10);if(t>=T(48,'التصويرة'))OK(FX,540,1000,popS(t,T(48,'التصويرة')));return;}
  useBG('reception');cam(t,560,980,1.2);WARM.setAttribute('opacity',.25);const down=t>=T(50,'وطيّح');show({ilyas:at(720,1760,.9,{lid:down?.75:.1,ey:down?1:0,hdy:down?20:0,brow:down?-.6:0,smile:-.4}),you:at(260,1900,.9,{ex:.9,lid:.25,r:[160,-40],rbend:-1,ritem:'camera'})},t);}],
// 51-55 'sorry, I promised'; promised who?; can't say the name; 'bring the tray to the clock that never errs'; runs off
[51,(t)=>{const sp=t<T(52)?51:t<T(53)?52:t<T(54)?53:54;const you=sp===52;useBG('reception');cam(t,you?260:720,950,1.3);WARM.setAttribute('opacity',.25);
  if(t>=T(55)){useBG('kitchen');cam(t,540,1000,1.0);show({ilyas:at(lerp(500,1300,cl((t-T(55,'وهرب'))/1)),1850,.85,{walk:t*10,lid:.2,brow:-.5})},t);return;}
  show({ilyas:at(720,1760,.9,{lid:.5,ey:.6,brow:-.6,smile:-.4,mouth:!you?talkIn(t,sp):0}),you:at(260,1900,.9,{ex:.9,lid:.25,mouth:you?talkIn(t,52):0})},t);
  if(t>=T(54,'الساعة')){const g=G(FX,540,460,popS(t,T(54,'الساعة'))*.5);bigClock(g,0,500,1,{h:11,m:40});QM(700,380);}}],
// 56-61 three clocks: kitchen +5 min, reception loses 1 min/day, big one pendulum stopped; none seems infallible... or?
[56,(t)=>{useBG('salon');cam(t,540,960,1);WARM.setAttribute('opacity',.25);GRADE.setAttribute('opacity',.45);show({you:at(540,1900,.85,{lid:.3,brow:.5,ex:Math.sin(t)*.5,r:[60,-60],rbend:-1})},t);
  if(t>=T(57)){FG.innerHTML='';show({},t);[[250,'الكوزينة',57,'+5'],[540,'الاستقبال',58,'−1'],[830,'الكبيرة',59,'||']].forEach(([x,w,ln,tag],i)=>{const k=popS(t,T(ln));if(k<=0)return;const g=G(FG,x,820,k);if(i<2)clockFace(g,0,0,120,i?6:3,i?59:5);else bigClock(g,0,330,.42,{h:11,m:40});
    const tg=G(g,0,i<2?200:240);el('rect',{class:'o',x:-90,y:-44,width:180,height:80,rx:20,fill:i<2?'#ff8a2a':'#3b4766'},tg);txt(tg,0,18,52,tag,'#fff',{direction:'ltr'});});
    if(t>=T(58,'نهار'))txt(FG,540,1120,40,'/ day','#ffd166',{direction:'ltr'});
    if(t>=T(60,'ما')&&t<T(61))[250,540,830].forEach((x,i)=>X(FX,x,820,popS(t,T(60,'ما')+i*.1),.8));if(t>=T(61))QM(540,520);}}],
[62,(t)=>{useBG('card');cam(t,540,960,1);show({},t);quizCard(t,T(62),11);if(t>=T(62,'واقفة')){const g=G(FX,300,1100,popS(t,T(62,'واقفة')));clockFace(g,0,0,110,4,0);}if(t>=T(62,'كتأخر')){const g=G(FX,780,1100,popS(t,T(62,'كتأخر')));clockFace(g,0,0,110,3,59);}}],[63,CTA(63)],
// 64-67 answer 11: the stopped clock is right twice a day; the slow one only after ~2 years
[64,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(65)){answerCard(t,T(64),11);return;}
  if(t<T(66)){const g=G(FG,540,820,1.3);clockFace(g,0,0,170,4,0);for(let i=0;i<2;i++){const k=popS(t,T(65,'جوج')+i*.25);if(k>0)OK(FG,350+i*380,1250,k,.8);}txt(FG,540,1180,90,'×2','#ffd166',{direction:'ltr'});return;}
  if(t<T(67)){const g=G(FG,540,820,1.2);clockFace(g,0,0,160,3,59);const k=cl((t-T(66,'كترجع'))/1.5);el('path',{d:'M200 1200 L880 1200',stroke:'#3b4766','stroke-width':30,'stroke-linecap':'round'},FG);el('path',{d:`M200 1200 L${200+680*k} 1200`,stroke:'#ff8a2a','stroke-width':30,'stroke-linecap':'round'},FG);if(t>=T(66,'جوج'))txt(FG,540,1330,90,'≈ 2','#ffd166',{direction:'ltr'});return;}
  useBG('salon');cam(t,560,850,kf(t,[[T(67),1.0],[T(68),1.4]]));WARM.setAttribute('opacity',.3);bigClock(MID,560,1180,.8,{h:11,m:40,glow:.8});}],
// 68-71 Salma calls you, takes you to her room, shuts the door: 'I'm following someone hotel to hotel'
[68,(t)=>{if(t<T(70)){useBG('bedroom');cam(t,540,980,1.05);WARM.setAttribute('opacity',.15);show({salma:at(700,1820,.9,{l:t<T(69)?[-170,-60]:[-110,250],lid:.2,mouth:0,ex:-.6}),you:at(330,1840,.9,{walk:t<T(69,'للبيت')?t*7:undefined,lid:.25,ex:.6})},t);
   if(t>=T(69,'وسدّات'))el('rect',{x:960,y:500,width:40,height:900,fill:'#3a2414'},FG);return;}
  closeUp(t,'bedroom','salma',{lid:.2,brow:.4,ritem:'notebook',r:[100,140]},t<T(71)?70:71,{all:false,warm:.15});if(t>=T(70,'الجبال')){const g=G(FX,840,480,popS(t,T(70,'الجبال'))*.8);el('path',{d:'M-90 60 L-20 -50 L20 10 L60 -40 L110 60Z',fill:'#5a6a86'},g);X(g,0,0,1,1);}
  if(t>=T(71,'فندق')){for(let i=0;i<3;i++){const g=G(FX,200+i*340,480,popS(t,T(71,'فندق')+i*.15)*.6);el('path',{class:'o',d:'M-90 60 L-90 -40 L0 -110 L90 -40 L90 60Z',fill:'#7a5a48'},g);if(i<2)el('path',{d:'M110 0 L230 0 M190 -30 L230 0 L190 30',stroke:'#ffd166','stroke-width':12,fill:'none'},g);}}}],
// 72-76 notebook: 3 hotels in 3 cities; each: an old clock stolen; a guest vanished; names Rashid, Shdir, Dirsh
[72,(t)=>{useBG('card');cam(t,540,960,1);show({},t);const g=G(FG,540,960,1);el('rect',{class:'o',x:-420,y:-600,width:840,height:1140,rx:20,fill:'#8e2a20'},g);el('rect',{x:-390,y:-570,width:780,height:1080,rx:10,fill:'#f4ecd8'},g);
  for(let i=0;i<3;i++){const y=-430+i*300;if(t<T(73,'ثلاثة')+i*.2)continue;const r=G(g,0,y);el('path',{class:'o',d:'M200 50 L200 -30 L270 -80 L340 -30 L340 50Z',fill:'#7a5a48'},r);
    if(t>=T(74,'تسرقات')){const c=G(r,60,0,.9);clockFace(c,0,0,46,10,10);X(c,0,0,popS(t,T(74,'تسرقات')+i*.15)*.6);}
    if(t>=T(75,'ضيف')){const p=G(r,-90,10,popS(t,T(75,'ضيف')+i*.15)*.9);el('circle',{cy:-30,r:30,fill:'#3b4766'},p);el('path',{d:'M-40 50 Q0 -10 40 50Z',fill:'#3b4766'},p);txt(p,60,-10,70,'?','#ff3b30',{direction:'ltr'});}
    if(t>=T(76,['رشيد','شدير','ديرش'][i])){txt(r,-250,30,80,['رشيد','شدير','ديرش'][i],'#2a1a12');}}}],
[77,(t)=>{useBG('card');cam(t,540,960,1);show({},t);quizCard(t,T(77),12);['رشيد','شدير','ديرش'].forEach((n,i)=>txt(FX,540,1000+i*130,100,n,'#fff',{opacity:popS(t,T(77)+.3+i*.1)}));}],[78,CTA(78)],
// 79-81 answer 12: same letters shuffled -> same man; Dr Rashid
[79,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(79,'الحروف')){answerCard(t,T(79),12);return;}
  const L=['ر','ش','ي','د'];const P=[[0,1,2,3],[1,3,2,0],[3,2,0,1]];const ph=t<T(80)?0:Math.min(2,Math.floor((t-T(80))/.6));
  for(let r=0;r<3;r++){const ord=P[r];ord.forEach((li,j)=>{const x=780-j*170,y=640+r*240;const g=G(FG,x,y,1);el('rect',{class:'o',x:-70,y:-80,width:140,height:150,rx:20,fill:['#ff8a2a','#4fc3ff','#2ecc71','#ffd166'][li]},g);txt(g,0,40,110,L[li],'#17120f');});}
  if(t>=T(81)){FG.innerHTML='';show({rashid:at(540,1750,1.0,{lid:.35,smile:.2,litem:'bag',l:[-110,230]})},t);const g=G(FX,540,460,popS(t,T(81,'كتقلب')));el('circle',{r:80,fill:'none',stroke:'#ffd166','stroke-width':16},g);el('path',{d:'M56 56 L120 120',stroke:'#ffd166','stroke-width':22,'stroke-linecap':'round'},g);}}],
// 82-84 evening: Rashid walks out by the back door; his room door left ajar; you slip in
[82,(t)=>{if(t<T(83)){useBG('backdoor');cam(t,540,1100,1.0);GRADE.setAttribute('opacity',.4);show({rashid:at(lerp(700,560,cl((t-T(82))/1.5)),lerp(1900,1500,cl((t-T(82))/1.5)),lerp(.9,.6,cl((t-T(82))/1.5)),{walk:t*7,lid:.3,dark:.3})},t);return;}
  useBG('corridor');cam(t,540,kf(t,[[T(83),1000],[T(84)+.5,850]]),kf(t,[[T(83),1.0],[T(84)+.5,1.4]]));WARM.setAttribute('opacity',.2);el('rect',{x:740,y:340,width:30,height:960,fill:'#ffcf6a',opacity:.8},FG);
  if(t>=T(84))show({you:at(lerp(300,620,cl((t-T(84))/1)),1850,.85,{walk:t*5,lid:.2,ex:.6})},t);}],
// 85-91 the leather bag on the bed: no medicine; a big ring of old keys; a note '7 / 23:30'; under the bed a size-44 boot
[85,(t)=>{useBG('bedroom');cam(t,540,kf(t,[[T(85),1100],[T(88),1050],[T(91),1300]]),kf(t,[[T(85),1.1],[T(86),1.5],[T(91),1.2]]));GRADE.setAttribute('opacity',.3);show({},t);
  const open=t>=T(86);const b=G(FG,540,1120,1.4);el('rect',{class:'o',x:-140,y:-20,width:280,height:180,rx:24,fill:'#7a4a26'},b);if(!open){el('path',{class:'o',d:'M-60 -20 Q-60 -90 0 -90 Q60 -90 60 -20',fill:'none','stroke-width':12},b);}else{el('path',{class:'o',d:'M-140 -20 L-110 -120 L110 -120 L140 -20Z',fill:'#5c3519'},b);}
  if(t>=T(87)&&t<T(88)){X(FX,380,520,popS(t,T(87,'دوا')),.7);X(FX,700,520,popS(t,T(87,'أدوات')),.7);}
  if(t>=T(88,'حلقة')){const k=G(FG,540,1050,popS(t,T(88,'حلقة'))*3.2);ITEMS.keys(k);}
  if(t>=T(89,'ورقة')){const n=paper(FX,540,620,520,300,-3);const s=G(n,0,0,popS(t,T(89,'ورقة')));if(t>=T(90))txt(s,-110,40,140,'7','#2a1a12',{direction:'ltr'});if(t>=T(90,'والحداش'))txt(s,110,40,110,'23:30','#2a1a12',{direction:'ltr'});}
  if(t>=T(91)){FX.innerHTML='';boot(FG,700,1460,1.0,44,false);}}],
// 92-93 footsteps in the corridor; you put everything back and slip out
[92,(t)=>{useBG('corridor');cam(t,540,1000,1.0,t<T(93)?3:0);WARM.setAttribute('opacity',.15);GRADE.setAttribute('opacity',.45);
  if(t<T(93)){for(let i=0;i<4;i++){const ph=((t*1.4+i/4)%1);footprint(FG,180+i*60,1600-ph*40,-20,1,'#ffd166',.4*(1-ph));}show({rashid:at(80,1900,.85,{dark:.9})},t);}
  else show({you:at(lerp(560,1150,cl((t-T(93,'وخرجتي'))/1)),1850,.85,{walk:t*9,lid:.1,browUp:.8})},t);}],
[94,(t)=>{useBG('card');cam(t,540,960,1);show({},t);quizCard(t,T(94),13);const n=paper(FX,540,1150,520,260,-3);txt(n,-110,40,120,'7','#2a1a12',{direction:'ltr'});txt(n,110,40,100,'23:30','#2a1a12',{direction:'ltr'});}],[95,CTA(95)],
// 96-99 answer 13: room 7 at 23:30 — ten minutes before; room empty; Mansour knew
[96,(t)=>{if(t<T(97)){useBG('corridor');cam(t,540,800,1.3);WARM.setAttribute('opacity',.2);show({},t);answerCard(t,T(96),13);if(t>=T(96,'الحداش'))clockFace(FX,540,1100,120,11,30);return;}
  if(t<T(98)){useBG('card');cam(t,540,960,1);show({},t);const g=G(FG,540,800,1);clockFace(g,0,0,200,11,t<T(97,'عشر')?30:lerp(30,40,cl((t-T(97,'عشر'))/.8)));if(t>=T(97,'عشر'))txt(FG,540,1150,120,'10 min','#ffd166',{direction:'ltr'});return;}
  if(t<T(99)){useBG('room');cam(t,540,1000,1.0);GRADE.setAttribute('opacity',.4);show({rashid:at(540,1900,.95,{lid:0,browUp:1,brow:-.5,ex:Math.sin(t*4)*.8,litem:'keys',l:[-130,150]})},t);return;}
  useBG('card');cam(t,540,960,1);show({mansour:at(540,1750,1.0,{lid:.3,smile:.3,ex:.3,brow:.3,ritem:'watch',r:[90,90]})},t);el('rect',{x:0,y:0,width:1080,height:1920,fill:'#c9a46a',opacity:.15,style:'mix-blend-mode:multiply'},FX);}],
// 100-104 you go to Zahra: 'you know something'; she sighs, pulls a letter; 'Mansour said show nobody'; came 3 days ago, no name
[100,(t)=>{useBG('reception');const zs=t>=T(102);cam(t,zs?620:500,960,zs?1.3:1.1);WARM.setAttribute('opacity',.25);
  const sp=t<T(101)?0:t<T(102)?101:t<T(103)?102:t<T(104)?103:104;
  show({zahra:at(640,1720,.9,{lid:sp===102?.6:.2,brow:-.2,mouth:sp===103||sp===104?talkIn(t,sp):0,r:t>=T(102,'وخرّجات')?[100,60]:[110,250],ritem:t>=T(102,'وخرّجات')?'letter':'',rbend:-1}),you:at(180,1900,.9,{ex:.9,lid:.2,mouth:sp===101?talkIn(t,101):0,walk:t<T(101)?t*6:undefined})},t);
  if(t>=T(104,'ثلاثة'))txt(FX,540,440,150,'3','#ffd166',{direction:'ltr',stroke:'#17120f','stroke-width':12,'paint-order':'stroke',opacity:t<T(104,'بلا')?1:0});if(t>=T(104,'سمية')){const g=G(FX,540,440,popS(t,T(104,'سمية')));el('rect',{class:'o',x:-140,y:-50,width:280,height:100,rx:20,fill:'#fff'},g);txt(g,0,22,64,'???','#17120f',{direction:'ltr'});}}],
// 105-111 the four-line letter on screen
[105,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t>=T(110)&&t<T(111))quizCard(t,T(110),14);const lines=['رد بالك، شي حد جاي.','شاف الساعة الذهبية ديالك.','يتبعك من مدينة لمدينة.','دابا راه قريب منك.'];
  const top=t>=T(110)&&t<T(111)?1150:820;const p=paper(FG,540,top,900,t>=T(110)&&t<T(111)?560:720,-2);
  lines.forEach((s,i)=>{if(t>=T(106+i)-.05){const e=txt(p,380,(-200+i*130)*(t>=T(110)&&t<T(111)?.75:1),62,s,'#2a1a12',{'text-anchor':'start'});}});
  if(t>=T(111))el('rect',{x:80,y:440,width:920,height:760,fill:'none',stroke:'#ffd166','stroke-width':10,opacity:Math.abs(Math.sin(t*4))},FG);}],
[112,CTA(112)],
];
function makeMini(g,k){const c=makeChar(g,k);c.update({t:0,x:0,y:0,s:1,lid:.3});setTimeout(()=>{},0);return c;}
