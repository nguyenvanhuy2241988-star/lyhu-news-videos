const SUB=[['Mẹo bán lẻ LYHU'],['Khách hỏi: cái này ăn liền,','hay phải làm chín?'],['Quầy đang đông, mình nhớ mang máng.','Nói đại cho nhanh thì dễ sai.'],['Chỉ cần ba câu.'],['Câu một: anh chị muốn biết','phần nào ạ?'],['Cách chế biến, cách cất sau khi mở,','hay món này có hợp không.','Hỏi rõ một câu, đỡ nói lan man.'],['Câu hai: trên nhãn gói này,','hướng dẫn như thế này ạ.'],['Đừng lấy hướng dẫn của sản phẩm khác,','chỉ vì bao bì trông giống!'],['Câu ba: em chỉ chỗ này','để mình tiện xem nhé.'],['Chỗ nào chưa rõ thì nói thật:','em kiểm lại với bên cung cấp,','em chưa dám nói chắc.'],['Nói ngắn, nói đúng.','Chỗ chưa biết thì kiểm lại.'],['']];
function lines(y,n){return [0,1,2,3].slice(0,n).map(k=>rr(-70,y+k*40,140,16,8,SOFT)).join('')}
function scene(i,t){
 const lt=t-vs[i];let g=frame(i,t,lt),c='';
 if(i==0){
  c+=sl(lt,0.05,-500,0,tx(540,760,'MẸO BÁN LẺ',130,900,SLATE));
  c+=pop(lt,0.5,540,960,tx(540,960,'LYHU',230,900,TEAL));
  c+=pop(lt,1.0,540,1260,`<g transform="rotate(${Math.sin(lt*6)*6} 540 1260)">${tag(540,1260,420,230,GREEN)}${tx(500,1285,'GIÁ',90,900,SLATE)}</g>`);
 }
 if(i==1){
  c+=pop(lt,0.0,250,520,person(250,520,2.2,TEAL));
  c+=pop(lt,0.35,640,480,bubble(330,290,640,340,SOFT,420,true)+tx(650,455,'Ăn liền,',78,900,SLATE)+tx(650,555,'hay làm chín?',78,900,TEAL));
  const fl=Math.sin(lt*5)*14;
  c+=pop(lt,1.2,540,1130,`<g transform="translate(0 ${fl})">${pack(540,1130,1.2,TEAL,tx(0,50,'?',130,900,TEAL))}</g>`);
 }
 if(i==2){
  c+=pop(lt,0.1,540,520,rr(110,380,860,260,60,SOFT)+tx(540,490,'“Chắc là ăn liền…”',62,800,GREY)+tx(540,575,'nói đại cho nhanh',48,700,GREY));
  const w=860*eo((lt-2.6)/0.4);
  if(lt>2.6)c+=rr(110,500,w,20,10,TEAL);
  c+=pop(lt,3.0,540,1000,`<polygon points="540,800 760,1170 320,1170" fill="${GREEN}"/>`+tx(540,1120,'!',230,900,SLATE));
  c+=pop(lt,3.5,540,1330,pill(540,1330,'Dễ hướng dẫn sai',60,SLATE,'#fff'));
 }
 if(i==3){
  c+=pop(lt,0.0,540,700,`<circle cx="540" cy="700" r="260" fill="${TEAL}"/>`+tx(540,810,'3',330,900,'#fff'));
  c+=pop(lt,0.4,540,1150,tx(540,1150,'câu thôi',100,900,SLATE));
 }
 if(i==4){
  c+=pop(lt,0.0,540,420,`<circle cx="260" cy="420" r="90" fill="${GREEN}"/>`+tx(260,455,'1',110,900,SLATE)+tx(420,445,'CÂU MỘT',76,900,TEAL,'start'));
  c+=pop(lt,0.5,540,900,bubble(100,600,880,420,SOFT,300,true)+tx(540,780,'Anh/chị muốn biết',70,900,SLATE)+tx(540,880,'phần nào ạ?',90,900,TEAL));
  c+=pop(lt,1.4,540,1330,person(540,1350,1.2,TEAL));
 }
 if(i==5){
  const O=[['Cách chế biến',0.1],['Cách cất sau khi mở',1.4],['Món này có hợp không',3.0]];
  O.forEach((o,k)=>{c+=pop(lt,o[1],540,430+k*210,rr(120,340+k*210,840,170,50,k==2?TEAL:SOFT)+rr(120,340+k*210,24,170,12,GREEN)+tx(540,455+k*210,o[0],64,900,k==2?'#fff':SLATE))});
  c+=pop(lt,4.9,540,1150,pill(540,1150,'Hỏi rõ 1 câu, đỡ lan man',56,GREEN,SLATE));
 }
 if(i==6){
  c+=pop(lt,0.0,300,360,`<circle cx="200" cy="360" r="80" fill="${GREEN}"/>`+tx(200,395,'2',100,900,SLATE)+tx(320,385,'ĐỌC TRÊN NHÃN',64,900,TEAL,'start'));
  c+=pop(lt,0.4,540,900,rr(210,480,660,800,50,'#fff',1,`stroke="${TEAL}" stroke-width="12"`)+rr(210,480,660,110,50,TEAL)+tx(540,555,'MẶT SAU GÓI',56,900,'#fff')+[0,1,2,3,4].map(k=>rr(270,640+k*100,540,50,25,k==2?GREEN:SOFT)).join(''));
  if(lt>1.4){const p=eo((lt-1.4)/0.5);c+=`<rect x="250" y="${720}" width="580" height="110" rx="30" fill="none" stroke="${GREEN}" stroke-width="12" opacity="${p}" transform="translate(0 ${(1-p)*-80+Math.sin(lt*6)*4})"/>`+pop(lt,1.8,540,1380,pill(540,1380,'Chỉ đúng chỗ hướng dẫn',54,SLATE,'#fff'))}
 }
 if(i==7){
  c+=pop(lt,0.1,300,760,pack(300,760,1.25,SOFT,tx(0,50,'A',100,900,TEAL)));
  c+=pop(lt,0.5,780,760,pack(780,760,1.25,TEAL,tx(0,50,'B',100,900,TEAL)));
  const sh=lt>1.6?Math.sin(lt*30)*6:0;
  c+=pop(lt,1.4,540,1250,`<g transform="translate(${sh} 0)">${tx(540,1320,'≠',230,900,SLATE)}</g>`);
  c+=pop(lt,2.2,540,1480,pill(540,1480,'Bao bì giống, hướng dẫn khác',52,SLATE,'#fff'));
 }
 if(i==8){
  c+=pop(lt,0.0,300,360,`<circle cx="200" cy="360" r="80" fill="${GREEN}"/>`+tx(200,395,'3',100,900,SLATE)+tx(320,385,'CHỈ CHỖ CẦN NHỚ',60,900,TEAL,'start'));
  c+=pop(lt,0.4,540,900,rr(210,480,660,800,50,'#fff',1,`stroke="${TEAL}" stroke-width="12"`)+rr(210,480,660,110,50,TEAL)+tx(540,555,'MẶT SAU GÓI',56,900,'#fff')+[0,1,2,3,4].map(k=>rr(270,640+k*100,540,50,25,k==3?GREEN:SOFT)).join(''));
  if(lt>1.2){const p=eo((lt-1.2)/0.5);c+=`<rect x="250" y="${920}" width="580" height="110" rx="30" fill="none" stroke="${GREEN}" stroke-width="12" opacity="${p}"/>`+pop(lt,1.6,540,1380,pill(540,1380,'Bảo quản sau khi mở',54,SLATE,'#fff'))}
 }
 if(i==9){
  c+=pop(lt,0.0,540,420,pill(540,420,'Chưa rõ thì nói thật:',60,SLATE,'#fff'));
  c+=pop(lt,0.7,540,760,rr(110,580,860,330,60,SOFT)+rr(110,580,24,330,12,TEAL)+tx(540,730,'Em kiểm lại với',70,900,SLATE)+tx(540,830,'bên cung cấp',86,900,TEAL));
  c+=pop(lt,3.0,540,1170,rr(110,1020,860,260,60,TEAL)+tx(540,1130,'Em chưa dám',70,900,'#fff')+tx(540,1225,'nói chắc.',90,900,'#fff'));
 }
 if(i==10){
  const I=[['Nói ngắn',0.1],['Nói đúng',1.0],['Chưa biết → kiểm lại',2.0]];
  I.forEach((o,k)=>{c+=pop(lt,o[1],540,520+k*230,rr(120,430+k*230,840,170,50,k==2?TEAL:SOFT)+tx(540,545+k*230,o[0],64,900,k==2?'#fff':SLATE)+check(880,515+k*230,1.3,k==2?'#fff':GREEN))});
 }
 if(i==11){
  c+=sl(lt,0.1,0,40,tx(540,600,'Đọc thêm tin mới nhất',64,800,GREY)+tx(540,690,'về ngành tại',64,800,GREY)+tx(540,830,'lyhu.com.vn',130,900,TEAL));
  c+=pop(lt,0.8,540,990,pill(540,990,'Mục Tin tức',58,GREEN,SLATE));
  c+=sl(lt,1.4,0,50,`<g transform="translate(140 1180) scale(0.97)"><use href="#logo"/></g>`);
 }
 return g+c}
