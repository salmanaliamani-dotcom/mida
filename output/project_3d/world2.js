// ---------- procedural textures ----------
function tex(w,h,draw,rx=1,ry=1){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');draw(g,w,h);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,ry);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t;}
const rnd=(()=>{let s=7;return()=>{s=(s*16807)%2147483647;return s/2147483647;};})();
function noise(g,w,h,n,a){for(let i=0;i<n;i++){g.fillStyle=`rgba(${rnd()<.5?0:255},${rnd()<.5?0:255},${rnd()<.5?0:255},${a*rnd()})`;g.fillRect(rnd()*w,rnd()*h,1+rnd()*3,1+rnd()*3);}}
const stoneTex=(rx,ry)=>tex(512,512,(g,w,h)=>{g.fillStyle='#8a6438';g.fillRect(0,0,w,h);const rh=64;for(let r=0;r<h/rh;r++){let x=-(r%2)*60;while(x<w){const bw=90+rnd()*70;const l=150+rnd()*40;g.fillStyle=`hsl(${30+rnd()*8},${45+rnd()*12}%,${52+rnd()*12}%)`;g.beginPath();g.roundRect(x+3,r*rh+3,bw-6,rh-6,8);g.fill();g.fillStyle='rgba(255,240,210,.18)';g.fillRect(x+6,r*rh+6,bw-12,6);g.strokeStyle='rgba(60,35,15,.6)';g.lineWidth=3;g.stroke();x+=bw;}}noise(g,w,h,5000,.12);},rx,ry);
const plasterTex=(rx,ry)=>tex(256,256,(g,w,h)=>{g.fillStyle='#f3eee4';g.fillRect(0,0,w,h);noise(g,w,h,3000,.06);for(let i=0;i<6;i++){g.fillStyle='rgba(180,160,130,.12)';g.beginPath();g.ellipse(rnd()*w,rnd()*h,20+rnd()*40,6+rnd()*14,rnd()*3,0,7);g.fill();}},rx,ry);
const woodTex=(col,rx,ry,stripe)=>tex(512,256,(g,w,h)=>{g.fillStyle=col;g.fillRect(0,0,w,h);const n=8;for(let i=0;i<n;i++){const y=i*h/n;g.fillStyle=`rgba(0,0,0,${.05+rnd()*.08})`;g.fillRect(0,y,w,h/n);g.strokeStyle='rgba(20,15,10,.55)';g.lineWidth=3;g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke();
  for(let k=0;k<5;k++){g.strokeStyle='rgba(255,255,255,.08)';g.lineWidth=1.5;g.beginPath();const yy=y+rnd()*h/n;g.moveTo(rnd()*w,yy);g.lineTo(rnd()*w,yy+rnd()*3);g.stroke();}}
  if(stripe){g.fillStyle='#f2c21b';g.fillRect(0,h*.14,w,h*.07);g.fillStyle='#c0392b';g.fillRect(0,h*.22,w,h*.05);}noise(g,w,h,4000,.1);for(let i=0;i<30;i++){g.fillStyle='rgba(240,230,210,.25)';g.fillRect(rnd()*w,rnd()*h,4+rnd()*20,2+rnd()*4);}},rx,ry);
const cobbleTex=(rx,ry)=>tex(512,512,(g,w,h)=>{g.fillStyle='#6a5a44';g.fillRect(0,0,w,h);for(let i=0;i<260;i++){const x=rnd()*w,y=rnd()*h,r=14+rnd()*18;g.fillStyle=`hsl(36,${18+rnd()*10}%,${48+rnd()*14}%)`;g.beginPath();g.ellipse(x,y,r,r*.75,rnd()*3,0,7);g.fill();g.strokeStyle='rgba(40,30,20,.45)';g.lineWidth=2;g.stroke();}noise(g,w,h,4000,.1);},rx,ry);
const netTex=tex(128,128,(g,w,h)=>{g.fillStyle='#4f7a3e';g.fillRect(0,0,w,h);g.strokeStyle='#2c4a22';g.lineWidth=2;for(let i=0;i<w;i+=10){g.beginPath();g.moveTo(i,0);g.lineTo(i+20,h);g.stroke();g.beginPath();g.moveTo(0,i);g.lineTo(w,i+12);g.stroke();}},2,2);
const seaTex=tex(256,256,(g,w,h)=>{g.fillStyle='#2f78a8';g.fillRect(0,0,w,h);for(let i=0;i<70;i++){g.strokeStyle=`rgba(200,235,255,${.15+rnd()*.25})`;g.lineWidth=2;const x=rnd()*w,y=rnd()*h,l=10+rnd()*30;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+l/2,y-3,x+l,y);g.stroke();}},24,24);
// ---------- materials ----------
const TM=(map,c='#ffffff',o={})=>new THREE.MeshToonMaterial(Object.assign({map,color:c,gradientMap:grad},o));
sea.material=TM(seaTex,'#ffffff');
const stoneM=TM(stoneTex(3,1)),stoneM2=TM(stoneTex(2,2)),plasterM=TM(plasterTex(1,1)),cobbleM=TM(cobbleTex(3,3)),crateM=TM(woodTex('#a8743e',1,1)),netM=TM(netTex),beamM=TM(woodTex('#6a4424',1,1));
// ---------- Skala rampart (walkway with cannons) ----------
const wallG=new THREE.Group();scene.add(wallG);
M(new THREE.BoxGeometry(14,5,80),stoneM,-16,2.5,-18,wallG);M(new THREE.BoxGeometry(14,.3,80),cobbleM,-16,5.1,-18,wallG);
for(let i=0;i<17;i++)outline(M(new THREE.BoxGeometry(1.5,1.6,2),stoneM2,-9.3,6,20-i*4.7,wallG),1.03);
for(let i=0;i<17;i++)outline(M(new THREE.BoxGeometry(1.5,1.6,2),stoneM2,-22.7,6,20-i*4.7,wallG),1.03);
const tower=M(new THREE.BoxGeometry(11,14,11),stoneM2,-16,7,-62,wallG);outline(tower,1.01);for(const [dx,dz] of [[-5,-5],[5,-5],[-5,5],[5,5]]){outline(M(new THREE.CylinderGeometry(1,1,2.6,12),stoneM2,-16+dx,15.2,-62+dz,wallG));outline(M(new THREE.SphereGeometry(1,12,8,0,Math.PI*2,0,Math.PI/2),stoneM2,-16+dx,16.5,-62+dz,wallG));}
for(let i=0;i<3;i++)M(new THREE.BoxGeometry(1.2,2,.2),TM(null,'#2a1c12'),-16-3+i*3,6,-56.4,wallG);
const bronzeM=TM(null,'#4e7a5a'),carM=TM(woodTex('#5a3a22',1,1));
const cannons=[];for(let i=0;i<6;i++){const g=new THREE.Group();g.position.set(-11.6,5.25,14-i*7);wallG.add(g);const barrel=outline(M(new THREE.CylinderGeometry(.32,.5,3.6,16),bronzeM,1.2,.75,0,g),1.05);barrel.rotation.z=Math.PI/2-.1;outline(M(new THREE.SphereGeometry(.42,12,8),bronzeM,-.6,.8,0,g),1.06);
  outline(M(new THREE.BoxGeometry(1.8,.6,1.2),carM,0,.3,0,g),1.04);for(const s of[-1,1]){const w=outline(M(new THREE.CylinderGeometry(.5,.5,.18,16),carM,0,.35,s*.7,g),1.06);w.rotation.x=Math.PI/2;}cannons.push(g);}
// ---------- quay with office, crates, nets, ropes ----------
M(new THREE.BoxGeometry(24,1.6,20),stoneM,-2,.8,11);M(new THREE.BoxGeometry(24,.12,20),cobbleM,-2,1.66,11);
const office=new THREE.Group();office.position.set(-6,1.7,3);scene.add(office);outline(M(new THREE.BoxGeometry(5,4.2,4),plasterM,0,2.1,0,office),1.015);
const blueM=TM(woodTex('#1f6fc2',1,1));outline(M(new THREE.BoxGeometry(1.4,2.5,.14),blueM,.7,1.25,2.04,office),1.04);outline(M(new THREE.BoxGeometry(1.2,1.1,.14),blueM,-1.3,2.6,2.04,office),1.04);M(new THREE.BoxGeometry(.12,1.1,.16),TM(null,'#0d3a6a'),-1.3,2.6,2.1,office);
M(new THREE.BoxGeometry(5.4,.35,4.4),plasterM,0,4.35,0,office);const lampO=new THREE.PointLight('#ffcf7a',0,14);lampO.position.set(.7,3.2,2.6);office.add(lampO);
for(let i=0;i<9;i++){const c=outline(M(new THREE.BoxGeometry(1.2,.85,1),crateM,-10.5+(i%3)*1.28,2.15+Math.floor(i/3)*.86,8+((i*7)%3)*.25),1.03);c.rotation.y=(rnd()-.5)*.2;}
for(let i=0;i<3;i++){const n=M(new THREE.SphereGeometry(1,16,10),netM,3+i*2.6,2.05,15-i*1.4);n.scale.set(1.2,.42,.95);outline(n,1.03);for(let k=0;k<4;k++)M(new THREE.SphereGeometry(.14,8,6),TM(null,k%2?'#f2c21b':'#e0592a'),3+i*2.6+(rnd()-.5)*1.6,2.4,15-i*1.4+(rnd()-.5)*1.2);}
for(let i=0;i<3;i++){const r=M(new THREE.TorusGeometry(.6,.13,8,24),TM(null,'#c9a46a'),-1+i*1.6,1.85,17);r.rotation.x=Math.PI/2;outline(r,1.08);}
for(let i=0;i<5;i++)outline(M(new THREE.CylinderGeometry(.25,.3,1,10),TM(null,'#3a3a40'),-12+i*5.5,2.2,20.3),1.06);
// ---------- town ----------
const town=new THREE.Group();scene.add(town);const plT=plasterTex(2,2);for(let i=0;i<80;i++){const w=2+rnd()*3,h=2+rnd()*6;const b=M(new THREE.BoxGeometry(w,h,3),TM(plT),22+(i%16)*3.4+rnd(),h/2,-55-Math.floor(i/16)*6-rnd()*2,town);if(i%2==0)M(new THREE.BoxGeometry(.7,.9,.1),TM(null,'#1f6fc2'),b.position.x,h*.6,b.position.z+1.55,town);}
M(new THREE.BoxGeometry(2,16,2),TM(plT),50,8,-80,town);
// ---------- boats (planked hull, inner deck, oars, floats) ----------
function hullGeo(L=6,W=2.2,H=1.15){const g=new THREE.BoxGeometry(L,H,W,12,3,3);const p=g.attributes.position;for(let i=0;i<p.count;i++){let x=p.getX(i),y=p.getY(i),z=p.getZ(i);const k=Math.abs(x)/(L/2);z*=(1-Math.pow(k,2.2)*.85)*(y<0?.72:1);if(y<0)y*=1-k*.3;y+=Math.pow(k,2)*.4;p.setXYZ(i,x,y,z);}g.computeVertexNormals();return g;}
const HG=hullGeo();const deckG=hullGeo(5.4,1.9,.2);
const hullMs=['#2f84d6','#2a6fb8','#3a8fe0','#245fa0'].map(c=>TM(woodTex(c,1,1,true)));const deckM=TM(woodTex('#7a5a36',2,1));
function boat(i=0,o={}){const g=new THREE.Group();outline(M(HG,hullMs[i%4],0,0,0,g),1.035);M(deckG,deckM,0,.42,0,g);
  for(let k=-1;k<=1;k++)M(new THREE.BoxGeometry(.2,.12,1.9),deckM,k*1.4,.5,0,g);
  if(o.cabin){outline(M(new THREE.BoxGeometry(1.4,1.3,1.3),plasterM,.6,1.15,0,g),1.04);M(new THREE.BoxGeometry(.9,.45,.06),TM(null,'#2b3a73'),.6,1.35,.67,g);outline(M(new THREE.BoxGeometry(.45,1.1,.55),TM(null,'#3a3a40'),-3.05,.6,0,g),1.05);}
  else{const oar=M(new THREE.CylinderGeometry(.05,.05,3.6,6),beamM,.3,.75,.4,g);oar.rotation.z=Math.PI/2;oar.rotation.y=.25;if(i%3===0){const n=M(new THREE.SphereGeometry(.7,12,8),netM,-1.2,.7,0,g);n.scale.set(1.2,.5,.9);for(let k=0;k<3;k++)M(new THREE.SphereGeometry(.12,8,6),TM(null,k%2?'#f2c21b':'#e0592a'),-1.2+(k-1)*.4,1,.3,g);}}
  scene.add(g);return g;}
const boats=[];for(let i=0;i<30;i++){const b=boat(i);b.position.set(2+(i%6)*3.1+rnd()*.6,0,-5-Math.floor(i/6)*5.2-rnd());b.rotation.y=Math.PI/2+(rnd()-.5)*.35;boats.push(b);}
const mab=boat(0,{cabin:true});mab.position.set(12,0,22);
const lampM=new THREE.Sprite(new THREE.SpriteMaterial({map:glowT,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));lampM.scale.set(3,3,1);lampM.position.set(.6,2.1,0);mab.add(lampM);const mabL=new THREE.PointLight('#ffd27a',0,18);mabL.position.set(.6,2.2,0);mab.add(mabL);
// ---------- gulls ----------
const gullW=new THREE.Shape();gullW.moveTo(0,-.3);gullW.quadraticCurveTo(.9,-.35,1.9,.05);gullW.quadraticCurveTo(1,.15,0,.3);
const gwG=new THREE.ShapeGeometry(gullW);gwG.rotateX(-Math.PI/2);const gwTip=new THREE.ShapeGeometry((()=>{const s=new THREE.Shape();s.moveTo(1.4,-.15);s.quadraticCurveTo(1.7,-.12,1.9,.05);s.lineTo(1.5,.1);return s;})());gwTip.rotateX(-Math.PI/2);
const gulls=[];for(let i=0;i<10;i++){const g=new THREE.Group();const b=outline(M(new THREE.CapsuleGeometry(.22,.7,6,12),TM(null,'#f7f4ee'),0,0,0,g),1.06);b.rotation.z=Math.PI/2;outline(M(new THREE.SphereGeometry(.2,12,8),TM(null,'#f7f4ee'),.55,.12,0,g),1.08);M(new THREE.ConeGeometry(.06,.25,6),TM(null,'#f2b33a'),.8,.1,0,g).rotation.z=-Math.PI/2;
  const wm=TM(null,'#f7f4ee',{side:THREE.DoubleSide}),tm=TM(null,'#3a3a40',{side:THREE.DoubleSide});const wl=new THREE.Group(),wr=new THREE.Group();g.add(wl);g.add(wr);wl.add(new THREE.Mesh(gwG,wm));wl.add(new THREE.Mesh(gwTip,tm));wr.add(new THREE.Mesh(gwG,wm));wr.add(new THREE.Mesh(gwTip,tm));wl.rotation.y=Math.PI/2;wr.rotation.y=-Math.PI/2;
  g.userData={wl,wr,ph:rnd()*6,r:5+rnd()*8,h:5+rnd()*5,sp:.25+rnd()*.3,cx:6+rnd()*8,cz:-6-rnd()*12};scene.add(g);gulls.push(g);}
// ---------- quay lamps ----------
const lamps=[];for(let i=0;i<4;i++){const x=-11+i*7;outline(M(new THREE.CylinderGeometry(.1,.14,4.2,8),TM(null,'#2a2a30'),x,3.8,19.5),1.08);outline(M(new THREE.BoxGeometry(.5,.6,.5),TM(null,'#2a2a30'),x,6.1,19.5),1.06);
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:glowT,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));s.scale.set(2.4,2.4,1);s.position.set(x,6.1,19.5);scene.add(s);const L=new THREE.PointLight('#ffc670',0,22,1.6);L.position.set(x,5.9,19.5);scene.add(L);lamps.push([s,L]);}
// ---------- character v2 ----------
const faceC=document.createElement('canvas');faceC.width=1024;faceC.height=512;const faceT=new THREE.CanvasTexture(faceC);faceT.colorSpace=THREE.SRGBColorSpace;
function drawFace(blink=0,mouth=0,look=0){const g=faceC.getContext('2d');const sk=g.createLinearGradient(0,0,0,512);sk.addColorStop(0,'#e2a878');sk.addColorStop(1,'#c4865a');g.fillStyle=sk;g.fillRect(0,0,1024,512);const cx=256,cy=250;
  // stubble
  g.fillStyle='rgba(60,40,30,.16)';g.beginPath();g.ellipse(cx,cy+120,150,70,0,0,Math.PI);g.fill();for(let i=0;i<260;i++){g.fillStyle='rgba(40,25,18,.35)';const a=Math.random()*Math.PI,r=60+Math.random()*90;g.fillRect(cx+Math.cos(a)*r*1.4-2,cy+80+Math.sin(a)*r*.6,2,2);}
  g.fillStyle='rgba(255,110,100,.22)';g.beginPath();g.ellipse(cx-120,cy+55,38,18,0,0,7);g.ellipse(cx+120,cy+55,38,18,0,0,7);g.fill();
  for(const s of [-1,1]){const ex=cx+s*66,ey=cy-12;g.fillStyle='#fff';g.beginPath();g.ellipse(ex,ey,36,40,0,0,7);g.fill();
    g.save();g.beginPath();g.ellipse(ex,ey,36,40,0,0,7);g.clip();g.fillStyle='#2a1a12';g.beginPath();g.arc(ex+look*14+3,ey+6,17,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(ex+look*14+9,ey-2,6,0,7);g.fill();
    const lid=.32+blink*.68;g.fillStyle='#c98c62';g.fillRect(ex-40,ey-44,80,88*lid);g.restore();
    g.strokeStyle='#15100c';g.lineWidth=6;g.beginPath();g.ellipse(ex,ey,36,40,0,0,7);g.stroke();g.lineWidth=7;g.beginPath();g.moveTo(ex-36,ey-44+88*(.32+blink*.68));g.lineTo(ex+36,ey-44+88*(.32+blink*.68));g.stroke();
    g.lineWidth=16;g.lineCap='round';g.beginPath();g.moveTo(ex-s*-40,ey-70);g.quadraticCurveTo(ex,ey-84,ex+s*40,ey-66);g.stroke();}
  g.strokeStyle='#15100c';g.lineWidth=7;g.beginPath();g.moveTo(cx-4,cy+22);g.quadraticCurveTo(cx-18,cy+52,cx+6,cy+56);g.stroke();
  if(mouth<.06){g.lineWidth=7;g.beginPath();g.moveTo(cx-36,cy+96);g.quadraticCurveTo(cx,cy+110,cx+36,cy+96);g.stroke();}else{g.fillStyle='#5a1414';g.beginPath();g.ellipse(cx,cy+100,36,8+mouth*30,0,0,7);g.fill();g.stroke();}
  faceT.needsUpdate=true;}
drawFace();
const jacketT=tex(512,256,(g,w,h)=>{g.fillStyle='#2f5f9e';g.fillRect(0,0,w,h);noise(g,w,h,3000,.08);const c=w*.5;g.fillStyle='#f4f2ee';g.beginPath();g.moveTo(c-46,0);g.lineTo(c+46,0);g.lineTo(c+20,h);g.lineTo(c-20,h);g.fill();
  g.fillStyle='#24508a';g.beginPath();g.moveTo(c-46,0);g.lineTo(c-90,0);g.lineTo(c-34,h*.55);g.fill();g.beginPath();g.moveTo(c+46,0);g.lineTo(c+90,0);g.lineTo(c+34,h*.55);g.fill();g.strokeStyle='#15100c';g.lineWidth=4;g.beginPath();g.moveTo(c-46,0);g.lineTo(c-24,h);g.moveTo(c+46,0);g.lineTo(c+24,h);g.stroke();
  for(let i=0;i<3;i++){g.fillStyle='#d8d4cc';g.beginPath();g.arc(c+2,40+i*60,6,0,7);g.fill();}g.strokeStyle='#1c3e6e';g.lineWidth=4;g.strokeRect(c+60,h*.55,70,40);},1,1);
const you=new THREE.Group();scene.add(you);
const skinM=TM(null,'#d79a6a');const headMat=new THREE.MeshToonMaterial({map:faceT,gradientMap:grad});
const head=outline(M(new THREE.SphereGeometry(1.15,48,32),headMat,0,3.45,0,you),1.03);
for(let i=0;i<22;i++){const a=i/22*Math.PI*2;const r=1.0+rnd()*.12;M(new THREE.SphereGeometry(.33+rnd()*.08,10,8),TM(null,'#1d1510'),Math.cos(a)*r*(i%2?.8:.95),4.2+rnd()*.25-(Math.sin(a)>0?.0:0),Math.sin(a)*r*.9-.15,you);}
M(new THREE.SphereGeometry(1.08,24,16,0,Math.PI*2,0,Math.PI*.45),TM(null,'#1d1510'),0,3.62,-.08,you);
for(const s of [-1,1])outline(M(new THREE.SphereGeometry(.22,12,8),skinM,s*1.13,3.38,0,you),1.1);
outline(M(new THREE.CylinderGeometry(.28,.32,.4,12),skinM,0,2.45,0,you),1.06);
const torso=outline(M(new THREE.CylinderGeometry(.62,.78,1.75,24,1,false,Math.PI),TM(jacketT),0,1.72,0,you),1.035);
const legs=[];for(const s of [-1,1]){const l=new THREE.Group();l.position.set(s*.3,.88,0);you.add(l);outline(M(new THREE.CylinderGeometry(.16,.14,.9,10),TM(null,'#1b1d24'),0,-.45,0,l),1.1);outline(M(new THREE.BoxGeometry(.32,.2,.56),TM(null,'#121212'),0,-.92,.12,l),1.08);legs.push(l);}
function hand(p,s){const h=new THREE.Group();p.add(h);outline(M(new THREE.SphereGeometry(.17,12,8),skinM,0,0,0,h),1.1).scale.set(1,1.15,.8);for(let k=0;k<3;k++){const f=outline(M(new THREE.CapsuleGeometry(.045,.16,4,6),skinM,-.08+k*.08,-.2,.04,h),1.15);}const th=outline(M(new THREE.CapsuleGeometry(.05,.12,4,6),skinM,s*.15,-.04,.08,h),1.15);th.rotation.z=s*.9;return h;}
const arms=[];for(const s of [-1,1]){const a=new THREE.Group();a.position.set(s*.72,2.4,0);you.add(a);outline(M(new THREE.CylinderGeometry(.15,.13,.6,10),TM(null,'#2f5f9e'),0,-.3,0,a),1.1);const el2=new THREE.Group();el2.position.y=-.6;a.add(el2);outline(M(new THREE.CylinderGeometry(.13,.12,.55,10),TM(null,'#2f5f9e'),0,-.27,0,el2),1.1);const hd=hand(el2,s);hd.position.y=-.62;arms.push({a,el:el2,hd});}
const noteT=tex(128,160,(g,w,h)=>{g.fillStyle='#f6efdc';g.fillRect(0,0,w,h);g.strokeStyle='#9ab';g.lineWidth=2;for(let y=24;y<h;y+=14){g.beginPath();g.moveTo(8,y);g.lineTo(w-8,y);g.stroke();}g.fillStyle='#444';for(let i=0;i<7;i++)g.fillRect(10+i*16,2,6,8);});
const note=new THREE.Group();you.add(note);outline(M(new THREE.BoxGeometry(.62,.8,.06),TM(null,'#6a4a2e'),0,0,0,note),1.04);M(new THREE.PlaneGeometry(.56,.74),TM(noteT),0,0,.035,note);note.position.set(0,1.55,.72);note.rotation.x=-.75;
const pen=outline(M(new THREE.CylinderGeometry(.03,.03,.5,6),TM(null,'#f2c21b'),.22,1.72,.85,you),1.15);pen.rotation.z=.7;
you.traverse(o=>{if(o.isMesh)o.castShadow=true;});
