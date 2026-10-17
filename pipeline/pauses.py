# Dùng: python3 pauses.py chi.wav  -> in các chỗ ngắt (>=0.10 s, dưới -38 dB) để tìm ranh giới câu
import sys,numpy as np,scipy.io.wavfile as w
sr,x=w.read(sys.argv[1]);x=x.astype(float)/32768;h=int(.02*sr)
db=20*np.log10(np.array([np.sqrt(np.mean(x[i:i+h]**2)+1e-12) for i in range(0,len(x)-h,h)]))
low=db<-38;i=0;print('dài',round(len(x)/sr,2))
while i<len(low):
    if low[i]:
        j=i
        while j<len(low) and low[j]:j+=1
        if (j-i)*.02>=.10:print(round(i*.02,2),round(j*.02,2))
        i=j
    else:i+=1
