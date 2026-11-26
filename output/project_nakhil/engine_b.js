import * as THREE from './package/build/three.module.js';
window.THREE=THREE;
const R=new THREE.WebGLRenderer({canvas:document.getElementById('c'),antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(1);R.setSize(window.RW,window.RH,false);R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFShadowMap;
const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(42,1080/1920,.1,900);window.camera=camera;
const grad=new THREE.DataTexture(new Uint8Array([70,150,255]),3,1,THREE.RedFormat);grad.needsUpdate=true;
const OUT=new THREE.MeshBasicMaterial({color:'#15100c',side:THREE.BackSide});
function outline(m,s=1.04){const o=new THREE.Mesh(m.geometry,OUT);o.scale.setScalar(s);m.add(o);return m;}
function M(geo,mat,x=0,y=0,z=0,p){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;(p||scene).add(m);return m;}
function tex(w,h,draw,rx=1,ry=1){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,ry);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t;}
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
function noise(g,w,h,n,a){for(let i=0;i<n;i++){g.fillStyle=`rgba(${rnd()<.5?0:255},${rnd()<.5?0:255},${rnd()<.5?0:255},${a*rnd()})`;g.fillRect(rnd()*w,rnd()*h,1+rnd()*3,1+rnd()*3);}}
const TM=(map,c='#ffffff',o={})=>new THREE.MeshToonMaterial(Object.assign({map,color:c,gradientMap:grad},o));
const C=(c,o={})=>TM(null,c,o);
// ---------- textures ----------
const stoneTex=(rx,ry)=>tex(512,512,(g,w,h)=>{g.fillStyle='#8a6438';g.fillRect(0,0,w,h);const rh=64;for(let r=0;r<h/rh;r++){let x=-(r%2)*60;while(x<w){const bw=90+rnd()*70;g.fillStyle=`hsl(${30+rnd()*8},${45+rnd()*12}%,${52+rnd()*12}%)`;g.beginPath();g.roundRect(x+3,r*rh+3,bw-6,rh-6,8);g.fill();g.fillStyle='rgba(255,240,210,.18)';g.fillRect(x+6,r*rh+6,bw-12,6);g.strokeStyle='rgba(60,35,15,.6)';g.lineWidth=3;g.stroke();x+=bw;}}noise(g,w,h,5000,.12);},rx,ry);
const plasterTex=(rx,ry,col='#f3eee4')=>tex(256,256,(g,w,h)=>{g.fillStyle=col;g.fillRect(0,0,w,h);noise(g,w,h,3000,.06);for(let i=0;i<6;i++){g.fillStyle='rgba(180,160,130,.12)';g.beginPath();g.ellipse(rnd()*w,rnd()*h,20+rnd()*40,6+rnd()*14,rnd()*3,0,7);g.fill();}},rx,ry);
const woodTex=(col,rx,ry,stripe)=>tex(512,256,(g,w,h)=>{g.fillStyle=col;g.fillRect(0,0,w,h);const n=8;for(let i=0;i<n;i++){const y=i*h/n;g.fillStyle=`rgba(0,0,0,${.05+rnd()*.08})`;g.fillRect(0,y,w,h/n);g.strokeStyle='rgba(20,15,10,.55)';g.lineWidth=3;g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke();for(let k=0;k<5;k++){g.strokeStyle='rgba(255,255,255,.08)';g.lineWidth=1.5;g.beginPath();const yy=y+rnd()*h/n;g.moveTo(rnd()*w,yy);g.lineTo(rnd()*w,yy+rnd()*3);g.stroke();}}
  if(stripe){g.fillStyle='#f2c21b';g.fillRect(0,h*.14,w,h*.07);g.fillStyle='#c0392b';g.fillRect(0,h*.22,w,h*.05);}noise(g,w,h,4000,.1);for(let i=0;i<30;i++){g.fillStyle='rgba(240,230,210,.22)';g.fillRect(rnd()*w,rnd()*h,4+rnd()*20,2+rnd()*4);}},rx,ry);
const cobbleTex=(rx,ry)=>tex(512,512,(g,w,h)=>{g.fillStyle='#6a5a44';g.fillRect(0,0,w,h);for(let i=0;i<260;i++){const x=rnd()*w,y=rnd()*h,r=14+rnd()*18;g.fillStyle=`hsl(36,${18+rnd()*10}%,${48+rnd()*14}%)`;g.beginPath();g.ellipse(x,y,r,r*.75,rnd()*3,0,7);g.fill();g.strokeStyle='rgba(40,30,20,.45)';g.lineWidth=2;g.stroke();}noise(g,w,h,4000,.1);},rx,ry);
const rockTex=(rx,ry)=>tex(256,256,(g,w,h)=>{g.fillStyle='#55555c';g.fillRect(0,0,w,h);for(let i=0;i<120;i++){const v=rnd()<.5?40:150;g.fillStyle=`rgba(${v},${v},${v+8},.22)`;g.beginPath();g.ellipse(rnd()*w,rnd()*h,6+rnd()*20,3+rnd()*10,rnd()*3,0,7);g.fill();}g.globalAlpha=1;},rx,ry);
const netTex=tex(128,128,(g,w,h)=>{g.fillStyle='#4f7a3e';g.fillRect(0,0,w,h);g.strokeStyle='#2c4a22';g.lineWidth=2;for(let i=0;i<w;i+=10){g.beginPath();g.moveTo(i,0);g.lineTo(i+20,h);g.stroke();g.beginPath();g.moveTo(0,i);g.lineTo(w,i+12);g.stroke();}},2,2);
const seaTex=tex(256,256,(g,w,h)=>{g.fillStyle='#ffffff';g.fillRect(0,0,w,h);for(let i=0;i<70;i++){g.strokeStyle=`rgba(150,190,220,${.25+rnd()*.3})`;g.lineWidth=2;const x=rnd()*w,y=rnd()*h,l=10+rnd()*30;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+l/2,y-3,x+l,y);g.stroke();}},30,30);
const fishTex=tex(256,128,(g,w,h)=>{g.fillStyle='#d9e6f0';g.fillRect(0,0,w,h);for(let r=0;r<5;r++)for(let k=0;k<6;k++){const x=10+k*42,y=8+r*24;g.fillStyle='#9fb3c8';g.beginPath();g.ellipse(x+18,y+10,18,8,0,0,7);g.fill();g.strokeStyle='#2a2a30';g.lineWidth=1.5;g.stroke();g.fillStyle='#111';g.beginPath();g.arc(x+6,y+9,2.2,0,7);g.fill();}},1,1);
const stoneM=TM(stoneTex(3,1)),stoneM2=TM(stoneTex(2,2)),plasterM=TM(plasterTex(1,1)),crateM=TM(woodTex('#a8743e',1,1)),netM=TM(netTex),beamM=TM(woodTex('#6a4424',1,1)),floorM=TM(woodTex('#8a6036',3,3)),rockM=TM(rockTex(2,2));
// ---------- sky / lights ----------
const skyC=document.createElement('canvas');skyC.width=4;skyC.height=256;const skyT=new THREE.CanvasTexture(skyC);
function paintSky(st){const g=skyC.getContext('2d');const gr=g.createLinearGradient(0,0,0,256);st.forEach(([o,c])=>gr.addColorStop(o,c));g.fillStyle=gr;g.fillRect(0,0,4,256);skyT.needsUpdate=true;}
const sky=new THREE.Mesh(new THREE.SphereGeometry(700,32,16),new THREE.MeshBasicMaterial({map:skyT,side:THREE.BackSide,fog:false}));scene.add(sky);
const hemi=new THREE.HemisphereLight('#ffe6c8','#5a4a3a',1.1);scene.add(hemi);
const key=new THREE.DirectionalLight('#ffc98a',2.2);key.position.set(-60,40,-80);key.castShadow=true;key.shadow.mapSize.set(1536,1536);Object.assign(key.shadow.camera,{left:-45,right:45,top:45,bottom:-45,near:1,far:300});scene.add(key);scene.add(key.target);
const rim=new THREE.DirectionalLight('#ffd9a0',.9);rim.position.set(20,15,60);scene.add(rim);
const glowC=document.createElement('canvas');glowC.width=glowC.height=128;{const g=glowC.getContext('2d');const r=g.createRadialGradient(64,64,0,64,64,64);r.addColorStop(0,'rgba(255,230,170,1)');r.addColorStop(1,'rgba(255,170,90,0)');g.fillStyle=r;g.fillRect(0,0,128,128);}
const glowT=new THREE.CanvasTexture(glowC);const glowMat=()=>new THREE.SpriteMaterial({map:glowT,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
const sun=new THREE.Mesh(new THREE.SphereGeometry(10,24,16),new THREE.MeshBasicMaterial({color:'#fff1c0',fog:false}));sun.position.set(-160,24,-330);scene.add(sun);const sunGlow=new THREE.Sprite(glowMat());sunGlow.material.fog=false;sunGlow.scale.set(130,130,1);sunGlow.position.copy(sun.position);scene.add(sunGlow);
const moon=new THREE.Mesh(new THREE.SphereGeometry(6,24,16),new THREE.MeshBasicMaterial({color:'#f4efd8',fog:false}));moon.position.set(120,110,-330);scene.add(moon);
const starsG=new THREE.BufferGeometry();{const a=[];for(let i=0;i<1200;i++){const th=rnd()*Math.PI*2,ph=rnd()*.5;a.push(Math.cos(th)*Math.cos(ph)*600,Math.sin(ph)*600+15,Math.sin(th)*Math.cos(ph)*600);}starsG.setAttribute('position',new THREE.Float32BufferAttribute(a,3));}
const stars=new THREE.Points(starsG,new THREE.PointsMaterial({color:'#fff',size:1.7,sizeAttenuation:false,fog:false}));scene.add(stars);
const clouds=new THREE.Group();scene.add(clouds);for(let i=0;i<14;i++){const c=new THREE.Mesh(new THREE.SphereGeometry(1,16,10),new THREE.MeshBasicMaterial({color:i%2?'#ffd2b0':'#f7b8a0',fog:false,transparent:true,opacity:.85}));c.scale.set(40+rnd()*50,6+rnd()*5,12);c.position.set(-350+rnd()*700,80+rnd()*80,-560);clouds.add(c);}
scene.fog=new THREE.Fog('#f0b98a',140,520);
const TOD={
 dusk:{sky:[[0,'#2c3a78'],[.3,'#5a5a9a'],[.46,'#d9787a'],[.52,'#ff9a6a'],[.58,'#ffc07a'],[1,'#ffe2b0']],fog:'#f3b07e',hemi:[1.1,'#ffe6c8'],key:[2.2,'#ffc98a'],sea:'#2f78a8',sun:1,stars:0,clouds:1,lamps:0,cl:['#ffd2b0','#f7b8a0']},
 day:{sky:[[0,'#3c7ec4'],[.45,'#8cc4ea'],[.55,'#cfe8f6'],[1,'#e8f4fa']],fog:'#cfe4f0',hemi:[1.25,'#ffffff'],key:[2.4,'#fff3dc'],sea:'#2f80b8',sun:0,stars:0,clouds:1,lamps:0,cl:['#ffffff','#eef4fa']},
 red:{sky:[[0,'#3a2a5a'],[.4,'#a0405a'],[.52,'#ff5a3a'],[.6,'#ff9a5a'],[1,'#ffc08a']],fog:'#d8705a',hemi:[.95,'#ffb08a'],key:[1.8,'#ff8a5a'],sea:'#5a6a7a',sun:1,stars:0,clouds:1,lamps:0,cl:['#ff9a7a','#e07a6a']},
 night:{sky:[[0,'#05081a'],[.5,'#0c1838'],[1,'#1a2a50']],fog:'#0c1838',hemi:[.38,'#8aa0d0'],key:[.25,'#8aa0d0'],sea:'#123a5a',sun:0,stars:1,clouds:0,lamps:1,moon:1},
 dawn:{sky:[[0,'#3b4a7a'],[.4,'#8a7aa0'],[.52,'#e8a08a'],[.6,'#ffd0a0'],[1,'#fff0d0']],fog:'#e8c0a8',hemi:[.95,'#ffe0d0'],key:[1.6,'#ffd0a0'],sea:'#4a7a9a',sun:1,stars:0,clouds:1,lamps:0,cl:['#ffe0d0','#f0c0b0']},
 dark:{sky:[[0,'#050505'],[1,'#050505']],fog:'#060606',hemi:[.6,'#8a9ac0'],key:[0,'#000'],sea:'#000',sun:0,stars:0,clouds:0,lamps:0},
 interior:{sky:[[0,'#2a2a30'],[1,'#2a2a30']],fog:'#3a3028',hemi:[1.0,'#ffe8c8'],key:[1.2,'#ffd8a0'],sea:'#2f78a8',sun:0,stars:0,clouds:0,lamps:0},
};
// ---------- sea ----------
const seaGeo=new THREE.PlaneGeometry(900,900,90,90);seaGeo.rotateX(-Math.PI/2);const seaMat=TM(seaTex,'#2f78a8');const sea=new THREE.Mesh(seaGeo,seaMat);sea.receiveShadow=true;scene.add(sea);const seaBase=seaGeo.attributes.position.array.slice();
function waves(t,a=.22){const p=seaGeo.attributes.position;for(let i=0;i<p.count;i++){const x=seaBase[i*3],z=seaBase[i*3+2];p.array[i*3+1]=Math.sin(x*.15+t*1.3)*a+Math.cos(z*.2+t*1.1)*a*.8;}p.needsUpdate=true;seaGeo.computeVertexNormals();seaTex.offset.set(t*.004,t*.002);}
// ---------- builders ----------
function hullGeo(L=6,W=2.2,H=1.15){const g=new THREE.BoxGeometry(L,H,W,12,3,3);const p=g.attributes.position;for(let i=0;i<p.count;i++){let x=p.getX(i),y=p.getY(i),z=p.getZ(i);const k=Math.abs(x)/(L/2);z*=(1-Math.pow(k,2.2)*.85)*(y<0?.72:1);if(y<0)y*=1-k*.3;y+=Math.pow(k,2)*.4;p.setXYZ(i,x,y,z);}g.computeVertexNormals();return g;}
const HG=hullGeo(),deckG=hullGeo(5.4,1.9,.2);const hullMs=['#2f84d6','#2a6fb8','#3a8fe0','#245fa0'].map(c=>TM(woodTex(c,1,1,true)));const deckM=TM(woodTex('#7a5a36',2,1));const blackHullM=TM(woodTex('#1a1a20',1,1));
function boat(i=0,o={},parent){const g=new THREE.Group();outline(M(HG,o.black?blackHullM:hullMs[i%4],0,0,0,g),1.035);M(deckG,deckM,0,.42,0,g);for(let k=-1;k<=1;k++)M(new THREE.BoxGeometry(.2,.12,1.9),deckM,k*1.4,.5,0,g);
  if(o.cabin){outline(M(new THREE.BoxGeometry(1.4,1.3,1.3),o.black?C('#2a2a30'):plasterM,.6,1.15,0,g),1.04);M(new THREE.BoxGeometry(.9,.45,.06),C('#2b3a73'),.6,1.35,.67,g);outline(M(new THREE.BoxGeometry(o.big?.8:.45,o.big?1.4:1.1,o.big?.8:.55),C(o.big?'#c0392b':'#3a3a40'),-3.05,.6,0,g),1.05);}
  else{const oar=M(new THREE.CylinderGeometry(.05,.05,3.6,6),beamM,.3,.75,.4,g);oar.rotation.z=Math.PI/2;oar.rotation.y=.25;if(i%3===0){const n=M(new THREE.SphereGeometry(.7,12,8),netM,-1.2,.7,0,g);n.scale.set(1.2,.5,.9);for(let k=0;k<3;k++)M(new THREE.SphereGeometry(.12,8,6),C(k%2?'#f2c21b':'#e0592a'),-1.2+(k-1)*.4,1,.3,g);}}
  if(o.cans)for(let k=0;k<3;k++){outline(M(new THREE.BoxGeometry(.45,.6,.35),C('#c0392b'),-1.6+k*.55,.8,.4,g),1.05);}
  (parent||scene).add(g);return g;}
function lampPost(p,x,z,h=4.2){outline(M(new THREE.CylinderGeometry(.1,.14,h,8),C('#2a2a30'),x,1.7+h/2,z,p),1.08);outline(M(new THREE.BoxGeometry(.5,.6,.5),C('#2a2a30'),x,1.7+h,z,p),1.06);const s=new THREE.Sprite(glowMat());s.scale.set(2.4,2.4,1);s.position.set(x,1.7+h,z);p.add(s);const L=new THREE.PointLight('#ffc670',0,22,1.6);L.position.set(x,1.5+h,z);p.add(L);return [s,L];}
const ENVS={};function envG(n){const g=new THREE.Group();g.visible=false;scene.add(g);ENVS[n]=g;return g;}
const LAMPS=[];
// ======== BUILDING ENVIRONMENTS ========
const ITEM3_LATE=[];
sea.visible=false;
function Mi(geo,mat,x,y,z,p){const m=M(geo,mat,x,y,z,p);m.castShadow=false;return m;}
const brickTex=(rx,ry,col='#6a4a3e')=>tex(256,256,(g,w,h)=>{g.fillStyle='#2e2622';g.fillRect(0,0,w,h);const bh=32;for(let r=0;r<h/bh;r++){for(let x=-(r%2)*32;x<w;x+=64){const v=rnd()*30-15;g.fillStyle=`rgb(${parseInt(col.slice(1,3),16)+v|0},${parseInt(col.slice(3,5),16)+v|0},${parseInt(col.slice(5,7),16)+v|0})`;g.fillRect(x+3,r*bh+3,58,bh-6);}}noise(g,w,h,1500,.1);},rx,ry);
const checkTex=(rx,ry)=>tex(256,256,(g,w,h)=>{for(let i=0;i<8;i++)for(let j=0;j<8;j++){g.fillStyle=(i+j)%2?'#e9e2d2':'#2f3a3a';g.fillRect(i*32,j*32,32,32);}noise(g,w,h,2500,.07);},rx,ry);
const sootTex=(rx,ry,base='#2a2522')=>tex(512,512,(g,w,h)=>{g.fillStyle=base;g.fillRect(0,0,w,h);for(let i=0;i<40;i++){const x=rnd()*w,y=rnd()*h,r=30+rnd()*120;const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(0,0,0,.55)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,w,h);}for(let i=0;i<30;i++){g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=1+rnd()*2;g.beginPath();let x=rnd()*w,y=rnd()*h;g.moveTo(x,y);for(let k=0;k<5;k++){x+=rnd()*40-20;y+=rnd()*40;g.lineTo(x,y);}g.stroke();}noise(g,w,h,4000,.08);},rx,ry);
const crackTileTex=(rx,ry)=>tex(256,256,(g,w,h)=>{for(let i=0;i<4;i++)for(let j=0;j<4;j++){const v=30+rnd()*20|0;g.fillStyle=`rgb(${v},${v-4},${v-6})`;g.fillRect(i*64+1,j*64+1,62,62);}g.strokeStyle='#0a0808';g.lineWidth=2;for(let i=0;i<14;i++){g.beginPath();let x=rnd()*w,y=rnd()*h;g.moveTo(x,y);for(let k=0;k<4;k++){x+=rnd()*50-25;y+=rnd()*50-25;g.lineTo(x,y);}g.stroke();}},rx,ry);
const panelTex=(c1,c2,rx,ry)=>tex(256,256,(g,w,h)=>{g.fillStyle=c1;g.fillRect(0,0,w,h);g.strokeStyle=c2;g.lineWidth=4;for(let x=0;x<w;x+=64){g.strokeRect(x+6,6,52,h-12);}noise(g,w,h,1500,.05);},rx,ry);
const doorTex=(c)=>tex(128,256,(g,w,h)=>{g.fillStyle=c;g.fillRect(0,0,w,h);g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=5;g.strokeRect(14,14,w-28,h*.42);g.strokeRect(14,h*.5,w-28,h*.45);noise(g,w,h,800,.06);});
const textTex=(txt,w,h,bg,fg,font)=>tex(w,h,(g)=>{g.fillStyle=bg;g.fillRect(0,0,w,h);g.fillStyle=fg;g.font=font;g.textAlign='center';g.textBaseline='middle';g.fillText(txt,w/2,h/2+2);});
const facadeM=TM(plasterTex(4,8,'#efe4cc')),facadeDk=TM(plasterTex(4,1,'#7d776c')),trimM=C('#d9ccb0'),glassM=C('#24303e'),litM=new THREE.MeshBasicMaterial({color:'#ffd48a'}),ironM=C('#1d1d22'),brickM=TM(brickTex(1,1));
const WINS=[];
// ---- STREET (origin) ----
{const g=envG('street');
 Mi(new THREE.PlaneGeometry(400,400).rotateX(-Math.PI/2),C('#3a3a40'),0,0,0,g).receiveShadow=true;
 M(new THREE.BoxGeometry(200,.3,7),TM(tex(256,64,(c,w,h)=>{c.fillStyle='#b9b2a4';c.fillRect(0,0,w,h);c.strokeStyle='#8f887a';c.lineWidth=2;for(let x=0;x<w;x+=32){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke();}noise(c,w,h,800,.08);},20,1)),0,.15,3.5,g);
 for(let x=-90;x<90;x+=8)Mi(new THREE.BoxGeometry(4,.02,.3),C('#e8e2c8'),x,.02,14.5,g);
 // main building
 outline(M(new THREE.BoxGeometry(32,99,20),facadeM,0,49.5,-10,g),1.003);
 outline(M(new THREE.BoxGeometry(33,1.2,21),trimM,0,99.6,-10,g),1.01);
 M(new THREE.BoxGeometry(32.2,7,20.2),facadeDk,0,95.5,-10,g); // 13th floor band darker
 for(let f=1;f<=13;f++){const y=8+(f-1)*7;Mi(new THREE.BoxGeometry(32.6,.35,.5),trimM,0,y,.25,g);
  for(const x of[-11.5,-4,4,11.5]){
   if(f===13){outline(M(new THREE.BoxGeometry(3.4,4,.4),brickM,x,y+3.4,.1,g),1.02);continue;}
   const lit=rnd()<.45;const w=Mi(new THREE.BoxGeometry(3.2,4,.2),glassM,x,y+3.4,.05,g);WINS.push([w,lit,f,x]);
   Mi(new THREE.BoxGeometry(.18,4,.3),trimM,x,y+3.4,.12,g);Mi(new THREE.BoxGeometry(3.2,.18,.3),trimM,x,y+3.4,.12,g);
   if(Math.abs(x)<5){outline(M(new THREE.BoxGeometry(5,.35,2),trimM,x,y+1.2,1,g),1.02);Mi(new THREE.BoxGeometry(5,.1,.1),ironM,x,y+2.8,1.95,g);for(let k=-2;k<=2;k++)Mi(new THREE.BoxGeometry(.08,1.6,.08),ironM,x+k*1.2,y+2,1.95,g);for(const s of[-1,1])Mi(new THREE.BoxGeometry(.1,.1,2),ironM,x+s*2.45,y+2.8,1,g);}
   else Mi(new THREE.BoxGeometry(3.6,.3,.6),trimM,x,y+1.3,.3,g);}}
 // art-deco pilasters
 for(const x of[-15.6,-7.8,0,7.8,15.6])Mi(new THREE.BoxGeometry(.8,91,.6),trimM,x,53.5,.1,g);
 // ground floor: entrance
 outline(M(new THREE.BoxGeometry(7,6.5,.6),C('#5a4632'),0,3.25,.1,g),1.02);Mi(new THREE.BoxGeometry(5.6,5.8,.2),C('#2d3846'),0,3,.35,g);Mi(new THREE.BoxGeometry(.15,5.8,.25),C('#c9a24a'),0,3,.45,g);
 const sign=Mi(new THREE.PlaneGeometry(9,1.6),new THREE.MeshBasicMaterial({map:textTex('عمارة النخيل',512,96,'#1d2a3a','#f2d48a','bold 64px Cairo')}),0,7.2,.45,g);g.userData.sign=sign;
 for(const x of[-11.5,-4.5,4.5,11.5]){if(Math.abs(x)<5)continue;Mi(new THREE.BoxGeometry(5,4.5,.2),glassM,x,3.2,.05,g);Mi(new THREE.BoxGeometry(5.4,.4,1.4),C('#b5543a'),x,5.8,.6,g);}
 // palms
 function palm(x,z,h=20){const p=new THREE.Group();p.position.set(x,0,z);g.add(p);let px=0;for(let i=0;i<10;i++){const s=outline(M(new THREE.CylinderGeometry(.55-i*.02,.62-i*.02,h/10+.1,10),C(i%2?'#7a5a3a':'#6a4c30'),px,i*h/10+h/20,0,p),1.04);px+=.08;}
  for(let k=0;k<9;k++){const f=new THREE.Group();f.position.set(px,h,0);f.rotation.y=k/9*Math.PI*2;p.add(f);const fr=outline(M(new THREE.ConeGeometry(.9,8,4),C(k%2?'#3f8a3a':'#357a30'),0,0,4,f),1.03);fr.rotation.x=Math.PI/2;fr.scale.set(1,1,.25);f.rotation.x=.35+(k%3)*.12;}
  M(new THREE.SphereGeometry(.9,10,8),C('#6a4a20'),px,h-.6,0,p);return p;}
 palm(-21,4.5);palm(21,4.5,22);palm(-48,4.5,19);palm(46,4.5,21);
 // neighbours
 const nb=(x,w,h,col,z=-12)=>{outline(M(new THREE.BoxGeometry(w,h,20),TM(tex(128,256,(c,W,H)=>{c.fillStyle=col;c.fillRect(0,0,W,H);for(let i=0;i<4;i++)for(let j=0;j<10;j++){c.fillStyle=rnd()<.3?'#e8c070':'#3a4656';c.fillRect(10+i*30,8+j*25,16,14);}noise(c,W,H,800,.06);},1,h/40)),x,h/2,z,g),1.004);};
 nb(-34,30,52,'#c9d6dc');nb(34,30,62,'#e3c9b8');nb(-64,30,40,'#e0d8c0',-14);nb(66,30,46,'#cfd9c4',-14);nb(-10,40,70,'#b8b0c0',-60);nb(30,40,80,'#c8bca8',-62);
 // cars
 function car(x,z,col,taxi){const c=new THREE.Group();c.position.set(x,0,z);g.add(c);outline(M(new THREE.BoxGeometry(7,1.6,3.2),C(col),0,1.3,0,c),1.03);outline(M(new THREE.BoxGeometry(3.8,1.3,2.9),C(col),-.3,2.7,0,c),1.03);Mi(new THREE.BoxGeometry(3.6,1,2.95),glassM,-.3,2.75,0,c);for(const [a,b] of[[-2.3,-1.5],[2.3,-1.5],[-2.3,1.5],[2.3,1.5]]){const w=outline(M(new THREE.CylinderGeometry(.75,.75,.5,14),C('#151515'),a,.75,b,c),1.04);w.rotation.x=Math.PI/2;}if(taxi)outline(M(new THREE.BoxGeometry(1,.4,.6),C('#f2f2f2'),-.3,3.55,0,c),1.06);return c;}
 g.userData.taxi=car(-14,11.5,'#c8231e',1);g.userData.car2=car(26,17.5,'#e8e4dc');
 for(const x of[-30,30]){outline(M(new THREE.CylinderGeometry(.15,.2,11,8),ironM,x,5.5,5.8,g),1.06);outline(M(new THREE.BoxGeometry(1.4,.5,.8),ironM,x+.6,11,5.8,g),1.05);const s=new THREE.Sprite(glowMat());s.scale.set(4,4,1);s.position.set(x+.6,10.6,5.8);g.add(s);const L=new THREE.PointLight('#ffc670',0,40,1.4);L.position.set(x+.6,10.4,5.8);g.add(L);LAMPS.push([s,L]);}
}
// ---- display / button textures (shared) ----
const dispC=document.createElement('canvas');dispC.width=128;dispC.height=64;const dispT=new THREE.CanvasTexture(dispC);let dispK='';
window.setDisp=function(txt,on=1){const k=txt+'|'+on;if(k===dispK)return;dispK=k;const g=dispC.getContext('2d');g.fillStyle='#0c0606';g.fillRect(0,0,128,64);if(on){g.fillStyle='#ff4a2a';g.shadowColor='#ff4a2a';g.shadowBlur=12;g.font='bold 48px monospace';g.textAlign='center';g.textBaseline='middle';g.fillText(String(txt),64,34);}dispT.needsUpdate=true;};setDisp('0');
const btnC=document.createElement('canvas');btnC.width=128;btnC.height=320;const btnT=new THREE.CanvasTexture(btnC);let btnK='';
window.setBtn=function(lit){const kk=lit+'|'+(window.BTN13?1:0);if(kk===btnK)return;btnK=kk;const g=btnC.getContext('2d');g.fillStyle='#b9bec4';g.fillRect(0,0,128,320);g.strokeStyle='#6a7078';g.lineWidth=4;g.strokeRect(2,2,124,316);const NB=window.BTN13?13:12;for(let i=0;i<=NB;i++){const col=i%2,row=6-Math.floor(i/2);const x=40+col*48,y=28+row*44;g.fillStyle=i===lit?'#ffcf5a':'#e9ecef';g.beginPath();g.arc(x,y,17,0,7);g.fill();g.strokeStyle='#3a3f46';g.lineWidth=3;g.stroke();g.fillStyle='#1a1d22';g.font='bold 18px Arial';g.textAlign='center';g.textBaseline='middle';g.fillText(i===0?'0':String(i),x,y+1);}g.fillStyle='#1a1d22';g.beginPath();g.arc(64,302,6,0,7);g.fill();btnT.needsUpdate=true;};setBtn(-1);
function elevDoor(p,x,z,w=3.6,h=5.6){const L=outline(M(new THREE.BoxGeometry(w/2,h,.18),TM(panelTex('#9aa1a8','#6f767e',1,1)),x-w/4,h/2,z,p),1.02);const Rr=outline(M(new THREE.BoxGeometry(w/2,h,.18),TM(panelTex('#9aa1a8','#6f767e',1,1)),x+w/4,h/2,z,p),1.02);return {L,R:Rr,x,w};}
function doorSet(d,k){d.L.position.x=d.x-d.w/4-k*d.w*.48;d.R.position.x=d.x+d.w/4+k*d.w*.48;}
// ---- LOBBY (x=200) ----
{const g=envG('lobby');const X=200;
 Mi(new THREE.PlaneGeometry(26,24).rotateX(-Math.PI/2),TM(checkTex(6,6)),X,0,0,g).receiveShadow=true;
 const wallM=TM(plasterTex(3,1,'#e6d6b4')),marM=TM(plasterTex(3,1,'#3f6a5e'));
 Mi(new THREE.PlaneGeometry(15,8.5),wallM,X-5.5,4.25,-8,g);Mi(new THREE.PlaneGeometry(7,8.5),wallM,X+9.5,4.25,-8,g);Mi(new THREE.PlaneGeometry(4,2.5),wallM,X+4,7.25,-8,g);Mi(new THREE.PlaneGeometry(15,2.4),marM,X-5.5,1.2,-7.98,g);Mi(new THREE.PlaneGeometry(7,2.4),marM,X+9.5,1.2,-7.98,g);
 for(const [w,x,z,ry] of[[22,X-12,3,Math.PI/2],[22,X+12,3,-Math.PI/2]]){const a=Mi(new THREE.PlaneGeometry(w,8.5),wallM,x,4.25,z,g);a.rotation.y=ry;const b=Mi(new THREE.PlaneGeometry(w,2.4),marM,x+(ry===0?0:ry>0?.02:-.02),1.2,z+(ry===0?.02:0),g);b.rotation.y=ry;}
 Mi(new THREE.PlaneGeometry(26,24).rotateX(Math.PI/2),C('#d8ccb0'),X,8.5,0,g);
 for(const s of[-1,1]){const fw=Mi(new THREE.PlaneGeometry(9,8.5),wallM,X+s*7.5,4.25,12,g);fw.rotation.y=Math.PI;}Mi(new THREE.PlaneGeometry(6,2.5),wallM,X,7.25,12,g).rotation.y=Math.PI;const gd=Mi(new THREE.PlaneGeometry(6,6),new THREE.MeshBasicMaterial({color:'#f0c890'}),X,3,12.05,g);gd.rotation.y=Math.PI;for(const s of[-1,0,1])Mi(new THREE.BoxGeometry(.2,6,.2),C('#5a4632'),X+s*3,3,11.95,g);
 // elevator
 const EX=X+4;for(const s of[-1,1])outline(M(new THREE.BoxGeometry(.5,6.6,.3),C('#b08d3c'),EX+s*2.25,3.3,-7.95,g),1.02);outline(M(new THREE.BoxGeometry(5,.6,.3),C('#b08d3c'),EX,6.3,-7.95,g),1.02);g.userData.gap=Mi(new THREE.BoxGeometry(4,6,.1),C('#15110e'),EX,3,-7.75,g);
 const inside=Mi(new THREE.BoxGeometry(4,6,5),C('#c9a46a',{side:THREE.BackSide}),EX,3,-10.6,g);
 g.userData.door=elevDoor(g,EX,-7.7);const d1=Mi(new THREE.PlaneGeometry(1.6,.8),new THREE.MeshBasicMaterial({map:dispT}),EX,7.1,-7.78,g);
 outline(M(new THREE.BoxGeometry(1.9,1,.12),C('#b08d3c'),EX,7.1,-7.85,g),1.02);
 outline(M(new THREE.BoxGeometry(.5,1,.12),C('#b08d3c'),EX+3,3.2,-7.85,g),1.05);M(new THREE.SphereGeometry(.12,10,8),C('#ffcf5a'),EX+3,3.35,-7.75,g);
 const toy=new THREE.Group();toy.position.set(EX-1.3,.12,-12.3);toy.rotation.y=.6;toy.scale.setScalar(2.4);Mi(new THREE.PlaneGeometry(3.9,4.9).rotateX(-Math.PI/2),C('#4a4038'),EX,.02,-10.6,g);g.add(toy);ITEM3_LATE.push(()=>ITEM3.toycar(toy));toy.visible=false;g.userData.toy=toy;
 const cabL=new THREE.PointLight('#ffe0a0',0,10);cabL.position.set(EX,5,-10);g.add(cabL);g.userData.cabL=cabL;
 // stairs going up on the left
 const stM=TM(plasterTex(1,1,'#cbbfa8'));for(let i=0;i<14;i++)outline(M(new THREE.BoxGeometry(4.2,.55,.85),stM,X-9.6,.275+i*.55,4-i*.85,g),1.01);
 Mi(new THREE.BoxGeometry(4.2,7.7,.3),stM,X-9.6,3.85,-8,g);
 for(let i=0;i<14;i+=2)Mi(new THREE.BoxGeometry(.08,2,.08),ironM,X-7.5,1+.55+i*.55,4-i*.85,g);const rl=Mi(new THREE.BoxGeometry(.14,.14,14.5),C('#6a4428'),X-7.5,6,-1.9,g);rl.rotation.x=Math.atan2(.55,.85);
 // loge on the right wall
 g.userData.logeDoor=outline(M(new THREE.BoxGeometry(.3,5.6,3),TM(doorTex('#6a4428')),X+11.85,2.8,-1,g),1.02);Mi(new THREE.PlaneGeometry(3,5.6),new THREE.MeshBasicMaterial({color:'#ffd892'}),X+11.98,2.8,-1,g).rotation.y=-Math.PI/2;
 const mir=Mi(new THREE.PlaneGeometry(2.4,4),new THREE.MeshBasicMaterial({color:'#b9d4e4'}),X-11.9,4,8,g);mir.rotation.y=Math.PI/2;outline(M(new THREE.BoxGeometry(.15,4.4,2.8),C('#c9a24a'),X-11.98,4,8,g),1.01);Mi(new THREE.SphereGeometry(.14,8,6),C('#d8b648'),X+11.6,2.8,-2,g);
 Mi(new THREE.PlaneGeometry(3.6,2.4),new THREE.MeshBasicMaterial({color:'#ffd892'}),X+11.95,4,4.5,g).rotation.y=-Math.PI/2;outline(M(new THREE.BoxGeometry(.25,2.8,4),C('#6a4428'),X+11.98,4,4.5,g),1.01).scale.set(1,1,1);
 const cur=Mi(new THREE.PlaneGeometry(1.6,2.3),C('#b5543a',{side:THREE.DoubleSide}),X+11.8,4,3.5,g);cur.rotation.y=-Math.PI/2;
 Mi(new THREE.PlaneGeometry(2.2,.6),new THREE.MeshBasicMaterial({map:textTex('البواب',256,64,'#2a2a30','#f2d48a','bold 40px Cairo')}),X+11.9,6.1,-1,g).rotation.y=-Math.PI/2;
 // mailboxes
 Mi(new THREE.PlaneGeometry(4.5,2.6),TM(tex(256,160,(c,W,H)=>{c.fillStyle='#8a6a3a';c.fillRect(0,0,W,H);for(let i=0;i<6;i++)for(let j=0;j<4;j++){c.fillStyle='#b08d3c';c.fillRect(6+i*41,6+j*38,36,32);c.fillStyle='#1a1410';c.fillRect(12+i*41,12+j*38,24,4);}})),X-3,4,-7.9,g);
 // plant + lamp
 outline(M(new THREE.CylinderGeometry(.7,.5,1.3,12),C('#b5543a'),X+8.5,.65,-6.5,g),1.04);for(let k=0;k<7;k++){const l=outline(M(new THREE.ConeGeometry(.35,3,4),C('#3f8a3a'),X+8.5,2.4,-6.5,g),1.04);l.rotation.z=(k-3)*.28;l.rotation.x=(k%2?.2:-.2);l.scale.z=.3;}
 const lampS=new THREE.Sprite(glowMat());lampS.scale.set(1.6,1.6,1);lampS.position.set(X,8,0);g.add(lampS);M(new THREE.SphereGeometry(.6,12,8),new THREE.MeshBasicMaterial({color:'#fff3d0'}),X,8.1,0,g);
 const lL=new THREE.PointLight('#ffe6b0',30,40,1.2);lL.position.set(X,7.4,1);g.add(lL);g.userData.lampL=lL;
}
// ---- ELEVATOR CABIN (x=400, door at z=-3) ----
{const g=envG('elev');const X=400;const wM=TM(panelTex('#a8794a','#7a5232',2,1));
 Mi(new THREE.PlaneGeometry(6,6).rotateX(-Math.PI/2),C('#4a4038'),X,0,0,g).receiveShadow=true;Mi(new THREE.PlaneGeometry(6,6).rotateX(Math.PI/2),C('#d8d0bc'),X,7.4,0,g);
 const pnl=Mi(new THREE.PlaneGeometry(3,1.6),new THREE.MeshBasicMaterial({color:'#fff6dc'}),X,7.38,0,g);pnl.rotation.x=Math.PI/2;g.userData.ceil=pnl;
 for(const [x,z,ry,w] of[[X-3,0,Math.PI/2,6],[X+3,0,-Math.PI/2,6],[X,3,Math.PI,6]])Mi(new THREE.PlaneGeometry(w,7.4),wM,x,3.7,z,g).rotation.y=ry;
 const mir=Mi(new THREE.PlaneGeometry(3.6,3.6),C('#9fb3c0'),X,4.2,2.98,g);mir.rotation.y=Math.PI;
 for(const s of[-1,1])Mi(new THREE.PlaneGeometry(1.05,7.4),wM,X+s*2.47,3.7,-3,g);Mi(new THREE.PlaneGeometry(6,1.6),wM,X,6.6,-3,g);
 for(const s of[-1,1])Mi(new THREE.BoxGeometry(.12,.12,5),C('#c9a24a'),X+s*2.88,3,0,g);
 const bp=Mi(new THREE.PlaneGeometry(.9,2.25),new THREE.MeshToonMaterial({map:btnT,gradientMap:grad}),X+2.97,3.8,-2.1,g);bp.rotation.y=-Math.PI/2;
 Mi(new THREE.PlaneGeometry(1.3,.65),new THREE.MeshBasicMaterial({map:dispT}),X,6.6,-2.95,g);
 g.userData.door=elevDoor(g,X,-3.15,3.9,5.8);
 const cl=new THREE.PointLight('#fff0cc',22,16,1.2);cl.position.set(X,6.8,0);g.add(cl);g.userData.cl=cl;
}
// ---- BURNT 13th FLOOR CORRIDOR (behind elevator door: x=400, z<-3.3) ----
{const g=envG('burnt');const X=400;const wM=TM(sootTex(3,1)),cM=TM(sootTex(2,4,'#1c1816'));
 Mi(new THREE.PlaneGeometry(7,40).rotateX(-Math.PI/2),TM(crackTileTex(2,10)),X,0,-23.3,g).receiveShadow=true;Mi(new THREE.PlaneGeometry(7,40).rotateX(Math.PI/2),cM,X,7,-23.3,g);
 for(const s of[-1,1])Mi(new THREE.PlaneGeometry(40,7),wM,X+s*3.5,3.5,-23.3,g).rotation.y=-s*Math.PI/2;
 for(const s of[-1,1])Mi(new THREE.PlaneGeometry(2,7),wM,X+s*3,3.5,-3.35,g).rotation.y=Math.PI;
 const d37p=new THREE.Group();d37p.position.set(X-1.6,0,-43);g.add(d37p);const d37=outline(M(new THREE.BoxGeometry(3.2,5.8,.3),TM(doorTex('#3a2a1e')),1.6,2.9,0,d37p),1.02);g.userData.d37=d37p;
 const shoe=new THREE.Group();shoe.position.set(X+2.6,0,-27.6);g.add(shoe);const sh1=outline(M(new THREE.SphereGeometry(.28,12,8),C('#6a4a3a'),0,.14,0,shoe),1.08);sh1.scale.set(.8,.55,1.5);shoe.rotation.y=.5;g.userData.shoe=shoe;
 Mi(new THREE.PlaneGeometry(1,.5),new THREE.MeshBasicMaterial({map:textTex('37',128,64,'#b08d3c','#1a1208','bold 46px Arial')}),1.6,4.9,.18,d37p);
 const strip=Mi(new THREE.PlaneGeometry(3.2,.12),new THREE.MeshBasicMaterial({color:'#ffcf5a'}),X,.06,-42.82,g);g.userData.strip=strip;
 const glowF=new THREE.Sprite(glowMat());glowF.material.color.set('#ffb040');glowF.scale.set(5,1.6,1);glowF.position.set(X,.3,-42.5);g.add(glowF);g.userData.glowF=glowF;
 const yL=new THREE.PointLight('#ffb040',8,9,1.5);yL.position.set(X,.4,-42);g.add(yL);g.userData.yL=yL;
 for(const [z,s,n] of[[-17,-1,'35'],[-29,1,'36']]){const d=outline(M(new THREE.BoxGeometry(.25,5.6,3),TM(doorTex('#2a1e16')),X+s*3.4,2.8,z,g),1.02);Mi(new THREE.PlaneGeometry(.8,.4),new THREE.MeshBasicMaterial({map:textTex(n,128,64,'#5a4a30','#1a1208','bold 40px Arial'),transparent:true,opacity:.55}),X+s*3.25,4.7,z,g).rotation.y=-s*Math.PI/2;}
 const smoke=[];for(let i=0;i<10;i++){const s=new THREE.Sprite(glowMat());s.material.color.set('#4a4540');s.material.blending=THREE.NormalBlending;s.material.opacity=.25;s.scale.set(5,3,1);s.position.set(X-2+rnd()*4,5+rnd()*1.5,-8-i*3.4);g.add(s);smoke.push(s);}g.userData.smoke=smoke;
 const dimL=new THREE.PointLight('#7a8aaa',14,40,1.1);dimL.position.set(X,6,-10);g.add(dimL);g.userData.dimL=dimL;
}

// ---------- characters ----------
const SKIN={P:'#d79a6a',C:'#e3a878',D:'#b9794e'};
const STY3={
 you:{skin:'P',hair:'curly',body:'jacket',c1:'#2f5f9e',shirt:'#f4f2ee',legs:'#1b1d24',stub:1},
 tahar:{skin:'C',hair:'white',body:'vest',c1:'#5d5a52',shirt:'#e9e4d8',legs:'#3a3a40',age:1,mus:'#eeeeee',wide:.82,keys:1},
 sara:{skin:'P',hair:'long',body:'nurse',c1:'#f4f6f8',shirt:'#5fa8b8',legs:'#4f93a3'},
 bouchaib:{skin:'C',hair:'bald',body:'jacket',c1:'#6a4e36',shirt:'#e8e2d6',legs:'#3a3028',age:.9,mus:'#bdbdbd',glasses:1,wide:1.15},
 taharj:{skin:'C',hair:'white',body:'kaftan',c1:'#7a6a52',legs:'#3a3a40',age:1,mus:'#eeeeee',wide:.82},
 kid:{skin:'C',hair:'short',body:'jacket',c1:'#3a6ab0',shirt:'#f4f2ee',legs:'#2a3442'},
 dad:{skin:'C',hair:'short',body:'hivis',c1:'#2a4a7a',shirt:'#2a4a7a',legs:'#2a4a7a',mus:'#1a120d'},
 mom:{skin:'P',hair:'scarf',scarfC:'#d8c8a8',body:'kaftan',c1:'#8a3a4a',legs:'#2a2a33'},
 nb2:{skin:'C',hair:'scarf',scarfC:'#6a8a5a',body:'kaftan',c1:'#c9a46a',legs:'#2a2a33',age:.6},
 nb3:{skin:'P',hair:'bald',body:'vest',c1:'#4a4a5a',shirt:'#e8e2d6',legs:'#2a2a33',age:.7,mus:'#cccccc'},
 neighbor:{skin:'D',hair:'short',body:'raincoat',c1:'#4a5a6a',legs:'#2a2a33'},
};
function bodyTex(S){return tex(512,256,(g,w,h)=>{g.fillStyle=S.c1;g.fillRect(0,0,w,h);noise(g,w,h,3000,.08);const c=w*.5;
  if(S.body==='jacket'){g.fillStyle=S.shirt;g.beginPath();g.moveTo(c-46,0);g.lineTo(c+46,0);g.lineTo(c+18,h);g.lineTo(c-18,h);g.fill();g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.moveTo(c-46,0);g.lineTo(c-92,0);g.lineTo(c-34,h*.55);g.fill();g.beginPath();g.moveTo(c+46,0);g.lineTo(c+92,0);g.lineTo(c+34,h*.55);g.fill();g.strokeStyle='#15100c';g.lineWidth=4;g.beginPath();g.moveTo(c-46,0);g.lineTo(c-22,h);g.moveTo(c+46,0);g.lineTo(c+22,h);g.stroke();for(let i=0;i<3;i++){g.fillStyle='#d8d4cc';g.beginPath();g.arc(c+2,40+i*60,6,0,7);g.fill();}g.strokeStyle='rgba(0,0,0,.3)';g.strokeRect(c+60,h*.58,70,40);}
  if(S.body==='raincoat'){g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=5;g.beginPath();g.moveTo(c,0);g.lineTo(c,h);g.stroke();for(let i=0;i<4;i++){g.fillStyle='#2a2a30';g.beginPath();g.arc(c+16,30+i*55,7,0,7);g.fill();}g.fillStyle='rgba(255,255,255,.18)';g.fillRect(c-120,0,30,h);}
  if(S.body==='apron'){g.fillStyle=S.apron;g.beginPath();g.moveTo(c-80,h*.25);g.lineTo(c+80,h*.25);g.lineTo(c+100,h);g.lineTo(c-100,h);g.fill();g.strokeStyle='#15100c';g.lineWidth=3;g.stroke();g.fillStyle='#e8e8e8';g.fillRect(c-30,0,60,40);}
  if(S.body==='vest'){g.fillStyle=S.shirt;g.fillRect(c-50,0,100,h);g.fillStyle=S.c1;g.beginPath();g.moveTo(c-50,0);g.lineTo(c-10,h);g.lineTo(c-130,h);g.lineTo(c-130,0);g.fill();g.beginPath();g.moveTo(c+50,0);g.lineTo(c+10,h);g.lineTo(c+130,h);g.lineTo(c+130,0);g.fill();g.strokeStyle='#d4a73a';g.lineWidth=3;g.beginPath();g.moveTo(c-20,h*.5);g.quadraticCurveTo(c+10,h*.6,c+25,h*.45);g.stroke();}
  if(S.body==='hivis'){g.fillStyle=S.shirt;g.fillRect(c-45,0,90,h);g.fillStyle='#e8eef5';g.fillRect(0,h*.45,w,22);g.fillRect(0,h*.72,w,22);g.fillStyle=S.shirt;g.fillRect(c-45,h*.45,90,22);g.fillRect(c-45,h*.72,90,22);}
  if(S.body==='kaftan'){g.strokeStyle='#e9c46a';g.lineWidth=6;g.beginPath();g.moveTo(c,0);g.lineTo(c,h);g.stroke();for(let i=0;i<6;i++){g.fillStyle='#e9c46a';g.beginPath();g.arc(c,20+i*40,6,0,7);g.fill();}}
  if(S.body==='nurse'){g.fillStyle=S.shirt;g.beginPath();g.moveTo(c-60,0);g.lineTo(c+60,0);g.lineTo(c+30,h*.45);g.lineTo(c-30,h*.45);g.fill();g.strokeStyle='rgba(0,0,0,.3)';g.lineWidth=4;g.beginPath();g.moveTo(c-60,0);g.lineTo(c-24,h);g.moveTo(c+60,0);g.lineTo(c+24,h);g.stroke();g.strokeStyle='#d94a4a';g.lineWidth=6;g.beginPath();g.moveTo(c+75,60);g.lineTo(c+75,84);g.moveTo(c+63,72);g.lineTo(c+87,72);g.stroke();}
  if(S.body==='uniform'){g.fillStyle=S.shirt;g.beginPath();g.moveTo(c-40,0);g.lineTo(c+40,0);g.lineTo(c,70);g.fill();for(let i=0;i<4;i++){g.fillStyle='#e9c46a';g.beginPath();g.arc(c,95+i*40,6,0,7);g.fill();}g.fillStyle='#111';g.fillRect(0,h*.82,w,18);g.fillStyle='#e9c46a';g.fillRect(c-130,30,40,12);}
 },1,1);}
function makeChar3(kind){const S=STY3[kind];const g=new THREE.Group();g.visible=false;scene.add(g);const skin=C(SKIN[S.skin]);const st={kind,S};
 const fc=document.createElement('canvas');fc.width=512;fc.height=256;const ft=new THREE.CanvasTexture(fc);ft.colorSpace=THREE.SRGBColorSpace;st.fc=fc;st.ft=ft;st.fk='';
 const legLen=1.55,long=S.body==='kaftan'||S.body==='raincoat';
 const hips=new THREE.Group();hips.position.y=legLen;g.add(hips);st.hips=hips;st.legLen=legLen;
 st.legs=[];for(const s of[-1,1]){const l=new THREE.Group();l.position.set(s*.2,long?-.1:0,0);hips.add(l);const lg=long?legLen-.6:legLen-.1;outline(M(new THREE.CylinderGeometry(.065,.06,lg,8),C('#15100c'),0,-lg/2-(long?.5:0),0,l),1.0);const sh=outline(M(new THREE.SphereGeometry(.17,12,8),C('#151515'),0,-legLen+.12,.08,l),1.08);sh.scale.set(1,.55,1.5);st.legs.push(l);}
 const W=S.wide||1;const torsoH=long?2.15:1.65;const tm=TM(bodyTex(S));
 const tg=new THREE.CapsuleGeometry(.52*W,torsoH-1.04*W,8,24);tg.rotateY(Math.PI);const torso=outline(M(tg,tm,0,long?torsoH/2-.55:torsoH/2,0,hips),1.035);torso.scale.set(1,1,.62);st.torso=torso;
 const chest=new THREE.Group();chest.position.y=long?1.6:1.65;hips.add(chest);st.chest=chest;
 const head=new THREE.Group();head.position.y=.98;chest.add(head);st.head=head;
 const hm=new THREE.MeshToonMaterial({map:ft,gradientMap:grad});outline(M(new THREE.SphereGeometry(.95,40,28),hm,0,0,0,head),1.03);
 for(const s of[-1,1])outline(M(new THREE.SphereGeometry(.18,12,8),skin,s*.94,-.05,0,head),1.1);
 const hc=new THREE.MeshToonMaterial({color:'#1d1510',gradientMap:grad});
 if(S.hair==='curly'){for(let i=0;i<20;i++){const a=i/20*Math.PI*2;M(new THREE.SphereGeometry(.28+rnd()*.07,10,8),hc,Math.cos(a)*.82*(i%2?.85:1),.62+rnd()*.2,Math.sin(a)*.75-.12,head);}M(new THREE.SphereGeometry(.92,24,16,0,Math.PI*2,0,Math.PI*.42),hc,0,.16,-.06,head);}
 if(S.hair==='short'||S.hair==='slick'){const h=M(new THREE.SphereGeometry(.98,24,16,0,Math.PI*2,0,Math.PI*.4),hc,0,.12,-.04,head);h.rotation.x=-.18;}
 if(S.hair==='bob'){M(new THREE.SphereGeometry(1.02,24,16,Math.PI*.78,Math.PI*1.44,0,Math.PI*.62),hc,0,.05,0,head);}
 if(S.hair==='white'){const h=M(new THREE.SphereGeometry(.98,24,16,0,Math.PI*2,0,Math.PI*.36),C('#ececec'),0,.14,-.05,head);h.rotation.x=-.25;for(const s of[-1,1])M(new THREE.SphereGeometry(.34,10,8),C('#ececec'),s*.8,.2,-.22,head);}
 if(S.hair==='long'){M(new THREE.SphereGeometry(1.0,24,16,0,Math.PI*2,0,Math.PI*.42),hc,0,.1,-.04,head);const b=M(new THREE.SphereGeometry(.95,20,14,Math.PI*.15,Math.PI*.7,Math.PI*.3,Math.PI*.6),hc,0,-.15,-.12,head);b.rotation.y=Math.PI;b.scale.set(1.04,1.25,1);const pt=outline(M(new THREE.CapsuleGeometry(.22,.7,4,10),hc,0,-.55,-.9,head),1.06);pt.rotation.x=.35;}
 if(S.glasses){for(const s of[-1,1]){const r=M(new THREE.TorusGeometry(.2,.035,6,16),C('#1a1a1a'),s*.32,-.02,.92,head);r.rotation.y=s*.3;}M(new THREE.BoxGeometry(.2,.035,.035),C('#1a1a1a'),0,.0,.97,head);}
 if(S.hair==='bald'){for(const s of[-1,1])M(new THREE.SphereGeometry(.28,10,8),C('#e8e8e8'),s*.82,.15,-.2,head);}
 if(S.hair==='scarf'){outline(M(new THREE.SphereGeometry(1.08,32,20,Math.PI*.72,Math.PI*1.56,0,Math.PI*.85),C(S.scarfC,{side:THREE.DoubleSide}),0,0,0,head),1.02);outline(M(new THREE.CylinderGeometry(.62,.85,.5,24),C(S.scarfC),0,-.95,0,head),1.03);}
 if(S.hat==='beanie'){outline(M(new THREE.SphereGeometry(1,24,16,0,Math.PI*2,0,Math.PI*.45),C(S.hatC),0,.12,0,head),1.03);outline(M(new THREE.TorusGeometry(.92,.12,8,24),C(S.hatC),0,.22,0,head).rotateX(Math.PI/2),1.04);}
 if(S.hat==='whitecap'){outline(M(new THREE.CylinderGeometry(1.05,.92,.45,24),C('#ffffff'),0,.75,0,head),1.03);outline(M(new THREE.CylinderGeometry(.6,.6,.06,20,1,false,0,Math.PI),C('#0f1a36'),0,.55,.6,head).rotateX(-.25),1.04);M(new THREE.SphereGeometry(.12,10,8),C('#e9c46a'),0,.78,.95,head);}
 if(S.hat==='navycap'){outline(M(new THREE.CylinderGeometry(1.02,.92,.45,24),C('#1b2a50'),0,.72,0,head),1.03);outline(M(new THREE.CylinderGeometry(.6,.6,.06,20,1,false,0,Math.PI),C('#0f1a36'),0,.52,.6,head).rotateX(-.25),1.04);}
 if(S.beard==='white'){const b=outline(M(new THREE.SphereGeometry(.8,24,16,0,Math.PI*2,Math.PI*.45,Math.PI*.55),C('#f2f2f2'),0,-.18,.2,head),1.03);b.scale.set(1,1.15,.9);}
 if(S.keys){const kr=new THREE.Group();kr.position.set(.48*W,.25,.18);hips.add(kr);outline(M(new THREE.TorusGeometry(.13,.025,6,14),C('#c9a24a'),0,0,0,kr),1.1);for(let k=0;k<4;k++){const ky=M(new THREE.BoxGeometry(.035,.2,.02),C(k%2?'#c9a24a':'#b8bcc2'),Math.cos(k*1.2)*.1,-.16,.02,kr);ky.rotation.z=(k-1.5)*.35;}st.beltKeys=kr;}
 st.arms=[];for(const s of[-1,1]){const a=new THREE.Group();a.position.set(s*.5*W,-.25,0);chest.add(a);const ac=C(S.body==='kaftan'||S.body==='raincoat'||S.body==='uniform'||S.body==='jacket'?S.c1:SKIN[S.skin]);outline(M(new THREE.CylinderGeometry(.065,.06,.72,8),ac,0,-.36,0,a),1.0);const el2=new THREE.Group();el2.position.y=-.72;a.add(el2);outline(M(new THREE.CylinderGeometry(.06,.055,.66,8),ac,0,-.33,0,el2),1.0);
  const hd=new THREE.Group();hd.position.y=-.72;el2.add(hd);outline(M(new THREE.SphereGeometry(.14,12,10),skin,0,0,0,hd),1.1);const th=outline(M(new THREE.CapsuleGeometry(.04,.08,4,6),skin,s*.12,.02,.06,hd),1.15);th.rotation.z=s*.9;
  const item=new THREE.Group();item.position.set(0,-.18,.12);hd.add(item);st.arms.push({a,el:el2,hd,item,s,ik:''});}
 g.traverse(o=>{if(o.isMesh)o.castShadow=true;});st.g=g;return st;}
const ITEM3={
 tea:p=>{outline(M(new THREE.LatheGeometry([new THREE.Vector2(0,0),new THREE.Vector2(.22,.02),new THREE.Vector2(.26,.18),new THREE.Vector2(.16,.32),new THREE.Vector2(.06,.42),new THREE.Vector2(.0,.44)],16),C('#cfd3da'),0,-.1,0,p),1.06);const sp=M(new THREE.CylinderGeometry(.03,.05,.3,6),C('#cfd3da'),.25,.08,0,p);sp.rotation.z=-1;},
 notebook:p=>{outline(M(new THREE.BoxGeometry(.5,.66,.06),C('#6a4a2e'),0,0,0,p),1.05);M(new THREE.PlaneGeometry(.44,.6),C('#f6efdc'),0,0,.035,p);},
 torch:p=>{outline(M(new THREE.CylinderGeometry(.07,.07,.4,10),C('#2b2f38'),0,.1,0,p),1.08);const s=new THREE.Sprite(glowMat());s.scale.set(1.8,1.8,1);s.position.y=.4;p.add(s);const L=new THREE.PointLight('#fff0c0',6,10);L.position.y=.4;p.add(L);},
 phone:p=>{outline(M(new THREE.BoxGeometry(.24,.42,.04),C('#15171c'),0,.05,0,p),1.06);M(new THREE.PlaneGeometry(.2,.36),new THREE.MeshBasicMaterial({color:'#bfe0ff'}),0,.05,.025,p);},
 box:p=>{outline(M(new THREE.BoxGeometry(.55,.38,.4),TM(woodTex('#7a4e2a',1,1)),0,0,0,p),1.05);M(new THREE.BoxGeometry(.12,.12,.05),C('#d8b648'),0,0,.22,p);},
 crate:p=>{outline(M(new THREE.BoxGeometry(.9,.55,.6),TM(woodTex('#8a5a2e',1,1)),0,0,.1,p),1.04);},
 cig:p=>{M(new THREE.CylinderGeometry(.02,.02,.16,6),C('#f4f4f4'),0,.08,0,p);const s=new THREE.Sprite(glowMat());s.scale.set(.5,.5,1);s.position.y=.17;p.add(s);},
 key:p=>{outline(M(new THREE.TorusGeometry(.07,.02,6,12),C('#d8b648'),0,.05,0,p),1.1);M(new THREE.BoxGeometry(.03,.18,.02),C('#d8b648'),0,-.08,0,p);},
 map:p=>{outline(M(new THREE.BoxGeometry(.6,.45,.02),C('#e8dcc0'),0,0,0,p),1.05);},
 bell:p=>{outline(M(new THREE.CylinderGeometry(.06,.06,.25,8),C('#2b2f38'),0,0,0,p),1.08);const s=new THREE.Sprite(glowMat());s.scale.set(1.2,1.2,1);s.position.y=.18;p.add(s);},
 suitcase:p=>{outline(M(new THREE.BoxGeometry(.9,1.15,.42),C('#7a2e2a'),0,-.7,0,p),1.04);M(new THREE.BoxGeometry(.3,.07,.07),C('#1a1a1a'),0,-.08,0,p);M(new THREE.BoxGeometry(.92,.08,.44),C('#c9a24a'),0,-.5,0,p);},
 bag:p=>{outline(M(new THREE.BoxGeometry(.8,1,.36),C('#3a5a3a'),0,-.62,0,p),1.04);},
 keyring:p=>{outline(M(new THREE.TorusGeometry(.17,.03,6,16),C('#c9a24a'),0,0,0,p),1.1);for(let k=0;k<5;k++){const ky=outline(M(new THREE.BoxGeometry(.05,.3,.025),C(k%2?'#c9a24a':'#b8bcc2'),Math.cos(k*1.25)*.14,-.24,.03,p),1.1);ky.rotation.z=(k-2)*.3;}},
 book:p=>{outline(M(new THREE.BoxGeometry(.5,.66,.12),C('#8a2a2a'),0,0,0,p),1.05);},
 candle:p=>{outline(M(new THREE.CylinderGeometry(.06,.06,.4,8),C('#f2ead8'),0,.15,0,p),1.08);},
 toycar:p=>{outline(M(new THREE.BoxGeometry(.4,.14,.2),C('#d42a1e'),0,0,0,p),1.08);outline(M(new THREE.BoxGeometry(.2,.12,.18),C('#d42a1e'),-.03,.12,0,p),1.08);M(new THREE.BoxGeometry(.18,.1,.21),C('#1a1410'),.08,.02,0,p);},
 candleL:p=>{outline(M(new THREE.CylinderGeometry(.06,.06,.4,8),C('#f2ead8'),0,.15,0,p),1.08);const s=new THREE.Sprite(glowMat());s.material.color.set('#ffb040');s.scale.set(.8,1,1);s.position.y=.5;p.add(s);const L=new THREE.PointLight('#ffb050',5,14,1.6);L.position.z=.6;L.position.y=.6;p.add(L);},
 dossier:p=>{outline(M(new THREE.BoxGeometry(.6,.8,.08),C('#2f6ab8'),0,0,0,p),1.05);M(new THREE.PlaneGeometry(.4,.1),C('#ffffff'),0,.2,.045,p);},
 photo:p=>{outline(M(new THREE.BoxGeometry(.6,.78,.06),C('#c9a24a'),0,0,0,p),1.05);M(new THREE.PlaneGeometry(.5,.66),C('#d8cfb8'),0,0,.035,p);},
 cup:p=>{outline(M(new THREE.CylinderGeometry(.09,.07,.18,12),C('#f4f4f4'),0,0,0,p),1.08);},
};
ITEM3_LATE.forEach(f=>f());
// ======== MORE ENVIRONMENTS ========
const wallP=TM(plasterTex(3,1,'#e9dcc0')),wallG=TM(plasterTex(3,1,'#9fb5a8')),woodF=TM(woodTex('#8a6a46',4,4)),darkWood=TM(woodTex('#5a3c24',1,1));
function room(g,X,Z,w,d,h,wm,fm,o={}){Mi(new THREE.PlaneGeometry(w,d).rotateX(-Math.PI/2),fm,X,0,Z,g).receiveShadow=true;if(!o.noCeil)Mi(new THREE.PlaneGeometry(w,d).rotateX(Math.PI/2),o.cm||C('#e4dccb'),X,h,Z,g);
 const b=Mi(new THREE.PlaneGeometry(w,h),wm,X,h/2,Z-d/2,g);const l=Mi(new THREE.PlaneGeometry(d,h),wm,X-w/2,h/2,Z,g);l.rotation.y=Math.PI/2;const r=Mi(new THREE.PlaneGeometry(d,h),wm,X+w/2,h/2,Z,g);r.rotation.y=-Math.PI/2;if(o.front){const f=Mi(new THREE.PlaneGeometry(w,h),wm,X,h/2,Z+d/2,g);f.rotation.y=Math.PI;}}
const lampLight=(g,x,y,z,i=22,col='#ffe2b0',dist=30)=>{const L=new THREE.PointLight(col,i,dist,1.2);L.position.set(x,y,z);g.add(L);return L;};
const glowAt=(g,x,y,z,s=1.6,col)=>{const s2=new THREE.Sprite(glowMat());if(col)s2.material.color.set(col);s2.scale.set(s,s,1);s2.position.set(x,y,z);g.add(s2);return s2;};
const floorNumC=document.createElement('canvas');floorNumC.width=128;floorNumC.height=128;const floorNumT=new THREE.CanvasTexture(floorNumC);let fnK='';
window.setFloorNum=function(n){if(n===fnK)return;fnK=n;const g=floorNumC.getContext('2d');g.fillStyle='#e9dcc0';g.fillRect(0,0,128,128);g.fillStyle='#2f4a5a';g.font='bold 92px Arial';g.textAlign='center';g.textBaseline='middle';g.fillText(String(n),64,70);floorNumT.needsUpdate=true;};setFloorNum(1);
// ---- STAIRS (x=800): two flights + landing, floor number on wall ----
{const g=envG('stairs');const X=800;room(g,X,0,14,16,16,wallP,TM(checkTex(3,3)),{noCeil:1});
 const stM=TM(plasterTex(1,1,'#cbbfa8'));
 for(let i=0;i<10;i++)outline(M(new THREE.BoxGeometry(3.6,.55,.85),stM,X-3,.275+i*.55,5-i*.85,g),1.01);
 outline(M(new THREE.BoxGeometry(14,.4,4.2),stM,X,5.3,-5.9,g),1.005);
 for(let i=0;i<10;i++)outline(M(new THREE.BoxGeometry(3.6,.55,.85),stM,X+3,5.775+i*.55,-3.4+i*.85,g),1.01);
 for(let i=0;i<10;i+=2)Mi(new THREE.BoxGeometry(.08,2,.08),ironM,X-1.1,1.5+i*.55,5-i*.85,g);const r1=Mi(new THREE.BoxGeometry(.14,.14,10.5),C('#6a4428'),X-1.1,5.3,1.2,g);r1.rotation.x=Math.atan2(.55,.85);
 for(let i=0;i<10;i+=2)Mi(new THREE.BoxGeometry(.08,2,.08),ironM,X+1.1,7+i*.55,-3.4+i*.85,g);const r2=Mi(new THREE.BoxGeometry(.14,.14,10.5),C('#6a4428'),X+1.1,10.8,.4,g);r2.rotation.x=-Math.atan2(.55,.85);
 const fn=Mi(new THREE.PlaneGeometry(2.2,2.2),TM(floorNumT),X,8.8,-7.98,g);
 const iron=outline(M(new THREE.BoxGeometry(2.6,4.4,.15),TM(plasterTex(1,1,'#e2d5ba')),X-4.4,7.7,-7.9,g),1.02);iron.visible=false;g.userData.iron=iron;
 const crack=Mi(new THREE.PlaneGeometry(2.4,4.2),new THREE.MeshBasicMaterial({color:'#050505'}),X-4.4+1.25,7.7,-7.95,g);crack.scale.x=.04;crack.visible=false;g.userData.crack=crack;
 const sL=lampLight(g,X,14,0,26);g.userData.L=sL;M(new THREE.SphereGeometry(.5,10,8),new THREE.MeshBasicMaterial({color:'#fff3d0'}),X,15.5,0,g);
}
// ---- LANDING / normal hallway behind elevator (x=400, z<-3.3) ----
{const g=envG('landing');const X=400;room(g,X,-14,16,22,7.5,wallP,TM(checkTex(4,6)));
 for(const [x,z,ry,n] of[[X-7.95,-10,Math.PI/2,'91'],[X+7.95,-10,-Math.PI/2,'92'],[X-7.95,-19,Math.PI/2,'93']]){const d=outline(M(new THREE.BoxGeometry(.25,5.6,3),TM(doorTex('#6a4428')),x,2.8,z,g),1.02);const p=Mi(new THREE.PlaneGeometry(.8,.4),new THREE.MeshBasicMaterial({map:textTex(n,128,64,'#c9a24a','#1a1208','bold 40px Arial')}),x+(ry>0?.15:-.15),4.7,z,g);p.rotation.y=ry;}
 lampLight(g,X,7,-10,26);glowAt(g,X,7.2,-10,1.4);
}
// ---- YOUR ROOM (x=1000) ----
{const g=envG('room');const X=1000;room(g,X,0,16,14,7.5,wallG,woodF);
 // window with night city
 const win=Mi(new THREE.PlaneGeometry(5,3.6),new THREE.MeshBasicMaterial({map:tex(256,192,(c,w,h)=>{c.fillStyle='#0d1630';c.fillRect(0,0,w,h);for(let i=0;i<9;i++){const bx=i*30,bh=60+rnd()*110;c.fillStyle='#1a2440';c.fillRect(bx,h-bh,26,bh);for(let k=0;k<12;k++)if(rnd()<.35){c.fillStyle='#ffd07a';c.fillRect(bx+4+(k%3)*7,h-bh+6+Math.floor(k/3)*14,4,6);}}c.fillStyle='#f4efd8';c.beginPath();c.arc(200,40,14,0,7);c.fill();})}),X+2,4.4,-6.95,g);
 outline(M(new THREE.BoxGeometry(5.4,.3,.5),C('#f2ead8'),X+2,2.5,-6.8,g),1.02);for(const s of[-1,1])Mi(new THREE.BoxGeometry(.2,3.8,.2),C('#f2ead8'),X+2+s*2.6,4.4,-6.85,g);
 // bed
 outline(M(new THREE.BoxGeometry(3.4,1,6),darkWood,X-5.6,.5,-3,g),1.02);outline(M(new THREE.BoxGeometry(3.2,.5,5.8),C('#e8e4dc'),X-5.6,1.25,-3,g),1.02);outline(M(new THREE.BoxGeometry(3.2,.3,3.6),C('#c0392b'),X-5.6,1.55,-2,g),1.02);outline(M(new THREE.BoxGeometry(1.8,.5,1),C('#f4f4f4'),X-5.6,1.7,-5.4,g),1.03);
 // desk + books + lamp
 outline(M(new THREE.BoxGeometry(4,.25,2),darkWood,X+5,2.6,-5.6,g),1.02);for(const s of[-1,1])Mi(new THREE.BoxGeometry(.2,2.6,1.8),darkWood,X+5+s*1.8,1.3,-5.6,g);
 for(let i=0;i<4;i++)outline(M(new THREE.BoxGeometry(.9,.18,1.2),C(['#2f5f9e','#c0392b','#e9c46a','#3a7a4a'][i]),X+4.2,2.8+i*.18,-5.6,g),1.04);
 outline(M(new THREE.CylinderGeometry(.08,.08,1.2,8),ironM,X+6.4,3.3,-6,g),1.08);outline(M(new THREE.ConeGeometry(.45,.5,12,1,true),C('#2f6a4a',{side:THREE.DoubleSide}),X+6.4,3.9,-5.8,g),1.04);glowAt(g,X+6.4,3.7,-5.7,1.6);
 outline(M(new THREE.BoxGeometry(1.1,2.2,1.1),darkWood,X+5,1.1,-3.6,g),1.03);// chair
 // door
 outline(M(new THREE.BoxGeometry(.25,5.8,3),TM(doorTex('#6a4428')),X+7.9,2.9,3,g),1.02);
 // poster
 Mi(new THREE.PlaneGeometry(2,2.6),TM(tex(128,160,(c,w,h)=>{c.fillStyle='#e9c46a';c.fillRect(0,0,w,h);c.fillStyle='#2f5f9e';c.beginPath();c.arc(64,70,40,0,7);c.fill();c.fillStyle='#17120f';c.font='bold 18px Arial';c.textAlign='center';c.fillText('MED',64,140);})),X-2,4.6,-6.95,g);
 lampLight(g,X,7,0,22,'#ffe2b0',34);lampLight(g,X+6,4,-4,10,'#ffd07a',12);
}
// ---- TAHAR's LOGE (x=1200) ----
{const g=envG('loge');const X=1200;room(g,X,0,12,11,7.5,TM(plasterTex(3,1,'#d9c39a')),TM(woodTex('#6a4a2e',4,4)));
 outline(M(new THREE.BoxGeometry(6,.5,3),C('#7a3a2a'),X-2.5,.25,-3.8,g),1.02);outline(M(new THREE.BoxGeometry(5.8,.4,2.8),C('#c9a46a'),X-2.5,.7,-3.8,g),1.02);// mattress
 outline(M(new THREE.CylinderGeometry(1.4,1.4,.15,20),C('#8a5a2e'),X+2.5,1.4,-1.5,g),1.02);outline(M(new THREE.CylinderGeometry(.15,.2,1.4,8),C('#6a4428'),X+2.5,.7,-1.5,g),1.05);// round table
 ITEM3.tea((()=>{const p=new THREE.Group();p.position.set(X+2.2,1.75,-1.5);g.add(p);return p;})());
 for(let k=0;k<3;k++)outline(M(new THREE.CylinderGeometry(.1,.08,.25,10),C('#e8f0f4',{transparent:true,opacity:.8}),X+2.9+(k-1)*.3,1.6,-1,g),1.1);
 outline(M(new THREE.BoxGeometry(1.4,.8,.6),C('#5a3c24'),X+4.2,3.2,-5.2,g),1.04);Mi(new THREE.CircleGeometry(.25,14),C('#2a2a2a'),X+3.8,3.2,-4.88,g);// radio on shelf
 outline(M(new THREE.BoxGeometry(2.6,.15,.8),darkWood,X+4.2,2.75,-5.1,g),1.03);
 M(new THREE.CylinderGeometry(.04,.04,.3,6),C('#8a8a8a'),X-1,5,-5.35,g).rotation.x=Math.PI/2;// nail
 const fr=outline(M(new THREE.BoxGeometry(1.4,1.8,.08),C('#c9a24a'),X-1,4.3,-5.4,g),1.04);fr.visible=false;g.userData.frame=fr;
 const ld=outline(M(new THREE.BoxGeometry(3,5.8,.25),TM(doorTex('#6a4428')),X,2.9,5.4,g),1.02);g.userData.door=ld;
 lampLight(g,X,6.5,0,20,'#ffd8a0',28);glowAt(g,X,7,0,1.3);
}
// ---- SYNDIC OFFICE (x=1400) ----
{const g=envG('office');const X=1400;room(g,X,0,14,12,7.5,TM(plasterTex(3,1,'#d6cbb4')),TM(woodTex('#7a5a3a',4,4)));
 const cab=outline(M(new THREE.BoxGeometry(4,6,1.6),darkWood,X-4,3,-5,g),1.02);for(const s of[-1,1])Mi(new THREE.BoxGeometry(1.8,5.6,.05),TM(woodTex('#6a4a2e',1,1)),X-4+s*.95,3,-4.15,g);
 for(let i=0;i<5;i++)outline(M(new THREE.BoxGeometry(.5,.9,1),C(['#c9b48a','#a8946a','#d8c49a'][i%3]),X-0.6+i*.55,4.1,-5.3,g),1.03);
 outline(M(new THREE.BoxGeometry(3.2,.15,1.2),darkWood,X+.5,3.6,-5.4,g),1.03);
 outline(M(new THREE.BoxGeometry(6,.3,3),darkWood,X+2,2.6,-1.5,g),1.02);for(const [a,b] of[[-2.7,-1.2],[2.7,-1.2],[-2.7,1.2],[2.7,1.2]])Mi(new THREE.BoxGeometry(.25,2.6,.25),darkWood,X+2+a,1.3,-1.5+b,g);
 const plan=Mi(new THREE.PlaneGeometry(4,2.6).rotateX(-Math.PI/2),TM(tex(256,160,(c,w,h)=>{c.fillStyle='#e8d9a8';c.fillRect(0,0,w,h);c.strokeStyle='#3a5a8a';c.lineWidth=2;for(let i=0;i<14;i++){c.strokeRect(70,8+i*10.5,110,10.5);}c.fillStyle='#3a5a8a';c.font='10px Arial';c.fillText('1968',10,20);noise(c,w,h,600,.06);})),X+2,2.77,-1.5,g);plan.visible=false;g.userData.plan=plan;
 const paper=Mi(new THREE.PlaneGeometry(2,2.6).rotateX(-Math.PI/2),TM(tex(128,160,(c,w,h)=>{c.fillStyle='#e8dcb4';c.fillRect(0,0,w,h);c.fillStyle='#2a2a2a';c.fillRect(10,10,108,18);for(let i=0;i<10;i++)c.fillRect(10,40+i*10,50+rnd()*50,4);c.fillStyle='#8a8a8a';c.fillRect(66,40,52,50);noise(c,w,h,600,.08);})),X+2.6,2.78,-1.2,g);paper.visible=false;g.userData.paper=paper;
 const book=outline(M(new THREE.BoxGeometry(1.4,.3,1.8),C('#2a4a6a'),X+.4,2.9,-1.2,g),1.04);book.visible=false;g.userData.book=book;
 outline(M(new THREE.CylinderGeometry(.1,.1,1,8),ironM,X+4.4,3.3,-2.4,g),1.06);outline(M(new THREE.ConeGeometry(.5,.5,12,1,true),C('#2f6a4a',{side:THREE.DoubleSide}),X+4.4,3.9,-2.2,g),1.04);glowAt(g,X+4.4,3.7,-2.1,1.8);
 lampLight(g,X+3,5,0,20,'#ffd8a0',28);lampLight(g,X,7,1,14);
}
// ---- APT 37 interior (behind door 37: x=400, z<-43.3) ----
{const g=envG('apt37');const X=400;const wM=TM(sootTex(2,1));Mi(new THREE.PlaneGeometry(14,12).rotateX(-Math.PI/2),TM(crackTileTex(3,3)),X,0,-49.3,g).receiveShadow=true;
 Mi(new THREE.PlaneGeometry(14,7),wM,X,3.5,-55.3,g);for(const s of[-1,1]){const w=Mi(new THREE.PlaneGeometry(12,7),wM,X+s*7,3.5,-49.3,g);w.rotation.y=-s*Math.PI/2;}Mi(new THREE.PlaneGeometry(14,12).rotateX(Math.PI/2),TM(sootTex(2,2,'#1a1614')),X,7,-49.3,g);
 for(const s of[-1,1]){const fw=Mi(new THREE.PlaneGeometry(5.4,7),wM,X+s*4.3,3.5,-43.35,g);fw.rotation.y=Math.PI;}
 const box=outline(M(new THREE.BoxGeometry(2.2,1.2,1.4),TM(woodTex('#6a4a2e',1,1)),X+1.6,.6,-51,g),1.03);
 outline(M(new THREE.CylinderGeometry(.16,.13,.45,12),C('#f4f4f4'),X+1.2,1.43,-51,g),1.08);outline(M(new THREE.SphereGeometry(.3,12,8),C('#d9a85a'),X+2,1.35,-51,g),1.06).scale.set(1.3,.6,1);
 const ph=(c1,lbl)=>TM(tex(128,160,(c,w,h)=>{c.fillStyle='#c9a24a';c.fillRect(0,0,w,h);c.fillStyle='#d8cfb8';c.fillRect(10,10,108,140);c.fillStyle=c1;c.beginPath();c.arc(64,62,26,0,7);c.fill();c.fillRect(34,90,60,50);c.fillStyle='#3a3a3a';c.font='bold 14px Arial';c.textAlign='center';c.fillText(lbl,64,146);noise(c,w,h,500,.1);}));
 const p1=outline(M(new THREE.BoxGeometry(1,1.3,.08),ph('#4a6a8a','ب'),X-1.2,.75,-52.3,g),1.04);p1.rotation.x=-.25;const p2=outline(M(new THREE.BoxGeometry(1,1.3,.08),ph('#b5543a','م'),X+.1,.75,-52.3,g),1.04);p2.rotation.x=-.25;g.userData.photos=[p1,p2];
 const car=new THREE.Group();car.position.set(X-2.2,.12,-50.2);g.add(car);ITEM3.toycar(car);car.scale.setScalar(1.4);g.userData.car=car;
 const cnd=new THREE.Group();cnd.position.set(X-.5,0,-51.4);g.add(cnd);outline(M(new THREE.CylinderGeometry(.1,.1,.6,10),C('#f2ead8'),0,.3,0,cnd),1.08);const fl=glowAt(cnd,0,.75,0,1.4,'#ffb040');const cL=new THREE.PointLight('#ffb050',16,22,1.3);cL.position.set(0,1.2,0);cnd.add(cL);g.userData.flame=[fl,cL];
 const pl=Mi(new THREE.PlaneGeometry(2.4,.6),new THREE.MeshBasicMaterial({map:textTex('',256,64,'#c9a24a','#1a1208','bold 30px Cairo')}),X,4.4,-55.25,g);pl.visible=false;
}
// ---- FIRE fx group (reusable) ----
const fireG=new THREE.Group();fireG.visible=false;scene.add(fireG);const flames=[];for(let i=0;i<16;i++){const s=new THREE.Sprite(glowMat());s.material.color.set(i%2?'#ff7a1a':'#ffb030');s.scale.set(3,4,1);fireG.add(s);flames.push(s);}const fireL=new THREE.PointLight('#ff7a2a',0,40,1.2);fireG.add(fireL);
window.fireAt=function(t,x,y,z,w=6,h=3){fireG.visible=true;fireL.position.set(x,y+2,z);fireL.intensity=40+Math.sin(t*17)*12;flames.forEach((s,i)=>{const ph=(t*1.3+i*.37)%1;s.position.set(x+(((i*37)%13)/13-.5)*w,y+ph*h,z+(((i*17)%7)/7-.5)*2);const k=Math.sin(Math.PI*ph);s.scale.set(2.4*k+.4,3.4*k+.4,1);s.material.opacity=.9*k;});};
window.burntClean=function(c){const g=ENVS.burnt;g.traverse(o=>{if(o.isMesh&&o.userData.orig===undefined)o.userData.orig=o.material;});};


{const g=envG('clean');const X=400;room(g,X,-23.3,7,40,7,TM(plasterTex(4,1,'#efe6d2')),TM(checkTex(2,10)));
 for(const [z,s,n] of[[-17,-1,'35'],[-29,1,'36']]){outline(M(new THREE.BoxGeometry(.25,5.6,3),TM(doorTex('#6a4428')),X+s*3.4,2.8,z,g),1.02);Mi(new THREE.PlaneGeometry(.8,.4),new THREE.MeshBasicMaterial({map:textTex(n,128,64,'#c9a24a','#1a1208','bold 40px Arial')}),X+s*3.25,4.7,z,g).rotation.y=-s*Math.PI/2;}
 outline(M(new THREE.BoxGeometry(3.2,5.8,.3),TM(doorTex('#6a4428')),X,2.9,-43,g),1.02);Mi(new THREE.PlaneGeometry(1,.5),new THREE.MeshBasicMaterial({map:textTex('37',128,64,'#c9a24a','#1a1208','bold 46px Arial')}),X,4.9,-42.82,g);
 const pl=Mi(new THREE.PlaneGeometry(2.6,1.5),new THREE.MeshBasicMaterial({map:tex(512,296,(c,w,h)=>{c.fillStyle='#c9a24a';c.fillRect(0,0,w,h);c.strokeStyle='#6a4a1a';c.lineWidth=10;c.strokeRect(12,12,w-24,h-24);c.fillStyle='#2a1a08';c.font='bold 44px Cairo';c.textAlign='center';c.fillText('ذكرى عائلة الشقة 37',w/2,110);c.font='bold 36px Cairo';c.fillText('الأب  —  الأم',w/2,180);c.font='28px Cairo';c.fillText('1971',w/2,240);})}),X-3.45,4.2,-24,g);pl.rotation.y=Math.PI/2;g.userData.plaque=pl;
 for(let z=-8;z>-42;z-=10){lampLight(g,X,6.6,z,14,'#ffe8c0',18);glowAt(g,X,6.9,z,1.2);}
}

function drawFace3(st,o){const S=st.S;const k=[o.lid,o.blink,o.mouth,o.ex,o.ey,o.brow,o.browUp,o.smile,o.cry].map(v=>Math.round((v||0)*20)).join(',');if(k===st.fk)return;st.fk=k;
 const g=st.fc.getContext('2d');const base=SKIN[S.skin];g.fillStyle=base;g.fillRect(0,0,512,256);const gr=g.createLinearGradient(0,0,0,256);gr.addColorStop(0,'rgba(255,255,255,.12)');gr.addColorStop(1,'rgba(0,0,0,.14)');g.fillStyle=gr;g.fillRect(0,0,512,256);
 const cx=128,cy=128;if(S.stub){g.fillStyle='rgba(40,25,18,.18)';g.beginPath();g.ellipse(cx,cy+58,70,32,0,0,Math.PI);g.fill();}
 g.fillStyle='rgba(255,110,100,.22)';g.beginPath();g.ellipse(cx-58,cy+26,18,9,0,0,7);g.ellipse(cx+58,cy+26,18,9,0,0,7);g.fill();
 if(S.age){g.strokeStyle=`rgba(90,50,30,${S.age*.5})`;g.lineWidth=2;for(const s of[-1,1]){g.beginPath();g.moveTo(cx+s*52,cy+6);g.quadraticCurveTo(cx+s*58,cy+14,cx+s*50,cy+22);g.stroke();}g.beginPath();g.moveTo(cx-20,cy-48);g.lineTo(cx+20,cy-48);g.stroke();}
 const lidv=Math.max(o.lid??.3,o.blink||0);
 for(const s of[-1,1]){const ex=cx+s*32,ey=cy-6;g.fillStyle='#fff';g.beginPath();g.ellipse(ex,ey,17,19,0,0,7);g.fill();g.save();g.beginPath();g.ellipse(ex,ey,17,19,0,0,7);g.clip();g.fillStyle='#2a1a12';g.beginPath();g.arc(ex+(o.ex||0)*7,ey+3+(o.ey||0)*6,8,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(ex+(o.ex||0)*7+3,ey-1+(o.ey||0)*6,3,0,7);g.fill();
  g.fillStyle=base;g.fillRect(ex-20,ey-22,40,42*lidv);g.restore();g.strokeStyle='#15100c';g.lineWidth=3;g.beginPath();g.ellipse(ex,ey,17,19,0,0,7);g.stroke();if(lidv>.03){g.lineWidth=3.5;g.beginPath();g.moveTo(ex-17,ey-21+42*lidv);g.lineTo(ex+17,ey-21+42*lidv);g.stroke();}
  const by=ey-32-(o.browUp||0)*7,b=o.brow||0;g.lineWidth=7;g.lineCap='round';g.strokeStyle=S.beard==='white'||S.age>.7?'#d8d8d8':'#15100c';g.beginPath();g.moveTo(ex-s*-20,by-b*2);g.quadraticCurveTo(ex,by-6,ex+s*18,by+b*8);g.stroke();}
 if(o.cry){g.fillStyle='#8fd3ff';for(const s of[-1,1]){g.beginPath();g.ellipse(cx+s*36,cy+22,4,7,0,0,7);g.fill();}}
 g.strokeStyle='#15100c';g.lineWidth=3.5;g.beginPath();g.moveTo(cx-2,cy+10);g.quadraticCurveTo(cx-9,cy+24,cx+3,cy+27);g.stroke();
 const m=o.mouth||0,sm=o.smile||0;if(m<.06){g.lineWidth=3.5;g.beginPath();g.moveTo(cx-17,cy+46);g.quadraticCurveTo(cx,cy+46+sm*10,cx+17,cy+46);g.stroke();}else{g.fillStyle='#5a1414';g.beginPath();g.ellipse(cx,cy+48,17,4+m*14,0,0,7);g.fill();g.lineWidth=3;g.stroke();g.fillStyle='#e05a5a';g.beginPath();g.ellipse(cx,cy+50+m*8,9,3+m*3,0,0,7);g.fill();}
 if(S.mus){g.fillStyle=S.mus;g.beginPath();g.moveTo(cx-24,cy+38);g.quadraticCurveTo(cx-12,cy+28,cx,cy+33);g.quadraticCurveTo(cx+12,cy+28,cx+24,cy+38);g.quadraticCurveTo(cx,cy+40,cx-24,cy+38);g.fill();g.strokeStyle='#15100c';g.lineWidth=1.5;g.stroke();}
 if(S.beard==='white'){g.fillStyle='#f2f2f2';g.beginPath();g.moveTo(cx-26,cy+36);g.quadraticCurveTo(cx-12,cy+26,cx,cy+31);g.quadraticCurveTo(cx+12,cy+26,cx+26,cy+36);g.quadraticCurveTo(cx,cy+40,cx-26,cy+36);g.fill();}
 st.ft.needsUpdate=true;}
const CH3={};for(const k of Object.keys(STY3))CH3[k]=makeChar3(k);
const POSES={candle:[[0,.1,0],[-1.2,-.1,-1.1]],press:[[0,.15,0],[-.2,.05,-.1]],cover:[[-1.9,-.1,-2.2],[-1.9,-.1,-2.2]],phone:[[0,.1,0],[-1.6,-.2,-1.9]],sitidle:[[-.6,.1,-.7],[-.6,.1,-.7]],shoulder:[[0,.1,0],[-1.2,.35,-.5]],case:[[0,.12,0],[0,.18,0]],keys:[[0,.1,0],[-1.1,.05,-.9]],grab:[[0,.1,0],[-1.25,-.15,-.25]],shrug:[[-.2,.6,-1.2],[-.2,.6,-1.2]],write:[[-.9,-.2,-1.35],[-.9,-.2,-1.35]],idle:[[0,.1,0],[0,.1,0]],hold:[[-.9,-.2,-1.35],[-.9,-.2,-1.35]],point:[[0,.1,0],[-1.5,.1,0]],up:[[0,2.7,-.2],[0,2.7,-.2]],hug:[[-1.1,-.3,-.4],[-1.1,-.3,-.4]],chin:[[0,.1,0],[-1.9,-.3,-2.3]],ear:[[0,.1,0],[-2.6,-.2,-2.0]],knock:[[0,.1,0],[-1.4,-.1,-.4]],carry:[[-1.1,-.1,-.7],[-1.1,-.1,-.7]],drink:[[0,.1,0],[-1.7,-.4,-2.2]],wave:[[0,.1,0],[-.3,2.5,-.6]],cross:[[-1.0,-.5,-1.6],[-1.0,-.5,-1.6]],give:[[0,.1,0],[-1.3,.1,-.2]],torch:[[0,.1,0],[-2.25,.35,-.35]],wipe:[[-1.8,-.3,-2.5],[-1.8,-.3,-2.5]]};
function put(kind,o,t){const st=CH3[kind];const g=st.g;g.visible=true;const s=(o.s||1)*.9;g.scale.setScalar(s);g.position.set(o.x||0,(o.y??0)+(o.walk!==undefined?Math.abs(Math.sin(o.walk))*.06:0),o.z||0);g.rotation.y=(o.ry||0)*Math.PI/180;
 const br=Math.sin(t*2.2+kind.length)*.012;st.chest.scale.y=1+br;st.head.rotation.set((o.hx||0),(o.hy||0)*Math.PI/180,(o.hz||0)*Math.PI/180);
 const wk=o.walk;st.legs.forEach((l,i)=>l.rotation.x=wk!==undefined?Math.sin(wk+i*Math.PI)*.5:(o.sit?-1.45:0));st.hips.position.y=o.sit?.7:st.legLen;
 const P=POSES[o.pose||'idle'];st.arms.forEach((A,i)=>{let [rx,rz,ex]=P[i];if(o.pose==='point'&&o.left){[rx,rz,ex]=i===0?[-1.45,.15,0]:[0,.12,0];}if(wk!==undefined&&(o.pose||'idle')==='idle'){rx=Math.sin(wk+i*Math.PI+Math.PI)*.45;}
   if(o.pose==='knock'&&i===1)rx+=Math.max(0,Math.sin(t*14))*.25;if(o.pose==='wave'&&i===1)rz+=Math.sin(t*8)*.3;if(o.pose==='write'&&i===1){rx=-.6;ex=-1.1+Math.sin(t*14)*.08;}
   if(o.pose==='write'&&i===0){rx=-.6;ex=-1.2;}A.a.rotation.x=rx;A.a.rotation.z=A.s*rz;A.el.rotation.x=ex;
   const want=(i===1?o.item:o.litem)||'';if(A.ik!==want){A.ik=want;A.item.clear();if(want&&ITEM3[want])ITEM3[want](A.item);}});
 const bl=o.blink??(()=>{const per=3.1+kind.length*.3;const ph=(t+kind.length)%per;return ph<.07?ph/.07:ph<.16?1-(ph-.07)/.09:0;})();
 drawFace3(st,Object.assign({},o,{blink:bl}));
 g.traverse(m=>{if(m.isMesh&&m.material!==OUT){}});if(o.dark!==undefined){}}
// ---------- api for shots ----------
let ENVCUR=null;window.setEnv=function(name,tod){for(const k in ENVS)ENVS[k].visible=false;if(name==='card'){ENVCUR='card';return;}for(const n of name.split('+'))if(ENVS[n])ENVS[n].visible=true;ENVCUR=name;applyTod(tod||'dusk');};
let TODcur=null;function applyTod(n){if(TODcur===n)return;TODcur=n;const T0=TOD[n];paintSky(T0.sky);scene.fog.color.set(T0.fog);hemi.intensity=T0.hemi[0];hemi.color.set(T0.hemi[1]);key.intensity=T0.key[0];key.color.set(T0.key[1]);seaMat.color.set(T0.sea);sun.visible=sunGlow.visible=!!T0.sun;stars.visible=!!T0.stars;clouds.visible=!!T0.clouds;moon.visible=!!T0.moon;
 if(T0.cl)clouds.children.forEach((c,i)=>c.material.color.set(T0.cl[i%2]));LAMPS.forEach(([s,L])=>{s.visible=!!T0.lamps;L.intensity=T0.lamps?26:0;});scene.fog.near=n==='interior'?40:n==='dark'?6:140;scene.fog.far=n==='night'?320:n==='dark'?48:520;WINS.forEach(([w,lit])=>{w.material=(n==='night'&&lit)?litM:glassM;});
 if(n==='interior'||n==='dark'){sky.visible=false;scene.background=new THREE.Color(n==='dark'?'#050505':'#2a2420');}else{sky.visible=true;scene.background=null;}}
window.C3=function(t,eye,at,fov=42,shake=0){camera.fov=fov;camera.updateProjectionMatrix();camera.position.set(eye[0]+Math.sin(t*.8)*.05+Math.sin(t*37)*shake*.02,eye[1]+Math.cos(t*.7)*.04+Math.cos(t*41)*shake*.02,eye[2]);camera.lookAt(at[0],at[1],at[2]);};
window.V=(t,K)=>kf(t,K);
window.put=put;window.ENVS=ENVS;window.LAMPS=LAMPS;window.WINS=WINS;window.doorSet=doorSet;window.CH3=null;
window.project=function(x,y,z){camera.updateMatrixWorld();const v=new THREE.Vector3(x,y,z).project(camera);return [(v.x+1)/2*1080,(1-v.y)/2*1920];};
// compat for overlay helpers (Q, CTA2)
window.useBG=n=>setEnv(n);window.cam=()=>{};window.show=()=>{};
function hideAll(){for(const k in CH3)CH3[k].g.visible=false;fireG.visible=false;document.getElementById('c').style.filter='';}
window.flt=s=>{document.getElementById('c').style.filter=s;};
window.render=function(t){if(window.preShot)window.preShot(t);hideAll();FX.innerHTML='';
 let i=0;while(i+1<SHOTS.length&&t>=T(SHOTS[i+1][0]))i++;const [ln,fn]=SHOTS[i];fn(t,t-T(ln));
 const card=ENVCUR==='card';document.getElementById('cardbg').setAttribute('opacity',card?1:0);
 if(!card){if(ENVS.burnt.visible)ENVS.burnt.userData.smoke.forEach((s,i)=>{s.position.x=400-2+((t*.15+i*.41)%1)*4;s.material.opacity=.18+.08*Math.sin(t*.7+i);});if(ENVS.apt37.visible){const [fl,cL]=ENVS.apt37.userData.flame;const f=.85+.15*Math.sin(t*19)*Math.sin(t*7.7);fl.scale.set(1.4*f,1.7*f,1);cL.intensity=16*f;}
  if(TODcur==='night')LAMPS.forEach(([s,L],j)=>{const f=.85+.15*Math.sin(t*13+j*2)*Math.sin(t*7.3+j);L.intensity=26*f;s.scale.setScalar(2.4*f);});
  R.render(scene,camera);}
 let f=0;const tc=T(ln);const d=Math.abs(t-tc);if(d<.12&&i>0)f=1-d/.12;document.getElementById('fade').setAttribute('opacity',f*.85);
 captions(t);};
await document.fonts.ready;window.ready=true;
