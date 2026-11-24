import numpy as np, soundfile as sf, sys, json
x, sr = sf.read(sys.argv[1]); 
hop=int(sr*0.01); n=len(x)//hop
e=np.array([np.sqrt(np.mean(x[i*hop:(i+1)*hop]**2)+1e-12) for i in range(n)])
db=20*np.log10(e)
print("dur",len(x)/sr,"peak db",db.max(),"pctl",np.percentile(db,[5,10,20,50,90]))
thr=float(sys.argv[2]) if len(sys.argv)>2 else -45
sp=db>thr
# smooth: fill gaps <80ms
segs=[];i=0
while i<n:
    if sp[i]:
        j=i
        while j<n and sp[j]: j+=1
        segs.append([i,j]); i=j
    else: i+=1
m=[]
for s in segs:
    if m and s[0]-m[-1][1]<8: m[-1][1]=s[1]
    else: m.append(s)
m=[s for s in m if s[1]-s[0]>=3]
gaps=[(m[k][1]/100, m[k+1][0]/100, (m[k+1][0]-m[k][1])/100) for k in range(len(m)-1)]
print("speech start",m[0][0]/100,"end",m[-1][1]/100,"nsegs",len(m))
json.dump({"segs":[[a/100,b/100] for a,b in m]},open("segs.json","w"))
g=sorted([g[2] for g in gaps]); print("gaps>0.3:",sum(1 for v in g if v>0.3),"gaps>0.5:",sum(1 for v in g if v>0.5),">0.8",sum(1 for v in g if v>0.8))
print(np.histogram(g,bins=[0.08,0.15,0.25,0.35,0.45,0.6,0.8,1.0,1.5,3,10]))
