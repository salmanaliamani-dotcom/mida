// عمارة النخيل — part 2
const OX=1400,GX=1200;
function OFF(t){setEnv('office','interior');}
function bouch(t,o={}){put('bouchaib',Object.assign({x:OX+2,y:0,z:-3.9,ry:0,sit:1,pose:'sitidle',lid:.35},o),t);}
function duo(t,o={},p={}){put('you',Object.assign({x:OX-1.6,y:0,z:1.2,ry:140,lid:.3},o),t);put('sara',Object.assign({x:OX+5.6,y:0,z:1.2,ry:-140,lid:.3},p),t);}
function offCam(t,v=0){if(v===0)C3(t,[OX+2,6.2,12],[OX+2,2.6,-1.5],44);else if(v===1)C3(t,[OX+2.2,5.2,6.8],[OX+2,3,-3.9],42);else C3(t,[OX+2,8.6,7],[OX+2,2.6,-1.5],44);}
function sepia(){flt('sepia(.65) contrast(1.05) brightness(.95)');}
function stairsUp(t,k,o={}){setEnv('stairs','interior');const z=lerp(5,-3.4,k),y=Math.max(0,(5.1-z)/.85*.55);put('you',Object.assign({x:800-3,y,z,ry:180,walk:t*12,lid:.5,mouth:.3},o),t);C3(t,[800-.4,y+5.2,z+8.5],[800-3,y+2.6,z],44);}
const SHOTS=[
// 1-2 you put the toy car on his table
[1,(t)=>{setEnv('loge','interior');ENVS.loge.userData.door.visible=false;const L=t>=T(2)?2:1;put('tahar',{x:GX+2.6,y:0,z:-3,ry:-20,sit:1,pose:'sitidle',lid:.35},t);
  const k=cl((t-T(1))/2.2);put('you',{x:L===1?lerp(GX-3,GX-.4,k):GX-.4,y:0,z:L===1?lerp(4,.2,k):.2,ry:150,walk:L===1&&k<1?t*8:undefined,pose:L===2&&t<T(2,'وما')?'give':'idle',item:L===1?'toycar':''},t);
  if(L===2&&t>=T(2,'وما')-.6){const c=ENVS.loge.userData;}C3(t,[GX+1.4,5.2,10],[GX+1.4,2.6,-1.5],44);if(L===2&&t>=T(2)+.8){const [x,y]=project(GX+2.3,1.7,-1.4);const g=G(FX,x,y,1);el('rect',{x:-30,y:-14,width:60,height:24,rx:6,fill:'#d42a1e',stroke:'#17120f','stroke-width':4},g);}}],
// 3-5 he stares; holds it with both hands; tears
[3,(t)=>{setEnv('loge','interior');ENVS.loge.userData.door.visible=false;const L=t>=T(5)?5:t>=T(4)?4:3;
  put('tahar',{x:GX+2.6,y:0,z:-3,ry:-20,sit:1,pose:L>=4?'hold':'sitidle',item:L>=4?'toycar':'',litem:'',lid:L===5?.45:.15,ey:.5,browUp:L>=4?.7:.3,cry:L===5?1:0},t);
  C3(t,lerp3(t,[GX+.6,4.8,5.8],[GX+1.1,4.6,4.4],T(3),T(6)),[GX+2.6,2.8,-3],40);if(L===3){const [x,y]=project(GX+2.3,1.7,-1.4);const g=G(FX,x,y,1);el('rect',{x:-30,y:-14,width:60,height:24,rx:6,fill:'#d42a1e',stroke:'#17120f','stroke-width':4},g);}}],
// 6 "get out. please."
[6,(t)=>{setEnv('loge','interior');ENVS.loge.userData.door.visible=false;put('tahar',{x:GX+2.4,y:0,z:-2.8,ry:-40,sit:1,pose:'hold',item:'toycar',lid:.4,cry:1,brow:-.4,mouth:talkIn(t,6)},t);put('you',{x:GX-1.4,y:0,z:.4,ry:130,lid:.3,browUp:.5},t);C3(t,[GX+.4,5,9],[GX+.8,2.6,-1.4],44);}],
// 7 you leave, thinking
[7,(t)=>{LOB(t);const k=cl((t-T(7))/2.4);put('you',{x:lerp(LX+9,LX+3,k),y:0,z:lerp(-.6,2,k),ry:-110,walk:k<1?t*7:undefined,pose:k>=1?'chin':'idle',lid:.4,ey:.5},t);C3(t,[LX-1,5.2,11],[LX+5,3,0],44);
  if(t>=T(7,'الجواب'))QM(760,480,popS(t,T(7,'الجواب')));}],
// 8-9 with Sara to the syndic, Si Bouchaib (papers of the whole building)
[8,(t)=>{OFF(t);const L=t>=T(9)?9:8;const k=cl((t-T(8))/2.6);bouch(t,{lid:.3,ey:.3});duo(t,{z:lerp(6,1.6,k),walk:k<1?t*8:undefined},{z:lerp(6.4,1.8,k),walk:k<1?t*8+1:undefined});offCam(t,0);
  if(L===8&&t>=T(8,'سي')){const [x,y]=project(OX+2,5.5,-3.9);LBL('سي بوشعيب',x,y-30,popS(t,T(8,'سي')),54,'#ffd166','#17120f');}
  if(L===9&&t>=T(9,'كاغيط'))LBL('كاغيط العمارة',300,400,popS(t,T(9,'كاغيط')),50,'#fff','#17120f');}],
// 10 "we want to see the old plan"
[10,(t)=>{OFF(t);bouch(t,{ey:.4});duo(t,{mouth:talkIn(t,10)});offCam(t,0);}],
// 11 he opens an old cabinet, takes out a big yellowed sheet
[11,(t)=>{OFF(t);const k=cl((t-T(11))/2);put('bouchaib',{x:lerp(OX+2,OX-3.4,k),y:0,z:lerp(-3.4,-3.2,k),ry:k<1?-100:180,walk:k<1?t*7:undefined,pose:t>=T(11,'وخرج')?'hold':'idle',item:t>=T(11,'وخرج')?'map':'',lid:.35},t);duo(t);
  C3(t,[OX+3,5.2,8.5],[OX-2.4,3,-3.6],44);}],
// 12-15 the plan from 1968: 13 floors; on the 13th four apartments, among them 37
[12,(t)=>{OFF(t);ENVS.office.userData.plan.visible=true;bouch(t,{x:OX+2,z:-3.9,sit:1});duo(t,{z:.6,ry:170,hx:.3},{z:.6,ry:-170,hx:.3,pose:t>=T(13)?'point':'idle'});offCam(t,2);
  const L=t>=T(15)?15:t>=T(14)?14:t>=T(13)?13:12;if(L>=12&&t>=T(12,'التصميم')+.3){const cnt=L===13?Math.floor(cl((t-T(13,'وبدات'))/(T(14)-T(13,'وبدات')))*13):L>=14?13:undefined;
   drawPlan(t,T(12,'التصميم')+.3,{count:L>=13?cnt:undefined,finger:L===13?Math.max(1,cnt||1):undefined,hi13:L>=14,apts:L>=15?(t>=T(15,'سبعة')?2:1):0});if(L===12&&t>=T(12,'عام'))LBL('1968',540,1560,popS(t,T(12,'عام')),70,'#2f4a7a','#fff');if(L===14)BIG('13',860,420,popS(t,T(14)),130,'#ff3b30');}}],
// 16-17 he looks at you and sighs: "I knew someday someone would ask"
[16,(t)=>{OFF(t);const L=t>=T(17)?17:16;bouch(t,{lid:L===16?.55:.35,brow:.2,mouth:L===17?talkIn(t,17):0,hx:L===16?Math.sin((t-T(16))*2)*.06:0});duo(t);offCam(t,1);}],
// 18-22 the newspaper from 1971: fire, 13th floor, family in 37, the rest torn off
[18,(t)=>{OFF(t);const L=t>=T(22)?22:t>=T(21)?21:t>=T(20)?20:t>=T(19)?19:18;ENVS.office.userData.paper.visible=true;
  if(L===18){put('bouchaib',{x:OX-2.6,y:0,z:-2.4,ry:60,pose:'hold',item:'map',lid:.35},t);duo(t);C3(t,[OX+3,5.2,8.5],[OX-1.4,3,-2.4],44);return;}
  bouch(t);duo(t,{z:.6,ry:170,hx:.3},{z:.6,ry:-170,hx:.3});offCam(t,2);drawNews(t,T(19)-.2,{head:L>=20,fam:L>=21,torn:L>=22});if(L===19)LBL('1971',540,1560,popS(t,T(19,'عام')),70,'#3a3a3a','#fff');}],
[23,QB(4,23,(t)=>{OFF(t);ENVS.office.userData.paper.visible=true;bouch(t);duo(t);offCam(t,2);})],
[24,CB(24,(t)=>{STREET(t,'night');C3(t,[20,8,90],[0,45,-8],46);})],
// 25 answer: a big fire on the 13th floor, 55 years ago
[25,AB(4,25,(t)=>{STREET(t,'night');sepia();fireAt(t,0,92,1.5,30,8);C3(t,[14,60,110],[0,80,-8],46);if(t>=T(25,'خمسة'))LBL('هادي 55 عام',540,1560,popS(t,T(25,'خمسة')),60,'#ffd166','#17120f');})],
// 26 Si Bouchaib tells the rest
[26,(t)=>{OFF(t);bouch(t,{lid:.4,ey:.4});duo(t);offCam(t,1);}],
// 27-28 the parents never came out; only the boy survived, 7 years old
[27,(t)=>{const L=t>=T(28)?28:27;sepia();if(L===27){CAB(t,{beyond:'burnt',door:1,disp:'',on:0,tod:'dark',light:6});fireAt(t,EV,0,-30,6,5);C3(t,[EV+.5,4.4,-6],[EV,3,-43],46);
   const g=G(FX,540,560,popS(t,T(27)));for(const [dx,lb] of[[-130,'الأب'],[130,'الأم']]){const h=G(g,dx,0,1);el('circle',{r:70,fill:'#3a3a3a',stroke:'#fff','stroke-width':6},h);txt(h,0,140,44,lb,'#fff');}if(t>=T(27,'خرجوش'))X(FX,540,560,popS(t,T(27,'خرجوش')),1.6);return;}
  setEnv('lobby','interior');put('kid',{x:LX+2,y:0,z:1,ry:0,s:.6,lid:.2,cry:1,browUp:.8},t);C3(t,[LX+2,3.2,7.5],[LX+2,1.8,1],42);if(t>=T(28,'سبعة'))BIG('7',820,420,popS(t,T(28,'سبعة')),130);}],
// 29 they bricked the floor, removed the button
[29,(t)=>{if(t<T(29,'وحيدو')){STREET(t,'day');C3(t,[8,88,40],[0,95,-2],42);if(t>=T(29,'بالآجور'))LBL('آجور',540,1500,popS(t,T(29,'بالآجور')),56,'#b5543a','#fff');return;}
  CAB(t,{btn:-1,disp:'0'});C3(t,[EV-1.2,4.4,1.2],[EV+3,3.8,-2.1],40);const [x,y]=project(EV+2.97,4.95,-2.1);X(FX,x+150,y-60,popS(t,T(29,'وحيدو')),.8);LBL('13',x+150,y-60,popS(t,T(29,'الزر')),54,'#fff','#17120f');}],
// 30 residents: "bad omen, let it be forgotten"
[30,(t)=>{LOB(t);put('neighbor',{x:LX-2,y:0,z:1,ry:40,lid:.4,brow:.4,mouth:talkIn(t,30)*.5},t);put('nb2',{x:LX+1,y:0,z:1.6,ry:-30,lid:.4,pose:'cover'},t);put('nb3',{x:LX+3.6,y:0,z:.6,ry:-60,lid:.5,brow:.3},t);C3(t,[LX+1,5,11],[LX+1,3,1],44);
  if(t>=T(30,'فال'))LBL('فال خايب',540,380,popS(t,T(30,'فال')),58,'#24345c','#fff');}],
// 31 "and the boy? what was his name?"
[31,(t)=>{OFF(t);bouch(t);duo(t,{mouth:talkIn(t,31),browUp:.4});C3(t,[OX-1.5,5,7.5],[OX+.6,3.6,1.6],42);}],
// 32-33 he says nothing, looks out toward the little room by the entrance
[32,(t)=>{const L=t>=T(32,'للبيت')?2:1;if(L===1){OFF(t);bouch(t,{hy:-50,lid:.45,ey:.4,ex:-.8});duo(t);offCam(t,1);return;}
  LOB(t);C3(t,lerp3(t,[LX+2,5,8],[LX+5,4.4,4],T(32,'للبيت'),T(34)),[LX+12,3.4,-1],40);}],
// 34-35 Sara finds the elevator maintenance book
[34,(t)=>{OFF(t);ENVS.office.userData.book.visible=t<T(35);put('sara',{x:OX-2.6,y:0,z:-2.6,ry:180,pose:t>=T(35)?'hold':'idle',item:t>=T(35)?'book':'',lid:.3,browUp:.4},t);put('you',{x:OX+1.6,y:0,z:.2,ry:-130,lid:.3},t);bouch(t);C3(t,[OX+4.4,5.4,8],[OX-2.2,3,-2.6],44);
  if(t>=T(35))LBL('دفتر الصيانة',540,380,popS(t,T(35)),56,'#fff','#17120f');}],
// 36-37 every month the same line
[36,(t)=>{OFF(t);bouch(t);duo(t,{hx:.2},{pose:'hold',item:'book',hx:.3});offCam(t,0);drawLedger(t,T(36),Math.floor(1+(t-T(36))*3));if(t>=T(37,'الطاهر')){const g=G(FX,540,1280,popS(t,T(37,'الطاهر')));el('rect',{x:-200,y:-50,width:400,height:90,rx:16,fill:'#ffd166',stroke:'#17120f','stroke-width':5},g);txt(g,0,18,52,'ب. الطاهر','#17120f');}}],
// 38 "the special key?"
[38,(t)=>{OFF(t);bouch(t);duo(t,{mouth:talkIn(t,38),browUp:.5,ry:120},{pose:'hold',item:'book',ry:-120});C3(t,[OX+1.8,5,8.5],[OX+1.8,3.4,1.6],42);}],
// 39-42 a small lock hidden under the button panel; only one key in the world
[39,(t)=>{const L=t>=T(42)?42:t>=T(41)?41:t>=T(40)?40:39;
  if(L===39){OFF(t);bouch(t,{pose:'cover',lid:.4,mouth:0});duo(t);offCam(t,1);return;}
  if(L===42){OFF(t);bouch(t,{lid:.3,mouth:talkIn(t,42)*.6});duo(t);offCam(t,1);const g=G(FX,540,420,popS(t,T(42,'واحد')));el('circle',{r:110,fill:'#fff',stroke:'#17120f','stroke-width':6},g);txt(g,0,40,120,'1','#17120f');return;}
  sepia();CAB(t,{btn:L===41?13:-1,disp:L===41&&t>=T(41,'كيطلع')?'13':'0'});C3(t,[EV-.6,3.8,.6],[EV+3,2.8,-2.1],40);const [x,y]=project(EV+2.97,2.4,-2.1);
  const g=G(FX,x,y,popS(t,T(40,'قفل')));el('rect',{x:-40,y:-40,width:80,height:80,rx:10,fill:'#c9a24a',stroke:'#17120f','stroke-width':5},g);el('circle',{cy:-8,r:12,fill:'#17120f'},g);el('rect',{x:-5,y:-4,width:10,height:24,fill:'#17120f'},g);
  if(L===41){const k=G(FX,x+lerp(200,60,eout(cl((t-T(41))/1))),y,1);el('rect',{x:0,y:-8,width:90,height:16,fill:'#c9a24a',stroke:'#17120f','stroke-width':4},k);el('circle',{cx:110,r:26,fill:'#c9a24a',stroke:'#17120f','stroke-width':4},k);}}],
// 43-45 you remember: the key ring; the trembling hand; the toy car in both hands
[43,(t)=>{sepia();const L=t>=T(45)?45:t>=T(44)?44:43;setEnv('loge','interior');ENVS.loge.userData.door.visible=L!==45;
  if(L===43){put('tahar',{x:GX,y:0,z:1,ry:180,pose:'keys',item:'keyring',lid:.35},t);C3(t,[GX+1.4,4.4,-4.6],[GX,2.8,1],40);}
  else if(L===44){put('tahar',{x:GX,y:0,z:3.6,ry:180,pose:'keys',item:t<T(44,'كيف')?'keyring':'',lid:.25,brow:.6,hz:Math.sin(t*30)*2},t);C3(t,[GX+1.4,4.6,-3.8],[GX,2.9,3.6],42,.6);}
  else{put('tahar',{x:GX+2.6,y:0,z:-3,ry:-20,sit:1,pose:'hold',item:'toycar',lid:.45,cry:1,browUp:.7},t);C3(t,[GX+1,4.8,4.6],[GX+2.6,2.8,-3],40);}}],
[46,QB(5,46,(t)=>{CAB(t,{btn:13,disp:'13'});C3(t,[EV-.6,3.8,.6],[EV+3,2.8,-2.1],40);})],
[47,CB(47,(t)=>{STREET(t,'night');C3(t,[20,8,90],[0,45,-8],46);})],
// 48-49 that night: hiding on the stairs in front of his room, 00:20
[48,(t)=>{LOB(t,{night:1});put('you',{x:LX-9.4,y:2.2,z:.2,ry:100,sit:1,pose:'sitidle',lid:.3,ey:.2},t);C3(t,lerp3(t,[LX-2,6.4,10],[LX-1,6,9],T(48),T(50)),[LX+3,2.6,-1],46);if(t>=T(49))clk(t,T(49),0,20,840,330,110);}],
// 50 his door opens slowly
[50,(t)=>{LOB(t,{night:1});ENVS.lobby.userData.logeDoor.visible=t<T(50,'تحل');C3(t,[LX+3,5,8],[LX+11.5,3,-1],40);}],
// 51 he comes out in an old djellaba, an unlit candle and the key ring
[51,(t)=>{LOB(t,{night:1});ENVS.lobby.userData.logeDoor.visible=false;const k=cl((t-T(51))/1.6);put('taharj',{x:lerp(LX+11,LX+8.5,k),y:0,z:-1,ry:-90,walk:k<1?t*6:undefined,pose:'hold',item:'keyring',litem:'candle',lid:.35},t);C3(t,[LX+4,4.8,7.5],[LX+8.6,3,-1],40);
  if(t>=T(51,'جلابة'))LBL('جلابة قديمة',300,420,popS(t,T(51,'جلابة')),50,'#fff','#17120f');if(t>=T(51,'شمعة'))LBL('شمعة طافية',300,540,popS(t,T(51,'شمعة')),50,'#fff','#17120f');}],
// 52 looks left and right
[52,(t)=>{LOB(t,{night:1});const hy=Math.sin((t-T(52))*3.2)*45;put('taharj',{x:LX+8.5,y:0,z:-1,ry:-60,hy,ex:hy/45,pose:'hold',item:'keyring',litem:'candle',lid:.2},t);C3(t,[LX+5,4.6,6.4],[LX+8.5,3.4,-1],40);}],
// 53 stops at the entrance mirror, straightens his djellaba
[53,(t)=>{LOB(t,{night:1});const k=cl((t-T(53))/1.8);put('taharj',{x:lerp(LX+6,LX-9.4,ease(k)),y:0,z:lerp(0,8,ease(k)),ry:k<1?-70:-90,walk:k<1?t*7:undefined,pose:k>=1?'wipe':'hold',item:k>=1?'':'keyring',lid:.3,smile:k>=1?.4:0},t);
  C3(t,k<1?[LX-3,5.4,15]:[LX-4.6,5,14],k<1?[LX-7,3.4,6.5]:[LX-10.6,3.8,7.6],44);}],
// 54 to the elevator, in
[54,(t)=>{const k=cl((t-T(54))/1.9);LOB(t,{night:1,door:k<.6?1:1-cl((k-.6)/.4)});put('taharj',{x:EX,y:0,z:lerp(-2,-10,ease(k)),ry:180,walk:t*6,pose:'hold',item:'keyring',litem:'candle',lid:.3},t);C3(t,[LX-4,6,9],[EX,3,-6],44);}],
// 55 through the door gap: he bends, puts a small key under the panel
[55,(t)=>{CAB(t,{btn:-1,disp:'0',light:16});put('taharj',{x:EV+1.6,y:0,z:-1.2,ry:-90,pose:'point',item:'key',litem:'candle',lid:.3,hx:.35},t);C3(t,[EV-7.5,4.2,-1],[EV+2,2.6,-1.6],40);
  for(const x of[0,700])el('rect',{x,y:0,width:380,height:1920,fill:'#0a0a0a',opacity:.85},FX);}],
// 56 and it goes up
[56,(t)=>{LOB(t,{night:1,disp:seq(t,[[T(56),'1'],[T(56)+.4,'3'],[T(56)+.8,'6']])});C3(t,[EX-1,5.6,4],[EX,6.4,-8],40);}],
// 57-60 you run up the stairs: 6, 7, 8, legs burning, 9, 10, 11, 12
[57,(t)=>{const F=seq(t,[[0,'1'],[T(57),'3'],[T(58,'ستة'),'6'],[T(58,'سبعة'),'7'],[T(58,'تمنية'),'8'],[T(59,'تسعة'),'9'],[T(59,'عشرة'),'10'],[T(59,'حداش'),'11'],[T(60),'12']]);setFloorNum(F);const k=((t-T(57))*.55)%1;
  stairsUp(t,k,{lid:t>=T(58,'الرجلين')?.5:.3,brow:-.3,mouth:.35+.2*Math.sin(t*9)});if(t>=T(58,'الرجلين')&&t<T(59))LBL('الرجلين كيحرقو',540,380,popS(t,T(58,'الرجلين')),52,'#ff7a1a','#fff');
  const g=G(FX,880,300,1);el('rect',{x:-80,y:-70,width:160,height:140,rx:20,fill:'#2f4a5a',stroke:'#17120f','stroke-width':5},g);txt(g,0,30,90,F,'#fff');}],
// 61 the elevator above you: you hear its door open somewhere above the ceiling
[61,(t)=>{setEnv('stairs','interior');setFloorNum(12);put('you',{x:800-3,y:5.5,z:-5.4,ry:20,pose:'ear',lid:.1,hx:-.45,browUp:.8,mouth:.2},t);C3(t,[800-.4,9.6,5],[800-3,7.4,-5],44);
  for(let i=0;i<3;i++){const p=((t-T(61))*1.2+i/3)%1;el('path',{d:`M${470-p*60} ${300+i*0} q60 -40 120 0`,stroke:'#fff','stroke-width':8,fill:'none',opacity:1-p,transform:`translate(0 ${-p*80})`},FX);}}],
// 62-64 the stairs end; a wall... a small iron door painted the same color, slightly open
[62,(t)=>{setEnv('stairs','interior');setFloorNum(12);const L=t>=T(64)?64:t>=T(63)?63:62;const U=ENVS.stairs.userData;U.iron.visible=L>=63;U.crack.visible=L>=64;U.crack.scale.x=L>=64?.04+.06*cl((t-T(64))/1):.04;
  put('you',{x:798.8,y:5.5,z:-4.6,ry:205,lid:.2,browUp:.5,hy:-20},t);C3(t,lerp3(t,[796.4,9.2,5],[796.6,9,3.6],T(62),T(65)),[797,7.2,-6.6],42);
  if(L===63&&t>=T(63,'باب')){const [x,y]=project(800-4.4,7.7,-7.9);el('rect',{x:x-150,y:y-230,width:300,height:460,rx:8,fill:'none',stroke:'#ffd166','stroke-width':8,'stroke-dasharray':'20 12'},FX);}}],
// 65 behind it: narrow stairs going up into the dark
[65,(t)=>{setEnv('stairs','interior');const U=ENVS.stairs.userData;U.iron.visible=true;U.crack.visible=true;U.crack.scale.x=.1;C3(t,lerp3(t,[800-2.6,7.8,-4],[800-2.95,7.7,-6.4],T(65),T(66)),[800-3.15,8.6,-8],40);
  const k=cl((t-T(65)-.6)/1);if(k>0){const g=G(FX,540,960,1);el('rect',{x:-150,y:-500,width:300,height:1000,fill:'#050505',opacity:k},g);for(let i=0;i<8;i++)el('rect',{x:-120+i*6,y:380-i*110,width:240-i*12,height:16,fill:'#2a2522',opacity:k*(1-i/9)},g);}}],
// 66-68 a voice from above: an old broken man singing a lullaby
[66,(t)=>{setEnv('stairs','interior');const U=ENVS.stairs.userData;U.iron.visible=true;U.crack.visible=true;U.crack.scale.x=.1;const L=t>=T(68)?68:t>=T(67)?67:66;
  put('you',{x:800-2.4,y:5.5,z:-6,ry:200,pose:L===66?'idle':'ear',lid:.05,browUp:1,hy:-25},t);C3(t,[797.8,8.8,3.6],[800-3.4,7.4,-7.6],42);if(L>=67)notes(t,330,720,4);if(L===67){const g=G(FX,540,300,popS(t,T(67)));el('rect',{x:-300,y:-60,width:600,height:110,rx:50,fill:'#fff',opacity:.92,stroke:'#17120f','stroke-width':5},g);txt(g,0,18,48,'نيني يا مومو…','#17120f');}}],
// 69-70 your hand on the iron door: cold, smoke from the cracks
[69,(t)=>{setEnv('stairs','interior');const U=ENVS.stairs.userData;U.iron.visible=true;U.crack.visible=true;U.crack.scale.x=.1;put('you',{x:800-2.9,y:5.5,z:-6.6,ry:180,pose:'give',lid:.2,browUp:.6},t);C3(t,[798.4,8.8,2.6],[800-4,7,-7.8],42);
  if(t>=T(70,'بارد'))LBL('بارد',300,420,popS(t,T(70,'بارد')),54,'#9fd4ff','#17120f');if(t>=T(70,'الدخان')){for(let i=0;i<4;i++){const ph=((t-T(70,'الدخان'))*.5+i/4)%1;const [x,y]=project(800-3.15,7.7,-7.9);el('circle',{cx:x+Math.sin(ph*5+i)*30,cy:y-ph*400,r:30+ph*60,fill:'#8a8378',opacity:.35*(1-ph)},FX);}}}],
// 71 your heart pounding
[71,(t)=>{setEnv('stairs','interior');const U=ENVS.stairs.userData;U.iron.visible=true;U.crack.visible=true;put('you',{x:800-2.9,y:5.5,z:-6.4,ry:20,pose:'hug',lid:0,browUp:1,mouth:.2},t);C3(t,[800-1.4,8.8,1.2],[800-2.9,8,-6.4],42,.4);heartOv(t,230,380);}],
[72,QB(6,72,(t)=>{setEnv('stairs','interior');const U=ENVS.stairs.userData;U.iron.visible=true;U.crack.visible=true;C3(t,[798.4,8.8,2.6],[800-4,7,-7.8],42);})],
[73,CB(73,(t)=>{STREET(t,'night');C3(t,[20,8,90],[0,95,-8],46);})],
];
