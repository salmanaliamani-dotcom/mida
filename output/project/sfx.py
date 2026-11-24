import numpy as np, soundfile as sf, json, sys
SR=48000; rng=np.random.default_rng(7)
def lp(x,a):  # one-pole lowpass
    y=np.empty_like(x); acc=0.0
    for i,v in enumerate(x): acc+=a*(v-acc); y[i]=acc
    return y
def knock(glass=1.0, dull=0.0):
    n=int(.45*SR); t=np.arange(n)/SR
    thump=np.sin(2*np.pi*(150-60*t)*t)*np.exp(-t*38)
    click=rng.normal(0,1,n)*np.exp(-t*260)
    click=lp(click,.25)
    ring=(np.sin(2*np.pi*2350*t)*.5+np.sin(2*np.pi*3710*t)*.3+np.sin(2*np.pi*5230*t)*.15)*np.exp(-t*22)
    s=thump*1.0+click*.6+ring*.22*glass
    if dull: s=lp(s,1-dull)
    return s/np.max(np.abs(s))
def swell(dur):
    n=int(dur*SR);t=np.arange(n)/SR
    s=np.sin(2*np.pi*41*t)+.5*np.sin(2*np.pi*61.5*t)
    s+=lp(rng.normal(0,1,n),.01)*3
    env=np.minimum(1,t/dur*1.2)**2*np.exp(-np.maximum(0,t-dur*.85)*8)
    return s*env/np.max(np.abs(s*env))
def drone(dur):
    n=int(dur*SR);t=np.arange(n)/SR
    br=np.cumsum(rng.normal(0,1,n));br-=lp(br,.0005);br=lp(br,.02)
    br/=np.max(np.abs(br))
    s=br*.7+.35*np.sin(2*np.pi*48*t)*(.7+.3*np.sin(2*np.pi*.07*t))+.15*np.sin(2*np.pi*96.3*t)
    return s/np.max(np.abs(s))
def db(x): return 10**(x/20)
ev=json.load(open(sys.argv[1])); T0,T1=ev['t0'],ev['t1']
L=int((T1-T0)*SR); out=np.zeros(L)
def place(sig,t,g):
    i=int((t-T0)*SR)
    if i<0 or i>=L: return
    m=min(len(sig),L-i); out[i:i+m]+=sig[:m]*g
d=drone(T1-T0); fade=np.minimum(1,np.arange(L)/SR/1.0); d*=fade*np.minimum(1,(L-np.arange(L))/SR/0.6)
# drone ducks during "silence" moments
gain=np.ones(L)
for a,b,k in ev.get('drone_duck',[]):
    i,j=int((a-T0)*SR),int((b-T0)*SR); gain[max(0,i):max(0,j)]=k
gain=lp(gain,.0004); out+=d*gain*db(ev.get('drone_db',-30))
for k in ev['knocks']: place(knock(k.get('glass',1),k.get('dull',0)),k['t'],db(k['db']))
for s in ev.get('swells',[]): place(swell(s['dur']),s['t'],db(s['db']))
def squeak(dur):
    n=int(dur*SR);t=np.arange(n)/SR
    f=1900+300*np.sin(2*np.pi*7*t)+rng.normal(0,40,n).cumsum()/200
    s=np.sin(2*np.pi*np.cumsum(f)/SR)*(.6+.4*np.sin(2*np.pi*23*t))
    s+=lp(rng.normal(0,1,n),.3)*.4
    env=np.minimum(1,t/.05)*np.minimum(1,(dur-t)/.05)
    return s*env
def static(dur,chop=0):
    n=int(dur*SR);t=np.arange(n)/SR
    s=rng.normal(0,1,n); s=s-lp(s,.08); s=lp(s,.5)
    crack=(rng.random(n)<.0008)*rng.normal(0,6,n)
    s=s+crack
    if chop: s*= (np.sin(2*np.pi*chop*t+rng.random()*6)>-.2)
    env=np.minimum(1,t/.03)*np.minimum(1,(dur-t)/.05)
    return s*env/np.max(np.abs(s))
def click():
    n=int(.06*SR);t=np.arange(n)/SR
    return (np.sin(2*np.pi*900*t)*np.exp(-t*120)+rng.normal(0,1,n)*np.exp(-t*300)*.5)
def hit(dur=2.0):
    n=int(dur*SR);t=np.arange(n)/SR
    s=np.sin(2*np.pi*(55-15*t/dur)*t)*np.exp(-t*2.2)+lp(rng.normal(0,1,n),.02)*np.exp(-t*4)*2
    return s/np.max(np.abs(s))
def clacks(dur,period=.95):
    n=int(dur*SR);out=np.zeros(n);t=0.0
    base=knock(.2,.7)
    while t<dur:
        for off,g in ((0,1),(.11,.8)):
            i=int((t+off)*SR)
            if i<n: m=min(len(base),n-i);out[i:i+m]+=base[:m]*g
        t+=period
    rum=lp(rng.normal(0,1,n),.01)*4
    return (out*.6+rum*.5)
def screech(dur):
    n=int(dur*SR);t=np.arange(n)/SR
    f=3200-900*t/dur+60*np.sin(2*np.pi*13*t)
    s=np.sin(2*np.pi*np.cumsum(f)/SR)+.5*np.sin(2*np.pi*np.cumsum(f*1.5)/SR)
    s*= .6+.4*np.abs(np.sin(2*np.pi*5*t))
    s+=lp(rng.normal(0,1,n),.3)*.5
    env=np.minimum(1,t/.08)*np.minimum(1,(dur-t)/.12)
    return s*env/np.max(np.abs(s*env))
def whoosh(dur):
    n=int(dur*SR);t=np.arange(n)/SR
    s=rng.normal(0,1,n);a=np.linspace(.02,.25,n)
    y=np.empty(n);acc=0
    for i in range(n): acc+=a[i]*(s[i]-acc);y[i]=acc
    env=np.sin(np.pi*t/dur)**2
    return y*env/np.max(np.abs(y*env))
def breathe(dur,period=1.8):
    n=int(dur*SR);t=np.arange(n)/SR
    s=rng.normal(0,1,n); s=s-lp(s,.05); s=lp(s,.25)
    env=(np.sin(2*np.pi*t/period-np.pi/2)+1)/2
    env=env**2*np.minimum(1,t/.4)*np.minimum(1,(dur-t)/.4)
    return s*env/np.max(np.abs(s))
def buzz(dur):
    n=int(dur*SR);t=np.arange(n)/SR
    s=np.sign(np.sin(2*np.pi*100*t))*.5+np.sin(2*np.pi*200*t)*.3
    gate=(np.floor(t*18)%3!=1)
    return lp(s*gate,.2)*np.minimum(1,(dur-t)/.05)
def plop():
    n=int(.25*SR);t=np.arange(n)/SR
    f=900+1400*np.exp(-t*30)
    return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*22)
def heart(dur,period=.31):
    n=int(dur*SR);out=np.zeros(n);tt=0
    m=int(.12*SR);t=np.arange(m)/SR;th=np.sin(2*np.pi*55*t)*np.exp(-t*35)
    while tt<dur:
        for off,g in ((0,1),(.11,.7)):
            i=int((tt+off)*SR)
            if i<n: k=min(m,n-i);out[i:i+k]+=th[:k]*g
        tt+=period
    return out
def creak(dur):
    n=int(dur*SR);t=np.arange(n)/SR
    f=180+60*np.sin(2*np.pi*.7*t)+30*np.sin(2*np.pi*3.1*t)
    ph=np.cumsum(f)/SR;s=(ph%1)*2-1
    s*= .5+.5*(np.sin(2*np.pi*11*t)>0)
    s=lp(s,.15);env=np.minimum(1,t/.2)*np.minimum(1,(dur-t)/.3)
    return s*env/np.max(np.abs(s))
def ticks(dur,period=.25):
    n=int(dur*SR);out=np.zeros(n);c=click();tt=0
    while tt<dur:
        i=int(tt*SR);k=min(len(c),n-i)
        if k>0: out[i:i+k]+=c[:k]
        tt+=period
    return out
def steps(dur,period=.45):
    n=int(dur*SR);out=np.zeros(n);b=knock(0,.85);tt=0;j=0
    while tt<dur:
        i=int(tt*SR);k=min(len(b),n-i)
        if k>0: out[i:i+k]+=b[:k]*(.7+.3*(j%2))
        tt+=period*(1+.08*np.sin(j*1.7));j+=1
    return out
for e in ev.get('fx',[]):
    k=e['k']
    sig={'squeak':lambda:squeak(e['dur']),'static':lambda:static(e['dur'],e.get('chop',0)),'click':click,'hit':lambda:hit(e.get('dur',2.0)),'knock':lambda:knock(),'clacks':lambda:clacks(e['dur']),'screech':lambda:screech(e['dur']),'whoosh':lambda:whoosh(e['dur']),'breathe':lambda:breathe(e['dur']),'buzz':lambda:buzz(e['dur']),'plop':plop,'heart':lambda:heart(e['dur']),'creak':lambda:creak(e['dur']),'ticks':lambda:ticks(e['dur']),'steps':lambda:steps(e['dur'])}[k]()
    place(sig,e['t'],db(e['db']))
sf.write(sys.argv[2],out.astype(np.float32),SR)
print('peak',np.max(np.abs(out)))
