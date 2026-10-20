# Video mẹo bán lẻ 9:16 (TikTok) – cách dựng "từng câu một hình"
1. Viết 10–15 câu ngắn (mỗi câu một ý, có thẻ giọng [friendly]/[curious]/[emphatic]/[confident]/[warm]/[excited]). Tên thương hiệu viết "Ly Hu".
2. Tạo giọng MỖI CÂU một lần (creative_generate_speech, Chi, eleven_v4, 1 bản), đọc trạng thái, rồi `python3 assemble.py <file json trạng thái> <thư mục ra> '<danh sách đầu câu theo thứ tự>'` để cắt lặng, ghép, và lấy mốc thời gian (timing.json).
3. Mỗi câu = một cảnh; thời điểm cảnh = mốc câu + 0,22 s. Xem scenes2.js/scenes3.js làm mẫu; lib.js là bộ hàm vẽ và chuyển động (pop, sl, bubble, tag, box, truck, pack…).
4. Phụ đề ở dải dưới = đúng lời đọc. Dựng bằng pipeline/render.py + mix.sh như bản tin.

## Cập nhật 20/10
- Mẫu mới đã duyệt: `mau_quen_tui.js`, `mau_quet_sai_ma.js`, `mau_ban_giao.js` (SUB + scene). `extras.js` thêm bag, barcode, ban, note, clock, typed, closing.
- Chạy tự động trên đám mây theo `pipeline/TIP_RUNBOOK.md`; `build.py` (ra video.html + dur.txt), `audio_gen.py`, `run_tip.sh`, `sheet.py` (tấm xem trước).
