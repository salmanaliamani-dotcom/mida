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
// ---------- environments ----------
const ENVS={};function envG(n){const g=new THREE.Group();g.visible=false;scene.add(g);ENVS[n]=g;return g;}
const LAMPS=[];
// PORT (origin)
{const g=envG('port');
 M(new THREE.BoxGeometry(14,5,80),stoneM,-16,2.5,-18,g);M(new THREE.BoxGeometry(14,.3,80),TM(cobbleTex(2,12)),-16,5.1,-18,g);
 for(let i=0;i<17;i++){outline(M(new THREE.BoxGeometry(1.5,1.6,2),stoneM2,-9.3,6,20-i*4.7,g),1.03);outline(M(new THREE.BoxGeometry(1.5,1.6,2),stoneM2,-22.7,6,20-i*4.7,g),1.03);}
 outline(M(new THREE.BoxGeometry(11,14,11),stoneM2,-16,7,-62,g),1.01);for(const [dx,dz] of [[-5,-5],[5,-5],[-5,5],[5,5]]){outline(M(new THREE.CylinderGeometry(1,1,2.6,12),stoneM2,-16+dx,15.2,-62+dz,g));outline(M(new THREE.SphereGeometry(1,12,8,0,Math.PI*2,0,Math.PI/2),stoneM2,-16+dx,16.5,-62+dz,g));}
 const bronzeM=C('#4e7a5a'),carM=TM(woodTex('#5a3a22',1,1));for(let i=0;i<6;i++){const c=new THREE.Group();c.position.set(-11.6,5.25,14-i*7);g.add(c);const b=outline(M(new THREE.CylinderGeometry(.32,.5,3.6,16),bronzeM,1.2,.75,0,c),1.05);b.rotation.z=Math.PI/2-.1;outline(M(new THREE.SphereGeometry(.42,12,8),bronzeM,-.6,.8,0,c),1.06);outline(M(new THREE.BoxGeometry(1.8,.6,1.2),carM,0,.3,0,c),1.04);for(const s of[-1,1]){const w=outline(M(new THREE.CylinderGeometry(.5,.5,.18,16),carM,0,.35,s*.7,c),1.06);w.rotation.x=Math.PI/2;}}
 M(new THREE.BoxGeometry(26,1.6,22),stoneM,-2,.8,12,g);M(new THREE.BoxGeometry(26,.12,22),TM(cobbleTex(3,3)),-2,1.66,12,g);
 const of=new THREE.Group();of.position.set(-6,1.7,3);g.add(of);outline(M(new THREE.BoxGeometry(5,4.2,4),plasterM,0,2.1,0,of),1.015);const blueM=TM(woodTex('#1f6fc2',1,1));outline(M(new THREE.BoxGeometry(1.4,2.5,.14),blueM,.7,1.25,2.04,of),1.04);outline(M(new THREE.BoxGeometry(1.2,1.1,.14),blueM,-1.3,2.6,2.04,of),1.04);M(new THREE.BoxGeometry(5.4,.35,4.4),plasterM,0,4.35,0,of);
 for(let i=0;i<9;i++){const c=outline(M(new THREE.BoxGeometry(1.2,.85,1),crateM,-11.5+(i%3)*1.28,2.15+Math.floor(i/3)*.86,8+((i*7)%3)*.25,g),1.03);c.rotation.y=(rnd()-.5)*.2;}
 for(let i=0;i<3;i++){const n=M(new THREE.SphereGeometry(1,16,10),netM,7+i*2.6,2.05,16-i*1.4,g);n.scale.set(1.2,.42,.95);outline(n,1.03);}
 for(let i=0;i<3;i++){const r=M(new THREE.TorusGeometry(.6,.13,8,24),C('#c9a46a'),-1+i*1.6,1.85,19,g);r.rotation.x=Math.PI/2;outline(r,1.08);}
 for(let i=0;i<5;i++)outline(M(new THREE.CylinderGeometry(.25,.3,1,10),C('#3a3a40'),-12+i*5.5,2.2,22.6,g),1.06);
 for(let i=0;i<4;i++)LAMPS.push(lampPost(g,-11+i*7,21.5));
 const plT=plasterTex(2,2);for(let i=0;i<80;i++){const w=2+rnd()*3,h=2+rnd()*6;const b=M(new THREE.BoxGeometry(w,h,3),TM(plT),22+(i%16)*3.4+rnd(),h/2,-55-Math.floor(i/16)*6-rnd()*2,g);if(i%2==0)M(new THREE.BoxGeometry(.7,.9,.1),C('#1f6fc2'),b.position.x,h*.6,b.position.z+1.55,g);}
 M(new THREE.BoxGeometry(2,16,2),TM(plT),50,8,-80,g);
 const moored=[];for(let i=0;i<30;i++){const b=boat(i,{},g);b.position.set(4+(i%6)*3.1+rnd()*.6,0,-5-Math.floor(i/6)*5.2-rnd());b.rotation.y=Math.PI/2+(rnd()-.5)*.35;moored.push(b);}
 // quay row for counting (front, z 26-30)
 for(let i=0;i<8;i++){const b=boat(i+1,{},g);b.position.set(-12+i*3.3,0,27.5);b.rotation.y=Math.PI/2+(rnd()-.5)*.2;moored.push(b);}
 g.userData.moored=moored;}
// DECK of Mabrouka (x=300)
{const g=envG('deck');g.position.set(300,0,0);const big=new THREE.Group();g.add(big);outline(M(hullGeo(16,6.5,2.4),hullMs[0],0,0,0,big),1.02);M(hullGeo(15,5.8,.25),deckM,0,1.05,0,big);
 outline(M(new THREE.BoxGeometry(3.4,2.8,3.2),plasterM,4.5,2.6,0,big),1.03);M(new THREE.BoxGeometry(2.2,.9,.08),C('#2b3a73'),4.5,3.1,1.62,big);
 const hatch=outline(M(new THREE.BoxGeometry(1.8,.5,1.8),C('#3a3f4a'),-5.6,1.45,0,big),1.04);g.userData.hatch=hatch;const lid=outline(M(new THREE.BoxGeometry(1.9,.12,1.9),TM(woodTex('#1f6fc2',1,1)),-5.6,1.76,0,big),1.06);g.userData.lid=lid;
 const net=M(new THREE.SphereGeometry(1.6,18,12),netM,-3,1.5,-1.6,big);net.scale.set(1.3,.4,.8);outline(net,1.03);for(let k=0;k<6;k++)M(new THREE.SphereGeometry(.16,8,6),C(k%2?'#f2c21b':'#e0592a'),-3+(rnd()-.5)*3,1.9,-1.6+(rnd()-.5)*1.2,big);
 const crates=[];for(let i=0;i<3;i++){const c=new THREE.Group();c.position.set(-.5+i*1.6,1.45,1.2);big.add(c);outline(M(new THREE.BoxGeometry(1.4,.6,1),C('#e9e2d0'),0,0,0,c),1.05);M(new THREE.PlaneGeometry(1.3,.9),TM(fishTex),0,.31,0,c).rotation.x=-Math.PI/2;crates.push(c);}g.userData.crates=crates;
 const ice=[];for(let i=0;i<12;i++){const k=M(new THREE.BoxGeometry(.2,.12,.16),C('#e8f6ff'),-1.1+(i%6)*.45+(Math.floor(i/6))*1.6,1.8,1+(rnd()-.5)*.6,big);ice.push(k);}g.userData.ice=ice;
 const fuel=new THREE.Group();fuel.position.set(-6.6,2.1,-1.5);big.add(fuel);g.userData.fuel=fuel;}
// OFFICE interior (x=-300)
{const g=envG('office');g.position.set(-300,0,0);const wm=TM(plasterTex(2,1,'#e9dfc8'));const back=M(new THREE.BoxGeometry(16,9,.3),wm,0,4.5,-5,g);M(new THREE.BoxGeometry(.3,9,12),wm,-8,4.5,1,g);M(new THREE.BoxGeometry(.3,9,12),wm,8,4.5,1,g);M(new THREE.BoxGeometry(16,.2,12),floorM,0,0,1,g);
 const win=new THREE.Group();win.position.set(3.5,5,-4.8);g.add(win);M(new THREE.PlaneGeometry(4,3.2),TM(tex(256,200,(x,w,h)=>{const gr=x.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#8cc4ea');gr.addColorStop(.5,'#cfe8f6');gr.addColorStop(.52,'#2f80b8');gr.addColorStop(1,'#1d5a8a');x.fillStyle=gr;x.fillRect(0,0,w,h);for(let i=0;i<4;i++){x.fillStyle='#2f84d6';x.fillRect(40+i*50,150+(i%2)*14,30,8);}})),0,0,0,win);
 outline(M(new THREE.BoxGeometry(4.3,.2,.3),C('#1f6fc2'),0,1.7,.1,win),1.05);outline(M(new THREE.BoxGeometry(4.3,.2,.3),C('#1f6fc2'),0,-1.7,.1,win),1.05);outline(M(new THREE.BoxGeometry(.2,3.4,.3),C('#1f6fc2'),0,0,.1,win),1.05);
 const tb=new THREE.Group();tb.position.set(0,0,0);g.add(tb);outline(M(new THREE.BoxGeometry(7,.25,3.6),TM(woodTex('#7a4e2a',1,1)),0,2.6,0,tb),1.02);for(const [x,z] of [[-3.2,-1.5],[3.2,-1.5],[-3.2,1.5],[3.2,1.5]])M(new THREE.BoxGeometry(.25,2.5,.25),beamM,x,1.25,z,tb);
 const chartT=tex(512,384,(x,w,h)=>{x.fillStyle='#d9ecf2';x.fillRect(0,0,w,h);x.strokeStyle='#a9cfdc';for(let i=0;i<12;i++){x.beginPath();x.moveTo(i*44,0);x.lineTo(i*44,h);x.stroke();x.beginPath();x.moveTo(0,i*34);x.lineTo(w,i*34);x.stroke();}x.fillStyle='#e8d6a8';x.beginPath();x.moveTo(w,0);x.lineTo(w*.75,0);x.quadraticCurveTo(w*.7,h*.4,w*.76,h*.6);x.quadraticCurveTo(w*.7,h*.85,w*.78,h);x.lineTo(w,h);x.fill();x.fillStyle='#1d5fa8';x.beginPath();x.arc(w*.74,h*.35,9,0,7);x.fill();x.fillStyle='#8a7a6a';x.beginPath();x.ellipse(w*.33,h*.72,26,18,0,0,7);x.fill();});
 const chartP=M(new THREE.PlaneGeometry(4,3),TM(chartT),-.6,2.74,0,tb);chartP.rotation.x=-Math.PI/2;g.userData.chart=chartP;
 const book=outline(M(new THREE.BoxGeometry(1.6,.15,1.1),C('#1d3a6a'),2.4,2.8,.4,tb),1.05);g.userData.book=book;
 const lp=new THREE.Group();lp.position.set(-6.5,0,-3.5);g.add(lp);M(new THREE.CylinderGeometry(.08,.08,5,8),C('#2a2a30'),0,2.5,0,lp);outline(M(new THREE.ConeGeometry(.8,.9,16,1,true),C('#1d5fa8',{side:THREE.DoubleSide}),0,5.2,0,lp),1.03);const ll=new THREE.PointLight('#ffd8a0',14,18,1.5);ll.position.set(0,4.8,0);lp.add(ll);}
// ALLEY in the medina (z=300)
{const g=envG('alley');g.position.set(0,0,300);const wm=TM(plasterTex(2,2));M(new THREE.BoxGeometry(30,.2,14),TM(cobbleTex(4,2)),0,0,0,g);outline(M(new THREE.BoxGeometry(30,12,1),wm,0,6,-6,g),1.005);
 const d=new THREE.Group();d.position.set(0,0,-5.4);g.add(d);const dm=TM(woodTex('#1f6fc2',1,2));outline(M(new THREE.BoxGeometry(2.6,4.4,.3),dm,0,2.2,0,d),1.03);outline(M(new THREE.CylinderGeometry(1.3,1.3,.3,24,1,false,0,Math.PI),dm,0,4.4,0,d).rotateX(Math.PI/2),1.03);for(let r=0;r<4;r++)for(let c=0;c<3;c++)M(new THREE.SphereGeometry(.07,8,6),C('#e9c46a'),-.8+c*.8,.8+r*.9,.2,d);
 const doorL=d;g.userData.door=d;for(const x of [-7,7]){outline(M(new THREE.BoxGeometry(1.6,1.8,.2),dm,x,6,-5.4,g),1.04);}
 const pot=outline(M(new THREE.CylinderGeometry(.45,.35,.8,16),C('#b5543a'),3,.5,-4.8,g),1.06);M(new THREE.SphereGeometry(.7,12,8),C('#3a7a3a'),3,1.3,-4.8,g);
 g.userData.box=null;}
// ROOM (Younes) (x=-300,z=300)
{const g=envG('room');g.position.set(-300,0,300);const wm=TM(plasterTex(2,1,'#ece4d0'));M(new THREE.BoxGeometry(16,9,.3),wm,0,4.5,-5,g);M(new THREE.BoxGeometry(.3,9,12),wm,-8,4.5,1,g);M(new THREE.BoxGeometry(16,.2,12),TM(woodTex('#9a6a42',3,3)),0,0,1,g);
 const win=new THREE.Group();win.position.set(0,5,-4.8);g.add(win);M(new THREE.PlaneGeometry(6,4),TM(tex(256,180,(x,w,h)=>{const gr=x.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#8cc4ea');gr.addColorStop(.45,'#d8eef8');gr.addColorStop(.47,'#2f80b8');gr.addColorStop(1,'#1d5a8a');x.fillStyle=gr;x.fillRect(0,0,w,h);})),0,0,0,win);
 outline(M(new THREE.BoxGeometry(6.3,.25,.3),C('#1f6fc2'),0,2.1,.1,win),1.05);outline(M(new THREE.BoxGeometry(6.3,.25,.3),C('#1f6fc2'),0,-2.1,.1,win),1.05);outline(M(new THREE.BoxGeometry(.25,4.2,.3),C('#1f6fc2'),0,0,.1,win),1.05);
 outline(M(new THREE.BoxGeometry(7,.8,2),TM(woodTex('#c9a46a',2,1)),-2,.4,-3.6,g),1.02);M(new THREE.BoxGeometry(7,.3,2),C('#b5543a'),-2,.95,-3.6,g);
 const tt=outline(M(new THREE.CylinderGeometry(1,1,.15,24),TM(woodTex('#7a4e2a',1,1)),2.5,1.1,-1,g),1.03);M(new THREE.CylinderGeometry(.15,.2,1,10),beamM,2.5,.5,-1,g);g.userData.table=tt;}
// OPEN SEA + ISLAND (z=-500)
{const g=envG('island');g.position.set(0,0,-500);
 const isl=new THREE.Group();g.add(isl);for(let i=0;i<46;i++){const a=i/46*Math.PI*2;if(a>2.0&&a<3.9)continue;const r=18+rnd()*6;const rk=outline(M(new THREE.DodecahedronGeometry(3+rnd()*4,0),rockM,Math.cos(a)*r,1+rnd()*3,Math.sin(a)*r*.7,isl),1.02);rk.rotation.set(rnd()*3,rnd()*3,rnd()*3);}
 for(let i=0;i<20;i++){const rk=outline(M(new THREE.DodecahedronGeometry(5+rnd()*5,0),rockM,-2+rnd()*18,3+rnd()*4,-8+rnd()*12,isl),1.02);}
 // hidden cove on west side (x negative)
 const cove=new THREE.Group();cove.position.set(-24,0,2);g.add(cove);M(new THREE.BoxGeometry(6,1.2,2),TM(woodTex('#6a4424',2,1)),0,.6,4,cove);for(let i=0;i<4;i++)M(new THREE.CylinderGeometry(.15,.15,2,8),beamM,-2.6+i*1.7,0,3.2,cove);
 g.userData.cove=cove;g.userData.isl=isl;
 // north rock perch for Larbi
 const perch=outline(M(new THREE.DodecahedronGeometry(3.2,0),rockM,4,1.6,-30,g),1.02);perch.scale.y=.95;g.userData.perch=[4,4.8,-30];}
// ---------- props (movable) ----------
const mab=boat(0,{cabin:true});mab.visible=false;const mabLamp=new THREE.Sprite(glowMat());mabLamp.scale.set(3,3,1);mabLamp.position.set(.6,2.6,0);mab.add(mabLamp);const mabL=new THREE.PointLight('#ffd27a',0,18);mabL.position.set(.6,3.2,0);mab.add(mabL);
const blackBoat=boat(1,{cabin:true,black:true,big:true,cans:true});blackBoat.visible=false;
const zod=new THREE.Group();zod.visible=false;scene.add(zod);{const tube=outline(M(new THREE.TorusGeometry(1.6,.5,12,32),C('#e05a1a'),0,.5,0,zod),1.04);tube.rotation.x=Math.PI/2;tube.scale.set(1.9,1,1);M(new THREE.BoxGeometry(5.4,.15,2.4),C('#2b2f38'),0,.3,0,zod);outline(M(new THREE.BoxGeometry(.6,1.1,.6),C('#2b2f38'),-3.4,.9,0,zod),1.05);
  const pole=M(new THREE.CylinderGeometry(.05,.05,2.2,6),C('#2a2a30'),2.6,1.6,0,zod);const flag=M(new THREE.PlaneGeometry(.9,.5),C('#ff3b30',{side:THREE.DoubleSide}),3.05,2.45,0,zod);zod.userData.flag=flag;const spot=new THREE.SpotLight('#fffbe0',0,80,.5,.4);spot.position.set(2,1.8,0);zod.add(spot);zod.add(spot.target);spot.target.position.set(20,0,0);zod.userData.spot=spot;}
const signal=new THREE.Sprite(glowMat());signal.scale.set(6,6,1);signal.visible=false;scene.add(signal);const signalL=new THREE.PointLight('#fff0c0',0,40);scene.add(signalL);
const gulls=[];{const sh=new THREE.Shape();sh.moveTo(0,-.3);sh.quadraticCurveTo(.9,-.35,1.9,.05);sh.quadraticCurveTo(1,.15,0,.3);const gw=new THREE.ShapeGeometry(sh);gw.rotateX(-Math.PI/2);
 for(let i=0;i<10;i++){const g=new THREE.Group();const b=outline(M(new THREE.CapsuleGeometry(.22,.7,6,12),C('#f7f4ee'),0,0,0,g),1.06);b.rotation.z=Math.PI/2;outline(M(new THREE.SphereGeometry(.2,12,8),C('#f7f4ee'),.55,.12,0,g),1.08);M(new THREE.ConeGeometry(.06,.25,6),C('#f2b33a'),.8,.1,0,g).rotation.z=-Math.PI/2;
  const wm=C('#f7f4ee',{side:THREE.DoubleSide});const wl=new THREE.Group(),wr=new THREE.Group();g.add(wl);g.add(wr);wl.add(new THREE.Mesh(gw,wm));wr.add(new THREE.Mesh(gw,wm));wl.rotation.y=Math.PI/2;wr.rotation.y=-Math.PI/2;
  g.userData={wl,wr,ph:rnd()*6,r:5+rnd()*8,h:6+rnd()*5,sp:.25+rnd()*.3,cx:8+rnd()*8,cz:-6-rnd()*12};g.visible=false;scene.add(g);gulls.push(g);}}
// ---------- characters ----------
const SKIN={P:'#d79a6a',C:'#e3a878',D:'#b9794e'};
const STY3={
 you:{skin:'P',hair:'curly',body:'jacket',c1:'#2f5f9e',shirt:'#f4f2ee',legs:'#1b1d24',stub:1},
 omar:{skin:'C',hair:'bald',beard:'white',hat:'beanie',hatC:'#2f4a6a',body:'raincoat',c1:'#f2c21b',legs:'#2a3040',age:.6},
 hussein:{skin:'D',hair:'short',body:'apron',c1:'#3a5a7a',apron:'#7a8a96',legs:'#2a2a33',wide:1.35,mus:'#1a120d'},
 larbi:{skin:'C',hair:'bald',hat:'beanie',hatC:'#8a3a2a',body:'vest',c1:'#6a5a46',shirt:'#ece4d2',legs:'#3a3228',age:.8,mus:'#eeeeee'},
 younes:{skin:'P',hair:'curly',body:'hivis',c1:'#ff7a1a',shirt:'#3a4a5a',legs:'#2a3442'},
 mother:{skin:'C',hair:'scarf',scarfC:'#e8e2d6',body:'kaftan',c1:'#2f6a8a',legs:'#2a2a33',age:.4},
 wife1:{skin:'P',hair:'scarf',scarfC:'#b5543a',body:'kaftan',c1:'#5a7a4a',legs:'#2a2a33'},
 wife2:{skin:'C',hair:'scarf',scarfC:'#4a3a6a',body:'kaftan',c1:'#6a4a3a',legs:'#2a2a33',age:.9},
 allal:{skin:'C',hair:'bald',beard:'white',hat:'beanie',hatC:'#5a2a2a',body:'vest',c1:'#3a4a5a',shirt:'#e4dccb',legs:'#2a2a30',age:1},
 nadia:{skin:'P',hair:'bob',hat:'whitecap',body:'uniform',c1:'#24345c',shirt:'#e9eef6',legs:'#18233f'},
 guard:{skin:'C',hair:'short',hat:'navycap',body:'uniform',c1:'#24345c',shirt:'#cfd8e6',legs:'#18233f'},
 smoker:{skin:'P',hair:'slick',body:'raincoat',c1:'#2a2a30',legs:'#141418',mus:'#1a120d'},
 fisher:{skin:'C',hair:'short',hat:'beanie',hatC:'#2f6a4a',body:'jacket',c1:'#4a5a6a',shirt:'#d8d8d8',legs:'#2a2a33'},
};
function bodyTex(S){return tex(512,256,(g,w,h)=>{g.fillStyle=S.c1;g.fillRect(0,0,w,h);noise(g,w,h,3000,.08);const c=w*.5;
  if(S.body==='jacket'){g.fillStyle=S.shirt;g.beginPath();g.moveTo(c-46,0);g.lineTo(c+46,0);g.lineTo(c+18,h);g.lineTo(c-18,h);g.fill();g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.moveTo(c-46,0);g.lineTo(c-92,0);g.lineTo(c-34,h*.55);g.fill();g.beginPath();g.moveTo(c+46,0);g.lineTo(c+92,0);g.lineTo(c+34,h*.55);g.fill();g.strokeStyle='#15100c';g.lineWidth=4;g.beginPath();g.moveTo(c-46,0);g.lineTo(c-22,h);g.moveTo(c+46,0);g.lineTo(c+22,h);g.stroke();for(let i=0;i<3;i++){g.fillStyle='#d8d4cc';g.beginPath();g.arc(c+2,40+i*60,6,0,7);g.fill();}g.strokeStyle='rgba(0,0,0,.3)';g.strokeRect(c+60,h*.58,70,40);}
  if(S.body==='raincoat'){g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=5;g.beginPath();g.moveTo(c,0);g.lineTo(c,h);g.stroke();for(let i=0;i<4;i++){g.fillStyle='#2a2a30';g.beginPath();g.arc(c+16,30+i*55,7,0,7);g.fill();}g.fillStyle='rgba(255,255,255,.18)';g.fillRect(c-120,0,30,h);}
  if(S.body==='apron'){g.fillStyle=S.apron;g.beginPath();g.moveTo(c-80,h*.25);g.lineTo(c+80,h*.25);g.lineTo(c+100,h);g.lineTo(c-100,h);g.fill();g.strokeStyle='#15100c';g.lineWidth=3;g.stroke();g.fillStyle='#e8e8e8';g.fillRect(c-30,0,60,40);}
  if(S.body==='vest'){g.fillStyle=S.shirt;g.fillRect(c-50,0,100,h);g.fillStyle=S.c1;g.beginPath();g.moveTo(c-50,0);g.lineTo(c-10,h);g.lineTo(c-130,h);g.lineTo(c-130,0);g.fill();g.beginPath();g.moveTo(c+50,0);g.lineTo(c+10,h);g.lineTo(c+130,h);g.lineTo(c+130,0);g.fill();g.strokeStyle='#d4a73a';g.lineWidth=3;g.beginPath();g.moveTo(c-20,h*.5);g.quadraticCurveTo(c+10,h*.6,c+25,h*.45);g.stroke();}
  if(S.body==='hivis'){g.fillStyle=S.shirt;g.fillRect(c-45,0,90,h);g.fillStyle='#e8eef5';g.fillRect(0,h*.45,w,22);g.fillRect(0,h*.72,w,22);g.fillStyle=S.shirt;g.fillRect(c-45,h*.45,90,22);g.fillRect(c-45,h*.72,90,22);}
  if(S.body==='kaftan'){g.strokeStyle='#e9c46a';g.lineWidth=6;g.beginPath();g.moveTo(c,0);g.lineTo(c,h);g.stroke();for(let i=0;i<6;i++){g.fillStyle='#e9c46a';g.beginPath();g.arc(c,20+i*40,6,0,7);g.fill();}}
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
 if(S.hair==='bald'){for(const s of[-1,1])M(new THREE.SphereGeometry(.28,10,8),C('#e8e8e8'),s*.82,.15,-.2,head);}
 if(S.hair==='scarf'){outline(M(new THREE.SphereGeometry(1.08,32,20,Math.PI*.72,Math.PI*1.56,0,Math.PI*.85),C(S.scarfC,{side:THREE.DoubleSide}),0,0,0,head),1.02);outline(M(new THREE.CylinderGeometry(.62,.85,.5,24),C(S.scarfC),0,-.95,0,head),1.03);}
 if(S.hat==='beanie'){outline(M(new THREE.SphereGeometry(1,24,16,0,Math.PI*2,0,Math.PI*.45),C(S.hatC),0,.12,0,head),1.03);outline(M(new THREE.TorusGeometry(.92,.12,8,24),C(S.hatC),0,.22,0,head).rotateX(Math.PI/2),1.04);}
 if(S.hat==='whitecap'){outline(M(new THREE.CylinderGeometry(1.05,.92,.45,24),C('#ffffff'),0,.75,0,head),1.03);outline(M(new THREE.CylinderGeometry(.6,.6,.06,20,1,false,0,Math.PI),C('#0f1a36'),0,.55,.6,head).rotateX(-.25),1.04);M(new THREE.SphereGeometry(.12,10,8),C('#e9c46a'),0,.78,.95,head);}
 if(S.hat==='navycap'){outline(M(new THREE.CylinderGeometry(1.02,.92,.45,24),C('#1b2a50'),0,.72,0,head),1.03);outline(M(new THREE.CylinderGeometry(.6,.6,.06,20,1,false,0,Math.PI),C('#0f1a36'),0,.52,.6,head).rotateX(-.25),1.04);}
 if(S.beard==='white'){const b=outline(M(new THREE.SphereGeometry(.8,24,16,0,Math.PI*2,Math.PI*.45,Math.PI*.55),C('#f2f2f2'),0,-.18,.2,head),1.03);b.scale.set(1,1.15,.9);}
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
 cup:p=>{outline(M(new THREE.CylinderGeometry(.09,.07,.18,12),C('#f4f4f4'),0,0,0,p),1.08);},
};
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
const POSES={write:[[-.9,-.2,-1.35],[-.9,-.2,-1.35]],idle:[[0,.1,0],[0,.1,0]],hold:[[-.9,-.2,-1.35],[-.9,-.2,-1.35]],point:[[0,.1,0],[-1.5,.1,0]],up:[[0,2.7,-.2],[0,2.7,-.2]],hug:[[-1.1,-.3,-.4],[-1.1,-.3,-.4]],chin:[[0,.1,0],[-1.9,-.3,-2.3]],ear:[[0,.1,0],[-2.6,-.2,-2.0]],knock:[[0,.1,0],[-1.4,-.1,-.4]],carry:[[-1.1,-.1,-.7],[-1.1,-.1,-.7]],drink:[[0,.1,0],[-1.7,-.4,-2.2]],wave:[[0,.1,0],[-.3,2.5,-.6]],cross:[[-1.0,-.5,-1.6],[-1.0,-.5,-1.6]],give:[[0,.1,0],[-1.3,.1,-.2]],torch:[[0,.1,0],[-2.25,.35,-.35]],wipe:[[-1.8,-.3,-2.5],[-1.8,-.3,-2.5]]};
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
 if(T0.cl)clouds.children.forEach((c,i)=>c.material.color.set(T0.cl[i%2]));LAMPS.forEach(([s,L])=>{s.visible=!!T0.lamps;L.intensity=T0.lamps?26:0;});scene.fog.near=n==='interior'?40:140;scene.fog.far=n==='night'?300:520;
 if(n==='interior'){sky.visible=false;scene.background=new THREE.Color('#2a2420');}else{sky.visible=true;scene.background=null;}}
window.C3=function(t,eye,at,fov=42,shake=0){camera.fov=fov;camera.updateProjectionMatrix();camera.position.set(eye[0]+Math.sin(t*.8)*.05+Math.sin(t*37)*shake*.02,eye[1]+Math.cos(t*.7)*.04+Math.cos(t*41)*shake*.02,eye[2]);camera.lookAt(at[0],at[1],at[2]);};
window.V=(t,K)=>kf(t,K);
window.put=put;window.mab=mab;window.blackBoat=blackBoat;window.zod=zod;window.signal=signal;window.signalL=signalL;window.ENVS=ENVS;window.gulls=gulls;window.LAMPS=LAMPS;window.mabL=mabL;
window.project=function(x,y,z){const v=new THREE.Vector3(x,y,z).project(camera);return [(v.x+1)/2*1080,(1-v.y)/2*1920];};
// compat for overlay helpers (Q, CTA2)
window.useBG=n=>setEnv(n);window.cam=()=>{};window.show=()=>{};
function hideAll(){for(const k in CH3)CH3[k].g.visible=false;mab.visible=blackBoat.visible=zod.visible=false;signal.visible=false;signalL.intensity=0;mabL.intensity=0;gulls.forEach(g=>g.visible=false);zod.userData.spot.intensity=0;}
window.gullsOn=function(t,cx=8,cz=-8,h=7){gulls.forEach((g,i)=>{const u=g.userData;const a=t*u.sp+u.ph;g.visible=true;g.position.set(cx+Math.cos(a)*u.r,h+u.h-6+Math.sin(t*.7+i)*.6,cz+Math.sin(a)*u.r);g.rotation.y=-a;const f=Math.sin(t*9+i)*.7;u.wl.rotation.x=f;u.wr.rotation.x=-f;});};
window.render=function(t){hideAll();FX.innerHTML='';
 let i=0;while(i+1<SHOTS.length&&t>=T(SHOTS[i+1][0])-.04)i++;const [ln,fn]=SHOTS[i];fn(t,t-T(ln));
 const card=ENVCUR==='card';document.getElementById('cardbg').setAttribute('opacity',card?1:0);
 if(!card){waves(t,TODcur==='night'?.16:.22);const pm=ENVS.port.userData.moored;if(ENVS.port.visible)pm.forEach((b,j)=>{b.position.y=Math.sin(t*1.4+j)*.1;b.rotation.z=Math.sin(t*1.1+j*.7)*.04;});
  if(TODcur==='night')LAMPS.forEach(([s,L],j)=>{const f=.85+.15*Math.sin(t*13+j*2)*Math.sin(t*7.3+j);L.intensity=26*f;s.scale.setScalar(2.4*f);});
  R.render(scene,camera);}
 let f=0;const tc=T(ln);const d=Math.abs(t-tc);if(d<.12&&i>0)f=1-d/.12;document.getElementById('fade').setAttribute('opacity',f*.85);
 captions(t);};
await document.fonts.ready;window.ready=true;
