import json,re,math
segs=json.load(open("segs.json"))["segs"]
m=[]
for a,b in segs:
    if m and a-m[-1][1]<0.25: m[-1][1]=b
    else: m.append([a,b])
segs=m;S=len(segs)
lines=[l.strip() for l in open("script.txt") if l.strip()];L=len(lines)
n=[len(re.sub(r'[^\w]','',l)) for l in lines]
npause=[len(re.findall(r'[،.:؟…](?=\s*\S)',l)) for l in lines]  # internal punct
tot=segs[-1][1]-segs[0][0]
# model: dur = chars*r + internal_pauses*p ; fit iteratively
r,p=0.072,0.6
for it in range(4):
    INF=1e18
    dp=[[INF]*(S+1) for _ in range(L+1)];bk=[[0]*(S+1) for _ in range(L+1)];dp[0][0]=0
    for i in range(1,L+1):
        exp=n[i-1]*r+npause[i-1]*p
        for j in range(1,S+1):
            for k in range(max(0,j-8),j):
                if dp[i-1][k]>=INF: continue
                d=segs[j-1][1]-segs[k][0]
                c=(math.log(d/exp))**2*6
                gi=[segs[t+1][0]-segs[t][1] for t in range(k,j-1)]
                c+=abs(len([g for g in gi if g>0.4])-npause[i-1])*0.5
                if j<S:
                    g=segs[j][0]-segs[j-1][1]; c+=max(0,0.6-g)*6
                v=dp[i-1][k]+c
                if v<dp[i][j]: dp[i][j]=v;bk[i][j]=k
    j=S;res=[]
    for i in range(L,0,-1):
        k=bk[i][j];res.append((k,j));j=k
    res.reverse()
    # refit r,p by least squares
    import numpy as np
    A=np.array([[n[i],npause[i]] for i in range(L)],float)
    y=np.array([segs[j-1][1]-segs[k][0] for k,j in res])
    r,p=np.linalg.lstsq(A,y,rcond=None)[0]
    print("iter",it,"cost",round(dp[L][S],2),"r",round(r,4),"p",round(p,3))
out=[]
for i,(k,j) in enumerate(res):
    st,en=segs[k][0],segs[j-1][1]
    nxt=segs[j][0] if j<S else None
    exp=n[i]*r+npause[i]*p
    out.append(dict(i=i+1,text=lines[i],start=st,end=en,pause_after=round(nxt-en,2) if nxt else None,sub=segs[k:j]))
    print(f"{i+1:2d} {st:7.2f}-{en:7.2f} d={en-st:5.2f} exp={exp:5.2f} segs={j-k} pause={out[-1]['pause_after']} | {lines[i]}")
json.dump(out,open("lines.json","w"),ensure_ascii=False,indent=1)
