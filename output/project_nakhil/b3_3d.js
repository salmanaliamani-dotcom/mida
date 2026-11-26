// عمارة النخيل — part 3
const GX=1200,AZ=-49;
function sepia(){flt('sepia(.65) contrast(1.05) brightness(.95)');}
function tahIn(t,o={}){put('taharj',Object.assign({x:EV-.4,y:0,z:AZ-1.2,ry:180,sit:1,pose:'sitidle',lid:.35},o),t);}
function youC(t,o={}){put('you',Object.assign({x:EV,y:0,z:-20,ry:180,lid:.25,browUp:.4},o),t);}
const SHOTS=[
// 1-2 you climb, step by step
[1,(t)=>{setEnv('stairs','dark');flt('brightness(.6) saturate(.7)');setFloorNum('');const k=cl((t-T(1))/7)*.8;const z=lerp(5,-3.4,k),y=(5.1-z)/.85*.55;put('you',{x:797,y,z,ry:180,walk:t*4,lid:.2,browUp:.4,hx:-.2},t);C3(t,[799.6,y+5,z+8.5],[797,y+2.6,z],44);}],
// 3 the 13th floor
[3,(t)=>{BURN(t);youC(t,{z:-12,ry:180});C3(t,[EV+1.2,5.2,1.5],[EV,3.4,-30],46);BIG('13',540,380,popS(t,T(3)),150,'#ff3b30');}],
// 4 black walls, smashed tiles
[4,(t)=>{BURN(t);youC(t,{z:lerp(-12,-15,cl((t-T(4))/4)),walk:t*4});const L=t>=T(4,'الحيوط')?(t>=T(4,'والزليج')?2:1):0;
  if(L<2)C3(t,[EV+2.4,4.8,-3.5],[EV-3,3.4,-14],44);else C3(t,[EV+1.2,1.6,-8],[EV,0,-16],44);if(L===1)LBL('حيوط كحلين',540,380,popS(t,T(4,'الحيوط')),56,'#17120f','#fff');if(L===2)LBL('زليج مهرّس',540,380,popS(t,T(4,'والزليج')),56,'#fff','#17120f');}],
// 5 ceiling stains like frozen clouds
[5,(t)=>{BURN(t);C3(t,lerp3(t,[EV,3,-10],[EV,3.2,-14],T(5),T(6)),[EV,7,-18],52);if(t>=T(5,'سحاب'))LBL('بحال سحاب مجمد',540,1500,popS(t,T(5,'سحاب')),50,'#fff','#17120f');}],
// 6 half-erased apartment numbers: 35, 36
[6,(t)=>{BURN(t);const two=t>=T(6,'ستة');youC(t,{z:two?-25:-15,x:EV,ry:two?160:200,walk:undefined});
  if(!two)C3(t,[EV+.6,5,-11],[EV-3.4,4.6,-17],40);else C3(t,[EV-.6,5,-23],[EV+3.4,4.6,-29],40);if(t>=T(6,'خمسة'))LBL(two?'36':'35',two?760:320,520,popS(t,two?T(6,'ستة'):T(6,'خمسة')),70,'#c9a24a','#1a1208');}],
// 7 a small dusty child's shoe by a door
[7,(t)=>{BURN(t);C3(t,lerp3(t,[EV+1,2.6,-22],[EV+1.6,1.6,-24.6],T(7),T(8)),[EV+2.6,.2,-27.6],42);if(t>=T(7,'صباط')){const [x,y]=project(EV+2.6,.3,-27.6);el('circle',{cx:x,cy:y,r:90*popS(t,T(7,'صباط')),fill:'none',stroke:'#ffd166','stroke-width':8},FX);}}],
// 8-9 at the end, door 37 slightly open; candlelight flickering behind it
[8,(t)=>{BURN(t,{apt:1,d37:.22,yl:2});tahIn(t);youC(t,{z:-30,ry:180});C3(t,lerp3(t,[EV+1.4,5,-24],[EV+.8,4.4,-30],T(8),T(10)),[EV,3,-43],44);}],
// 10 you get closer
[10,(t)=>{BURN(t,{apt:1,d37:.22,yl:2});tahIn(t);const k=cl((t-T(10))/1.4);youC(t,{z:lerp(-33,-40.6,k),x:EV-.6,walk:k<1?t*4:undefined});C3(t,[EV+2.2,5,-31],[EV-.4,3,-42],44);}],
// 11-12 through the gap: a small room, all burnt but clean
[11,(t)=>{BURN(t,{apt:1,d37:.22,yl:2});tahIn(t,{lid:.4});C3(t,lerp3(t,[EV-.2,4,-40.5],[EV,4,-42.4],T(11),T(13)),[EV+.4,2.2,-52],46);slit(lerp(200,300,cl((t-T(11))/3)));
  if(t>=T(12,'ولكن'))LBL('نقي',540,380,popS(t,T(12,'ولكن')),56,'#fff','#17120f');}],
// 13 Ba Tahar sitting on the floor, two photos, the red toy car
[13,(t)=>{BURN(t,{apt:1,d37:1.2,yl:2});tahIn(t,{lid:.45,ey:.5});C3(t,lerp3(t,[EV+3.6,4.6,-42],[EV+3,4.2,-43.4],T(13),T(14)),[EV-.6,1.6,-51],44);
  for(const [w,x,z] of[['التصاور',EV-.55,-52.3],['والطوموبيلة',EV-2.2,-50.2]])if(t>=T(13,w)){const [px,py]=project(x,.8,z);el('circle',{cx:px,cy:py,r:80*popS(t,T(13,w)),fill:'none',stroke:'#ffd166','stroke-width':7},FX);}}],
// 14 photo 1: a young man in a work coat; photo 2: a laughing woman
[14,(t)=>{BURN(t,{apt:1,d37:1.2,yl:2});tahIn(t);C3(t,[EV-.6,2.6,-47.5],[EV-.6,1,-52.3],40);dim(.35);
  const P=(x,t0,c1,lab,smile)=>{const g=G(FX,x,900,popS(t,t0),x<540?-4:4);el('rect',{x:-190,y:-250,width:380,height:500,rx:10,fill:'#c9a24a',stroke:'#17120f','stroke-width':6},g);el('rect',{x:-160,y:-220,width:320,height:420,fill:'#d8cfb8'},g);el('circle',{cy:-60,r:80,fill:'#d9a070',stroke:'#17120f','stroke-width':4},g);el('path',{d:'M-130 190 Q0 30 130 190Z',fill:c1,stroke:'#17120f','stroke-width':4},g);
   el('path',{d:smile?'M-34 -30 Q0 10 34 -30':'M-26 -24 L26 -24',stroke:'#17120f','stroke-width':6,fill:'none'},g);for(const s of[-1,1])el('circle',{cx:s*28,cy:-80,r:8,fill:'#17120f'},g);if(!smile)el('path',{d:'M-30 -46 Q0 -36 30 -46',stroke:'#1a120d','stroke-width':10,fill:'none'},g);txt(g,0,240,40,lab,'#17120f');};
  if(t>=T(14,'التصويرة'))P(300,T(14,'التصويرة'),'#2a4a7a','بمونطو ديال الخدمة',0);if(t>=T(14,'والتانية'))P(780,T(14,'والتانية'),'#8a3a4a','مرا كتضحك',1);}],
// 15-16 on a wooden box: a glass of milk and a little bread, like dinner for someone
[15,(t)=>{BURN(t,{apt:1,d37:1.2,yl:2});tahIn(t);C3(t,lerp3(t,[EV+3.4,3.4,-46.4],[EV+3,2.8,-47.6],T(15),T(17)),[EV+1.6,1.2,-51],40);
  if(t>=T(15,'كاس'))LBL('كاس حليب',300,420,popS(t,T(15,'كاس')),50,'#fff','#17120f');if(t>=T(15,'الخبزة'))LBL('خبزة',780,420,popS(t,T(15,'الخبزة')),50,'#d9a85a','#17120f');if(t>=T(16,'العشا'))LBL('العشا',540,300,popS(t,T(16,'العشا')),60,'#ffd166','#17120f');}],
// 17 he sings the lullaby
[17,(t)=>{BURN(t,{apt:1,d37:1.2,yl:2});tahIn(t,{lid:.55,mouth:t>=T(16)+2.5&&t<TE(17)+.3?mouthAt(t)*.7:0,hy:Math.sin(t*1.4)*8,cry:.0});C3(t,lerp3(t,[EV+1.6,4.4,-42.6],[EV+.8,4,-44.6],TE(16),T(18)),[EV-.4,2.6,-50.2],40);notes(t,700,700,4);}],
// 18 suddenly
[18,(t)=>{BURN(t,{apt:1,d37:.22,yl:2});tahIn(t);youC(t,{z:-40.6,x:EV-.6,ry:180,lid:.2});C3(t,[EV+1.6,4.6,-35],[EV-.6,3.6,-40.6],40);}],
// 19-20 your phone rings: in the silence, like a bomb
[19,(t)=>{BURN(t,{apt:1,d37:.22,yl:2});tahIn(t);const ring=t>=T(19,'صونا')-.1;youC(t,{z:-40.6,x:EV-.6,ry:0,pose:ring?'phone':'idle',item:ring?'phone':'',lid:0,browUp:1,mouth:ring?.4:0});
  C3(t,[EV-.4,5.2,-32.2],[EV-.6,3.4,-40.6],40,ring?1.4:0);if(ring&&t<T(21))phoneOv(t,T(19,'صونا')-.1,'…');if(t>=T(20,'قنبلة')){const g=G(FX,540,1180,popS(t,T(20,'قنبلة')));txt(g,0,0,110,'بووم!','#ff3b30',{stroke:'#17120f','stroke-width':12,'paint-order':'stroke'});}}],
// 21-22 it's Sara calling; you turn it off with a trembling hand
[21,(t)=>{BURN(t,{apt:1,d37:.22,yl:2});tahIn(t);const off=t>=T(22,'طفيتيه')+.3;youC(t,{z:-40.6,x:EV-.6,ry:0,pose:'phone',item:'phone',lid:0,browUp:1,hz:Math.sin(t*30)*2});C3(t,[EV-.4,5.2,-32.2],[EV-.6,3.4,-40.6],40);if(!off)phoneOv(t,T(21)-.2,'سارة');}],
// 23 but the singing stopped
[23,(t)=>{BURN(t,{apt:1,d37:.22,yl:2});tahIn(t,{lid:0,browUp:.6,hy:30});C3(t,[EV-.2,4,-41.4],[EV+.4,2.2,-52],44);slit(260);if(t>=T(23,'وقف'))X(FX,540,380,popS(t,T(23,'وقف')),1);}],
// 24-25 footsteps coming to the door
[24,(t)=>{BURN(t,{apt:1,d37:.22,yl:2});const k=cl((t-T(24))/3.6);put('taharj',{x:EV-.2,y:0,z:lerp(-50,-45,k),ry:0,walk:t*3,pose:'candle',item:'candleL',lid:.3},t);youC(t,{z:-40.6,x:EV-.8,ry:180,lid:0,browUp:1});C3(t,[EV+2.4,4.4,-34],[EV,2.8,-43],42);heartOv(t,220,380);}],
[26,QB(7,26,(t)=>{BURN(t,{apt:1,d37:.22,yl:2});C3(t,[EV+1.4,5,-26],[EV,3,-43],44);})],
[27,CB(27,(t)=>{STREET(t,'night');C3(t,[20,8,90],[0,95,-8],46);})],
// 28 you step back, press yourself into the dark corner
[28,(t)=>{BURN(t,{apt:1,d37:.22,yl:2});const k=cl((t-T(28))/1.4);youC(t,{x:lerp(EV-.6,EV-2.6,k),z:lerp(-40.6,-37.2,k),ry:90,pose:'press',lid:0,browUp:1},t);C3(t,[EV+2.6,4.6,-31],[EV-1.6,3,-38],42);}],
// 29-31 door 37 opens; Ba Tahar comes out with the candle; its light moves over the burnt walls
[29,(t)=>{const L=t>=T(31)?31:t>=T(30)?30:29;const op=ease(cl((t-T(29))/1.4))*1.25;BURN(t,{apt:1,d37:.22+op,yl:2});const k=cl((t-T(30))/2.2);
  put('taharj',{x:EV,y:0,z:L===29?-45:lerp(-45,-42.4,k),ry:0,walk:L>=30&&k<1?t*3:undefined,pose:'candle',item:'candleL',lid:.35,hy:L===31?Math.sin(t*1.5)*35:0},t);youC(t,{x:EV-2.6,z:-37.2,ry:90,pose:'press',lid:0,browUp:1});
  C3(t,L===31?[EV+2.8,4.8,-33]:[EV+1.6,4.4,-34],[EV,3,-43],42);}],
// 32 he stops at the threshold, looks into the dark, right toward you
[32,(t)=>{BURN(t,{apt:1,d37:1.47,yl:2});put('taharj',{x:EV,y:0,z:-42.4,ry:-20,pose:'candle',item:'candleL',lid:.25,ex:-.6},t);youC(t,{x:EV-2.6,z:-37.2,ry:90,pose:'press',lid:0,browUp:1});C3(t,[EV-1.8,4.6,-30.5],[EV-.8,3.4,-40],42);}],
// 33 you hold your breath
[33,(t)=>{BURN(t,{apt:1,d37:1.47,yl:2});put('taharj',{x:EV,y:0,z:-42.4,ry:-20,pose:'candle',item:'candleL',lid:.25},t);youC(t,{x:EV-2.6,z:-37.2,ry:60,pose:'press',lid:.0,browUp:1,mouth:0},t);C3(t,[EV+1.6,5,-30.6],[EV-2.6,3.6,-37.2],40);
  const g=G(FX,780,420,popS(t,T(33)));el('rect',{x:-120,y:-46,width:240,height:92,rx:40,fill:'#fff',stroke:'#17120f','stroke-width':5},g);txt(g,0,16,48,'...','#17120f');}],
// 34-35 the candlelight reaches your shoes: one span away
[34,(t)=>{BURN(t,{apt:1,d37:1.47,yl:2});const k=cl((t-T(34))/2);put('taharj',{x:EV,y:0,z:lerp(-42.4,-41.4,k),ry:-25,pose:'candle',item:'candleL',lid:.25},t);youC(t,{x:EV-2.6,z:-37.2,ry:60,pose:'press',lid:0,browUp:1});
  C3(t,[EV+1.4,2.2,-33.4],[EV-2.2,.4,-38],42);if(t>=T(35)){const [x1,y1]=project(EV-2.4,.1,-37);const [x2,y2]=project(EV-1.6,.1,-38.6);el('path',{d:`M${x1} ${y1} L${x2} ${y2}`,stroke:'#ffd166','stroke-width':8,'stroke-dasharray':'14 10'},FX);LBL('شبر واحد',540,380,popS(t,T(35)),56,'#ffd166','#17120f');}}],
// 36-39 a soft voice like a little child: "who's there?" ... silence ... "is that you... dad?"
[36,(t)=>{BURN(t,{apt:1,d37:1.47,yl:2});const L=t>=T(39)?39:t>=T(38)?38:t>=T(37)?37:36;put('taharj',{x:EV,y:0,z:-41.4,ry:-25,pose:'candle',item:'candleL',lid:L===39?.45:.2,browUp:.8,smile:L===39?-.4:0,mouth:L===37?talkAll(t,37):L===39?talkAll(t,39)*.7:0,cry:L===39?1:0},t);
  C3(t,lerp3(t,[EV-1.8,5,-33],[EV-1.4,4.7,-34.4],T(36),T(40)),[EV,3.4,-41.4],40);if(L===38){const g=G(FX,540,380,popS(t,T(38)));txt(g,0,0,64,'…سكات…','#fff');}}],
// 40 the word goes into your heart like a knife
[40,(t)=>{BURN(t,{apt:1,d37:1.47,yl:2});youC(t,{x:EV-2.6,z:-37.2,ry:60,pose:'press',lid:.3,browUp:.9,cry:1,mouth:0});C3(t,[EV+1.6,5,-30.6],[EV-2.6,3.6,-37.2],40);heartOv(t,220,380);}],
// 41 a 62-year-old man calling his father in the dark, like a 7-year-old child
[41,(t)=>{BURN(t,{apt:1,d37:1.47,yl:2});const kid=t>=T(41,'طفل');if(kid){sepia();put('kid',{x:EV,y:0,z:-41.4,ry:-25,s:.6,pose:'candle',item:'candleL',lid:.3,browUp:.8,cry:1},t);}else put('taharj',{x:EV,y:0,z:-41.4,ry:-25,pose:'candle',item:'candleL',lid:.4,browUp:.8,cry:1},t);
  C3(t,[EV-1.8,4,-34.6],[EV,kid?2.4:3.4,-41.4],42);if(t>=T(41,'اتنين'))BIG('62',230,380,popS(t,T(41,'اتنين')),130);if(kid)BIG('7',850,380,popS(t,T(41,'طفل')),130,'#9fd4ff');}],
// 42-43 he waits a little; then goes in and slowly closes the door
[42,(t)=>{const L=t>=T(43,'وسد')?2:t>=T(43)?1:0;const cls=L===2?ease(cl((t-T(43,'وسد'))/1.6)):0;BURN(t,{apt:1,d37:1.47*(1-cls)+.0,yl:2});
  if(L<2)put('taharj',{x:EV,y:0,z:L===1?-43.6:-41.4,ry:L===1?180:-25,walk:L===1?t*3:undefined,pose:'candle',item:'candleL',lid:.45,cry:1},t);youC(t,{x:EV-2.6,z:-37.2,ry:90,pose:'press',lid:.1,browUp:1});C3(t,[EV+1.6,4.6,-31],[EV-.6,3,-42],42);}],
// 44 down the stairs, no sound, heart full
[44,(t)=>{setEnv('stairs','interior');flt('brightness(.7)');setFloorNum(seq(t,[[0,'12'],[T(44)+1,'10'],[T(44)+2,'8']]));const k=cl((t-T(44))/3);const z=lerp(-3.4,5,k),y=(5.1-z)/.85*.55;put('you',{x:797,y,z,ry:0,walk:t*5,lid:.4,ey:.5},t);C3(t,[799.6,y+5,z+9],[797,y+2.6,z],44);}],
// 45-46 6th floor: Sara at her door with the phone: "sorry, I was scared for you. you took long"
[45,(t)=>{setEnv('landing','interior');const L=t>=T(46)?46:45;put('sara',{x:EV-5.6,y:0,z:-10,ry:70,pose:'phone',item:'phone',lid:.2,browUp:.6,mouth:L===46?talkIn(t,46)*.7:0},t);const k=cl((t-T(45))/2);put('you',{x:lerp(EV+4,EV-2.6,k),y:0,z:-11,ry:-90,walk:k<1?t*7:undefined,lid:.3},t);
  C3(t,[EV-1,5,1],[EV-3.4,3,-10.4],44);if(L===45&&t>=T(45,'الستة'))BIG('6',840,420,popS(t,T(45,'الستة')),130);}],
// 47 you tell her everything
[47,(t)=>{setEnv('landing','interior');put('sara',{x:EV-5.4,y:0,z:-10,ry:70,pose:'cover',lid:.0,browUp:1},t);put('you',{x:EV-2.8,y:0,z:-11,ry:-80,pose:'give',lid:.3,mouth:mouthAt(t)*.6},t);C3(t,[EV-1.6,4.6,-1],[EV-4,3.4,-10.4],42);}],
// 48-49 sitting on the stairs until dawn; "62 years and still waiting for his dad"
[48,(t)=>{setEnv('stairs','interior');flt('sepia(.25) brightness(1.08) saturate(1.1)');setFloorNum('6');put('you',{x:797.6,y:2.2,z:1.6,ry:0,sit:1,pose:'sitidle',lid:.55},t);put('sara',{x:796.2,y:2.75,z:.8,ry:0,sit:1,pose:'sitidle',lid:.5,mouth:t>=T(49)?talkIn(t,49)*.6:0},t);
  C3(t,lerp3(t,[797.4,6,13.5],[797.2,5.8,12.4],T(48),T(50)),[797,3.2,1],42);if(t>=T(48,'النهار'))sunIcon(FX,860,300,popS(t,T(48,'النهار')));if(t>=T(49,'اتنين'))BIG('62',230,380,popS(t,T(49,'اتنين')),120);}],
[50,QB(8,50,(t)=>{BURN(t,{apt:1,d37:1.47,yl:2});put('taharj',{x:EV,y:0,z:-41.4,ry:-25,pose:'candle',item:'candleL',lid:.45,cry:1},t);C3(t,[EV-1.8,4.6,-35],[EV,3.8,-41.4],38);})],
[51,CB(51,(t)=>{STREET(t,'night');C3(t,[20,8,90],[0,95,-8],46);})],
// 52-53 answer: he IS the boy who survived; every night he goes up to his parents' home and waits
[52,AB(8,52,(t)=>{const L=t>=T(53)?53:52;if(L===52){setEnv('lobby','interior');sepia();put('kid',{x:LX+.6,y:0,z:1,ry:20,s:.6,lid:.2,cry:1},t);put('tahar',{x:LX+3.4,y:0,z:.4,ry:-20,lid:.35},t);C3(t,[LX+2,4,11],[LX+2,2.4,.6],42);if(t>=T(52,'الولد')){const [a,b]=project(LX+.6,3.2,1),[c,d]=project(LX+3.4,4.4,.4);el('path',{d:`M${a} ${b-60} Q${(a+c)/2} ${b-200} ${c} ${d-90}`,stroke:'#ffd166','stroke-width':8,fill:'none','stroke-dasharray':'16 10'},FX);txt(FX,(a+c)/2,b-210,60,'=','#ffd166');}}
  else{CAB(t,{beyond:'burnt',door:1,disp:'13',btn:13,tod:'dark',light:10});put('taharj',{x:EV,y:0,z:.4,ry:180,pose:'candle',item:'candle',lid:.4},t);C3(t,[EV+1.2,5,9.5],[EV,3.4,-8],46);clk(t,T(53),0,30);}})],
// 54 morning: you knock on his door with Sara
[54,(t)=>{LOB(t);ENVS.lobby.userData.logeDoor.visible=true;put('you',{x:LX+9.6,y:0,z:-1.4,ry:90,pose:'knock',lid:.3},t);put('sara',{x:LX+8.6,y:0,z:.8,ry:80,lid:.3},t);C3(t,[LX+3.2,4.8,7],[LX+10.4,3,-.6],42);if(t>=T(54,'دقيتي')){const g=G(FX,820,620,popS(t,T(54,'دقيتي')));txt(g,0,0,60,'طق طق','#fff',{stroke:'#17120f','stroke-width':8,'paint-order':'stroke'});}}],
// 55-57 he opens, eyes red; doesn't ask who; "come in"
[55,(t)=>{LOB(t);ENVS.lobby.userData.logeDoor.visible=false;const L=t>=T(57)?57:t>=T(56)?56:55;put('tahar',{x:LX+11,y:0,z:-1,ry:-90,lid:.5,cry:L===55?.6:0,brow:-.2,mouth:L===57?talkIn(t,57):0},t);put('you',{x:LX+8.4,y:0,z:-1.6,ry:90,lid:.3},t);put('sara',{x:LX+7.8,y:0,z:.6,ry:80,lid:.3},t);
  C3(t,[LX+4,5,10],[LX+9.6,3.2,-1],42);}],
// 58-59 his little room: mattress, table, old radio; a single nail on the wall, nothing hanging
[58,(t)=>{setEnv('loge','interior');ENVS.loge.userData.door.visible=false;const L=t>=T(59)?59:58;
  if(L===58){C3(t,lerp3(t,[GX-2,5.6,9.5],[GX+1,5.4,9.5],T(58),T(59)),[GX,2,-2.6],46);for(const [w,lb,x,y,z] of[['فراش','فراش',GX-2.5,1.4,-3.8],['وطبلة','طبلة',GX+2.5,1.8,-1.5],['وراديو','راديو قديم',GX+4.2,3.8,-5.2]])if(t>=T(58,w)){const [px,py]=project(x,y,z);LBL(lb,px,py-50,popS(t,T(58,w)),46,'#fff','#17120f');}}
  else{C3(t,lerp3(t,[GX-.4,5.2,0],[GX-.8,5,-2.2],T(59),T(60)),[GX-1,5,-5.4],40);if(t>=T(59,'مسمار')){const [px,py]=project(GX-1,5,-5.3);el('circle',{cx:px,cy:py,r:70*popS(t,T(59,'مسمار')),fill:'none',stroke:'#ffd166','stroke-width':7},FX);}}}],
// 60 you sit; he puts tea in front of you
[60,(t)=>{setEnv('loge','interior');ENVS.loge.userData.door.visible=false;put('you',{x:GX-3.4,y:.5,z:-3.6,ry:90,sit:1,pose:'sitidle',lid:.3},t);put('sara',{x:GX-1.6,y:.5,z:-3.6,ry:90,sit:1,pose:'sitidle',lid:.3},t);put('tahar',{x:GX+2.4,y:0,z:.4,ry:-140,pose:'give',item:'cup',lid:.45},t);C3(t,[GX,5.2,9.5],[GX,2.4,-2],44);}],
// 61-62 you put the newspaper on the table; he looks at it a long time
[61,(t)=>{setEnv('loge','interior');ENVS.loge.userData.door.visible=false;const L=t>=T(62)?62:61;put('you',{x:GX-3.4,y:.5,z:-3.6,ry:90,sit:1,pose:L===61?'give':'sitidle',item:L===61?'map':'',lid:.3},t);put('sara',{x:GX-1.6,y:.5,z:-3.6,ry:90,sit:1,pose:'sitidle',lid:.3},t);
  put('tahar',{x:GX+2.6,y:0,z:-3,ry:-40,sit:1,pose:'sitidle',lid:L===62?.6:.4,ey:.7},t);C3(t,L===61?[GX,5.2,9.5]:[GX+.8,4.6,5],L===61?[GX,2.4,-2]:[GX+2,2.6,-2.6],L===61?44:40);
  if(L===62){const g=G(FX,540,1500,.55);el('rect',{x:-300,y:-200,width:600,height:400,rx:10,fill:'#ece3cc',stroke:'#17120f','stroke-width':5},g);txt(g,0,-110,40,'حريق فعمارة النخيل','#17120f');txt(g,0,-60,34,'الطابق الثالث عشر','#b5241e');}}],
// 63 "I was seven years old"
[63,(t)=>{setEnv('loge','interior');ENVS.loge.userData.door.visible=false;put('tahar',{x:GX+2.6,y:0,z:-3,ry:-40,sit:1,pose:'sitidle',lid:.45,brow:-.3,mouth:talkIn(t,63)},t);C3(t,[GX-.4,5,7.6],[GX+2.2,2.8,-3],40);if(t>=T(63,'سبعة'))BIG('7',820,420,popS(t,T(63,'سبعة')),130);}],
// 64 flashback: the 13th floor was home; dad an electrician, mom a seamstress
[64,(t)=>{setEnv('apt37','interior');sepia();const U=ENVS.apt37.userData;put('dad',{x:EV-2.6,y:0,z:-49,ry:20,pose:'idle',item:'',lid:.3,smile:.5},t);put('mom',{x:EV+2.4,y:0,z:-49.4,ry:-20,lid:.3,smile:.7},t);put('kid',{x:EV,y:0,z:-47.6,ry:0,s:.6,lid:.2,smile:.8},t);
  C3(t,[EV,4.6,-39.5],[EV,2.6,-49],46);if(t>=T(64,'كهربائي')){const [x,y]=project(EV-2.6,5.4,-49);LBL('كهربائي',x,y-30,popS(t,T(64,'كهربائي')),50,'#2a4a7a','#fff');}if(t>=T(64,'خياطة')){const [x,y]=project(EV+2.4,5.4,-49.4);LBL('خياطة',x,y-30,popS(t,T(64,'خياطة')),50,'#8a3a4a','#fff');}}],
// 65 afraid of the dark: a candle by the bed every night
[65,(t)=>{setEnv('apt37','interior');flt('sepia(.65) brightness(.6)');put('kid',{x:EV-1,y:0,z:-50,ry:20,s:.6,sit:1,pose:'sitidle',lid:.1,browUp:.8},t);C3(t,[EV+1,3.4,-43.8],[EV-.8,1.2,-51],42);}],
// 66-67 that night, 00:30, he woke up to smoke; the curtain was burning
[66,(t)=>{setEnv('apt37','interior');sepia();const L=t>=T(67)?67:66;put('kid',{x:EV-1,y:0,z:-50,ry:20,s:.6,sit:1,pose:'hug',lid:0,browUp:1,mouth:.3},t);if(L===67)fireAt(t,EV+5,0,-53,4,6);C3(t,[EV+1,3.8,-43.6],[EV,1.6,-51],46,L===67?.6:0);
  if(L===66){clk(t,T(66,'الطناش'),0,30);for(let i=0;i<5;i++){const ph=((t-T(66))*.35+i/5)%1;el('circle',{cx:200+i*170,cy:700-ph*400,r:80+ph*80,fill:'#5a5450',opacity:.35*(1-ph)},FX);}}else LBL('الريدو',820,420,popS(t,T(67,'الريدو')),54,'#ff7a1a','#fff');}],
// 68 he stops and looks at his hands
[68,(t)=>{setEnv('loge','interior');ENVS.loge.userData.door.visible=false;put('tahar',{x:GX+2.6,y:0,z:-3,ry:-40,sit:1,pose:'hold',lid:.6,ey:.9,hx:.25},t);C3(t,[GX-.2,5,7.2],[GX+2.2,2.6,-3],40);}],
// 69-70 "55 years I've known it was me; my candle burned the house, burned my dad and mom"
[69,(t)=>{setEnv('loge','interior');ENVS.loge.userData.door.visible=false;const L=t>=T(70)?70:69;put('tahar',{x:GX+2.6,y:0,z:-3,ry:-40,sit:1,pose:'sitidle',lid:.5,cry:1,brow:-.4,mouth:talkIn(t,L)*.8},t);put('sara',{x:GX-1.6,y:.5,z:-3.6,ry:90,sit:1,pose:'sitidle',lid:.2,browUp:.6},t);
  C3(t,lerp3(t,[GX-.4,5,8.4],[GX,4.8,7.2],T(69),T(71)),[GX+1.4,2.6,-3],40);if(L===69&&t>=T(69,'خمسة'))BIG('55',830,400,popS(t,T(69,'خمسة')),120);}],
// 71 Sara puts her hand on his
[71,(t)=>{setEnv('loge','interior');ENVS.loge.userData.door.visible=false;put('tahar',{x:GX+2.6,y:0,z:-3,ry:-60,sit:1,pose:'sitidle',lid:.5,cry:1},t);put('sara',{x:GX+.4,y:.0,z:-2.6,ry:70,sit:1,pose:'give',lid:.35,smile:.2},t);C3(t,[GX+.6,5,8],[GX+1.6,2.4,-2.8],40);}],
// 72-73 "but that's not all. the truth I never told anyone..." silence
[72,(t)=>{setEnv('loge','interior');ENVS.loge.userData.door.visible=false;put('tahar',{x:GX+2.6,y:0,z:-3,ry:-40,sit:1,pose:'sitidle',lid:.35,ey:-.3,brow:.3,mouth:t<T(73)?talkIn(t,72)*.7:0},t);C3(t,lerp3(t,[GX,4.8,7.4],[GX+.8,4.6,5.8],T(72),T(74)),[GX+2.4,3,-3],40);}],
[74,QB(9,74,(t)=>{setEnv('apt37','interior');sepia();put('kid',{x:EV-1,y:0,z:-50,ry:20,s:.6,sit:1,pose:'hug',lid:0},t);fireAt(t,EV+5,0,-53,4,6);C3(t,[EV+1,3.8,-43.6],[EV,1.6,-51],46);})],
[75,CB(75,(t)=>{STREET(t,'night');C3(t,[20,8,90],[0,95,-8],46);})],
];
