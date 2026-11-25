function zodiac(p,x,y,s,t,o={}){const g=G(p,x,y+Math.sin(t*2.2)*8,s);el('path',{class:'o',d:'M-260 0 Q-280 -60 -200 -70 L220 -70 Q280 -50 260 20 Q240 60 180 60 L-200 60 Q-270 60 -260 0Z',fill:'#e05a1a'},g);el('path',{d:'M-230 -20 L230 -20',stroke:'#b23e0c','stroke-width':10},g);el('rect',{class:'o',x:-300,y:-60,width:50,height:120,rx:10,fill:'#2b2f38'},g);if(o.flag!==false){el('path',{d:'M200 -70 L200 -200',stroke:'#17120f','stroke-width':6},g);const fl=Math.sin(t*9)*6;el('path',{d:`M200 -200 L200 -160 L${200+(o.flagDir??1)*90} ${-170+fl}Z`,fill:'#ff3b30'},g);}return g;}
function islandMap(t,o={}){const g=G(FG,540,900);el('rect',{class:'o',x:-470,y:-620,width:940,height:1140,rx:16,fill:'#0f2236'},g);
  el('path',{class:'o',d:'M-200 -40 Q-160 -260 40 -240 Q240 -230 250 -20 Q250 200 40 230 Q-180 220 -200 -40Z',fill:'#3a3c44'},g);
  el('path',{d:'M-200 -40 Q-260 -10 -210 60',stroke:'#4fc3ff','stroke-width':10,fill:'none'},g);const hc=G(g,-230,20);el('circle',{r:44,fill:'none',stroke:'#ffd166','stroke-width':8},hc);
  txt(g,0,-560,48,'N','#fff',{direction:'ltr'});txt(g,0,500,48,'S','#fff',{direction:'ltr'});const lr=G(g,40,-200);const lit=.4+.6*Math.abs(Math.sin(t*3));el('circle',{r:12*lit+4,fill:'#ffe27a'},lr);
  return g;}
function windArrows(p,t,k=1,x0=540,y0=900){for(let i=0;i<5;i++){const ph=((t*.7+i/5)%1);const y=y0-500+ph*1000;el('path',{d:`M${x0-300+i*150} ${y-60} L${x0-300+i*150} ${y+60} M${x0-330+i*150} ${y+30} L${x0-300+i*150} ${y+60} L${x0-270+i*150} ${y+30}`,stroke:'#cfe6ff','stroke-width':8,fill:'none',opacity:k*Math.sin(ph*Math.PI)},p);}}
const SHOTS=[
// 1-2 answer 9: SOS (3 short, 3 long, 3 short) = help; sent by Si Larbi, left alone on the rock
[1,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(1,'إس')){answerCard(t,T(1),9);return;}
  if(t<T(2)){BIG('SOS',540,560,popS(t,T(1,'إس')),220);const row=(y,s,tt)=>{if(t>=tt){const g=G(FX,540,y,popS(t,tt));for(let i=0;i<3;i++)el(s==='s'?'circle':'rect',s==='s'?{cx:-120+i*120,cy:0,r:26,fill:'#ffe27a'}:{x:-170+i*120,y:-20,width:100,height:40,rx:20,fill:'#ffe27a'},g);}};
    row(900,'s',T(1,'قصار'));row(1020,'l',T(1,'طوال'));row(1140,'s',T(1,'قصار')+1.2);if(t>=T(1,'عتقوني'))LBL('عتقوني',540,1350,popS(t,T(1,'عتقوني')),80,'#ff3b30','#fff');return;}
  useBG('rocks');cam(t,540,1300,1.2);GRADE.setAttribute('opacity',.1);show({larbi:at(540,1500,.6,{lid:.6,smile:-.5,brow:-.5,r:[100,-40],rbend:-1,ritem:'torch'})},t);}],
// 3-4 Nadia: reach the hidden harbour unheard; at night engine sound carries far over water
[3,(t)=>{if(t<T(4)){closeUp(t,'nightsea','nadia',{lid:.2,brow:.5},3,{grade:.1,warm:0});return;}useBG('nightsea');cam(t,540,1150,1.0);GRADE.setAttribute('opacity',.1);zodiac(MID,540,1400,1.0,t);show({},t);
  for(let i=0;i<4;i++){const ph=((t*.8+i/4)%1);el('path',{d:`M${540+ph*500} ${1300-ph*200} a${60+ph*200} ${60+ph*200} 0 0 1 0 ${120+ph*400}`,stroke:'#ffd166','stroke-width':6,fill:'none',opacity:1-ph},FG);}}],
// 5-7 she looks at the little flag: wind from the north toward the south; sound travels with the wind
[5,(t)=>{useBG('nightsea');GRADE.setAttribute('opacity',.1);const flagCU=t<T(7);cam(t,flagCU?700:540,flagCU?1100:1000,flagCU?1.6:1.0);zodiac(MID,540,1400,1.0,t,{flagDir:1});show(flagCU?{}:{nadia:at(300,1550,.55,{lid:.2,mouth:talkIn(t,7)})},t);
  if(t>=T(6)){const g=G(FX,880,500,popS(t,T(6)));el('circle',{r:110,fill:'#fff',stroke:'#17120f','stroke-width':5},g);txt(g,0,-122,40,'N','#fff',{direction:'ltr'});el('path',{d:'M0 -80 L0 80 M-30 50 L0 80 L30 50',stroke:'#1d5fa8','stroke-width':14,fill:'none'},g);}
  if(t>=T(7))windArrows(FG,t,1,540,900);}],
// 8-11 hidden harbour on the west side; two approaches: north (close but exposed), south (10 min longer but behind rocks)
[8,(t)=>{useBG('card');cam(t,540,960,1);show({},t);islandMap(t);const k1=cl((t-T(10))/1.2),k2=cl((t-T(11))/1.6);
  if(t>=T(10)){el('path',{d:`M540 260 Q300 ${lerp(260,600,k1)} ${lerp(540,320,k1)} ${lerp(260,900,k1)}`,stroke:'#ff3b30','stroke-width':10,'stroke-dasharray':'18 12',fill:'none'},FG);LBL('1: الشمال',760,330,popS(t,T(10)),46,'#ff3b30','#fff');}
  if(t>=T(11)){el('path',{d:`M540 1650 Q240 ${lerp(1650,1300,k2)} ${lerp(540,320,k2)} ${lerp(1650,920,k2)}`,stroke:'#2ecc71','stroke-width':10,'stroke-dasharray':'18 12',fill:'none'},FG);LBL('2: الجنوب (+10 min)',760,1600,popS(t,T(11)),42,'#2ecc71','#fff');}}],
// 12-13 the men silent, all look at you; Nadia: you followed this from the start; you choose
[12,(t)=>{useBG('nightsea');GRADE.setAttribute('opacity',.1);cam(t,540,1100,1.1);zodiac(MID,540,1500,1.1,t);show({nadia:at(320,1600,.6,{lid:.2,ex:.8,mouth:t>=T(13)?talkIn(t,13):0}),guard:at(760,1600,.58,{lid:.3,ex:-.6}),you:at(540,1650,.62,{lid:.1,browUp:.7})},t);}],
// 14-18 you look at the island: Larbi's light blinking on the rock; in the hidden harbour two boat lights; not Mabrouka but Omar and Lhoussine; the black boat too
[14,(t)=>{useBG('cove');GRADE.setAttribute('opacity',.05);cam(t,t<T(15,'الضو')?540:t<T(16)?260:540,t<T(15,'الضو')?1000:t<T(16)?560:1150,t<T(15,'الضو')?1.0:t<T(16)?1.8:1.15);show({},t);
  const lit=Math.abs(Math.sin(t*3));el('circle',{cx:120,cy:470,r:8+6*lit,fill:'#ffe27a'},MID);el('circle',{cx:120,cy:470,r:60*lit,fill:'url(#glowG)'},MID);
  if(t>=T(16)){for(const x of [430,660]){el('circle',{cx:x,cy:1080,r:10,fill:'#ffe27a'},MID);el('circle',{cx:x,cy:1080,r:70,fill:'url(#glowG)'},MID);}}
  if(t>=T(17,'الريّس'))show({omar:at(420,1260,.3,{dark:.6,lid:.3}),hussein:at(500,1260,.32,{dark:.6,lid:.3})},t);
  if(t>=T(17)&&t<T(17,'ولكن'))X(FX,540,460,popS(t,T(17,'ما')),.6);if(t>=T(18))boat(MID,700,1200,.45,'#1a1a1f',{t,stripe:'#2a2a30'});}],
// 19-21 one chance; Nadia: decide fast, the tide will soon fall; if they hear you they'll flee in the dark
[19,(t)=>{if(t<T(20)){useBG('card');cam(t,540,960,1);show({},t);BIG('1',540,800,popS(t,T(19,'وحدة')),300);return;}closeUp(t,'nightsea','nadia',{lid:.15,brow:.7},t<T(21)?20:21,{all:t>=T(21),grade:.1,warm:0});if(t>=T(20,'يهبط')){const g=G(FX,840,480,popS(t,T(20,'يهبط')));el('path',{d:'M0 -70 L0 70 M-40 30 L0 70 L40 30',stroke:'#4fc3ff','stroke-width':18,fill:'none'},g);}}],
[22,(t)=>{useBG('card');cam(t,540,960,1);show({},t);quizCard(t,T(22),10);}],[23,CTA2(23)],
// 24-26 answer 10: from the south; wind N->S carries engine sound away from the island; from the north the wind brings it straight to them
[24,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(24,'الجنوب')){answerCard(t,T(24),10);return;}islandMap(t);windArrows(FG,t,.8);
  const south=t<T(26);if(south){LBL('الجنوب ✓',540,1660,popS(t,T(24,'الجنوب')),56,'#2ecc71','#fff');for(let i=0;i<3;i++){const ph=((t*.8+i/3)%1);el('path',{d:`M440 ${1550+ph*250} a${40+ph*120} ${40+ph*120} 0 0 1 200 0`,stroke:'#ffd166','stroke-width':6,fill:'none',opacity:1-ph},FG);}}
  else{LBL('الشمال ✗',540,300,popS(t,T(26)),56,'#ff3b30','#fff');for(let i=0;i<3;i++){const ph=((t*.8+i/3)%1);el('path',{d:`M440 ${380+ph*400} a${40+ph*120} ${40+ph*120} 0 0 0 200 0`,stroke:'#ff3b30','stroke-width':6,fill:'none',opacity:1-ph},FG);}}}],
// 27-31 zodiac turns south, approaches behind rocks; engine off, oars; only water on oars; wind whistles; the hidden harbour appears
[27,(t)=>{const L=[27,28,29,30,31].filter(l=>t>=T(l)).pop();useBG(L>=31?'cove':'nightsea');GRADE.setAttribute('opacity',.1);cam(t,540,1100,L>=29?1.2:1.0);
  zodiac(MID,540,1400,1.0,t,{flag:true});show({nadia:at(380,1500,.5,{lid:.2,r:L>=28?[160,100]:[110,250]}),guard:at(720,1500,.48,{lid:.3,l:L>=28?[-160,100]:[-110,250]}),you:at(560,1510,.5,{lid:.2})},t);
  if(L>=28){const a=Math.sin(t*3)*20;for(const sx of [-1,1])el('path',{d:`M${540+sx*260} 1400 L${540+sx*(380)} ${1520+a}`,stroke:'#8a6a42','stroke-width':12},FG);}
  if(L===28)X(FX,200,460,popS(t,T(28,'طفات')),.6);if(L>=30)windArrows(FG,t,.5,540,700);if(L===29)txt(FX,540,460,110,'🤫'.length?'...':'','#fff',{direction:'ltr'});}],
// 32-33 the black boat docked; Omar and Lhoussine carrying nailed wooden crates
[32,(t)=>{useBG('cove');GRADE.setAttribute('opacity',.1);cam(t,540,1150,1.15);boat(MID,700,1200,.7,'#1a1a1f',{t,stripe:'#2a2a30'});
  show({omar:at(320,1500,.55,{lid:.3,l:[-60,90],r:[60,90],litem:'box',dark:.3}),hussein:at(520,1500,.6,{lid:.3,l:[-60,90],r:[60,90],litem:'box',dark:.3}),smoker:at(760,1300,.45,{dark:.4,ritem:'cig',r:[-10,-60],rbend:-1})},t);}],
// 34-37 Nadia lights the big spotlight: 'coast guard, don't move'; Lhoussine drops the crate, hands up; Omar frozen; the smoker tries to start the engine
[34,(t)=>{useBG('cove');const on=t>=T(34,'الضو');GRADE.setAttribute('opacity',on?0:.1);WARM.setAttribute('opacity',0);cam(t,540,1150,1.15,t>=T(34,'خفر')&&t<T(35)?4:0);boat(MID,700,1200,.7,'#1a1a1f',{t,stripe:'#2a2a30'});
  if(on)el('path',{d:'M540 2200 L-200 900 L1300 900Z',fill:'#fffbe0',opacity:.18},FG);const up=t>=T(35,'ورفع');
  show({omar:at(320,1500,.55,{lid:on?0:.3,browUp:on?1:0,l:t>=T(36)?[-110,250]:[-60,90],r:[60,90],litem:t<T(36)?'box':''}),hussein:at(520,1500,.6,{lid:0,browUp:1,l:up?[-120,-160]:[-60,90],r:up?[120,-160]:[60,90],litem:t<T(35,'طيح')?'box':''}),smoker:at(760,1300,.45,{dark:.2,lid:0,r:t>=T(37,'يشعل')?[-120,60]:[-10,-60],ritem:t<T(37,'يشعل')?'cig':'',rbend:-1})},t);
  if(t>=T(35,'طيح')){const g=G(MID,520,1500+0);ITEMS.box(g);}if(t>=T(34,'خفر')&&t<T(35))LBL('خفر السواحل',540,460,popS(t,T(34,'خفر')),60,'#1d5fa8','#fff');}],
// 38-39 the tide already falling, boat can't leave; a guard boards and pulls the key
[38,(t)=>{useBG('cove');cam(t,640,1200,1.3);boat(MID,700,1200+cl((t-T(38))/2)*40,.7,'#1a1a1f',{t,stripe:'#2a2a30'});el('rect',{x:-500,y:1180,width:2080,height:1400,fill:'url(#nightSea)'},MID);
  const g=G(FX,840,480,popS(t,T(38,'كيهبط')));el('path',{d:'M0 -70 L0 70 M-40 30 L0 70 L40 30',stroke:'#4fc3ff','stroke-width':18,fill:'none'},g);
  if(t>=T(39))show({guard:at(720,1220,.45,{lid:.2,ritem:t>=T(39,'الساروت')?'key':'',r:[110,60]})},t);}],
// 40-42 Omar looks at you calmly: 'we did nothing; the wave came at noon, we sheltered here; Younes left us'
[40,(t)=>{closeUp(t,'cove','omar',{lid:.35,smile:-.1,ex:.3},t<T(42)?40:42,{all:t>=T(42),grade:.05,warm:0});if(t>=T(42,'الطناش'))clockFace(FX,850,460,80,12,0);}],
// 43-45 you don't answer; spotlight on his face; you open your notebook to the first page
[43,(t)=>{if(t<T(45)){useBG('cove');cam(t,540,1050,1.2);show({you:at(320,1950,.9,{lid:.4,brow:.6,ex:.8}),omar:at(740,1950,.9,{lid:.2,ex:-.6})},t);el('path',{d:'M740 2200 L540 900 L940 900Z',fill:'#fffbe0',opacity:.14},FG);return;}
  useBG('card');cam(t,540,960,1);show({},t);notebook(FG,540,900,1.15,['شي حاجة ما مشاتش.'],t,[0]);}],
[46,(t)=>{useBG('card');cam(t,540,960,1);show({},t);quizCard(t,T(46),11);}],[47,CTA2(47)],
// 48-52 answer 11: Omar says they reached the island after noon; Younes saw sunrise over it at 7; behind it 5 h before; calm sea, dry net, market fish, unused fuel; no wave
[48,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(48,'قال')){answerCard(t,T(48),11);return;}
  const rows=[[T(48,'الطناش'),'الريّس: من بعد 12:00',false],[T(49,'سبعة'),'يونس: الشمس 07:00',false],[T(50,'بخمسة'),'5 h قبل الموجة',true]];
  if(t<T(51))rows.forEach(([tt,s,h],i)=>{if(t>=tt){const g=G(FX,540,560+i*230,popS(t,tt));el('rect',{class:'o',x:-420,y:-80,width:840,height:150,rx:30,fill:h?'#ffd166':'#f4f6fb'},g);txt(g,0,24,62,s,'#17120f');}});
  else{const it=[[T(51,'هادي'),'0.5 m'],[T(51,'ناشفة'),'شبكة ناشفة'],[T(51,'السوق'),'حوت السوق'],[T(51,'والمازوط'),'70 L']];it.forEach(([tt,s],i)=>{if(t>=tt)LBL(s,540,520+i*170,popS(t,tt),56,'#fff6c8');});if(t>=T(52))X(FX,540,1350,popS(t,T(52,'موجة')),1.2);}}],
// 53-57 Nadia loads the crates; north side: Si Larbi on the rock, cold, small torch; drops it, cries: 'this isn't ours; the sea gives bread, not this'
[53,(t)=>{if(t<T(54)){useBG('cove');cam(t,540,1150,1.1);zodiac(MID,540,1450,.9,t);show({nadia:at(700,1500,.55,{lid:.2,litem:'box',l:[-60,90],r:[60,90]})},t);return;}
  useBG('rocks');GRADE.setAttribute('opacity',.1);const drop=t>=T(56,'طيح');cam(t,540,t<T(56)?1250:1150,t<T(56)?1.1:1.4);
  show({larbi:at(540,1500,.6,{lid:drop?.8:.4,smile:-.6,brow:-.6,r:drop?[110,250]:[100,-40],rbend:-1,ritem:drop?'':'torch',mouth:t>=T(57)?talkIn(t,57):0})},t);if(drop)for(let i=0;i<2;i++){const ph=((t*1.1+i/2)%1);el('path',{d:`M${540+(i?28:-28)} ${1500-560*.6-150*.6+16+ph*70} q-6 10 0 14 q6 -4 0 -14Z`,fill:'#8fd3ff',opacity:1-ph},FG);}
  if(t<T(54)+1.2)zodiac(MID,540,1700,.7,t);}],
// 58-62 dawn back in Essaouira; everyone on the quay; Younes hugs Si Larbi; Larbi's wife with the unopened box; 'no need to open it, I'm back'
[58,(t)=>{useBG('dawnport');WARM.setAttribute('opacity',.35);const L=[58,59,60,61,62].filter(l=>t>=T(l)).pop();cam(t,540,1100,L>=60?1.15:1.0);
  const crowd=L>=59?{fisher:at(120,1950,.75,{lid:.3}),mother:at(950,1950,.75,{lid:.3,smile:.3})}:{};
  if(L<=59){zodiac(MID,lerp(1100,600,cl((t-T(58))/2.5)),1300,.6,t);show(crowd,t);return;}
  show(Object.assign(crowd,{larbi:at(520,1950,.85,{lid:.5,smile:.5,mouth:L===62?talkIn(t,62):0}),younes:L>=60&&L<61?at(lerp(900,680,cl((t-T(60))/.6)),1950,.85,{walk:t*8,lid:.6,smile:.6,l:[-200,60]}):null,wife2:L>=61?at(760,1950,.85,{lid:.5,smile:.4,litem:'box',l:[-40,140]}):null}),t);}],
// 63-65 Omar, Lhoussine and the smoker taken by the coast guard; Nadia to Younes: if you were silent from fear, no need to fear now; Younes: sorry; I wanted someone to understand on his own
[63,(t)=>{const L=[63,64,65].filter(l=>t>=T(l)).pop();if(L===63){useBG('dawnport');WARM.setAttribute('opacity',.3);cam(t,540,1100,1.0);const k=cl((t-T(63))/3);show({omar:at(lerp(300,1200,k),1950,.75,{walk:t*5,lid:.6,ey:.6,smile:-.4,l:[50,200],r:[-50,200]}),hussein:at(lerp(150,1050,k),1950,.78,{walk:t*5+1,lid:.6,ey:.6,l:[50,200],r:[-50,200]}),smoker:at(lerp(0,900,k),1950,.75,{walk:t*5+2,lid:.6,ey:.6}),guard:at(lerp(450,1350,k),1950,.78,{walk:t*5+3,lid:.3})},t);return;}
  if(L===64){useBG('dawnport');WARM.setAttribute('opacity',.3);cam(t,540,1050,1.2);show({nadia:at(700,1950,.9,{lid:.25,smile:.3,mouth:talkIn(t,64)}),younes:at(300,1950,.88,{lid:.5,ey:.4})},t);return;}
  closeUp(t,'dawnport','younes',{lid:.4,smile:.2,ex:.6},65,{warm:.35,grade:.05});}],
// 66-68 in the morning Mabrouka goes out again with Younes and Si Larbi; gulls cry above, like every day
[66,(t)=>{useBG('port');GRADE.setAttribute('opacity',.05);WARM.setAttribute('opacity',.25);cam(t,540,1000,1.0);const k=cl((t-T(66))/6);const bx=lerp(560,760,k),by=lerp(1250,980,k),bs=lerp(.75,.4,k);
  show(t>=T(67)?{younes:at(bx-60*bs/.75,by-40,bs*.5,{lid:.3,smile:.5}),larbi:at(bx+60*bs/.75,by-40,bs*.48,{lid:.4,smile:.5,ritem:'tea',r:[100,140]})}:{},t);boat(MID,bx,by,bs,undefined,{t,name:'مبروكة'});for(let i=0;i<7;i++)gull(FG,((i*190+t*80)%1300)-100,400+(i%3)*90,1.1,t);}],
// 69-70 twelve puzzles, one story; how many did you solve?
[69,(t)=>{useBG('card');cam(t,540,960,1);show({},t);const k=popS(t,T(69),.4);const g=G(FX,540,700,k);el('circle',{r:230,fill:'#ffd166',stroke:'#17120f','stroke-width':12},g);txt(g,0,70,220,'12','#17120f',{direction:'ltr'});
  if(t>=T(70)){const c=G(FX,540,1550,1);const kk=Math.min(12,Math.floor((t-T(70))*6));for(let i=0;i<12;i++){const x=-450+(i%6)*180,y=(Math.floor(i/6))*130;const pz=G(c,x+90,y,1.1);el('path',{d:'M-34 -34 L-8 -34 A12 12 0 1 1 8 -34 L34 -34 L34 -8 A12 12 0 1 0 34 8 L34 34 L-34 34Z',fill:i<kk?'#ffd166':'#3b4766'},pz);}}}],
];
