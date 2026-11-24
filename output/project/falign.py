import onnxruntime as ort,glob,numpy as np,json,re,unicodedata
m=glob.glob('models/*/model.int8.onnx')[0]
tok=[l.rstrip('\n').rsplit(' ',1)[0] for l in open(glob.glob('models/*/tokens.txt')[0],encoding='utf-8')]
tid={t:i for i,t in enumerate(tok)}
S=ort.InferenceSession(m,providers=['CPUExecutionProvider'])
x=np.load('vo16.npy');SR=16000
lines=json.load(open('lines.json'))
def norm_word(w):
    w=re.sub(r'[ً-ْـ]','',w)   # harakat, shadda, tatweel
    w=re.sub(r'[^\w]','',w)
    out=[]
    for ch in w:
        if ch in tid: out.append(tid[ch])
        else:
            alt={'أ':'ا','إ':'ا','آ':'ا','ة':'ه','ى':'ي'}.get(ch)
            if alt and alt in tid: out.append(tid[alt])
            else: print('missing',ch)
    return out
def logsoftmax(a): a=a-a.max(-1,keepdims=True);return a-np.log(np.exp(a).sum(-1,keepdims=True))
def align(lp,targets):
    # CTC viterbi; targets list of token ids; returns per-target (start_frame,end_frame)
    T=lp.shape[0];L=len(targets);ext=[0]
    for t in targets: ext+= [t,0]
    N=len(ext);NEG=-1e9
    D=np.full((T,N),NEG);B=np.zeros((T,N),np.int32)
    D[0,0]=lp[0,0];D[0,1]=lp[0,ext[1]]
    for t in range(1,T):
        for s in range(N):
            c=[(D[t-1,s],s)]
            if s>0:c.append((D[t-1,s-1],s-1))
            if s>1 and ext[s]!=0 and ext[s]!=ext[s-2]:c.append((D[t-1,s-2],s-2))
            v,b=max(c);D[t,s]=v+lp[t,ext[s]];B[t,s]=b
    s=N-1 if D[T-1,N-1]>D[T-1,N-2] else N-2
    path=[0]*T
    for t in range(T-1,-1,-1): path[t]=s; s=B[t,s]
    span={}
    for t,s in enumerate(path):
        if s%2==1:
            k=(s-1)//2; span.setdefault(k,[t,t]); span[k][1]=t
    return [span.get(k) for k in range(L)]
allw=[]
for li in lines:
    a=max(0,li['start']-0.35); b=li['end']+0.35
    seg=x[int(a*SR):int(b*SR)]; seg=(seg-seg.mean())/(seg.std()+1e-7)
    lg=logsoftmax(S.run(None,{'x':seg[None].astype(np.float32)})[0][0])
    fr=(b-a)/lg.shape[0]
    words=li['text'].split()
    tg=[];owner=[]
    for wi,w in enumerate(words):
        ids=norm_word(w)
        if wi>0 and ids: tg.append(tid[' ']);owner.append(-1)
        for i in ids: tg.append(i);owner.append(wi)
    sp=align(lg,tg)
    for wi,w in enumerate(words):
        fs=[sp[k] for k in range(len(tg)) if owner[k]==wi and sp[k]]
        if not fs: continue
        t0=a+fs[0][0]*fr; t1=a+(fs[-1][1]+1)*fr
        allw.append(dict(line=li['i'],w=w,t0=round(t0,3),t1=round(t1,3)))
    print(li['i'],' '.join(f"{w['w']}[{w['t0']:.2f}-{w['t1']:.2f}]" for w in allw if w['line']==li['i']))
json.dump(allw,open('words.json','w'),ensure_ascii=False,indent=0)
