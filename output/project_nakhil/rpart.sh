# usage: rpart.sh bN dur nproc
cd /tmp/claude-0/-home-user-mida/640edc63-65c4-5bb3-a908-fad39fe185ec/scratchpad/p3d
P=$1;D=$2;N=$3;U=http://localhost:8766/${P}3d.html
for i in $(seq 0 $((N-1))); do a=$(python3 -c "print(round($D*$i/$N/10)*10)"); b=$(python3 -c "print($D if $i==$N-1 else round($D*($i+1)/$N/10)*10)"); node rseg.cjs $U $PWD/seg_$P $a $b > r_${P}_$i.log 2>&1 & done
wait
(for f in $(ls seg_$P/seg_*.mp4 | grep -v tmp | sort); do echo "file '$f'"; done) > list_$P.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i list_$P.txt -c copy ${P}_v.mp4
echo "$P VIDEO $(ffprobe -v error -show_entries format=duration -of csv=p=0 ${P}_v.mp4)"
