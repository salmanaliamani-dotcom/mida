// resumable: renders [t0,t1) in segments of S frames to dir/seg_<startframe>.mp4
const {chromium}=require('playwright');const {spawn}=require('child_process');const fs=require('fs');
const [url,dir,t0,t1,fps,S]=[process.argv[2],process.argv[3],+process.argv[4],+process.argv[5],30,300];
fs.mkdirSync(dir,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));await p.goto(url);await p.waitForFunction(()=>window.ready===true,null,{timeout:60000});
const F0=Math.round(t0*fps),F1=Math.round(t1*fps);const st=Date.now();
for(let s=F0;s<F1;s+=S){const e=Math.min(F1,s+S);const fn=`${dir}/seg_${String(s).padStart(6,'0')}.mp4`;if(fs.existsSync(fn))continue;
 const tmp=fn+'.tmp.mp4';const ff=spawn('ffmpeg',['-loglevel','error','-y','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-r','30',tmp],{stdio:['pipe','inherit','inherit']});
 for(let f=s;f<e;f++){await p.evaluate(t=>render(t),f/fps);const buf=await p.screenshot({type:'jpeg',quality:94});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));fs.renameSync(tmp,fn);console.log(`seg ${s}-${e} ${((Date.now()-st)/1000).toFixed(0)}s`);}
await b.close();console.log('done',(Date.now()-st)/1000);})();
