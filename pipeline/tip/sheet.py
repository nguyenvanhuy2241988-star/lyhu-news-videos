import sys,glob
from PIL import Image
d=sys.argv[1];fs=sorted(glob.glob(f'{d}/pv_*.png'),key=lambda f:float(f.split('pv_')[1][:-4]))
n=len(fs);cols=7;rows=(n+cols-1)//cols;w,h=270,480
S=Image.new('RGB',(cols*w,rows*h),'white')
for k,f in enumerate(fs):S.paste(Image.open(f).convert('RGB').resize((w,h)),((k%cols)*w,(k//cols)*h))
S.save(f'{d}/sheet.png');print([f.split('pv_')[1][:-4] for f in fs])
