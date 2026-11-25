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
