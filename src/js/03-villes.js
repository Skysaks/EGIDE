/* ---------- données dépendantes de la ville ---------- */
const PXY=[[96,214],[300,118],[262,170],[150,140],[52,104],[342,66],[352,290],[280,84]];
const AXY=[[70,312],[312,236],[122,110],[236,318],[334,160],[40,190]];
const SPECS=[['Dirigeants','Mobilité urbaine'],['Profils médiatiques','Événements'],['Voyages','Familles'],['Dirigeants','Profils médiatiques'],['Événements','Sport'],['Familles','Voyages']];
const SPEC_EN={'Dirigeants':'Executives','Mobilité urbaine':'Urban mobility','Profils médiatiques':'High-profile','Événements':'Events','Voyages':'Travel','Familles':'Families','Sport':'Sport'};
let PLACES=[],AGENTS=[],ME={x:184,y:268};
function buildCity(){
 const c=city(),r=reg();
 PLACES=[
  {id:'home',label:L('Domicile','Home'),sub:c.base[0],x:PXY[0][0],y:PXY[0][1],ic:'home'},
  {id:'work',label:L('Bureau','Office'),sub:c.base[1],x:PXY[1][0],y:PXY[1][1],ic:'brief'},
  {id:'hotel',label:L('Hôtel','Hotel'),sub:c.base[2],x:PXY[2][0],y:PXY[2][1],ic:'pin'},
  ...c.pois.map((p,i)=>({id:'p'+i,label:p[0],sub:p[1],x:PXY[3+i][0],y:PXY[3+i][1],ic:i===2?'plane':'pin',air:i===2}))];
 const rr=rng(c.lat*100|0);
 AGENTS=c.names.map((n,i)=>{const [fn,ln]=n.split(' ');return{id:'a'+i,name:fn,last:ln,ini:(fn[0]+ln[0]).toUpperCase(),r:+(4.88+rr()*.1).toFixed(2),m:120+Math.floor(rr()*320),yrs:5+Math.floor(rr()*9),
  langs:c.langs[i],spec:SPECS[i],f:[1,3,5].includes(i),x:AXY[i][0],y:AXY[i][1],card:r.cardP+String(1000+Math.floor(rr()*8999)),
  certs:i%2?[L('Titre certifié','Certified'),'SST',L('Conduite défensive','Defensive driving')]:[L('Titre certifié','Certified'),L('Premiers secours','First aid')]}});
 $('#c-map').innerHTML=cityMap('cm',390,844,7+S.city*3,c.labels);
 $('#a-map').innerHTML=cityMap('am',390,844,19+S.city*5,c.labels);
}
function cityMap(id,w,h,seed,labels){
 const r=rng(seed);let s=`<svg class="map" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><rect class="m-bg" width="${w}" height="${h}"/>`;
 for(let i=0;i<7;i++)s+=`<rect class="m-pk" x="${r()*w}" y="${r()*h}" width="${30+r()*w*.18}" height="${24+r()*h*.1}" rx="12"/>`;
 s+=`<g class="m-gr" stroke-width="1">`;for(let x=-40;x<w+40;x+=22+r()*10)s+=`<line x1="${x}" y1="0" x2="${x+h*.18}" y2="${h}"/>`;for(let y=0;y<h;y+=24+r()*12)s+=`<line x1="0" y1="${y}" x2="${w}" y2="${y-w*.12}"/>`;s+='</g>';
 s+=`<path class="m-rv" d="M -30 ${h*.44} C ${w*.22} ${h*.33}, ${w*.42} ${h*.6}, ${w*.68} ${h*.47} S ${w+60} ${h*.36}, ${w+60} ${h*.4}" stroke-width="${Math.max(18,w*.05)}" fill="none"/>`;
 s+=`<g class="m-rd" stroke-width="3.2" fill="none" stroke-linecap="round"><path d="M0 ${h*.2} L ${w} ${h*.3}"/><path d="M ${w*.15} 0 L ${w*.35} ${h}"/><path d="M ${w*.7} 0 L ${w*.55} ${h}"/><path d="M0 ${h*.72} L ${w} ${h*.62}"/><path d="M ${w*.05} ${h*.95} L ${w*.95} ${h*.05}"/><circle cx="${w*.42}" cy="${h*.24}" r="${Math.min(w,h)*.06}"/></g>`;
 const pos=[[.36,.2],[.62,.22],[.78,.4],[.3,.5],[.4,.78],[.85,.6],[.04,.12]];
 s+=`<g class="m-lb" font-size="${w>500?11:9}" font-family="-apple-system,Segoe UI,sans-serif" letter-spacing="2" font-weight="600">`;labels.forEach((l,i)=>s+=`<text x="${w*pos[i][0]}" y="${h*pos[i][1]}">${l}</text>`);
 return s+`</g><g id="${id}-rt"></g><g id="${id}-mk"></g></svg>`;
}
const mkAgent=(x,y,hi)=>`<g transform="translate(${x},${y})"><circle r="${hi?18:13}" fill="var(--t1)" opacity="${hi?.16:.08}"/><circle r="${hi?10:7}" fill="${hi?'var(--t1)':'var(--t3)'}"/><path d="M0 -4.5l3.6 1.5v3c0 2.3-1.5 3.8-3.6 4.6-2.1-.8-3.6-2.3-3.6-4.6v-3z" fill="var(--bg)" transform="scale(${hi?1:.75})"/></g>`;
const mkMe=(x,y)=>`<g transform="translate(${x},${y})"><circle r="9" fill="var(--ac)" opacity=".35"><animate attributeName="r" values="9;26;9" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values=".35;0;.35" dur="2.4s" repeatCount="indefinite"/></circle><circle r="8" fill="var(--ac)" stroke="#fff" stroke-width="2.5"/></g>`;
const mkDest=(x,y)=>`<g transform="translate(${x},${y})"><rect x="-7" y="-7" width="14" height="14" rx="3" fill="var(--t1)"/><rect x="-2.5" y="-2.5" width="5" height="5" fill="var(--bg)"/></g>`;
const mkSOS=(x,y)=>`<g transform="translate(${x},${y})"><circle r="10" fill="#ff453a" opacity=".4"><animate attributeName="r" values="10;34;10" dur="1.2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".5;0;.5" dur="1.2s" repeatCount="indefinite"/></circle><circle r="9" fill="#ff453a" stroke="#fff" stroke-width="2"/></g>`;
const manhattan=(a,b)=>[a,{x:b.x,y:a.y},b];
const polyStr=p=>p.map(q=>q.x.toFixed(1)+','+q.y.toFixed(1)).join(' ');
function along(pts,t){let Lg=0;const seg=[];for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i].x-pts[i-1].x,pts[i].y-pts[i-1].y);seg.push(d);Lg+=d}
 let x=t*Lg;for(let i=0;i<seg.length;i++){if(x<=seg[i]||i===seg.length-1){const k=seg[i]?Math.min(1,x/seg[i]):1;return{x:pts[i].x+(pts[i+1].x-pts[i].x)*k,y:pts[i].y+(pts[i+1].y-pts[i].y)*k}}x-=seg[i]}return pts[pts.length-1]}
function rest(pts,t){let Lg=0;const seg=[];for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i].x-pts[i-1].x,pts[i].y-pts[i-1].y);seg.push(d);Lg+=d}
 let x=t*Lg;for(let i=0;i<seg.length;i++){if(x<=seg[i])return[along(pts,t),...pts.slice(i+1)];x-=seg[i]}return[pts[pts.length-1]]}
const anims={};
function animate(key,ms,step,done){cancelAnimationFrame(anims[key]);const t0=performance.now();const f=now=>{const t=Math.min(1,(now-t0)/ms);step(t);if(t<1)anims[key]=requestAnimationFrame(f);else done&&done()};anims[key]=requestAnimationFrame(f)}
const stopAnim=k=>cancelAnimationFrame(anims[k]);

