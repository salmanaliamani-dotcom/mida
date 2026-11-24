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
dur={'p1':386.52,'p2':428.96,'p3':358.88}[p]
fx=[];kn=[]
F=lambda k,t,db,**o:fx.append(dict(k=k,t=t,db=db,**o))
for i,l in enumerate(lines,1):
    if l.startswith('السؤال'):F('whoosh',T(i)-.4,-22,dur=.8);F('hit',T(i),-18,dur=1.4)
    if l.startswith('جاوب فالتعليق'):F('click',T(i,'متابعة'),-14);F('ding',T(i,'متابعة')+.1,-24,f=1320)
    if l.startswith('الجواب'):F('ding',T(i),-16,f=880)
ex={'p1':[('hit',4,'غوات',-14),('steps',5,0,-24),('click',9,'حليتوه',-16),('whoosh',12,'والبرد',-22),('whoosh',31,'ودفعتيه',-22),('fire',73,0,-26),('fire',80,0,-26)],
    'p2':[('steps',4,0,-24),('whoosh',10,'حليتي',-20),('click',37,'تصاور',-14),('click',38,0,-14),('steps',92,'خطوات',-20),('click',82,0,-24)],
    'p3':[('steps',54,'خطوات',-20),('click',59,'الضو',-12),('hit',61,'تخلع',-18),('click',32,'تك',-10),('fire',90,0,-26),('bell',100,'رجعات',-14),('bell',100,'كتدق',-16)]}[p]
for k,ln,q,db in ex:
    t=T(ln,q)
    if k in('steps','fire'):F(k,t,db,dur=3.0)
    elif k=='whoosh':F(k,t,db,dur=1.2)
    elif k=='hit':F(k,t,db,dur=1.5)
    else:F(k,t,db)
if p=='p3':
    for k in [T(74,'ثلاث'),T(74,'ثلاث')+.25,T(74,'مرات')]:kn.append(dict(t=k,db=-8,dull=.5,glass=0))
    for k in [T(76,'ثلاث'),T(76,'ثلاث')+.25,T(76,'ضربات')]:kn.append(dict(t=k,db=-11,dull=.6,glass=0))
ev={"t0":0,"t1":dur,"drone_db":-34,"drone_duck":[],"knocks":kn,"fx":fx,"swells":[]}
json.dump(ev,open(f'ev_{p}.json','w'))
print(p,len(fx),len(kn))
