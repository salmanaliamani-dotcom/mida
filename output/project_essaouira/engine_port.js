// ================= ENGINE: hotel mystery =================
document.querySelector('defs').insertAdjacentHTML('beforeend',`
<radialGradient id="glowG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd76a" stop-opacity=".8"/><stop offset="1" stop-color="#ffd76a" stop-opacity="0"/></radialGradient>
<radialGradient id="fireG" cx=".5" cy=".7" r=".6"><stop offset="0" stop-color="#ffd27a"/><stop offset=".5" stop-color="#ff8a2a"/><stop offset="1" stop-color="#c2410c" stop-opacity="0"/></radialGradient>
<linearGradient id="wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a3218"/><stop offset=".45" stop-color="#8a5a32"/><stop offset="1" stop-color="#4a2812"/></linearGradient>
<linearGradient id="woodV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a4a26"/><stop offset="1" stop-color="#4a2812"/></linearGradient>
<linearGradient id="wallH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5a48"/><stop offset="1" stop-color="#5a3e30"/></linearGradient>
<linearGradient id="wallR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8b7a62"/><stop offset="1" stop-color="#6a5a46"/></linearGradient>
<linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1226"/><stop offset="1" stop-color="#2a3a5e"/></linearGradient>
<linearGradient id="snowG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f8ff"/><stop offset="1" stop-color="#c9d6ea"/></linearGradient>
<linearGradient id="sepia" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8d3a6"/><stop offset="1" stop-color="#b8935a"/></linearGradient>
<linearGradient id="carpet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a1f2b"/><stop offset="1" stop-color="#4a1018"/></linearGradient>
<linearGradient id="dawnG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b4a7a"/><stop offset=".55" stop-color="#d98a7a"/><stop offset="1" stop-color="#ffd9a0"/></linearGradient>`);
const world=$('world');const CAM=el('g',{},world);
const BGL=el('g',{},CAM),MID=el('g',{},CAM),CHL=el('g',{},CAM),FG=el('g',{},CAM);
const GRADE=el('rect',{x:-600,y:-600,width:2280,height:3120,fill:'#2b3a73',opacity:0,style:'mix-blend-mode:multiply'},world);
const WARM=el('rect',{x:-600,y:-600,width:2280,height:3120,fill:'#ffb35c',opacity:0,style:'mix-blend-mode:soft-light'},world);
const SNOWL=el('g',{},world);
const BLACK=el('rect',{x:-600,y:-600,width:2280,height:3120,fill:'#000',opacity:0},world);
el('rect',{x:-400,y:-400,width:1880,height:2720,filter:'url(#grain)',fill:'#fff'},world);
const FX=$('fx');
const CH={};for(const k of Object.keys(STY))CH[k]=makeChar(CHL,k);
const BG={};
function bg(name,fn){const g=el('g',{display:'none'},BGL);fn(g);BG[name]=g;}
function txt(parent,x,y,size,str,fill='#fff',attrs={}){const e=el('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Cairo','font-weight':800,'font-size':size,fill,direction:'rtl'},attrs),parent);e.textContent=str;return e;}
const popS=(t,t0,d=.22)=>{if(t<t0)return 0;const k=(t-t0)/d;return k<.55?lerp(0,1.15,k/.55):k<1?lerp(1.15,1,(k-.55)/.45):1;};
function G(parent,x,y,s=1,r=0,attrs={}){return el('g',Object.assign({transform:`translate(${x} ${y}) rotate(${r}) scale(${s})`},attrs),parent);}
function arcPath(r,a){const x=Math.sin(a)*r,y=-Math.cos(a)*r;return `M0 ${-r} A${r} ${r} 0 ${a>Math.PI?1:0} 1 ${x} ${y}`;}
function snow(t,n=60,k=1,wind=1){for(let i=0;i<n;i++){const sp=120+(i*37)%160;const x=((i*173+t*60*wind*(1+(i%3)*.4))%1300)-110;const y=((i*311+t*sp)%2100)-90;el('circle',{cx:x,cy:y,r:2+(i%4)*1.6,fill:'#fff',opacity:.75*k},SNOWL);}}

// ---------- backgrounds: Essaouira port ----------
document.querySelector('defs').insertAdjacentHTML('beforeend',`
<linearGradient id="duskSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4a8a"/><stop offset=".5" stop-color="#e0866a"/><stop offset="1" stop-color="#ffc98a"/></linearGradient>
<linearGradient id="daySky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ec4ea"/><stop offset="1" stop-color="#d8eef8"/></linearGradient>
<linearGradient id="seaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f6f8f"/><stop offset="1" stop-color="#173a52"/></linearGradient>
<linearGradient id="nightSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f2236"/><stop offset="1" stop-color="#050b14"/></linearGradient>
<linearGradient id="stone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9a77a"/><stop offset="1" stop-color="#9a7a52"/></linearGradient>
<linearGradient id="blueWood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1d5fa8"/><stop offset=".5" stop-color="#2f84d6"/><stop offset="1" stop-color="#174d8a"/></linearGradient>
<linearGradient id="deckG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b08a5a"/><stop offset="1" stop-color="#7a5a36"/></linearGradient>`);
function boat(p,x,y,s,col='url(#blueWood)',o={}){const g=G(p,x,y,s);const bob=Math.sin((o.t||0)*1.6+x*.01)*6;const b=G(g,0,bob);
  el('path',{class:'o',d:'M-260 -60 Q-250 40 -170 70 L170 70 Q250 40 260 -60 Z',fill:col},b);el('path',{d:'M-255 -40 L255 -40',stroke:o.stripe||'#e9c46a','stroke-width':14},b);el('path',{d:'M-240 0 L240 0',stroke:'#c0392b','stroke-width':8},b);
  if(o.cabin!==false){el('rect',{class:'o',x:-60,y:-150,width:120,height:90,rx:10,fill:'#f4f4f6'},b);el('rect',{x:-40,y:-130,width:80,height:36,rx:6,fill:'#2b3a73'},b);}
  if(o.name)txt(b,0,40,40,o.name,'#fff');return g;}
function gull(p,x,y,s,t){const f=Math.sin(t*10+x)*18;el('path',{d:`M${x-40*s} ${y+f*s*.3} Q${x-20*s} ${y-20*s-f*s} ${x} ${y} Q${x+20*s} ${y-20*s-f*s} ${x+40*s} ${y+f*s*.3}`,stroke:'#fff','stroke-width':6*s,fill:'none','stroke-linecap':'round'},p);}
function waves(p,y0,col='#8fc6e0',op=.5,t=0){for(let r=0;r<6;r++){let d='';for(let i=0;i<=24;i++){const x=-200+i*60;d+=(i?'L':'M')+x+' '+(y0+r*70+Math.sin(i*.8+t*1.5+r)*8);}el('path',{d,stroke:col,'stroke-width':4,fill:'none',opacity:op},p);}}
bg('port',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'url(#duskSky)'},g);el('circle',{cx:760,cy:620,r:110,fill:'#ffd98a',opacity:.9},g);
  el('rect',{x:-500,y:760,width:2080,height:900,fill:'url(#seaG)'},g);
  const w=G(g,0,0);el('path',{class:'o',d:'M-200 760 L-200 380 L380 380 L380 760Z',fill:'url(#stone)'},w);for(let i=0;i<8;i++)el('rect',{class:'o',x:-190+i*72,y:330,width:46,height:56,fill:'#c9a77a','stroke-width':4},w);
  el('rect',{class:'o',x:120,y:250,width:140,height:140,fill:'#c9a77a'},w);for(let i=0;i<3;i++)el('rect',{class:'o',x:124+i*48,y:214,width:34,height:40,fill:'#c9a77a','stroke-width':4},w);
  for(let i=0;i<3;i++)el('rect',{x:-140+i*160,y:520,width:26,height:40,rx:13,fill:'#3a2a1a'},w);
  el('rect',{x:-500,y:1500,width:2080,height:1000,fill:'url(#stone)'},g);for(let i=0;i<12;i++)el('path',{d:`M${-500+i*190} 1500 L${-500+i*190} 2400`,stroke:'#8a6a42','stroke-width':4,opacity:.5},g);el('rect',{x:-500,y:1500,width:2080,height:20,fill:'#7a5a36'},g);});
bg('dock',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'#0b1428'},g);for(let i=0;i<40;i++)el('circle',{cx:(i*173)%1080,cy:(i*97)%700,r:1.5+(i%3),fill:'#fff',opacity:.6},g);
  el('rect',{x:-500,y:700,width:2080,height:900,fill:'url(#nightSea)'},g);el('rect',{x:-500,y:1550,width:2080,height:1000,fill:'#4a4030'},g);el('rect',{x:-500,y:1550,width:2080,height:20,fill:'#2a2418'},g);
  const l=G(g,900,1550);el('rect',{x:-8,y:-560,width:16,height:560,fill:'#2a2a30'},l);el('ellipse',{cx:0,cy:-560,rx:40,ry:20,fill:'#ffd27a'},l);el('circle',{cx:0,cy:-520,r:260,fill:'url(#glowG)',opacity:.55},l);});
bg('deck',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'url(#duskSky)'},g);el('rect',{x:-500,y:700,width:2080,height:900,fill:'url(#seaG)'},g);
  el('path',{class:'o',d:'M-200 2400 L60 820 L1020 820 L1280 2400Z',fill:'url(#deckG)'},g);for(let i=1;i<9;i++){el('path',{d:`M${lerp(60,-200,0)+i*0} 0`,stroke:'none'},g);el('path',{d:`M${lerp(60,1020,i/9)} 820 L${lerp(-200,1280,i/9)} 2400`,stroke:'#5a3e22','stroke-width':4,opacity:.6},g);}
  el('path',{class:'o',d:'M60 820 L-200 2400 L-260 2400 L20 800Z',fill:'url(#blueWood)'},g);el('path',{class:'o',d:'M1020 820 L1280 2400 L1340 2400 L1060 800Z',fill:'url(#blueWood)'},g);});
bg('office',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'#d9cdb4'},g);el('rect',{x:-500,y:1380,width:2080,height:1200,fill:'#6a4a2e'},g);
  const w=G(g,780,620);el('rect',{class:'o',x:-200,y:-230,width:400,height:460,rx:10,fill:'url(#seaG)','stroke-width':10},w);el('rect',{x:-200,y:-230,width:400,height:200,fill:'url(#daySky)'},w);el('path',{d:'M0 -230 L0 230 M-200 0 L200 0',stroke:'#1d5fa8','stroke-width':14},w);
  const t=G(g,480,1300);el('rect',{class:'o',x:-440,y:-40,width:880,height:40,rx:8,fill:'url(#woodV)'},t);el('rect',{x:-400,y:0,width:30,height:300,fill:'#4a2812'},t);el('rect',{x:370,y:0,width:30,height:300,fill:'#4a2812'},t);
  const lp=G(g,140,1020);el('path',{class:'o',d:'M-70 0 L70 0 L44 -100 L-44 -100Z',fill:'#1d5fa8'},lp);el('rect',{x:-6,y:0,width:12,height:240,fill:'#2a2a30'},lp);el('circle',{cy:-30,r:220,fill:'url(#glowG)',opacity:.5},lp);});
bg('alley',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'url(#daySky)'},g);el('rect',{x:-500,y:200,width:2080,height:1400,fill:'#f4efe4'},g);el('rect',{x:-500,y:1600,width:2080,height:900,fill:'#cbb89a'},g);
  const d=G(g,540,1050);el('path',{class:'o',d:'M-200 550 L-200 -250 Q0 -450 200 -250 L200 550Z',fill:'#1f6fc2','stroke-width':8},d);el('path',{d:'M-160 520 L-160 -230 Q0 -400 160 -230 L160 520',fill:'none',stroke:'#164f8c','stroke-width':8},d);for(let r=0;r<5;r++)for(let c=0;c<3;c++)el('circle',{cx:-100+c*100,cy:-120+r*130,r:10,fill:'#e9c46a'},d);
  el('rect',{class:'o',x:120,y:1100,width:30,height:30,rx:15,fill:'#e9c46a'},g);for(const x of [-60,1140]){el('rect',{class:'o',x:x-80,y:500,width:160,height:200,fill:'#1f6fc2'},g);}});
bg('room',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'#e8dfcc'},g);el('rect',{x:-500,y:1380,width:2080,height:1200,fill:'#9a6a42'},g);
  const w=G(g,540,700);el('rect',{class:'o',x:-260,y:-300,width:520,height:560,rx:12,fill:'url(#seaG)','stroke-width':12},w);el('rect',{x:-260,y:-300,width:520,height:250,fill:'url(#daySky)'},w);el('path',{d:'M0 -300 L0 260',stroke:'#1f6fc2','stroke-width':16},w);
  el('rect',{class:'o',x:-120,y:1380,width:1320,height:90,fill:'#c9a46a'},g);});
bg('board',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'url(#stone)'},g);for(let r=0;r<12;r++)el('path',{d:`M-500 ${r*200} L1580 ${r*200}`,stroke:'#8a6a42','stroke-width':6,opacity:.4},g);
  const b=G(g,540,900);el('rect',{class:'o',x:-400,y:-460,width:800,height:880,rx:20,fill:'#1d5fa8','stroke-width':10},b);el('rect',{x:-370,y:-430,width:740,height:820,rx:12,fill:'#f4f6fb'},b);});
bg('nightsea',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'#060c1a'},g);for(let i=0;i<70;i++)el('circle',{cx:(i*173)%1080,cy:(i*97)%900,r:1+(i%3),fill:'#fff',opacity:.7},g);
  el('rect',{x:-500,y:900,width:2080,height:1600,fill:'url(#nightSea)'},g);el('path',{d:'M200 900 Q300 780 420 820 Q520 740 640 800 Q760 760 860 900Z',fill:'#0a0f18'},g);});
bg('cove',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'#060c1a'},g);for(let i=0;i<50;i++)el('circle',{cx:(i*173)%1080,cy:(i*97)%600,r:1+(i%3),fill:'#fff',opacity:.6},g);
  el('path',{d:'M-500 1100 L-300 500 L-60 700 L120 420 L300 760 L-500 1600Z',fill:'#1a1c22'},g);el('path',{d:'M1580 1100 L1300 520 L1100 700 L940 460 L760 780 L1580 1600Z',fill:'#1a1c22'},g);el('rect',{x:-500,y:1000,width:2080,height:1500,fill:'url(#nightSea)'},g);});
bg('rocks',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'#0a1020'},g);for(let i=0;i<50;i++)el('circle',{cx:(i*173)%1080,cy:(i*97)%700,r:1+(i%3),fill:'#fff',opacity:.6},g);
  el('rect',{x:-500,y:1200,width:2080,height:1300,fill:'url(#nightSea)'},g);el('path',{class:'o',d:'M-100 1900 L60 1300 L300 1200 L520 1320 L760 1180 L1000 1350 L1180 1900Z',fill:'#3a3c44'},g);el('path',{d:'M300 1200 L360 1300 L240 1320Z',fill:'#5a5c64'},g);});
bg('rampart',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'#081022'},g);for(let i=0;i<60;i++)el('circle',{cx:(i*173)%1080,cy:(i*97)%800,r:1+(i%3),fill:'#fff',opacity:.6},g);
  el('rect',{x:-500,y:900,width:2080,height:900,fill:'url(#nightSea)'},g);el('path',{d:'M720 905 Q780 860 840 880 Q880 860 920 905Z',fill:'#0a0f18'},g);
  el('rect',{x:-500,y:1500,width:2080,height:1000,fill:'#6a5638'},g);for(let i=0;i<9;i++)el('rect',{class:'o',x:-480+i*230,y:1400,width:150,height:110,fill:'#7a6644','stroke-width':4},g);
  const c=G(g,260,1460);el('path',{class:'o',d:'M-40 -40 L360 -90 L370 -40 L-30 20Z',fill:'#2a2a30'},c);el('circle',{class:'o',cx:0,cy:20,r:60,fill:'#4a3a2a'},c);});
bg('dawnport',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'url(#dawnG)'},g);el('circle',{cx:300,cy:700,r:90,fill:'#ffe2a6'},g);el('rect',{x:-500,y:800,width:2080,height:800,fill:'#5a7a9a'},g);el('rect',{x:-500,y:1500,width:2080,height:1000,fill:'url(#stone)'},g);el('rect',{x:-500,y:1500,width:2080,height:20,fill:'#7a5a36'},g);});
bg('card',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'#0f1a2a'},g);el('circle',{cx:540,cy:880,r:700,fill:'url(#glowB)',opacity:.12},g);});

// ---------- dynamic props ----------
function clockFace(p,x,y,r,h,m,o={}){const g=G(p,x,y,1);el('circle',{class:'o',r,fill:o.fill||'#fbf6e8','stroke-width':Math.max(4,r*.08),stroke:o.rim||'#17120f'},g);
  for(let i=0;i<12;i++){const q=i*Math.PI/6;el('path',{d:`M${Math.sin(q)*r*.78} ${-Math.cos(q)*r*.78} L${Math.sin(q)*r*.9} ${-Math.cos(q)*r*.9}`,stroke:'#17120f','stroke-width':Math.max(2,r*.05)},g);}
  const ha=(h%12+m/60)/12*Math.PI*2,ma=m/60*Math.PI*2;
  el('path',{d:`M0 0 L${Math.sin(ma)*r*.78} ${-Math.cos(ma)*r*.78}`,stroke:'#17120f','stroke-width':r*.07,'stroke-linecap':'round'},g);
  el('path',{d:`M0 0 L${Math.sin(ha)*r*.5} ${-Math.cos(ha)*r*.5}`,stroke:o.hourCol||'#17120f','stroke-width':r*.11,'stroke-linecap':'round'},g);el('circle',{r:r*.08,fill:'#17120f'},g);return g;}
function bigClock(p,x,y,s,o={}){const g=G(p,x,y,s);const wide=o.wide??1;const bw=lerp(70,170,wide);
  el('rect',{class:'o',x:-110,y:-700,width:220,height:300,rx:30,fill:o.sepia?'#8a6a42':'url(#wood)'},g);el('path',{class:'o',d:'M-130 -700 Q0 -800 130 -700Z',fill:o.sepia?'#7a5a32':'#5a3218'},g);
  clockFace(g,0,-560,90,o.h??5,o.m??17,{fill:o.sepia?'#efe0bc':'#fbf6e8'});
  el('rect',{class:'o',x:-80,y:-400,width:160,height:330,fill:o.sepia?'#7a5a32':'url(#wood)'},g);el('rect',{class:'o',x:-55,y:-380,width:110,height:280,rx:10,fill:o.sepia?'#5a4224':'#2a160a'},g);
  const pa=o.pend?Math.sin(o.pend)*.25:0;const pd=G(g,0,-380,1,pa*57);el('path',{d:'M0 0 L0 200',stroke:'#d8b648','stroke-width':6},pd);el('circle',{cx:0,cy:220,r:28,fill:'#d8b648',stroke:'#17120f','stroke-width':4},pd);
  el('rect',{class:'o',x:-bw,y:-70,width:bw*2,height:o.tall?260:lerp(80,260,wide),fill:o.sepia?'#7a5a32':'url(#woodV)'},g);
  if(o.open){el('rect',{x:-bw+16,y:-50,width:bw*2-32,height:220,fill:'#050302'},g);el('rect',{class:'o',x:-bw-o.open*150,y:-70,width:bw,height:260,fill:'url(#woodV)',transform:`skewY(${-o.open*8})`},g);}
  if(o.glow)el('circle',{cx:0,cy:-560,r:180,fill:'url(#glowG)',opacity:o.glow},g);return g;}
function footprint(p,x,y,r=0,s=1,col='#7d8aa6',op=.7){const g=G(p,x,y,s,r);el('ellipse',{cx:0,cy:0,rx:14,ry:30,fill:col,opacity:op},g);el('ellipse',{cx:0,cy:44,rx:12,ry:14,fill:col,opacity:op},g);return g;}
function boot(p,x,y,s,num,wet){const g=G(p,x,y,s);el('path',{class:'o',d:'M-40 -160 L40 -160 L44 -20 Q110 -10 110 30 L110 50 L-50 50 L-50 -20Z',fill:'#3a2a20'},g);el('rect',{x:-50,y:30,width:160,height:20,fill:'#17120f'},g);
  if(wet){for(let i=0;i<5;i++)el('circle',{cx:-30+i*30,cy:-120+(i%2)*60,r:9,fill:'#bfe6ff',opacity:.8},g);el('ellipse',{cx:30,cy:62,rx:110,ry:14,fill:'#7fb3d9',opacity:.5},g);}
  const tg=G(g,0,-210);el('rect',{class:'o',x:-46,y:-34,width:92,height:60,rx:10,fill:'#fff'},tg);txt(tg,0,12,44,String(num),'#17120f',{direction:'ltr'});return g;}
function paper(p,x,y,w,h,r=0){const g=G(p,x,y,1,r);el('rect',{x:-w/2+8,y:-h/2+10,width:w,height:h,fill:'#000',opacity:.25,filter:'url(#sh)'},g);el('rect',{class:'o',x:-w/2,y:-h/2,width:w,height:h,rx:8,fill:'#f6efdc'},g);return g;}
function badge(p,n,t,t0){const k=popS(t,t0);if(k<=0)return;const g=G(p,540,250,k);el('rect',{class:'o',x:-150,y:-60,width:300,height:120,rx:60,fill:'#ffd166'},g);el('path',{d:'M-100 -26 h22 a12 12 0 1 1 0 0 h22 v52 h-66Z',fill:'#17120f',opacity:0},g);const pz=G(g,-60,0,.9);el('path',{d:'M-34 -34 L-8 -34 A12 12 0 1 1 8 -34 L34 -34 L34 -8 A12 12 0 1 0 34 8 L34 34 L-34 34Z',fill:'#17120f'},pz);txt(g,50,26,72,String(n),'#17120f',{direction:'ltr'});}
// quiz/answer/cta overlays (screen space in FX)
function quizCard(t,t0,n){const k=popS(t,t0,.3);const g=G(FX,540,560,k);el('circle',{r:210,fill:'#ffd166',stroke:'#17120f','stroke-width':12},g);txt(g,0,95,300,'؟','#17120f');badge(FX,n,t,t0+.15);}
function answerCard(t,t0,n){const k=popS(t,t0,.3);const g=G(FX,540,560,k);el('circle',{r:170,fill:'#2ecc71',stroke:'#17120f','stroke-width':12},g);el('path',{d:'M-70 0 L-18 56 L80 -56',stroke:'#fff','stroke-width':34,fill:'none','stroke-linecap':'round','stroke-linejoin':'round'},g);badge(FX,n,t,t0+.1);}
function ctaCard(t,t0,tFollow){const k=popS(t,t0,.3)*1.5;const g=G(FX,540,700,k);
  const b=G(g,-180,0);el('path',{class:'o',d:'M-110 -80 Q-110 -120 -70 -120 L70 -120 Q110 -120 110 -80 L110 30 Q110 70 70 70 L-20 70 L-70 120 L-60 70 L-70 70 Q-110 70 -110 30Z',fill:'#fff'},b);for(let i=0;i<3;i++)el('circle',{cx:-45+i*45,cy:-25,r:14,fill:'#17120f',opacity:(Math.floor(t*4)%3)===i?1:.35},b);
  const f=G(g,180,0,1+(t>tFollow&&t<tFollow+.2?-.1:0));const on=t>=tFollow+.1;el('rect',{class:'o',x:-150,y:-70,width:300,height:140,rx:70,fill:on?'#3b4766':'#ff3b5c'},f);txt(f,0,26,64,on?'✓':'+',`#fff`,{direction:'ltr'});
  if(t>=tFollow){const hk=eout((t-tFollow)/.25);el('circle',{cx:180+(1-hk)*120,cy:20+(1-hk)*160,r:26,fill:'#ffd8b8',stroke:'#17120f','stroke-width':5},g);}}
// chars
function show(spec,t){for(const k in CH){const p=spec[k];vis(CH[k].root,!!p);if(p)CH[k].update(Object.assign({t,l:[-110,250],r:[110,250],lid:.3,blink:blink(t,k.length),brow:0,mouth:0,smile:0},p));}}
function vis(e,on){e.setAttribute('display',on?'inline':'none');}
function cam(t,sx,sy,s,shake=0){const jx=Math.sin(t*1.3)*4+Math.sin(t*37)*shake,jy=Math.cos(t*1.1)*4+Math.cos(t*41)*shake;CAM.setAttribute('transform',`translate(540 960) scale(${s}) translate(${-sx+jx} ${-sy+jy})`);}
let curBG=null;function useBG(n){if(curBG!==n){for(const k in BG)vis(BG[k],k===n);curBG=n;}}
// word helpers
const LW={};WORDS.forEach((w,i)=>{(LW[w.line]=LW[w.line]||[]).push(w);});
function T(line,q=0){const L=LW[line];if(!L)return 1e9;if(typeof q==='number')return L[Math.min(q,L.length-1)].t0;const f=L.find(w=>w.w.replace(/[^\p{L}\p{N}]/gu,'').includes(q));return f?f.t0:L[0].t0;}
function TE(line){const L=LW[line];return L?L[L.length-1].t1:1e9;}
function quoteStart(line){const L=LW[line];if(!L)return 1e9;const i=L.findIndex(w=>/:$/.test(w.w));return i>=0&&i+1<L.length?L[i+1].t0:L[0].t0;}
function talkIn(t,line){return t>=quoteStart(line)-.05&&t<=TE(line)+.05?mouthAt(t):0;}
function talkAll(t,line){return t>=T(line,0)-.05&&t<=TE(line)+.05?mouthAt(t):0;}
// captions
const CHK=[];{let cur=null;WORDS.forEach((w,i)=>{const prev=WORDS[i-1];const brk=!cur||cur.ws.length>=3||(cur.ws.join(' ')+' '+w.w).length>17||(prev&&/[،.:؟…]$/.test(prev.w))||(prev&&w.t0-prev.t1>.35);if(brk){cur={ws:[],t0:w.t0};CHK.push(cur);}cur.ws.push(w.w);cur.t1=w.t1;});}
CHK.forEach((c,i)=>{const nx=CHK[i+1];c.end=nx?Math.min(nx.t0,c.t1+.4):c.t1+.6;c.el=el('text',{class:'cap',x:540,y:1300,'text-anchor':'middle',direction:'rtl',opacity:0},$('caps'));c.el.textContent=c.ws.join(' ').replace(/[،.:؟]/g,'');});
function captions(t){let cur=-1;CHK.forEach((c,i)=>{if(t>=c.t0-0.03)cur=i;});CHK.forEach((c,i)=>{const on=i===cur&&t<c.end;c.el.setAttribute('opacity',on?1:0);if(on){const k=eout((t-c.t0+.03)/.12);c.el.setAttribute('transform',`translate(540 1300) scale(${.85+.15*k}) translate(-540 -1300)`);}});}
// render loop
window.render=function(t){for(const k in CH)vis(CH[k].root,false);FG.innerHTML='';MID.innerHTML='';FX.innerHTML='';SNOWL.innerHTML='';GRADE.setAttribute('opacity',.25);WARM.setAttribute('opacity',0);BLACK.setAttribute('opacity',0);
  let i=0;while(i+1<SHOTS.length&&t>=T(SHOTS[i+1][0])-.04)i++;const [ln,fn]=SHOTS[i];fn(t,t-T(ln));captions(t);};
window.ready=document.fonts.ready.then(()=>{render(0);return true;});
