import json
W=json.load(open('words.json'))
h=open('proj/head.part').read();b=open('proj/full.body.html').read();sh=open('proj/shots.part.js').read()
b=b.replace('/*SHOTS*/',sh).replace('/*ENV*/',open('proj/env_full.json').read()).replace('/*WORDS*/',json.dumps(W,ensure_ascii=False))
open('proj/full.html','w').write(h+b)
