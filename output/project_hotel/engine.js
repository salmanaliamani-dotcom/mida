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
const CH={};for(const k of ['you','zahra','mansour','ilyas','hamid','salma','rashid','police'])CH[k]=makeChar(CHL,k);
const BG={};
function bg(name,fn){const g=el('g',{display:'none'},BGL);fn(g);BG[name]=g;}
function txt(parent,x,y,size,str,fill='#fff',attrs={}){const e=el('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Cairo','font-weight':800,'font-size':size,fill,direction:'rtl'},attrs),parent);e.textContent=str;return e;}
const popS=(t,t0,d=.22)=>{if(t<t0)return 0;const k=(t-t0)/d;return k<.55?lerp(0,1.15,k/.55):k<1?lerp(1.15,1,(k-.55)/.45):1;};
function G(parent,x,y,s=1,r=0,attrs={}){return el('g',Object.assign({transform:`translate(${x} ${y}) rotate(${r}) scale(${s})`},attrs),parent);}
function arcPath(r,a){const x=Math.sin(a)*r,y=-Math.cos(a)*r;return `M0 ${-r} A${r} ${r} 0 ${a>Math.PI?1:0} 1 ${x} ${y}`;}
function snow(t,n=60,k=1,wind=1){for(let i=0;i<n;i++){const sp=120+(i*37)%160;const x=((i*173+t*60*wind*(1+(i%3)*.4))%1300)-110;const y=((i*311+t*sp)%2100)-90;el('circle',{cx:x,cy:y,r:2+(i%4)*1.6,fill:'#fff',opacity:.75*k},SNOWL);}}

// ---------- backgrounds ----------
bg('ext',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'url(#nightSky)'},g);
  el('path',{d:'M-500 1000 L-100 420 L200 760 L520 300 L860 720 L1100 380 L1580 1000Z',fill:'#3c4a6e'},g);
  el('path',{d:'M-100 420 L-20 540 L-160 560Z M520 300 L620 450 L440 470Z M1100 380 L1180 500 L1020 510Z',fill:'#eef4ff'},g);
  el('path',{d:'M-500 1100 Q540 900 1580 1100 L1580 2500 L-500 2500Z',fill:'url(#snowG)'},g);
  const h=G(g,540,1180);el('rect',{class:'o',x:-330,y:-420,width:660,height:440,fill:'#7a5a48'},h);el('path',{class:'o',d:'M-380 -410 L0 -640 L380 -410Z',fill:'#4a2e22'},h);el('path',{d:'M-370 -415 L0 -630 L370 -415 L330 -400 L0 -600 L-330 -400Z',fill:'#f4f8ff'},h);
  for(let r=0;r<3;r++)for(let c=0;c<4;c++){const lit=(r*4+c)%3!==1;el('rect',{class:'o',x:-280+c*150,y:-380+r*125,width:90,height:80,rx:8,fill:lit?'#ffcf6a':'#1a2236','stroke-width':4},h);if(lit)el('rect',{x:-280+c*150,y:-380+r*125,width:90,height:80,fill:'url(#glowG)',opacity:.6},h);}
  el('rect',{class:'o',x:-60,y:-110,width:120,height:130,rx:10,fill:'#3a2418'},h);
  const sg=G(h,0,-470);el('rect',{class:'o',x:-170,y:-48,width:340,height:80,rx:14,fill:'#2a1a12'},sg);txt(sg,0,10,52,'فندق الأرز','#ffd76a');
  el('path',{d:'M-500 1500 Q100 1380 300 1600 Q520 1820 1580 1700 L1580 2500 L-500 2500Z',fill:'#e6eef9'},g);
  el('path',{d:'M-120 1580 Q120 1560 260 1700',stroke:'#9aa8c0','stroke-width':40,fill:'none',opacity:.4},g);});
bg('corridor',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'url(#wallH)'},g);
  el('polygon',{points:'-500,2500 380,1250 700,1250 1580,2500',fill:'url(#carpet)'},g);el('polygon',{points:'-500,-500 380,560 700,560 1580,-500',fill:'#3a2418'},g);
  el('rect',{x:380,y:560,width:320,height:690,fill:'#4a3024'},g);
  for(const [x0,x1] of [[-500,380],[1580,700]]){for(let i=0;i<3;i++){}}
  const d=G(g,540,820);el('rect',{class:'o',x:-230,y:-480,width:460,height:940,rx:12,fill:'url(#wood)','stroke-width':8},d);el('rect',{x:-200,y:-450,width:30,height:880,rx:10,fill:'#fff',opacity:.12},d);
  el('rect',{class:'o',x:-170,y:-400,width:340,height:330,rx:10,fill:'none','stroke-width':6,stroke:'#3a1e0c'},d);el('rect',{class:'o',x:-170,y:-20,width:340,height:400,rx:10,fill:'none','stroke-width':6,stroke:'#3a1e0c'},d);
  const pl=G(d,0,-540);el('rect',{class:'o',x:-60,y:-46,width:120,height:92,rx:14,fill:'#d8b648'},pl);txt(pl,0,30,76,'7','#2a1a12',{direction:'ltr'});
  el('rect',{class:'o',x:150,y:20,width:40,height:110,rx:12,fill:'#d8b648'},d);el('circle',{cx:170,cy:100,r:10,fill:'#2a1a12'},d);
  for(const x of [60,1020]){el('rect',{x:x-14,y:420,width:28,height:120,fill:'#d8b648'},g);el('ellipse',{cx:x,cy:420,rx:50,ry:26,fill:'#ffcf6a'},g);el('circle',{cx:x,cy:420,r:160,fill:'url(#glowG)',opacity:.6},g);}});
bg('room',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'url(#wallR)'},g);el('rect',{x:-500,y:1380,width:2080,height:1200,fill:'#5a3a22'},g);el('rect',{x:-500,y:1380,width:2080,height:30,fill:'#3a2414'},g);
  // window (right) open
  const w=G(g,820,640);el('rect',{class:'o',x:-170,y:-260,width:340,height:520,rx:10,fill:'#0b1226','stroke-width':10},w);for(let i=0;i<14;i++)el('circle',{cx:-150+(i*53)%300,cy:-230+(i*97)%460,r:3,fill:'#fff',opacity:.8},w);
  el('path',{class:'o',d:'M-170 -260 L-60 -240 L-60 240 L-170 260Z',fill:'#9fb3cf','fill-opacity':.5},w);el('path',{class:'o',d:'M-230 -300 Q-200 0 -250 320 L-180 320 Q-150 0 -170 -300Z',fill:'#b5543a'},w);el('path',{class:'o',d:'M230 -300 Q250 0 220 320 L170 320 Q160 0 170 -300Z',fill:'#b5543a'},w);
  el('rect',{class:'o',x:-190,y:260,width:380,height:30,fill:'#8a6a4a'},w);
  // bed (left)
  const b=G(g,250,1300);el('rect',{class:'o',x:-260,y:-330,width:60,height:420,rx:10,fill:'url(#woodV)'},b);el('rect',{class:'o',x:-230,y:-120,width:520,height:150,rx:24,fill:'#e9e1d0'},b);el('rect',{class:'o',x:-230,y:-150,width:520,height:70,rx:24,fill:'#7a3b55'},b);el('rect',{class:'o',x:-200,y:-200,width:150,height:70,rx:26,fill:'#fff'},b);el('rect',{class:'o',x:-230,y:20,width:520,height:70,fill:'url(#woodV)'},b);
  // suitcase
  const s=G(g,620,1330);el('rect',{class:'o',x:-80,y:-150,width:160,height:150,rx:18,fill:'#3d5a7a'},s);el('path',{class:'o',d:'M-30 -150 L-30 -180 L30 -180 L30 -150',fill:'none','stroke-width':7},s);el('rect',{x:-80,y:-90,width:160,height:12,fill:'#2b4058'},s);
  // painting (left wall upper)
  const p=G(g,300,520);el('rect',{class:'o',x:-140,y:-100,width:280,height:200,rx:6,fill:'#c9a46a','stroke-width':8},p);el('rect',{x:-118,y:-80,width:236,height:160,fill:'#8fb3d9'},p);el('path',{d:'M-118 80 L-40 -40 L10 20 L60 -50 L118 80Z',fill:'#5a6a86'},p);el('path',{d:'M-40 -40 L-20 -10 L-60 -10Z M60 -50 L80 -20 L40 -20Z',fill:'#fff'},p);
  // nightstand
  const n=G(g,560,1240);el('rect',{class:'o',x:-70,y:-70,width:140,height:150,rx:8,fill:'url(#woodV)'},n);
  // table
  const tb=G(g,860,1250);el('rect',{class:'o',x:-150,y:-40,width:300,height:26,rx:6,fill:'url(#woodV)'},tb);el('rect',{x:-130,y:-14,width:20,height:150,fill:'#4a2812'},tb);el('rect',{x:110,y:-14,width:20,height:150,fill:'#4a2812'},tb);
  // carpet
  el('ellipse',{cx:540,cy:1600,rx:520,ry:90,fill:'#7a1f2b',stroke:'#c9a227','stroke-width':10},g);});
bg('down',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'url(#snowG)'},g);
  el('polygon',{points:'-500,-500 1580,-500 900,700 180,700',fill:'#7a5a48'},g);for(let i=0;i<4;i++){const y=-300+i*250;el('path',{d:`M${-400+i*150} ${y} L${1480-i*150} ${y}`,stroke:'#5a3e30','stroke-width':8},g);}
  el('rect',{x:180,y:700,width:720,height:40,fill:'#5a3e30'},g);for(let i=0;i<30;i++)el('circle',{cx:(i*137)%1080,cy:800+(i*211)%1100,r:4,fill:'#fff',opacity:.8},g);});
bg('doorlow',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'url(#wallH)'},g);el('rect',{class:'o',x:140,y:-400,width:800,height:1700,fill:'url(#wood)','stroke-width':10},g);el('rect',{x:140,y:1300,width:800,height:46,fill:'#0a0705'},g);
  el('rect',{x:-500,y:1346,width:2080,height:1200,fill:'url(#carpet)'},g);for(let i=0;i<8;i++)el('path',{d:`M-500 ${1400+i*120} L1580 ${1400+i*120}`,stroke:'#c9a227','stroke-width':4,opacity:.25},g);});
bg('salon',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'url(#wallH)'},g);el('rect',{x:-500,y:1400,width:2080,height:1100,fill:'#4a2e1c'},g);
  // stairs left
  for(let i=0;i<9;i++)el('rect',{class:'o',x:-200+i*40,y:1400-i*90,width:260,height:90,fill:i%2?'#6a4a2e':'#5a3c24','stroke-width':4},g);el('path',{d:'M-160 1300 L200 500',stroke:'#3a2414','stroke-width':16},g);
  // fireplace right
  const f=G(g,840,1200);el('rect',{class:'o',x:-200,y:-360,width:400,height:400,rx:10,fill:'#8a7a6a'},f);el('rect',{class:'o',x:-140,y:-240,width:280,height:280,rx:120,fill:'#1a0f08'},f);el('rect',{class:'o',x:-230,y:-390,width:460,height:50,rx:8,fill:'#6a4a2e'},f);
  // sofa
  const s=G(g,520,1500);el('rect',{class:'o',x:-260,y:-150,width:520,height:110,rx:40,fill:'#2f5a4a'},s);el('rect',{class:'o',x:-280,y:-60,width:560,height:110,rx:30,fill:'#3a6e5a'},s);
  // rug
  el('ellipse',{cx:520,cy:1720,rx:560,ry:110,fill:'#7a1f2b',stroke:'#c9a227','stroke-width':10},g);});
bg('reception',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'url(#wallH)'},g);el('rect',{x:-500,y:1420,width:2080,height:1100,fill:'#4a2e1c'},g);
  for(let i=0;i<6;i++)el('rect',{class:'o',x:120+i*140,y:360,width:100,height:150,rx:10,fill:'#3a2418'},g);for(let i=0;i<6;i++)el('path',{d:`M${170+i*140} 400 l0 50`,stroke:'#d8b648','stroke-width':8,'stroke-linecap':'round'},g);
  const d=G(g,540,1300);el('rect',{class:'o',x:-460,y:-260,width:920,height:300,rx:12,fill:'url(#wood)'},d);el('rect',{class:'o',x:-480,y:-290,width:960,height:44,rx:10,fill:'#3a2414'},d);
  el('circle',{cx:300,cy:-320,r:22,fill:'#d8b648',stroke:'#17120f','stroke-width':4},d);});
bg('kitchen',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'#c9c2b0'},g);for(let r=0;r<10;r++)for(let c=0;c<12;c++)el('rect',{x:-100+c*110,y:300+r*60,width:104,height:54,fill:'#e8e2d2',stroke:'#b8b09a','stroke-width':3},g);
  el('rect',{x:-500,y:1420,width:2080,height:1100,fill:'#6a5a4a'},g);const k=G(g,540,1280);el('rect',{class:'o',x:-520,y:-160,width:1040,height:340,fill:'#8a6a4a'},k);el('rect',{class:'o',x:-540,y:-190,width:1080,height:50,fill:'#d9d0bc'},k);
  const o=G(g,860,900);el('rect',{class:'o',x:-140,y:-160,width:280,height:200,rx:16,fill:'#3a3f4a'},o);el('rect',{x:-110,y:-130,width:220,height:120,rx:10,fill:'#ffb35c',opacity:.7},o);
  for(let i=0;i<4;i++)el('path',{d:`M${100+i*70} 200 l0 120`,stroke:'#5a5f6a','stroke-width':8},g);});
bg('dining',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'url(#wallR)'},g);el('rect',{x:-500,y:1400,width:2080,height:1100,fill:'#5a3a22'},g);
  for(const x of [200,880]){const w=G(g,x,560);el('rect',{class:'o',x:-150,y:-220,width:300,height:440,rx:12,fill:'#c9d6ea'},w);el('path',{d:'M0 -220 L0 220 M-150 0 L150 0',stroke:'#7a5a48','stroke-width':10},w);}
  const t=G(g,540,1360);el('ellipse',{class:'o',cx:0,cy:-40,rx:330,ry:60,fill:'#f4efe4'},t);el('rect',{x:-20,y:-20,width:40,height:180,fill:'#4a2812'},t);});
bg('parking',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'#c8d4e6'},g);el('path',{d:'M-500 900 L-100 500 L300 800 L700 420 L1100 820 L1580 900Z',fill:'#8a9ab8'},g);
  el('rect',{x:-500,y:1000,width:2080,height:1600,fill:'url(#snowG)'},g);
  for(const x of [300,780]){const c=G(g,x,1240);el('path',{class:'o',d:'M-220 60 Q-230 -80 -150 -110 Q-60 -220 60 -200 Q170 -190 210 -100 Q240 -40 230 60Z',fill:'#f4f8ff'},c);el('rect',{x:-200,y:20,width:400,height:40,fill:'#dfe8f5'},c);el('rect',{x:-70,y:-40,width:80,height:30,rx:8,fill:'#2b3a5a',opacity:.5},c);}});
bg('backdoor',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'url(#wallH)'},g);el('rect',{x:-500,y:1420,width:2080,height:1100,fill:'#3a2a20'},g);el('rect',{class:'o',x:300,y:400,width:480,height:1020,rx:10,fill:'url(#wood)','stroke-width':8},g);el('rect',{class:'o',x:380,y:480,width:320,height:260,rx:10,fill:'#1a2236'},g);el('rect',{class:'o',x:700,y:920,width:30,height:100,rx:10,fill:'#d8b648'},g);});
bg('wallout',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'url(#nightSky)'},g);el('rect',{class:'o',x:-500,y:-500,width:820,height:2100,fill:'#7a5a48'},g);for(let r=0;r<3;r++)el('rect',{class:'o',x:60,y:-300+r*420,width:160,height:150,rx:8,fill:r===0?'#0b1226':'#ffcf6a'},g);
  el('rect',{class:'o',x:120,y:1200,width:200,height:400,fill:'url(#wood)'},g);el('rect',{x:-500,y:1600,width:2080,height:1000,fill:'url(#snowG)'},g);});
bg('bedroom',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'#6a7a8a'},g);el('rect',{x:-500,y:1380,width:2080,height:1200,fill:'#4a3a2e'},g);
  const b=G(g,540,1320);el('rect',{class:'o',x:-380,y:-330,width:60,height:420,rx:10,fill:'url(#woodV)'},b);el('rect',{class:'o',x:-350,y:-120,width:700,height:150,rx:24,fill:'#e9e1d0'},b);el('rect',{class:'o',x:-350,y:-150,width:700,height:70,rx:24,fill:'#2f5a7a'},b);el('rect',{class:'o',x:-350,y:20,width:700,height:70,fill:'url(#woodV)'},b);
  const l=G(g,940,1000);el('path',{class:'o',d:'M-60 0 L60 0 L40 -90 L-40 -90Z',fill:'#e9c46a'},l);el('rect',{x:-6,y:0,width:12,height:200,fill:'#3a2414'},l);el('circle',{cx:0,cy:-40,r:200,fill:'url(#glowG)',opacity:.5},l);});
bg('stairs',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'#1a1410'},g);for(let i=0;i<12;i++)el('rect',{class:'o',x:-100+i*20,y:1900-i*140,width:1300-i*40,height:140,fill:i%2?'#3a2a1e':'#2e2218','stroke-width':4},g);el('path',{d:'M-100 1800 L460 260',stroke:'#4a3424','stroke-width':22},g);});
bg('card',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'#141a2a'},g);el('circle',{cx:540,cy:880,r:700,fill:'url(#glowB)',opacity:.12},g);});
bg('dawn',g=>{el('rect',{x:-500,y:-500,width:2080,height:3000,fill:'url(#dawnG)'},g);el('path',{d:'M-500 1000 L-100 520 L200 800 L520 380 L860 760 L1100 460 L1580 1000Z',fill:'#6a6a9a'},g);el('path',{d:'M-500 1100 Q540 900 1580 1100 L1580 2500 L-500 2500Z',fill:'url(#snowG)'},g);
  const h=G(g,540,1180);el('rect',{class:'o',x:-330,y:-420,width:660,height:440,fill:'#7a5a48'},h);el('path',{class:'o',d:'M-380 -410 L0 -640 L380 -410Z',fill:'#4a2e22'},h);el('rect',{class:'o',x:-60,y:-110,width:120,height:130,rx:10,fill:'#3a2418'},h);
  const car=G(g,820,1500);el('rect',{class:'o',x:-170,y:-90,width:340,height:110,rx:30,fill:'#f4f6fb'},car);el('rect',{class:'o',x:-110,y:-150,width:200,height:70,rx:20,fill:'#2b3a73'},car);el('rect',{x:-170,y:-50,width:340,height:22,fill:'#2b3a73'},car);el('rect',{x:-30,y:-170,width:60,height:20,rx:6,fill:'#ff3b30'},car);});

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
