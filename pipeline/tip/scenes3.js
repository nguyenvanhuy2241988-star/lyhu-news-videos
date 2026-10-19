const SUB=[['Mẹo bán lẻ LYHU'],['Đại lý nhắn: hai thùng thôi,','tiện đường giao giúp anh nhé?'],['Đừng vội trả lời “được anh”.','Hỏi rõ chữ “gấp” trước đã.'],['Đơn gấp, chốt ba thứ.'],['Một: hàng nào.'],['Hai: nhận trước lúc nào.'],['Ba: ai xác nhận phương án giao.'],['Rồi chọn một trong ba đường.'],['Đúng tuyến, còn chỗ:','chốt khoảng giờ giao.'],['Lệch tuyến, khách chờ được:','ghép chuyến kế tiếp.'],['Cần giao riêng: báo giờ dự kiến','và phí, khách đồng ý rồi mới chốt.'],['Đừng hứa giờ chính xác','khi chưa kiểm!'],['Cuối cùng, ghi một phiếu chốt giao.','Một tin nhắn là đủ,','đỡ ba cuộc gọi.'],['']];
function clock(cx,cy,r,ang){return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${SOFT}" stroke="${TEAL}" stroke-width="${r/10}"/><line x1="${cx}" y1="${cy}" x2="${cx+Math.sin(ang*Math.PI/180)*r*0.7}" y2="${cy-Math.cos(ang*Math.PI/180)*r*0.7}" stroke="${SLATE}" stroke-width="${r/10}" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="${r/9}" fill="${SLATE}"/>`}
function scene(i,t){
 const lt=t-vs[i];let g=frame(i,t,lt),c='';
 if(i==0){
  c+=sl(lt,0.05,-500,0,tx(540,760,'MẸO BÁN LẺ',130,900,SLATE));
  c+=pop(lt,0.5,540,960,tx(540,960,'LYHU',230,900,TEAL));
  c+=pop(lt,1.0,540,1260,`<g transform="rotate(${Math.sin(lt*6)*6} 540 1260)">${tag(540,1260,420,230,GREEN)}${tx(500,1285,'GIÁ',90,900,SLATE)}</g>`);
 }
 if(i==1){
  c+=pop(lt,0.0,230,520,person(230,520,2.0,TEAL));
  c+=pop(lt,0.35,640,480,bubble(320,290,660,340,SOFT,400,true)+tx(650,440,'Hai thùng thôi,',58,900,SLATE)+tx(650,520,'tiện đường',58,900,SLATE)+tx(650,600,'giao giúp anh nhé?',54,900,TEAL));
  c+=pop(lt,1.5,330,1150,box(330,1150,1.5,TEAL));
  c+=pop(lt,2.1,700,1150,box(700,1150,1.5,TEAL));
  c+=pop(lt,2.7,540,1400,pill(540,1400,'x2 thùng',64,GREEN,SLATE));
 }
 if(i==2){
  c+=pop(lt,0.1,540,470,rr(150,360,780,220,60,SOFT)+tx(540,500,'“Được anh!”',92,900,SLATE,'middle',lt>1.4?0.4:1));
  const w=780*eo((lt-1.4)/0.4);if(lt>1.4)c+=rr(150,460,w,20,10,TEAL);
  c+=pop(lt,2.2,540,1000,clock(540,900,200,lt*200)+tx(540,1250,'“GẤP” là',72,900,GREY)+tx(540,1350,'tới mấy giờ?',96,900,TEAL));
 }
 if(i==3){
  c+=pop(lt,0.0,540,700,`<circle cx="540" cy="700" r="260" fill="${TEAL}"/>`+tx(540,810,'3',330,900,'#fff'));
  c+=pop(lt,0.4,540,1150,tx(540,1150,'thứ cần chốt',96,900,SLATE));
 }
 if(i>=4&&i<=6){
  const t3=vs[3],R=[['Hàng nào',vs[4]+0.1,'box'],['Nhận trước lúc nào',vs[5]+0.1,'clock'],['Ai xác nhận',vs[6]+0.1,'person']];
  c+=sl(t-t3,0,0,-60,tx(540,360,'Đơn gấp: chốt 3 thứ',76,900,SLATE));
  R.forEach((r,k)=>{const y=470+k*320;
   if(t<r[1]){if(t-t3>0.3+k*0.15)c+=`<g opacity="${clamp((t-t3-0.3-k*0.15)*4)}">${rr(120,y,840,250,50,'#fff',1,'stroke="'+TEAL+'" stroke-width="6" stroke-dasharray="16 14"')}${tx(240,y+155,String(k+1),100,900,GREY,'middle',0.45)}</g>`}
   else{const ic=r[2]=='box'?box(890,y+125,0.5,'#fff'):r[2]=='clock'?clock(890,y+125,45,(t-r[1])*180):person(890,y+160,0.6,'#fff');
    c+=pop(t,r[1],540,y+125,rr(120,y,840,250,50,k==(i-4)?TEAL:SOFT)+rr(120,y,24,250,12,GREEN)+tx(240,y+160,String(k+1),100,900,k==(i-4)?'#fff':TEAL)+tx(330,y+145,r[0],r[0].length>12?52:70,900,k==(i-4)?'#fff':SLATE,'start')+(k==(i-4)?ic:''),0.45)}});
 }
 if(i==7){
  c+=pop(lt,0.0,540,430,pill(540,430,'ĐƠN GẤP',80,SLATE,'#fff'));
  [[220,'A'],[540,'B'],[860,'C']].forEach((o,k)=>{const d=0.5+k*0.3;
   if(lt>d)c+=`<path d="M540 520 L${o[0]} 900" stroke="${TEAL}" stroke-width="10" stroke-dasharray="4 22" stroke-linecap="round" opacity="${clamp((lt-d)*3)}"/>`;
   c+=pop(lt,d+0.15,o[0],1000,`<circle cx="${o[0]}" cy="1000" r="115" fill="${k==1?GREEN:TEAL}"/>`+tx(o[0],1045,o[1],130,900,k==1?SLATE:'#fff'))});
  c+=pop(lt,1.7,540,1320,tx(540,1320,'chọn 1 trong 3 đường',64,800,GREY));
 }
 if(i>=8&&i<=10){
  const t7=vs[7],K=i-8;
  const C=[['Đúng tuyến, còn chỗ','Chốt khoảng giờ giao'],['Lệch tuyến, khách chờ được','Ghép chuyến kế tiếp'],['Cần giao riêng','Báo giờ dự kiến + phí']];
  c+=sl(t-t7,0,0,-60,tx(540,330,'Chọn 1 trong 3 đường',72,900,SLATE));
  C.forEach((r,k)=>{const y=420+k*350,on=k==K,sh=on?Math.min(1,(t-vs[8+k])/0.3):0;
   c+=pop(t-t7,0.1+k*0.12,540,y+150,rr(100,y,880,300,56,on?TEAL:SOFT)+rr(100,y,24,300,12,GREEN)+tx(170,y+130,r[0],r[0].length>20?52:60,900,on?'#fff':SLATE,'start')+tx(170,y+215,r[1],56,700,on?'#E6F6F5':GREY,'start')+(on?`<g opacity="${clamp(sh)}">${truck(850,y+55,0.45,'#fff')}</g>`:''),0.45)});
 }
 if(i==11){
  c+=sl(lt,0.0,0,-60,tx(540,420,'ĐỪNG HỨA',150,900,SLATE));
  c+=pop(lt,0.3,540,820,rr(130,680,820,260,60,SOFT)+tx(540,830,'giờ chính xác',84,900,GREY));
  const sh=lt<1.3?Math.sin(lt*45)*6:0;
  c+=pop(lt,0.8,540,810,`<g transform="translate(${sh} 0)"><circle cx="540" cy="810" r="250" fill="none" stroke="${TEAL}" stroke-width="30" opacity="0.85"/><line x1="360" y1="630" x2="720" y2="990" stroke="${TEAL}" stroke-width="30" opacity="0.85" stroke-linecap="round"/></g>`,0.45);
  c+=pop(lt,1.4,540,1260,pill(540,1260,'khi chưa kiểm',64,GREEN,SLATE));
 }
 if(i==12){
  c+=pop(lt,0.0,540,420,pill(540,420,'PHIẾU CHỐT GIAO',66,SLATE,'#fff'));
  c+=pop(lt,0.2,540,900,rr(110,520,860,760,50,'#fff',1,'stroke="'+TEAL+'" stroke-width="8" stroke-dasharray="20 14"'));
  const L=['Mã hàng + số lượng','Điểm giao + người nhận','Khoảng giờ thống nhất','Phí giao (nếu có)','Người xác nhận + số liên hệ'];
  const T=[0.7,1.4,2.1,2.8,3.5];
  L.forEach((s,k)=>{c+=pop(lt,T[k],540,610+k*140,rr(150,560+k*140,780,110,34,k==4?TEAL:SOFT)+tx(200,632+k*140,s,48,900,k==4?'#fff':SLATE,'start'),0.4)});
  c+=pop(lt,4.2,540,1400,pill(540,1400,'1 tin nhắn là đủ',58,GREEN,SLATE));
 }
 if(i==13){
  c+=sl(lt,0.1,0,40,tx(540,600,'Đọc thêm tin mới nhất',64,800,GREY)+tx(540,690,'về ngành tại',64,800,GREY)+tx(540,830,'lyhu.com.vn',130,900,TEAL));
  c+=pop(lt,0.8,540,990,pill(540,990,'Mục Tin tức',58,GREEN,SLATE));
  c+=sl(lt,1.4,0,50,`<g transform="translate(140 1180) scale(0.97)"><use href="#logo"/></g>`);
 }
 return g+c}
