import re,sys,json,subprocess,math
i=sys.argv[1]
txt=f'/home/user/mida/output/stickman_1760/ياسين_الجزء_{i}_من_4.txt'
EMO=re.compile('[\U0001F000-\U0001FAFF☀-➿⬀-⯿️‍]')
lines=[re.sub(r'\s+',' ',EMO.sub('',re.sub(r'\[[a-z]+\]','',l))).strip() for l in open(txt) if l.strip()]
dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'voice{i}.wav']))
out=subprocess.run(['ffmpeg','-i',f'voice{i}.wav','-af','silencedetect=noise=-35dB:d=0.15','-f','null','-'],capture_output=True,text=True).stderr
ss=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',out)]; se=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',out)]
# speech segments
segs=[];cur=0.0
for a,b in zip(ss,se):
    if a>cur+0.05: segs.append([cur,a])
    cur=b
if cur<dur-0.05: segs.append([cur,dur])
N=len(segs);L=len(lines)
w=[len(l.replace(' ','')) for l in lines]
speech=sum(b-a for a,b in segs); r=speech/sum(w)
gap=[segs[k][0]-(segs[k-1][1] if k else 0) for k in range(N)]
INF=1e18
dp=[[INF]*(N+1) for _ in range(L+1)];bk=[[0]*(N+1) for _ in range(L+1)]
dp[0][0]=0
for j in range(1,L+1):
    for n in range(j,N+1):
        best=INF;bi=0
        for m in range(max(j-1,n-12),n):
            if dp[j-1][m]>=INF: continue
            d=sum(segs[k][1]-segs[k][0] for k in range(m,n))
            c=dp[j-1][m]+ (math.log(d/(r*w[j-1])))**2*3 - (0.8*math.log(1+gap[m]*4) if m>0 else 0)
            if c<best: best=c;bi=m
        dp[j][n]=best;bk[j][n]=bi
res=[];n=N
for j in range(L,0,-1):
    m=bk[j][n];res.append((lines[j-1],segs[m][0],segs[n-1][1]));n=m
res.reverse()
J=[{"i":k+1,"text":t,"start":round(a,2),"end":round(b,2)} for k,(t,a,b) in enumerate(res)]
json.dump({"dur":dur,"lines":J},open(f'lines{i}.json','w'),ensure_ascii=False,indent=0)
print(f'part{i} dur={dur:.1f} segs={N} lines={L} rate={1/r:.1f}chars/s')
for x in J: print(f"{x['i']:2} {x['start']:6.2f}-{x['end']:6.2f} ({x['end']-x['start']:4.1f}s,{len(x['text'].replace(' ','')):3}c) {x['text'][:45]}")
