const {chromium}=require('playwright');
(async()=>{const [url,t0,t1,st]=[process.argv[2],+process.argv[3],+process.argv[4],+process.argv[5]];const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('PERR',e.message));await p.goto(url);await p.waitForFunction(()=>window.ready===true,null,{timeout:60000});
const errs=await p.evaluate(([a,z,s])=>{const o=[];window.__nogl=1;for(let t=a;t<z;t+=s){try{render(t)}catch(e){o.push(t.toFixed(2)+' '+e.message)}}return o},[t0,t1,st]);console.log(errs.length,errs.slice(0,20).join('\n'));await b.close();})();
