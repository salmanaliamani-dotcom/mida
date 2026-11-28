# Assemble the game: three.js header + the 3D engine from the video project + game logic.
import json,re,os
H=os.path.dirname(os.path.abspath(__file__))
eng=open(os.path.join(H,'../output/project_3d_full/engine3d.js')).read().split('\n')[2:233]  # lines 3..233: renderer, sets, characters, put()
words=open(os.path.join(H,'src/words_p1.json')).read()
game=open(os.path.join(H,'src/game.js')).read().replace('__WORDS__',words)
open(os.path.join(H,'dist/app.js'),'w').write(open(os.path.join(H,'src/head.js')).read()+'\n'.join(eng)+'\n'+game)
open(os.path.join(H,'dist/index.html'),'w').write(open(os.path.join(H,'src/index.html')).read())
# local preview wrapper mimicking the artifact skeleton
open(os.path.join(H,'dist/preview.html'),'w').write('<!doctype html><html lang="ar"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>[hidden]{display:none!important}body{margin:0}</style></head><body>'+open(os.path.join(H,'src/index.html')).read()+'</body></html>')
print('ok',os.path.getsize(os.path.join(H,'dist/app.js')))
