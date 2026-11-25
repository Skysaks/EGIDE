/* ================= CHARTS (SVG maison, aucune dépendance) ================= */
const PAL=()=>{const b=['#64d2ff','#30d158','#ff9f0a','#bf5af2','#ff375f','#8e8e93','#ffd60a'];return [P.accent,...b.filter(c=>c.toLowerCase()!==P.accent.toLowerCase())]};
const esc=s=>String(s).replace(/"/g,'&quot;');
function niceMax(v){if(v<=0)return 1;const p=Math.pow(10,Math.floor(Math.log10(v)));const n=v/p;return (n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10)*p}
function legend(items){return `<div class="legend">${items.map(i=>`<span><i style="background:${i[1]};${i[2]?'opacity:.5':''}"></i>${i[0]}</span>`).join('')}</div>`}
function lineChart(o){
 const w=o.w||640,h=o.h||220,ml=48,mr=12,mt=10,mb=24,iw=w-ml-mr,ih=h-mt-mb,n=o.labels.length,fmt=o.fmt||nf;
 const mx=o.yMax||niceMax(Math.max(...o.series.flatMap(s=>s.vals)));
 const X=i=>ml+(n<2?iw/2:i*iw/(n-1)),Y=v=>mt+ih-v/mx*ih;
 let s=`<svg class="chart" viewBox="0 0 ${w} ${h}">`;
 for(let k=0;k<=4;k++){const v=mx*k/4,y=Y(v);s+=`<line class="gl" x1="${ml}" x2="${w-mr}" y1="${y}" y2="${y}"/><text class="ax" x="${ml-8}" y="${y+3.5}" text-anchor="end">${fmt(v)}</text>`}
 const ev=o.every||Math.ceil(n/8);o.labels.forEach((l,i)=>{if(i%ev===0||(i===n-1&&(n-1)%ev>=ev*.6))s+=`<text class="ax" x="${X(i)}" y="${h-6}" text-anchor="middle">${l}</text>`});
 o.series.forEach((se,si)=>{const c=se.color||PAL()[si];const pts=se.vals.map((v,i)=>[X(i),Y(v)]);
  const d=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
  if(se.area){const gid='g'+Math.random().toString(36).slice(2,8);s+=`<defs><linearGradient id="${gid}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".28"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient></defs><path d="${d} L ${X(n-1)} ${mt+ih} L ${X(0)} ${mt+ih} Z" fill="url(#${gid})"/>`}
  s+=`<path d="${d}" fill="none" stroke="${c}" stroke-width="${se.dash?1.6:2.4}" ${se.dash?'stroke-dasharray="5 5" opacity=".7"':''} stroke-linejoin="round" stroke-linecap="round"/>`;
  if(!se.dash&&o.dots!==false){const p=pts[pts.length-1];s+=`<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="${c}" stroke="var(--s1)" stroke-width="2"/>`}});
 for(let i=0;i<n;i++){const tip=o.labels[i]+' — '+o.series.map(se=>se.name+' : '+fmt(se.vals[i])).join(' · ');s+=`<rect x="${X(i)-iw/n/2}" y="${mt}" width="${iw/n}" height="${ih}" fill="transparent" data-tip="${esc(tip)}"/>`}
 return s+'</svg>'+(o.legend!==false&&o.series.length>1?legend(o.series.map((se,i)=>[se.name,se.color||PAL()[i],se.dash])):'');
}
function barChart(o){
 const w=o.w||640,h=o.h||220,ml=44,mr=8,mt=10,mb=24,iw=w-ml-mr,ih=h-mt-mb,n=o.labels.length,fmt=o.fmt||nf,cols=o.colors||PAL();
 const tot=i=>o.stacked?o.series.reduce((a,s)=>a+s.vals[i],0):Math.max(...o.series.map(s=>s.vals[i]));
 const mx=o.yMax||niceMax(Math.max(...o.labels.map((_,i)=>tot(i))));const Y=v=>ih*v/mx;
 const bw=iw/n,gap=Math.max(2,bw*.22);let s=`<svg class="chart" viewBox="0 0 ${w} ${h}">`;
 for(let k=0;k<=4;k++){const v=mx*k/4,y=mt+ih-Y(v);s+=`<line class="gl" x1="${ml}" x2="${w-mr}" y1="${y}" y2="${y}"/><text class="ax" x="${ml-8}" y="${y+3.5}" text-anchor="end">${fmt(v)}</text>`}
 const ev=o.every||Math.ceil(n/12);
 o.labels.forEach((l,i)=>{const x0=ml+i*bw+gap/2,bwi=bw-gap;let acc=0;
  o.series.forEach((se,si)=>{const v=se.vals[i],hh=Y(v);const c=(o.hl!=null&&i===o.hl)?cols[si]:cols[si];
   const tip=l+' — '+se.name+' : '+fmt(v)+(o.stacked&&o.series.length>1?' (total '+fmt(tot(i))+')':'');
   if(o.stacked){s+=`<rect class="hv" x="${x0}" y="${mt+ih-acc-hh}" width="${bwi}" height="${Math.max(0,hh)}" rx="${si===o.series.length-1?3:0}" fill="${c}" opacity="${o.hl!=null&&i!==o.hl?.45:1}" data-tip="${esc(tip)}"/>`;acc+=hh}
   else{const sw=bwi/o.series.length;s+=`<rect class="hv" x="${x0+si*sw}" y="${mt+ih-hh}" width="${sw-1}" height="${Math.max(0,hh)}" rx="3" fill="${c}" opacity="${o.hl!=null&&i!==o.hl?.45:1}" data-tip="${esc(tip)}"/>`}});
  if(i%ev===0)s+=`<text class="ax" x="${x0+bwi/2}" y="${h-6}" text-anchor="middle">${l}</text>`});
 return s+'</svg>'+(o.series.length>1?legend(o.series.map((se,i)=>[se.name,cols[i]])):'');
}
function hbars(items,fmt,color){fmt=fmt||nf;const mx=Math.max(...items.map(i=>i[1]));
 return `<div style="display:flex;flex-direction:column;gap:10px;margin-top:6px">${items.map((it,i)=>`<div data-tip="${esc(it[0]+' : '+fmt(it[1]))}"><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:5px"><span>${it[0]}</span><b>${fmt(it[1])}</b></div><div class="bar" style="height:8px"><i style="width:${it[1]/mx*100}%;background:${it[2]||color||PAL()[0]}"></i></div></div>`).join('')}</div>`}
function donut(items,center,sub,size){size=size||170;const r=size/2-12,c=size/2,tot=items.reduce((a,i)=>a+i[1],0),C=2*Math.PI*r;let off=0,s=`<div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap"><svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="flex:none"><circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="var(--s3)" stroke-width="18"/>`;
 items.forEach((it,i)=>{const col=it[2]||PAL()[i];const len=it[1]/tot*C;s+=`<circle class="hv" cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${col}" stroke-width="18" stroke-dasharray="${Math.max(0,len-2)} ${C}" stroke-dashoffset="${-off}" transform="rotate(-90 ${c} ${c})" data-tip="${esc(it[0]+' : '+pct(it[1]/tot*100))}"/>`;off+=len});
 const cfs=String(center).length>7?Math.max(12,size/9):22;s+=`<text x="${c}" y="${c+2}" text-anchor="middle" fill="var(--t1)" font-size="${cfs}" font-weight="700">${center}</text><text x="${c}" y="${c+20}" text-anchor="middle" fill="var(--t3)" font-size="11">${sub||''}</text></svg>`;
 s+=`<div style="display:flex;flex-direction:column;gap:8px;font-size:12.5px;flex:1;min-width:120px">${items.map((it,i)=>`<div style="display:flex;align-items:center;gap:8px"><i style="width:10px;height:10px;border-radius:3px;background:${it[2]||PAL()[i]};flex:none"></i><span style="flex:1;color:var(--t2)">${it[0]}</span><b>${pct(it[1]/tot*100)}</b></div>`).join('')}</div></div>`;return s}
function heatmap(m,rows,cols,o){o=o||{};const w=o.w||640,cw=(w-40)/cols.length,ch=o.ch||20,h=rows.length*ch+22,mx=Math.max(...m.flat());let s=`<svg class="chart" viewBox="0 0 ${w} ${h}">`;
 m.forEach((row,ri)=>{s+=`<text class="ax" x="30" y="${ri*ch+ch/2+4}" text-anchor="end">${rows[ri]}</text>`;row.forEach((v,ci)=>{s+=`<rect class="hv" x="${40+ci*cw+1}" y="${ri*ch+1}" width="${cw-2}" height="${ch-2}" rx="3" fill="${P.accent}" opacity="${.07+.93*v/mx}" data-tip="${esc(rows[ri]+' '+cols[ci]+' — '+(o.fmt||nf)(v)+' '+(o.unit||''))}"/>`})});
 cols.forEach((c,ci)=>{if(ci%(o.every||3)===0)s+=`<text class="ax" x="${40+ci*cw+cw/2}" y="${h-4}" text-anchor="middle">${c}</text>`});return s+'</svg>'}
function funnel(st){const w=640,rh=40,h=st.length*rh+4,mx=st[0][1];let s=`<svg class="chart" viewBox="0 0 ${w} ${h}">`;
 st.forEach((x,i)=>{const bw=(w-260)*x[1]/mx,x0=150+(w-260-bw)/2,y=i*rh;const conv=i?x[1]/st[i-1][1]*100:100;
  s+=`<text class="ax" x="140" y="${y+rh/2+3}" text-anchor="end" style="font-size:12px;fill:var(--t2)">${x[0]}</text><rect class="hv" x="${x0}" y="${y+5}" width="${bw}" height="${rh-10}" rx="7" fill="${P.accent}" opacity="${1-i*.11}" data-tip="${esc(x[0]+' : '+nf(x[1]))}"/><text x="${150+(w-260)/2}" y="${y+rh/2+4}" text-anchor="middle" fill="#fff" font-size="12.5" font-weight="700">${nf(x[1])}</text>${i?`<text class="ax" x="${w-100}" y="${y+rh/2+3}" style="font-size:12px;fill:${conv<90?'var(--warn)':'var(--ok)'}">${pct(conv)}</text>`:''}`});return s+'</svg>'}
function gauge(v,max,label,sub,col){const w=220,h=128,r=88,cx=110,cy=112;const a=Math.PI*(1-Math.min(1,v/max));const x=cx+r*Math.cos(a),y=cy-r*Math.sin(a);
 return `<svg class="chart" viewBox="0 0 ${w} ${h}" style="max-width:260px;margin:0 auto"><path d="M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${cx+r} ${cy}" fill="none" stroke="var(--s3)" stroke-width="16" stroke-linecap="round"/><path d="M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${x.toFixed(1)} ${y.toFixed(1)}" fill="none" stroke="${col||P.accent}" stroke-width="16" stroke-linecap="round"/><text x="${cx}" y="${cy-18}" text-anchor="middle" fill="var(--t1)" font-size="30" font-weight="700">${label}</text><text x="${cx}" y="${cy+2}" text-anchor="middle" fill="var(--t3)" font-size="11">${sub||''}</text></svg>`}
function waterfall(steps,fmt){const w=640,h=240,ml=48,mt=10,mb=34,iw=w-ml-10,ih=h-mt-mb,n=steps.length;let run=0,mx=0;steps.forEach(s=>{if(s[2]==='t'){mx=Math.max(mx,s[1])}else{run+=s[1];mx=Math.max(mx,run)}});mx=niceMax(mx);
 const Y=v=>mt+ih-v/mx*ih,bw=iw/n;let s=`<svg class="chart" viewBox="0 0 ${w} ${h}">`;for(let k=0;k<=4;k++){const v=mx*k/4;s+=`<line class="gl" x1="${ml}" x2="${w-10}" y1="${Y(v)}" y2="${Y(v)}"/><text class="ax" x="${ml-8}" y="${Y(v)+3.5}" text-anchor="end">${fmt(v)}</text>`}
 run=0;steps.forEach((st,i)=>{const x=ml+i*bw+bw*.15,bwi=bw*.7;let y0,y1,col;if(st[2]==='t'){y0=Y(st[1]);y1=Y(0);col=st[3]||P.accent;run=st[1]}else{const a=run,b=run+st[1];y0=Y(Math.max(a,b));y1=Y(Math.min(a,b));col=st[1]<0?'#ff453a':'#30d158';run=b}
  s+=`<rect class="hv" x="${x}" y="${y0}" width="${bwi}" height="${Math.max(1,y1-y0)}" rx="4" fill="${col}" data-tip="${esc(st[0]+' : '+fmt(st[1]))}"/><text class="ax" x="${x+bwi/2}" y="${y0-5}" text-anchor="middle" style="fill:var(--t2);font-weight:600">${fmt(st[1])}</text><text class="ax" x="${x+bwi/2}" y="${h-18}" text-anchor="middle">${st[0].split(' ')[0]}</text><text class="ax" x="${x+bwi/2}" y="${h-6}" text-anchor="middle">${st[0].split(' ').slice(1).join(' ')}</text>`;
  if(i<n-1)s+=`<line x1="${x+bwi}" x2="${x+bw}" y1="${Y(run)}" y2="${Y(run)}" stroke="var(--t3)" stroke-dasharray="2 3"/>`});return s+'</svg>'}
function spark(vals,col,w,h){w=w||90;h=h||28;const mx=Math.max(...vals),mn=Math.min(...vals),X=i=>i*w/(vals.length-1),Y=v=>h-2-(v-mn)/((mx-mn)||1)*(h-4);
 return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d="${vals.map((v,i)=>(i?'L':'M')+X(i).toFixed(1)+' '+Y(v).toFixed(1)).join(' ')}" fill="none" stroke="${col||P.accent}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>`}
/* diagramme de flux : nodes {id,x,y,w,h,t,s,k}, edges [a,b,label,dash] */
function flow(nodes,edges,W,H){const N={};nodes.forEach(n=>N[n.id]=n);const aid='ar'+Math.random().toString(36).slice(2,7);
 let s=`<svg class="chart" viewBox="0 0 ${W} ${H}"><defs><marker id="${aid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--t3)"/></marker></defs>`;
 edges.forEach(e=>{const a=N[e[0]],b=N[e[1]];let x1,y1,x2,y2;
  if(Math.abs(a.y-b.y)<5){x1=a.x+(b.x>a.x?a.w:0);y1=a.y+a.h/2;x2=b.x+(b.x>a.x?0:b.w);y2=b.y+b.h/2}
  else{x1=a.x+a.w/2;y1=a.y+(b.y>a.y?a.h:0);x2=b.x+b.w/2;y2=b.y+(b.y>a.y?0:b.h)}
  const my=(y1+y2)/2,mx2=(x1+x2)/2;const d=Math.abs(a.y-b.y)<5?`M${x1} ${y1} L${x2} ${y2}`:`M${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
  s+=`<path d="${d}" fill="none" stroke="var(--t3)" stroke-width="1.5" ${e[3]?'stroke-dasharray="4 4"':''} marker-end="url(#${aid})"/>`;
  if(e[2])s+=`<text x="${mx2}" y="${my-5}" text-anchor="middle" font-size="10.5" fill="var(--t2)" style="paint-order:stroke;stroke:var(--s1);stroke-width:4px">${e[2]}</text>`});
 nodes.forEach(n=>{const col={a:P.accent,r:'#ff453a',g:'#30d158',y:'#ff9f0a'}[n.k];
  s+=`<g data-tip="${esc(n.tip||n.t)}"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="10" fill="${col?col:'var(--s2)'}" fill-opacity="${col?.14:1}" stroke="${col||'var(--line2)'}" stroke-width="1.2"/>
  <text x="${n.x+n.w/2}" y="${n.y+(n.s?n.h/2-2:n.h/2+4)}" text-anchor="middle" font-size="12" font-weight="650" fill="var(--t1)">${n.t}</text>${n.s?`<text x="${n.x+n.w/2}" y="${n.y+n.h/2+13}" text-anchor="middle" font-size="10.5" fill="var(--t2)">${n.s}</text>`:''}</g>`});
 return s+'</svg>'}
function worldMap(points,hub,h){const w=1000;h=h||440;const L0=-128,L1=64,A0=12,A1=63;const X=lon=>(lon-L0)/(L1-L0)*w,Y=lat=>(A1-lat)/(A1-A0)*h;
 const eu=p=>p.lon>-12&&p.lon<20&&p.lat>36&&p.lat<60;let s=`<svg class="chart" viewBox="0 0 ${w} ${h}" style="height:100%"><rect width="${w}" height="${h}" fill="var(--mbg)"/>`;
 for(let lon=-120;lon<=60;lon+=20)s+=`<line x1="${X(lon)}" x2="${X(lon)}" y1="0" y2="${h}" stroke="var(--mgrid)"/>`;
 for(let lat=20;lat<=60;lat+=10)s+=`<line y1="${Y(lat)}" y2="${Y(lat)}" x1="0" x2="${w}" stroke="var(--mgrid)"/><text x="${w-6}" y="${Y(lat)-4}" text-anchor="end" fill="var(--mlabel)" font-size="9.5">${lat}°</text>`;
 const R=rng(9);for(let i=0;i<900;i++){const lon=L0+R()*(L1-L0),lat=A0+R()*(A1-A0);const land=(lon>-125&&lon<-66&&lat>25&&lat<62&&!(lon>-100&&lon<-80&&lat<29))||(lon>-110&&lon<-85&&lat>14&&lat<30)||(lon>-10&&lon<40&&lat>36&&lat<62)||(lon>-17&&lon<52&&lat>12&&lat<36&&!(lon>32&&lon<35&&lat>27))||(lon>35&&lon<64&&lat>12&&lat<62&&!(lon>48&&lon<56&&lat>24&&lat<30))||(lon>-10&&lon<-6&&lat>51&&lat<55)||(lon>-6&&lon<2&&lat>50&&lat<59);if(land)s+=`<circle cx="${X(lon).toFixed(1)}" cy="${Y(lat).toFixed(1)}" r="1.7" fill="var(--mlabel)" opacity=".5"/>`}
 if(hub)points.forEach(p=>{if(p===hub||eu(p))return;const x1=X(hub.lon),y1=Y(hub.lat),x2=X(p.lon),y2=Y(p.lat);s+=`<path d="M${x1} ${y1} Q ${(x1+x2)/2} ${Math.min(y1,y2)-70} ${x2} ${y2}" fill="none" stroke="${P.accent}" stroke-opacity=".5" stroke-width="1.4" stroke-dasharray="3 4"/>`});
 const dot=(x,y,p,lab)=>{const r=4+Math.sqrt(p.v||1)*1.3;return `<g data-tip="${esc(p.tip||p.name)}"><circle cx="${x}" cy="${y}" r="${r+6}" fill="${p.col||P.accent}" opacity=".18"/><circle cx="${x}" cy="${y}" r="${r}" fill="${p.col||P.accent}"/>${lab?`<text x="${x+r+5}" y="${y+4}" fill="var(--t1)" font-size="11.5" font-weight="600">${p.name}</text>`:''}</g>`};
 const eus=points.filter(eu);points.forEach(p=>s+=dot(X(p.lon),Y(p.lat),p,!eu(p)));
 if(eus.length){const e0=-11,e1=18,n0=38.5,n1=55.5,bx=18,bw=330,bh=196,by=h-bh-18,EX=lon=>bx+(lon-e0)/(e1-e0)*bw,EY=lat=>by+(n1-lat)/(n1-n0)*bh;
  s+=`<rect x="${X(e0)}" y="${Y(n1)}" width="${X(e1)-X(e0)}" height="${Y(n0)-Y(n1)}" fill="none" stroke="var(--t3)" stroke-dasharray="3 3" rx="4"/><path d="M${X(e0)} ${Y(n0)} L${bx+bw} ${by}" stroke="var(--t3)" stroke-dasharray="3 3"/>`;
  s+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="12" fill="var(--s1)" stroke="var(--line2)"/><text x="${bx+12}" y="${by+18}" fill="var(--t3)" font-size="10" letter-spacing="1.5" font-weight="600">EUROPE</text>`;
  const ehub=hub&&eu(hub)?hub:null;if(ehub)eus.forEach(p=>{if(p===ehub)return;s+=`<line x1="${EX(ehub.lon)}" y1="${EY(ehub.lat)}" x2="${EX(p.lon)}" y2="${EY(p.lat)}" stroke="${P.accent}" stroke-opacity=".45" stroke-dasharray="3 4"/>`});
  eus.forEach(p=>s+=dot(EX(p.lon),EY(p.lat),p,true))}
 return s+'</svg>'}
/* tooltips */
document.addEventListener('mousemove',e=>{const el=e.target.closest&&e.target.closest('[data-tip]');const t=$('#tip');if(!el){t.style.opacity=0;return}t.textContent=el.dataset.tip;t.style.opacity=1;
 const x=Math.min(e.clientX+14,innerWidth-t.offsetWidth-8);t.style.left=x+'px';t.style.top=(e.clientY+16)+'px'});

