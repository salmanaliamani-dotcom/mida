const NS='http://www.w3.org/2000/svg';
const $=id=>document.getElementById(id);
function el(tag,attrs={},parent){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e;}
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)), lerp=(a,b,k)=>a+(b-a)*k;
const ease=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const eout=x=>{x=cl(x);return 1-Math.pow(1-x,3)};
function env(t){const i=(t-ENV.t0)*ENV.fps;const a=Math.floor(i),f=i-a;const g=j=>ENV.db[Math.max(0,Math.min(ENV.db.length-1,j))];return lerp(g(a),g(a+1),f);}
function mouthAt(t){let m=0;for(let k=-2;k<=1;k++){m=Math.max(m,cl((env(t+k/60)+42)/30));}return cl(m*1.1);}
function kf(t,K){if(t<=K[0][0])return K[0][1];for(let i=1;i<K.length;i++){if(t<=K[i][0]){const k=ease((t-K[i-1][0])/(K[i][0]-K[i-1][0]));const a=K[i-1][1],b=K[i][1];return Array.isArray(a)?a.map((v,j)=>lerp(v,b[j],k)):lerp(a,b,k);}}return K[K.length-1][1];}
function txt(parent,x,y,size,str,fill='#fff',attrs={}){const e=el('text',Object.assign({x,y,'text-anchor':'middle','font-family':'Cairo','font-weight':800,'font-size':size,fill,direction:'rtl'},attrs),parent);e.textContent=str;return e;}
const popS=(t,t0,d=.22)=>{if(t<t0)return 0;const k=(t-t0)/d;return k<.55?lerp(0,1.15,k/.55):k<1?lerp(1.15,1,(k-.55)/.45):1;};
function G(parent,x,y,s=1,r=0,attrs={}){return el('g',Object.assign({transform:`translate(${x} ${y}) rotate(${r}) scale(${s})`},attrs),parent);}
function arcPath(r,a){const x=Math.sin(a)*r,y=-Math.cos(a)*r;return `M0 ${-r} A${r} ${r} 0 ${a>Math.PI?1:0} 1 ${x} ${y}`;}
function clockFace(p,x,y,r,h,m,o={}){const g=G(p,x,y,1);el('circle',{class:'o',r,fill:o.fill||'#fbf6e8','stroke-width':Math.max(4,r*.08),stroke:o.rim||'#17120f'},g);
  for(let i=0;i<12;i++){const q=i*Math.PI/6;el('path',{d:`M${Math.sin(q)*r*.78} ${-Math.cos(q)*r*.78} L${Math.sin(q)*r*.9} ${-Math.cos(q)*r*.9}`,stroke:'#17120f','stroke-width':Math.max(2,r*.05)},g);}
  const ha=(h%12+m/60)/12*Math.PI*2,ma=m/60*Math.PI*2;
  el('path',{d:`M0 0 L${Math.sin(ma)*r*.78} ${-Math.cos(ma)*r*.78}`,stroke:'#17120f','stroke-width':r*.07,'stroke-linecap':'round'},g);
  el('path',{d:`M0 0 L${Math.sin(ha)*r*.5} ${-Math.cos(ha)*r*.5}`,stroke:o.hourCol||'#17120f','stroke-width':r*.11,'stroke-linecap':'round'},g);el('circle',{r:r*.08,fill:'#17120f'},g);return g;}
function paper(p,x,y,w,h,r=0){const g=G(p,x,y,1,r);el('rect',{x:-w/2+8,y:-h/2+10,width:w,height:h,fill:'#000',opacity:.25,filter:'url(#sh)'},g);el('rect',{class:'o',x:-w/2,y:-h/2,width:w,height:h,rx:8,fill:'#f6efdc'},g);return g;}
function badge(p,n,t,t0){const k=popS(t,t0);if(k<=0)return;const g=G(p,540,250,k);el('rect',{class:'o',x:-150,y:-60,width:300,height:120,rx:60,fill:'#ffd166'},g);el('path',{d:'M-100 -26 h22 a12 12 0 1 1 0 0 h22 v52 h-66Z',fill:'#17120f',opacity:0},g);const pz=G(g,-60,0,.9);el('path',{d:'M-34 -34 L-8 -34 A12 12 0 1 1 8 -34 L34 -34 L34 -8 A12 12 0 1 0 34 8 L34 34 L-34 34Z',fill:'#17120f'},pz);txt(g,50,26,72,String(n),'#17120f',{direction:'ltr'});}
function quizCard(t,t0,n){const k=popS(t,t0,.3);const g=G(FX,540,560,k);el('circle',{r:210,fill:'#ffd166',stroke:'#17120f','stroke-width':12},g);txt(g,0,95,300,'؟','#17120f');badge(FX,n,t,t0+.15);}
function answerCard(t,t0,n){const k=popS(t,t0,.3);const g=G(FX,540,560,k);el('circle',{r:170,fill:'#2ecc71',stroke:'#17120f','stroke-width':12},g);el('path',{d:'M-70 0 L-18 56 L80 -56',stroke:'#fff','stroke-width':34,fill:'none','stroke-linecap':'round','stroke-linejoin':'round'},g);badge(FX,n,t,t0+.1);}
function ctaCard(t,t0,tFollow){const k=popS(t,t0,.3)*1.5;const g=G(FX,540,700,k);
  const b=G(g,-180,0);el('path',{class:'o',d:'M-110 -80 Q-110 -120 -70 -120 L70 -120 Q110 -120 110 -80 L110 30 Q110 70 70 70 L-20 70 L-70 120 L-60 70 L-70 70 Q-110 70 -110 30Z',fill:'#fff'},b);for(let i=0;i<3;i++)el('circle',{cx:-45+i*45,cy:-25,r:14,fill:'#17120f',opacity:(Math.floor(t*4)%3)===i?1:.35},b);
  const f=G(g,180,0,1+(t>tFollow&&t<tFollow+.2?-.1:0));const on=t>=tFollow+.1;el('rect',{class:'o',x:-150,y:-70,width:300,height:140,rx:70,fill:on?'#3b4766':'#ff3b5c'},f);txt(f,0,26,64,on?'✓':'+',`#fff`,{direction:'ltr'});
  if(t>=tFollow){const hk=eout((t-tFollow)/.25);el('circle',{cx:180+(1-hk)*120,cy:20+(1-hk)*160,r:26,fill:'#ffd8b8',stroke:'#17120f','stroke-width':5},g);}}
const LW={};WORDS.forEach((w,i)=>{(LW[w.line]=LW[w.line]||[]).push(w);});
function T(line,q=0){const L=LW[line];if(!L)return 1e9;if(typeof q==='number')return L[Math.min(q,L.length-1)].t0;const f=L.find(w=>w.w.replace(/[^\p{L}\p{N}]/gu,'').includes(q));return f?f.t0:L[0].t0;}
function TE(line){const L=LW[line];return L?L[L.length-1].t1:1e9;}
function quoteStart(line){const L=LW[line];if(!L)return 1e9;const i=L.findIndex(w=>/:$/.test(w.w));return i>=0&&i+1<L.length?L[i+1].t0:L[0].t0;}
function talkIn(t,line){return t>=quoteStart(line)-.05&&t<=TE(line)+.05?mouthAt(t):0;}
function talkAll(t,line){return t>=T(line,0)-.05&&t<=TE(line)+.05?mouthAt(t):0;}
const CHK=[];{let cur=null;WORDS.forEach((w,i)=>{const prev=WORDS[i-1];const brk=!cur||cur.ws.length>=3||(cur.ws.join(' ')+' '+w.w).length>17||(prev&&/[،.:؟…]$/.test(prev.w))||(prev&&w.t0-prev.t1>.35);if(brk){cur={ws:[],t0:w.t0};CHK.push(cur);}cur.ws.push(w.w);cur.t1=w.t1;});}
CHK.forEach((c,i)=>{const nx=CHK[i+1];c.end=nx?Math.min(nx.t0,c.t1+.4):c.t1+.6;c.el=el('text',{class:'cap',x:540,y:1300,'text-anchor':'middle',direction:'rtl',opacity:0},$('caps'));c.el.textContent=c.ws.join(' ').replace(/[،.:؟]/g,'');});
function captions(t){let cur=-1;CHK.forEach((c,i)=>{if(t>=c.t0-0.03)cur=i;});CHK.forEach((c,i)=>{const on=i===cur&&t<c.end;c.el.setAttribute('opacity',on?1:0);if(on){const k=eout((t-c.t0+.03)/.12);c.el.setAttribute('transform',`translate(540 1300) scale(${.85+.15*k}) translate(-540 -1300)`);}});}
// port-story helpers
const Q=(n,line)=>(t)=>{useBG('card');cam(t,540,960,1);show({},t);quizCard(t,T(line),n);};
const CTA2=(line)=>(t)=>{useBG('card');cam(t,540,960,1);show({},t);ctaCard(t,T(line),T(line,'فولو'));};
const X=(p,x,y,k,s=1)=>{if(k<=0)return;const g=G(p,x,y,k*s);el('path',{d:'M-70 -70 L70 70 M70 -70 L-70 70',stroke:'#ff3b30','stroke-width':20,'stroke-linecap':'round'},g);return g;};
const OK=(p,x,y,k,s=1)=>{if(k<=0)return;const g=G(p,x,y,k*s);el('circle',{r:80,fill:'#2ecc71',stroke:'#17120f','stroke-width':6},g);el('path',{d:'M-34 0 L-8 28 L40 -28',stroke:'#fff','stroke-width':18,fill:'none','stroke-linecap':'round'},g);return g;};
const QM=(x,y,k=1)=>{if(k>0)txt(FX,x,y,200*k,'؟','#ffd166',{stroke:'#17120f','stroke-width':12,'paint-order':'stroke'});};
const BIG=(s,x,y,k,size=150,col='#ffd166')=>{if(k>0){const g=G(FX,x,y,k);txt(g,0,size*.35,size,s,col,{direction:'ltr',stroke:'#17120f','stroke-width':12,'paint-order':'stroke'});}};
const LBL=(s,x,y,k,size=64,bgc='#fff',fg='#17120f')=>{if(k<=0)return;const g=G(FX,x,y,k);const w=Math.max(160,s.length*size*.55+60);el('rect',{class:'o',x:-w/2,y:-size*.8,width:w,height:size*1.5,rx:size*.4,fill:bgc},g);txt(g,0,size*.3,size,s,fg);};
function sunIcon(p,x,y,s=1,col='#ffd166'){const g=G(p,x,y,s);for(let i=0;i<12;i++){const q=i*Math.PI/6;el('path',{d:`M${Math.cos(q)*60} ${Math.sin(q)*60} L${Math.cos(q)*90} ${Math.sin(q)*90}`,stroke:col,'stroke-width':10,'stroke-linecap':'round'},g);}el('circle',{r:48,fill:col,stroke:'#17120f','stroke-width':5},g);return g;}
// sea chart: coast on the right (east), port, island SW, compass
function chart(p,t,o={}){const g=G(p,540,900,o.s||1);el('rect',{class:'o',x:-470,y:-640,width:940,height:1160,rx:16,fill:'#d9ecf2'},g);
  for(let i=0;i<10;i++)el('path',{d:`M-470 ${-640+i*120} L470 ${-640+i*120} M${-470+i*104} -640 L${-470+i*104} 520`,stroke:'#a9cfdc','stroke-width':2},g);
  el('path',{class:'o',d:'M470 -640 L250 -640 Q200 -400 260 -200 Q300 -40 220 120 Q180 300 240 520 L470 520Z',fill:'#e8d6a8'},g);
  const port=G(g,230,-160);el('circle',{r:22,fill:'#1d5fa8',stroke:'#17120f','stroke-width':5},port);if(o.portLbl!==false)txt(port,0,-40,40,'الصويرة','#17120f');
  const isl=G(g,-170,260);el('path',{class:'o',d:'M-60 0 Q-50 -50 0 -46 Q60 -50 62 6 Q50 50 0 44 Q-60 46 -60 0Z',fill:'#9a8a7a'},isl);txt(isl,0,90,34,'جزيرة النوارس','#17120f');
  const cp=G(g,-360,-520);el('circle',{r:52,fill:'#fff',stroke:'#17120f','stroke-width':4},cp);el('path',{d:'M0 -44 L12 0 L0 44 L-12 0Z',fill:'#e53935'},cp);txt(cp,0,-62,30,'N','#17120f',{direction:'ltr'});txt(cp,68,10,30,'E','#17120f',{direction:'ltr'});txt(cp,-70,10,30,'W','#17120f',{direction:'ltr'});txt(cp,0,84,30,'S','#17120f',{direction:'ltr'});
  return {g,port:[230,-160],isl:[-170,260]};}
// light-signal row
function lights(p,x,y,n,on,s=1,col='#ffe27a'){for(let i=0;i<n;i++){const g=G(p,x+(i-(n-1)/2)*70*s,y,s);el('circle',{r:22,fill:on>i?col:'#2a3040',stroke:'#17120f','stroke-width':4},g);if(on>i)el('circle',{r:60,fill:'url(#glowG)'},g);}}
function fuelGauge(p,x,y,s,lit,max=120){const g=G(p,x,y,s);el('rect',{class:'o',x:-90,y:-260,width:180,height:300,rx:24,fill:'#2b2f38'},g);const h=240*lit/max;el('rect',{x:-70,y:20-h,width:140,height:h,rx:12,fill:'#f2c21b'},g);for(let i=0;i<=6;i++)el('path',{d:`M60 ${20-i*40} L80 ${20-i*40}`,stroke:'#fff','stroke-width':4},g);txt(g,0,100,60,Math.round(lit)+' L','#fff',{direction:'ltr'});return g;}
function notebook(p,x,y,s,lines,t,times){const g=paper(p,x,y,760*s,(120+lines.length*90)*s,-2);lines.forEach((l,i)=>{if(!times||t>=times[i])txt(g,330*s,(-((lines.length-1)*90)/2+i*90+20)*s,52*s,l,'#2a1a12',{'text-anchor':'start'});});return g;}
function seaBob(t){return Math.sin(t*1.4)*8;}
