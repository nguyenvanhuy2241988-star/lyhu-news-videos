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
 if(i<vs.length-1){
  g+=rr(0,1630,1080,270,0,TEAL)+rr(0,1630,18,270,0,GREEN);
  const L=SUB[i],n=L.length,mx=Math.max(...L.map(s=>s.length)),sz=n>2?44:(mx>30?48:56),lh=sz*1.25,y0=1630+135-(n-1)*lh/2+sz*0.33;
  const p=clamp(lt/0.25);
  L.forEach((s,k)=>{g+=tx(70,y0+k*lh+(1-eo(p))*20,s,sz,800,'#fff','start',eo(p))});
 }
 return g}

function box(cx,cy,s,fill){return `<g transform="translate(${cx} ${cy}) scale(${s})"><rect x="-100" y="-80" width="200" height="160" rx="14" fill="${fill}"/><rect x="-18" y="-80" width="36" height="160" fill="${GREEN}"/></g>`}
function truck(cx,cy,s,fill){return `<g transform="translate(${cx} ${cy}) scale(${s})"><rect x="-120" y="-70" width="150" height="110" rx="12" fill="${fill}"/><path d="M40 -40 L95 -40 L125 0 L125 40 L40 40Z" fill="${fill}"/><circle cx="-65" cy="48" r="26" fill="${SLATE}"/><circle cx="85" cy="48" r="26" fill="${SLATE}"/><circle cx="-65" cy="48" r="10" fill="#fff"/><circle cx="85" cy="48" r="10" fill="#fff"/></g>`}
function pack(cx,cy,s,fill,label){return `<g transform="translate(${cx} ${cy}) scale(${s})"><path d="M-130 -190 L-100 -215 L-70 -190 L-40 -215 L-10 -190 L20 -215 L50 -190 L80 -215 L110 -190 L130 -190 L130 190 Q130 210 110 210 L-110 210 Q-130 210 -130 190Z" fill="${fill}"/><rect x="-90" y="-60" width="180" height="150" rx="20" fill="#fff"/>${label}</g>`}
function draw(t){
 let i=0;for(let k=0;k<vs.length;k++)if(t>=vs[k])i=k;
 let g=scene(i,t);
 const lt=t-vs[i];
 if(i>0&&lt<0.22){const p=eo(lt/0.22);g+=`<rect x="0" y="0" width="${1080*(1-p)}" height="1920" fill="${TEAL}"/>`}
 g+=rr(0,1900,1080*t/DUR,20,0,GREEN);
 document.getElementById('s').innerHTML=g}
