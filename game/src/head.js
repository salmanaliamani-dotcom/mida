import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
window.THREE=THREE;
window.RW=Math.max(1,innerWidth);window.RH=Math.max(1,innerHeight);
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)), lerp=(a,b,k)=>a+(b-a)*k;
const ease=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
function kf(t,K){if(t<=K[0][0])return K[0][1];for(let i=1;i<K.length;i++){if(t<=K[i][0]){const k=ease((t-K[i-1][0])/(K[i][0]-K[i-1][0]));const a=K[i-1][1],b=K[i][1];return Array.isArray(a)?a.map((v,j)=>lerp(v,b[j],k)):lerp(a,b,k);}}return K[K.length-1][1];}
