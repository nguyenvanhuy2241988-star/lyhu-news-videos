#!/bin/bash
# Dùng: bash mix.sh <thư_mục> <DUR> <tên_tệp_ra>   (thư mục có video.mp4, chi.mp3, bed.wav)
set -e; cd "$1"; DUR=$2; OUT=$3
ffmpeg -v error -y -i chi.mp3 -af "adelay=300|300" -ar 44100 voice.wav
ffmpeg -v error -y -i video.mp4 -i voice.wav -i bed.wav -filter_complex "[1:a]aresample=44100,aformat=channel_layouts=stereo,highpass=f=80,acompressor,volume=1.5,apad,asplit[v1][v2];[2:a]aresample=44100,aformat=channel_layouts=stereo,volume=0.7[bd];[bd][v2]sidechaincompress=threshold=0.03:ratio=8:attack=5:release=250[duck];[v1][duck]amix=inputs=2:normalize=0,alimiter=limit=0.89[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -t $DUR "$OUT"
ffmpeg -v error -y -ss 25 -i "$OUT" -frames:v 1 -vf "scale=in_color_matrix=bt709:in_range=tv:out_range=pc,format=rgb24" _f.png
python3 - <<'P'
from PIL import Image
im=Image.open('_f.png').convert('RGB');t=im.getpixel((1050,1750));g=im.getpixel((100,1910))
d=lambda a,b:max(abs(x-y) for x,y in zip(a,b))
print('teal',t,'lệch',d(t,(0,171,169)),'| xanh lá',g,'lệch',d(g,(141,198,63)))
assert d(t,(0,171,169))<=4 and d(g,(141,198,63))<=4,'MÀU LỆCH'
P
echo "--- đoạn lặng >0.6s (phải trống) ---"; ffmpeg -v info -i "$OUT" -af silencedetect=n=-45dB:d=0.6 -f null - 2>&1 | grep silence_ || true
