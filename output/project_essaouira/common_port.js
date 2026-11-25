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
