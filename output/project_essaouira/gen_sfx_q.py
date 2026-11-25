import json,re,sys
p=sys.argv[1];W=json.load(open(f'{p}/words.json'));lines=[l.strip() for l in open(f'{p}/script.txt') if l.strip()]
L={}
for w in W:L.setdefault(w['line'],[]).append(w)
def T(ln,q=0):
    ws=L[ln]
    if isinstance(q,int):return ws[q]['t0']
    for w in ws:
        if q in re.sub(r'[^\w]','',w['w']):return w['t0']
    return ws[0]['t0']
dur={'q1':353.7,'q2':311.12,'q3':309.59,'q4':275.27}[p]
fx=[];kn=[]
F=lambda k,t,db,**o:fx.append(dict(k=k,t=t,db=db,**o))
for i,l in enumerate(lines,1):
    if l.startswith('السؤال'):F('whoosh',T(i)-.4,-22,dur=.8);F('hit',T(i),-18,dur=1.4)
    if l.startswith('شنو بان ليكم'):F('click',T(i,'فولو'),-14);F('ding',T(i,'فولو')+.1,-24,f=1320)
    if l.startswith('الجواب'):F('ding',T(i),-16,f=880)
ex={'q1':[('whoosh',3,0,-26,3),('steps',16,0,-22,2),('hit',18,0,-16,1.5),('whoosh',18,0,-18,1.5),('click',42,'وحليتي',-14,0),('click',47,0,-16,0),('whoosh',54,0,-24,2)],
    'q2':[('click',13,0,-18,0),('steps',70,0,-24,3),('click',83,'سيكارو',-20,0)],
    'q3':[('click',7,'وحليتي',-16,0),('whoosh',51,0,-24,2.5),('steps',60,0,-18,2),('whoosh',67,0,-18,3),('whoosh',69,0,-20,2),('heart',84,0,-12,2)],
    'q4':[('whoosh',6,0,-22,2.5),('whoosh',30,0,-22,3),('hit',34,'الضو',-14,1.5),('click',39,'الساروت',-14,0),('whoosh',66,0,-26,3)]}[p]
for k,ln,q,db,d in ex:
    t=T(ln,q)
    if k in('steps','whoosh','hit','heart'):F(k,t,db,dur=d)
    else:F(k,t,db)
# seagull-like chirps for port scenes: use ding high quick
if p in('q1','q4'):
    for t0 in ([2,3,11] if p=='q1' else [66,68]):
        for j in range(4):F('ding',T(t0)+j*.6,-34,f=2400+j*180)
if p=='q3':
    # light blinks 2-3-2 on rampart
    for ln in (53,54,55):
        n=2 if ln!=54 else 3
        for j in range(n):F('click',T(ln)+j*.4,-24)
ev={"t0":0,"t1":dur,"drone_db":-34,"drone_duck":[],"knocks":kn,"fx":fx,"swells":[]}
json.dump(ev,open(f'ev_{p}.json','w'));print(p,len(fx))
