const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('C',m.text())});
await p.goto(process.argv[2]);await p.waitForFunction(()=>window.ready===true,null,{timeout:60000});
for(const t of process.argv.slice(4).map(Number)){await p.evaluate(t=>render(t),t);await p.screenshot({path:`${process.argv[3]}/f_${t}.png`});}await b.close();})();
