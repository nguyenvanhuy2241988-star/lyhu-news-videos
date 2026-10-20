const SUB=[['Mẹo bán lẻ LYHU'],['Cầm gói vị này, quét lên màn hình','lại ra vị khác!'],['Giá giống nhau nên vẫn tính tiếp.','Đến lúc xem tồn, mã này bị trừ,','mã kia vẫn nguyên.'],['Dừng lại ở dòng hàng đang sai.'],['Đọc tên, vị, trọng lượng trên gói.','So với dòng đang hiện trên màn hình.'],['Nói với khách: máy đang hiện','khác loại anh chị lấy,','em kiểm lại một chút nhé.'],['Đừng mượn mã món gần giống','để tính thay!'],['Giữ lại một gói mẫu. Chụp rõ','dãy số dưới mã vạch và tên hàng.'],['Đặt ba thứ cạnh nhau: gói thật,','dãy số quét được, và hồ sơ hàng','được gọi ra.'],['Người được phân quyền sửa đúng chỗ.','Đừng tạo thêm một mã cho nhanh.'],['Sửa xong, quét thử lại gói bị lỗi','và một gói khác vị.'],['Mục tiêu là lần quét sau','ra đúng hàng, chứ không chỉ','cho hóa đơn đủ tiền.'],['']];
function snack(cx,cy,s,fill,lab){return pack(cx,cy,s,fill,tx(0,45*1,lab,34,900,SLATE))}
function screen(cx,cy,w,h,inner){return rr(cx-w/2,cy-h/2,w,h,36,SLATE)+rr(cx-w/2+22,cy-h/2+22,w-44,h-44,20,'#fff')+inner+rr(cx-60,cy+h/2,120,40,10,SLATE)+rr(cx-130,cy+h/2+36,260,22,11,SLATE)}
function scan(lt,cx,cy,w){const y=cy+Math.sin(lt*7)*60;return `<rect x="${cx-w/2}" y="${y-5}" width="${w}" height="10" rx="5" fill="${TEAL}" opacity="0.9"/>`}
function scene(i,t){
 const lt=t-vs[i];let g=frame(i,t,lt),c='';
 if(i==0){
  c+=sl(lt,0.05,-500,0,tx(540,700,'MẸO BÁN LẺ',130,900,SLATE));
  c+=pop(lt,0.5,540,900,tx(540,900,'LYHU',230,900,TEAL));
  c+=pop(lt,1.0,540,1200,`<g transform="rotate(${Math.sin(lt*6)*7} 540 1200)">${barcode(540,1200,420,230,SLATE)}</g>`);
 }
 if(i==1){
  c+=pop(lt,0.0,270,820,snack(270,820,1.05,GREEN,'CAY'));
  c+=pop(lt,0.3,270,1180,barcode(270,1190,220,110,SLATE)+(lt>0.8?scan(lt,270,1190,260):''),0.4);
  c+=pop(lt,0.9,760,820,screen(760,780,420,360,tx(760,760,'Vị phô mai',58,900,SLATE)+rr(600,800,320,16,8,SOFT)+tx(760,880,'1 gói',44,800,GREY)));
  if(lt>1.7)c+=pop(lt,1.7,520,1000,`<g transform="translate(${Math.sin(lt*30)*(lt<2.4?8:0)} 0)">${pill(520,1000,'≠',120,TEAL,'#fff')}</g>`,0.4);
  c+=pop(lt,0.2,540,420,tx(540,420,'Quét thử một gói',68,900,SLATE));
 }
 if(i==2){
  c+=pop(lt,0.1,540,380,pill(540,380,'Giá giống nhau',66,GREEN,SLATE));
  c+=pop(lt,1.6,540,680,rr(100,520,880,260,50,TEAL)+tx(160,640,'Mã vừa quét',48,800,'#E6F6F5','start')+tx(160,730,'Phô mai',66,900,'#fff','start')+tx(800,720,'Tồn '+(lt<3.6?10:9),90,900,'#fff','middle'),0.5);
  if(lt>3.6&&lt<4.3)c+=`<g opacity="${1-(lt-3.6)/0.7}">${tx(800,610,'−1',110,900,GREEN)}</g>`;
  c+=pop(lt,3.9,540,1010,rr(100,880,880,260,50,SOFT)+tx(160,1000,'Mã gói thật',48,800,GREY,'start')+tx(160,1090,'Cay',66,900,SLATE,'start')+tx(800,1080,'Tồn 10',90,900,SLATE,'middle'),0.5);
  c+=pop(lt,4.6,540,1300,pill(540,1300,'vẫn nguyên',60,SLATE,'#fff'),0.4);
 }
 if(i==3){
  c+=pop(lt,0.0,540,560,screen(540,560,760,300,rr(240,490,600,70,20,SOFT)+tx(540,540,'Vị phô mai',50,900,SLATE)+rr(240,580,600,70,20,TEAL)+tx(540,630,'Dòng đang sai',50,900,'#fff')));
  c+=pop(lt,0.5,540,1130,`<g transform="translate(${lt<1.4?Math.sin(lt*40)*5:0} 0)"><circle cx="540" cy="1130" r="190" fill="${TEAL}"/>${tx(540,1175,'DỪNG',120,900,'#fff')}</g>`,0.5);
 }
 if(i==4){
  c+=pop(lt,0.0,250,800,snack(250,800,1.1,GREEN,'CAY'));
  [['Tên','0.8'],['Vị','2.0'],['Trọng lượng','3.2']].forEach((r,k)=>{c+=pop(lt,+r[1],540,1000,'',0.1);c+=pop(lt,+r[1],690,560+k*130,rr(500,500+k*130,360,100,50,k==1?GREEN:TEAL)+tx(680,567+k*130,r[0],52,900,k==1?SLATE:'#fff')+check(840,550+k*130,1.2,'#fff'),0.4)});
  c+=pop(lt,3.9,540,1200,rr(120,1100,840,170,50,SOFT)+tx(300,1200,'Gói',60,900,SLATE)+tx(540,1210,'so với',50,800,GREY)+tx(780,1200,'Màn hình',60,900,TEAL),0.5);
  if(lt>4.4)c+=pop(lt,4.4,540,1400,tx(540,1400,'khớp từng chữ',64,900,SLATE),0.4);
 }
 if(i==5){
  c+=pop(lt,0.0,250,860,person(250,860,2.1,TEAL));
  c+=pop(lt,0.9,600,560,bubble(300,330,660,380,SOFT,300,true)+tx(630,450,'Máy đang hiện',56,900,SLATE)+tx(630,530,'khác loại anh chị lấy,',56,900,SLATE)+tx(630,620,'em kiểm lại nhé!',56,900,TEAL),0.5);
  c+=sl(lt,2.0,300,0,person(840,1000,1.7,SLATE));
  c+=pop(lt,2.6,540,1330,pill(540,1330,'nói thẳng, nhẹ nhàng',58,GREEN,SLATE),0.4);
 }
 if(i==6){
  c+=sl(lt,0,0,-60,tx(540,400,'ĐỪNG',170,900,SLATE));
  c+=pop(lt,0.4,300,880,snack(300,880,0.95,GREEN,'CAY'));
  c+=pop(lt,0.8,780,880,ban(780,880,210,TEAL,snack(780,880,0.95,TEAL,'MÃ KIA')),0.5);
  c+=pop(lt,1.6,540,1330,pill(540,1330,'mượn mã món gần giống',58,SLATE,'#fff'),0.4);
 }
 if(i==7){
  c+=pop(lt,0.0,540,700,snack(540,740,1.35,GREEN,'CAY'),0.5);
  c+=pop(lt,0.9,540,1080,barcode(540,1090,420,150,SLATE)+tx(540,1210,'8934 5678 9012',64,800,SLATE),0.5);
  c+=pop(lt,1.8,860,560,`<rect x="760" y="440" width="200" height="320" rx="36" fill="${SLATE}"/><circle cx="860" cy="600" r="50" fill="${TEAL}"/><circle cx="860" cy="600" r="24" fill="#fff"/>`,0.5);
  c+=pop(lt,3.0,540,1380,pill(540,1380,'Chụp rõ số + tên hàng',56,SOFT,SLATE),0.4);
  c+=pop(lt,3.4,540,1520,tx(540,1520,'số minh họa',34,600,GREY),0.3);
 }
 if(i==8){
  const it=[['GÓI THẬT',1.9,'box'],['DÃY SỐ QUÉT',3.1,'bar'],['HỒ SƠ HÀNG',4.3,'doc']];
  c+=sl(lt,0,0,-60,tx(540,330,'Đặt 3 thứ cạnh nhau',74,900,SLATE));
  it.forEach((r,k)=>{const y=440+k*370;c+=pop(lt,r[1],540,y+150,rr(110,y,860,300,56,k==2?TEAL:SOFT)+rr(110,y,24,300,12,GREEN)+tx(200,y+175,r[0],70,900,k==2?'#fff':SLATE,'start')+(r[2]=='box'?box(830,y+150,1.0,TEAL):r[2]=='bar'?barcode(830,y+150,170,120,SLATE,12):rr(760,y+60,140,180,20,'#fff')+rr(785,y+100,90,12,6,TEAL)+rr(785,y+135,90,12,6,TEAL)+rr(785,y+170,60,12,6,TEAL)),0.45)});
  if(lt>5.0)c+=pop(lt,5.0,540,1600,tx(540,1600,'',1,1,SLATE));
 }
 if(i==9){
  c+=pop(lt,0.0,280,780,person(280,790,2.0,TEAL)+rr(210,880,150,60,30,GREEN)+tx(285,923,'Quyền',36,900,SLATE));
  c+=pop(lt,0.7,780,700,rr(560,520,420,360,40,SOFT)+tx(770,640,'Hồ sơ hàng',54,900,SLATE)+rr(600,690,340,18,9,GREY)+rr(600,740,260,18,9,GREY)+(lt>1.5?`<path d="M900 790 l30 -30" stroke="${TEAL}" stroke-width="12" stroke-linecap="round"/>`:'' ),0.5);
  c+=pop(lt,1.5,540,1060,check(540,1060,5,GREEN)+tx(540,1160,'Sửa đúng chỗ',64,900,SLATE),0.4);
  c+=pop(lt,2.8,540,1360,ban(250,1360,70,TEAL,'')+pill(640,1360,'+ thêm mã mới',58,SLATE,'#fff'),0.5);
 }
 if(i==10){
  c+=pop(lt,0.0,300,740,snack(300,720,0.95,GREEN,'CAY')+barcode(300,980,220,100,SLATE)+(lt>0.7?scan(lt,300,980,250):''));
  c+=pop(lt,1.0,780,740,screen(780,700,380,300,tx(780,720,'Vị cay',60,900,SLATE)),0.5);
  c+=pop(lt,1.6,780,1000,check(780,1000,3.5,GREEN),0.4);
  c+=pop(lt,2.4,300,1280,snack(300,1280,0.7,TEAL,'KHÁC')+check(450,1320,2,GREEN)+tx(300,1470,'gói khác vị',44,800,GREY),0.5);
  c+=pop(lt,2.8,780,1280,check(780,1290,3.5,GREEN),0.4);
 }
 if(i==11){
  c+=pop(lt,0.0,540,560,screen(540,560,640,320,tx(540,570,'Đúng hàng',90,900,TEAL)));
  c+=pop(lt,1.0,540,1000,check(540,1000,5,GREEN),0.5);
  c+=pop(lt,1.9,540,1250,ban(180,1250,70,TEAL,'')+pill(620,1250,'chỉ cho đủ tiền',58,SLATE,'#fff'),0.5);
  c+=pop(lt,2.9,540,1450,pill(540,1450,'Quét đúng hàng mới là xong',54,GREEN,SLATE),0.4);
 }
 if(i==12)c+=closing(lt);
 return g+c}
