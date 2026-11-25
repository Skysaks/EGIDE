/* ---------- jeux de données démo (déterministes) ---------- */
const DR=rng(4242);
const DAYS30=Array.from({length:30},(_,i)=>{const d=new Date();d.setDate(d.getDate()-29+i);return d});
const dlabel=d=>pad(d.getDate())+'/'+pad(d.getMonth()+1);
const MONTHS=()=>P.lang==='en'?['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']:['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'];
const last12=()=>{const m=NOW().getMonth();return Array.from({length:12},(_,i)=>MONTHS()[(m-11+i+12)%12])};
const REV30=DAYS30.map((d,i)=>{const dow=d.getDay();return Math.round((12500+i*95+(dow===5||dow===6?4200:dow===0?1500:0)+DR()*2600))});
const REV30P=REV30.map(v=>Math.round(v*(.8+DR()*.12)));
const MIX14=Array.from({length:14},(_,i)=>{const we=[5,6].includes((NOW().getDay()-13+i+14)%7);return[18+Math.round(DR()*8)+(we?9:0),8+Math.round(DR()*4),3+Math.round(DR()*3)+(we?2:0),5+Math.round(DR()*3)]});
const HEAT=Array.from({length:7},(_,d)=>Array.from({length:24},(_,h)=>{let v=1+DR()*2;if(h>=7&&h<=10&&d<5)v+=6;if(h>=18&&h<=23)v+=7+(d>=4?6:0);if(h<4&&d>=4)v+=6;if(h>=12&&h<=14)v+=2;return Math.round(v*3)}));
const ASSIGN=[[ '0–2',212],['2–4',388],['4–6',301],['6–8',142],['8–10',61],['10–12',24],['12+',13]];
const REV12=Array.from({length:12},(_,i)=>Math.round(210000+i*21000+DR()*26000));
const CONTR12=REV12.map(v=>Math.round(v*(.2+DR()*.05)));
const COST12=REV12.map((v,i)=>Math.round(v*.62+38000+i*900));

