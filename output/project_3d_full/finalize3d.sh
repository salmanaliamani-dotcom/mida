cd /tmp/claude-0/-home-user-mida/640edc63-65c4-5bb3-a908-fad39fe185ec/scratchpad/p3d
while [ $(grep -l -E "^done|ERR" q1_3d.log q2_3d.log q3_3d.log q4_3d.log 2>/dev/null | wc -l) -lt 4 ]; do sleep 30; done
for p in q1 q2 q3 q4; do
 ffmpeg -loglevel error -y -i ${p}_3d.mp4 -i /tmp/claude-0/-home-user-mida/640edc63-65c4-5bb3-a908-fad39fe185ec/scratchpad/m/$p.wav -i /tmp/claude-0/-home-user-mida/640edc63-65c4-5bb3-a908-fad39fe185ec/scratchpad/m/sfx_$p.wav -filter_complex "[1:a]aresample=48000,pan=stereo|c0=c0|c1=c0[v];[2:a]pan=stereo|c0=c0|c1=c0[s];[v][s]amix=inputs=2:normalize=0:duration=first,volume=0.85,alimiter=limit=0.8:attack=0.5:release=40:level=false,aresample=48000[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -movflags +faststart final3d_$p.mp4
 ffmpeg -loglevel error -y -i final3d_$p.mp4 -c:v libx264 -preset veryfast -crf 26 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart small3d_$p.mp4
 echo $p $(ffprobe -v error -show_entries format=duration,size -of csv=p=0 final3d_$p.mp4) $(ffprobe -v error -show_entries format=size -of csv=p=0 small3d_$p.mp4); ffmpeg -v error -i small3d_$p.mp4 -f null - 2>&1 | head -1
done
grep -h ERR q*_3d.log | head
echo FINALIZED
