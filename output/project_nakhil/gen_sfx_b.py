import json,re,sys
p=sys.argv[1];t1=float(sys.argv[2]);W=json.load(open(f'{p}/words.json'));lines=[l.strip() for l in open(f'{p}/script.txt') if l.strip()]
L={}
for w in W:L.setdefault(w['line'],[]).append(w)
def T(ln,q=0):
    ws=L[ln]
    if isinstance(q,int):return ws[q]['t0']
    for w in ws:
        if q in re.sub(r'[^\w]','',w['w']):return w['t0']
    return ws[0]['t0']
def TE(ln):return L[ln][-1]['t1']
fx=[];F=lambda k,t,db,**o:fx.append(dict(k=k,t=t,db=db,**o))
for i,l in enumerate(lines,1):
    if l.startswith('السؤال'):F('whoosh',T(i)-.4,-24,dur=.8);F('hit',T(i),-20,dur=1.4)
    if l.startswith('شنو بان ليكم') or l.startswith('شنو حسيتو'):F('click',T(i,'فولو'),-16);F('ding',T(i,'فولو')+.1,-26,f=1320)
    if l.startswith('الجواب'):F('ding',T(i),-18,f=880)
E=[]  # (kind, line, word, db, dur, extra)
if p=='b1':
    F('city',0,-26,dur=T(2,'ومصعد')-.1);F('car',0.6,-22,dur=4.5);F('whoosh',T(2,'طناش')-.3,-28,dur=1.2)
    for j in range(12):F('click',T(2,'طناش')-.1+j*.09,-30)
    F('hum',T(2,'ومصعد')-.1,-30,dur=T(3)-T(2,'ومصعد')+.1);F('rattle',T(2,'كيصوني')-.1,-18,dur=1.9)
    F('city',T(3)-.05,-28,dur=T(4)-T(3));F('whoosh',T(3,'فالطابق')-.1,-24,dur=.9);F('ding',T(3,'التاسع'),-26,f=1320)
    F('steps',T(4)+.05,-24,dur=2.0);F('steps',T(4,'البواب')+.05,-26,dur=1.6);F('steps',T(4,'عاونك')-.1,-22,dur=2.2)
    F('jingle',T(5,'حلقة')-.1,-18,dur=1.6)
    E=[('whoosh',11,0,-24,1.4),('city',12,0,-30,4.5),('steps',12,0,-26,3.5),('ding',15,0,-24,0),('creak',15,0,-28,1.5),('click',16,'ضغطتي',-14,0),('hum',17,0,-26,15),
       ('buzz',21,'طفات',-22,.6),('rattle',22,0,-22,2.2),('hit',23,0,-16,1.2),('creak',24,0,-20,2.4),('drone',25,0,-30,6),('whoosh',26,'الدخان',-26,2),('steps',29,0,-24,4.5),('heart',30,0,-18,3),
       ('screech',31,0,-24,1.5),('whoosh',31,'وهبط',-18,1.6),('steps',35,0,-26,2),('knock',43,'فوجهك',-12,0),('hit',43,'فوجهك',-20,1),('jingle',44,'حلقة',-22,1.2),('city',53,0,-28,6),
       ('knock',66,'دقات',-16,0),('knock',66,'دقات',-16,0),('hum',77,0,-30,4),('creak',79,'تحرك',-22,2),('hum',81,0,-28,6),('ticks',83,0,-26,1.6),('whoosh',85,0,-24,2),('ding',86,0,-22,0),('creak',86,'والباب',-22,1.6),('whoosh',88,0,-26,2)]
    for j,w in enumerate(['واحد','جوج','ثلاثة']):F('ding',T(17,w),-30,f=1760)
    for w in ['ستة','سبعة','تمنية','تسعة']:F('ding',T(18,w),-30,f=1760)
    for w in ['عشرة','حداش','طناش']:F('ding',T(20,w),-28,f=1980)
    F('knock',T(66,'دقات')+.35,-16)
if p=='b2':
    E=[('hit',6,'خرج',-24,1),('steps',7,0,-26,2.2),('steps',8,0,-26,2.4),('creak',11,0,-22,1.6),('whoosh',11,'وخرج',-28,.8),('whoosh',18,'ورقة',-28,.8),('fire',25,0,-22,5),('fire',27,0,-24,3),
       ('click',40,'قفل',-20,0),('click',41,'حطيتي',-16,0),('ding',41,'كيطلع',-26,0),('ticks',49,0,-28,1.2),('creak',50,0,-22,1.4),('steps',51,0,-28,1.5),('steps',53,0,-28,1.8),('steps',54,0,-26,1.9),('ding',54,0,-26,0),
       ('click',55,'ويدخل',-18,0),('hum',56,0,-24,2),('steps',57,0,-20,10),('breathe',58,0,-22,6),('creak',61,'سمعتي',-22,1.6),('creak',64,0,-24,1.4),('drone',66,0,-28,8),('whoosh',70,'الدخان',-26,2),('heart',71,0,-14,2.5)]
if p=='b3':
    E=[('steps',2,0,-28,3.6),('drone',3,0,-30,30),('fire',9,0,-32,3),('steps',10,0,-28,1.4),('fire',13,0,-34,20),('ring',19,'صونا',-16,2.6),('hit',20,'قنبلة',-16,1.2),('click',22,'طفيتيه',-14,0),('steps',24,0,-22,4.4),('heart',25,0,-16,2.4),
       ('creak',29,0,-20,1.6),('steps',30,0,-26,2),('breathe',33,0,-22,1.4),('heart',34,0,-14,3.2),('creak',43,'وسد',-22,1.6),('steps',44,0,-28,2.6),('knock',54,'دقيتي',-14,0),('knock',54,'دقيتي',-14,0),('creak',55,0,-22,1.2),
       ('ding',60,'الأتاي',-30,0),('fire',66,0,-26,3),('fire',67,0,-20,3.5)]
    F('knock',T(54,'دقيتي')+.35,-14)
if p=='b4':
    E=[('fire',2,0,-20,5.6),('steps',2,0,-22,5),('click',3,'وضغط',-14,0),('fire',4,0,-28,4),('creak',5,'تسد',-20,2),('whoosh',6,0,-24,1.6),('steps',20,'جات',-22,2),('whoosh',23,0,-26,.8),('ding',24,0,-28,0),
       ('fire',30,'وجرى',-24,3),('steps',30,'وجرى',-22,3),('hum',33,0,-30,8),('click',37,'وحط',-14,0),('hum',38,0,-24,2),('steps',39,0,-26,5),('whoosh',42,0,-28,.8),('ding',54,'وحطو',-24,0),('ding',55,'الزر',-22,0),('ding',59,0,-24,0)]
for k,ln,q,dbv,d in E:
    t=T(ln,q)
    if k in('steps','whoosh','hit','heart','city','hum','rattle','creak','fire','drone','breathe','screech','buzz','ticks','ring','car','jingle'):F(k,t,dbv,dur=d)
    else:F(k,t,dbv)
ev={"t0":0,"t1":t1,"drone_db":-38,"drone_duck":[],"knocks":[],"fx":fx,"swells":[]}
json.dump(ev,open(f'ev_{p}.json','w'));print(p,len(fx))
