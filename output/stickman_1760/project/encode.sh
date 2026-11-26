i=$1
ffmpeg -v error -y -framerate 30 -i frames$i/%05d.jpg -i voice$i.wav -i sfx$i.wav -filter_complex \
  "[1:a]loudnorm=I=-16:TP=-1.5,aresample=48000,apad[v];[2:a]volume=0.35[s];[v][s]amix=inputs=2:duration=longest:normalize=0,alimiter=limit=0.89[a]" \
  -map 0:v -map "[a]" -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest part$i.mp4
