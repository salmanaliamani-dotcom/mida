const {chromium}=require('playwright');const {spawn}=require('child_process');
const [html,out,t0,t1,fps]=[process.argv[2],process.argv[3],+process.argv[4],+process.argv[5],+(process.argv[6]||30)];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:+(process.env.W||1920),height:+(process.env.H||1080)}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+html);await p.evaluate(()=>window.ready);
const ff=spawn('ffmpeg',['-loglevel','error','-y','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','16','-pix_fmt','yuv420p','-r',String(fps),out],{stdio:['pipe','inherit','inherit']});
const N=Math.round((t1-t0)*fps);const st=Date.now();
for(let i=0;i<N;i++){const t=t0+i/fps;await p.evaluate(t=>render(t),t);
 const buf=await p.screenshot({type:'jpeg',quality:95});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));
 if(i%150==0)console.log(`frame ${i}/${N} ${((Date.now()-st)/1000).toFixed(0)}s`);}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('done',(Date.now()-st)/1000);})();
