const Y=1.7;
function fishEye(p,x,y,s,dull){const g=G(p,x,y,s);el('ellipse',{class:'o',rx:240,ry:90,fill:'#a9bccf'},g);el('path',{class:'o',d:'M220 0 L320 -70 L320 70Z',fill:'#8aa0b8'},g);el('circle',{cx:-150,cy:-10,r:44,fill:dull?'#c9ccd2':'#fff',stroke:'#17120f','stroke-width':5},g);el('circle',{cx:-150,cy:-10,r:24,fill:dull?'#7a7f88':'#111'},g);if(!dull)el('circle',{cx:-140,cy:-22,r:9,fill:'#fff'},g);else el('circle',{cx:-150,cy:-10,r:44,fill:'#fff',opacity:.35},g);return g;}
function receipt(p,x,y,s,t){const g=paper(p,x,y,620*s,620*s,-3);[['بون: سوق السمك',13],['50 kg سردين',14],['التاريخ: البارح العشية',15],['الحسين',16]].forEach(([s2,ln],i)=>{if(t>=T(ln))txt(g,0,(-200+i*130)*s,(i===0?54:60)*s,s2,i===3?'#c0392b':'#2a1a12');});return g;}
const SHOTS=[
// 1-4 answer 3: west side of the island
[1,(t)=>{if(t<T(1,'الغربية')){CARD(t);answerCard(t,T(1),3);return;}
  if(t<T(3)){CARD(t);chart(FX,t);sunIcon(FX,960,560,.6);if(t>=T(2,'فوق'))el('path',{d:'M240 1160 L960 560',stroke:'#ffd166','stroke-width':6,'stroke-dasharray':'16 10'},FX);const b=G(FX,lerp(370,250,cl((t-T(1,'الغربية'))/.6)),1160,1);el('rect',{class:'o',x:-26,y:-12,width:52,height:24,rx:10,fill:'#2f84d6'},b);return;}
  setEnv('island','dawn');mab.visible=true;mab.position.set(-30,Math.sin(t)*.1,-500);mab.rotation.y=Math.PI/2;C3(t,[V(t,[[T(3),40],[T(4),20]]),12,-430],[0,3,-500],44);
  if(t>=T(3,'يشوفها'))X(FX,540,460,popS(t,T(3,'يشوفها')),.6);if(t>=T(4,'سبعة'))LBL('07:00',300,420,popS(t,T(4,'سبعة')),60,'#ffd166');if(t>=T(4,'بخمسة'))LBL('5 h قبل 12:00',740,420,popS(t,T(4,'بخمسة')),48,'#fff');}],
// 5-8 back on Mabrouka; open the fish crates; sardines with ice; you turn them
[5,(t)=>{setEnv('deck','dusk');const c=ENVS.deck.userData;c.ice.forEach(k=>k.visible=t>=T(7,'الثلج'));
  if(t<T(6)){put('you',{x:300+V(t,[[T(5),5],[T(5)+1.6,1.5]]),y:1.2,z:3,ry:-80,walk:t<T(5)+1.6?t*8:undefined},t);C3(t,[304,6,13],[300,2.5,1],42);return;}
  put('you',{x:300.5,y:1.2,z:3.4,ry:180,pose:t>=T(8,'وقلبتي')?'hold':'idle',lid:.3,ey:.8,hx:.25},t);C3(t,[303,5.2,6.5],[300.5,1.7,1.2],38);}],
// 9-11 fish eyes: dull vs shiny
[9,(t)=>{CARD(t);const two=t>=T(10);if(!two){fishEye(FX,540,900,1.6,true);if(t>=T(9,'لامعين'))X(FX,300,560,popS(t,T(9,'لامعين')),.7);return;}
  fishEye(FX,540,700,1.1,false);OK(FX,880,560,popS(t,T(10,'لامعين')),.6);if(t>=T(11)){fishEye(FX,540,1250,1.1,true);X(FX,880,1110,popS(t,T(11,'مغبرين')),.6);if(t>=T(11,'نهار'))LBL('+1 نهار',540,1580,popS(t,T(11,'نهار')),56,'#ffd166');}}],
// 12-17 the wet receipt
[12,(t)=>{if(t<T(13)){setEnv('deck','dusk');C3(t,[300.4,4.2,5],[299.9,1.6,1.2],34);const k=popS(t,T(12,'ورقة'));if(k>0){const g=G(FX,540,1100,k);el('rect',{class:'o',x:-140,y:-80,width:280,height:160,rx:8,fill:'#f6efdc'},g);}return;}
  CARD(t);if(t<T(17)){receipt(FX,540,880,1.2,t);return;}const k=eout((t-T(17))/.8);const g=G(FX,540,lerp(900,1400,k),lerp(1,.4,k));receipt(g,0,0,1,1e9);el('rect',{x:-380,y:-380,width:760,height:760,rx:20,fill:'#bfe6ff',opacity:.25,stroke:'#fff','stroke-width':6},g);}],
// 18-19 smells the fish: not today's sea
[18,(t)=>{CU(t,'deck','you',{lid:.5,brow:-.4,smile:-.5,hx:.2,ey:.6,pose:'hold'},null,{talk:false,d0:5,d1:4.5});for(let i=0;i<3;i++){const ph=((t*.8+i/3)%1);el('path',{d:`M${470+i*60} ${1700-ph*240} q-20 -30 0 -60 q20 -30 0 -60`,stroke:'#9ab88a','stroke-width':8,fill:'none',opacity:1-ph},FX);}if(t>=T(19,'ماشي'))X(FX,820,540,popS(t,T(19,'ماشي')),.6);}],
// 20-23 market fish carried to sea: no fisherman buys fish before fishing
[20,(t)=>{if(t<T(21)){CU(t,'deck','you',{lid:.4,brow:.6,pose:'chin'},null,{talk:false});return;}CARD(t);
  const a=G(FX,300,700,1);el('rect',{class:'o',x:-150,y:-110,width:300,height:200,rx:16,fill:'#f4efe4'},a);txt(a,0,10,48,'سوق السمك','#17120f');const k=cl((t-T(21,'وكتهز'))/1.2);const b=G(FX,lerp(300,780,k),1000,1);el('path',{class:'o',d:'M-120 -20 Q-110 40 -70 50 L70 50 Q110 40 120 -20Z',fill:'#2f84d6'},b);el('rect',{class:'o',x:-50,y:-60,width:100,height:44,rx:6,fill:'#e9e2d0'},b);
  if(t>=T(23)){const g=G(FX,540,1550,popS(t,T(23,'كيشري')));el('rect',{class:'o',x:-260,y:-80,width:520,height:160,rx:30,fill:'#ff3b30'},g);txt(g,0,24,64,'سوق ← بحر','#fff');}}],
// 24-27 fishermen pass: 'Mabrouka brought good catch'; you don't answer
[24,(t)=>{setEnv('port','dusk');gullsOn(t);const sp=t>=T(25)&&t<T(26);put('fisher',{x:V(t,[[T(24),8],[T(25),2]]),y:Y,z:9,ry:t<T(25)?-80:-30,walk:t<T(25)?t*8:undefined,lid:.3,smile:.2,mouth:sp?talkIn(t,25):0},t);put('you',{x:-2,y:Y,z:9,ry:30,lid:.4,ex:.7,smile:-.2,brow:t>=T(27)?.6:0,item:'notebook',pose:'hold'},t);
  C3(t,[0,5,19],[0,3.5,9],40);if(t>=T(27,'تصادش'))X(FX,300,560,popS(t,T(27,'تصادش')),.6);}],
[28,Q(4,28)],[29,CTA2(29)],
// 30-32 answer 4
[30,(t)=>{if(t<T(30,'يرجع')){CARD(t);answerCard(t,T(30),4);return;}
  if(t<T(31)){setEnv('deck','dusk');C3(t,[300.4,4.2,5.5],[299.9,1.6,1.2],36);for(let i=0;i<3;i++)OK(FX,280+i*260,460,popS(t,T(30,'يتيق')+i*.1),.5);return;}
  if(t<T(32)){CU(t,'port','hussein',{lid:.3,pose:'carry',item:'crate'},null,{talk:false,d0:7,d1:6.5,cy:-.4});const r=G(FX,820,460,.5);receipt(r,0,0,1,1e9);return;}
  CARD(t);const g=paper(FX,540,900,760,500,-2);txt(g,0,-80,70,'قصة الموجة','#2a1a12');txt(g,0,40,56,'موجدة من قبل','#c0392b');}],
// 33-38 Lhoussine's wife
[33,(t)=>{setEnv('alley','dusk');const L=t<T(35)?33:t<T(38)?35:38;const sp=L>=35;put('wife1',{x:.8,y:.1,z:296.5,ry:-10,lid:.35,brow:-.3,smile:-.3,mouth:sp?(t<T(36)?talkIn(t,35):talkAll(t,t<T(37)?36:L===38?38:37)):0},t);put('you',{x:-2,y:.1,z:299,ry:40,lid:.3,ex:.8},t);
  C3(t,L===33?[0,4.5,310]:[0,4.4,305],[0,3,296.8],40);if(t>=T(34)&&t<T(35))LBL('1',880,420,popS(t,T(34)),80,'#ffd166');
  if(t>=T(36,'الجاكيطة')&&t<T(38)){const g=G(FX,300,500,popS(t,T(36,'الجاكيطة')));el('path',{class:'o',d:'M-90 -80 L90 -80 L110 110 L-110 110Z',fill:'#5a4a3a'},g);el('path',{d:'M0 -80 L0 110',stroke:'#17120f','stroke-width':6},g);if(t>=T(36,'والصيف'))sunIcon(g,140,-110,.5);}
  if(t>=T(37,'خبز')&&t<T(38)){for(let i=0;i<3;i++){const g=G(FX,640+i*120,500,popS(t,T(37,'لثلاثة')+i*.1));el('ellipse',{class:'o',rx:50,ry:34,fill:'#d99a4e'},g);}}
  if(t>=T(38,'تسوليش'))X(FX,800,500,popS(t,T(38,'تسوليش')),.5);}],
// 39-46 Si Larbi's wife with the locked wooden box
[39,(t)=>{setEnv('alley','dusk');const L=[42,43,46].find(l=>t>=T(l)&&t<TE(l)+.3);put('wife2',{x:.6,y:.65,z:296.2,ry:-10,sit:true,lid:.45,smile:-.2,pose:'hold',item:t<T(45)?'box':'',mouth:L?talkIn(t,L):0},t);put('you',{x:-2,y:.1,z:299,ry:40,lid:.3,ex:.8,pose:t>=T(45)&&t<T(46)?'hold':'idle',item:t>=T(45)&&t<T(46)?'box':''},t);
  C3(t,t<T(41)?[0,4.5,309]:[0,3.8,303.5],t<T(41)?[0,2.6,296.8]:[0,2.4,296.8],40);if(t>=T(39)&&t<T(40))LBL('2',880,420,popS(t,T(39)),80,'#ffd166');
  if(t>=T(42,'الساروت')&&t<T(44)){const g=G(FX,820,480,popS(t,T(42,'الساروت'))*1.6);el('circle',{r:26,fill:'none',stroke:'#d8b648','stroke-width':10},g);el('path',{d:'M0 26 L0 110 M0 90 L24 90 M0 106 L20 106',stroke:'#d8b648','stroke-width':10,'stroke-linecap':'round'},g);}
  if(t>=T(43,'الخميس')&&t<T(44))LBL('الخميس',540,480,popS(t,T(43,'الخميس')),70,'#ffd166');if(t>=T(44,'الثلاثاء')&&t<T(45))LBL('الثلاثاء',540,480,popS(t,T(44,'الثلاثاء')),70,'#fff');}],
// 47-50 Omar's house locked; neighbour: wife went to Marrakech 3 days ago; Omar sent her
[47,(t)=>{setEnv('alley','dusk');const nb=t>=T(49);put('you',{x:-2,y:.1,z:299,ry:nb?40:0,lid:.3,ex:nb?.8:.2},t);if(nb)put('fisher',{x:1.5,y:.1,z:298.5,ry:-40,lid:.3,mouth:talkIn(t,49)||talkAll(t,50)},t);C3(t,[0,4.4,308],[0,3,297],40);
  if(t<T(48))LBL('3',880,420,popS(t,T(47)),80,'#ffd166');if(t>=T(48)&&t<T(49)){const L2=G(FX,540,700,popS(t,T(48)));el('rect',{class:'o',x:-60,y:-10,width:120,height:100,rx:14,fill:'#d8b648'},L2);el('path',{class:'o',d:'M-40 -10 L-40 -60 Q0 -110 40 -60 L40 -10',fill:'none','stroke-width':14},L2);}
  if(t>=T(49,'فمراكش')){const g=G(FX,540,460,popS(t,T(49,'فمراكش')));el('rect',{class:'o',x:-200,y:-70,width:400,height:130,rx:24,fill:'#c0392b'},g);txt(g,0,24,64,'مراكش','#fff');if(t>=T(49,'ثلاثة'))LBL('3 أيام',540,620,popS(t,T(49,'ثلاثة')),48);}}],
// 51-57 maghrib, red sky; you sit on the rock; list of clues
[51,(t)=>{setEnv('port',t>=T(52)?'red':'dusk');put('you',{x:2,y:Y+.55,z:20,ry:0,sit:true,lid:.4,ey:.5,item:'notebook',pose:'hold'},t);C3(t,t<T(53)?[-4,6,34]:[2.4,4.6,25.5],t<T(53)?[4,2,16]:[2,3.4,20],42);
  if(t>=T(54)){[[54,'جاكيطة الشتا فالصيف'],[55,'خبز ل 3 أيام'],[56,'صندوق: حتى الخميس'],[57,'مرا تصيفطات']].forEach(([ln,s],i)=>{if(t>=T(ln))LBL(s,540,440+i*150,popS(t,T(ln)),48,'#fff6c8');});}}],
[58,Q(5,58)],[59,CTA2(59)],
// 60-62 answer 5
[60,(t)=>{if(t<T(60,'عارفين')){CARD(t);answerCard(t,T(60),5);return;}
  if(t<T(61)){setEnv('port','dusk');[['omar',-2.4],['hussein',0],['larbi',2.4]].forEach(([k,x])=>put(k,{x,y:Y,z:9,lid:.35,pose:k==='larbi'?'hold':'idle',item:k==='larbi'?'tea':''},t));C3(t,[0,5,19],[0,3.4,9],40);return;}
  CARD(t);if(t<T(62)){const g=paper(FX,540,900,700,520,-2);txt(g,0,-60,64,'كانو موجدين','#2a1a12');X(FX,540,1300,popS(t,T(61,'غرق')),.8);txt(FX,540,1500,56,'غرق؟','#fff');return;}
  chart(FX,t);el('circle',{cx:330,cy:1160,r:70+8*Math.sin(t*5),fill:'none',stroke:'#e53935','stroke-width':10},FX);LBL('أيام',330,980,popS(t,T(62,'أيام')),48,'#ffd166');}],
// 63-69 night, office logbook
[63,(t)=>{if(t<T(66)){setEnv('office','interior');put('you',{x:-298.5,y:.1,z:2.6,ry:-10,lid:.35,ey:.8,hx:.2},t);C3(t,[-297,5.5,9],[-298.5,2.8,.5],40);return;}
  CARD(t);const g=paper(FX,540,900,860,800,-1);[[66,'الصباح: 20',T(66,'عشرين')],[67,'خرجو: 9',T(67,'تسعة')],[68,'رجعو: 8',T(68,'تمنية')],[69,'بوشعيب: باقي فالبحر',T(69,'بوشعيب')]].forEach(([ln,s,tt],i)=>{if(t>=tt)txt(g,360,-270+i*170,66,s,i===3?'#1d5fa8':'#2a1a12',{'text-anchor':'start'});});}],
// 70-77 counting the boats on the quay at night
[70,(t)=>{setEnv('port','night');const n=t<T(73)?0:t<T(74)?Math.min(3,1+Math.floor((t-T(73))/.4)):t<T(77)?Math.min(20,3+Math.floor((t-T(74))*4)):20;
  put('you',{x:V(t,[[T(70),-12],[T(77),12]]),y:Y,z:20.3,ry:90,walk:t<T(77)?t*5:undefined,pose:'torch',item:'phone',lid:.3,ey:.6},t);C3(t,[V(t,[[T(70),-10],[T(77),8]]),9,36],[V(t,[[T(70),-8],[T(77),6]]),1,26],46);if(n>0)BIG(String(n),540,500,1,200);}],
// 78-85 the black boat at the quay end
[78,(t)=>{setEnv('port','night');blackBoat.visible=true;blackBoat.position.set(16,Math.sin(t*1.4)*.08,26);blackBoat.rotation.y=Math.PI/2;const L=[78,79,80,81,82,83,84,85].filter(l=>t>=T(l)).pop()||78;
  const cams={78:[[8,6,40],[16,1,26]],79:[[18,4,32],[16,1.2,26]],80:[[19,3,27.5],[16,1.2,24.5]],81:[[13,4.5,30],[16,1,26]],82:[[13,4.5,30],[16,1,26]],83:[[16.6,3.2,28.6],[16.3,.9,26.2]],84:[[8,6,40],[16,1,26]],85:[[8,6,40],[16,1,26]]};C3(t,cams[L][0],cams[L][1],40);
  if(t>=T(79))X(FX,540,460,popS(t,T(79,'سمية')),.6);if(L===83){const ph=((t*.7)%1);el('circle',{cx:540,cy:960,r:20,fill:'#ff6a2a',opacity:.6+.4*Math.sin(t*6)},FX);el('path',{d:`M540 ${930-ph*80} q-12 -16 0 -32`,stroke:'#cfd6e0','stroke-width':5,fill:'none',opacity:1-ph},FX);}
  if(t>=T(85)){const g=G(FX,540,460,popS(t,T(85)));el('rect',{class:'o',x:-170,y:-100,width:340,height:180,rx:10,fill:'#1d3a6a'},g);X(g,0,0,1,.8);}}],
[86,Q(6,86)],[87,CTA2(87)],
];
