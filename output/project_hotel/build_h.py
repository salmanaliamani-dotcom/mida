import json,sys,numpy as np
p=sys.argv[1];S='/tmp/claude-0/-home-user-mida/640edc63-65c4-5bb3-a908-fad39fe185ec/scratchpad'
W=json.load(open(f'{p}/words.json'))
x=np.load(f'{p}/vo16.npy');sr=16000;fps=30;env=[]
for i in range(int(len(x)/sr*fps)+2):
    a=int(i/fps*sr);w=x[a:a+sr//fps]
    env.append(round(float(20*np.log10(np.sqrt(np.mean(w**2))+1e-9)) if len(w) else -90,1))
head=open(S+'/proj/head.part').read()
body=f'''<g id="world"></g>
<rect width="1080" height="1920" fill="url(#vig)"/>
<g id="fx"></g>
<g id="caps"></g>
</svg>
<script>const ENV={json.dumps({"t0":0,"fps":fps,"db":env})};const WORDS={json.dumps(W,ensure_ascii=False)};</script>
<script src="rig2.js"></script><script src="engine.js"></script><script src="common_shots.js"></script><script src="{p}.js"></script>
</body></html>'''
open(f'{p}.html','w').write(head+body)
