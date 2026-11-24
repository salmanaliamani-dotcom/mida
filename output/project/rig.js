const NS='http://www.w3.org/2000/svg';
const $=id=>document.getElementById(id);
function el(tag,attrs={},parent){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e;}
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)), lerp=(a,b,k)=>a+(b-a)*k;
const ease=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const eout=x=>{x=cl(x);return 1-Math.pow(1-x,3)};
function env(t){const i=(t-ENV.t0)*ENV.fps;const a=Math.floor(i),f=i-a;const g=j=>ENV.db[Math.max(0,Math.min(ENV.db.length-1,j))];return lerp(g(a),g(a+1),f);}
function mouthAt(t){ // smoothed lip openness from real VO energy
  let m=0;for(let k=-2;k<=1;k++){m=Math.max(m,cl((env(t+k/60)+42)/30))*1;} return cl(m*1.1);}
// keyframe helper: kf(t,[[t0,v0],[t1,v1],...]) with easing, v may be number or array
function kf(t,K){if(t<=K[0][0])return K[0][1];for(let i=1;i<K.length;i++){if(t<=K[i][0]){const k=ease((t-K[i-1][0])/(K[i][0]-K[i-1][0]));const a=K[i-1][1],b=K[i][1];return Array.isArray(a)?a.map((v,j)=>lerp(v,b[j],k)):lerp(a,b,k);}}return K[K.length-1][1];}
function blink(t,seed){const per=3.1+seed*.7;const ph=((t+seed*1.3)%per);return ph<.07?ph/.07:ph<.16?1-(ph-.07)/.09:0;}

// ---------------- CHARACTER RIG ----------------
let uid=0;
function makeChar(parent,kind){
  const id='c'+(uid++);const C={kind};
  const isC=kind==='ctrl', isG=kind==='girl';
  const root=el('g',{},parent);C.root=root;
  el('ellipse',{cx:0,cy:575,rx:150,ry:22,fill:'#000',opacity:.35,filter:'url(#sh)'},root);
  const legs=el('path',{class:'o',fill:'none','stroke-width':14,stroke:isC?'#1b2340':isG?'#6b4a3a':'#2b2f38',d:'M-38 300 L-42 560 M38 300 L42 560'},root);
  const feet=el('path',{class:'o',fill:'#121212',d:'M-70 560 Q-42 540 -16 560 Z M70 560 Q42 540 16 560 Z'},root);C.legs=legs;C.feet=feet;
  const body=el('g',{},root);C.body=body;
  if(isG){
    el('path',{class:'o',fill:'#7b3f8f',d:'M-70 20 Q-70 0 -30 -4 L30 -4 Q70 0 70 20 L110 300 Q0 325 -110 300 Z'},body);
    el('path',{d:'M-60 40 Q-70 150 -80 280',stroke:'#fff',opacity:.18,'stroke-width':10,fill:'none','stroke-linecap':'round'},body);
    el('path',{class:'o',fill:'#f0e4c8','stroke-width':3,d:'M-30 -2 Q0 30 30 -2 L20 18 Q0 34 -20 18Z'},body);
    C.dustB=el('g',{opacity:0},body);for(const [x,y,r] of [[-40,120,16],[30,200,20],[50,80,12],[-60,240,14]])el('circle',{cx:x,cy:y,r,fill:'#8a7d6a',opacity:.55},C.dustB);
  }else if(isC){
    el('path',{class:'o',fill:'url(#navy)',d:'M-80 30 Q-90 10 -40 0 L40 0 Q90 10 80 30 L95 310 Q0 330 -95 310 Z'},body);
    el('path',{class:'o',fill:'url(#vest)',d:'M-82 40 Q-80 12 -38 4 L-18 70 L-18 300 Q-60 310 -94 300 Z'},body);
    el('path',{class:'o',fill:'url(#vest)',d:'M82 40 Q80 12 38 4 L18 70 L18 300 Q60 310 94 300 Z'},body);
    el('rect',{x:-90,y:200,width:72,height:18,fill:'url(#refl)',opacity:.95},body);el('rect',{x:18,y:200,width:72,height:18,fill:'url(#refl)',opacity:.95},body);
    el('rect',{x:-62,y:60,width:16,height:140,fill:'url(#refl)',opacity:.95},body);el('rect',{x:46,y:60,width:16,height:140,fill:'url(#refl)',opacity:.95},body);
    el('path',{class:'o',fill:'#ffffff','stroke-width':3,d:'M-30 2 L0 40 L30 2 Z'},body);
    el('rect',{class:'o','stroke-width':3,x:24,y:110,width:44,height:40,rx:4,fill:'#e0741f'},body); // pocket
    el('path',{d:'M-70 50 Q-75 150 -70 280',stroke:'#fff',opacity:.18,'stroke-width':10,fill:'none','stroke-linecap':'round'},body);
  }else{
    el('path',{class:'o',fill:'url(#hood)',d:'M-82 30 Q-90 6 -40 -2 L40 -2 Q90 6 82 30 L98 315 Q0 335 -98 315 Z'},body);
    el('path',{class:'o',fill:'#4d595c',d:'M-60 -4 Q0 40 60 -4 Q50 30 0 44 Q-50 30 -60 -4Z'},body);
    el('path',{class:'o',fill:'none','stroke-width':4,d:'M-14 40 L-18 120 M14 40 L18 120'},body);
    el('path',{class:'o',fill:'#4a5558',d:'M-60 210 L60 210 L66 290 L-66 290Z'},body);
    el('path',{d:'M-72 50 Q-78 150 -74 280',stroke:'#fff',opacity:.14,'stroke-width':10,fill:'none','stroke-linecap':'round'},body);
  }
  // arms
  const sleeve=isC?'#24355f':isG?'#7b3f8f':'#56656a';
  C.arms={};
  for(const s of ['l','r']){
    const g=el('g',{},root);
    const up=el('path',{class:'o',fill:'none',stroke:sleeve,'stroke-width':22},g);
    const upI=el('path',{fill:'none',stroke:sleeve,'stroke-width':14,'stroke-linecap':'round'},g);
    const item=el('g',{},g);
    const hand=el('g',{},g);
    el('circle',{class:'o',r:21,fill:isC?'url(#skinC)':'url(#skinP)'},hand);
    const finger=el('path',{class:'o','stroke-width':4,fill:isC?'#e8a676':'#d79a6a',d:'M-6 -14 L-7 -46 Q0 -54 7 -46 L6 -14Z',opacity:0},hand);
    C.arms[s]={g,up,upI,hand,item,finger};
  }
  // head
  const head=el('g',{},root);C.head=head;
  const skin=isC?'url(#skinC)':'url(#skinP)';
  el('circle',{class:'o',cx:-142,cy:0,r:28,fill:skin},head);el('circle',{class:'o',cx:142,cy:0,r:28,fill:skin},head);
  if(isG){for(const sx of [-1,1]){el('path',{class:'o',fill:'url(#hairG)',d:`M${sx*120} -60 Q${sx*230} -40 ${sx*200} 120 Q${sx*180} 40 ${sx*120} 20Z`},head);el('circle',{class:'o',cx:sx*150,cy:-55,r:16,fill:'#e84a6f'},head);}}
  if(kind==='you'){el('path',{class:'o',fill:'url(#hairG)',d:'M-138 -30 Q-150 -150 -40 -165 Q40 -190 120 -140 Q160 -100 140 -30 Q120 -95 60 -105 Q0 -80 -60 -110 Q-120 -90 -138 -30Z'},head);}
  el('circle',{class:'o',cx:0,cy:0,r:142,fill:skin},head);
  el('ellipse',{cx:-55,cy:-70,rx:45,ry:26,fill:'#fff',opacity:.28,transform:'rotate(-30 -55 -70)'},head);
  el('ellipse',{cx:-80,cy:45,rx:28,ry:15,fill:'#ff6b6b',opacity:.22},head);el('ellipse',{cx:80,cy:45,rx:28,ry:15,fill:'#ff6b6b',opacity:.22},head);
  if(isG){el('path',{class:'o',fill:'url(#hairG)',d:'M-142 -10 Q-150 -150 0 -152 Q150 -150 142 -10 Q120 -90 40 -100 Q0 -70 -30 -100 Q-110 -95 -142 -10Z'},head);
     el('path',{d:'M-60 -128 Q0 -142 50 -130',stroke:'#fff',opacity:.2,'stroke-width':10,fill:'none','stroke-linecap':'round'},head);
     C.dust=el('g',{opacity:0},head);for(const [x,y,r] of [[-70,50,18],[60,-30,14],[85,60,12],[-20,-70,10],[20,95,10]])el('circle',{cx:x,cy:y,r,fill:'#7d705e',opacity:.5},C.dust);}
  if(kind==='you'){el('path',{class:'o',fill:'url(#hairG)',d:'M-140 -20 Q-150 -140 -20 -150 Q110 -160 142 -40 Q120 -100 70 -95 Q75 -70 40 -60 Q30 -95 -10 -95 Q-20 -70 -60 -75 Q-60 -100 -100 -90 Q-130 -60 -140 -20Z'},head);
     el('path',{d:'M-60 -125 Q0 -140 50 -128',stroke:'#fff',opacity:.18,'stroke-width':10,fill:'none','stroke-linecap':'round'},head);}
  C.eyes=[];
  for(const sx of [-52,52]){
    const g=el('g',{transform:`translate(${sx} -8)`},head);
    const cp=el('clipPath',{id:id+'e'+sx},g);el('ellipse',{rx:26,ry:29},cp);
    el('ellipse',{rx:26,ry:29,fill:'#fff'},g);
    const pup=el('circle',{r:12,fill:'#17120f'},g);const hl=el('circle',{r:4,fill:'#fff'},g);
    const lid=el('rect',{x:-30,y:-34,width:60,height:0,fill:isC?'#dc9a6b':'#cc8d5f','clip-path':`url(#${id}e${sx})`},g);
    const lidLine=el('path',{fill:'none',stroke:'#17120f','stroke-width':5,'stroke-linecap':'round'},g);
    el('ellipse',{class:'o',rx:26,ry:29,fill:'none','stroke-width':4},g);
    const brow=el('path',{fill:'none',stroke:isC?'#2a1c14':'#120d0a','stroke-width':11,'stroke-linecap':'round'},head);
    C.eyes.push({sx,pup,hl,lid,lidLine,brow});
  }
  el('path',{class:'o',fill:'none','stroke-width':4,d:'M-6 22 Q-14 40 2 44'},head);
  C.mouth=el('path',{class:'o','stroke-width':4,fill:'#5a1414'},head);
  C.tongue=el('path',{fill:'#e05a5a'},head);
  if(isC){
    el('path',{class:'o',fill:'#2a1c14','stroke-width':3,d:'M-48 62 Q-30 44 0 52 Q30 44 48 62 Q30 70 0 62 Q-30 70 -48 62Z'},head);
    // cap
    el('path',{class:'o',fill:'url(#capG)',d:'M-138 -48 Q-140 -160 0 -168 Q140 -160 138 -48 Q0 -70 -138 -48Z'},head);
    el('path',{class:'o',fill:'#14275c',d:'M-150 -50 Q0 -88 150 -50 Q160 -30 140 -26 Q0 -54 -140 -26 Q-160 -30 -150 -50Z'},head);
    el('rect',{class:'o','stroke-width':3,x:-26,y:-118,width:52,height:30,rx:6,fill:'#f2c14e'},head);
    el('path',{d:'M-90 -130 Q-40 -155 20 -150',stroke:'#fff',opacity:.3,'stroke-width':10,fill:'none','stroke-linecap':'round'},head);
  }
  root.appendChild(C.arms.l.g);root.appendChild(C.arms.r.g);
  C.update=function(p){
    const s=p.s||1;
    root.setAttribute('transform',`translate(${p.x} ${p.y}) scale(${(p.flip?-1:1)*s} ${s}) rotate(${p.lean||0} 0 560)`);
    root.style.filter=p.dark?`brightness(${1-p.dark})`:'';
    if(C.dust){C.dust.setAttribute('opacity',p.dust||0);C.dustB.setAttribute('opacity',p.dust||0);}
    const wk=p.walk;if(wk!==undefined){const a=Math.sin(wk)*26,b=-a;const l1=`M-38 300 L${-42+a} 560`,l2=`M38 300 L${42+b} 560`;C.legs.setAttribute('d',l1+' '+l2);
      C.feet.setAttribute('d',`M${-70+a} 560 Q${-42+a} 540 ${-16+a} 560 Z M${70+b} 560 Q${42+b} 540 ${16+b} 560 Z`);}
    const br=Math.sin((p.t||0)*2.2)*3;
    body.setAttribute('transform',`translate(0 ${br*.3}) scale(1 ${1+br*.002})`);
    const hx=(p.hdx||0),hy=-150+(p.hdy||0)+br*.5;
    head.setAttribute('transform',`translate(${hx} ${hy}) rotate(${p.hrot||0})`);
    // eyes
    const lidv=cl(Math.max(p.lid??.3,p.blink||0));
    for(const e of C.eyes){
      const ex=(p.ex||0)*12,ey=(p.ey||0)*12;e.pup.setAttribute('cx',ex);e.pup.setAttribute('cy',ey);e.hl.setAttribute('cx',ex+4);e.hl.setAttribute('cy',ey-5);
      const h=lidv*60;e.lid.setAttribute('height',h);
      const ly=-29+lidv*58;e.lidLine.setAttribute('d',lidv>.02?`M-27 ${ly} Q0 ${ly+(lidv>.95?8:3)} 27 ${ly}`:'');
      const b=p.brow||0; const inner=e.sx<0?1:-1; // inner end toward center
      const bx0=e.sx-38*inner*-1, bx1=e.sx+38*inner*-1;
      const by=-62-(p.browUp||0)*14;
      // outer end at e.sx - inner*38 ; inner end at e.sx + inner*38
      const ox=e.sx-inner*36, ix=e.sx+inner*30;
      e.brow.setAttribute('d',`M${ox} ${by-b*4} Q${e.sx} ${by-10} ${ix} ${by+b*16}`);
    }
    // mouth
    const m=cl(p.mouth||0), w=(p.mw||1)*34, sm=p.smile||0;
    if(m<.06){C.mouth.setAttribute('d',`M${-w} 82 Q0 ${82+sm*16} ${w} 82`);C.mouth.setAttribute('fill','none');C.tongue.setAttribute('d','');}
    else{const h=6+m*46;C.mouth.setAttribute('fill','#5a1414');
      C.mouth.setAttribute('d',`M${-w} 80 Q0 ${74-h*.15} ${w} 80 Q${w*.8} ${80+h} 0 ${80+h} Q${-w*.8} ${80+h} ${-w} 80Z`);
      C.tongue.setAttribute('d',`M${-w*.5} ${80+h*.75} Q0 ${80+h*.45} ${w*.5} ${80+h*.75} Q0 ${80+h*.98} ${-w*.5} ${80+h*.75}Z`);}
    // arms (IK) in char-local coords
    for(const sd of ['l','r']){
      const A=C.arms[sd];const sx=sd==='l'?-78:78, sy=34;
      const [tx,ty]=p[sd]||[sd==='l'?-110:110,250];
      const L1=118,L2=110;let dx=tx-sx,dy=ty-sy;let d=Math.hypot(dx,dy);const dm=L1+L2-1;if(d>dm){dx*=dm/d;dy*=dm/d;d=dm;}
      const a=Math.atan2(dy,dx);const cb=cl((L1*L1+d*d-L2*L2)/(2*L1*d),-1,1);const b=Math.acos(cb);
      const bend=(sd==='l'?1:-1)*(p[sd+'bend']||1);
      const ea=a+bend*b;const ex=sx+L1*Math.cos(ea),ey=sy+L1*Math.sin(ea);const hx2=sx+dx,hy2=sy+dy;
      const dpath=`M${sx} ${sy} L${ex} ${ey} L${hx2} ${hy2}`;
      A.up.setAttribute('d',dpath);A.upI.setAttribute('d',dpath);
      A.hand.setAttribute('transform',`translate(${hx2} ${hy2}) rotate(${p[sd+'rot']||0})`);
      A.finger.setAttribute('opacity',p[sd+'point']?1:0);
      A.item.setAttribute('transform',`translate(${hx2} ${hy2}) rotate(${p[sd+'irot']||0})`);
      const want=p[sd+'item']||'';if(A.item.dataset.k!==want){A.item.dataset.k=want;A.item.innerHTML='';
        if(want==='bottle'){el('rect',{class:'o',x:-26,y:-120,width:52,height:150,rx:14,fill:'url(#bottle)'},A.item);el('rect',{x:-22,y:-60,width:44,height:84,rx:10,fill:'#5fb5e8',opacity:.55},A.item);
          el('rect',{class:'o',x:-14,y:-140,width:28,height:22,rx:4,fill:'#2f7dd1'},A.item);el('rect',{x:-24,y:-95,width:48,height:28,fill:'#e33b3b'},A.item);el('rect',{x:-16,y:-112,width:8,height:110,rx:4,fill:'#fff',opacity:.6},A.item);}
        if(want==='radio'){el('path',{class:'o','stroke-width':4,d:'M18 -60 L40 -140',fill:'none'},A.item);el('rect',{class:'o',x:-40,y:-70,width:80,height:100,rx:12,fill:'#3d4250'},A.item);for(let i=0;i<4;i++)el('rect',{x:-28,y:-56+i*14,width:56,height:6,rx:3,fill:'#1b1d24'},A.item);el('circle',{cx:22,cy:10,r:9,fill:'#ff3b30'},A.item);el('rect',{x:-34,y:-66,width:14,height:90,rx:6,fill:'#fff',opacity:.2},A.item);}
        if(want==='phone'){el('rect',{class:'o',x:-34,y:-100,width:68,height:126,rx:12,fill:'#15171c'},A.item);el('rect',{x:-28,y:-94,width:56,height:112,rx:8,fill:'#bfe0ff'},A.item);el('circle',{cx:0,cy:-40,r:120,fill:'url(#glowB)',opacity:.5},A.item);}
        if(want==='pen'){el('rect',{class:'o','stroke-width':3,x:-7,y:-78,width:14,height:70,rx:4,fill:'#16181d'},A.item);el('rect',{x:-7,y:-78,width:14,height:16,rx:3,fill:'#e33b3b'},A.item);el('path',{class:'o','stroke-width':3,d:'M-5 -8 L5 -8 L0 6Z',fill:'#fafafa'},A.item);}
      }
    }
  };
  return C;
}

