# Dùng: python3 shot.py <thư_mục> t1 t2 ...  -> pv_<t>.png (xem trước các khung)
import sys,os
from playwright.sync_api import sync_playwright
D=os.path.abspath(sys.argv[1])
with sync_playwright() as p:
    b=p.chromium.launch(args=['--allow-file-access-from-files']);pg=b.new_page(viewport={'width':1080,'height':1920})
    pg.goto('file://'+D+'/video.html');pg.wait_for_timeout(600)
    for t in sys.argv[2:]:
        pg.evaluate(f"draw({t})");pg.screenshot(path=f'{D}/pv_{t}.png')
    b.close()
