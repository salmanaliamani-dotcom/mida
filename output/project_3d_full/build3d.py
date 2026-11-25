import json,sys,numpy as np
p=sys.argv[1];shots=sys.argv[2] if len(sys.argv)>2 else p+'_3d.js';RW,RH=(810,1440)
S='/tmp/claude-0/-home-user-mida/640edc63-65c4-5bb3-a908-fad39fe185ec/scratchpad'
W=json.load(open(f'{S}/m/{p}/words.json'))
x=np.load(f'{S}/m/{p}/vo16.npy');sr=16000;fps=30;env=[]
for i in range(int(len(x)/sr*fps)+2):
    a=int(i/fps*sr);w=x[a:a+sr//fps]
    env.append(round(float(20*np.log10(np.sqrt(np.mean(w**2))+1e-9)) if len(w) else -90,1))
html=f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Cairo;font-weight:800;src:url(cairo-arabic-800-normal.woff2)}}
@font-face{{font-family:Cairo;font-weight:800;src:url(cairo-latin-800-normal.woff2);unicode-range:U+0000-00FF}}
html,body{{margin:0;background:#000;overflow:hidden}}#c{{position:absolute;left:0;top:0;width:1080px;height:1920px}}#ov{{position:absolute;left:0;top:0}}
.o{{stroke:#17120f;stroke-width:5;stroke-linejoin:round;stroke-linecap:round}}
.cap{{font-family:Cairo;font-weight:800;font-size:84px;fill:#fff;stroke:#0b0b10;stroke-width:14px;paint-order:stroke;stroke-linejoin:round}}
</style></head><body><canvas id="c" width="{RW}" height="{RH}"></canvas>
<svg id="ov" width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg"><defs>
<radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></radialGradient>
<radialGradient id="glowG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd76a" stop-opacity=".8"/><stop offset="1" stop-color="#ffd76a" stop-opacity="0"/></radialGradient>
<radialGradient id="glowB" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#9fd4ff" stop-opacity=".8"/><stop offset="1" stop-color="#9fd4ff" stop-opacity="0"/></radialGradient>
<radialGradient id="skinP" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="#f6cfa6"/><stop offset=".55" stop-color="#d79a6a"/><stop offset="1" stop-color="#a5643e"/></radialGradient>
<radialGradient id="skinC" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="#ffd9b3"/><stop offset=".55" stop-color="#e8a676"/><stop offset="1" stop-color="#b8734a"/></radialGradient>
<filter id="sh" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter></defs>
<rect id="cardbg" width="1080" height="1920" fill="#0f1a2a" opacity="0"/><rect width="1080" height="1920" fill="url(#vig)"/><g id="fx"></g><g id="caps"></g><rect id="fade" width="1080" height="1920" fill="#0b0f18" opacity="0"/></svg>
<script>window.RW={RW};window.RH={RH};const ENV={json.dumps({"t0":0,"fps":fps,"db":env})};const WORDS={json.dumps(W,ensure_ascii=False)};const FX=document.getElementById('fx');</script>
<script src="overlay2d.js"></script><script src="common3d.js"></script><script src="{shots}"></script><script type="module" src="engine3d.js"></script></body></html>'''
open(f'{p}3d.html','w').write(html)
