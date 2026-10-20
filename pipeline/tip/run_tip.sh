#!/bin/bash
# run_tip.sh <thư_mục_làm_việc> <tên_mp4_ra> : tạo nhạc nền+SFX, render, trộn tiếng.
# Cần trong thư mục: timing.json, chi.mp3 (từ assemble.py), video.html (từ build.py), dur.txt.
set -e; P=$(cd "$(dirname "$0")/.." && pwd); D=$(cd "$1" && pwd); DUR=$(cat $D/dur.txt)
python3 -I $P/tip/audio_gen.py $D
python3 -I $P/render.py $D $DUR      # ~10-20 phút cho video 60 s: chạy nền (run_in_background, timeout dài)
bash $P/mix.sh $D $DUR $2
