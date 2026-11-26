// عمارة النخيل — part 1
function stairPos(k){const z=4-k*11.5,y=Math.max(0,(4.4-z)/.85*.55);return [y,z];}
const SHOTS=[
// 1 establishing: Casablanca street, palm trees, the old building
[1,(t)=>{STREET(t,'dusk');
  const e=lerp3(t,[30,3.5,78],[8,16,96],0,4.4);C3(t,e,[0,lerp(16,46,ease(t/4.4)),-8],48);}],
// 2 twelve floors (count), then the coughing elevator in the lobby
[2,(t)=>{if(t<T(2,'ومصعد')-.1){STREET(t,'dusk');
    C3(t,lerp3(t,[6,16,88],[-4,48,132],T(2),T(2,'ومصعد')),[0,50,-8],44);if(t>=T(2,'طناش')-.1)floorBadges(t,T(2,'طناش')-.1);return;}
  LOB(t);const d=ENVS.lobby.userData.door;const sick=t>=T(2,'كيصوني')-.1;
  const jit=sick?Math.sin(t*45)*.04*(Math.sin(t*7)>0?1:.3):0;doorSet(d,.02+jit);d.L.position.z=d.R.position.z=-7.7+jit*.5;
  setDisp(sick&&Math.sin(t*23)>.2?'':(t<T(2,'واحد')?'3':'2'),1);ENVS.lobby.userData.lampL.intensity=sick?24+Math.sin(t*31)*8:30;
  C3(t,lerp3(t,[EX-1.5,4.6,8],[EX-.6,4.4,3.5],T(2,'ومصعد'),TE(2)+.8),[EX,4,-8],40,sick?1.2:0);
  if(t>=T(2,'واحد'))LBL('مصعد واحد',540,1560,popS(t,T(2,'واحد')),56,'#ffd166','#17120f');
  if(sick){for(let i=0;i<3;i++){const ph=((t-T(2,'كيصوني'))*1.6+i/3)%1;const [x,y]=project(EX+(i-1)*.9,6.2,-7.6);el('circle',{cx:x+(i-1)*30*ph,cy:y-ph*160,r:20+ph*40,fill:'#cfc8bc',opacity:.55*(1-ph)},FX);}
    if(t>=T(2,'مريض')){const g=G(FX,780,560,popS(t,T(2,'مريض')),-8);el('rect',{x:-120,y:-50,width:240,height:96,rx:40,fill:'#fff',stroke:'#17120f','stroke-width':5},g);txt(g,0,18,52,'كح! كح!','#17120f');}}}],
// 3 you: new student, 9th floor
[3,(t)=>{setEnv('street','dusk');const up=t>=T(3,'فالطابق')-.1;
  put('you',{x:3,y:.3,z:9,ry:165,pose:'case',item:'suitcase',litem:'bag',lid:.25,smile:.4,hx:up?-.35:-.1,browUp:.3},t);
  if(!up){C3(t,lerp3(t,[5.2,4.6,.8],[4.8,4.4,2.2],T(3),T(3,'فالطابق')),[3,3.1,9],42);
    if(t>=T(3,'طالب')){const g=G(FX,760,520,popS(t,T(3,'طالب')),6);el('rect',{x:-110,y:-60,width:220,height:110,rx:18,fill:'#2f5f9e',stroke:'#17120f','stroke-width':5},g);txt(g,0,20,58,'طالب','#fff');}}
  else{const k=ease((t-T(3,'فالطابق')+.1)/.75);C3(t,[lerp(6,9,k),lerp(4,42,k),lerp(20,64,k)],[lerp(3,4,k),lerp(4,66,k),lerp(4,0,k)],42);
    if(t>=T(3,'التاسع')){const [x,y]=project(4,67.4,0);const p=popS(t,T(3,'التاسع'));el('circle',{cx:x,cy:y,r:120*p,fill:'none',stroke:'#ffd166','stroke-width':10},FX);const g=G(FX,x+170,y-40,p);el('circle',{r:56,fill:'#ffd166',stroke:'#17120f','stroke-width':5},g);txt(g,0,22,66,'9','#17120f');}}}],
// 4 first day: the doorman Ba Tahar helps with the suitcases
[4,(t)=>{LOB(t);
  if(t<T(4,'عاونك')-.1){const ent=cl((t-T(4))/2.2);put('you',{x:LX+1,y:0,z:lerp(4.6,2,ease(ent)),ry:ent>=1?110:170,walk:ent<1?t*9:undefined,pose:'case',item:'suitcase',litem:'bag',lid:.25},t);
    const tw=cl((t-T(4,'البواب'))/1.6);put('tahar',{x:lerp(LX+11,LX+4.4,ease(tw)),y:0,z:lerp(-.8,.6,ease(tw)),ry:tw<1&&tw>0?-110:-60,walk:tw>0&&tw<1?t*8:undefined,pose:'idle',lid:.35,smile:.3},t);
    C3(t,lerp3(t,[LX-2.6,6.4,11.6],[LX-2,6.2,10.8],T(4),T(4,'عاونك')),[LX+3,2.4,.5],44);
    if(t>=T(4,'با')){const [x,y]=project(LX+4.4,5.4,.6);LBL('با الطاهر',x,y-30,popS(t,T(4,'با')),56,'#ffd166','#17120f');}
    return;}
  const k=cl((t-T(4,'عاونك')+.1)/4.2);const [y1,z1]=stairPos(k*.62),[y2,z2]=stairPos(k*.62-.1);
  put('tahar',{x:LX-10.4,y:y1,z:z1,ry:180,walk:t*7,pose:'case',item:'suitcase',lid:.4},t);
  put('you',{x:LX-8.7,y:y2,z:z2,ry:180,walk:t*7+1,pose:'case',item:'suitcase',litem:'bag',lid:.45,mouth:0},t);
  C3(t,[LX+1.5,y1+5,z1+8],[LX-9.6,y1+2.6,z1+.5],42);}],
// 5 portrait of Ba Tahar: old, thin, white hair, the key ring
[5,(t)=>{LOB(t);const kz=t>=T(5,'وفيدو')-.1;
  put('tahar',{x:LX+1,y:0,z:-2.5,ry:-8,pose:kz?'keys':'idle',item:kz?'keyring':'',lid:.38,brow:.2,hx:-.03},t);
  if(kz){const A=null;}
  if(!kz){C3(t,lerp3(t,[LX+1.6,3.9,9.5],[LX+1.4,3.9,7.6],T(5),T(5,'وفيدو')),[LX+1,2.9,-2.5],40);
    const tags=[['كبير','كبير',230,560],['نحيف','نحيف',850,1000],['شعرو','شعرو أبيض',820,440]];for(const [w,s,x,y] of tags)if(t>=T(5,w))LBL(s,x,y,popS(t,T(5,w)),52,'#fff','#17120f');}
  else{C3(t,lerp3(t,[LX+1.9,3.4,5.6],[LX+2.2,3.2,4.6],T(5,'وفيدو'),TE(5)+1.4),[LX+1.6,2.6,-2.3],40);
    if(t>=T(5,'السوارت')){const p=popS(t,T(5,'السوارت'));for(let i=0;i<5;i++){const a=i*1.26+t*2;const [x,y]=project(LX+1.5,2.9,-1.9);el('path',{d:'M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4Z',fill:'#ffe27a',transform:`translate(${x+Math.cos(a)*90*p} ${y+Math.sin(a)*90*p}) scale(${p})`},FX);}}}}],
// 6 at the 9th floor: he grabs your hand
[6,(t)=>{setEnv('landing','interior');const g=t>=T(6,'شد')-.1;put('you',{x:EV-2.4,y:0,z:-12,ry:25,pose:'case',item:'suitcase',litem:'bag',lid:.3,smile:.2},t);
  put('tahar',{x:EV+1.6,y:0,z:-12.4,ry:-55,pose:g?'grab':'case',item:g?'':'suitcase',lid:.35,brow:.3},t);C3(t,lerp3(t,[EV+.2,4.6,-1.5],[EV,4.4,-3.2],T(6),T(7)),[EV-.3,2.8,-12.2],42);}],
// 7-8 the rule
[7,(t)=>{setEnv('landing','interior');const L8=t>=T(8);put('tahar',{x:EV+1,y:0,z:-12.4,ry:-25,pose:'grab',lid:.3,brow:.5,mouth:talkIn(t,L8?8:7),hz:-4},t);put('you',{x:EV-2.6,y:0,z:-12,ry:30,pose:'case',item:'suitcase',lid:.2,browUp:.3},t);
  C3(t,lerp3(t,[EV+1.8,4.3,-4.2],[EV+1.4,4.2,-5.4],T(7),TE(8)+.6),[EV+.6,3.3,-12.4],40);
  if(!L8&&t>=T(7,'قانون'))LBL('قانون واحد',540,330,popS(t,T(7,'قانون')),62,'#ffd166','#17120f');
  if(L8){clk(t,T(8,'نص'),0,0,220,330,100);if(t>=T(8,'المصعد')){LBL('المصعد',560,300,popS(t,T(8,'المصعد')),54,'#fff','#17120f');X(FX,560,300,popS(t,T(8,'تركبش')),1);}if(t>=T(8,'طلع'))OK(FX,860,330,popS(t,T(8,'طلع')),.9);}}],
// 9 you laugh: okay
[9,(t)=>{setEnv('landing','interior');put('you',{x:EV-2.2,y:0,z:-12,ry:30,pose:'case',item:'suitcase',lid:.2,smile:1,mouth:t<T(9,'وقلتي')?mouthAt(t)*.6:talkIn(t,9)},t);put('tahar',{x:EV+1.6,y:0,z:-12.4,ry:-40,pose:'idle',lid:.3,brow:.5},t);
  C3(t,[EV-.6,4.3,-4.4],[EV-1.6,3.4,-12],40);}],
// 10 he doesn't laugh
[10,(t)=>{setEnv('landing','interior');put('tahar',{x:EV+1.2,y:0,z:-12.4,ry:-15,pose:'idle',lid:.15,brow:.7,ex:-.2},t);put('you',{x:EV-2.4,y:0,z:-12,ry:30,pose:'case',item:'suitcase',lid:.2,smile:.3},t);
  C3(t,lerp3(t,[EV+1.6,4.2,-4.6],[EV+1.4,4,-6],T(10),T(11)),[EV+1.1,3.6,-12.4],38);}],
// 11 a week passes (day -> night)
[11,(t)=>{const k=(t-T(11))/(T(12)-T(11));STREET(t,k<.5?'day':'night');C3(t,[24,6,70],[0,40,-8],46);LBL('سيمانة',540,360,popS(t,T(11,'سيمانة')),64,'#ffd166','#17120f');}],
// 12 Thursday night, back from the library at 00:40
[12,(t)=>{STREET(t,'night');const k=cl((t-T(12))/(TE(12)-T(12)+.8));put('you',{x:lerp(-16,-2,k),y:.3,z:4.2,ry:90,walk:t*8,pose:'case',item:'bag',lid:.55},t);C3(t,[lerp(-6,4,k),4.6,17],[lerp(-14,-2,k),3.2,3],44);clk(t,T(12,'الطناش'),0,40);}],
// 13 exhausted; nine floors of stairs
[13,(t)=>{LOB(t,{night:1});put('you',{x:LX-4,y:0,z:4,ry:-140,pose:'case',item:'bag',lid:.7,brow:-.3,mouth:0},t);C3(t,lerp3(t,[LX+3,5,12],[LX+2,4.6,10.5],T(13),T(14)),[LX-7,3.4,0],44);
  if(t>=T(13,'تسعة'))LBL('9 طوابق',360,400,popS(t,T(13,'تسعة')),60,'#fff','#17120f');}],
// 14 look at the elevator, look at the stairs
[14,(t)=>{LOB(t,{night:1});const at=t<T(14,'شفتي',)||t<T(14)+(T(14,'فالدروج')-T(14))*.6;const k=t<(T(14)+T(14,'فالدروج'))/2-.2?1:0;
  put('you',{x:LX-1,y:0,z:3,ry:k?-150:150,pose:'case',item:'bag',lid:.6,hy:k?20:-20},t);C3(t,[LX-.6,5.3,10.8],[LX,3,-2],46);}],
// 15 you step into the elevator
[15,(t)=>{LOB(t,{night:1,door:.95,disp:'0'});const k=cl((t-T(15)+.6)/1.6);put('you',{x:EX,y:0,z:lerp(-3.5,-9.6,k),ry:180,walk:k<1?t*8:undefined,pose:'case',item:'bag',lid:.6},t);C3(t,[EX-1.5,5,6],[EX,3,-8],44);}],
// 16 press 9
[16,(t)=>{CAB(t,{btn:t>=T(16,'التاسع')-.2?9:-1,disp:'0'});const pr=t>=T(16,'ضغطتي');put('you',{x:EV,y:0,z:.2,ry:-70,pose:pr?'point':'case',item:pr?'':'bag',lid:.55},t);C3(t,[EV-8.5,5.2,1.5],[EV+1.2,3.6,-1.2],44);}],
// 17-22 rising floors, the screen dies
[17,(t)=>{const D=seq(t,[[0,'0'],[T(17,'واحد'),'1'],[T(17,'جوج'),'2'],[T(17,'ثلاثة'),'3'],[TE(17)+.3,'4'],[TE(17)+.7,'5'],[T(18,'ستة'),'6'],[T(18,'سبعة'),'7'],[T(18,'تمنية'),'8'],[T(18,'تسعة'),'9'],[T(20,'عشرة'),'10'],[T(20,'حداش'),'11'],[T(20,'طناش'),'12']]);
  const off=t>=T(21,'طفات');const L=t>=T(22)?22:t>=T(21)?21:t>=T(20)?20:t>=T(19)?19:17;CAB(t,{disp:D,on:!off,btn:9,light:off?14+Math.sin(t*29)*6:22});
  const fear=L>=19;put('you',{x:EV,y:0,z:.4,ry:L>=19?-130:180,pose:fear?'hug':'case',item:fear?'':'bag',lid:fear?.05:.5,ex:0,ey:-.8,browUp:fear?.8:0,hx:-.25},t);
  if(L<=18)C3(t,[EV+.8,4.8,9.5],[EV,4,-2.5],44);else C3(t,[EV-8.5,5,1],[EV+.6,4.2,-.8],44,L>=22?1:0);
  if(L>=19&&L<21){const g=G(FX,540,330,popS(t,T(19)));txt(g,0,0,90,'!','#ff3b30');}}],
// 23 it stops
[23,(t)=>{CAB(t,{disp:'',on:0,btn:9,light:12});const j=t-T(23)<.3?(.3-(t-T(23)))*3:0;put('you',{x:EV,y:-j*.3,z:.4,ry:-130,pose:'hug',lid:0,ey:-.8,browUp:1},t);C3(t,[EV-8.5,5-j,1],[EV+.6,4.2,-.8],44,j*4);}],
// 24 the door slides open
[24,(t)=>{const k=ease(cl((t-T(24)+.2)/2.2));CAB(t,{beyond:'burnt',door:k,disp:'',on:0,btn:9,light:12,tod:'dark'});put('you',{x:EV-.7,y:0,z:1,ry:170,pose:'hug',lid:0},t);C3(t,[EV+2.6,5,9.5],[EV+.6,3.4,-8],46);}],
// 25-26 dark corridor, black walls, old smoke
[25,(t)=>{CAB(t,{beyond:'burnt',door:1,disp:'',on:0,btn:9,light:12,tod:'dark'});put('you',{x:EV+.3,y:0,z:.8,ry:180,pose:'hug',lid:0},t);
  const L=t>=T(26)?26:25;if(L===25)C3(t,[EV+1.2,5,9.5],[EV,3.4,-12],46);else C3(t,lerp3(t,[EV+.6,4.8,-4],[EV+.4,4.6,-9],T(26),T(27)),[EV,3.6,-30],50);
  if(L===26&&t>=T(26,'الدخان')){for(let i=0;i<4;i++){const ph=((t-T(26,'الدخان'))*.4+i/4)%1;el('circle',{cx:300+i*160,cy:1200-ph*500,r:60+ph*70,fill:'#8a8378',opacity:.2*(1-ph)},FX);}}}],
// 27 door 37 at the end
[27,(t)=>{CAB(t,{beyond:'burnt',door:1,disp:'',on:0,tod:'dark',light:10});C3(t,lerp3(t,[EV+.5,4.4,-9],[EV+.3,4,-22],T(27),T(28)),[EV,3.2,-43],46);if(t>=T(27,'رقم')){const [x,y]=project(EV,4.9,-42.8);el('circle',{cx:x,cy:y,r:70*popS(t,T(27,'رقم')),fill:'none',stroke:'#ffd166','stroke-width':8},FX);}}],
// 28 weak yellow light under the door
[28,(t)=>{CAB(t,{beyond:'burnt',door:1,disp:'',on:0,tod:'dark',light:10});const U=ENVS.burnt.userData;U.yL.intensity=8+Math.sin(t*9)*2;C3(t,lerp3(t,[EV+.8,2.4,-28],[EV+.6,1.6,-33],T(28),T(29)),[EV,.6,-43],44);}],
// 29-30 footsteps coming to the door (light under door broken by shadows)
[29,(t)=>{CAB(t,{beyond:'burnt',door:1,disp:'',on:0,tod:'dark',light:10});const U=ENVS.burnt.userData;const st=Math.sin(t*5)>0;U.yL.intensity=st?3:9;U.strip.scale.x=st?.5:1;U.glowF.scale.set(st?2.5:5,1.6,1);
  if(t<T(30)){C3(t,[EV+.6,1.6,-33],[EV,.6,-43],44);}else{put('you',{x:EV,y:0,z:.6,ry:180,pose:'hug',lid:0,ey:-.3,browUp:1,mouth:.15},t);C3(t,[EV+.4,4.6,-9.5],[EV,3.4,.6],44,.5);}}],
// 31 the door closes by itself, and it drops to the 9th floor
[31,(t)=>{const k=ease(cl((t-T(31)+.1)/1.6));const fall=t>=T(31,'وهبط');CAB(t,{beyond:'burnt',door:1-k,disp:fall?seq(t,[[T(31,'وهبط'),'12'],[T(31,'وهبط')+.4,'11'],[T(31,'وهبط')+.8,'10'],[T(31,'وهبط')+1.2,'9']]):'',on:fall,btn:9,light:fall?22:10,tod:'dark'});
  put('you',{x:EV+.3,y:0,z:.8,ry:fall?-110:180,pose:'hug',lid:0,browUp:1,mouth:fall?.3:0},t);if(!fall)C3(t,[EV+1.2,5,9.5],[EV,3.4,-8],46);else C3(t,[EV-8.5,5,1],[EV+.6,4,-.5],44,1.2);}],
// 32 question 1
[32,QB(1,32,(t)=>{CAB(t,{beyond:'burnt',door:1,disp:'',on:0,tod:'dark',light:10});C3(t,[EV+.5,4.4,-9],[EV,3.2,-43],46);})],
[33,CB(33,(t)=>{STREET(t,'night');C3(t,[20,8,90],[0,45,-8],46);})],
// 34 morning, no sleep
[34,(t)=>{setEnv('room','interior');flt('brightness(1.08) saturate(1.05)');put('you',{x:1000-5.4,y:0,z:-1.2,ry:20,sit:1,pose:'sitidle',lid:.7,brow:-.2},t);C3(t,[1000-1,5,9.5],[1000-4.6,2.4,-1.8],44);}],
// 35 down the stairs, then a close look at the elevator
[35,(t)=>{if(t<T(35,'وشفتي')){setEnv('stairs','interior');setFloorNum(1);const k=cl((t-T(35))/(T(35,'وشفتي')-T(35)));put('you',{x:800-3,y:5.5-k*5,z:-3.6+k*8,ry:0,walk:t*8,lid:.6},t);C3(t,[800+5,7,12],[800-3,3.4,0],44);return;}
  LOB(t,{door:.95,disp:'0'});put('you',{x:EX-.4,y:0,z:-5,ry:180,lid:.45,ey:-.5},t);C3(t,[EX+2.4,5,4.5],[EX,3.4,-8],44);}],
// 36 the buttons: 0 to 12, nothing above
[36,(t)=>{CAB(t,{btn:-1,disp:'0'});C3(t,[EV-1.2,4.4,1.2],[EV+3,3.8,-2.1],40);if(t>=T(36,'ما')){const [x,y]=project(EV+2.97,4.95,-2.1);X(FX,x+150,y-60,popS(t,T(36,'ما')),.8);LBL('13 ؟',x+150,y-60,popS(t,T(36,'ما')+.3),54,'#fff','#17120f');}}],
// 37 to Ba Tahar's little room by the door
[37,(t)=>{LOB(t);const k=cl((t-T(37))/2.2);put('you',{x:lerp(EX,LX+9.3,ease(k)),y:0,z:lerp(-4,-.6,ease(k)),ry:k<1?60:90,walk:k<1?t*8:undefined,lid:.4},t);C3(t,[LX-1,5.4,9.5],[LX+8,3,-1],44);}],
// 38 "last night the elevator took me to the 13th floor"
[38,(t)=>{setEnv('loge','interior');ENVS.loge.userData.door.visible=false;put('tahar',{x:1200+2,y:0,z:-3,ry:-20,sit:1,pose:'drink',item:'tea',lid:.35},t);put('you',{x:1200-1.8,y:0,z:-.2,ry:120,pose:'idle',lid:.3,brow:.2,mouth:talkIn(t,38)},t);
  C3(t,[1200+.4,5,9.5],[1200,2.6,-1.5],44);if(t>=T(38,'لطابق'))LBL('13',300,360,popS(t,T(38,'لطابق')),80,'#ff3b30','#fff');}],
// 39-40 he freezes, tea halfway; his face turns pale
[39,(t)=>{setEnv('loge','interior');ENVS.loge.userData.door.visible=true;const pale=t>=T(40);if(pale)flt('saturate(.55) brightness(1.06)');put('tahar',{x:1200+2,y:0,z:-3,ry:-30,sit:1,pose:'drink',item:'tea',lid:pale?0:.2,ey:0,brow:-.2,browUp:pale?1:.4,hx:0},t);
  C3(t,lerp3(t,[1200-.4,4.4,3.6],[1200+.4,4.2,1.8],T(39),T(41)),[1200+2,3,-3],40);}],
// 41-42 "there is no 13th floor. take the stairs"
[41,(t)=>{setEnv('loge','interior');ENVS.loge.userData.door.visible=false;const L=t>=T(42)?42:41;put('tahar',{x:1200+1.6,y:0,z:-2.4,ry:-40,pose:'point',lid:.2,brow:.9,mouth:talkIn(t,L)},t);put('you',{x:1200-1.8,y:0,z:1.4,ry:140,lid:.3,browUp:.5},t);
  C3(t,[1200-.6,5,9],[1200+.2,3,-1],44);if(L===41&&t>=T(41,'التلطاش')){LBL('13',780,330,popS(t,T(41,'التلطاش')),80,'#fff','#17120f');X(FX,780,330,popS(t,T(41,'التلطاش')+.2),1);}if(L===42)clk(t,T(42,'نص'),0,0,220,330,95);}],
// 43 slams the door in your face
[43,(t)=>{LOB(t);const s=t>=T(43,'فوجهك')-.4;put('you',{x:LX+9.2,y:0,z:-1,ry:90,lid:s?.0:.3,browUp:s?1:0,hx:s?.1:0},t);C3(t,[LX+3.5,4.8,4.5],[LX+11,3.4,-1.2],42,s&&t<T(43,'فوجهك')?2:0);
  if(s){const g=G(FX,780,600,popS(t,T(43,'فوجهك')-.4));txt(g,0,0,90,'طاخ!','#fff',{stroke:'#17120f','stroke-width':10,'paint-order':'stroke'});}}],
// 44 before it shut: hiding the keys, trembling hand
[44,(t)=>{setEnv('loge','interior');ENVS.loge.userData.door.visible=true;const k=cl((t-T(44,'كيخبي'))/1.2);put('tahar',{x:1200,y:0,z:3.6,ry:180,pose:'keys',item:k<1?'keyring':'',lid:.25,brow:.6,hz:Math.sin(t*30)*2},t);
  if(k>=1&&CH3)0;C3(t,lerp3(t,[1200+1.6,4.8,-4.4],[1200+1,4.2,-2.4],T(44),T(45)),[1200,2.9,3.6],42,t>=T(44,'ويدو')?.6:0);}],
// 45 Sara is standing next to you
[45,(t)=>{LOB(t);put('you',{x:LX+6,y:0,z:1,ry:120,lid:.3},t);put('sara',{x:LX+2.6,y:0,z:1.6,ry:60,lid:.3,smile:.1},t);C3(t,[LX+3.6,4.6,11],[LX+4.2,3,1],42);if(t>=T(45,'سارة')){const [x,y]=project(LX+2.6,5.6,1.6);LBL('سارة',x,y-30,popS(t,T(45,'سارة')),56,'#ffd166','#17120f');}}],
// 46 nurse, 6th floor, night shift
[46,(t)=>{LOB(t);put('sara',{x:LX+2.4,y:0,z:1.4,ry:20,lid:.3,smile:.15},t);C3(t,lerp3(t,[LX+3.4,4.2,8.8],[LX+3.1,4,7.6],T(46),T(47)),[LX+2.4,3,1.4],40);
  if(t>=T(46,'ممرضة'))LBL('ممرضة',250,520,popS(t,T(46,'ممرضة')),54,'#fff','#d94a4a');if(t>=T(46,'الستة'))BIG('6',840,460,popS(t,T(46,'الستة')),130);if(t>=T(46,'بالليل'))LBL('خدمة الليل',250,700,popS(t,T(46,'بالليل')),52,'#24345c','#fff');}],
// 47 she looks left and right, comes closer
[47,(t)=>{LOB(t);const k=cl((t-T(47,'وقربات'))/1.2);const hy=t<T(47,'وقربات')?Math.sin((t-T(47))*4)*35:0;put('sara',{x:lerp(LX+2.6,LX+4.4,k),y:0,z:1.4,ry:60,walk:k>0&&k<1?t*8:undefined,hy,lid:.25,ex:hy/40},t);put('you',{x:LX+6.6,y:0,z:1,ry:-110,lid:.3},t);C3(t,[LX+4.8,4.6,10],[LX+5,3,1],42);}],
// 48-49 whisper: "me too, two years ago"
[48,(t)=>{LOB(t);const L=t>=T(49)?49:48;put('sara',{x:LX+4.2,y:0,z:1.4,ry:70,pose:'cover',lid:.3,brow:.4,mouth:talkIn(t,L)*.7},t);put('you',{x:LX+6.4,y:0,z:1.1,ry:-110,lid:.2,browUp:.5},t);
  C3(t,lerp3(t,[LX+3.6,4.6,10.6],[LX+3.9,4.4,9.6],T(48),T(50)),[LX+5,3.2,1.2],40);if(L===49&&t>=T(49,'عامين'))LBL('هادي عامين',300,360,popS(t,T(49,'عامين')),54,'#fff','#17120f');}],
// 50 "to the 13th floor?"
[50,(t)=>{LOB(t);put('you',{x:LX+6.2,y:0,z:1.1,ry:-100,lid:0,browUp:1,mouth:talkIn(t,50)},t);put('sara',{x:LX+4.2,y:0,z:1.4,ry:70,lid:.3},t);C3(t,[LX+7.4,4.6,10],[LX+5.6,3.4,1],40);}],
// 51 shrug: "the walls have ears"
[51,(t)=>{LOB(t);const sh=t<T(51,'وقالت');put('sara',{x:LX+4.2,y:0,z:1.4,ry:50,pose:sh?'shrug':'ear',lid:.3,brow:.4,mouth:talkIn(t,51)*.7},t);put('you',{x:LX+6.4,y:0,z:1.1,ry:-110,lid:.2},t);
  C3(t,[LX+3,4.6,10.4],[LX+4.8,3.2,1.2],40);if(t>=T(51,'الودنين'))LBL('الحيوط عندهم الودنين',540,360,popS(t,T(51,'الودنين')),46,'#fff','#17120f');}],
// 52 she leaves
[52,(t)=>{LOB(t);const k=cl((t-T(52))/1.8);put('sara',{x:lerp(LX+4.2,LX-2,k),y:0,z:lerp(1.4,3,k),ry:-80,walk:t*8,lid:.3},t);put('you',{x:LX+6.4,y:0,z:1.1,ry:-100,lid:.2,browUp:.3},t);C3(t,[LX+4,4.6,11],[LX+2,3,1.5],44);}],
// 53 evening, in front of the building
[53,(t)=>{STREET(t,'dusk');put('you',{x:3,y:.3,z:10,ry:180,pose:'idle',lid:.3,hx:-.3},t);C3(t,lerp3(t,[12,4,26],[9,5,24],T(53),T(54)),[1,8,0],46);}],
// 54-58 counting the windows floor by floor (twice): 13
[54,(t)=>{STREET(t,'dusk');put('you',{x:3,y:.3,z:10,ry:180,pose:'point',lid:.3,hx:-.4},t);const t0=T(55);const k=ease(cl((t-T(54))/(T(57)-T(54))));
  C3(t,[-4,lerp(10,40,k),lerp(70,120,k)],[0,lerp(14,52,k),-8],48);
  if(t>=T(55)&&t<T(57))floorBadges(t,T(55),13,(T(56)-T(55))/12);if(t>=T(57))floorBadges(t,T(57),13,(T(58)-T(57))/13);if(t>=T(58))BIG('13',540,420,popS(t,T(58)),170,'#ff3b30');}],
// 59-61 the bricked row above the 12th
[59,(t)=>{STREET(t,'dusk');const L=t>=T(61)?61:t>=T(60)?60:59;C3(t,lerp3(t,[8,88,40],[6,94,28],T(59),T(62)),[0,95,-2],42);
  if(t>=T(59,'بالآجور'))LBL('آجور',540,1500,popS(t,T(59,'بالآجور')),56,'#b5543a','#fff');if(L>=60){X(FX,300,560,popS(t,T(60)),.9);txt(FX,300,680,44,'ضو','#fff');X(FX,780,560,popS(t,T(60,'زاج')),.9);txt(FX,780,680,44,'زاج','#fff');}
  if(L===61){const [x,y]=project(-16,95.5,0);el('path',{d:`M${x-120} ${y-180} L${x-20} ${y-30}`,stroke:'#ffd166','stroke-width':12,'marker-end':'',fill:'none'},FX);}}],
[62,QB(2,62,(t)=>{STREET(t,'dusk');C3(t,[-4,40,120],[0,52,-8],48);})],
[63,CB(63,(t)=>{STREET(t,'night');C3(t,[20,8,90],[0,45,-8],46);})],
// 64-65 answer: 13 floors; one hidden above the 12th
[64,AB(2,64,(t)=>{STREET(t,'dusk');C3(t,[-4,46,140],[0,50,-8],48);floorBadges(t,T(64,'تلطاش'),13,.06,13);if(t>=T(65)){const [x,y]=project(0,95.5,0);el('rect',{x:x-200,y:y-34,width:400,height:68,fill:'none',stroke:'#ff3b30','stroke-width':8,rx:8},FX);}})],
// 66 at night Sara knocks
[66,(t)=>{setEnv('room','interior');put('you',{x:1000+4.8,y:0,z:-3.4,ry:110,sit:1,pose:'write',item:'book',lid:.4,hy:t>=T(66,'دقات')?40:0},t);C3(t,[1000+1,5.2,9.5],[1000+4.5,2.6,-2.5],44);
  if(t>=T(66,'دقات')){const g=G(FX,880,700,popS(t,T(66,'دقات')));txt(g,0,0,64,'طق طق','#fff',{stroke:'#17120f','stroke-width':8,'paint-order':'stroke'});}}],
// 67 she comes in, sits, silent
[67,(t)=>{setEnv('room','interior');const k=cl((t-T(67))/1.6);const sat=t>=T(67,'وجلسات');put('sara',sat?{x:1000+1.2,y:0,z:-1,ry:60,sit:1,pose:'sitidle',lid:.4,ey:.5}:{x:lerp(1000+7,1000+2,k),y:0,z:lerp(3,0,k),ry:-110,walk:t*8,lid:.3},t);put('you',{x:1000+4.8,y:0,z:-3,ry:-120,sit:1,pose:'sitidle',lid:.3},t);C3(t,[1000-2,5.2,10.5],[1000+3,2.4,-1.5],44);}],
// 68 her story (in your room)
[68,(t)=>{setEnv('room','interior');put('sara',{x:1000+1.2,y:0,z:-1,ry:50,sit:1,pose:'sitidle',lid:.4,ey:.4,mouth:talkIn(t,68)*.7},t);put('you',{x:1000+4.8,y:0,z:-3,ry:-120,sit:1,pose:'sitidle',lid:.25,browUp:.3},t);C3(t,lerp3(t,[1000-1.4,4.8,9.2],[1000-.8,4.6,8.2],T(68),T(69)),[1000+2.4,2.4,-1.8],42);clk(t,T(68,'الوحدة'),1,0,860,330,95);}],
// 69-73 flashback: Sara in the elevator, the door opens on the 13th, a man singing a lullaby
[69,(t)=>{flt('sepia(.45) contrast(1.05)');const L=t>=T(71)?71:t>=T(70)?70:69;const op=L>=70?ease(cl((t-T(70))/1.5)):0;
  CAB(t,{beyond:'burnt',door:op,disp:L===69?seq(t,[[T(69),'3'],[T(69)+.7,'7'],[T(69)+1.3,'12']]):'',on:L===69,light:L===69?22:12,tod:L===69?'interior':'dark'});
  put('sara',{x:EV+.3,y:0,z:.8,ry:L>=70?180:-120,pose:L>=70?'hug':'idle',lid:L>=70?0:.4},t);
  if(L<71)C3(t,[EV-8.5,5,1],[EV+.6,4,-.8],44);else{C3(t,[EV+1.2,5,9.5],[EV,3.4,-14],46);notes(t,560,900);}}],
// 74 nobody would believe me
[74,(t)=>{setEnv('room','interior');put('sara',{x:1000+1.2,y:0,z:-1,ry:40,sit:1,pose:'sitidle',lid:.5,ey:.6,mouth:talkIn(t,74)*.6},t);put('you',{x:1000+4.8,y:0,z:-3,ry:-120,sit:1,pose:'sitidle',lid:.2},t);C3(t,[1000-1,4.8,8.6],[1000+2,2.4,-1.8],42);}],
// 75 we decide to wait
[75,(t)=>{setEnv('room','interior');put('sara',{x:1000+1.2,y:0,z:-1,ry:60,sit:1,pose:'sitidle',lid:.2,brow:.4},t);put('you',{x:1000+4.8,y:0,z:-3,ry:-120,sit:1,pose:'sitidle',lid:.2,brow:.4,hx:Math.sin(t*6)*.08},t);C3(t,[1000+3,5,9.6],[1000+3,2.4,-2],44);}],
// 76-78 00:30, hiding on the stairs, the building is silent
[76,(t)=>{LOB(t,{night:1});put('you',{x:LX-9,y:3.3,z:-1.6,ry:120,sit:1,pose:'sitidle',lid:.3},t);put('sara',{x:LX-10.2,y:3.85,z:-2.5,ry:120,sit:1,pose:'sitidle',lid:.3},t);
  const L=t>=T(78)?78:t>=T(77)?77:76;C3(t,L===77?[LX+6,6,10]:[LX-1,6.6,8.5],[L===77?LX:LX-9.4,4,-2],44);if(L===76)clk(t,T(76,'الطناش'),0,30);if(L===78)clk(t,T(78),0,30,540,330,140);}],
// 79-80 the elevator moves on its own, empty
[79,(t)=>{const k=t<T(79,'تحرك')?1:1-ease(cl((t-T(79,'تحرك'))/1.2));LOB(t,{night:1,door:k,disp:'0'});C3(t,[EX-2,4.6,6],[EX,3.6,-8],42);if(t>=T(80))LBL('خاوي',540,360,popS(t,T(80)),60,'#fff','#17120f');}],
// 81-82 display: 5, 6, 9, 12... then off
[81,(t)=>{const off=t>=T(82,'طفات');LOB(t,{night:1,disp:seq(t,[[0,'1'],[T(81,'خمسة'),'5'],[T(81,'ستة'),'6'],[T(81,'تسعة'),'9'],[T(81,'طناش'),'12']]),on:!off});C3(t,lerp3(t,[EX-1,5.6,1.5],[EX-.6,6.2,-2],T(81),T(83)),[EX,7,-8],40);}],
// 83 one full hour (clock spins)
[83,(t)=>{LOB(t,{night:1,on:0});put('you',{x:LX-9,y:3.3,z:-1.6,ry:120,sit:1,pose:'sitidle',lid:.55},t);put('sara',{x:LX-10.2,y:3.85,z:-2.5,ry:120,sit:1,pose:'sitidle',lid:.5},t);C3(t,[LX-1,6.6,8.5],[LX-9.4,4,-2],44);const k=cl((t-T(83))/1.5);clockFace(FX,540,360,140,0+k,30+k*60);}],
// 84 Sara holding your hand, nobody speaks
[84,(t)=>{LOB(t,{night:1,on:0});put('you',{x:LX-9,y:3.3,z:-1.6,ry:120,sit:1,pose:'sitidle',lid:.3,ey:.4},t);put('sara',{x:LX-10.1,y:3.85,z:-2.3,ry:110,sit:1,pose:'grab',lid:.3,ey:.4},t);C3(t,lerp3(t,[LX-2,7,9.5],[LX-2.6,6.8,8.5],T(84),T(85)),[LX-9.6,5,-2],42);}],
// 85-86 01:30 it comes down, stops, opens
[85,(t)=>{const L=t>=T(86)?86:85;const D=L===85?String(Math.max(0,12-Math.floor((t-T(85))*4.5))):'0';const op=L===86&&t>=T(86,'والباب')?ease(cl((t-T(86,'والباب'))/1.5)):0;
  LOB(t,{night:1,disp:D,door:op,toy:1});C3(t,[EX-3,4.8,6.5],[EX,4,-8],44);if(L===85)clk(t,T(85,'الوحدة'),1,30);}],
// 87-88 nobody inside; but the smell of smoke
[87,(t)=>{LOB(t,{night:1,disp:'0',door:1,toy:1});put('you',{x:EX-1.6,y:0,z:-3,ry:170,lid:.1,browUp:.8},t);put('sara',{x:EX+1.4,y:0,z:-2.6,ry:-170,lid:.1,browUp:.8},t);C3(t,[EX,5.6,9.5],[EX,3,-7],44);
  if(t>=T(88)){for(let i=0;i<5;i++){const ph=((t-T(88))*.45+i/5)%1;const [x,y]=project(EX+(i-2)*.5,3,-9);el('circle',{cx:x+(i-2)*40*ph,cy:y-ph*380,r:40+ph*70,fill:'#8a8378',opacity:.4*(1-ph)},FX);}}}],
// 89 a small red toy car, burnt on one side
[89,(t)=>{LOB(t,{night:1,disp:'0',door:1,toy:1});C3(t,lerp3(t,[EX-.3,4.6,-3],[EX-.6,3.4,-5.6],T(89),T(90)),[EX-1.3,.3,-12.3],42);if(t>=T(89,'حمرا')){const [x,y]=project(EX-1.3,.5,-12.3);el('circle',{cx:x,cy:y,r:120*popS(t,T(89,'حمرا')),fill:'none',stroke:'#ffd166','stroke-width':8},FX);}}],
// 90-91 Sara picks it up, hand trembling: "this belongs to a child"
[90,(t)=>{LOB(t,{night:1,disp:'0',door:1,toy:0});const L=t>=T(91)?91:90;put('sara',{x:EX-.6,y:0,z:-6,ry:20,pose:'hold',item:'toycar',lid:.15,browUp:.8,hz:Math.sin(t*28)*2.5,mouth:L===91?talkIn(t,91)*.6:0},t);put('you',{x:EX+2.2,y:0,z:-5.4,ry:-40,lid:.1,browUp:.8},t);C3(t,[EX+1,4.6,2.6],[EX+.4,3.2,-5.8],42);}],
[92,QB(3,92,(t)=>{LOB(t,{night:1,disp:'0',door:1,toy:1});C3(t,[EX,5.2,6],[EX,3.4,-9],44);})],
[93,CB(93,(t)=>{STREET(t,'night');C3(t,[20,8,90],[0,45,-8],46);})],
];
