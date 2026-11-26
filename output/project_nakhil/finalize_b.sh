cd /tmp/claude-0/-home-user-mida/640edc63-65c4-5bb3-a908-fad39fe185ec/scratchpad/p3d
B=../b
done_list=""
while true; do
 for p in b1 b2 b3 b4; do
  case " $done_list " in *" $p "*) continue;; esac
  if grep -q "VIDEO" rp_$p.log 2>/dev/null; then
   ffmpeg -loglevel error -y -i ${p}_v.mp4 -i $B/$p.wav -i $B/sfx_$p.wav -filter_complex "[1:a]volume=2.3,aresample=48000,pan=stereo|c0=c0|c1=c0[v];[2:a]pan=stereo|c0=c0|c1=c0[s];[v][s]amix=inputs=2:normalize=0:duration=first,volume=0.9,alimiter=limit=0.85:attack=0.5:release=40:level=false,aresample=48000[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -movflags +faststart final_$p.mp4
   ffmpeg -loglevel error -y -i final_$p.mp4 -c:v libx264 -preset veryfast -crf 26 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart small_$p.mp4
   echo "$p $(ffprobe -v error -show_entries format=duration,size -of csv=p=0 final_$p.mp4) $(ffprobe -v error -show_entries format=size -of csv=p=0 small_$p.mp4) $(ffmpeg -i small_$p.mp4 -af ebur128 -f null - 2>&1 | grep -E '^\s+I:' | tail -1)"
   done_list="$done_list $p"
  fi
 done
 [ $(echo $done_list | wc -w) -ge 4 ] && break
 sleep 30
done
echo ALLFINAL
