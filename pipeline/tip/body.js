const TEAL='#00ABA9',GREEN='#8DC63F',SLATE='#2B4A52',SOFT='#E6F6F5',GREY='#6B7C80';
const vs=V.map((x,i)=>i==0?0:x+0.22), DUR=TOTAL;
const SUB=[['Mẹo bán lẻ LYHU'],['Khách hỏi: gói này','bao nhiêu em?'],['Người ở quầy quay vào hỏi.','Người trong kho lại gọi chủ tiệm.'],['Khách thì đứng chờ.','Càng đông, càng rối!'],['Lỗi không phải do nhân viên chậm.','Lỗi là chưa có một chỗ tra giá chung.'],['Chọn một bảng giá chính.','Cả tiệm chỉ tra ở đó.'],['Mỗi món, ghi đủ năm thứ.'],['Tên món. Vị. Quy cách.'],['Đơn vị bán. Và giá hiện hành.'],['Giá trên kệ khác giá ở quầy?'],['Báo ngay người phụ trách.'],['Đừng âm thầm chọn','một giá rồi tính!'],['Khách đang chờ thì nói: “Anh chị chờ em','kiểm lại một chút, em không muốn','báo nhầm giá.”'],['Thử ngay trước ca tới:','mười món hay bị hỏi giá nhất!'],['Đọc thêm tin mới nhất tại','lyhu.com.vn, mục Tin tức']];
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const eo=x=>1-Math.pow(1-clamp(x),3);
const ebk=x=>{x=clamp(x);const c=1.9,d=c+1;return 1+d*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
function tx(x,y,s,size,wt,fill,anchor='middle',op=1){return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${wt}" fill="${fill}" text-anchor="${anchor}" opacity="${op}">${s}</text>`}
function rr(x,y,w,h,r,fill,op=1,extra=''){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" opacity="${op}" ${extra}/>`}
function pop(lt,d,cx,cy,inner,dur=0.55){const p=clamp((lt-d)/dur);if(p<=0)return '';const s=ebk(p);return `<g opacity="${clamp(p*5)}" transform="translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})">${inner}</g>`}
function sl(lt,d,dx,dy,inner,dur=0.5){const p=clamp((lt-d)/dur);if(p<=0)return '';const e=eo(p);return `<g opacity="${clamp(p*4)}" transform="translate(${(1-e)*dx} ${(1-e)*dy})">${inner}</g>`}
function mark(cx,cy,s,fill,op){const r=(dx,dy,rot)=>`<rect x="${-110*s}" y="${-55*s}" width="${220*s}" height="${110*s}" fill="${fill}" opacity="${op}" transform="translate(${cx+dx*s} ${cy+dy*s}) rotate(${rot})"/>`;return r(-95,-95,45)+r(95,-35,45)+r(95,95,45)+r(-95,35,45)}
function pill(cx,y,t,size,fill,col){const w=t.length*size*0.56+80,h=size*1.9;return rr(cx-w/2,y-h/2,w,h,h/2,fill)+tx(cx,y+size*0.35,t,size,800,col)}
function person(cx,cy,s,fill){return `<g transform="translate(${cx} ${cy}) scale(${s})"><circle cx="0" cy="-62" r="40" fill="${fill}"/><path d="M-78 70 Q-78 4 0 4 Q78 4 78 70Z" fill="${fill}"/></g>`}
function check(cx,cy,s,col){return `<path d="M${cx-22*s} ${cy} L${cx-6*s} ${cy+16*s} L${cx+24*s} ${cy-18*s}" fill="none" stroke="${col}" stroke-width="${9*s}" stroke-linecap="round" stroke-linejoin="round"/>`}
function bubble(x,y,w,h,fill,tailX,flip){const ty=y+h;return rr(x,y,w,h,56,fill)+`<polygon points="${tailX-30},${ty-6} ${tailX+(flip?-40:40)},${ty+60} ${tailX+30},${ty-6}" fill="${fill}"/>`}
function tag(cx,cy,w,h,fill){return `<g transform="translate(${cx} ${cy})"><path d="M${-w/2} ${-h/2+30} Q${-w/2} ${-h/2} ${-w/2+30} ${-h/2} L${w/2-100} ${-h/2} L${w/2} 0 L${w/2-100} ${h/2} L${-w/2+30} ${h/2} Q${-w/2} ${h/2} ${-w/2} ${h/2-30}Z" fill="${fill}"/><circle cx="${w/2-70}" cy="0" r="16" fill="#fff"/></g>`}
function frame(i,t,lt){
 let g=rr(0,0,1080,1920,0,'#fff')+mark(1000+Math.sin(t*0.6)*18,330,1.5,TEAL,0.07)+mark(60+Math.cos(t*0.5)*14,1450,1.2,GREEN,0.10);
 g+=rr(0,0,1080,170,0,SOFT)+`<g transform="translate(50 52) scale(0.26)"><use href="#logo"/></g>`;
 g+=rr(700,56,330,58,29,TEAL)+tx(865,96,'MẸO BÁN LẺ',30,800,'#fff');
 if(i<14){
  g+=rr(0,1630,1080,270,0,TEAL)+rr(0,1630,18,270,0,GREEN);
  const L=SUB[i],n=L.length,mx=Math.max(...L.map(s=>s.length)),sz=n>2?44:(mx>30?48:56),lh=sz*1.25,y0=1630+135-(n-1)*lh/2+sz*0.33;
  const p=clamp(lt/0.25);
  L.forEach((s,k)=>{g+=tx(70,y0+k*lh+(1-eo(p))*20,s,sz,800,'#fff','start',eo(p))});
 }
 return g}
function scene(i,t){
 const lt=t-vs[i];let g=frame(i,t,lt),c='';
 const f1=Math.round;
 if(i==0){
  c+=sl(lt,0.05,-500,0,tx(540,760,'MẸO BÁN LẺ',130,900,SLATE));
  c+=pop(lt,0.5,540,960,tx(540,960,'LYHU',230,900,TEAL));
  c+=pop(lt,1.0,540,1260,`<g transform="rotate(${Math.sin(lt*6)*6} 540 1260)">${tag(540,1260,420,230,GREEN)}${tx(500,1285,'GIÁ',90,900,SLATE)}</g>`);
 }
 if(i==1){
  c+=pop(lt,0.0,250,560,person(250,560,2.2,TEAL));
  c+=pop(lt,0.35,620,520,bubble(330,330,640,330,SOFT,420,true)+tx(650,490,'Gói này',74,900,SLATE)+tx(650,585,'bao nhiêu em?',74,900,TEAL));
  const pu=1+Math.sin(lt*9)*0.04;
  c+=pop(lt,1.1,540,1180,`<g transform="translate(540 1180) scale(${pu}) translate(-540 -1180)">${tag(540,1180,520,300,TEAL)}${tx(470,1215,'?',170,900,'#fff')}</g>`);
 }
 if(i==2){
  const N=[[300,500,'QUẦY',0.0],[300,860,'KHO',0.8],[300,1220,'CHỦ TIỆM',2.0]];
  c+=`<line x1="300" y1="590" x2="300" y2="770" stroke="${TEAL}" stroke-width="10" stroke-dasharray="4 22" stroke-linecap="round" opacity="${clamp((lt-0.6)*3)}"/><line x1="300" y1="950" x2="300" y2="1130" stroke="${TEAL}" stroke-width="10" stroke-dasharray="4 22" stroke-linecap="round" opacity="${clamp((lt-1.8)*3)}"/>`;
  N.forEach(n=>{c+=pop(lt,n[3],n[0],n[1],`<circle cx="${n[0]}" cy="${n[1]}" r="95" fill="${SOFT}" stroke="${TEAL}" stroke-width="10"/>`+person(n[0],n[1]+20,0.9,TEAL)+tx(470,n[1]+25,n[2],72,900,SLATE,'start'))});
  let by=null;if(lt>0.9&&lt<1.9)by=500+(860-500)*eo((lt-0.9)/0.9);else if(lt>2.2&&lt<3.3)by=860+(1220-860)*eo((lt-2.2)/0.9);
  if(by!==null)c+=`<circle cx="300" cy="${by}" r="46" fill="${GREEN}"/>`+tx(300,by+20,'?',62,900,SLATE);
 }
 if(i==3){
  const ang=lt*420;
  c+=pop(lt,0,540,520,`<circle cx="540" cy="520" r="190" fill="${SOFT}" stroke="${TEAL}" stroke-width="16"/><line x1="540" y1="520" x2="${540+Math.sin(ang*Math.PI/180)*140}" y2="${520-Math.cos(ang*Math.PI/180)*140}" stroke="${SLATE}" stroke-width="16" stroke-linecap="round"/><circle cx="540" cy="520" r="18" fill="${SLATE}"/>`);
  for(let k=0;k<7;k++){const d=0.15+k*0.3;c+=pop(lt,d,100+k*145,1020,person(100+k*145,1040,0.95,k%2?SLATE:TEAL),0.4)}
  const sh=lt>1.6?Math.sin(lt*40)*8:0;
  c+=pop(lt,1.6,540,1380,`<g transform="translate(${sh} 0)">${pill(540,1380,'RỐI!',130,SLATE,'#fff')}</g>`);
 }
 if(i==4){
  c+=pop(lt,0.1,540,520,rr(110,380,860,260,50,SOFT)+tx(540,540,'Nhân viên chậm',76,900,SLATE,'middle',lt>1.5?0.45:1));
  const w=860*eo((lt-1.4)/0.45);
  if(lt>1.4)c+=rr(110,500,w,22,11,TEAL)+(lt>1.9?pop(lt,1.9,860,420,`<circle cx="860" cy="420" r="62" fill="${TEAL}"/>`+tx(860,452,'✕',80,900,'#fff')):'');
  c+=pop(lt,2.7,540,960,rr(110,740,860,500,56,TEAL)+tx(540,850,'Cả tiệm chưa có',60,800,'#E6F6F5')+tx(540,985,'MỘT CHỖ TRA',104,900,'#fff')+tx(540,1105,'GIÁ CHUNG',104,900,'#fff'));
 }
 if(i==5){
  c+=sl(lt,0.0,0,-60,tx(540,360,'Chọn MỘT',90,900,SLATE)+tx(540,460,'bảng giá chính',90,900,TEAL));
  c+=pop(lt,0.5,540,830,rr(210,560,660,560,40,'#fff','1','stroke="'+TEAL+'" stroke-width="12"')+rr(210,560,660,110,40,TEAL)+tx(540,635,'BẢNG GIÁ',64,900,'#fff')+[0,1,2,3].map(k=>rr(260,710+k*100,560,60,30,SOFT)).join(''));
  const pu=1+Math.sin(lt*8)*0.05;
  c+=pop(lt,0.9,800,560,`<g transform="translate(800 560) scale(${pu}) translate(-800 -560)"><circle cx="800" cy="560" r="86" fill="${GREEN}"/>${tx(800,598,'1',120,900,SLATE)}</g>`);
  [240,540,840].forEach((x,k)=>{const d=2.4+k*0.25;c+=pop(lt,d,x,1380,person(x,1400,0.95,SLATE),0.4);if(lt>d+0.2)c+=`<path d="M${x} ${1280} L${x} ${1190}" stroke="${GREEN}" stroke-width="12" stroke-linecap="round" opacity="${clamp((lt-d-0.2)*3)}"/>`});
 }
 if(i>=6&&i<=8){
  const t6=vs[6],t7=vs[7],t8=vs[8];
  const R=[['Tên món',t7+0.1],['Vị',t7+0.95],['Quy cách',t7+1.65],['Đơn vị bán',t8+0.15],['Giá hiện hành',t8+1.15]];
  c+=sl(t-t6,0,0,-60,tx(540,360,'Mỗi món ghi đủ',80,900,SLATE));
  const n5=Math.min(5,Math.max(0,Math.floor((t-t6)/0.18)));
  c+=pop(t-t6,0.1,800,520,`<circle cx="800" cy="520" r="0" fill="${TEAL}"/>`);
  c+=pop(t-t6,0.3,540,520,`<g>${tx(540,590,'5 THỨ',150,900,TEAL)}</g>`);
  R.forEach((r,k)=>{const y=700+k*165,on=t>=r[1],p=clamp((t-r[1])/0.5);
   const last=k==4;
   if(t-t6>0.3+k*0.14){
    if(!on)c+=`<g opacity="${clamp((t-t6-0.3-k*0.14)*4)}">${rr(120,y,840,125,40,'#fff',1,'stroke="'+TEAL+'" stroke-width="5" stroke-dasharray="16 14"')}${tx(190,y+82,String(k+1),56,900,GREY,'middle',0.5)}</g>`;
    else c+=pop(t,r[1],540,y+62,rr(120,y,840,125,40,last?TEAL:SOFT)+rr(120,y,22,125,11,GREEN)+tx(250,y+84,String(k+1),60,900,last?'#fff':TEAL,'middle')+tx(330,y+84,r[0],64,900,last?'#fff':SLATE,'start')+(p>0.7?check(900,y+62,1.2,last?'#fff':GREEN):''),0.45)
   }});
 }
 if(i==9){
  const sh=lt>1.0?Math.sin(lt*30)*6:0;
  c+=pop(lt,0.1,300,720,tag(300,720,440,300,SOFT)+tx(260,690,'KỆ',90,900,TEAL)+tx(260,790,'giá A',64,800,SLATE));
  c+=pop(lt,0.5,780,1000,tag(780,1000,440,300,TEAL)+tx(740,970,'QUẦY',90,900,'#fff')+tx(740,1070,'giá B',64,800,'#E6F6F5'));
  c+=pop(lt,1.0,540,860,`<g transform="translate(${sh} 0)">${tx(540,900,'≠',230,900,SLATE)}</g>`);
 }
 if(i==10){
  const dec=Math.exp(-lt*2.2),rot=Math.sin(lt*30)*14*dec;
  c+=pop(lt,0.0,540,650,`<circle cx="540" cy="650" r="210" fill="${TEAL}"/><g transform="rotate(${rot} 540 600)"><path d="M440 700 Q440 560 540 520 Q640 560 640 700 L670 730 L410 730Z" fill="#fff"/><circle cx="540" cy="765" r="26" fill="#fff"/><circle cx="540" cy="505" r="20" fill="#fff"/></g>`);
  c+=pop(lt,0.15,540,1060,tx(540,1090,'BÁO NGAY',130,900,SLATE));
  c+=pop(lt,0.5,540,1250,pill(540,1250,'Người phụ trách',62,GREEN,SLATE));
 }
 if(i==11){
  const sh=lt<1.0?Math.sin(lt*45)*6:0;
  c+=sl(lt,0,0,-70,tx(540,420,'ĐỪNG',190,900,SLATE));
  c+=pop(lt,0.3,540,820,rr(130,700,820,240,50,SOFT)+tx(540,850,'tự chọn một giá',70,900,GREY));
  c+=pop(lt,0.9,540,820,`<g transform="translate(${sh} 0)"><circle cx="540" cy="820" r="250" fill="none" stroke="${TEAL}" stroke-width="30"/><line x1="360" y1="640" x2="720" y2="1000" stroke="${TEAL}" stroke-width="30" stroke-linecap="round"/></g>`,0.45);
  c+=pop(lt,1.5,540,1250,pill(540,1250,'rồi mới tính',64,GREEN,SLATE));
 }
 if(i==12){
  c+=pop(lt,0,540,360,pill(540,360,'Khách đang chờ, nói:',58,SLATE,'#fff'));
  c+=pop(lt,1.3,540,820,rr(80,470,920,720,64,SOFT)+rr(80,470,24,720,12,TEAL)+tx(160,650,'“',170,900,GREEN,'start'));
  const W=[['Anh/chị chờ em',1.5,SLATE,76],['kiểm lại một chút,',2.5,SLATE,76],['em không muốn',3.6,TEAL,82],['báo nhầm giá.',4.2,TEAL,100]];
  W.forEach((w,k)=>{c+=sl(lt,w[1],0,40,tx(540,740+k*115,w[0],w[3],900,w[2]),0.35)});
  c+=pop(lt,0.3,540,1420,person(540,1450,1.1,TEAL));
 }
 if(i==13){
  const n=Math.min(10,Math.max(0,Math.floor((lt-0.3)/0.22)));
  c+=sl(lt,0,0,-50,tx(540,360,'Thử ngay trước ca tới',64,800,GREY));
  c+=pop(lt,0.2,540,640,rr(110,430,860,400,50,TEAL)+tx(540,690,String(n),270,900,'#fff')+tx(540,780,'món',56,800,'#E6F6F5'));
  for(let k=0;k<10;k++){const x=190+(k%5)*175,y=950+Math.floor(k/5)*140;c+=`<circle cx="${x}" cy="${y}" r="52" fill="${k<n?GREEN:SOFT}"/>`+(k<n?check(x,y,1,SLATE):'')}
  c+=pop(lt,1.6,540,1300,tx(540,1300,'hay bị hỏi giá nhất',70,900,SLATE));
 }
 if(i==14){
  c+=sl(lt,0.1,0,40,tx(540,600,'Đọc thêm tin mới nhất',64,800,GREY)+tx(540,690,'về ngành tại',64,800,GREY)+tx(540,830,'lyhu.com.vn',130,900,TEAL));
  c+=pop(lt,0.8,540,990,pill(540,990,'Mục Tin tức',58,GREEN,SLATE));
  c+=sl(lt,1.4,0,50,`<g transform="translate(140 1180) scale(0.97)"><use href="#logo"/></g>`);
 }
 const off=[200,120,0,0,0,0,0,0,0,0,0,0,0,0,40][i];
 return g+`<g transform="translate(0 ${off*0})">${c}</g>`}
function draw(t){
 let i=0;for(let k=0;k<vs.length;k++)if(t>=vs[k])i=k;
 let g=scene(i,t);
 const lt=t-vs[i];
 if(i>0&&lt<0.22){const p=eo(lt/0.22);g+=`<rect x="0" y="0" width="${1080*(1-p)}" height="1920" fill="${TEAL}"/>`}
 g+=rr(0,1900,1080*t/DUR,20,0,GREEN);
 document.getElementById('s').innerHTML=g}
draw(0)
