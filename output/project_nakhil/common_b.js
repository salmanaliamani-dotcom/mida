// building shot helpers
function MED(t,kind,o,cam,at,fov=40){put(kind,o,t);C3(t,cam,at,fov);}
function CARD(t){setEnv('card');}
function lerp3(t,a,b,t0,t1,f=ease){const k=f(cl((t-t0)/(t1-t0)));return [a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k,a[2]+(b[2]-a[2])*k];}
const LX=200,EX=204,EV=400;
function seq(t,S){let v=S[0][1];for(const [a,b] of S)if(t>=a)v=b;return v;}
function dim(o=.5){el('rect',{width:1080,height:1920,fill:'#05070d',opacity:o},FX);}
function QB(n,line,bg){return (t)=>{bg(t);dim(.55);quizCard(t,T(line),n);};}
function CB(line,bg){return (t)=>{bg(t);dim(.55);ctaCard(t,T(line),T(line,'فولو'));};}
function AB(n,line,bg){return (t)=>{bg(t);if(t<T(line)+1.6){dim(.45*(1-cl((t-T(line)-1.2)/.4)));answerCard(t,T(line),n);}};}
function LOB(t,o={}){setEnv('lobby',o.tod||'interior');const U=ENVS.lobby.userData;doorSet(U.door,o.door||0);setDisp(o.disp??'0',o.on??1);U.cabL.intensity=(o.door||0)>.05?14:0;U.lampL.intensity=o.night?13:30;if(o.night)flt('brightness(.8) saturate(.8) hue-rotate(-10deg)');U.toy.visible=!!o.toy;U.gap.visible=(o.door||0)<.05;}
function CAB(t,o={}){setEnv('elev'+(o.beyond?'+'+o.beyond:''),o.tod||'interior');const U=ENVS.elev.userData;doorSet(U.door,o.door||0);setDisp(o.disp??'0',o.on??1);setBtn(o.btn??-1);U.cl.intensity=o.light??22;U.ceil.material.color.set((o.light??22)>8?'#fff6dc':'#3a3a30');}
function STREET(t,tod){setEnv('street',tod);const tx=ENVS.street.userData.taxi;tx.position.x=-70+((t*16)%160);}
function clk(t,t0,h,m,x=840,y=330,r=110){if(t>=t0)clockFace(FX,x,y,r*popS(t,t0),h,m);}
function shake(){return 0;}
function floorBadges(t,t0,n=12,dt=.09,hi=-1){for(let f=1;f<=n;f++){const tt=t0+(f-1)*dt;if(t<tt)continue;const [x,y]=project(-17.6,8+(f-1)*7+3.4,1);const g=G(FX,x-10,y,popS(t,tt));el('circle',{r:30,fill:f===hi?'#ff3b30':'#ffd166',stroke:'#17120f','stroke-width':4},g);txt(g,0,11,32,String(f),f===hi?'#fff':'#17120f');}}
function notes(t,x,y,n=3){for(let i=0;i<n;i++){const ph=(t*.6+i/n)%1;const g=G(FX,x+Math.sin(ph*6+i)*40,y-ph*260,1);txt(g,0,0,64,i%2?'♪':'♫','#ffe27a',{opacity:1-ph});}}

function paperSheet(t,t0,w=760,h=980,y=980,col='#efe2b8'){const k=popS(t,t0,.3);const g=G(FX,540,y,k);el('rect',{x:-w/2,y:-h/2,width:w,height:h,rx:12,fill:col,stroke:'#17120f','stroke-width':6},g);return g;}
function drawPlan(t,t0,o={}){const g=paperSheet(t,t0,720,1040,980,'#dfe8f2');el('rect',{x:-360,y:-520,width:720,height:1040,fill:'url(#none)',stroke:'#2f4a7a','stroke-width':3,opacity:.3},g);
 txt(g,0,-440,52,'عمارة النخيل — 1968','#2f4a7a');const fh=58,top=-380;for(let f=13;f>=1;f--){const y=top+(13-f)*fh;const on=o.count!==undefined&&(14-f)<=o.count;const hi=f===13&&o.hi13;
  el('rect',{x:-200,y,width:400,height:fh-6,fill:hi?'#ffcfc4':on?'#fff3c4':'#f4f7fb',stroke:'#2f4a7a','stroke-width':3},g);txt(g,-250,y+40,30,String(f),'#2f4a7a');
  if(f===13&&o.apts){for(let i=0;i<4;i++){const x=-200+i*100;const is37=o.apts>1&&i===2;el('rect',{x:x+6,y:y+6,width:88,height:fh-18,fill:is37?'#ff3b30':'#fff',stroke:'#2f4a7a','stroke-width':2},g);txt(g,x+50,y+38,26,String(35+i),is37?'#fff':'#2f4a7a');}}}
 el('rect',{x:-200,y:top+13*fh,width:400,height:40,fill:'#c9d4e2',stroke:'#2f4a7a','stroke-width':3},g);
 if(o.finger!==undefined){const y=top+(13-o.finger)*fh+20;const f=G(g,240,y,1);el('path',{d:'M0 0 L60 -14 L60 14 Z',fill:'#e3a878',stroke:'#17120f','stroke-width':4},f);el('rect',{x:60,y:-18,width:90,height:36,rx:14,fill:'#e3a878',stroke:'#17120f','stroke-width':4},f);}
 return g;}
function drawNews(t,t0,o={}){const g=paperSheet(t,t0,760,1000,1000,'#ece3cc');txt(g,0,-410,40,'الجريدة — 1971','#3a3a3a');el('rect',{x:-340,y:-380,width:680,height:6,fill:'#3a3a3a'},g);
 if(o.head){txt(g,0,-300,54,'حريق فعمارة النخيل','#17120f');txt(g,0,-230,46,'الطابق الثالث عشر','#b5241e');}
 el('rect',{x:-320,y:-180,width:300,height:220,fill:'#8a8378',stroke:'#3a3a3a','stroke-width':3},g);for(let i=0;i<6;i++)el('rect',{x:0,y:-170+i*36,width:320-(i%3)*40,height:12,fill:'#6a6458'},g);
 if(o.fam)txt(g,0,110,44,'عائلة كاملة فالشقة 37…','#17120f');
 el('path',{d:'M-380 200 L-300 230 L-220 190 L-140 240 L-60 200 L20 235 L100 195 L180 240 L260 200 L380 230 L380 500 L-380 500 Z',fill:'#05070d',opacity:o.torn?1:0},g);return g;}
function drawLedger(t,t0,n){const g=paperSheet(t,t0,760,1000,1000,'#f1ead6');txt(g,0,-420,46,'دفتر الصيانة — المصعد','#2a2a2a');const m=['يناير','فبراير','مارس','أبريل','ماي','يونيو','يوليوز','غشت'];
 for(let i=0;i<Math.min(8,n);i++){const y=-320+i*92;el('line',{x1:-340,y1:y+30,x2:340,y2:y+30,stroke:'#b8ad90','stroke-width':2},g);txt(g,250,y+10,30,m[i],'#5a4a3a');txt(g,-40,y+10,30,'صيانة المفتاح الخاص — خلّص: ب. الطاهر','#1a3a6a');}return g;}
function heartOv(t,x=540,y=420){const k=1+.18*Math.max(0,Math.sin(t*2*Math.PI/.62));const g=G(FX,x,y,k);el('path',{d:'M0 40 C -70 -10 -50 -80 0 -40 C 50 -80 70 -10 0 40 Z',fill:'#ff3b30',stroke:'#17120f','stroke-width':6,transform:'scale(1.6)'},g);}

function slit(w=260){for(const [x,ww] of [[0,540-w/2],[540+w/2,540-w/2]])el('rect',{x,y:0,width:ww,height:1920,fill:'#050403',opacity:.93},FX);}
function BURN(t,o={}){setEnv('burnt'+(o.apt?'+apt37':''),'dark');const U=ENVS.burnt.userData;U.d37.rotation.y=o.d37??0;U.yL.intensity=o.yl??8;U.strip.visible=(o.d37??0)<.1;if(o.flt!==false)flt(o.flt||'brightness(1.05)');}
function phoneOv(t,t0,name){const k=popS(t,t0);const g=G(FX,540,560,k);el('rect',{x:-130,y:-230,width:260,height:460,rx:36,fill:'#15171c',stroke:'#17120f','stroke-width':6},g);el('rect',{x:-110,y:-200,width:220,height:380,rx:16,fill:'#2ecc71'},g);txt(g,0,-60,52,name,'#fff');el('circle',{cy:90,r:44,fill:'#fff'},g);txt(g,0,110,50,'☎','#2ecc71');for(let i=1;i<=3;i++){const p=((t-t0)*1.5+i/3)%1;el('path',{d:`M${150+p*60} -60 q40 60 0 120`,stroke:'#fff','stroke-width':8,fill:'none',opacity:1-p},g);el('path',{d:`M${-150-p*60} -60 q-40 60 0 120`,stroke:'#fff','stroke-width':8,fill:'none',opacity:1-p},g);}}

function drawReport(t,t0,n){const g=paperSheet(t,t0,780,1060,1000,'#eef1f4');txt(g,0,-440,40,'الوقاية المدنية — تقرير الحريق','#1a3a6a');el('rect',{x:-350,y:-410,width:700,height:5,fill:'#1a3a6a'},g);
 const L=[['السبب: عطب كهربائي','#b5241e'],['فالبيت ديال المحرك ديال المصعد','#17120f'],['فوق الطابق 13','#17120f'],['النار بدات من سقف الممر','#b5241e'],['ومن تما دخلات للشقق','#17120f'],['الساعة: 00:20','#b5241e']];
 for(let i=0;i<Math.min(n,L.length);i++){const k=popS(t,t0+.2+i*.05);txt(g,0,-330+i*110,44,L[i][0],L[i][1],{opacity:k});}return g;}
function diagFire(t,t0){const g=G(FX,540,980,popS(t,t0));el('rect',{x:-200,y:-420,width:400,height:120,fill:'#5a5a62',stroke:'#17120f','stroke-width':6},g);txt(g,0,-350,36,'المحرك','#fff');
 for(let i=0;i<4;i++){el('rect',{x:-200,y:-300+i*170,width:400,height:160,fill:i===0?'#3a2a22':'#e9dcc0',stroke:'#17120f','stroke-width':5},g);}txt(g,-250,-210,40,'13','#ff3b30');
 const k=cl((t-t0-.6)/1.2);el('path',{d:`M0 -300 L0 ${-300+k*90}`,stroke:'#ff7a1a','stroke-width':14},g);if(k>.2){el('path',{d:'M-14 -330 L6 -360 L-4 -330 L14 -300',stroke:'#ffd166','stroke-width':8,fill:'none'},g);}if(k>=1){for(let i=0;i<3;i++)el('path',{d:`M${-150+i*150} -150 q-20 -60 0 -110 q20 50 0 110`,fill:'#ff7a1a',stroke:'#b5241e','stroke-width':4},g);}return g;}
