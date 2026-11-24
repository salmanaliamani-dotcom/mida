const NS='http://www.w3.org/2000/svg';
const $=id=>document.getElementById(id);
function el(tag,attrs={},parent){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e;}
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)), lerp=(a,b,k)=>a+(b-a)*k;
const ease=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const eout=x=>{x=cl(x);return 1-Math.pow(1-x,3)};
function env(t){const i=(t-ENV.t0)*ENV.fps;const a=Math.floor(i),f=i-a;const g=j=>ENV.db[Math.max(0,Math.min(ENV.db.length-1,j))];return lerp(g(a),g(a+1),f);}
function mouthAt(t){let m=0;for(let k=-2;k<=1;k++){m=Math.max(m,cl((env(t+k/60)+42)/30));}return cl(m*1.1);}
function kf(t,K){if(t<=K[0][0])return K[0][1];for(let i=1;i<K.length;i++){if(t<=K[i][0]){const k=ease((t-K[i-1][0])/(K[i][0]-K[i-1][0]));const a=K[i-1][1],b=K[i][1];return Array.isArray(a)?a.map((v,j)=>lerp(v,b[j],k)):lerp(a,b,k);}}return K[K.length-1][1];}
function blink(t,seed){const per=3.1+seed*.7;const ph=((t+seed*1.3)%per);return ph<.07?ph/.07:ph<.16?1-(ph-.07)/.09:0;}

// ---- character styles ----
const STY={
 you:   {skin:'P',hair:'messy',body:'hoodie',c1:'#56656a',c2:'#3d4a4e',legs:'#2b2f38',scarf:'#c94f3d'},
 zahra: {skin:'C',hair:'scarf',scarfC:'#2f7a6d',body:'kaftan',c1:'#7a3b55',c2:'#5a2a40',legs:'#3a2230',shawl:'#d9a441',age:.3},
 mansour:{skin:'C',hair:'bald',beard:'white',glasses:'small',body:'vest',c1:'#5b4636',c2:'#3a2c22',shirt:'#e8e0cf',legs:'#2a2420',age:.8},
 ilyas: {skin:'P',hair:'short',hat:'redcap',body:'waiter',c1:'#1f2a44',c2:'#141b2e',shirt:'#f2f2f2',legs:'#1b1f2a'},
 hamid: {skin:'C',hair:'short',hat:'chef',body:'apron',c1:'#f4f4f4',c2:'#d9d9d9',shirt:'#e8e8e8',legs:'#3a3f4a',mustache:true,flour:true,round:true},
 salma: {skin:'C',hair:'bob',body:'coat',c1:'#c0392b',c2:'#8e2a20',legs:'#2a2a33'},
 rashid:{skin:'P',hair:'slick',glasses:'round',body:'suit',c1:'#3b3f4a',c2:'#262931',shirt:'#e9edf2',tie:'#6b1f2a',legs:'#23262e',mustache:false},
 police:{skin:'P',hair:'short',hat:'police',body:'uniform',c1:'#24345c',c2:'#18233f',shirt:'#cfd8e6',legs:'#18233f'},
};
let uid=0;
function makeChar(parent,kind){
  const S=STY[kind];const id='c'+(uid++);const C={kind};
  const skin=S.skin==='C'?'url(#skinC)':'url(#skinP)';const skinFlat=S.skin==='C'?'#e8a676':'#d79a6a';
  const root=el('g',{},parent);C.root=root;
  el('ellipse',{cx:0,cy:575,rx:150,ry:22,fill:'#000',opacity:.35,filter:'url(#sh)'},root);
  C.legs=el('path',{class:'o',fill:'none','stroke-width':14,stroke:S.legs},root);
  C.feet=el('path',{class:'o',fill:'#121212'},root);
  const body=el('g',{},root);C.body=body;
  const w=S.round?118:(S.body==='kaftan'||S.body==='coat'?108:98);
  const gid=id+'g';const lg=el('linearGradient',{id:gid,x1:0,y1:0,x2:1,y2:0},body);el('stop',{offset:0,'stop-color':S.c2},lg);el('stop',{offset:.42,'stop-color':S.c1},lg);el('stop',{offset:1,'stop-color':S.c2},lg);
  const len=S.body==='kaftan'||S.body==='coat'?380:315;
  el('path',{class:'o',fill:`url(#${gid})`,d:`M-82 30 Q-90 6 -40 -2 L40 -2 Q90 6 82 30 L${w} ${len} Q0 ${len+20} -${w} ${len} Z`},body);
  if(S.shirt){el('path',{class:'o',fill:S.shirt,'stroke-width':3,d:'M-30 -2 L0 60 L30 -2Z'},body);}
  if(S.tie)el('path',{class:'o','stroke-width':3,fill:S.tie,d:'M-8 18 L8 18 L12 110 L0 125 L-12 110Z'},body);
  if(S.body==='suit'||S.body==='uniform'||S.body==='waiter'){el('path',{fill:'none',stroke:'#000',opacity:.35,'stroke-width':4,d:'M-30 -2 L-10 120 M30 -2 L10 120'},body);for(let i=0;i<3;i++)el('circle',{cx:0,cy:150+i*45,r:6,fill:'#d4c27a'},body);}
  if(S.body==='apron'){el('path',{class:'o',fill:'#ffffff',d:'M-60 90 L60 90 L80 320 L-80 320Z'},body);C.flourB=el('g',{},body);for(const [x,y,r] of [[-30,180,14],[25,240,18],[40,140,10]])el('circle',{cx:x,cy:y,r,fill:'#fff',opacity:.9},C.flourB);}
  if(S.body==='kaftan'){el('path',{fill:'none',stroke:'#e9c46a','stroke-width':6,d:'M0 30 L0 370'},body);for(let i=0;i<6;i++)el('circle',{cx:0,cy:60+i*50,r:6,fill:'#e9c46a'},body);}
  if(S.shawl){C.shawl=el('path',{class:'o',fill:S.shawl,d:'M-95 20 Q0 90 95 20 L105 120 Q0 160 -105 120Z'},body);}
  if(S.body==='coat'){el('path',{fill:'none',stroke:'#000',opacity:.3,'stroke-width':5,d:'M0 20 L0 380 M-60 200 L-20 200'},body);el('path',{class:'o',fill:S.c2,d:'M-40 -2 L-75 60 L-20 50Z M40 -2 L75 60 L20 50Z'},body);}
  if(S.body==='vest'){el('path',{class:'o',fill:S.shirt,d:'M-40 -2 L40 -2 L30 300 L-30 300Z'},body);el('path',{class:'o',fill:S.c1,d:'M-82 30 L-30 0 L-20 300 L-98 300Z M82 30 L30 0 L20 300 L98 300Z'},body);el('path',{d:'M-20 120 Q10 140 25 115',stroke:'#d4a73a','stroke-width':4,fill:'none'},body);}
  if(S.scarf)el('path',{class:'o',fill:S.scarf,d:'M-55 -4 Q0 30 55 -4 L58 20 Q0 52 -58 20Z M30 20 L45 110 L25 112 L15 30Z'},body);
  if(S.body==='hoodie'){el('path',{class:'o',fill:S.c2,d:'M-60 210 L60 210 L66 290 L-66 290Z'},body);}
  el('path',{d:'M-70 50 Q-78 150 -74 280',stroke:'#fff',opacity:.14,'stroke-width':10,fill:'none','stroke-linecap':'round'},body);
  C.arms={};
  for(const s of ['l','r']){const g=el('g',{},root);
    const up=el('path',{class:'o',fill:'none',stroke:S.c1,'stroke-width':22},g);const upI=el('path',{fill:'none',stroke:S.c1,'stroke-width':14,'stroke-linecap':'round'},g);
    const item=el('g',{},g);const hand=el('g',{},g);el('circle',{class:'o',r:21,fill:skin},hand);
    const finger=el('path',{class:'o','stroke-width':4,fill:skinFlat,d:'M-6 -14 L-7 -46 Q0 -54 7 -46 L6 -14Z',opacity:0},hand);
    C.arms[s]={g,up,upI,hand,item,finger};}
  const head=el('g',{},root);C.head=head;
  if(S.hair==='bob')el('path',{class:'o',fill:'url(#hairG)',d:'M-150 60 Q-170 -150 0 -160 Q170 -150 150 60 Q120 80 110 20 L-110 20 Q-120 80 -150 60Z'},head);
  if(S.hair==='scarf')el('path',{class:'o',fill:S.scarfC,d:'M-165 40 Q-175 -175 0 -180 Q175 -175 165 40 Q150 150 0 160 Q-150 150 -165 40Z'},head);
  el('circle',{class:'o',cx:-142,cy:0,r:28,fill:skin},head);el('circle',{class:'o',cx:142,cy:0,r:28,fill:skin},head);
  el('circle',{class:'o',cx:0,cy:0,r:142,fill:skin},head);
  el('ellipse',{cx:-55,cy:-70,rx:45,ry:26,fill:'#fff',opacity:.28,transform:'rotate(-30 -55 -70)'},head);
  el('ellipse',{cx:-80,cy:45,rx:28,ry:15,fill:'#ff6b6b',opacity:.22},head);el('ellipse',{cx:80,cy:45,rx:28,ry:15,fill:'#ff6b6b',opacity:.22},head);
  if(S.age)for(const sx of [-1,1])el('path',{d:`M${sx*95} -20 q${sx*12} 8 ${sx*20} 0 M${sx*92} -5 q${sx*12} 8 ${sx*20} 0`,stroke:'#8a5a3c',opacity:S.age*.8,'stroke-width':3,fill:'none'},head);
  const H={messy:'M-140 -20 Q-150 -140 -20 -150 Q110 -160 142 -40 Q120 -100 70 -95 Q75 -70 40 -60 Q30 -95 -10 -95 Q-20 -70 -60 -75 Q-60 -100 -100 -90 Q-130 -60 -140 -20Z',
    short:'M-140 -30 Q-140 -150 0 -152 Q140 -150 140 -30 Q120 -95 0 -98 Q-120 -95 -140 -30Z',
    slick:'M-142 -20 Q-150 -150 10 -152 Q150 -145 142 -30 Q100 -110 -20 -100 Q-110 -95 -142 -20Z',
    bob:'M-142 -10 Q-150 -150 0 -152 Q150 -150 142 -10 Q120 -100 30 -105 Q-10 -70 -60 -100 Q-120 -90 -142 -10Z',
    bald:'M-142 -10 Q-140 -60 -120 -70 L-110 -20Z M142 -10 Q140 -60 120 -70 L110 -20Z'};
  if(S.hair!=='scarf'&&H[S.hair])el('path',{class:'o',fill:S.hair==='bald'?'#eeeeee':'url(#hairG)',d:H[S.hair]},head);
  if(S.hair==='scarf'){el('path',{class:'o',fill:S.scarfC,d:'M-142 -20 Q-140 -150 0 -152 Q140 -150 142 -20 Q100 -100 0 -105 Q-100 -100 -142 -20Z'},head);el('path',{d:'M-90 -120 Q-20 -150 50 -140',stroke:'#fff',opacity:.25,'stroke-width':12,fill:'none','stroke-linecap':'round'},head);}
  C.eyes=[];
  for(const sx of [-52,52]){const g=el('g',{transform:`translate(${sx} -8)`},head);
    const cp=el('clipPath',{id:id+'e'+sx},g);el('ellipse',{rx:26,ry:29},cp);
    el('ellipse',{rx:26,ry:29,fill:'#fff'},g);const pup=el('circle',{r:12,fill:'#17120f'},g);const hl=el('circle',{r:4,fill:'#fff'},g);
    const lid=el('rect',{x:-30,y:-34,width:60,height:0,fill:skinFlat,'clip-path':`url(#${id}e${sx})`},g);
    const lidLine=el('path',{fill:'none',stroke:'#17120f','stroke-width':5,'stroke-linecap':'round'},g);
    el('ellipse',{class:'o',rx:26,ry:29,fill:'none','stroke-width':4},g);
    const brow=el('path',{fill:'none',stroke:S.beard==='white'?'#ddd':'#1a120d','stroke-width':11,'stroke-linecap':'round'},head);
    C.eyes.push({sx,pup,hl,lid,lidLine,brow});}
  if(S.glasses){const r=S.glasses==='small'?24:34;for(const sx of [-52,52])el('circle',{cx:sx,cy:-8,r,fill:'#cfe6ff','fill-opacity':.12,stroke:'#17120f','stroke-width':6},head);el('path',{d:`M${-52+r} -8 L${52-r} -8`,stroke:'#17120f','stroke-width':6},head);}
  el('path',{class:'o',fill:'none','stroke-width':4,d:'M-6 22 Q-14 40 2 44'},head);
  if(S.beard==='white'){el('path',{class:'o',fill:'#f2f2f2',d:'M-120 30 Q-110 170 0 190 Q110 170 120 30 Q80 110 40 100 Q0 120 -40 100 Q-80 110 -120 30Z'},head);}
  C.mouth=el('path',{class:'o','stroke-width':4,fill:'#5a1414'},head);C.tongue=el('path',{fill:'#e05a5a'},head);
  if(S.mustache||S.beard)el('path',{class:'o',fill:S.beard?'#f2f2f2':'#2a1c14','stroke-width':3,d:'M-48 62 Q-30 44 0 52 Q30 44 48 62 Q30 70 0 62 Q-30 70 -48 62Z'},head);
  if(S.flour){C.flour=el('g',{},head);for(const [x,y,r] of [[-85,50,22],[80,55,18],[30,-60,10]])el('circle',{cx:x,cy:y,r,fill:'#fff',opacity:.85},C.flour);}
  if(S.hat==='redcap'){el('path',{class:'o',fill:'#d62828',d:'M-138 -48 Q-140 -160 0 -168 Q140 -160 138 -48 Q0 -70 -138 -48Z'},head);el('path',{class:'o',fill:'#a61b1b',d:'M-150 -50 Q0 -88 150 -50 Q160 -30 140 -26 Q0 -54 -140 -26 Q-160 -30 -150 -50Z'},head);el('path',{d:'M-90 -130 Q-40 -155 20 -150',stroke:'#fff',opacity:.3,'stroke-width':10,fill:'none','stroke-linecap':'round'},head);}
  if(S.hat==='chef'){el('path',{class:'o',fill:'#ffffff',d:'M-110 -80 L-110 -130 Q-170 -170 -120 -230 Q-90 -290 -20 -260 Q30 -320 90 -260 Q170 -260 130 -170 Q150 -140 110 -130 L110 -80Z'},head);el('rect',{class:'o',x:-115,y:-100,width:230,height:40,rx:8,fill:'#f0f0f0'},head);}
  if(S.hat==='police'){el('path',{class:'o',fill:'#1b2a50',d:'M-150 -60 Q-140 -190 0 -190 Q140 -190 150 -60Z'},head);el('rect',{class:'o',x:-155,y:-70,width:310,height:34,rx:10,fill:'#0f1a36'},head);el('circle',{cx:0,cy:-120,r:20,fill:'#e9c46a',stroke:'#17120f','stroke-width':4},head);}
  root.appendChild(C.arms.l.g);root.appendChild(C.arms.r.g);
  C.update=function(p){
    const s=p.s||1;
    root.setAttribute('transform',`translate(${p.x} ${p.y}) scale(${(p.flip?-1:1)*s} ${s}) rotate(${p.lean||0} 0 560)`);
    root.style.filter=p.dark?`brightness(${1-p.dark})`:'';
    root.setAttribute('opacity',p.op??1);
    const br=Math.sin((p.t||0)*2.2)*3;
    body.setAttribute('transform',`translate(0 ${br*.3}) scale(1 ${1+br*.002})`);
    const wk=p.walk;let l1='M-38 300 L-42 560',l2='M38 300 L42 560',a=0,b=0;if(wk!==undefined){a=Math.sin(wk)*26;b=-a;l1=`M-38 300 L${-42+a} 560`;l2=`M38 300 L${42+b} 560`;}
    C.legs.setAttribute('d',l1+' '+l2);C.feet.setAttribute('d',`M${-70+a} 560 Q${-42+a} 540 ${-16+a} 560 Z M${70+b} 560 Q${42+b} 540 ${16+b} 560 Z`);
    head.setAttribute('transform',`translate(${p.hdx||0} ${-150+(p.hdy||0)+br*.5}) rotate(${p.hrot||0})`);
    const lidv=cl(Math.max(p.lid??.3,p.blink||0));
    for(const e of C.eyes){const ex=(p.ex||0)*12,ey=(p.ey||0)*12;e.pup.setAttribute('cx',ex);e.pup.setAttribute('cy',ey);e.hl.setAttribute('cx',ex+4);e.hl.setAttribute('cy',ey-5);
      e.lid.setAttribute('height',lidv*60);const ly=-29+lidv*58;e.lidLine.setAttribute('d',lidv>.02?`M-27 ${ly} Q0 ${ly+(lidv>.95?8:3)} 27 ${ly}`:'');
      const bb=p.brow||0,inner=e.sx<0?1:-1,by=-62-(p.browUp||0)*14,ox=e.sx-inner*36,ix=e.sx+inner*30;e.brow.setAttribute('d',`M${ox} ${by-bb*4} Q${e.sx} ${by-10} ${ix} ${by+bb*16}`);}
    const m=cl(p.mouth||0),mw=(p.mw||1)*34,sm=p.smile||0;
    if(m<.06){C.mouth.setAttribute('d',`M${-mw} 82 Q0 ${82+sm*16} ${mw} 82`);C.mouth.setAttribute('fill','none');C.tongue.setAttribute('d','');}
    else{const h=6+m*46;C.mouth.setAttribute('fill','#5a1414');C.mouth.setAttribute('d',`M${-mw} 80 Q0 ${74-h*.15} ${mw} 80 Q${mw*.8} ${80+h} 0 ${80+h} Q${-mw*.8} ${80+h} ${-mw} 80Z`);
      C.tongue.setAttribute('d',`M${-mw*.5} ${80+h*.75} Q0 ${80+h*.45} ${mw*.5} ${80+h*.75} Q0 ${80+h*.98} ${-mw*.5} ${80+h*.75}Z`);}
    if(C.flour)C.flour.setAttribute('opacity',p.flour??1);
    for(const sd of ['l','r']){const A=C.arms[sd];const sx=sd==='l'?-78:78,sy=34;const [tx,ty]=p[sd]||[sd==='l'?-110:110,250];
      const L1=118,L2=110;let dx=tx-sx,dy=ty-sy;let d=Math.hypot(dx,dy);const dm=L1+L2-1;if(d>dm){dx*=dm/d;dy*=dm/d;d=dm;}
      const aa=Math.atan2(dy,dx);const cb=cl((L1*L1+d*d-L2*L2)/(2*L1*d),-1,1);const bb=Math.acos(cb);const bend=(sd==='l'?1:-1)*(p[sd+'bend']||1);
      const ea=aa+bend*bb;const ex=sx+L1*Math.cos(ea),ey=sy+L1*Math.sin(ea);const hx=sx+dx,hy=sy+dy;const dp=`M${sx} ${sy} L${ex} ${ey} L${hx} ${hy}`;
      A.up.setAttribute('d',dp);A.upI.setAttribute('d',dp);A.hand.setAttribute('transform',`translate(${hx} ${hy}) rotate(${p[sd+'rot']||0})`);A.finger.setAttribute('opacity',p[sd+'point']?1:0);
      A.item.setAttribute('transform',`translate(${hx} ${hy}) rotate(${p[sd+'irot']||0}) scale(${p[sd+'is']||1})`);
      const want=p[sd+'item']||'';if(A.item.dataset.k!==want){A.item.dataset.k=want;A.item.innerHTML='';if(want&&ITEMS[want])ITEMS[want](A.item);}}
  };
  return C;
}
const ITEMS={
 keys:g=>{el('circle',{r:34,fill:'none',stroke:'#c9a227','stroke-width':7},g);for(let i=0;i<5;i++){const a=i*.5+1.2;el('path',{d:`M${Math.cos(a)*34} ${Math.sin(a)*34} l${Math.cos(a)*40} ${Math.sin(a)*40}`,stroke:'#d8b648','stroke-width':8,'stroke-linecap':'round'},g);}},
 key:g=>{el('circle',{cx:0,cy:0,r:14,fill:'none',stroke:'#d8b648','stroke-width':7},g);el('path',{d:'M0 14 L0 70 M0 56 L14 56 M0 66 L12 66',stroke:'#d8b648','stroke-width':7,'stroke-linecap':'round'},g);},
 cup:g=>{el('path',{class:'o',d:'M-26 -40 L26 -40 L20 10 L-20 10Z',fill:'#f4f4f4'},g);el('path',{d:'M26 -30 q18 6 0 26',stroke:'#17120f','stroke-width':5,fill:'none'},g);el('ellipse',{cx:0,cy:-40,rx:26,ry:7,fill:'#5a3a22'},g);},
 tea:g=>{el('path',{class:'o',d:'M-40 0 Q-46 -60 0 -64 Q46 -60 40 0Z',fill:'#cfd3da'},g);el('path',{class:'o',d:'M38 -40 L74 -66',stroke:'#17120f','stroke-width':8},g);el('circle',{cx:0,cy:-70,r:10,fill:'#cfd3da',stroke:'#17120f','stroke-width':4},g);},
 tray:g=>{el('ellipse',{class:'o',cx:0,cy:0,rx:110,ry:26,fill:'#c9b16a'},g);el('path',{class:'o',d:'M-70 -10 Q-70 -60 -30 -60 Q10 -60 10 -10Z',fill:'#d99a4e'},g);el('path',{class:'o',d:'M30 -10 Q26 -70 60 -72 Q94 -70 90 -10Z',fill:'#cfd3da'},g);},
 camera:g=>{el('rect',{class:'o',x:-50,y:-40,width:100,height:70,rx:12,fill:'#2b2f38'},g);el('circle',{cx:0,cy:-5,r:24,fill:'#111',stroke:'#7f8ea3','stroke-width':6},g);el('rect',{x:20,y:-52,width:22,height:14,rx:4,fill:'#2b2f38'},g);},
 bag:g=>{el('rect',{class:'o',x:-70,y:-10,width:140,height:100,rx:16,fill:'#7a4a26'},g);el('path',{class:'o',d:'M-30 -10 Q-30 -45 0 -45 Q30 -45 30 -10',fill:'none','stroke-width':7},g);el('rect',{x:-70,y:20,width:140,height:10,fill:'#5c3519'},g);},
 phone:g=>{el('rect',{class:'o',x:-34,y:-100,width:68,height:126,rx:12,fill:'#15171c'},g);el('rect',{x:-28,y:-94,width:56,height:112,rx:8,fill:'#bfe0ff'},g);},
 letter:g=>{el('rect',{class:'o',x:-50,y:-90,width:100,height:120,rx:6,fill:'#f4ecd8'},g);for(let i=0;i<4;i++)el('path',{d:`M-34 ${-66+i*24} L34 ${-66+i*24}`,stroke:'#8a7a5a','stroke-width':5},g);},
 note:g=>{el('rect',{class:'o',x:-40,y:-50,width:80,height:60,rx:4,fill:'#fff6c8'},g);},
 watch:g=>{el('circle',{r:40,fill:'#e9c46a',stroke:'#7a5a12','stroke-width':6},g);el('circle',{r:30,fill:'#fff8e0'},g);el('path',{d:'M0 0 L0 -22 M0 0 L14 6',stroke:'#17120f','stroke-width':5,'stroke-linecap':'round'},g);el('rect',{x:-8,y:-56,width:16,height:14,rx:4,fill:'#e9c46a'},g);el('circle',{r:70,fill:'url(#glowG)'},g);},
 flourbag:g=>{el('path',{class:'o',d:'M-60 40 Q-70 -60 -40 -80 L40 -80 Q70 -60 60 40Z',fill:'#efe6d2'},g);},
 tools:g=>{el('path',{d:'M-20 -60 L-20 30 M10 -50 L30 30',stroke:'#9aa3b5','stroke-width':10,'stroke-linecap':'round'},g);},
 notebook:g=>{el('rect',{class:'o',x:-55,y:-75,width:110,height:140,rx:8,fill:'#8e2a20'},g);el('rect',{x:-45,y:-65,width:90,height:120,rx:4,fill:'#f4ecd8'},g);},
};
