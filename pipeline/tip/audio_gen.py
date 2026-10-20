import numpy as np
from scipy.io import wavfile
from scipy.signal import butter,lfilter
import json,sys,os
D=sys.argv[1];os.chdir(D);TM=json.load(open('timing.json'));DUR=float(open('dur.txt').read());SR=44100;N=int(SR*DUR)
VS=[s+0.52 for s in TM['starts']][1:]
rng=np.random.default_rng(5)
bed=np.zeros(N);fx=np.zeros(N)
def add(buf,s,t0):
    i=int(t0*SR); e=min(N,i+len(s))
    if i<N: buf[i:e]+=s[:e-i]
def env(n,a=0.005,r=0.2):
    t=np.arange(n)/SR; return np.minimum(t/a,1)*np.exp(-t/r)
def tone(f,d,a=0.005,r=0.2):
    n=int(d*SR);t=np.arange(n)/SR; return np.sin(2*np.pi*f*t)*env(n,a,r)
def lp(x,fc): b,a=butter(2,fc/(SR/2));return lfilter(b,a,x)
def hp(x,fc): b,a=butter(2,fc/(SR/2),'high');return lfilter(b,a,x)
BPM=108;beat=60/BPM
def kick():
    n=int(0.25*SR);t=np.arange(n)/SR;f=120*np.exp(-t*25)+45
    return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/0.09)
def hat(): return hp(rng.standard_normal(int(0.05*SR)),7000)*env(int(0.05*SR),0.001,0.015)
def clap():
    n=int(0.14*SR);return hp(lp(rng.standard_normal(n),3500),900)*env(n,0.001,0.045)
chords=[[196.0,246.94,293.66],[220.0,261.63,329.63],[174.61,220.0,261.63],[196.0,246.94,293.66]]
roots=[98.0,110.0,87.31,98.0]
nb=int(DUR/beat)+1
for b in range(nb):
    t0=b*beat;bar=(b//4)%4
    if t0<0.5: continue
    if b%4 in(0,2): add(bed,kick()*0.5,t0)
    if b%4 in(1,3): add(bed,clap()*0.2,t0)
    add(bed,hat()*0.11,t0+beat/2);add(bed,hat()*0.06,t0)
    for h in (0,0.5): add(bed,tone(roots[bar]*(1 if h==0 else 2 if (b%2) else 1),beat*0.45,0.005,0.18)*0.2,t0+h*beat)
    for f in chords[bar]: add(bed,tone(f*2,beat*0.4,0.004,0.12)*0.04,t0+beat*0.5)
mel=[392,440,494,587,523,494,440,392]
for b in range(0,nb,2): add(bed,tone(mel[(b//2)%8],beat*0.9,0.01,0.3)*0.045,b*beat)
bed*=np.minimum(np.arange(N)/SR/1.0,1)*np.minimum((N-np.arange(N))/SR/1.2,1)
B=VS
def whoosh(d=0.35):
    n=int(d*SR);x=lfilter(*butter(2,[300/(SR/2),4000/(SR/2)],'band'),rng.standard_normal(n));return x*np.sin(np.pi*np.arange(n)/n)**2
for b in B: add(fx,whoosh()*0.33,b-0.18)
def pop(f=700):
    n=int(0.12*SR);t=np.arange(n)/SR;return np.sin(2*np.pi*np.cumsum(f*np.exp(-t*12)+300)/SR)*np.exp(-t/0.04)
def ding(f=1318): return tone(f,0.5,0.002,0.18)+0.4*np.pad(tone(f*2,0.4,0.002,0.12),(0,int(0.1*SR)))
def crinkle(d=0.5):
    n=int(d*SR);x=hp(rng.standard_normal(n),2500)
    m=(rng.random(n//200+1)>0.35).astype(float);m=np.repeat(m,200)[:n]
    return x*m*np.exp(-np.arange(n)/SR/0.25)
def crunch():
    n=int(0.14*SR);x=hp(lp(rng.standard_normal(n),5500),1200);return x*env(n,0.001,0.04)
for b in VS:
    add(fx,pop()*0.17,b+0.3);add(fx,pop(900)*0.15,b+1.25)
add(fx,ding()*0.08,0.6)
mix=bed*0.9+fx;mix/=max(1,np.abs(mix).max()/0.8)
wavfile.write('bed.wav',SR,(mix*32767).astype(np.int16))
