# RUNBOOK: bản tin video FMCG tự động (2 khung/ngày: 06:30 và 19:30 giờ VN)

Người dùng: Nguyễn Văn Huy (LYHU). Đã cho phép TỰ ĐĂNG lên blog lyhu.com.vn/tin-tuc, xem lại sau. Mỗi lần chạy làm đúng MỘT bản tin. Đọc thêm skill `lyhu-ban-tin-video` (thương hiệu, quy tắc nội dung). Nếu mâu thuẫn, RUNBOOK này thắng.

## 0. Chuẩn bị
- `git clone https://github.com/nguyenvanhuy2241988-star/lyhu-news-videos /home/claude/lyhu-news-videos` (nếu chưa có), làm việc trong thư mục tạm riêng `W=<scratchpad>/run`. Cần python3 với playwright, numpy, scipy, pillow, ffmpeg (cài bằng pip --break-system-packages nếu thiếu).
- Ngày giờ: gọi `mcp__claude_ai__current_time`. request_id = `lyhu-video-YYYY-MM-DD-HHMM` (HHMM = 0630 hoặc 1930, ngày theo giờ VN).
- Giới hạn: tối đa 2 bài video/ngày. Kiểm: `select count(*) from blog_posts where request_id like 'lyhu-video-<YYYY-MM-DD>-%'` (Supabase project `wepxcpifgxghfvdgnkeh`). Nếu đã có request_id của khung này thì DỪNG (đã chạy rồi).

## 1. Tìm và kiểm chứng tin
- WebSearch (mode standard, nhiều mảng song song): thống kê/CPI/bán lẻ, siêu thị mini và tạp hóa, thương mại điện tử, chính sách hộ kinh doanh, doanh nghiệp FMCG (Masan, Vinamilk, Saigon Co.op, WinCommerce, Unilever...), nhập hàng/chi phí/giá. Dùng ngày thực tế hôm nay trong truy vấn.
- Chỉ nhận tin có ngày rõ ràng trong 48 giờ gần nhất. Mở bài gốc bằng WebFetch, lấy số liệu, ngày, đơn vị công bố. Ưu tiên nguồn gốc (Cục/Chi cục Thống kê, bộ ngành, doanh nghiệp công bố) và báo chính thống. Không dùng bài vendor/quảng cáo làm nguồn duy nhất.
- Số liệu thống kê khác phát biểu doanh nghiệp: nói rõ ai nói ("theo Saigon Co.op").
- Chống trùng: truy vấn `blog_posts` 30 ngày gần nhất bằng regex ILIKE/`~*` trên title và content cho các số chính và từ khóa (kể cả bài do hệ thống Gemini tự đăng). Trùng sự kiện + trùng số = bỏ, trừ khi có góc/số mới thật sự.
- NẾU KHÔNG CÓ TIN ĐẠT (đủ mới, đã kiểm chứng, không trùng): BỎ KHUNG này. Không đăng bài chống chế. Gửi thông báo "Khung HH:MM: bỏ, không có tin đủ kiểm chứng" và kết thúc.

## 2. Lời bản tin (45–55 giây, 110–150 chữ)
- Mở: "Bản tin ép em xi gi hai mươi bốn trên bảy." (FMCG luôn là "ép em xi gi").
- Ba nhịp: chuyện đã xác nhận → liên quan ai → một việc tự rà soát cụ thể (không hứa lãi, không bán hàng, không số điện thoại, không tư vấn đầu tư/pháp lý).
- Số viết bằng chữ ("mười bảy phẩy hai phần trăm"). Ước tính/dự báo phải nói rõ là ước tính và ghi "Ước tính" trên hình.
- KẾT CỐ ĐỊNH: "Đọc thêm các tin mới nhất về ngành tại lyhu chấm com chấm vn, mục tin tức."
- Mỗi câu ngắn; ghi lại từng câu để căn cảnh.

## 3. Giọng (ElevenLabs)
- `mcp__ElevenLabs__creative_generate_speech`: voice_id `5yEPTrA0uAhZsBEhHjfi` (Chi), model `eleven_v4`, generations_count 1, flow_id `2GU2TcQGrQhyDssHlHpX`, tiền tố `[confident] `. KHÔNG gọi lại để thử lại. Poll `creative_get_flow_run_status` (đợi bằng `sleep` ≤20 s mỗi lần) tới khi xong.
- Tải: `curl -sS -o chi.mp3 "<content_url>"` (storage.googleapis.com truy cập được từ máy chủ). Kiểm file > 100 KB. `ffmpeg -y -i chi.mp3 -ar 44100 -ac 1 chi.wav`.
- Nếu một câu đọc sai (đặc biệt "ép em xi gi"): chỉ tạo lại riêng câu đó và ghép; nếu không sửa được, đăng ở trạng thái draft (xem mục 6).

## 4. Dựng
1. `mkdir -p $W/a; cp pipeline/template_video.html $W/video.html; cp pipeline/logo.png $W/a/logo.png; cp pipeline/template_audio.py $W/audio.py`.
2. `python3 pipeline/pauses.py $W/chi.wav` rồi đối chiếu số chữ mỗi câu để biết ranh giới câu (ước lượng giây = tỷ lệ số chữ × độ dài giọng; chọn chỗ ngắt gần nhất). Bắt đầu câu = hết ngắt + 0,3 s (trễ giọng). Cảnh bắt đầu ~0,15 s trước câu.
3. Sửa `video.html`: `DUR` = độ dài giọng + 0,3 + khoảng 3,0 s kết; mảng `B` (ranh giới cảnh, 9 mốc cho 8 cảnh); `HEAD` (tiêu đề dải xanh mỗi cảnh); viết lại thân hàm `scene()` (cảnh 0 mở "BẢN TIN FMCG 24/7", cảnh cuối "Đọc thêm tin mới nhất về ngành tại lyhu.com.vn, Mục Tin tức" + logo; nhãn ngày `BẢN TIN dd/mm/yyyy` ở `frame()`); mảng dy ở cuối `scene()`. Mẫu hiện tại là bản tin Tết 2027, xem cách làm số chạy, thẻ, danh sách. Màu CHỈ dùng TEAL `#00ABA9`, GREEN `#8DC63F`, SLATE `#2B4A52`, SOFT `#E6F6F5`, GREY `#6B7C80`.
4. Sửa `audio.py`: `DUR`, `B` (ranh giới cảnh sau cảnh 0), danh sách pop/ding (lúc số xuất hiện), rồi `python3 audio.py` (tạo bed.wav trong thư mục hiện hành, chạy trong `$W`).
5. Xem trước: `python3 pipeline/shot.py $W 1.5 8 14 ...` và MỞ ẢNH để kiểm: không chữ tràn khung, số khớp lời đọc, không cảnh trống quá lâu. Sửa nếu lỗi.
6. `python3 pipeline/render.py $W <DUR>` rồi `bash pipeline/mix.sh $W <DUR> $W/out.mp4`. mix.sh tự đo màu (phải lệch ≤4) và in đoạn lặng >0,6 s (phải trống). Lỗi thì sửa, không đăng.
7. Ảnh bìa: `python3 pipeline/shot.py $W <t_của_cảnh_số_chính_khi_đã_chạy_xong>` rồi dùng ảnh đó làm cover.png (1080×1920).

## 5. Đăng lên blog
1. `ID=<request_id>`; `mkdir -p inbox/$ID`; copy `out.mp4` → `inbox/$ID/video.mp4`, cover → `inbox/$ID/cover.png`; viết `inbox/$ID/manifest.json`:
   `{"request_id":ID,"title":"Bản tin FMCG 24/7: <ý chính>","excerpt":"<≤300 ký tự>","category_slug":"tin-tuc-fmcg","status":"published","keywords":"...","content_markdown":"<đoạn 1 = một câu tiêu điểm in đậm>\n\n<các đoạn còn lại = lời bản tin viết bằng chữ số thường>\n\n**Việc nên làm:** ...\n\nĐọc thêm các tin mới nhất về ngành tại mục Tin tức của lyhu.com.vn."}`. Video chèn ngay SAU ĐOẠN ĐẦU của content nên đoạn đầu phải ngắn. Không danh sách nguồn, không số điện thoại. Khung cuối của VIDEO cũng KHÔNG ghi dòng 'Nguồn: ...'; chỉ được nêu ai công bố bằng nhãn ngắn trên thẻ số (ví dụ 'Theo Reuters'). Nếu anh Huy đã giao tin cụ thể trong tin nhắn kích chạy thì BẮT BUỘC làm đúng tin đó; chỉ đổi tin khi nó không kiểm chứng được, và phải ghi rõ lý do vào news_video_runs.reason. `status` = "draft" nếu có bất kỳ kiểm tra nào ở mục 6 chưa đạt.
   Thêm vào manifest 3 trường để trang video hiển thị đúng: `"duration":<giây, làm tròn>`, `"chapters":[{"sec":3,"title":"<ý>"},...]` (4–6 mốc, `sec` = giây thật mà từng cảnh bắt đầu trong video, tiêu đề ≤ 6 từ, mốc đầu ≈ 0–3), `"do_this":"<một câu việc nên làm>"`. Hàm đăng bài tự đổi `chapters` thành mốc tua video trên web. KHÔNG tự đặt `is_fb_shared`/`is_lyhu_fb_shared`; để tác vụ Facebook của web tự xử lý.
2. `git add -A; git commit; git pull --rebase origin main; git push origin main`; lấy `git rev-parse HEAD` (40 ký tự).
3. Gọi hàm Edge qua cơ sở dữ liệu (máy chủ không gọi thẳng được Supabase): `select net.http_post(url:='https://wepxcpifgxghfvdgnkeh.supabase.co/functions/v1/publish-news-video', headers:='{"Content-Type":"application/json"}'::jsonb, body:=jsonb_build_object('request_id','<ID>','ref','<SHA>'), timeout_milliseconds:=60000);` rồi đọc `select status_code, content::text, error_msg from net._http_response where id=<id trả về>;` (đợi 10–20 s). Mã 200 kèm `article_url` là xong; `already_exists` cũng coi là xong. Lỗi 4xx/5xx: đọc thông báo, sửa nguyên nhân, KHÔNG tạo request_id mới trừ khi bài chưa hề được tạo (kiểm `blog_posts`).
4. Kiểm: `select id,status,published_at,video_url,thumbnail_url from blog_posts where request_id='<ID>'`. Mở `article_url` bằng WebFetch nếu truy cập được và thấy tiêu đề.
- Facebook: site tự có tác vụ chia sẻ bài mới lên Facebook (8h, 17h). Người dùng đã chọn để tác vụ đó tự xử lý, không đụng `is_fb_shared`.
- Gỡ bài sai: `update blog_posts set status='draft', published_at=null where request_id='<ID>'` và báo người dùng.

## 6. Cổng chất lượng (tất cả phải đạt mới để status=published, nếu không thì draft + báo)
- Mọi số liệu trên hình và trong lời khớp nguồn đã mở. Đã nói rõ ai công bố.
- Giọng đọc đúng "ép em xi gi" ở câu mở và đọc đủ lời; độ dài video = giọng + đoạn kết; không lặng >0,6 s; màu lệch ≤4; không chữ tràn khung.
- Không trùng bài đã đăng; ngày tin trong 48 giờ.

## 7. Báo kết quả và nhật ký (BẮT BUỘC)
- ĐẦU mỗi lần chạy (ngay sau khi đọc RUNBOOK): `insert into news_video_runs(slot) values ('<0630|1930>') returning id;` rồi nhớ `id`.
- Dù đăng, nháp, bỏ khung hay lỗi, trước khi kết thúc PHẢI cập nhật dòng đó: `update news_video_runs set finished_at=now(), outcome='<published|draft|skipped|failed>', reason='<lý do một câu; nếu bỏ khung ghi rõ từng tin bị loại vì sao: quá 48 giờ, chưa kiểm chứng được, trùng bài nào>', request_id='<ID hoặc null>', article_url='<URL hoặc null>', candidates='<json các tin đã xét: tiêu đề, ngày, lý do loại/chọn>'::jsonb where id=<id>;`
- Nếu một bước hỏng (ví dụ không clone được kho, không tải được giọng), vẫn ghi `failed` kèm thông báo lỗi nguyên văn rồi kết thúc, không im lặng.
- Cuối mỗi lần chạy, kết quả một dòng: khung giờ, tiêu đề, trạng thái (published/draft/bỏ khung) và `article_url`. Nếu thông báo đẩy khả dụng, gửi cùng nội dung.
