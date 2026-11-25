const {chromium}=require('playwright');const {spawn}=require('child_process');
const [url,out,t0,t1,fps]=[process.argv[2],process.argv[3],+process.argv[4],+process.argv[5],+(process.argv[6]||30)];
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));await p.goto(url);await p.waitForFunction(()=>window.ready===true,null,{timeout:60000});
const ff=spawn('ffmpeg',['-loglevel','error','-y','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-r',String(fps),out],{stdio:['pipe','inherit','inherit']});
const N=Math.round((t1-t0)*fps);const st=Date.now();for(let i=0;i<N;i++){await p.evaluate(t=>render(t),t0+i/fps);const buf=await p.screenshot({type:'jpeg',quality:94});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(i%60==0)console.log(`frame ${i}/${N} ${((Date.now()-st)/1000).toFixed(0)}s`);}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('done',(Date.now()-st)/1000);})();
