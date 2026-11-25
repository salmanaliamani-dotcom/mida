function portShot(t,o={}){useBG('port');GRADE.setAttribute('opacity',o.grade??.15);WARM.setAttribute('opacity',o.warm??.3);for(let i=0;i<5;i++)gull(FG,((i*230+t*60)%1400)-160,260+(i%3)*90,.8,t);}
function crate(p,x,y,s,o={}){const c=G(p,x,y,s);el('rect',{class:'o',x:-150,y:-90,width:300,height:160,rx:10,fill:'#e9e2d0'},c);for(let r=0;r<3;r++)for(let k=0;k<6;k++){const f=G(c,-110+k*44,-60+r*36);el('ellipse',{rx:22,ry:9,fill:'#a9bccf',stroke:'#17120f','stroke-width':2},f);el('circle',{cx:-14,cy:-1,r:3,fill:o.dull?'#8a8f98':'#111'},f);}if(o.ice)for(let i=0;i<8;i++)el('rect',{x:-130+i*34,y:-88+(i%2)*10,width:24,height:18,rx:4,fill:'#e8f6ff',opacity:.9},c);return c;}
function fishEye(p,x,y,s,dull){const g=G(p,x,y,s);el('ellipse',{class:'o',rx:240,ry:90,fill:'#a9bccf'},g);el('path',{class:'o',d:'M220 0 L320 -70 L320 70Z',fill:'#8aa0b8'},g);el('circle',{cx:-150,cy:-10,r:44,fill:dull?'#c9ccd2':'#fff',stroke:'#17120f','stroke-width':5},g);el('circle',{cx:-150,cy:-10,r:24,fill:dull?'#7a7f88':'#111'},g);if(!dull)el('circle',{cx:-140,cy:-22,r:9,fill:'#fff'},g);else el('circle',{cx:-150,cy:-10,r:44,fill:'#fff',opacity:.35},g);return g;}
function receipt(p,x,y,s,t){const g=paper(p,x,y,620*s,620*s,-3);const L=[['بون: سوق السمك',13],['50 kg سردين',14],['التاريخ: البارح العشية',15],['الحسين',16]];L.forEach(([s2,ln],i)=>{if(t>=T(ln))txt(g,0,(-200+i*130)*s,(i===0?54:60)*s,s2,i===3?'#c0392b':'#2a1a12');});return g;}
const SHOTS=[
// 1-4 answer 3: Mabrouka was on the west side of the island
[1,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(1,'الغربية')){answerCard(t,T(1),3);return;}const c=chart(FG,t);
  const bx=t<T(1,'الغربية')+.1?370:lerp(370,240,cl((t-T(1,'الغربية'))/.6));boat(FG,bx,1160,.18,undefined,{t});
  if(t>=T(2,'الشرق'))sunIcon(FG,960,560,.6);if(t>=T(2,'فوق')){el('path',{d:'M240 1160 L960 560',stroke:'#ffd166','stroke-width':6,'stroke-dasharray':'16 10'},FG);}
  if(t>=T(3)){el('path',{d:'M770 740 L330 1160',stroke:'#e53935','stroke-width':6,'stroke-dasharray':'12 10'},FG);X(FX,540,1650,popS(t,T(3,'يشوفها')),.7);}
  if(t>=T(4,'سبعة'))LBL('07:00',300,420,popS(t,T(4,'سبعة')),60,'#ffd166');if(t>=T(4,'بخمسة'))LBL('5 h قبل 12:00',740,420,popS(t,T(4,'بخمسة')),48,'#fff');}],
// 5-8 back to Mabrouka; open fish crates; sardines arranged with ice; you turn them over
[5,(t)=>{useBG('deck');GRADE.setAttribute('opacity',.3);WARM.setAttribute('opacity',.2);cam(t,540,kf(t,[[T(5),1300],[T(6),1450]]),kf(t,[[T(5),1.0],[T(6),1.5]]));show(t<T(6)?{you:at(540,2000,.9,{lid:.3})}:{},t);
  const c=crate(MID,540,1500,1.4,{ice:t>=T(7,'الثلج')});if(t>=T(8,'وقلبتي')){const h=G(FG,540+Math.sin(t*5)*60,1450);el('ellipse',{class:'o',rx:70,ry:46,fill:'url(#skinP)'},h);}}],
// 9-11 cold fish but eyes not shiny; fresh fish eyes shine; these are cloudy, a day or more
[9,(t)=>{useBG('card');cam(t,540,960,1);show({},t);const two=t>=T(10);
  if(!two){fishEye(FG,540,900,1.6,true);if(t>=T(9,'لامعين'))X(FX,300,560,popS(t,T(9,'لامعين')),.7);return;}
  fishEye(FG,540,700,1.1,false);OK(FX,880,560,popS(t,T(10,'لامعين')),.6);if(t>=T(11)){fishEye(FG,540,1250,1.1,true);X(FX,880,1110,popS(t,T(11,'مغبرين')),.6);if(t>=T(11,'نهار'))LBL('+1 نهار',540,1580,popS(t,T(11,'نهار')),56,'#ffd166');}}],
// 12-17 under the ice, a wet receipt: city fish market, 50 kg sardines, yesterday evening, name: Lhoussine; bagged and pocketed
[12,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(13)){crate(FG,540,1000,1.8,{ice:true});const k=popS(t,T(12,'ورقة'));if(k>0){const g=G(FG,540,1040,k);el('rect',{class:'o',x:-90,y:-50,width:180,height:100,rx:6,fill:'#f6efdc'},g);}return;}
  if(t<T(17)){receipt(FG,540,880,1.2,t);for(let i=0;i<3;i++){const ph=((t*.7+i/3)%1);el('path',{d:`M${300+i*240} ${560+ph*500} q-8 14 0 20 q8 -6 0 -20Z`,fill:'#8fd3ff',opacity:.6*(1-ph)},FG);}return;}
  const k=eout((t-T(17))/.8);const g=G(FG,540,lerp(900,1400,k),lerp(1,.4,k));receipt(g,0,0,1,1e9);el('rect',{x:-380,y:-380,width:760,height:760,rx:20,fill:'#bfe6ff',opacity:.25,stroke:'#fff','stroke-width':6},g);}],
// 18-19 you smell the fish: not today's sea smell
[18,(t)=>{useBG('deck');GRADE.setAttribute('opacity',.3);cam(t,540,1050,1.3);show({you:at(540,1950,.95,{lid:.5,brow:-.4,smile:-.5,hdy:10,ey:.6})},t);crate(FG,540,1650,1.2,{});for(let i=0;i<3;i++){const ph=((t*.8+i/3)%1);el('path',{d:`M${470+i*60} ${1520-ph*240} q-20 -30 0 -60 q20 -30 0 -60`,stroke:'#9ab88a','stroke-width':8,fill:'none',opacity:1-ph},FG);}
  if(t>=T(19,'ماشي'))X(FX,820,540,popS(t,T(19,'ماشي')),.6);}],
// 20-23 a boat going fishing carrying market fish, returning with full crates; no fisherman buys fish before fishing
[20,(t)=>{useBG('card');cam(t,540,960,1);show(t<T(21)?{you:at(540,1850,1.0,{lid:.4,brow:.6,r:[60,-60],rbend:-1})}:{},t);
  if(t>=T(21)){const a=G(FG,300,700,1);el('rect',{class:'o',x:-150,y:-110,width:300,height:200,rx:16,fill:'#f4efe4'},a);txt(a,0,10,48,'سوق السمك','#17120f');const k=cl((t-T(21,'وكتهز'))/1.2);boat(FG,lerp(300,780,k),1000,.45,undefined,{t});crate(FG,lerp(300,780,k),920,.4);}
  if(t>=T(22))crate(FG,780,1300,.7,{});
  if(t>=T(23)){const g=G(FX,540,1550,popS(t,T(23,'كيشري')));el('rect',{class:'o',x:-260,y:-80,width:520,height:160,rx:30,fill:'#ff3b30'},g);txt(g,0,24,64,'سوق ← بحر','#fff');}}],
// 24-27 fishermen pass: 'Mabrouka brought good catch; poor Younes...'; you don't answer; you know the fish wasn't caught today
[24,(t)=>{portShot(t);cam(t,540,1050,1.05);const sp=t>=T(25)&&t<T(26);show({fisher:at(t<T(25)?lerp(1200,760,cl((t-T(24))/1)):760,1950,.85,{walk:t<T(25)?t*7:undefined,lid:.3,smile:.2,mouth:sp?talkIn(t,25):0}),you:at(300,1950,.85,{lid:.4,ex:.7,smile:-.2,brow:t>=T(27)?.6:0})},t);
  if(t>=T(27,'تصادش'))X(FX,300,560,popS(t,T(27,'تصادش')),.6);}],
[28,Q(4,28)],[29,CTA2(29)],
// 30-32 answer 4: so Younes returns with full crates and everyone believes they fished; Lhoussine bought it yesterday; story prepared beforehand
[30,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(30,'يرجع')){answerCard(t,T(30),4);return;}
  if(t<T(31)){crate(FG,540,1000,1.4);for(let i=0;i<3;i++)OK(FX,280+i*260,560,popS(t,T(30,'يتيق')+i*.1),.5);return;}
  if(t<T(32)){show({hussein:at(380,1850,.9,{lid:.3,r:[110,150],litem:'box',l:[-110,150]})},t);receipt(FG,800,700,.55,1e9);return;}
  const g=paper(FG,540,900,760,500,-2);txt(g,0,-80,70,'قصة الموجة','#2a1a12');txt(g,0,40,56,'موجدة من قبل','#c0392b');}],
// 33-38 evening, the families; first: Lhoussine's wife: not afraid of the sea, but yesterday was strange: took the big winter jacket in summer, bread for 3 days; 'don't ask'
[33,(t)=>{const L=t<T(35)?33:t<T(38)?35:38;useBG('alley');GRADE.setAttribute('opacity',.15);WARM.setAttribute('opacity',.35);cam(t,540,1050,L===33?1.0:1.2);
  show({wife1:at(620,1900,.95,{lid:.35,brow:-.3,smile:-.3,mouth:L>=35?(t<T(36)?talkIn(t,35):talkAll(t,L===38?38:t<T(37)?36:37)):0}),you:at(180,1980,.9,{lid:.3,ex:.8})},t);
  if(t>=T(34)&&t<T(35))LBL('1',880,420,popS(t,T(34)),80,'#ffd166');
  if(t>=T(36,'الجاكيطة')&&t<T(38)){const g=G(FX,300,500,popS(t,T(36,'الجاكيطة')));el('path',{class:'o',d:'M-90 -80 L90 -80 L110 110 L-110 110Z',fill:'#5a4a3a'},g);el('path',{d:'M0 -80 L0 110',stroke:'#17120f','stroke-width':6},g);if(t>=T(36,'والصيف'))sunIcon(g,140,-110,.5);}
  if(t>=T(37,'خبز')&&t<T(38)){for(let i=0;i<3;i++){const g=G(FX,640+i*120,500,popS(t,T(37,'لثلاثة')+i*.1));el('ellipse',{class:'o',rx:50,ry:34,fill:'#d99a4e'},g);}}
  if(t>=T(38,'تسوليش'))X(FX,800,500,popS(t,T(38,'تسوليش')),.5);}],
// 39-46 second: Si Larbi's old wife at the door with a small locked wooden box; key given; 'open it if I'm not back by Thursday'; today is Tuesday; light, something moving inside; she won't open before Thursday
[39,(t)=>{useBG('alley');GRADE.setAttribute('opacity',.15);WARM.setAttribute('opacity',.35);const L=[42,43,46].find(l=>t>=T(l)&&t<TE(l)+.3);cam(t,540,t<T(41)?1050:1150,t<T(41)?1.05:1.3);
  show({wife2:at(560,1900,.95,{lid:.45,smile:-.2,litem:'box',l:[-40,140],lirot:0,mouth:L?talkIn(t,L):0}),you:t<T(45)?at(180,1980,.9,{lid:.3,ex:.8}):at(260,1980,.9,{lid:.3,ex:.8,l:[200,20],lbend:-1})},t);
  if(t>=T(39)&&t<T(40))LBL('2',880,420,popS(t,T(39)),80,'#ffd166');
  if(t>=T(41,'بقفل'))el('circle',{cx:540-40*.95,cy:1900-560*.95+140*.95-30,r:80,fill:'none',stroke:'#ffd166','stroke-width':6},FG);
  if(t>=T(42,'الساروت')&&t<T(44)){const g=G(FX,820,480,popS(t,T(42,'الساروت'))*2.4);ITEMS.key(g);}
  if(t>=T(43,'الخميس')&&t<T(44))LBL('الخميس',540,480,popS(t,T(43,'الخميس')),70,'#ffd166');
  if(t>=T(44,'الثلاثاء')&&t<T(45)){LBL('الثلاثاء',540,480,popS(t,T(44,'الثلاثاء')),70,'#fff');}
  if(t>=T(45,'كتحرك')){const sh=Math.sin(t*30)*4;el('path',{d:`M${470+sh} 1150 q20 -20 40 0`,stroke:'#ffd166','stroke-width':6,fill:'none'},FG);}}],
// 47-50 third: Omar's house closed, nobody; neighbours: wife went to her sister in Marrakech 3 days ago; Omar sent her
[47,(t)=>{useBG('alley');GRADE.setAttribute('opacity',.2);WARM.setAttribute('opacity',.35);cam(t,540,1050,1.05);const nb=t>=T(49);
  show(nb?{fisher:at(820,1950,.9,{lid:.3,mouth:talkIn(t,49)||talkAll(t,50)}),you:at(220,1980,.9,{lid:.3,ex:.8})}:{you:at(220,1980,.9,{lid:.3,ex:.5})},t);
  if(t<T(48))LBL('3',880,420,popS(t,T(47)),80,'#ffd166');if(t>=T(48)&&t<T(49)){const L2=G(FG,540,1100,popS(t,T(48)));el('rect',{class:'o',x:-60,y:-10,width:120,height:100,rx:14,fill:'#d8b648'},L2);el('path',{class:'o',d:'M-40 -10 L-40 -60 Q0 -110 40 -60 L40 -10',fill:'none','stroke-width':14},L2);}
  if(t>=T(49,'فمراكش')){const g=G(FX,540,460,popS(t,T(49,'فمراكش')));el('rect',{class:'o',x:-200,y:-70,width:400,height:130,rx:24,fill:'#c0392b'},g);txt(g,0,24,64,'مراكش','#fff');if(t>=T(49,'ثلاثة'))LBL('3 أيام',540,620,popS(t,T(49,'ثلاثة')),48);}
  if(t>=T(50)){show({omar:at(540,1550,.55,{dark:.0,lid:.4,smile:-.1,op:.85,l:[-170,-40]}),fisher:at(820,1950,.9,{lid:.3,mouth:talkAll(t,50)}),you:at(220,1980,.9,{lid:.3,ex:.8})},t);el('rect',{x:0,y:0,width:1080,height:1920,fill:'#c9a46a',opacity:.15,style:'mix-blend-mode:multiply'},FX);}}],
// 51-57 back to the port at maghrib; red sky, grey sea; on the rock with your notebook: winter jacket in summer, bread for 3 days, a box not to open before Thursday, a wife sent away
[51,(t)=>{useBG('port');GRADE.setAttribute('opacity',.25);WARM.setAttribute('opacity',.55);cam(t,540,t<T(53)?1000:1250,t<T(53)?1.0:1.2);show({you:at(540,1980,.9,{ritem:'notebook',r:[90,110],lid:.4,ey:.5})},t);
  el('rect',{x:-500,y:-500,width:2080,height:1300,fill:'#ff5a3a',opacity:t>=T(52)?.25:0,style:'mix-blend-mode:multiply'},MID);
  if(t>=T(54)){const items=[[54,'جاكيطة الشتا فالصيف'],[55,'خبز ل 3 أيام'],[56,'صندوق: حتى الخميس'],[57,'مرا تصيفطات']];items.forEach(([ln,s],i)=>{if(t>=T(ln))LBL(s,540,440+i*150,popS(t,T(ln)),48,'#fff6c8');});}}],
[58,Q(5,58)],[59,CTA2(59)],
// 60-62 answer 5: the three knew they wouldn't return that day; planned days ahead; no drowning; meant to stay days somewhere
[60,(t)=>{useBG('card');cam(t,540,960,1);show({},t);if(t<T(60,'عارفين')){answerCard(t,T(60),5);return;}
  if(t<T(61)){show({omar:at(260,1850,.75,{lid:.35,smile:.1}),hussein:at(540,1850,.8,{lid:.35}),larbi:at(820,1850,.72,{lid:.5,ritem:'tea',r:[100,140]})},t);return;}
  if(t<T(62)){const g=paper(FG,540,900,700,520,-2);txt(g,0,-60,64,'كانو موجدين','#2a1a12');X(FX,540,1300,popS(t,T(61,'غرق')),.8);txt(FX,540,1500,56,'غرق؟','#fff');return;}
  const c=chart(FG,t);el('circle',{cx:330,cy:1160,r:70+8*Math.sin(t*5),fill:'none',stroke:'#e53935','stroke-width':10},FG);LBL('أيام',330,980,popS(t,T(62,'أيام')),48,'#ffd166');}],
// 63-69 night, port office logbook: 20 boats in the morning; 9 left incl. Mabrouka; 8 returned incl. Mabrouka; one (Bouchaib) stays at sea
[63,(t)=>{if(t<T(66)){useBG('office');GRADE.setAttribute('opacity',.35);cam(t,480,1150,1.2);show({you:at(300,1980,.9,{lid:.35,ey:.6})},t);const b=G(FG,560,1240,1.2);el('rect',{class:'o',x:-170,y:-30,width:340,height:60,rx:6,fill:'#1d3a6a'},b);el('rect',{x:-160,y:-24,width:320,height:30,fill:'#f4ecd8'},b);return;}
  useBG('card');cam(t,540,960,1);show({},t);const rows=[[66,'الصباح: 20',T(66,'عشرين')],[67,'خرجو: 9',T(67,'تسعة')],[68,'رجعو: 8',T(68,'تمنية')],[69,'بوشعيب: باقي فالبحر',T(69,'بوشعيب')]];
  const g=paper(FG,540,900,860,800,-1);rows.forEach(([ln,s,tt],i)=>{if(t>=tt)txt(g,360,-270+i*170,66,s,i===3?'#1d5fa8':'#2a1a12',{'text-anchor':'start'});});}],
// 70-77 on the quay counting boats one by one with phone light; cold; boats breathing with the swell; 1, 2, 3... recount: twenty
[70,(t)=>{useBG('dock');GRADE.setAttribute('opacity',.35);const n=t<T(73)?0:t<T(74)?Math.min(3,1+Math.floor((t-T(73))/.4)):t<T(77)?Math.min(20,3+Math.floor((t-T(74))*4)):20;
  cam(t,kf(t,[[T(70),540],[T(74),700]]),1300,1.0);for(let i=0;i<10;i++){boat(MID,60+i*110,1180+(i%2)*40,.26,i%3?'url(#blueWood)':'#c0392b',{t:t+i,cabin:false});}for(let i=0;i<10;i++){boat(MID,110+i*110,1300+(i%2)*40,.28,i%3?'#c0392b':'url(#blueWood)',{t:t+i*1.3,cabin:false});}
  show(t<T(73)?{you:at(540,1980,.85,{ritem:'torch',r:[100,60],rbend:-1,lid:.3})}:{},t);if(n>0)BIG(String(n),540,560,1,200);if(t>=T(77))el('rect',{x:0,y:1100,width:1080,height:300,fill:'none',stroke:'#ffd166','stroke-width':8},FG);}],
// 78-85 at the quay's end, where the cigarette was: a black boat, no name, no number; new oversized engine; no net, no crates; full fuel cans; warm cigarette butt; not in the logbook
[78,(t)=>{useBG('dock');GRADE.setAttribute('opacity',.35);const z=t<T(80)?1.1:t<T(83)?1.3:1.9;cam(t,t<T(83)?560:640,t<T(83)?1250:1400,z);const b=boat(MID,560,1300,.9,'#1a1a1f',{t,stripe:'#2a2a30',cabin:true});
  if(t>=T(79))X(FX,540,460,popS(t,T(79,'سمية')),.6);
  if(t>=T(80,'المحرك')){const e=G(MID,860,1250);el('rect',{class:'o',x:-70,y:-120,width:140,height:180,rx:16,fill:'#3a3f4a'},e);el('rect',{x:-50,y:-100,width:100,height:30,rx:6,fill:'#ff3b30'},e);}
  if(t>=T(82,'بيدونات'))for(let i=0;i<3;i++){const c=G(MID,360+i*90,1260);el('rect',{class:'o',x:-34,y:-90,width:68,height:100,rx:10,fill:'#c0392b'},c);el('rect',{x:-14,y:-110,width:28,height:22,fill:'#2a2a30'},c);}
  if(t>=T(83,'سيكارو')){const c=G(FG,640,1400,1);el('rect',{x:-30,y:-6,width:50,height:12,rx:4,fill:'#f4f4f4'},c);el('circle',{cx:-32,r:7,fill:'#ff6a2a',opacity:.6+.4*Math.sin(t*6)},c);for(let i=0;i<2;i++){const ph=((t*.7+i/2)%1);el('path',{d:`M-32 ${-10-ph*80} q-12 -16 0 -32`,stroke:'#cfd6e0','stroke-width':4,fill:'none',opacity:1-ph},c);}}
  if(t>=T(85)){const g=G(FX,540,460,popS(t,T(85)));el('rect',{class:'o',x:-170,y:-100,width:340,height:180,rx:10,fill:'#1d3a6a'},g);X(g,0,0,1,.8);}}],
[86,Q(6,86)],[87,CTA2(87)],
];
function fxWind(t){}
