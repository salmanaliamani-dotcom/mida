// ===================== SHOT LIST (times = aligned word times of the voice-over) =====================
const FX=()=>$('fx');
const DK=.5; // base darkness after the lights die
function fxClock(x,y,r,a,col='#ffd166'){const g=el('g',{transform:`translate(${x} ${y})`},FX());el('circle',{r,fill:'#0f1320',stroke:col,'stroke-width':10},g);
  for(let i=0;i<12;i++){const q=i*Math.PI/6;el('path',{d:`M${Math.sin(q)*r*.78} ${-Math.cos(q)*r*.78} L${Math.sin(q)*r*.9} ${-Math.cos(q)*r*.9}`,stroke:'#fff','stroke-width':5},g);}
  el('path',{d:`M0 0 L${Math.sin(a)*r*.7} ${-Math.cos(a)*r*.7}`,stroke:'#ff5a4e','stroke-width':9,'stroke-linecap':'round'},g);el('path',{d:`M0 0 L${Math.sin(a/12)*r*.45} ${-Math.cos(a/12)*r*.45}`,stroke:'#fff','stroke-width':11,'stroke-linecap':'round'},g);el('circle',{r:10,fill:'#fff'},g);return g;}
function fxDots(x,y,n,t,times,col='#ff3b30'){for(let i=0;i<n;i++){const s=popS(t,times[i]);if(s<=0)continue;el('circle',{cx:x+(i-(n-1)/2)*90,cy:y,r:30*s,fill:col,stroke:'#17120f','stroke-width':5},FX());}}
function fxWind(t,k,y0=700,dir=-1){for(let i=0;i<6;i++){const ph=((t*.9+i*.37)%1);const x=dir<0?1300-ph*1700:-200+ph*1700;el('path',{d:`M${x} ${y0+i*110} q${-dir*-90} -34 ${-dir*-180} 0 t${-dir*-180} 0`,stroke:'#dbeeff','stroke-width':8,fill:'none',opacity:.55*k*Math.sin(ph*Math.PI),'stroke-linecap':'round'},FX());}}
function fxBigNum(n,t,t0,y=420){const s=popS(t,t0,.3);if(s<=0)return;const e=txt(FX(),540,y,230,String(n),'#ffd166',{direction:'ltr',stroke:'#17120f','stroke-width':14,'paint-order':'stroke'});e.setAttribute('transform',`translate(540 ${y-80}) scale(${s}) translate(-540 ${-(y-80)})`);}
function fxDrop(x,y,s=1,op=1){el('path',{d:'M0 -60 Q-38 0 -36 22 Q-30 60 0 60 Q30 60 36 22 Q38 0 0 -60Z',fill:'#8fd3ff',stroke:'#17120f','stroke-width':6,opacity:op,transform:`translate(${x} ${y}) scale(${s})`},FX());}
// perspective tunnel (used for walking + POV)
function tunnelPersp(t,o){vis(wkRails,false);wkArch.innerHTML='';const vx=540,vy=880;
  const g=wkArch;el('rect',{x:-400,y:-400,width:1880,height:2800,fill:'#121318'},g);
  const sc=o.scroll||0;
  for(let i=14;i>=0;i--){let z=((i+ (sc%1))/14);z=Math.max(.02,1-z);const s=Math.pow(z,1.6);const w=60+1500*s,h=80+1900*s;
    el('path',{d:`M${vx-w/2} ${vy+h*.38} L${vx-w/2} ${vy-h*.12} Q${vx} ${vy-h*.62} ${vx+w/2} ${vy-h*.12} L${vx+w/2} ${vy+h*.38}`,fill:'none',stroke:`rgb(${40+60*s},${38+52*s},${34+44*s})`,'stroke-width':4+40*s},g);}
  el('path',{d:`M${vx} ${vy+40} L-300 2400 L1380 2400Z`,fill:'#1e1c19'},g);
  el('path',{d:`M${vx-14} ${vy+40} L${vx-420} 2400 M${vx+14} ${vy+40} L${vx+420} 2400`,stroke:'#8b8f9a','stroke-width':12},g);
  for(let i=0;i<16;i++){let z=((i+(sc*1.6%1))/16);const y=vy+40+Math.pow(z,2.2)*1560;const hw=14+(y-vy-40)*.27;el('path',{d:`M${vx-hw} ${y} L${vx+hw} ${y}`,stroke:'#4a3a2c','stroke-width':3+z*22},g);}
}

const SH=[
// ---- 0.00 phone clock 23:20 ----
[0,PH,(t)=>{cam(PH.cam,t,540,1000,kf(t,[[0,1.12],[2.9,1.0]]));phoneShot(t,{lamps:1,grade:.1,clock:t<1.24?'':t<1.75?'23':'23:20',moon:eout((t-2.51)/.3),bars:4,batt:76});
  if(t<1.24){} }],
[2.90,WG,(t)=>{cam(WG.cam,t,540,1000,kf(t,[[2.9,1.15],[4.1,1.02]]));wagon(t,{lamps:1,grade:.12,warm:.5,you:P(t,{x:540,y:1120,s:1.2,ey:.7,lid:.35,l:[-60,130],r:[60,130],ritem:'phone',smile:.1},1)});}],
// ---- 4.10 train enters tunnel ----
[4.10,TP,(t)=>{cam(TP.cam,t,540,kf(t,[[4.1,1150],[6.27,1000]]),kf(t,[[4.1,1.0],[6.27,1.25]]));tpChars.forEach(c=>vis(c.root,false));tpDawn.setAttribute('opacity',0);tpSun.setAttribute('opacity',0);vis(tpTrain,true);
  const p=kf(t,[[4.1,0],[5.92,1]]);place(tpTrain,540,lerp(2150,1180,p),lerp(1.25,.32,Math.pow(p,.8)));const ins=cl((t-5.45)/.4);tpTrain.setAttribute('opacity',1-ins);tpTL.forEach(c=>c.setAttribute('opacity',.9-ins*.9));tpGrade.setAttribute('opacity',.25);tpWarm.setAttribute('opacity',0);}],
// ---- 6.27 brake jolt, 8.61 lights die ----
[6.27,WG,(t)=>{const jolt=t<7.15?Math.sin((t-6.27)/.88*Math.PI*.5):Math.max(0,1-(t-7.15)/.25)-Math.sin(Math.min(1,(t-7.15)/.5)*Math.PI)*.35*Math.exp(-(t-7.15)*3);
  const lookUp=t>8.61?eout((t-8.61)/.3):0;
  cam(WG.cam,t,540,kf(t,[[6.27,980],[8.5,980],[8.9,760]]),kf(t,[[6.27,1.0],[8.5,1.08],[8.9,1.0],[11,1.06]]),t>6.27&&t<7.25?9:0);
  let on=1;if(t>=8.88&&t<9.70){const f=Math.floor((t-8.88)*18);on=[1,0,1,1,0,0,1,0,0,0,1,0,0,0,0][f%15]??0;}if(t>=9.70)on=0;
  const dark=t<8.88?0:t<9.70?(1-on)*.45:lerp(.45,.62,eout((t-9.70)/.4));
  wagon(t,{lamps:on,grade:.12+dark,warm:on*.5,you:P(t,{x:540,y:1150,s:1.25,lean:jolt*-12,hdx:jolt*-30,ex:t<8.61?.3*Math.sin(t*3):-.2*lookUp,ey:t<8.61?0:-.9*lookUp,
    lid:t<9.7?.05:0,blink:t<9.7?0:blink(t,2),browUp:1,brow:-.7,mouth:t<7.4?.35:t>9.7&&t<10.6?.18:0,smile:-.5,l:t<7.4?[-160,60]:[-130,220],r:t<7.4?[160,60]:[130,220]},2)});
  if(t>=9.70&&t<9.8)$('flash').setAttribute('opacity',.6);}],
// ---- 11.01 engine silent, breathing ----
[11.01,WG,(t)=>{cam(WG.cam,t,540,kf(t,[[11.01,800],[15.83,820]]),kf(t,[[11.01,1.6],[15.83,1.78]]));
  const bt=t-12.74;const br=bt>0?(Math.sin(bt*2*Math.PI/1.8-Math.PI/2)+1)/2:0;
  wagon(t,{grade:.62,you:P(t,{x:540,y:1060,s:1.15,hdy:-br*10,ex:Math.sin(t*1.7)*.5,ey:-.1,lid:0,browUp:.7,brow:-.6,mouth:bt>0?.08+br*.22:0,mw:.7,smile:-.4,l:[-110,250-br*14],r:[110,250-br*14]},3)});
  const amp=t<11.53?1:Math.max(0,1-(t-11.53)/.25);const wo=t<12.6?1:Math.max(0,1-(t-12.6)/.4);
  let d='';for(let i=0;i<=60;i++){const x=90+i*15;const y=1560+amp*(Math.sin(i*.9+t*18)*26+Math.sin(i*2.3+t*31)*10);d+=(i?'L':'M')+x+' '+y.toFixed(1);}
  el('path',{d,fill:'none',stroke:'#7fc4ff','stroke-width':26,opacity:.18*wo,filter:'url(#dof)'},FX());el('path',{d,fill:'none',stroke:'#7fc4ff','stroke-width':8,opacity:.85*wo,'stroke-linecap':'round'},FX());
  if(t>13.6){wgBreath.setAttribute('opacity',(1-br)*.55);place(wgBreath,540+70,1060-150*1.15+95*1.15,1,10);}}],
// ---- 15.83 no announcement ----
[15.83,IC,(t)=>{cam(IC.cam,t,540,kf(t,[[15.83,880],[17.9,760]]),kf(t,[[15.83,1.0],[17.9,1.12]]));
  intercom(t,{grade:.45,mute:t>=16.79?eout((t-16.79)/.2):0,you:P(t,{x:540,y:1700,s:1.1,ex:Math.sin(t*1.2)*.3,ey:-1,hrot:-4,lid:.05,browUp:.9,brow:-.5,smile:-.4},4)});}],
[17.90,CB,(t)=>{cam(CB.cam,t,540,kf(t,[[17.9,930],[20.17,880]]),kf(t,[[17.9,1.0],[20.17,1.12]]));cbGrade.setAttribute('opacity',.5);}],
// ---- 20.17 phone news ----
[20.17,PH,(t)=>{cam(PH.cam,t,540,1000,kf(t,[[20.17,.95],[25.5,1.08]]));
  const nk=eout((t-21.35)/.3);
  phoneShot(t,{grade:.6,on:eout((t-20.3)/.25),bars:4,batt:64,clock:t<21.35?'23:24':'',news:nk,nl1:t>=22.55?1:0,nl2:t>=23.65?1:0,virus:popS(t,22.75),city:popS(t,24.40)});
  place(virus,-110,205,popS(t,22.75)||.001);}],
[25.56,PH,(t)=>{cam(PH.cam,t,540,1000,kf(t,[[25.56,1.08],[29.33,1.0]]));
  const nb=t<26.71?4:t<27.06?Math.max(0,4-Math.floor((t-26.71)/.08)):0;
  phoneShot(t,{grade:.6,on:t<28.2?1:lerp(1,.55,cl((t-28.2)/1)),bars:nb,noSig:t>=27.06,batt:63,news:t<25.9?1-eout((t-25.56)/.3):0,sigBig:t>=25.9?eout((t-25.9)/.25):0,sigN:nb,sigX:popS(t,27.06)});}],
// ---- 29.33 someone knocks behind you ----
[29.33,AI,(t)=>{cam(AI.cam,t,kf(t,[[29.33,420],[30.6,540]]),kf(t,[[29.33,1150],[30.6,860]]),kf(t,[[29.33,1.05],[30.6,1.35]]));
  aisle(t,{grade:.5,sil:t<30.97?0:.9*eout((t-30.97)/.3),knocks:[31.40],
    you:P(t,{x:200,y:1560,s:1.45,ex:t<30.07?-.2:.9,ey:-.2,hrot:t<30.07?0:8,lid:t<31.4?.15:0,browUp:t>31.4?1:.4,brow:-.5,smile:-.4},5)});}],
[33.04,AI,(t)=>{cam(AI.cam,t,540,810,kf(t,[[33.04,1.9],[35.95,2.1]]));aisle(t,{grade:.5,sil:t<34.57?.9:.9*(1-eout((t-34.57)/.8)),knocks:[33.06,33.42,33.72]});
  fxDots(540,330,3,t,[33.06,33.42,33.72]);}],
// ---- 35.95 panicked vs measured knocks ----
[35.95,IG,(t)=>{cam(IG.cam,t,540,960,1);igClear();const g=igG;
  el('path',{d:'M540 300 L540 1100',stroke:'#3b4766','stroke-width':6,'stroke-dasharray':'2 22','stroke-linecap':'round'},g);
  // right: panicked
  const sh=t<37.2?Math.sin(t*70)*10:0;const fr=el('g',{transform:`translate(${810+sh} ${640+Math.cos(t*55)*6}) scale(${popS(t,35.95)})`},g);
  el('path',{class:'o',fill:'url(#skinP)',d:'M-80 -40 Q-90 -105 -20 -110 L55 -105 Q105 -96 100 -30 L95 45 Q90 90 35 95 L-45 95 Q-90 90 -85 35Z'},fr);el('path',{class:'o',fill:'none','stroke-width':4,d:'M-50 -108 L-50 -55 M0 -110 L2 -55 M50 -104 L50 -55'},fr);
  [36.0,36.08,36.16,36.40,36.48,36.66,36.74,36.82,36.95].forEach((k,i)=>{if(t>=k){const b=el('g',{transform:`translate(${640+((i*97)%330)} ${880+((i*53)%120)}) scale(${.55*popS(t,k)})`},g);burst(b,1);}});
  if(t>=36.87){const k=eout((t-36.87)/.25);el('path',{d:`M620 420 L${620+380*k} ${420+560*k} M1000 420 L${1000-380*k} ${420+560*k}`,stroke:'#ff3b30','stroke-width':22,'stroke-linecap':'round'},g);}
  // left: measured
  if(t>=37.6){const s=popS(t,37.6);const c=el('g',{transform:`translate(270 600) scale(${s})`},g);el('circle',{r:120,fill:'#f5f6fa',stroke:'#17120f','stroke-width':8},c);
    for(let i=0;i<12;i++){const q=i*Math.PI/6;el('path',{d:`M${Math.sin(q)*92} ${-Math.cos(q)*92} L${Math.sin(q)*106} ${-Math.cos(q)*106}`,stroke:'#17120f','stroke-width':6},c);}
    const st=t<37.96?0:t<38.26?1:t<38.56?2:3;el('path',{d:`M0 0 L${Math.sin(st*2.09)*80} ${-Math.cos(st*2.09)*80}`,stroke:'#ff3b30','stroke-width':10,'stroke-linecap':'round'},c);el('circle',{r:12,fill:'#17120f'},c);}
  el('path',{d:'M90 900 L450 900',stroke:'#cfd6e6','stroke-width':8,opacity:t>=37.9?1:0},g);
  [37.96,38.26,38.56].forEach((k,i)=>{if(t>=k){const b=el('g',{transform:`translate(${130+i*140} 900) scale(${.6*popS(t,k)})`},g);burst(b,1);}});
  if(t>=38.6){el('path',{d:'M130 840 Q200 790 270 840 Q340 790 410 840',stroke:'#ffd166','stroke-width':7,fill:'none'},g);}
  el('rect',{x:-400,y:-400,width:1880,height:2800,fill:'#000',opacity:t>39.6?eout((t-39.6)/.6)*.7:0},g);}],
// ---- 40.23 close your eyes ----
[40.23,WG,(t)=>{cam(WG.cam,t,540,800,kf(t,[[40.23,1.6],[42.52,1.75]]));const lk=eout((t-40.30)/.25);
  wagon(t,{grade:.6,black:eout((t-40.82)/1.0)*.85,you:P(t,{x:540,y:1060,s:1.15,lid:lk,blink:0,browUp:.3,brow:-.3,smile:-.2},6)});}],
// ---- 42.52 eye adapts in 20-30 min ----
[42.52,IG,(t)=>{cam(IG.cam,t,540,900,1);igClear();const g=igG;const s=popS(t,42.52,.3);
  const e=el('g',{transform:`translate(540 760) scale(${s})`},g);
  el('path',{d:'M-300 0 Q0 -230 300 0 Q0 230 -300 0Z',fill:'#f7f7fb',stroke:'#17120f','stroke-width':10},e);
  el('circle',{r:120,fill:'#3e7cb1'},e);el('circle',{r:120,fill:'url(#glowB)',opacity:.3},e);
  const pr=lerp(30,95,eout((t-42.88)/(45.79-42.88)));el('circle',{r:pr,fill:'#0b0d12'},e);el('circle',{cx:-40,cy:-45,r:22,fill:'#fff',opacity:.9},e);
  const ring=el('g',{transform:'translate(540 760)'},g);el('circle',{r:360,fill:'none',stroke:'#2a3350','stroke-width':22},ring);
  const a=t<43.54?0:t<44.05?(20/60)*eout((t-43.54)/.4):lerp(20/60,30/60,eout((t-44.05)/.4));
  if(a>0)el('path',{d:arcPath(360,a*Math.PI*2),fill:'none',stroke:'#ffd166','stroke-width':22,'stroke-linecap':'round'},ring);
  if(t>=43.54){const k=popS(t,43.54);txt(ring,Math.sin(20/60*Math.PI*2)*430,-Math.cos(20/60*Math.PI*2)*430+30,90*k,'20','#ffd166',{direction:'ltr'});}
  if(t>=44.05){const k=popS(t,44.05);txt(ring,0,470,90*k,'30','#ffd166',{direction:'ltr'});}
  el('rect',{x:-400,y:-400,width:1880,height:2800,fill:'#000',opacity:t>45.49?eout((t-45.49)/.6)*.85:0},g);}],
// ---- 47.02 slowly things appear ----
[47.02,AI,(t)=>{cam(AI.cam,t,540,kf(t,[[47.02,1000],[54.2,900]]),kf(t,[[47.02,1.0],[54.2,1.18]]));
  const blk=t<47.02?1:t<49.01?lerp(1,.7,eout((t-47.02)/1.2)):t<50.23?lerp(.7,.45,eout((t-49.01)/.4)):lerp(.45,.3,eout((t-50.23)/.4));
  aisle(t,{grade:.55,black:blk,ctrl:t>=51.54?P(t,{x:770,y:914,s:.6,dark:.93,lid:.3},7):null});
  if(t>=49.01&&t<50.0){el('rect',{x:0,y:0,width:1080,height:1920,fill:'#9fd4ff',opacity:.06*(1-(t-49.01))},FX());}}],
[54.27,DC,(t)=>{cam(DC.cam,t,540,960,kf(t,[[54.27,1],[56.06,1.05]]));dayCard(t,54.27,2);}],
// ---- 56.06 the shadow was the conductor ----
[56.06,AI,(t)=>{const z=t<58.59?[760,860,kf(t,[[56.06,1.3],[56.8,1.9]])]:t<60.22?[760,kf(t,[[58.59,860],[59.0,720]]),kf(t,[[58.59,1.9],[59.0,2.8]])]:[760,kf(t,[[60.22,720],[60.6,1000]]),kf(t,[[60.22,2.8],[60.6,2.3]])];
  cam(AI.cam,t,z[0],z[1],z[2]);
  aisle(t,{grade:.42,black:.2,ctrl:P(t,{x:770,y:914,s:.6,dark:t<56.80?.93:.93*(1-eout((t-56.80)/.6)),lid:.25,smile:-.1,brow:.3},7)});
  if(t>=58.59&&t<60.2){const k=(t-58.59)/1.6;el('path',{d:'M-40 0 L0 -40 L40 0 L0 40Z',fill:'#fff',opacity:Math.sin(k*Math.PI),transform:`translate(640 520) scale(${.8+.4*Math.sin(t*8)})`},FX());}
  if(t>=60.22){const k=cl((t-60.3)/.8);el('rect',{x:-200+k*1500,y:0,width:120,height:1920,fill:'#fff',opacity:.18,transform:'skewX(-20)'},FX());}}],
// ---- 62.69 supplies on one seat ----
[62.69,SE,(t)=>{cam(SE.cam,t,540,kf(t,[[62.69,900],[70.4,950]]),kf(t,[[62.69,1.0],[70.4,1.08]]));
  const arr=eout((t-63.48)/.5);const bump=(k,i,d)=>Math.max(arr,0)*(t>=k+i*d&&t<k+i*d+.25?1+.25*Math.sin((t-k-i*d)/.25*Math.PI):1);
  seat(t,{grade:.42,bot:[0,1,2,3,4,5].map(i=>bump(65.28,i,.19)),cake:[0,1,2,3].map(i=>bump(67.11,i,.17)),bag:bump(68.51,0,0)});
  if(t<65.28)fxBigNum('',t,99);else if(t<67.11)fxBigNum(6,t,65.28);else if(t<68.51)fxBigNum(4,t,67.11);}],
// ---- 70.43 body needs 2-3 L/day ----
[70.43,IG,(t)=>{cam(IG.cam,t,540,900,1);igClear();const g=igG;const s=popS(t,70.43,.3);
  const b=el('g',{transform:`translate(290 860) scale(${s})`},g);
  el('circle',{cx:0,cy:-300,r:95,fill:'#3a4c7a',stroke:'#17120f','stroke-width':8},b);el('path',{d:'M-110 -180 Q0 -215 110 -180 L130 150 L60 150 L50 380 L-50 380 L-60 150 L-130 150Z',fill:'#3a4c7a',stroke:'#17120f','stroke-width':8},b);
  el('path',{d:'M-80 -120 Q0 -140 80 -120 L95 120 L-95 120Z',fill:'#5fb5e8',opacity:.5},b);
  const bx=[620,780,940];bx.forEach((x,i)=>{const k=i<2?popS(t,71.92+i*.1):popS(t,72.54);if(k<=0)return;const bb=el('g',{transform:`translate(${x} 900) scale(${k*1.1})`},g);
    el('rect',{class:'o',x:-55,y:-300,width:110,height:300,rx:28,fill:'url(#bottle)','stroke-dasharray':i==2?'18 12':''},bb);el('rect',{x:-48,y:-200,width:96,height:200,rx:22,fill:'#5fb5e8',opacity:i==2?.25:.6},bb);el('rect',{class:'o',x:-30,y:-340,width:60,height:44,rx:8,fill:'#2f7dd1'},bb);
    if(t>=73.02)txt(bb,0,-110,64,'1L','#fff',{direction:'ltr',stroke:'#17120f','stroke-width':8,'paint-order':'stroke'});});
  if(t>=73.73){const k=popS(t,73.73);const su=el('g',{transform:`translate(780 470) scale(${k})`},g);for(let i=0;i<12;i++){const q=i*Math.PI/6;el('path',{d:`M${Math.cos(q)*90} ${Math.sin(q)*90} L${Math.cos(q)*130} ${Math.sin(q)*130}`,stroke:'#ffd166','stroke-width':12,'stroke-linecap':'round'},su);}el('circle',{r:70,fill:'#ffd166',stroke:'#17120f','stroke-width':6},su);}}],
// ---- 75.13 this water won't last ----
[75.13,SE,(t)=>{cam(SE.cam,t,540,920,kf(t,[[75.13,1.05],[77.67,1.15]]));const lv=lerp(1,.35,eout((t-75.47)/(76.36-75.47)));
  seat(t,{grade:.5,bot:[1,1,1,1,1,1],lvl:[lv,lv,lv,lv,lv,lv],cake:[1,1,1,1],bag:1});
  if(t>=75.75){const k=popS(t,75.75);const hg=el('g',{transform:`translate(540 420) scale(${k})`},FX());el('path',{d:'M-70 -90 L70 -90 L8 0 L70 90 L-70 90 L-8 0Z',fill:'#e8eef7',stroke:'#17120f','stroke-width':7},hg);
    const sk=cl((t-75.75)/1.6);el('path',{d:`M${-50*(1-sk)} ${-72+sk*60} L${50*(1-sk)} ${-72+sk*60} L3 -4 L-3 -4Z`,fill:'#f6c85f'},hg);el('path',{d:`M-60 84 L60 84 L0 ${84-sk*50}Z`,fill:'#f6c85f'},hg);}}],
// ---- 77.67 conductor: water for the mouth only ----
[77.67,WG,(t)=>{cam(WG.cam,t,540,1020,kf(t,[[77.67,1.0],[83.13,1.12]]));
  const lH=kf(t,[[77.67,[-120,250]],[77.8,[-120,250]],[78.4,[-150,90]],[79.16,[-150,90]],[79.5,[-160,-60]],[80.02,[-160,-60]],[80.35,[-150,15]],[80.9,[-150,15]],[81.3,[-140,60]],[83.2,[-140,60]]]);
  const rH=kf(t,[[77.67,[110,250]],[81.3,[110,250]],[81.55,[150,-120]],[82.1,[150,-120]],[82.6,[110,250]]]);const wag=t>81.55&&t<82.1?Math.sin((t-81.55)*22)*22:0;
  wagon(t,{grade:.42,ctrl:P(t,{x:540,y:1000,s:1.55,l:lH,litem:'bottle',lirot:kf(t,[[80.0,0],[80.35,50],[80.9,50],[81.3,0]]),r:[rH[0]+wag,rH[1]],rpoint:t>81.4&&t<82.4,
    hrot:(t>81.43&&t<82.1?Math.sin((t-81.43)*16)*7:0)+kf(t,[[77.67,0],[78.4,-4],[79.2,0]]),lid:kf(t,[[77,.28],[81.4,.28],[81.5,.12],[82.5,.12],[83,.28]]),brow:kf(t,[[77,.3],[79,.6],[81.4,1],[83,.9]]),
    mouth:t>=79.1&&t<82.15?talk(t):0,smile:-.6},0)});}],
// ---- 83.13 first line on the glass ----
[83.13,GL,(t)=>{cam(GL.cam,t,540,kf(t,[[83.13,960],[84.9,960],[85.4,980]]),kf(t,[[83.13,1.0],[84.9,1.0],[85.4,1.2],[87.37,1.24]]));
  const [a,b]=markPos(0);const dk=cl((t-85.33)/(85.89-85.33));
  const tip=[lerp(a[0],b[0],eout(dk)),lerp(a[1],b[1],eout(dk))];
  const rH=t<84.91?kf(t,[[83.13,[110,250]],[83.55,[46,135]],[83.8,[46,135]],[84.3,[150,-40]],[84.91,[150,-40]]]):t<85.33?kf(t,[[84.91,[150,-40]],[85.33,penHand(...a)]]):t<85.89?penHand(...tip):kf(t,[[85.89,penHand(...b)],[86.4,penHand(...b)],[87.0,[120,180]]]);
  glass(t,{grade:.3,n:0,drawK:t>=85.33?eout(dk):-1,ctrl:P(t,{x:540,y:1080,s:1.35,r:rH,rbend:-1,ritem:t>83.75?'pen':'',rirot:kf(t,[[84,0],[84.3,-20],[85.1,-20],[85.33,0]]),
    ex:kf(t,[[83.1,0],[83.5,.5],[84.3,.7],[84.9,.2],[85.3,.4]]),ey:kf(t,[[83.1,0],[83.5,.8],[84.1,.6],[84.4,-.3],[85.3,.2],[85.9,.6]]),lid:.22,brow:.5,hrot:kf(t,[[83.1,0],[83.6,6],[84.3,-3],[85.3,0]]),smile:-.4},1)});}],
// ---- 87.37 driver's broken voice ----
[87.37,IC,(t)=>{const s=kf(t,[[87.37,1.0],[88.4,1.18],[92.25,1.3]]);cam(IC.cam,t,540,kf(t,[[87.37,900],[88.4,720]]),s,t>88.61&&t<90.14?7:0);
  const lu=kf(t,[[87.37,0],[87.8,1]]);let led=0;if(t>=88.61&&t<90.14)led=(Math.floor(t*14)%3)?1:.15;if(t>=90.14)led=1;
  const voice=t>=91.04?talk(t):(t>=88.61&&t<90.14?.25+.25*Math.abs(Math.sin(t*31)):0);
  intercom(t,{grade:.32,led,voice,stat:(t>=88.61&&t<90.14)?.5:(t>=91&&Math.floor(t*9)%4===0)?.35:0,
    you:P(t,{x:290,y:1700,s:1.0,ex:.2,ey:-lu,hrot:-8*lu,hdy:-6*lu,lid:.05,browUp:1,brow:-.6,smile:-.3},2),ctrl:P(t,{x:800,y:1720,s:1.0,ex:-.3,ey:-lu,hrot:8*lu,lid:.15,browUp:.6,brow:-.2,smile:-.5},3)});}],
[92.25,AI,(t)=>{cam(AI.cam,t,540,kf(t,[[92.25,900],[92.98,820]]),kf(t,[[92.25,1.5],[92.98,1.75]]));aisle(t,{grade:.5});
  el('rect',{x:0,y:0,width:1080,height:1920,fill:'#ff2a1a',opacity:.12+.06*Math.sin(t*12),style:'mix-blend-mode:multiply'},FX());
  if(Math.floor(t*9)%4===0)el('rect',{x:0,y:900+Math.sin(t*50)*300,width:1080,height:8,fill:'#fff',opacity:.3},FX());}],
[92.98,IC,(t)=>{cam(IC.cam,t,540,720,kf(t,[[92.98,1.3],[94.07,1.34]]),t<93.35?16:0);const led=t<93.3?Math.floor(t*30)%2:0;
  intercom(t,{grade:.32,led,stat:t<93.4?1:0,you:P(t,{x:290,y:1700,s:1.0,ey:-1,hrot:-8,lid:.05,browUp:1,brow:-.6,smile:-.3},2),ctrl:P(t,{x:800,y:1720,s:1.0,ey:-1,hrot:8,lid:.15,browUp:.6,brow:-.2,smile:-.5},3)});}],
[94.07,WG,(t)=>{cam(WG.cam,t,540,kf(t,[[94.07,980],[95.96,960]]),kf(t,[[94.07,1.05],[95.96,1.12]]));const tu=kf(t,[[94.07,0],[94.5,1]]);
  wagon(t,{grade:.48,you:P(t,{x:300,y:1080,s:1.15,ex:.8*tu,ey:.1,hrot:5*tu,lid:.1,browUp:.8,brow:-.8,smile:-.6},4),ctrl:P(t,{x:790,y:1080,s:1.15,ex:-.8*tu,ey:.1,hrot:-5*tu,lid:.15,browUp:.5,brow:-.5,smile:-.7},5)});
  $('flash').setAttribute('opacity',1-eout((t-94.07)/.25));}],
[95.96,DC,(t)=>{cam(DC.cam,t,540,960,kf(t,[[95.96,1],[97.79,1.05]]));dayCard(t,95.96,5);}],
// ---- 97.79 the knocks return, always three, same hour ----
[97.79,AI,(t)=>{cam(AI.cam,t,540,kf(t,[[97.79,820],[103.5,840]]),kf(t,[[97.79,1.7],[103.5,1.9]]));aisle(t,{grade:.5,sil:.8,knocks:[97.80,98.05,98.30]});
  if(t>=99.61)fxDots(540,330,3,t,[99.89,99.97,100.05]);
  if(t>=101.86){const s=popS(t,101.86);const c=fxClock(540,1650,110*s+.01,Math.PI*2*.92);}}],
// ---- 103.50 conductor whispers ----
[103.50,WG,(t)=>{cam(WG.cam,t,540,kf(t,[[103.5,960],[107.9,880]]),kf(t,[[103.5,1.2],[105.6,1.45],[107.9,1.5]]));
  const lH=t<104.23?kf(t,[[103.5,[-120,250]],[104.23,[-120,250]]]):kf(t,[[104.23,[-120,250]],[104.6,[-60,-40]],[106.7,[-60,-40]],[107.2,[-120,250]]]);
  wagon(t,{grade:.55,ctrl:P(t,{x:540,y:1040,s:1.4,lean:kf(t,[[103.5,0],[104.5,6]]),hdx:kf(t,[[103.5,0],[104.5,25]]),l:lH,lrot:-30,ex:kf(t,[[103.5,0],[104.4,-.7],[105.5,-.7],[105.7,0]]),lid:.35,brow:.8,mouth:t>=105.6&&t<106.65?talk(t)*.6:0,mw:.7,smile:-.5},8)});}],
// ---- 107.90 whoever knocks still has a mind ----
[107.90,AI,(t)=>{cam(AI.cam,t,540,820,kf(t,[[107.9,1.6],[110.9,1.75]]));aisle(t,{grade:.5,sil:.85});
  if(t>=109.56){const k=popS(t,109.56,.3);aiBrain.setAttribute('opacity',1);place(aiBrain,540,680,k*.8);}}],
// ---- 110.97 so why doesn't he speak? ----
[110.97,WG,(t)=>{cam(WG.cam,t,540,820,kf(t,[[110.97,1.55],[113.4,1.65]]));
  wagon(t,{grade:.55,you:P(t,{x:540,y:1060,s:1.15,hrot:kf(t,[[110.97,0],[111.5,-8]]),ex:-.4,ey:-.3,lid:.2,browUp:.6,brow:-.2,smile:-.3,r:[60,-60],rbend:-1},9)});
  if(t>=111.34){const k=popS(t,111.34);wgQ.setAttribute('opacity',1);wgQ.setAttribute('transform',`translate(780 700) scale(${k})`);}}],
// ---- 113.43 every night he feels closer ----
[113.43,AI,(t)=>{const s=kf(t,[[113.43,1.4],[115.53,1.7],[117.59,2.1]]);cam(AI.cam,t,540,820,s);aisle(t,{grade:.5,black:.1,sil:.9,silS:kf(t,[[113.43,1.0],[115.53,1.05],[116.0,1.35]])});}],
// ---- 117.59 battery 18% ----
[117.59,PH,(t)=>{cam(PH.cam,t,540,1000,kf(t,[[117.59,1.0],[120.07,1.06]]));const bv=t<118.72?40:lerp(40,18,eout((t-118.72)/.3));
  phoneShot(t,{grade:.6,bars:0,noSig:true,batt:bv,battBig:popS(t,117.7),bbv:bv,bbTxt:Math.round(bv)+'%'});}],
[120.07,PH,(t)=>{cam(PH.cam,t,540,1000,kf(t,[[120.07,1.06],[124.5,1.1]]));
  const pl=t<121.67;phoneShot(t,{grade:.6,bars:0,noSig:!pl||t<120.75,plane:t>=120.75,batt:t<123.1?18:lerp(18,15,cl((t-123.1)/.8)),planeBig:pl?popS(t,120.07):0,toggle:pl&&t>=120.53?1:0,tk:eout((t-120.75)/.2),
    search:!pl&&t<123.1?1:0,drain:t>=123.1?popS(t,123.1):0});}],
// ---- 124.63 five minutes a night to see the time ----
[124.63,PH,(t)=>{cam(PH.cam,t,540,1000,kf(t,[[124.63,1.0],[128.1,1.05]]));
  phoneShot(t,{grade:.7,on:eout((t-124.65)/.25),plane:true,bars:0,batt:15,timer:t>=125.26&&t<126.75?popS(t,125.26):0,tArc:cl((t-125.4)/1.3),tTxt:t<125.9?'5:00':'4:59',clock:t>=126.75?'03:40':'',moon:t>=125.86&&t<126.75?eout((t-125.86)/.2):0});}],
// ---- 128.14 heavy breathing ----
[128.14,WG,(t)=>{cam(WG.cam,t,540,980,kf(t,[[128.14,1.05],[129.85,1.15]]));const br=(Math.sin((t-128.14)*2*Math.PI/1.4)+1)/2;
  wagon(t,{grade:.62,you:P(t,{x:300,y:1080,s:1.15,hdy:-br*12,lid:.45,brow:-.5,browUp:.3,mouth:.15+br*.25,mw:.7,smile:-.5,l:[-120,250-br*14],r:[120,250-br*14]},4),ctrl:P(t,{x:790,y:1080,s:1.15,hdy:-(1-br)*12,lid:.5,brow:-.3,mouth:.12+(1-br)*.22,mw:.7,smile:-.5,l:[-120,250-(1-br)*14],r:[120,250-(1-br)*14]},5)});}],
[129.85,SE,(t)=>{cam(SE.cam,t,540,920,1.08);const gone=i=>i<2?1:1-eout((t-130.16-(5-i)*.12)/.2);seat(t,{grade:.55,bot:[0,1,2,3,4,5].map(gone),lvl:[.6,.5,.4,.4,.4,.4],cake:[1,1,0,0],bag:1});}],
// ---- 131.37 five lines ----
[131.37,GL,(t)=>{cam(GL.cam,t,560,1020,1.25);const dk=cl((t-132.40)/.35);glass(t,{grade:.35,n:t<132.75?4:5,drawK:t>=132.40&&t<132.75?eout(dk):-1,num:popS(t,132.70),numTxt:'5'});}],
[133.91,DC,(t)=>{cam(DC.cam,t,540,960,kf(t,[[133.91,1],[135.5,1.05]]));dayCard(t,133.91,9);}],
// ---- 135.50 last bottle empty ----
[135.50,SE,(t)=>{cam(SE.cam,t,180,800,kf(t,[[135.5,1.6],[137.49,1.75]]));const lv=t<136.0?.25:lerp(.25,0,eout((t-136.0)/.6));
  seat(t,{grade:.6,bot:[t>=135.74&&t<136.0?1.12:1,0,0,0,0,0],lvl:[lv,0,0,0,0,0],cake:[0,0,0,0],bag:0});
  if(t>=136.35){fxDrop(540,1600,popS(t,136.35)*.9,1-cl((t-136.9)/.5));}}],
// ---- 137.49 in the dark, a drop ----
[137.49,WG,(t)=>{cam(WG.cam,t,540,820,kf(t,[[137.49,1.55],[140.3,1.7]]));
  wagon(t,{grade:.62,black:.35,you:P(t,{x:540,y:1060,s:1.15,ex:t<138.56?0:-.9,ey:-.1,hrot:t<138.56?0:-6,lid:.05,browUp:.8,brow:-.3,smile:-.3,l:t<138.56?[-110,250]:[-170,-110]},6)});
  if(t>=138.92){const k=t-138.92;if(k<.3)fxDrop(860,lerp(300,1100,k/.3),.8);else{const r=(k-.3)*500;el('ellipse',{cx:860,cy:1120,rx:r,ry:r*.2,fill:'none',stroke:'#bfe6ff','stroke-width':6,opacity:Math.max(0,1-(k-.3)/1)},FX());}}}],
[140.31,DR,(t)=>{cam(DR.cam,t,540,kf(t,[[140.31,800],[142.3,900]]),kf(t,[[140.31,1.0],[142.3,1.1]]));drip(t,{grade:.45,drops:[140.35,141.2,141.9],streams:[{x:300,t:140.8},{x:780,t:141.2}]});}],
// ---- 142.34 first-aid box, purification tablets ----
[142.34,PR,(t)=>{cam(PR.cam,t,540,920,kf(t,[[142.34,1.0],[145.6,1.12]]));props(t,{grade:.35});const g=prG;const s=popS(t,142.34,.3);
  const bx=el('g',{transform:`translate(540 1000) scale(${s})`},g);
  el('rect',{class:'o',x:-260,y:-170,width:520,height:320,rx:30,fill:'#f4f4f6'},bx);el('rect',{x:-260,y:-170,width:520,height:40,fill:'#dfe3ea'},bx);
  el('path',{d:'M-30 -100 L30 -100 L30 -40 L90 -40 L90 20 L30 20 L30 80 L-30 80 L-30 20 L-90 20 L-90 -40 L-30 -40Z',fill:'#e53935'},bx);
  const lid=eout((t-142.91)/.4);el('rect',{class:'o',x:-270,y:-200,width:540,height:60,rx:20,fill:'#e9ebf0',opacity:1-lid,transform:`translate(${-lid*80} ${-lid*260}) rotate(${-lid*14} -270 -170)`},bx);
  if(t>=143.89){const k=popS(t,143.89);const bl=el('g',{transform:`translate(540 640) scale(${k})`},g);el('rect',{class:'o',x:-200,y:-90,width:400,height:180,rx:24,fill:'#cfd8e6'},bl);
    for(let i=0;i<4;i++){el('ellipse',{cx:-140+i*93,cy:0,rx:36,ry:28,fill:'#fff',stroke:'#17120f','stroke-width':4},bl);el('path',{d:`M${-152+i*93} 0 L${-128+i*93} 0`,stroke:'#9aa3b5','stroke-width':4},bl);}}
  if(t>=144.41){fxDrop(860,420,popS(t,144.41)*1.2);}}],
// ---- 145.68 30 min to make water drinkable ----
[145.68,IG,(t)=>{cam(IG.cam,t,540,900,1);igClear();const g=igG;
  const bb=el('g',{transform:'translate(330 1000)'},g);el('rect',{class:'o',x:-110,y:-460,width:220,height:460,rx:50,fill:'url(#bottle)'},bb);el('rect',{x:-100,y:-300,width:200,height:300,rx:44,fill:t<148.25?'#9db88a':'#5fb5e8',opacity:.65},bb);el('rect',{class:'o',x:-55,y:-520,width:110,height:66,rx:12,fill:'#2f7dd1'},bb);
  const pk=cl((t-145.68)/.5);if(t<146.3)el('ellipse',{cx:0,cy:lerp(-620,-180,pk*pk),rx:30,ry:20,fill:'#fff',stroke:'#17120f','stroke-width':4},bb);
  if(t>=146.18&&t<148.25)for(let i=0;i<10;i++){const ph=((t*1.3+i*.13)%1);el('circle',{cx:-60+((i*37)%120),cy:-40-ph*240,r:6+(i%3)*3,fill:'#fff',opacity:.7*(1-ph)},bb);}
  if(t>=146.96){const k=popS(t,146.96);const c=el('g',{transform:`translate(760 720) scale(${k})`},g);el('circle',{r:170,fill:'#0f1320',stroke:'#2a3350','stroke-width':24},c);
    const a=cl((t-147.1)/1.1)*Math.PI;el('path',{d:arcPath(170,Math.max(.01,a)),fill:'none',stroke:'#ffd166','stroke-width':24,'stroke-linecap':'round'},c);txt(c,0,30,90,'30','#fff',{direction:'ltr'});txt(c,0,100,40,'min','#9aa3b5',{direction:'ltr'});}
  if(t>=148.25){const k=popS(t,148.25);const ck=el('g',{transform:`translate(330 360) scale(${k})`},g);el('circle',{r:90,fill:'#2ecc71',stroke:'#17120f','stroke-width':8},ck);el('path',{d:'M-40 0 L-10 32 L45 -30',stroke:'#fff','stroke-width':20,fill:'none','stroke-linecap':'round','stroke-linejoin':'round'},ck);}}],
// ---- 149.74 they wait half an hour, eyes on the bottle ----
[149.74,WG,(t)=>{cam(WG.cam,t,540,kf(t,[[149.74,1000],[151.45,1060]]),kf(t,[[149.74,1.05],[151.45,1.2],[153.2,1.25]]));const look=eout((t-151.45)/.3);
  wagon(t,{grade:.6,you:P(t,{x:300,y:1080,s:1.15,ex:.5,ey:.2+.7*look,lid:.2,brow:-.4,smile:-.4,r:[150,120]},4),ctrl:P(t,{x:790,y:1080,s:1.15,ex:-.5,ey:.2+.7*look,lid:.3,brow:-.3,smile:-.4,l:[-150,120],litem:'bottle'},5)});
  const a=(t-149.74)*Math.PI*2*1.6;fxClock(540,420,120*popS(t,149.74),a);}],
// ---- 153.23 one sip each ----
[153.23,WG,(t)=>{cam(WG.cam,t,540,980,1.12);const youHas=t<153.95;
  wagon(t,{grade:.6,you:P(t,{x:300,y:1080,s:1.15,l:youHas?kf(t,[[153.23,[-120,200]],[153.45,[-80,-20]],[153.9,[-80,-20]]]):[-120,250],litem:youHas?'bottle':'',lirot:youHas?kf(t,[[153.23,0],[153.45,60]]):0,lid:t>153.45&&t<153.9?.8:.3,brow:-.2,smile:-.2},4),
    ctrl:P(t,{x:790,y:1080,s:1.15,r:!youHas?kf(t,[[153.95,[140,200]],[154.18,[80,-20]],[154.57,[80,-20]],[154.9,[140,200]]]):[110,250],ritem:!youHas?'bottle':'',rirot:!youHas?kf(t,[[153.95,0],[154.18,-60],[154.57,-60],[154.9,0]]):0,lid:t>154.18&&t<154.57?.8:.3,brow:-.2,smile:-.3},5)});}],
// ---- 155.48 ninth line, trembling hand ----
[155.48,GL,(t)=>{const close=t>=157.47;cam(GL.cam,t,close?640:540,close?kf(t,[[157.47,960],[157.9,1000]]):980,close?kf(t,[[157.47,1.25],[157.9,1.9]]):1.2);
  const [a,b]=markPos(8);const dk=cl((t-156.14)/(157.1-156.14));const tr=t>=156.14?Math.sin(t*70)*(t>157.47?9:4):0;const tip=[lerp(a[0],b[0],eout(dk))+tr,lerp(a[1],b[1],eout(dk))];
  const rH=t<156.14?kf(t,[[155.48,[110,250]],[156.14,penHand(...a)]]):t<157.1?penHand(...tip):[penHand(...b)[0]+tr/1.35,penHand(...b)[1]];
  glass(t,{grade:.35,n:8,drawK:eout(dk),tremble:true,ctrl:P(t,{x:540,y:1080,s:1.35,r:rH,rbend:-1,ritem:'pen',ex:.4,ey:.5,lid:.45,brow:-.6,browUp:.3,smile:-.6},1)});}],
// ---- 159.14 a light breeze from ahead ----
[159.14,WG,(t)=>{cam(WG.cam,t,540,820,kf(t,[[159.14,1.5],[162.8,1.6]]));const wk=eout((t-160.43)/.4);
  wagon(t,{grade:.58,you:P(t,{x:540,y:1060,s:1.15,hdx:Math.sin(t*3)*4*wk,ex:t<161.58?-.2:-.9,ey:-.1,hrot:t<161.58?0:-8,lid:t<160.11?.4:.05,browUp:.8*wk,brow:-.2,smile:-.1},9)});
  if(t>=160.43)fxWind(t,wk,600,-1);}],
// ---- 162.81 wind always comes from an opening ----
[162.81,IG,(t)=>{cam(IG.cam,t,540,900,1);igClear();const g=igG;const s=popS(t,162.81,.3);
  const m=el('g',{transform:`translate(540 860) scale(${s})`},g);
  el('path',{d:'M-470 -120 L470 -120 L470 120 L-470 120Z',fill:'#2a2622',stroke:'#17120f','stroke-width':10},m);el('path',{d:'M-470 -80 L470 -80 L470 80 L-470 80Z',fill:'#0d0c0b'},m);
  const tr=el('g',{transform:'translate(-180 20)'},m);el('rect',{class:'o',x:-150,y:-50,width:300,height:90,rx:20,fill:'#d8dde6'},tr);for(let i=0;i<4;i++)el('rect',{x:-130+i*70,y:-35,width:50,height:34,rx:6,fill:'#2b3a73'},tr);
  if(t>=164.78){const k=popS(t,164.78);el('circle',{cx:470,cy:0,r:110*k,fill:'url(#dawnGlow)'},m);}
  if(t>=163.63){for(let i=0;i<6;i++){const ph=((t*.8+i/6)%1);const x=440-ph*560;el('path',{d:`M${x} ${-40+((i*29)%80)} l-60 0 m14 -12 l-14 12 l14 12`,stroke:'#9fd4ff','stroke-width':8,fill:'none',opacity:Math.sin(ph*Math.PI),'stroke-linecap':'round'},m);}}}],
[165.93,DC,(t)=>{cam(DC.cam,t,540,960,kf(t,[[165.93,1],[167.48,1.05]]));dayCard(t,165.93,14);}],
// ---- 167.48 fourteen lines ----
[167.48,GL,(t)=>{cam(GL.cam,t,kf(t,[[167.48,600],[169.9,480]]),1020,kf(t,[[167.48,1.25],[169.9,1.15]]));const dk=cl((t-168.25)/.3);glass(t,{grade:.35,n:t<168.55?13:14,drawK:t>=168.25&&t<168.55?eout(dk):-1,num:popS(t,168.51),numTxt:'14'});}],
// ---- 169.99 three knocks ----
[169.99,AI,(t)=>{cam(AI.cam,t,540,820,kf(t,[[169.99,1.7],[171.3,1.8]]));aisle(t,{grade:.5,sil:.85,knocks:[170.0,170.3,170.55]});fxDots(540,330,3,t,[170.0,170.3,170.55]);}],
// ---- 171.30 this time the conductor answers with three ----
[171.30,AI,(t)=>{cam(AI.cam,t,640,kf(t,[[171.3,900],[172.4,860]]),kf(t,[[171.3,1.35],[172.4,1.7]]));
  const kt=[172.55,172.80,173.05];let hit=-1;kt.forEach((k,i)=>{if(t>=k-.12&&t<k+.12)hit=i;});
  const near=[-170,-110],back=[-130,-60];const lH=t<172.3?kf(t,[[171.3,[-110,250]],[172.3,back]]):(hit>=0&&Math.abs(t-kt[hit])<.06?near:back);
  aisle(t,{grade:.45,sil:.7,ctrl:P(t,{x:770,y:914,s:.6,l:lH,ex:-.8,ey:-.2,lid:.2,brow:.6,smile:-.4},7)});
  kt.forEach(k=>{if(t>=k&&t<k+.7){const b=el('g',{transform:`translate(668 848) scale(${.35*popS(t,k)})`,opacity:1-(t-k)/.7},aiFx);burst(b,1,'#4fc3ff');}});
  if(t>=172.67)fxDots(540,330,3,t,kt,'#4fc3ff');}],
// ---- 173.99 your heart pounds ----
[173.99,WG,(t)=>{cam(WG.cam,t,540,kf(t,[[173.99,900],[176.2,960]]),kf(t,[[173.99,1.4],[176.2,1.5]]));
  wagon(t,{grade:.58,you:P(t,{x:540,y:1060,s:1.15,lid:0,browUp:1,brow:-.7,mouth:.15,mw:.6,smile:-.4,l:[-60,140],r:[60,140]},6)});
  if(t>=174.30){const ph=((t-174.30)*3.2)%1;const b=1+.25*Math.exp(-ph*8);wgHeart.setAttribute('opacity',1);wgHeart.setAttribute('transform',`translate(540 1180) scale(${b*1.3})`);}}],
// ---- 176.27 the rear door opens slowly ----
[176.27,AI,(t)=>{cam(AI.cam,t,540,kf(t,[[176.27,1000],[178.99,920]]),kf(t,[[176.27,1.1],[178.99,1.35]]));const op=eout((t-176.4)/(178.11-176.4));
  aisle(t,{grade:.48,open:op,ctrl:P(t,{x:770,y:914,s:.6,ex:-.8,lid:.1,browUp:.8,brow:-.4,smile:-.5},7),girl:P(t,{x:540,y:1250-560*.48,s:.48,dark:.95},10),
    you:P(t,{x:200,y:1560,s:1.45,ex:.8,ey:-.2,hrot:8,lid:.05,browUp:1,brow:-.6,smile:-.5},5)});}],
[178.99,AI,(t)=>{cam(AI.cam,t,540,930,kf(t,[[178.99,1.5],[180.5,1.6]]));aisle(t,{grade:.48,open:1,girl:P(t,{x:540,y:1250-560*.48,s:.48,dark:.95},10)});
  const k=popS(t,178.99,.3);aiZ.setAttribute('opacity',1);place(aiZ,540,880,k*.9);}],
// ---- 180.53 a little girl with the driver's radio ----
[180.53,AI,(t)=>{const z=t<181.6?kf(t,[[180.53,1.6],[181.3,2.2]]):kf(t,[[181.6,2.2],[182.2,2.9]]);cam(AI.cam,t,t<181.6?540:600,t<181.6?kf(t,[[180.53,930],[181.3,960]]):kf(t,[[181.6,960],[182.2,1040]]),z);
  aisle(t,{grade:.4,open:1,doorLight:.6,girl:P(t,{x:540,y:1250-560*.48,s:.48,dark:.95*(1-eout((t-180.6)/.5)),lid:.5,brow:-.3,smile:-.3,r:[90,110],ritem:t>=181.6?'radio':'',ex:0,ey:.2,dust:.6},10)});
  if(t>=181.94){const k=(Math.floor(t*4)%2);el('circle',{cx:540+(90+22)*.48,cy:1250-560*.48+(110+10)*.48,r:22,fill:'url(#glow)',opacity:k},aiFx);}}],
// ---- 184.01 tired eyes, dusty face ----
[184.01,WG,(t)=>{cam(WG.cam,t,540,kf(t,[[184.01,880],[187.0,840]]),kf(t,[[184.01,1.45],[187.0,1.65]]));
  wagon(t,{grade:.5,girl:P(t,{x:540,y:1080,s:1.15,lid:t<184.35?.3:lerp(.3,.6,eout((t-184.35)/.4)),brow:-.4,browUp:.4,smile:-.3,dust:t<185.81?.35:lerp(.35,1,eout((t-185.81)/.3)),r:[100,160],ritem:'radio'},10)});}],
// ---- 187.06 she speaks ----
[187.06,WG,(t)=>{cam(WG.cam,t,540,kf(t,[[187.06,960],[191.6,900]]),kf(t,[[187.06,1.25],[191.6,1.4]]));
  wagon(t,{grade:.5,you:P(t,{x:180,y:1150,s:.95,ex:.9,lid:.1,browUp:.7,brow:-.3,smile:-.2},4),ctrl:P(t,{x:900,y:1150,s:.95,ex:-.9,lid:.15,browUp:.5,smile:-.2},5),
    girl:P(t,{x:540,y:1120,s:1.0,lid:.5,brow:-.2,browUp:.3,smile:-.2,dust:1,mouth:t>=188.0&&t<190.85?talk(t):0,r:t<189.5?[100,160]:[150,-60],rbend:-1,rpoint:t>=190.44,l:[-100,150],litem:'radio'},10)});}],
// ---- 191.71 the broken message is now complete ----
[191.71,PR,(t)=>{cam(PR.cam,t,540,920,kf(t,[[191.71,1.0],[194.5,1.08]]));props(t,{grade:.3});const g=prG;
  const r=el('g',{transform:`translate(540 560) scale(${popS(t,191.71)*2.2})`},g);el('path',{class:'o','stroke-width':4,d:'M18 -60 L40 -140',fill:'none'},r);el('rect',{class:'o',x:-40,y:-70,width:80,height:100,rx:12,fill:'#3d4250'},r);for(let i=0;i<4;i++)el('rect',{x:-28,y:-56+i*14,width:56,height:6,rx:3,fill:'#1b1d24'},r);el('circle',{cx:22,cy:10,r:9,fill:'#ff3b30'},r);
  const jit=t<193.44?Math.sin(t*60)*5:0;
  const a=el('g',{transform:`translate(${540+jit} 960)`},g);el('rect',{x:-420,y:-60,width:840,height:110,rx:20,fill:'#f4f6fb'},a);txt(a,0,18,58,'ما تحلّيش الباب حتى','#1d2333');
  if(t<193.44)el('path',{d:'M-420 -60 L-380 -10 L-420 50',stroke:'#ff5a4e','stroke-width':6,fill:'none'},a);
  const k=eout((t-193.0)/.44);const b=el('g',{transform:`translate(${540-900*(1-k)} 1100)`,opacity:t>=193.0?1:0},g);el('rect',{x:-300,y:-60,width:600,height:110,rx:20,fill:t>=193.44?'#2ecc71':'#f4f6fb'},b);txt(b,0,18,58,'يجاوبوك بثلاثة',t>=193.44?'#fff':'#1d2333');}],
// ---- 194.54 she knocked every day, nobody answered ----
[194.54,AI,(t)=>{cam(AI.cam,t,560,kf(t,[[194.54,900],[197.8,940]]),kf(t,[[194.54,1.5],[197.8,1.6]]));
  const kt=[195.26,195.40,195.54];const hit=kt.some(k=>t>=k-.05&&t<k+.04);const sad=eout((t-196.13)/.6);
  aisle(t,{grade:.5+sad*.15,girl:P(t,{x:820,y:1000,s:.75,r:t<195.1||t>195.8?[100,200]:hit?[-200,-40]:[-150,-20],rbend:-1,lid:.4+sad*.35,hdy:sad*20,ey:sad*.8,brow:-.5,browUp:.3,smile:-.6,dust:1},10)});
  kt.forEach(k=>{if(t>=k&&t<k+.6){const b=el('g',{transform:`translate(${820-200*.75} ${1000-40*.75}) scale(${.35*popS(t,k)})`,opacity:1-(t-k)/.6},aiFx);burst(b,1);}});}],
// ---- 197.80 you take her hand ----
[197.80,PR,(t)=>{cam(PR.cam,t,540,905,kf(t,[[197.8,1.55],[200.4,1.65]]));props(t,{grade:.45});const g=prG;const k=eout((t-197.8)/.3);
  const bh=el('g',{transform:`translate(${lerp(-200,420,k)} 900)`},g);el('path',{d:'M-600 -40 L0 -50 L0 60 L-600 70Z',fill:'#56656a',stroke:'#17120f','stroke-width':8},bh);el('ellipse',{class:'o',cx:60,cy:5,rx:90,ry:70,fill:'url(#skinP)'},bh);
  const sh=el('g',{transform:`translate(${lerp(1280,640,k)} 920) scale(.7)`},g);el('path',{d:'M600 -40 L0 -50 L0 60 L600 70Z',fill:'#7b3f8f',stroke:'#17120f','stroke-width':10},sh);el('ellipse',{class:'o',cx:-60,cy:5,rx:90,ry:70,fill:'url(#skinC)'},sh);
  if(t>=198.11){el('circle',{cx:540,cy:910,r:200,fill:'url(#dawnGlow)',opacity:.35},g);}
  if(t>=198.91)fxWind(t,eout((t-198.91)/.4),500,-1);}],
// ---- 200.44 walking for hours in the dark ----
[200.44,WK,(t)=>{cam(WK.cam,t,540,960,kf(t,[[200.44,1.0],[205.2,1.08]]));tunnelPersp(t,{scroll:0});wkEnd.setAttribute('opacity',0);
  const wp=t*7;const dz=k=>1250+Math.sin(wp+k)*4;
  walk(t,{grade:.45,ctrl:P(t,{x:330,y:dz(0)-560*.7+300,s:.7,walk:wp,ex:-.2,lid:.4,brow:-.3,smile:-.3,l:[-110,240],r:[110,240]},3),you:P(t,{x:760,y:dz(1)-560*.7+300,s:.7,walk:wp+Math.PI,lid:.35,brow:-.3,smile:-.3,l:[-150,150]},4),girl:P(t,{x:610,y:dz(2)-560*.5+360,s:.5,walk:wp+1,lid:.5,dust:1,r:[150,150],ritem:'radio',smile:-.2},10),light:'M760 1100 L200 1900 L1300 1900Z'});
  tunnelPersp(t,{scroll:t*.8});
  if(t>=200.74&&t<201.6)fxClock(540,380,100*popS(t,200.74),(t-200.74)*14);}],
// ---- 203.53 a small light at the end ----
[203.53,WK,(t)=>{cam(WK.cam,t,540,900,kf(t,[[203.53,1.0],[208.29,1.25]]));tunnelPersp(t,{scroll:t*.6});vis(wkChars[0].root,false);vis(wkChars[1].root,false);vis(wkChars[2].root,false);
  const sk=t<205.59?0:t<207.02?.05*eout((t-205.59)/.4):lerp(.05,.32,eout((t-207.02)/1.2));wkEnd.setAttribute('opacity',t<205.59?0:1);wkDot.setAttribute('rx',14+sk*500);wkDot.setAttribute('ry',18+sk*620);
  wkGrade.setAttribute('opacity',.45);wkWarm.setAttribute('opacity',t>=207.02?eout((t-207.02)/1)*.6:0);wkLight.setAttribute('d','');wkWind.innerHTML='';}],
// ---- 208.29 out into the cold dawn ----
[208.29,TP,(t)=>{cam(TP.cam,t,540,kf(t,[[208.29,1100],[211.6,1250]]),kf(t,[[208.29,1.05],[211.6,1.3]]));vis(tpTrain,false);tpDawn.setAttribute('opacity',1);tpMoon.setAttribute('opacity',0);tpStars.setAttribute('opacity',0);tpSun.setAttribute('opacity',1);
  tpHill1.setAttribute('fill','#4a3550');tpHill2.setAttribute('fill','#5a4060');tpGrade.setAttribute('opacity',.05);tpWarm.setAttribute('opacity',.5);
  const p=eout((t-208.29)/(209.6-208.29));const cold=t>=209.68;const shv=cold?Math.sin(t*40)*3:0;
  [[0,'ctrl',-150],[1,'you',150],[2,'girl',0]].forEach(([i,k,dx])=>{const s=lerp(.18,.55,p)*(k==='girl'?.75:1);const y=lerp(1180,1560,p)-560*s;
    tpChars[i].update(P(t,{x:540+dx*lerp(.3,1.2,p),y,s,walk:t<209.6?t*7+i:undefined,hrot:shv,lid:cold?.6:.2,brow:-.3,smile:cold?-.5:0,dust:k==='girl'?1:0,ritem:k==='girl'?'radio':'',r:k==='girl'?[150,150]:[110,250]},i));vis(tpChars[i].root,true);});
  if(cold){fxWind(t,eout((t-209.68)/.3),500,1);const v=el('g',{opacity:.6},FX());for(let i=0;i<3;i++){const ph=((t*1.2+i/3)%1);el('circle',{cx:540+ (i-1)*230+ph*30,cy:1080-ph*60,r:16+ph*20,fill:'#eef6ff',opacity:.6*(1-ph)},v);}}}],
// ---- 211.66 the distant city is silent ----
[211.66,CT,(t)=>{cam(CT.cam,t,kf(t,[[211.66,420],[215.4,640]]),1100,kf(t,[[211.66,1.15],[215.4,1.25]]));ctChars.forEach(c=>vis(c.root,false));ctWarm.setAttribute('opacity',.35);ctBlack.setAttribute('opacity',.15);}],
// ---- 215.41 but you are three ----
[215.41,CT,(t)=>{cam(CT.cam,t,540,kf(t,[[215.41,1200],[217.14,1150]]),kf(t,[[215.41,1.0],[217.14,1.1]]));ctWarm.setAttribute('opacity',.45);ctBlack.setAttribute('opacity',.1);
  [[0,'ctrl',260,215.73],[1,'girl',540,215.85],[2,'you',820,216.0]].forEach(([i,k,x,tp])=>{const s=k==='girl'?.6:.8;const c=ctChars[[0,2,1][i]];vis(c.root,true);
    c.update(P(t,{x,y:1700-560*s,s,lid:.3,brow:-.1,smile:.1,dust:k==='girl'?1:0,ritem:k==='girl'?'radio':''},i));
    if(t>=tp){const q=popS(t,tp);el('circle',{cx:(x-540)*cmz(t)+540,cy:((1700-560*s-150*s)-cmy(t))*cmz(t)+960,r:30*q,fill:'#ffd166',opacity:.0},FX());}});}],
// ---- 217.14 and still alive ----
[217.14,CT,(t)=>{cam(CT.cam,t,540,kf(t,[[217.14,1020],[218.2,1000]]),kf(t,[[217.14,1.55],[218.2,1.65]]));ctWarm.setAttribute('opacity',.6);ctBlack.setAttribute('opacity',t<217.95?0:eout((t-217.95)/.2));
  const sm=eout((t-217.63)/.3);
  [[0,'ctrl',260],[1,'girl',540],[2,'you',820]].forEach(([i,k,x])=>{const s=k==='girl'?.6:.8;const c=ctChars[[0,2,1][i]];vis(c.root,true);c.update(P(t,{x,y:1700-560*s,s,lid:.25,brow:-.1+sm*.3,smile:.1+sm*.8,dust:k==='girl'?1:0,ritem:k==='girl'?'radio':''},i));});}],
];
function cmz(t){return 1;} function cmy(t){return 960;}
