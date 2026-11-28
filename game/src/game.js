
// ===================== GAME: لغز مرسى الصويرة — اللغز 1 =====================
const WORDS=__WORDS__;
const LW={};WORDS.forEach(([l,w,a,b])=>{(LW[l]=LW[l]||[]).push({w,t0:a,t1:b});});
const LT0=l=>LW[l][0].t0, LT1=l=>LW[l][LW[l].length-1].t1;
const $=id=>document.getElementById(id);
const HY=1.7;

// ---------- renderer sizing ----------
R.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
function resize(){const w=Math.max(1,innerWidth),h=Math.max(1,innerHeight);R.setSize(w,h,false);camera.aspect=w/h;camera.fov=w<h?55:42;camera.updateProjectionMatrix();}
addEventListener('resize',resize);resize();
key.shadow.camera.left=-30;key.shadow.camera.right=30;key.shadow.camera.top=30;key.shadow.camera.bottom=-30;key.shadow.camera.updateProjectionMatrix();
key.target.position.set(0,0,14);key.position.set(-60,40,-66);

// ---------- scene setup: port at dusk ----------
setEnv('port','dusk');
const port=ENVS.port;const moored=port.userData.moored;
moored[33].visible=false;moored[34].visible=false; // free a berth for Mabrouka
const MAB_HOME=[-0.5,26.8];
mab.position.set(MAB_HOME[0],0,MAB_HOME[1]);mab.rotation.y=Math.PI/2;
// name plate on Mabrouka
function labelTex(str,w=512,h=128,bg='#f4efe4',fg='#1f3c6e',size=74){return tex(w,h,(g)=>{g.fillStyle=bg;g.fillRect(0,0,w,h);g.fillStyle=fg;g.font=`800 ${size}px Cairo, sans-serif`;g.textAlign='center';g.textBaseline='middle';g.direction='rtl';g.fillText(str,w/2,h/2+4);});}
// folded dry net (neat stack) + floats
const netStack=new THREE.Group();netStack.position.set(4.6,HY,20.3);port.add(netStack);
for(let i=0;i<3;i++){const b=outline(M(new THREE.BoxGeometry(1.7-i*.2,.22,1.2-i*.12),netM,0,.12+i*.23,0,netStack),1.03);b.rotation.y=(i-1)*.08;}
for(let k=0;k<5;k++)outline(M(new THREE.SphereGeometry(.13,10,8),C(k%2?'#f2c21b':'#e0592a'),-.7+k*.35,.78,.45,netStack),1.08);
// sardine crates
const crateG=new THREE.Group();crateG.position.set(-2.9,HY,20.6);port.add(crateG);
for(const [x,y,z,r] of [[-.75,.3,0,.05],[.75,.3,.1,-.08],[0,.92,.05,.03]]){const c=new THREE.Group();c.position.set(x,y,z);c.rotation.y=r;crateG.add(c);outline(M(new THREE.BoxGeometry(1.4,.6,1),C('#e9e2d0'),0,0,0,c),1.05);M(new THREE.PlaneGeometry(1.3,.9),TM(fishTex),0,.31,0,c).rotation.x=-Math.PI/2;}
// weather board
const board=new THREE.Group();board.position.set(-1.5,HY,6.2);port.add(board);
for(const s of[-1,1])outline(M(new THREE.CylinderGeometry(.09,.09,3.4,8),C('#2a2a30'),s*1.3,1.7,0,board),1.08);
outline(M(new THREE.BoxGeometry(3,2,.14),C('#1d5fa8'),0,2.75,0,board),1.03);
const boardFace=new THREE.Mesh(new THREE.PlaneGeometry(2.76,1.78),new THREE.MeshBasicMaterial({color:'#ffffff'}));boardFace.position.set(0,2.75,.08);board.add(boardFace);
function paintBoard(){const t=tex(768,496,(g,w,h)=>{g.fillStyle='#f4f6fb';g.fillRect(0,0,w,h);g.fillStyle='#1d5fa8';g.fillRect(0,0,w,92);g.fillStyle='#fff';g.font='800 56px Cairo, sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('الطقس اليوم',w/2,48);
  g.fillStyle='#17120f';g.textAlign='right';g.font='800 50px Cairo, sans-serif';g.fillText('الريح:',w-40,170);g.fillText('الموج:',w-40,280);g.fillText('البحر:',w-40,390);
  g.textAlign='left';g.fillStyle='#1d5fa8';g.fillText('10 km/h',60,170);g.fillText('0.5 m',60,280);g.fillStyle='#2e8b57';g.fillText('هادي',60,390);
  g.strokeStyle='#17120f';g.lineWidth=8;g.strokeRect(4,4,w-8,h-8);});boardFace.material.map=t;boardFace.material.needsUpdate=true;}
document.fonts.load('800 50px Cairo').then(paintBoard,paintBoard);
// clue markers
const markTex=tex(128,128,(g)=>{g.fillStyle='#ffd166';g.beginPath();g.arc(64,64,54,0,7);g.fill();g.lineWidth=8;g.strokeStyle='#17120f';g.stroke();g.fillStyle='#17120f';g.font='900 84px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('!',64,70);});
function marker(){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:markTex,depthTest:false,transparent:true,sizeAttenuation:false}));s.scale.set(.075,.075,1);s.renderOrder=10;scene.add(s);return s;}

// ---------- clues & hotspots ----------
const CLUES={
 boat:'مبروكة نقية بزاف، بحال إلا ما خرجاتش للبحر',
 net:'الشبكة مطوية مزيان وناشفة',
 story:'يونس: موجة كبيرة مع الطناش، والتلاتة طاحو فالبحر',
 clothes:'الحوايج والصباط ديال يونس ناشفين',
 crates:'الصناديق عامرين بالسردين',
 weather:'الطقس: الريح 10 كم/س، الموج نص ميترو، البحر هادي',
};
const SPOTS=[
 {id:'younes',label:'هضر مع يونس',pos:[1.6,18.6],mk:[1.6,HY+4.9,20.4],segs:[[17,19,'story'],[25,25,'clothes']],
  cams:[{eye:[2.1,HY+3.7,15.4],at:[1.6,HY+3.35,20.4]},{eye:[1.2,HY+2.3,16.9],at:[1.6,HY+1.6,20.4]}]},
 {id:'boat',label:'فتش الفلوكة',pos:[-.5,22.2],mk:[-.5,3.2,26.8],segs:[[23,23,'boat']],cams:[{eye:[-2.5,8.5,16.5],at:[-.5,1.2,26.8]}]},
 {id:'net',label:'شوف الشبكة',pos:[4.6,18.7],mk:[4.6,HY+1.8,20.3],segs:[[24,24,'net']],cams:[{eye:[3.3,HY+4,15.8],at:[4.6,HY+.4,20.3]}]},
 {id:'crates',label:'حل الصناديق',pos:[-2.9,18.9],mk:[-2.9,HY+2.2,20.6],segs:[[26,26,'crates']],cams:[{eye:[-2.4,HY+4.1,16],at:[-2.9,HY+.7,20.6]}]},
 {id:'weather',label:'قرا لوحة الطقس',pos:[-1.5,8],mk:[-1.5,HY+4.4,6.2],segs:[[27,30,'weather']],cams:[{eye:[-1.5,HY+3.1,14.2],at:[-1.5,HY+2.7,6.2]}]},
];
SPOTS.forEach(s=>{s.done=false;s.m=marker();});
const found=[];

// ---------- people on the quay ----------
const NPC={
 younes:{x:1.6,z:20.4,ry:180,o:{lid:.15,browUp:.6,ey:.2}},
 mother:{x:2.9,z:20.9,ry:-120,o:{lid:.45,cry:1,browUp:.5}},
 wife1:{x:-5.4,z:19.6,ry:150,o:{lid:.5,cry:1,browUp:.4,pose:'wipe'}},
 wife2:{x:-6.5,z:18.7,ry:130,o:{lid:.55,cry:1,browUp:.4}},
 fisher:{x:6.6,z:17.8,ry:-130,o:{lid:.35,browUp:.3}},
};
const OBST=[...Object.values(NPC).map(n=>[n.x,n.z,.85]),[4.6,20.3,1.1],[-2.9,20.6,1.2],[-2.8,6.2,.3],[-.2,6.2,.3],[8.3,14.6,1.6],[10.9,13.4,1.6],[-4,21.5,.35],[3,21.5,.35],[10,21.5,.35],[-1,19,.5],[.6,19,.5],[2.2,19,.5]];
OBST.splice(OBST.length-3,3); // rings are flat: walkable

// ---------- audio ----------
const audio=$('vo');const AC=window.AudioContext||window.webkitAudioContext;let actx=null,an=null,abuf=null,vbuf=null,bsrc=null;
try{actx=new AC();}catch(e){}
const audioReady=fetch('voice_p1.mp3').then(r=>r.arrayBuffer()).then(ab=>new Promise((res,rej)=>{const p=actx.decodeAudioData(ab,res,rej);if(p&&p.then)p.then(res,rej);})).then(b=>{vbuf=b;}).catch(()=>{vbuf=null;});
function initAudio(){try{if(!actx)actx=new AC();if(actx.state!=='running')actx.resume();if(!an){an=actx.createAnalyser();an.fftSize=512;an.connect(actx.destination);abuf=new Float32Array(an.fftSize);}}catch(e){an=null;}}
let mouthV=0;
function voiceLevel(t){let v=0;if(an&&seg&&seg.mode==='buf'){an.getFloatTimeDomainData(abuf);let s=0;for(let i=0;i<abuf.length;i++)s+=abuf[i]*abuf[i];const db=20*Math.log10(Math.sqrt(s/abuf.length)+1e-9);v=cl((db+46)/26);}else if(seg){v=.5+.5*Math.sin(t*22)*Math.sin(t*7);}mouthV=lerp(mouthV,v,.5);return mouthV;}
let seg=null;
function stopSound(){if(bsrc){try{bsrc.stop();}catch(e){}bsrc.disconnect();bsrc=null;}audio.pause();}
function playSeg(l0,l1,onEnd){stopSound();const t0=Math.max(0,LT0(l0)-.08),t1=LT1(l1)+.35;seg={t0,t1,onEnd,wall:performance.now(),useWall:false,mode:'wall'};
  if(vbuf&&actx&&an){bsrc=actx.createBufferSource();bsrc.buffer=vbuf;bsrc.connect(an);seg.ctx0=actx.currentTime;bsrc.start(0,t0,t1-t0+.2);seg.mode='buf';return;}
  seg.mode='el';const seekNow=()=>{try{audio.currentTime=t0;}catch(e){}};if(audio.readyState>=1)seekNow();else audio.addEventListener('loadedmetadata',seekNow,{once:true});const p=audio.play();if(p&&p.catch)p.catch(()=>{if(seg)seg.useWall=true;});}
function rawTime(){if(seg.mode==='buf')return seg.t0+(actx.currentTime-seg.ctx0);if(seg.mode==='el'&&audio.readyState>=2){const a=audio.currentTime;if(a>=seg.t0-1&&a<=seg.t1+1)return a;}return null;}
function segTime(){if(!seg)return 0;const w=seg.t0+(performance.now()-seg.wall)/1000;if(seg.useWall||seg.mode==='wall')return w;const r=rawTime();return r==null?w:r;}
function endSeg(){if(!seg)return;stopSound();const s=seg;seg=null;setCap('');s.onEnd&&s.onEnd();}
// captions chunks
const CHK=[];{let cur=null;WORDS.forEach(([l,w,a,b],i)=>{const p=WORDS[i-1];const brk=!cur||cur.ws.length>=4||(cur.ws.join(' ')+' '+w).length>26||(p&&/[،.:؟…]$/.test(p[1]))||(p&&a-p[3]>.35);if(brk){cur={ws:[],t0:a};CHK.push(cur);}cur.ws.push(w);cur.t1=b;});CHK.forEach((c,i)=>{const n=CHK[i+1];c.end=n?Math.min(n.t0,c.t1+.5):c.t1+.6;c.txt=c.ws.join(' ').replace(/[،.:]/g,'');});}
let capNow='';function setCap(s){if(s!==capNow){capNow=s;$('cap').textContent=s;$('cap').hidden=!s;}}
function captions(t){let c=null;for(const k of CHK){if(t>=k.t0-.03&&t<k.end){c=k;}}setCap(c?c.txt:'');}

// ---------- input: joystick, drag-to-look, keyboard ----------
const joy={x:0,y:0,id:null,cx:0,cy:0};const base=$('joy'),knob=$('knob');
base.addEventListener('pointerdown',e=>{e.preventDefault();joy.id=e.pointerId;const r=base.getBoundingClientRect();joy.cx=r.left+r.width/2;joy.cy=r.top+r.height/2;base.setPointerCapture(e.pointerId);moveJoy(e);});
base.addEventListener('pointermove',e=>{if(e.pointerId===joy.id)moveJoy(e);});
const relJoy=e=>{if(e.pointerId!==joy.id)return;joy.id=null;joy.x=joy.y=0;knob.style.transform='translate(-50%,-50%)';};
base.addEventListener('pointerup',relJoy);base.addEventListener('pointercancel',relJoy);
function moveJoy(e){const R0=base.clientWidth/2;let dx=e.clientX-joy.cx,dy=e.clientY-joy.cy;const d=Math.hypot(dx,dy);if(d>R0){dx*=R0/d;dy*=R0/d;}joy.x=dx/R0;joy.y=dy/R0;knob.style.transform=`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px))`;}
let camYaw=0,camPitch=.36;const look={id:null,x:0,y:0};const cv=$('c');
cv.addEventListener('pointerdown',e=>{if(state!=='play')return;look.id=e.pointerId;look.x=e.clientX;look.y=e.clientY;cv.setPointerCapture(e.pointerId);});
cv.addEventListener('pointermove',e=>{if(e.pointerId!==look.id)return;camYaw-=(e.clientX-look.x)*.006;camPitch=cl(camPitch+(e.clientY-look.y)*.003,.12,.75);look.x=e.clientX;look.y=e.clientY;});
const relLook=e=>{if(e.pointerId===look.id)look.id=null;};cv.addEventListener('pointerup',relLook);cv.addEventListener('pointercancel',relLook);
const keys={};addEventListener('keydown',e=>{keys[e.code]=true;if((e.code==='KeyE'||e.code==='Space'||e.code==='Enter')&&state==='play'&&near){e.preventDefault();act();}});addEventListener('keyup',e=>{keys[e.code]=false;});

// ---------- player ----------
const pl={x:-1,z:12,ry:0,walk:0,moving:false};
function collide(nx,nz){nx=cl(nx,-8.4,10.4);nz=cl(nz,1.6,22.5);
  if(nx>-8.9&&nx<-3.1&&nz>.7&&nz<5.5){const dl=nx+8.9,dr=-3.1-nx,dz=5.5-nz;const m=Math.min(dl,dr,dz);if(m===dz)nz=5.5;else if(m===dr)nx=-3.1;else nx=-8.9;}
  for(const [ox,oz,r] of OBST){const dx=nx-ox,dz=nz-oz,d=Math.hypot(dx,dz),rr=r+.55;if(d<rr&&d>1e-4){nx=ox+dx/d*rr;nz=oz+dz/d*rr;}}
  return [nx,nz];}

// ---------- state machine ----------
let state='title',near=null,inspect=null,mistakes=0,tClock=0,finalShot=null;
const camP=new THREE.Vector3(26,16,46),camA=new THREE.Vector3(0,2,10);
let DT=1/60;function setCam(eye,at,k){k=1-Math.pow(1-k,DT*60);camP.lerp(new THREE.Vector3(...eye),k);camA.lerp(new THREE.Vector3(...at),k);camera.position.copy(camP);camera.lookAt(camA);}
function show(id,on){$(id).hidden=!on;}
function setObjective(s){$('obj').textContent=s;}
function updateCount(){$('nbn').textContent=found.length;}
function toast(s){const t=$('toast');t.textContent=s;t.hidden=false;t.classList.remove('pop');void t.offsetWidth;t.classList.add('pop');clearTimeout(toast.h);toast.h=setTimeout(()=>t.hidden=true,2600);}

$('start').addEventListener('click',()=>{initAudio();show('title',false);startIntro();});
$('skip').addEventListener('click',()=>{if(state!=='intro')return;seg=null;stopSound();setCap('');startPlay();});
$('act').addEventListener('click',()=>{if(state==='play'&&near)act();});
$('nbbtn').addEventListener('click',()=>{renderNotebook();show('nb',true);});
$('nbclose').addEventListener('click',()=>show('nb',false));
$('again').addEventListener('click',()=>location.reload());

function startIntro(){state='intro';show('skip',true);show('cap',true);playSeg(1,22,startPlay);}
function startPlay(){state='play';show('skip',false);show('hud',true);show('ctrl',true);pl.x=-1;pl.z=12;pl.ry=0;camYaw=0;
  setObjective('فتش المرسى والفلوكة: لقا الأدلة وكتبهم فالكارني');updateCount();toast('حرك الشخصية بالجويستيك، وجر الشاشة باش تدور الكاميرا');}
function act(){const s=near;if(!s)return;state='inspect';show('ctrl',false);inspect={s,i:0};runSeg();}
function runSeg(){const {s,i}=inspect;const [a,b,clue]=s.segs[i];inspect.cam=s.cams[i]||s.cams[0];inspect.l0=a;
  playSeg(a,b,()=>{if(!found.includes(clue)){found.push(clue);updateCount();toast('تزاد للكارني: '+CLUES[clue]);}
    if(i+1<s.segs.length){inspect.i++;runSeg();return;}
    s.done=true;s.m.visible=false;inspect=null;
    if(found.length>=Object.keys(CLUES).length){finale();return;}
    state='play';show('ctrl',true);const left=SPOTS.filter(x=>!x.done).length;setObjective(`باقي ${left} ${left===1?'بلاصة':'بلايص'} فيهم أدلة`);});}
function finale(){state='inspect';inspect={s:null,cam:null,l0:31,writing:true};setObjective('كتب فالكارني');
  playSeg(31,33,()=>{inspect=null;openQuiz();});}

// ---------- quiz ----------
function renderNotebook(){const ul=$('nblist');ul.innerHTML='';Object.keys(CLUES).forEach(k=>{const li=document.createElement('li');const got=found.includes(k);li.className=got?'got':'miss';li.textContent=got?CLUES[k]:'؟ دليل مازال ما لقيتيهش';ul.appendChild(li);});}
function openQuiz(){state='quiz';show('hud',true);setObjective('حل اللغز');show('q',true);q1();}
function q1(){$('qtitle').textContent='السؤال 1 من 2';$('qtext').textContent='واش يونس كيقول الحقيقة؟';$('qhint').hidden=true;const box=$('qopts');box.innerHTML='';
  [['اه، البحر هو اللي غدر بيهم',false],['لا، شي حاجة ما مشاتش فالقصة ديالو',true]].forEach(([s,ok])=>{const b=document.createElement('button');b.className='opt';b.textContent=s;b.onclick=()=>{if(ok){q2();}else{mistakes++;hint('عاود قرا الكارني ديالك: واش اللي لقيتي فالمرسى كيتوافق مع القصة ديال الموجة؟');b.classList.add('bad');}};box.appendChild(b);});}
function q2(){$('qtitle').textContent='السؤال 2 من 2';$('qtext').textContent='اختار الأدلة اللي كيبينو بلي ما كانتش موجة (3 أدلة)';$('qhint').hidden=true;const box=$('qopts');box.innerHTML='';
  const sel=new Set();['weather','net','clothes','crates','boat'].forEach(k=>{const b=document.createElement('button');b.className='opt chk';b.textContent=CLUES[k];b.setAttribute('aria-pressed','false');b.onclick=()=>{if(sel.has(k))sel.delete(k);else sel.add(k);b.setAttribute('aria-pressed',sel.has(k)?'true':'false');};box.appendChild(b);});
  const go=document.createElement('button');go.className='go';go.textContent='أكد الجواب';go.onclick=()=>{
    if(sel.has('crates')){mistakes++;hint('الصناديق عامرين ما كيكذبوش القصة ديال الموجة... ولكن عقل عليهم، غادي نرجعو ليهم من بعد.');return;}
    const need=['weather','net','clothes'].filter(k=>!sel.has(k));
    if(need.length){mistakes++;hint(need.includes('weather')?'شنو قالت لوحة الطقس على الريح والموج؟':need.includes('net')?'واش الشبكة كتبان بحال إلا تلاحت فالبحر؟':'واحد قلب ساعات فالبحر... كيفاش خاص تكون الحوايج ديالو؟');return;}
    show('q',false);answer();};box.appendChild(go);}
function hint(s){const h=$('qhint');h.textContent=s;h.hidden=false;h.classList.remove('pop');void h.offsetWidth;h.classList.add('pop');}
function answer(){state='answer';setObjective('الجواب');finalShot=0;playSeg(35,38,()=>{state='done';const stars=Math.max(1,3-mistakes);$('stars').textContent='★'.repeat(stars)+'☆'.repeat(3-stars);$('dmist').textContent=mistakes?`${mistakes} ${mistakes===1?'غلطة':'غلطات'}`:'بلا حتى غلطة';show('done',true);show('hud',false);});}

// ---------- per-frame scene ----------
function npcs(t,extra={}){for(const k in NPC){const n=NPC[k];const o=Object.assign({x:n.x,y:HY,z:n.z,ry:n.ry},n.o,extra[k]||{});put(k,o,t);}}
function playerPut(t,o={}){put('you',Object.assign({x:pl.x,y:HY,z:pl.z,ry:pl.ry,walk:pl.moving?pl.walk:undefined},o),t);}
const CU3=(x,z,ry=0,d=5.4,dx=.4)=>{const a=ry*Math.PI/180;return {eye:[x+Math.sin(a)*d+dx*Math.cos(a),HY+3.7,z+Math.cos(a)*d],at:[x,HY+3.35,z]};};

function introScene(t){// t = audio time
  let cam;
  if(t<LT0(4)-.5){gullsOn(t,4,14,6);cam={eye:kf(t,[[0,[26,16,46]],[9,[8,8,32]]]),at:[0,2,12]};mab.position.set(...[MAB_HOME[0],0,60]);}
  else if(t<LT0(5)-.3){put('you',{x:-1,y:HY,z:12,ry:0,pose:'write',item:'notebook',lid:.3},t);cam={eye:[-.4,HY+3.6,17.2],at:[-1,HY+3.2,12]};mab.position.z=60;}
  else if(t<LT0(7)-.3){const k=ease((t-LT0(5))/5);mab.position.set(MAB_HOME[0],0,lerp(MAB_HOME[1],62,k));cam={eye:[-5,HY+5,14],at:[-.5,1.5,lerp(MAB_HOME[1],62,k*.8)]};gullsOn(t,0,30,4);}
  else if(t<LT0(11)-.3){const crew=[['omar',-4.5],['hussein',-1.5],['larbi',1.5],['younes',4.5]];const who=t<LT0(8)?0:t<LT0(9)?1:t<LT0(10)?2:3;
    crew.forEach(([k,x],i)=>put(k,{x,y:HY,z:14,ry:0,lid:.3,smile:i===who?.4:.1,item:k==='larbi'?'tea':undefined,pose:k==='larbi'?'give':'idle'},t));
    const c=CU3(crew[who][1],14,0,6.2);cam={eye:c.eye,at:c.at};mab.position.z=62;}
  else if(t<LT0(15)-.2){const k=ease((t-LT0(11))/(LT1(14)-LT0(11)));mab.position.set(MAB_HOME[0],0,lerp(64,MAB_HOME[1],k));put('younes',{x:MAB_HOME[0],y:.55,z:mab.position.z+1.6,ry:180,lid:.15,browUp:.6},t);
    cam={eye:[3,7.5,15],at:[MAB_HOME[0],2,lerp(mab.position.z,22,.3)]};}
  else if(t<LT0(17)){mab.position.set(MAB_HOME[0],0,MAB_HOME[1]);const k=cl((t-LT0(16))/2.5);npcs(t,{mother:{x:lerp(-4,2.9,k)},wife1:{z:lerp(14,19.6,k)},wife2:{z:lerp(13,18.7,k)},fisher:{x:lerp(9,6.6,k)}});cam={eye:[.5,HY+5.6,10.5],at:[1.2,HY+2.4,19.8]};}
  else if(t<LT0(20)){mab.position.set(MAB_HOME[0],0,MAB_HOME[1]);const q=LW[17][3].t0;npcs(t,{younes:{mouth:t>=q&&t<LT1(17)+.1?voiceLevel(t):0,hx:-.05}});const c=CU3(1.6,20.4,180,5.2,.4);cam=c;}
  else {mab.position.set(MAB_HOME[0],0,MAB_HOME[1]);npcs(t,{mother:{x:1.6,z:19.1,ry:0,pose:'hug',cry:1},younes:{pose:'hug',lid:.6}});
    if(t<LT0(22)-.1)cam={eye:[8.2,HY+4.8,14.6],at:[1.6,HY+3,19.8]};else{put('you',{x:-1,y:HY,z:12,ry:0,lid:.3},t);cam={eye:[-1,HY+4.4,5.6],at:[-1,HY+2.6,14]};}}
  if(t>=LT0(15)-.2&&t<LT0(22)-.1)put('you',{x:-1,y:HY,z:12,ry:0,lid:.3},t);
  setCam(cam.eye,cam.at,.12);}

function followCam(k){const d=9.4;const ex=pl.x-Math.sin(camYaw)*d*Math.cos(camPitch),ez=pl.z-Math.cos(camYaw)*d*Math.cos(camPitch),ey=HY+2.4+Math.sin(camPitch)*d;setCam([ex,ey,ez],[pl.x,HY+2.6,pl.z],k);}

function playUpdate(t,dt){let ix=joy.x,iy=joy.y;if(keys.KeyW||keys.ArrowUp)iy=-1;if(keys.KeyS||keys.ArrowDown)iy=1;if(keys.KeyA||keys.ArrowLeft)ix=-1;if(keys.KeyD||keys.ArrowRight)ix=1;
  const mag=Math.min(1,Math.hypot(ix,iy));pl.moving=mag>.12;
  if(pl.moving){const fx=Math.sin(camYaw),fz=Math.cos(camYaw),rx=-Math.cos(camYaw),rz=Math.sin(camYaw);let mx=fx*(-iy)+rx*ix,mz=fz*(-iy)+rz*ix;const ml=Math.hypot(mx,mz)||1;mx/=ml;mz/=ml;const sp=4.6*mag;
    [pl.x,pl.z]=collide(pl.x+mx*sp*dt,pl.z+mz*sp*dt);const want=Math.atan2(mx,mz)*180/Math.PI;let d=((want-pl.ry+540)%360)-180;pl.ry+=d*Math.min(1,dt*10);pl.walk+=dt*9*mag;
    if(!look.id)camYaw+=(((pl.ry*Math.PI/180-camYaw+Math.PI*3)%(Math.PI*2))-Math.PI)*dt*.6*mag*(Math.abs(ix)>.3?1:.4);}
  near=null;let best=2.7;for(const s of SPOTS){if(s.done)continue;const d=Math.hypot(pl.x-s.pos[0],pl.z-s.pos[1]);if(d<best){best=d;near=s;}}
  const a=$('act');if(near){a.hidden=false;a.textContent=near.label;}else a.hidden=true;
  followCam(.14);}

let last=performance.now();
function frame(now){requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000);last=now;DT=dt;tClock+=dt;const t=tClock;
  hideAll();mab.visible=true;
  if(seg&&!seg.useWall&&seg.mode!=='wall'){const r=rawTime();if(r!==seg.lastAT){seg.lastAT=r;seg.lastCh=now;}else if(now-(seg.lastCh||seg.wall)>1500){seg.useWall=true;}}
  if(seg){const st=segTime();captions(st);if(st>=seg.t1)endSeg();}
  if(state==='title'){npcs(t);setCam([12+Math.sin(t*.1)*4,HY+7,30],[0,2,16],.05);gullsOn(t,2,18,5);}
  else if(state==='intro'){introScene(seg?segTime():LT1(22));}
  else {
    const speaking=state==='inspect'&&inspect&&inspect.l0===17&&seg&&segTime()>=LW[17][3].t0;
    npcs(t,{younes:{mouth:speaking?voiceLevel(t):0,ry:state==='inspect'&&inspect&&inspect.s&&inspect.s.id==='younes'?Math.atan2(pl.x-1.6,pl.z-20.4)*180/Math.PI:180}});
    if(state==='play'){playUpdate(t,dt);playerPut(t);}
    else if(state==='inspect'){pl.moving=false;
      if(inspect&&inspect.writing){playerPut(t,{pose:'write',item:'notebook'});const a=pl.ry*Math.PI/180;setCam([pl.x+Math.sin(a)*4.6+Math.cos(a)*.8,HY+3.9,pl.z+Math.cos(a)*4.6],[pl.x,HY+3.1,pl.z],.08);}
      else{if(inspect&&inspect.cam)setCam(inspect.cam.eye,inspect.cam.at,.08);}}
    else if(state==='quiz'){playerPut(t,{pose:'chin'});const a=pl.ry*Math.PI/180;setCam([pl.x+Math.sin(a)*5.2,HY+4,pl.z+Math.cos(a)*5.2],[pl.x,HY+3.2,pl.z],.05);}
    else if(state==='answer'||state==='done'){playerPut(t,{pose:'point'});const st=seg?segTime():999;
      const c=st<LT0(36)?{eye:[2.1,HY+3.7,15.4],at:[1.6,HY+3.35,20.4]}:st<LT0(37)?{eye:[-1.5,HY+3.1,14.2],at:[-1.5,HY+2.7,6.2]}:st<LT0(38)?{eye:[3.3,HY+4,15.8],at:[4.6,HY+.4,20.3]}:state==='done'?{eye:[10,HY+6,10],at:[1,HY+2,20]}:{eye:[1.2,HY+2.3,16.9],at:[1.6,HY+1.6,20.4]};setCam(c.eye,c.at,.06);}
  }
  SPOTS.forEach((s,i)=>{s.m.visible=!s.done&&(state==='play');s.m.position.set(s.mk[0],s.mk[1]+Math.sin(t*3+i)*.15,s.mk[2]);});
  waves(t,.22);if(port.visible)moored.forEach((b,j)=>{b.position.y=Math.sin(t*1.4+j)*.1;b.rotation.z=Math.sin(t*1.1+j*.7)*.04;});mab.position.y=Math.sin(t*1.4)*.08;mab.rotation.z=Math.sin(t*1.1)*.03;
  if(state!=='title'&&state!=='intro')gullsOn(t,6,8,6);
  R.render(scene,camera);}
Promise.all([document.fonts.ready,Promise.race([audioReady,new Promise(r=>setTimeout(r,9000))])]).then(()=>{$('loading').hidden=true;$('start').disabled=false;});
requestAnimationFrame(frame);
window.__game={get state(){return state;},pl,SPOTS,found,act:()=>act(),endSeg:()=>endSeg(),segT:()=>seg?[segTime(),seg.t1]:null,seek:(t)=>{if(seg){seg.wall=performance.now()-(t-seg.t0)*1000;if(seg.mode==='buf')seg.ctx0=actx.currentTime-(t-seg.t0);}},mode:()=>seg&&seg.mode};
