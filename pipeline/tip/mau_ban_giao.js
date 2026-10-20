const SUB=[['Mẹo bán lẻ LYHU'],['Nhân viên mới gọi chào.','Chủ tiệm hỏi ngay: bạn trước hẹn','gửi thông tin cho chị, tới đâu rồi?'],['Người mới chỉ có tên','và số điện thoại.','Không biết đang nói việc gì.'],['Bàn giao không chỉ','là danh sách khách.','Phải bàn giao cả việc đang hẹn.'],['Mỗi việc ghi một dòng: điểm bán,','việc đang chờ, căn cứ đã có,','người nhận việc,','và mốc phản hồi tiếp theo.'],['Tách điều đã chốt,','khỏi điều mới xin!'],['Khách hỏi có hỗ trợ không,','khác với quản lý đã duyệt hỗ trợ.'],['Đánh dấu từng việc: đã xác nhận,','chờ duyệt, hay cần hỏi lại.'],['Giới thiệu người mới','cùng một việc cụ thể. Ví dụ:','việc chị đang chờ đã được','bàn giao cho bạn An.'],['Chỉ hẹn mốc khi người nhận việc','đã đồng ý. Chưa chắc thì nói','đang kiểm tra.'],['Cuối cùng, người nhận phải','nói lại được bước kế tiếp.'],['Làm gọn từ đầu, điểm bán','không phải kể lại một chuyện','cho từng người mới!'],['']];
function row(y,lab,col,tc){return rr(110,y,860,130,40,col)+tx(170,y+84,lab,56,900,tc,'start')}
function scene(i,t){
 const lt=t-vs[i];let g=frame(i,t,lt),c='';
 if(i==0){
  c+=sl(lt,0.05,-500,0,tx(540,700,'MẸO BÁN LẺ',130,900,SLATE));
  c+=pop(lt,0.5,540,900,tx(540,900,'LYHU',230,900,TEAL));
  c+=pop(lt,1.0,540,1200,`<g transform="rotate(${Math.sin(lt*6)*7} 540 1200)">${person(400,1220,1.5,TEAL)}${person(690,1220,1.5,GREEN)}</g>`);
 }
 if(i==1){
  c+=pop(lt,0.0,250,930,person(250,930,2.0,TEAL)+rr(170,1040,160,40,20,GREEN)+tx(250,1072,'MỚI',30,900,SLATE));
  c+=pop(lt,1.0,830,930,person(830,930,2.0,SLATE));
  c+=pop(lt,2.0,540,520,bubble(110,340,860,300,SOFT,760,false)+tx(540,450,'Bạn trước hẹn gửi',62,900,SLATE)+tx(540,540,'thông tin cho chị,',62,900,SLATE)+tx(540,615,'tới đâu rồi?',62,900,TEAL),0.5);
  if(lt>4.0)c+=pop(lt,4.0,250,760,`<g transform="rotate(${Math.sin(lt*10)*8} 250 760)">${tx(250,760,'?',200,900,TEAL)}</g>`,0.4);
 }
 if(i==2){
  c+=pop(lt,0.0,540,700,rr(180,440,720,500,50,SOFT)+person(330,620,1.2,TEAL)+tx(480,590,'Tên',56,900,SLATE,'start')+tx(480,680,'Số điện thoại',56,900,SLATE,'start')+rr(240,780,600,16,8,GREY,0.4)+rr(240,830,420,16,8,GREY,0.4));
  c+=pop(lt,1.6,540,1180,tx(540,1180,'Việc gì?',160,900,TEAL),0.5);
  c+=pop(lt,2.8,540,1400,pill(540,1400,'không biết đang nói gì',58,SLATE,'#fff'),0.4);
 }
 if(i==3){
  c+=pop(lt,0.2,540,560,rr(110,380,860,360,50,SOFT)+tx(170,470,'Danh sách khách',64,900,SLATE,'start')+rr(170,520,600,18,9,GREY,0.5)+rr(170,570,500,18,9,GREY,0.5)+rr(170,620,560,18,9,GREY,0.5));
  c+=pop(lt,2.0,540,860,tx(540,860,'+',130,900,GREEN),0.4);
  c+=pop(lt,2.6,540,1080,rr(110,940,860,300,50,TEAL)+tx(170,1050,'Việc đang hẹn',64,900,'#fff','start')+check(840,1030,2.4,'#fff')+tx(170,1150,'đang chờ ai, chờ gì',50,700,'#E6F6F5','start'),0.5);
 }
 if(i==4){
  const F=[['Điểm bán',2.0],['Việc đang chờ',3.2],['Căn cứ đã có',4.5],['Người nhận việc',5.6],['Mốc phản hồi tiếp',6.6]];
  c+=sl(lt,0.1,0,-60,pill(540,350,'1 VIỆC = 1 DÒNG',64,TEAL,'#fff'));
  F.forEach((f,k)=>{c+=pop(lt,f[1],540,470+k*190+60,row(470+k*190,(k+1)+' · '+f[0],k%2?SOFT:'#fff',SLATE).replace('fill="#fff"','fill="#fff" stroke="'+TEAL+'" stroke-width="6"')+rr(110,470+k*190,22,130,11,GREEN),0.4)});
 }
 if(i==5){
  c+=sl(lt,0,0,-60,tx(540,380,'TÁCH',150,900,SLATE));
  c+=pop(lt,0.6,540,700,rr(110,520,860,260,50,GREEN)+tx(170,640,'ĐÃ CHỐT',76,900,SLATE,'start')+check(830,650,3.5,SLATE),0.5);
  c+=pop(lt,1.6,540,1040,rr(110,880,860,260,50,SOFT)+tx(170,1000,'MỚI XIN',76,900,SLATE,'start')+tx(830,1020,'?',130,900,TEAL),0.5);
  c+=pop(lt,2.4,540,1330,pill(540,1330,'hai thứ khác nhau',62,SLATE,'#fff'),0.4);
 }
 if(i==6){
  c+=pop(lt,0.0,260,760,person(260,760,1.8,TEAL)+bubble(80,390,360,170,SOFT,260,false).replace(/<polygon.*?\/>/,'')+tx(260,490,'Có hỗ trợ',50,900,SLATE)+tx(260,545,'không?',50,900,SLATE));
  c+=pop(lt,1.5,820,760,person(820,760,1.8,SLATE)+rr(640,360,360,230,50,GREEN)+tx(820,455,'Đã duyệt',60,900,SLATE)+check(820,530,1.3,SLATE),0.5);
  c+=pop(lt,2.3,540,1130,tx(540,1130,'≠',250,900,TEAL),0.5);
  c+=pop(lt,2.8,540,1380,pill(540,1380,'khách hỏi ≠ quản lý duyệt',54,SOFT,SLATE),0.4);
 }
 if(i==7){
  c+=sl(lt,0,0,-60,tx(540,370,'Đánh dấu từng việc',70,900,SLATE));
  c+=pop(lt,1.9,540,620,rr(110,500,860,170,85,GREEN)+tx(540,610,'ĐÃ XÁC NHẬN',70,900,SLATE)+check(210,585,1.4,SLATE),0.45);
  c+=pop(lt,3.0,540,860,rr(110,740,860,170,85,SOFT)+tx(540,850,'CHỜ DUYỆT',70,900,SLATE),0.45);
  c+=pop(lt,4.0,540,1100,rr(110,980,860,170,85,TEAL)+tx(540,1090,'CẦN HỎI LẠI',70,900,'#fff'),0.45);
 }
 if(i==8){
  c+=pop(lt,0.0,250,780,person(250,780,2.0,TEAL)+rr(170,890,160,40,20,GREEN)+tx(250,922,'MỚI',30,900,SLATE));
  c+=pop(lt,1.0,620,600,rr(380,420,600,260,50,SOFT)+tx(680,520,'Việc cụ thể',60,900,SLATE)+rr(420,570,520,18,9,GREY,0.5)+rr(420,620,360,18,9,GREY,0.5),0.5);
  if(lt>3.6){c+=pop(lt,3.6,540,1060,bubble(110,900,860,330,TEAL,300,false)+tx(540,1010,'Việc chị đang chờ',62,900,'#fff')+tx(540,1100,'đã bàn giao cho bạn An.',62,900,'#fff'),0.5);c+=pop(lt,4.3,540,1360,pill(540,1360,'Ví dụ minh họa',50,SOFT,GREY),0.4)}
 }
 if(i==9){
  c+=sl(lt,0,0,-60,tx(540,380,'Khi nào hẹn mốc?',70,900,SLATE));
  c+=pop(lt,0.5,540,640,rr(110,500,860,280,50,GREEN)+tx(170,610,'Người nhận đã đồng ý',58,900,SLATE,'start')+tx(170,700,'→ hẹn mốc',68,900,SLATE,'start')+check(840,640,2.6,SLATE),0.5);
  c+=pop(lt,3.0,540,1020,rr(110,880,860,280,50,SOFT)+tx(170,990,'Chưa chắc',58,900,SLATE,'start')+tx(170,1080,'→ “đang kiểm tra”',64,900,TEAL,'start'),0.5);
 }
 if(i==10){
  c+=pop(lt,0.0,250,820,person(250,820,2.0,TEAL)+rr(170,930,160,40,20,GREEN)+tx(250,962,'MỚI',30,900,SLATE));
  c+=pop(lt,1.0,620,620,bubble(370,380,620,330,SOFT,420,true)+tx(680,490,'Bước kế tiếp là',58,900,SLATE)+tx(680,570,'… em sẽ gọi chị',58,900,SLATE)+tx(680,650,'trước 5 giờ',58,900,TEAL),0.5);
  c+=pop(lt,2.4,540,1160,check(540,1160,5,GREEN)+tx(540,1280,'nói lại được',70,900,SLATE),0.4);
  c+=pop(lt,3.2,540,1440,tx(540,1440,'nội dung minh họa',34,600,GREY),0.3);
 }
 if(i==11){
  c+=pop(lt,0.0,540,620,rr(180,380,720,480,56,TEAL)+tx(540,530,'1 ghi chú',90,900,'#fff')+tx(540,650,'bàn giao gọn',66,800,'#E6F6F5')+check(540,770,3,'#fff'),0.5);
  c+=pop(lt,1.6,300,1150,person(300,1150,1.4,GREEN)+person(540,1150,1.4,TEAL)+person(780,1150,1.4,SLATE),0.5);
  c+=pop(lt,2.4,540,1330,pill(540,1330,'Không kể lại từng lần',58,SLATE,'#fff'),0.4);
 }
 if(i==12)c+=closing(lt);
 return g+c}
