# Dùng: python3 render.py <thư_mục_làm_việc> <DUR_giây>   (thư mục có video.html và a/logo.png)
import subprocess,sys,os
from playwright.sync_api import sync_playwright
D=os.path.abspath(sys.argv[1]);DUR=float(sys.argv[2]);FPS=30;N=int(FPS*DUR)
ff=subprocess.Popen(['ffmpeg','-y','-f','image2pipe','-framerate',str(FPS),'-c:v','png','-i','-','-vf','scale=out_color_matrix=bt709:out_range=tv,format=yuv420p','-c:v','libx264','-crf','18','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-color_range','tv','-movflags','+faststart',D+'/video.mp4'],stdin=subprocess.PIPE,stderr=subprocess.DEVNULL)
with sync_playwright() as p:
    b=p.chromium.launch(args=['--allow-file-access-from-files'])
    pg=b.new_page(viewport={'width':1080,'height':1920}); pg.goto('file://'+D+'/video.html'); pg.wait_for_timeout(800)
    for i in range(N):
        pg.evaluate(f"draw({i/FPS})"); ff.stdin.write(pg.screenshot(type='png'))
    b.close()
ff.stdin.close(); ff.wait()
