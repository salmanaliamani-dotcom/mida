const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1880, height: 2720 } });
  const W = 1080, H = 1920;
  const defs = seed => `<defs><filter id="paint" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .02" numOctaves="3" seed="7"/><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.15"/></filter>
  <filter id="fiber" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9 .25" numOctaves="2" seed="3"/><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2 1.25"/></filter>
  <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="${seed}"/><feColorMatrix type="saturate" values="0"/></filter></defs>`;
  await p.setContent(`<html><body style="margin:0;background:transparent"><svg id="s" width="${W + 800}" height="${H + 800}">${defs(1)}<rect width="${W + 800}" height="${H + 800}" filter="url(#paint)" opacity=".13"/><rect width="${W + 800}" height="${H + 800}" filter="url(#fiber)" opacity=".07"/></svg></body></html>`);
  await (await p.$('#s')).screenshot({ path: 'tex.png', omitBackground: true });
  await p.setViewportSize({ width: W, height: H });
  for (let i = 0; i < 6; i++) { await p.setContent(`<html><body style="margin:0"><svg id="s" width="${W}" height="${H}">${defs(i * 13 + 1)}<rect width="${W}" height="${H}" filter="url(#grain)"/></svg></body></html>`); await (await p.$('#s')).screenshot({ path: `grain${i}.jpg`, type: 'jpeg', quality: 85 }); }
  await b.close(); console.log('ok');
})();
