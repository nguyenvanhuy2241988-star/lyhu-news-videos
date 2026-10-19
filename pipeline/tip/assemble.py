import json,subprocess,wave,numpy as np,sys,os
src,outdir,order=sys.argv[1],sys.argv[2],json.loads(sys.argv[3])
os.makedirs(outdir,exist_ok=True)
d=json.load(open(src));gs=d['generations']
bym={g['prompt'][:200]:g for g in gs}
sr=44100;clips=[]
for i,key in enumerate(order,1):
    g=[x for x in gs if x['prompt'].startswith(key[:60])]
    assert len(g)>=1 and g[0]['status']=='completed',(key,len(g))
    g=g[0]
    subprocess.run(['curl','-sS','-o',f'{outdir}/b{i:02d}.mp3',g['content_url']],check=True)
    subprocess.run(['ffmpeg','-v','error','-y','-i',f'{outdir}/b{i:02d}.mp3','-ar',str(sr),'-ac','1',f'{outdir}/b{i:02d}.wav'],check=True)
    w=wave.open(f'{outdir}/b{i:02d}.wav');a=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float32)
    idx=np.where(np.abs(a)>300)[0];s=max(0,idx[0]-int(0.03*sr));e=min(len(a),idx[-1]+int(0.08*sr));clips.append(a[s:e])
gap=int(0.16*sr);out=[];starts=[];t=0.0
for k,c in enumerate(clips):
    starts.append(round(t,3));out.append(c);gp=gap if k<len(clips)-1 else 0
    out.append(np.zeros(gp,dtype=np.float32));t+=(len(c)+gp)/sr
y=np.concatenate(out)
w=wave.open(f'{outdir}/voice_all.wav','w');w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(np.clip(y,-32768,32767).astype(np.int16).tobytes());w.close()
subprocess.run(['ffmpeg','-v','error','-y','-i',f'{outdir}/voice_all.wav','-c:a','libmp3lame','-q:a','2',f'{outdir}/chi.mp3'],check=True)
ends=[round(s+len(c)/sr,3) for s,c in zip(starts,clips)]
json.dump({'starts':starts,'ends':ends,'total':len(y)/sr},open(f'{outdir}/timing.json','w'))
print(starts,ends,len(y)/sr)
