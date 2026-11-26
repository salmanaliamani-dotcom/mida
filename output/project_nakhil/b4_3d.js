// عمارة النخيل — part 4
const GX=1200,AZ=-49;
function sepia(){flt('sepia(.65) contrast(1.05) brightness(.95)');}
function LG(t){setEnv('loge','interior');ENVS.loge.userData.door.visible=false;}
function tahL(t,o={}){put('tahar',Object.assign({x:GX+2.6,y:0,z:-3,ry:-40,sit:1,pose:'sitidle',lid:.45},o),t);}
function trio(t,o={}){put('you',Object.assign({x:EX-2.6,y:0,z:-3,ry:170,lid:.3},o.you||{}),t);put('sara',Object.assign({x:EX+2.6,y:0,z:-3,ry:-170,lid:.3},o.sara||{}),t);put('taharj',Object.assign({x:EX,y:0,z:-4.6,ry:180,pose:'hold',item:'keyring',lid:.35},o.tah||{}),t);}
function APT(t,o={}){setEnv('burnt+apt37','dark');const U=ENVS.burnt.userData;U.d37.rotation.y=1.47;U.strip.visible=false;flt('brightness(1.1)');
  put('taharj',Object.assign({x:EV-.4,y:0,z:AZ-1.2,ry:180,sit:1,pose:'sitidle',lid:.4},o.tah||{}),t);put('you',Object.assign({x:EV-2.6,y:0,z:AZ+.6,ry:150,sit:1,pose:'sitidle',lid:.3},o.you||{}),t);put('sara',Object.assign({x:EV+1.8,y:0,z:AZ+.6,ry:-150,sit:1,pose:'sitidle',lid:.3},o.sara||{}),t);}
function aptCam(t,v=0){if(v===0)C3(t,[EV-.4,5.4,-61.5],[EV-.4,2,AZ],44);else C3(t,[EV-.2,4.6,-59.2],[EV-.4,2.6,AZ-1.2],40);}
const SHOTS=[
// 1 Ba Tahar goes on
[1,(t)=>{LG(t);tahL(t,{cry:1,mouth:talkAll(t,1)*.3});C3(t,[GX-.4,5,7.6],[GX+2.2,2.8,-3],40);}],
// 2 flashback: dad grabbed me and ran down the corridor; smoke everywhere
[2,(t)=>{BURN(t,{flt:'sepia(.6) contrast(1.05)'});const k=cl((t-T(2))/5.5);const z=lerp(-38,-8,k);put('dad',{x:EV-.6,y:0,z,ry:0,walk:t*10,pose:'grab',lid:.1,browUp:.8},t);put('kid',{x:EV+.9,y:0,z:z+.4,ry:0,s:.6,walk:t*10,lid:.1,browUp:1,cry:1},t);fireAt(t,EV,4.6,z-8,6,3);
  C3(t,[EV+1.2,4.4,z+9],[EV,2.4,z],46);for(let i=0;i<5;i++){const ph=((t-T(2))*.4+i/5)%1;el('circle',{cx:150+i*190,cy:400+ph*300,r:90+ph*60,fill:'#4a4440',opacity:.4*(1-ph)},FX);}}],
// 3 he put me in the elevator and pressed the ground floor
[3,(t)=>{sepia();CAB(t,{beyond:'burnt',door:1,disp:'13',btn:t>=T(3,'وضغط')?0:-1,light:22});window.BTN13=1;put('kid',{x:EV,y:0,z:.4,ry:180,s:.6,lid:.1,cry:1,browUp:1},t);put('dad',{x:EV+1.6,y:0,z:-1.4,ry:-90,pose:t>=T(3,'وضغط')?'point':'grab',lid:.2},t);C3(t,[EV-8.5,5,.6],[EV+.6,3,-.8],44);}],
// 4 "wait for me downstairs, I'll bring your mom and come"
[4,(t)=>{sepia();CAB(t,{beyond:'burnt',door:1,disp:'13',btn:0,light:22});put('dad',{x:EV,y:0,z:-5.2,ry:0,pose:'give',lid:.3,smile:.3,mouth:talkIn(t,4)},t);put('kid',{x:EV,y:0,z:.6,ry:180,s:.6,lid:.1,cry:1},t);fireAt(t,EV,5,-14,6,2);C3(t,[EV+1,4.4,9.5],[EV,3.4,-5],44);}],
// 5 the door closed; the last thing he saw was his father's face
[5,(t)=>{sepia();const k=ease(cl((t-T(5,'تسد')+.4)/2.2));CAB(t,{beyond:'burnt',door:1-k,disp:'13',btn:0,light:22});put('dad',{x:EV,y:0,z:-5.2,ry:0,pose:'idle',lid:.3,smile:.4},t);put('kid',{x:EV,y:0,z:.6,ry:180,s:.6,lid:.1,cry:1},t);fireAt(t,EV,5,-14,6,2);
  C3(t,lerp3(t,[EV+1,4.4,9.5],[EV+.5,4,6],T(5),T(6)),[EV,3.6,-5],42);}],
// 6 and he never came back
[6,(t)=>{sepia();CAB(t,{disp:String(Math.max(0,12-Math.floor((t-T(6))*6))),btn:0,light:22});put('kid',{x:EV,y:0,z:.4,ry:180,s:.6,lid:.1,cry:1},t);C3(t,[EV+.8,4.8,9.5],[EV,2.6,-2],44);dim(cl((t-T(6))/1.6)*.6);}],
// 7-8 that's why the elevator: the last place he saw his father
[7,(t)=>{CAB(t,{disp:'0',btn:-1,light:16});window.BTN13=0;C3(t,lerp3(t,[EV+.8,4.8,9.5],[EV+.4,4.6,7],T(7),T(9)),[EV,3.4,-2.6],44);if(t>=T(8,'آخر'))LBL('آخر بلاصة',540,380,popS(t,T(8,'آخر')),58,'#ffd166','#17120f');}],
// 9-10 "every night at 00:30 I go up to say good night... and ask their forgiveness"
[9,(t)=>{LG(t);const L=t>=T(10)?10:9;tahL(t,{cry:L===10?1:.0,lid:.5,mouth:talkIn(t,L)*.8});C3(t,lerp3(t,[GX-.4,5,8],[GX,4.8,6.8],T(9),T(11)),[GX+2.2,2.8,-3],40);clk(t,T(9,'الطناش'),0,30,220,330,95);if(L===10)LBL('السماح',780,400,popS(t,T(10,'السماح')),58,'#fff','#17120f');}],
// 11 you leave, unable to say anything
[11,(t)=>{LOB(t);const k=cl((t-T(11))/2.4);put('you',{x:lerp(LX+9,LX+3,k),y:0,z:lerp(-.6,1.6,k),ry:-110,walk:k<1?t*6:undefined,lid:.5,ey:.6},t);put('sara',{x:lerp(LX+9.6,LX+4,k),y:0,z:lerp(1,3,k),ry:-110,walk:k<1?t*6+1:undefined,lid:.5,ey:.6},t);C3(t,[LX+2,5.2,12],[LX+5,3,1],44);}],
// 12-13 your room, by the window; his voice still in your ears
[12,(t)=>{setEnv('room','interior');put('you',{x:1000+2,y:0,z:-5.4,ry:180,pose:'chin',lid:.4},t);C3(t,[1000-.4,5,4.5],[1000+2,3.6,-6],42);if(t>=T(13,'كنطلب')){const g=G(FX,540,360,popS(t,T(13,'كنطلب')));el('rect',{x:-330,y:-60,width:660,height:110,rx:50,fill:'#fff',opacity:.92,stroke:'#17120f','stroke-width':5},g);txt(g,0,18,48,'"كنطلب منهم السماح"','#17120f');}}],
// 14 forgiveness for what? the candle of a child afraid of the dark?
[14,(t)=>{setEnv('apt37','interior');flt('sepia(.65) brightness(.6)');put('kid',{x:EV-1,y:0,z:-50,ry:20,s:.6,sit:1,pose:'sitidle',lid:.1,browUp:.8},t);C3(t,[EV+1,3.4,-43.8],[EV-.8,1.2,-51],42);QM(840,380,popS(t,T(14)));}],
// 15 thinking: the candle, the curtain, the hour of the fire
[15,(t)=>{setEnv('room','interior');put('you',{x:1000+2,y:0,z:-5.4,ry:200,pose:'chin',lid:.35,ey:-.4},t);C3(t,[1000-.4,5,4.5],[1000+2,3.6,-6],42);
  const cards=[['فالشمعة','الشمعة',230],['والريدو','الريدو',540],['وساعة','ساعة الحريق',850]];for(const [w,lb,x] of cards)if(t>=T(15,w))LBL(lb,x,1500,popS(t,T(15,w)),48,'#fff','#17120f');}],
[16,QB(10,16,(t)=>{setEnv('apt37','interior');flt('sepia(.65) brightness(.6)');put('kid',{x:EV-1,y:0,z:-50,ry:20,s:.6,sit:1,pose:'sitidle',lid:.1},t);C3(t,[EV+1,3.4,-43.8],[EV-.8,1.2,-51],42);})],
[17,CB(17,(t)=>{STREET(t,'night');C3(t,[20,8,90],[0,95,-8],46);})],
// 18 answer: no. no child should carry that guilt alone
[18,AB(10,18,(t)=>{LG(t);tahL(t,{cry:1,lid:.5});C3(t,[GX-.4,5,7.6],[GX+2.2,2.8,-3],40);})],
// 19 but Sara didn't sleep that night
[19,(t)=>{setEnv('room','interior');put('sara',{x:1000+5,y:0,z:-3.6,ry:180,sit:1,pose:'write',item:'book',lid:.3},t);C3(t,[1000+1,5,8],[1000+4.6,2.8,-4],42);clk(t,T(19),3,0,220,330,95);}],
// 20 morning: she comes running, a blue folder in her hand
[20,(t)=>{setEnv('landing','interior');const k=cl((t-T(20,'جات'))/2);put('sara',{x:lerp(EV+5,EV-1.4,k),y:0,z:-11,ry:-90,walk:k<1?t*11:undefined,pose:'hold',item:'dossier',lid:.2,smile:.5,browUp:.5},t);put('you',{x:EV-4.2,y:0,z:-10.4,ry:80,lid:.4},t);C3(t,[EV-.6,5.2,2.6],[EV-1.6,3,-10.6],44);if(t>=T(20,'أزرق'))LBL('دوسي أزرق',780,380,popS(t,T(20,'أزرق')),52,'#2f6ab8','#fff');}],
// 21-22 civil protection archives; she found the fire report; since 6 a.m.; 55 years of paper
[21,(t)=>{setEnv('landing','interior');const L=t>=T(22)?22:21;put('sara',{x:EV-1.4,y:0,z:-11,ry:-70,pose:'hold',item:'dossier',lid:.2,smile:.3,mouth:talkIn(t,L)*.8},t);put('you',{x:EV-4.2,y:0,z:-10.4,ry:70,lid:.3,browUp:.4},t);C3(t,[EV-1.2,5,1.8],[EV-2.6,3,-10.6],42);
  if(L===21&&t>=T(21,'الوقاية'))LBL('الوقاية المدنية',540,360,popS(t,T(21,'الوقاية')),52,'#d94a4a','#fff');if(L===22){clk(t,T(22,'الستة'),6,0,220,330,95);if(t>=T(22,'خمسة'))BIG('55',840,400,popS(t,T(22,'خمسة')),120);}}],
// 23 you open the folder
[23,(t)=>{setEnv('landing','interior');put('you',{x:EV-3,y:0,z:-10.6,ry:20,pose:'hold',item:'dossier',lid:.4,hx:.25},t);put('sara',{x:EV-.6,y:0,z:-11,ry:-40,lid:.3},t);C3(t,[EV-1.2,5.2,1.6],[EV-2.2,3,-10.6],42);}],
// 24-27 the report: electrical fault in the elevator motor room; fire from the corridor ceiling; 00:20 — ten minutes before he woke
[24,(t)=>{setEnv('landing','interior');put('you',{x:EV-3,y:0,z:-10.6,ry:20,pose:'hold',item:'dossier',lid:.4,hx:.25},t);put('sara',{x:EV-.6,y:0,z:-11,ry:-40,lid:.3},t);C3(t,[EV-1.2,5.2,1.6],[EV-2.2,3,-10.6],42);
  const L=t>=T(27)?27:t>=T(26)?26:t>=T(25)?25:24;if(L<=25){drawReport(t,T(24),L===24?(t>=T(24,'فوق')?3:t>=T(24,'فالبيت')?2:1):5);if(L===25&&t>=T(25)+1)0;}else if(L===26){drawReport(t,T(24),6);}
  else{const g=G(FX,540,960,1);dim(.5);clockFace(FX,330,900,150,0,20);clockFace(FX,750,900,150,0,30);txt(FX,330,1120,52,'الحريق','#ff7a1a');txt(FX,750,1120,52,'فاق الطاهر','#9fd4ff');LBL('10 دقايق قبل',540,1300,popS(t,T(27,'عشر')),56,'#ffd166','#17120f');}}],
// 28 his candle had nothing to do with it
[28,(t)=>{setEnv('apt37','interior');flt('sepia(.65) brightness(.65)');put('kid',{x:EV-1,y:0,z:-50,ry:20,s:.6,sit:1,pose:'sitidle',lid:.1},t);C3(t,[EV+1,3.4,-43.8],[EV-.8,1.2,-51],42);const [x,y]=project(EV-.5,.8,-51.4);X(FX,x,y-40,popS(t,T(28,'علاقة')),1.3);}],
// 29-30 the curtain burned from outside; his father the electrician knew from the smell and ran to save his son first
[29,(t)=>{if(t<T(30)){dim(0);diagFire(t,T(29)-.3);setEnv('card');if(t>=T(29,'البرا'))LBL('من البرا',540,1560,popS(t,T(29,'البرا')),58,'#ff7a1a','#fff');return;}
  BURN(t,{flt:'sepia(.6) contrast(1.05)'});const k=cl((t-T(30,'وجرى'))/3.2);const z=lerp(-38,-12,k);put('dad',{x:EV-.6,y:0,z,ry:0,walk:k>0?t*10:undefined,pose:'grab',lid:.1,browUp:.8,hx:t<T(30,'وجرى')?-.1:0},t);put('kid',{x:EV+.9,y:0,z:z+.4,ry:0,s:.6,walk:k>0?t*10:undefined,lid:.1,cry:1},t);fireAt(t,EV,6,z-10,6,1.5);C3(t,[EV+1.2,4.6,z+9.5],[EV,2.4,z],46);
  if(t>=T(30,'كهربائي')&&t<T(30,'وجرى')){const [x,y]=project(EV-.6,5.6,z);LBL('كهربائي',x,y-30,popS(t,T(30,'كهربائي')),50,'#2a4a7a','#fff');}}],
[31,QB(11,31,(t)=>{APT(t);aptCam(t,1);})],
[32,CB(32,(t)=>{STREET(t,'night');C3(t,[20,8,90],[0,95,-8],46);})],
// 33-34 that night at 00:30: three of you in front of the elevator
[33,(t)=>{LOB(t,{night:1});trio(t,{tah:{x:EX+.4,z:-1.6,ry:-140,pose:'hold',item:'keyring',litem:'candle'}});C3(t,lerp3(t,[LX+1,6,12],[LX+1.6,5.6,10.5],T(33),T(35)),[EX,3,-2],44);clk(t,T(33,'الطناش'),0,30,220,330,95);
  if(t>=T(34)){const lab=[['نتا',EX-2.6,-3],['وسارة',EX+2.6,-3],['الطاهر',EX+.4,-1.6]];for(const [w,x,z] of lab)if(t>=T(34,w)){const [px,py]=project(x,5.4,z);LBL(w==='وسارة'?'سارة':w==='الطاهر'?'با الطاهر':'نتا',px,py-30,popS(t,T(34,w)),46,'#ffd166','#17120f');}}}],
// 35 "what are you doing here?"
[35,(t)=>{LOB(t,{night:1});put('taharj',{x:EX+.4,y:0,z:-1.6,ry:20,pose:'hold',item:'keyring',litem:'candle',lid:.1,browUp:.8,mouth:talkIn(t,35)},t);put('you',{x:EX-1.6,y:0,z:2.8,ry:170,lid:.3},t);put('sara',{x:EX+2.4,y:0,z:2.8,ry:-170,lid:.3},t);C3(t,[EX-.2,5,10.5],[EX+.2,3.2,-.6],42);}],
// 36 "we want to go up with you. if you'll let us"
[36,(t)=>{LOB(t,{night:1});put('you',{x:EX-1.6,y:0,z:2.8,ry:200,lid:.3,smile:.3,mouth:talkIn(t,36)},t);put('sara',{x:EX+2.4,y:0,z:2.8,ry:180,lid:.3,smile:.3},t);put('taharj',{x:EX+.4,y:0,z:-1.6,ry:10,pose:'hold',item:'keyring',lid:.3,browUp:.4},t);C3(t,[EX-3.4,5,-6.6],[EX-1,3.6,2.4],42);}],
// 37 silence; then he bends and puts the small key under the panel
[37,(t)=>{const L=t>=T(37,'ومن')?1:0;if(!L){LOB(t,{night:1});put('taharj',{x:EX+.4,y:0,z:-1.6,ry:10,pose:'hold',item:'keyring',lid:.45,ey:.6},t);C3(t,[EX+.2,4.6,7],[EX+.4,3.6,-1.6],40);return;}
  CAB(t,{btn:-1,disp:'0',light:18});put('taharj',{x:EV+1.6,y:0,z:-1.2,ry:-90,pose:'point',item:'key',litem:'candle',lid:.3,hx:.35},t);put('you',{x:EV-1.4,y:0,z:1.6,ry:160,lid:.3},t);put('sara',{x:EV,y:0,z:2,ry:180,lid:.3},t);C3(t,[EV-8.5,4.4,.4],[EV+1.4,2.8,-.6],42);
  const [x,y]=project(EV+2.97,2.4,-2.1);const g=G(FX,x,y,popS(t,T(37,'وحط')));el('rect',{x:-40,y:-40,width:80,height:80,rx:10,fill:'#c9a24a',stroke:'#17120f','stroke-width':5},g);el('circle',{cy:-8,r:12,fill:'#17120f'},g);}],
// 38 the elevator goes up
[38,(t)=>{CAB(t,{disp:seq(t,[[T(38),'1'],[T(38)+.4,'5'],[T(38)+.8,'9'],[T(38)+1.2,'12']]),light:18});put('taharj',{x:EV+1.2,y:0,z:-.6,ry:180,pose:'hold',item:'keyring',litem:'candle',lid:.35},t);put('you',{x:EV-1.4,y:0,z:.8,ry:180,lid:.3},t);put('sara',{x:EV,y:0,z:1.6,ry:180,lid:.3},t);C3(t,[EV+.8,4.8,9.5],[EV,4,-2.5],44,.4);}],
// 39 13th floor; the black corridor; door 37
[39,(t)=>{BURN(t,{apt:1,d37:0,yl:6});const k=cl((t-T(39))/5);const z=lerp(-8,-36,k);put('taharj',{x:EV,y:0,z:z-2,ry:180,walk:t*5,pose:'candle',item:'candleL',lid:.35},t);put('you',{x:EV-1.4,y:0,z,ry:180,walk:t*5+1,lid:.3},t);put('sara',{x:EV+1.4,y:0,z:z+.4,ry:180,walk:t*5+2,lid:.3},t);C3(t,[EV+1.4,5.4,z+9],[EV,3,z-8],44);
  if(t>=T(39,'الباب')){const [x,y]=project(EV,4.9,-42.8);el('circle',{cx:x,cy:y,r:60*popS(t,T(39,'الباب')),fill:'none',stroke:'#ffd166','stroke-width':7},FX);}}],
// 40 you go in and sit on the floor next to him, in front of the photos
[40,(t)=>{APT(t);aptCam(t,0);}],
// 41-44 you hand him the blue folder; he reads: line one, line two... and stops
[41,(t)=>{const L=t>=T(44)?44:t>=T(43)?43:t>=T(42)?42:41;APT(t,{tah:{pose:'hold',item:L>=42?'dossier':'',lid:L>=42?.5:.35,ey:L>=42?.8:0,hx:L>=42?.25:0},you:{pose:L===41?'give':'sitidle',item:L===41?'dossier':''}});aptCam(t,L>=43?1:0);
  if(L===43){const g=paperSheet(t,T(43),720,420,1450,'#eef1f4');txt(g,0,-110,40,'السبب: عطب كهربائي',t>=T(43,'السطر')?'#b5241e':'#17120f');if(t>=T(43,'الثاني'))txt(g,0,0,38,'فالبيت ديال المحرك ديال المصعد','#17120f');}}],
// 45-46 "an electrical fault... in the elevator? so... it wasn't the candle?"
[45,(t)=>{const L=t>=T(46)?46:45;APT(t,{tah:{pose:'hold',item:'dossier',lid:.0,browUp:1,mouth:talkIn(t,L)*.7,hz:Math.sin(t*20)*1.5}});C3(t,[EV-.2,4.6,-58.8],[EV-.4,2.6,AZ-1.2],40);}],
// 47 Sara: "not the candle. not you. it was never you"
[47,(t)=>{APT(t,{sara:{lid:.25,smile:.4,mouth:talkIn(t,47)*.8,pose:'give'},tah:{pose:'hold',item:'dossier',lid:.3,browUp:.8}});C3(t,[EV+.8,4.6,-59],[EV+1.2,2.4,AZ+.2],42);if(t>=T(47,'نتا'))X(FX,780,400,popS(t,T(47,'نتا')),1);}],
// 48-49 he cries like a 7-year-old; in the middle of crying, he starts to laugh
[48,(t)=>{const laugh=t>=T(49,'بدا');APT(t,{tah:{pose:'cover',lid:laugh?.6:.5,cry:1,smile:laugh?1:-.3,mouth:laugh?.3+.2*Math.abs(Math.sin(t*9)):mouthAt(t)*.4,hx:Math.sin(t*6)*.05}});C3(t,lerp3(t,[EV-.2,4.8,-60],[EV-.2,4.4,-58.4],T(48),T(50)),[EV-.4,2.6,AZ-1.2],40);if(t>=T(49,'سبعة'))BIG('7',840,400,popS(t,T(49,'سبعة')),120,'#9fd4ff');}],
// 50 "55 years... asking forgiveness for something I didn't do"
[50,(t)=>{APT(t,{tah:{pose:'sitidle',lid:.4,cry:1,smile:.5,mouth:talkIn(t,50)*.8}});aptCam(t,1);if(t>=T(50,'خمسة'))BIG('55',840,400,popS(t,T(50,'خمسة')),120);}],
// 51-52 he takes his parents' photo, holds it to his chest: "dad, mom... it wasn't me"
[51,(t)=>{const L=t>=T(52)?52:51;APT(t,{tah:{pose:'hug',item:'photo',litem:'photo',lid:.55,cry:1,smile:.4,mouth:L===52?talkIn(t,52)*.6:0}});C3(t,lerp3(t,[EV-.2,4.8,-60],[EV-.2,4.4,-58.4],T(51),T(53)),[EV-.4,2.6,AZ-1.2],40);}],
// 53 morning: everyone in the building knows the story
[53,(t)=>{LOB(t);flt('brightness(1.08)');put('neighbor',{x:LX-2,y:0,z:1,ry:30,lid:.3,smile:.4},t);put('nb2',{x:LX+.6,y:0,z:2,ry:10,lid:.3,smile:.5},t);put('nb3',{x:LX+3.2,y:0,z:1,ry:-30,lid:.3,smile:.4},t);put('sara',{x:LX+5.6,y:0,z:1.6,ry:-50,lid:.3,smile:.5},t);C3(t,[LX+1.6,5.4,13],[LX+1.6,3,1],46);}],
// 54 they raised money, cleaned the 13th floor, and put a small plaque with the parents' names
[54,(t)=>{setEnv('clean','interior');const pl=t>=T(54,'وحطو');C3(t,pl?lerp3(t,[EV+1.6,4.6,-18],[EV+1,4.4,-20.4],T(54,'وحطو'),T(55)):[EV+1.2,5,-6],pl?[EV-3.4,4.2,-24]:[EV,3,-40],pl?40:46);
  if(t>=T(54,'ونقاو')&&!pl)LBL('نقاو الطابق',540,380,popS(t,T(54,'ونقاو')),56,'#fff','#17120f');}],
// 55 the elevator has its 13th-floor button again
[55,(t)=>{window.BTN13=1;CAB(t,{btn:13,disp:'13'});C3(t,[EV-1.2,4.4,1.2],[EV+3,3.8,-2.1],40);const [x,y]=project(EV+2.97,6.2,-1.9);el('circle',{cx:x,cy:y,r:60*popS(t,T(55,'الزر')),fill:'none',stroke:'#ffd166','stroke-width':8},FX);}],
// 56-58 Ba Tahar still tells every new resident the same thing... but now he laughs
[56,(t)=>{window.BTN13=1;LOB(t);flt('brightness(1.06)');const L=t>=T(58)?58:t>=T(57)?57:56;put('tahar',{x:LX+3,y:0,z:0,ry:-40,pose:L===57?'grab':'idle',lid:.3,smile:L===58?1:.4,mouth:L===57?talkIn(t,57):L===58?.25+.15*Math.abs(Math.sin(t*8)):0},t);
  put('neighbor',{x:LX,y:0,z:1.2,ry:40,pose:'case',item:'suitcase',lid:.3,browUp:L===57?.5:0,smile:L===58?.6:0},t);C3(t,lerp3(t,[LX+1.2,4.8,10.5],[LX+1.4,4.6,9],T(56),T(59)),[LX+1.6,3.2,.4],42);
  if(L===57){clk(t,T(57,'نص'),0,0,220,330,95);if(t>=T(57,'المصعد')){LBL('المصعد',820,330,popS(t,T(57,'المصعد')),50,'#fff','#17120f');X(FX,820,330,popS(t,T(57,'تركبش')),.9);}}}],
// 59 because since that night, he never goes up alone
[59,(t)=>{window.BTN13=1;CAB(t,{btn:13,disp:'13',light:22});put('tahar',{x:EV+1.2,y:0,z:-.4,ry:180,lid:.3,smile:.8},t);put('you',{x:EV-1.4,y:0,z:.8,ry:200,lid:.3,smile:.6},t);put('sara',{x:EV,y:0,z:1.8,ry:170,lid:.3,smile:.6},t);C3(t,[EV+.8,4.8,9.5],[EV,3.6,-1.6],44);}],
// 60 closing
[60,CB(60,(t)=>{STREET(t,'night');C3(t,[20,8,90],[0,95,-8],46);})],
];
