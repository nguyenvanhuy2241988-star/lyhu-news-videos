import json,sys,re,shutil,os
HERE=os.path.dirname(os.path.abspath(__file__))
d,sc=sys.argv[1],sys.argv[2]
tm=json.load(open(f'{d}/timing.json'));V=[round(s+0.3,3) for s in tm['starts']];TOT=round(tm['total']+2.9,2)
os.makedirs(f'{d}/a',exist_ok=True);shutil.copy(HERE+'/../logo.png',f'{d}/a/logo.png')
lib=open(HERE+'/lib.js').read();ex=open(HERE+'/extras.js').read();s=open(sc).read()
h='''<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;background:#fff}svg{display:block}
text{font-family:'Inter','Inter Display',sans-serif}
</style></head><body>
<svg width="0" height="0" style="position:absolute"><defs><image id="logo" href="a/logo.png" width="826" height="248"/></defs></svg>
<svg id="s" width="1080" height="1920" viewBox="0 0 1080 1920"></svg>
<script>
const V=%s,TOTAL=%s;
const vs=V.map((x,i)=>i==0?0:x+0.22),DUR=TOTAL;
const TEAL='#00ABA9',GREEN='#8DC63F',SLATE='#2B4A52',SOFT='#E6F6F5',GREY='#6B7C80';
'''%(json.dumps(V),TOT)
# lib.js already contains box/truck/pack/draw after frame; place extras and scenes before draw call
open(f'{d}/video.html','w').write(h+s+'\n'+lib+'\n'+ex+'\ndraw(0)\n</script></body></html>')
open(f'{d}/dur.txt','w').write(str(TOT));print(TOT,V)
