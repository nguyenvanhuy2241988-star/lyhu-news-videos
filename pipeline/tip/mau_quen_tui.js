const SUB=[['Mẹo bán lẻ LYHU'],['Khách trả tiền, cầm điện thoại','rồi đi luôn. Túi hàng còn nằm trên quầy!'],['Khách khác tới, dễ đẩy túi','sang một bên rồi quên mất của ai.'],['Làm một việc nhỏ:','để riêng, và ghi lại.'],['Một: giữ nguyên túi,','đặt ở một chỗ cố định sau quầy.'],['Đừng bỏ quầy chạy theo,','cũng đừng lấy ra bán lại!'],['Hai: ghi giờ phát hiện','và người đang giữ.'],['Khách quay lại?','Hỏi trước, rồi mới đưa túi.'],['Anh chị mua khoảng mấy giờ,','trong túi có những món gì ạ?'],['Chưa khớp thì nhờ người phụ trách','kiểm, đừng vội nghi khách.'],['Báo tìm chủ túi vừa đủ.','Đừng đăng tên hay số điện thoại.'],['Ngày mai thử nhắc một câu:','anh chị lấy đủ túi giúp em nhé!'],['']];
function counter(){return rr(60,1130,960,60,20,SLATE)+rr(100,1190,880,300,0,SOFT)}
function scene(i,t){
 const lt=t-vs[i];let g=frame(i,t,lt),c='';
 if(i==0){
  c+=sl(lt,0.05,-500,0,tx(540,700,'MẸO BÁN LẺ',130,900,SLATE));
  c+=pop(lt,0.5,540,900,tx(540,900,'LYHU',230,900,TEAL));
  c+=pop(lt,1.0,540,1200,`<g transform="rotate(${Math.sin(lt*6)*7} 540 1200)">${bag(540,1200,1.5,TEAL)}</g>`);
 }
 if(i==1){
  c+=counter();
  const px=lt<1.2?260:260-(lt-1.2)*700;
  c+=`<g opacity="${clamp(1-(lt-1.2)*1.2)}">${pop(lt,0,px,900,person(px,900,2.3,TEAL))}</g>`;
  c+=pop(lt,0.3,680,1000,tx(680,1000,'',1,1,SLATE)+bag(680,1010,1.5,GREEN));
  if(lt>1.3)c+=pop(lt,1.3,540,520,pill(540,520,'Túi còn trên quầy!',66,SLATE,'#fff'),0.5);
  if(lt>2.4)c+=`<g transform="translate(${Math.sin(lt*40)*6} 0)">${tx(680,830,'!',200,900,TEAL)}</g>`;
 }
 if(i==2){
  c+=counter();
  const bx=680-eo((lt-0.5)/0.6)*330;
  c+=sl(lt,0,500,0,person(860,900,2.3,SLATE));
  c+=`<g>${bag(bx,1010,1.5,GREEN)}</g>`;
  c+=pop(lt,1.4,430,700,bubble(150,520,560,230,SOFT,430,false)+tx(430,640,'Của ai nhỉ?',74,900,SLATE),0.5);
  c+=pop(lt,2.2,540,1560,tx(540,1560,'',1,1,SLATE));
 }
 if(i==3){
  c+=pop(lt,0.1,300,720,rr(80,470,440,520,56,SOFT)+`<rect x="130" y="530" width="340" height="300" rx="40" fill="none" stroke="${TEAL}" stroke-width="8" stroke-dasharray="18 14"/>`+bag(300,690,1.3,TEAL)+tx(300,930,'Để riêng',66,900,SLATE));
  c+=pop(lt,1.4,780,720,rr(560,470,440,520,56,SOFT)+note(640,540,280,300,'#fff')+rr(670,640,220,14,7,GREY)+rr(670,690,160,14,7,GREY)+rr(670,740,200,14,7,GREY)+tx(780,930,'Ghi lại',66,900,SLATE));
  c+=pop(lt,2.4,540,1240,pill(540,1240,'2 việc nhỏ',70,GREEN,SLATE));
 }
 if(i==4){
  c+=sl(lt,0,0,-60,pill(540,360,'1 · GIỮ NGUYÊN TÚI',64,TEAL,'#fff'));
  c+=rr(120,980,840,40,14,SLATE)+rr(120,640,840,40,14,SLATE)+rr(140,680,24,300,0,SLATE)+rr(916,680,24,300,0,SLATE);
  c+=pop(lt,0.3,540,820,`<rect x="360" y="720" width="360" height="250" rx="30" fill="none" stroke="${GREEN}" stroke-width="10" stroke-dasharray="20 14"/>`);
  const by=lt<0.7?-1:eo((lt-0.7)/0.6);
  c+=by>=0?`<g opacity="${clamp(by*3)}">${bag(540,880-(1-by)*300,1.4,TEAL)}</g>`:'';
  c+=pop(lt,1.6,540,1180,pill(540,1180,'Chỗ cố định · sau quầy',60,SOFT,SLATE),0.5);
  c+=pop(lt,2.2,540,1360,check(540,1360,5,GREEN));
 }
 if(i==5){
  c+=sl(lt,0,0,-60,tx(540,400,'ĐỪNG',170,900,SLATE));
  c+=pop(lt,0.4,300,880,ban(300,880,200,TEAL,person(300,860,1.9,SLATE)+`<path d="M170 940 L110 940" stroke="${GREY}" stroke-width="12" stroke-linecap="round"/>`),0.5);
  c+=pop(lt,1.3,780,880,ban(780,880,200,TEAL,bag(780,900,1.2,GREEN)+pill(780,1000,'bán lại',46,SLATE,'#fff')),0.5);
  c+=pop(lt,0.9,300,1240,tx(300,1240,'chạy theo',64,900,GREY));
  c+=pop(lt,1.8,780,1240,tx(780,1240,'bán lại',64,900,GREY));
  if(lt>2.4)c+=pop(lt,2.4,540,1440,pill(540,1440,'Cứ giữ nguyên!',64,GREEN,SLATE));
 }
 if(i==6){
  c+=sl(lt,0,0,-60,pill(540,360,'2 · GHI LẠI',64,TEAL,'#fff'));
  c+=pop(lt,0.1,540,830,note(110,470,860,700,'#fff')+rr(110,470,860,700,36,'none',1,'stroke="'+TEAL+'" stroke-width="8"'));
  c+=tx(160,525,'PHIẾU TÚI QUÊN',46,900,'#fff','start',lt>0.3?1:0);
  c+=pop(lt,0.6,540,760,clock(300,810,90,lt*260)+tx(440,830,typed('Giờ: 14:20',lt,0.9),70,900,SLATE,'start'));
  c+=pop(lt,1.6,540,980,person(300,1010,1.1,TEAL)+tx(440,1030,typed('Giữ: Hà',lt,1.8),70,900,SLATE,'start'));
  c+=pop(lt,2.6,540,1360,pill(540,1360,'Ví dụ minh họa',50,SOFT,GREY),0.4);
 }
 if(i==7){
  c+=counter();
  c+=sl(lt,0,-500,0,person(230,900,2.3,TEAL));
  c+=pop(lt,0.5,400,640,bubble(120,480,520,200,SOFT,260,false)+tx(380,600,'Túi của tôi!',66,900,SLATE),0.5);
  c+=bag(790,1010,1.5,GREEN);
  c+=pop(lt,1.4,540,1330,pill(540,1330,'HỎI TRƯỚC',90,TEAL,'#fff'),0.5);
  if(lt>2.3)c+=pop(lt,2.3,790,780,rr(690,730,200,100,30,SLATE)+tx(790,800,'rồi đưa',52,900,'#fff'),0.4);
 }
 if(i==8){
  c+=pop(lt,0.0,540,420,bubble(120,300,840,200,SOFT,260,true)+tx(540,420,'Em hỏi thêm chút nhé ạ',60,800,SLATE));
  c+=pop(lt,0.5,300,860,rr(100,640,400,480,50,TEAL)+clock(300,800,110,lt*200)+tx(300,1030,'Mấy giờ?',70,900,'#fff'));
  c+=pop(lt,1.7,780,860,rr(580,640,400,480,50,GREEN)+box(780,800,1.3,'#fff')+tx(780,1030,'Món gì?',70,900,SLATE));
  c+=pop(lt,2.8,540,1300,pill(540,1300,'khách nói đúng → đưa túi',56,SOFT,SLATE),0.4);
 }
 if(i==9){
  c+=pop(lt,0.0,300,780,rr(100,560,400,440,50,SOFT)+tx(300,760,'≠',220,900,TEAL)+tx(300,930,'chưa khớp',58,900,SLATE));
  c+=pop(lt,1.2,780,780,rr(580,560,400,440,50,TEAL)+person(780,760,1.6,'#fff')+tx(780,960,'Người phụ trách',46,900,'#fff'));
  c+=sl(lt,1.0,-80,0,`<path d="M510 780 L560 780" stroke="${GREEN}" stroke-width="14" stroke-linecap="round"/>`);
  c+=pop(lt,2.3,540,1250,ban(300,1250,70,TEAL,'')+pill(660,1250,'nghi khách',60,SLATE,'#fff'),0.5);
 }
 if(i==10){
  c+=pop(lt,0.0,540,760,rr(110,440,860,640,50,'#fff',1,'stroke="'+TEAL+'" stroke-width="8"')+rr(110,440,860,100,50,TEAL)+rr(110,490,860,50,0,TEAL)+tx(540,510,'TÌM CHỦ TÚI',54,900,'#fff')+tx(540,650,'Túi giấy màu nâu',60,800,SLATE)+tx(540,740,'Quầy thu ngân số 2',60,800,SLATE)+tx(540,830,'Liên hệ quầy',60,800,GREY));
  c+=pop(lt,1.0,350,960,check(350,980,3.5,GREEN),0.4);
  c+=pop(lt,1.9,540,1250,ban(300,1250,90,TEAL,pill(300,1250,'Tên',54,SOFT,SLATE))+ban(740,1250,90,TEAL,pill(740,1250,'SĐT',54,SOFT,SLATE)),0.5);
 }
 if(i==11){
  c+=pop(lt,0.1,540,520,pill(540,520,'NGÀY MAI',90,SLATE,'#fff'));
  c+=pop(lt,0.8,540,900,bubble(100,720,880,300,TEAL,300,false)+tx(540,840,'“Anh chị lấy đủ túi',70,900,'#fff')+tx(540,930,'giúp em nhé!”',70,900,'#fff'),0.6);
  c+=pop(lt,2.0,760,1260,bag(760,1260,1.3,GREEN)+check(760,1290,4,'#fff'),0.5);
  c+=pop(lt,2.4,330,1260,person(330,1290,1.9,SLATE));
 }
 if(i==12)c+=closing(lt);
 return g+c}
