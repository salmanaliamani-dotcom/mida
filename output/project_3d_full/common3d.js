// shared 3D shot helpers
const PL={ // standard stage spots
 port:{x:0,y:1.7,z:9,tod:'dusk'},deck:{x:300,y:1.2,z:2,tod:'dusk'},office:{x:-300,y:.1,z:1.6,tod:'interior'},alley:{x:0,y:.1,z:298,tod:'day'},room:{x:-300,y:.1,z:299,tod:'interior'},
};
function CU(t,env,kind,pose,line,o={}){const P=PL[env];setEnv(o.envs||env,o.tod||P.tod);const x=P.x+(o.dx||0),z=P.z+(o.dz||0);const p=Object.assign({x,y:P.y,z,ry:o.ry||0},pose);if(line&&o.talk!==false)p.mouth=o.all?talkAll(t,line):talkIn(t,line);put(kind,p,t);
 const d=o.d||kf(t,[[T(line||1)-.1,o.d0||5.6],[T(line||1)+3,o.d1||5.0]]);C3(t,[x+(o.cx??.5),P.y+3.7+(o.cy||0),z+d],[x,P.y+3.35,z],o.fov||40);}
function TWO(t,env,A,B,o={}){const P=PL[env];setEnv(o.envs||env,o.tod||P.tod);const g=o.gap||1.7;put(A[0],Object.assign({x:P.x-g,y:P.y,z:P.z,ry:20},A[1]),t);put(B[0],Object.assign({x:P.x+g,y:P.y,z:P.z,ry:-20},B[1]),t);
 const d=o.d||9.5;C3(t,[P.x+(o.cx||0),P.y+(o.cy||3.6),P.z+d],[P.x,P.y+(o.ly||2.6),P.z],o.fov||40);}
function CARD(t){setEnv('card');}
