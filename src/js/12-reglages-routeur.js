/* ================= RÉGLAGES, ROUTEUR, DÉMARRAGE ================= */
const ACCENTS=['#0a84ff','#30d158','#ff9f0a','#ff375f','#bf5af2','#64d2ff','#8e8e93'];
function renderDrawer(){const seg=(k,opts)=>`<div class="segs">${opts.map(o=>`<button class="${P[k]===o[0]?'on':''}" data-a="pset" data-v="${k}|${o[0]}">${o[1]}</button>`).join('')}</div>`;
 const tg=k=>`<button class="tg ${P[k]?'on':''}" data-a="pref" data-v="${k}"></button>`;
 const curs=CFG.market==='fr'?['auto','EUR','USD','GBP']:['auto','EUR','GBP','USD','CHF','AED'];
 $('#drawer').innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><h3>${L('Personnalisation','Personalisation')}</h3><button class="icb" data-a="settings">${I('x','s')}</button></div>
 <p class="sm muted" style="margin-bottom:8px">${L('Appliquée aux quatre vues et mémorisée sur cet appareil.','Applied to all four views and remembered on this device.')}</p>
 <div class="lbl">${L('Apparence','Appearance')}</div>
 <div class="srow"><span>${L('Thème','Theme')}</span>${seg('theme',[['dark',L('Sombre','Dark')],['light',L('Clair','Light')],['auto','Auto']])}</div>
 <div class="srow"><span>${L('Couleur d’accent','Accent colour')}</span><div class="sw">${ACCENTS.map(c=>`<button class="${P.accent===c?'on':''}" style="background:${c}" data-a="pset" data-v="accent|${c}" aria-label="${c}"></button>`).join('')}</div></div>
 <div class="srow"><span>${L('Taille du texte','Text size')}</span>${seg('size',[['s','A−'],['m','A'],['l','A+']])}</div>
 <div class="srow"><span>${L('Densité','Density')}</span>${seg('density',[['comfort',L('Confort','Comfort')],['compact','Compact']])}</div>
 <div class="srow"><span>${L('Animations réduites','Reduce motion')}</span>${tg('reduce')}</div>
 <div class="srow"><span>${L('Contraste élevé','High contrast')}</span>${tg('contrast')}</div>
 <div class="lbl">${L('Région','Region')}</div>
 <div class="srow"><span>${L('Langue','Language')}</span>${seg('lang',[['fr','Français'],['en','English']])}</div>
 <div class="srow"><span>${CFG.market==='fr'?L('Implantation','Location'):L('Ville','City')}</span><select onchange="act('city',this.value)">${CFG.cities.map((c,i)=>`<option value="${i}" ${i===S.city?'selected':''}>${c.name}</option>`).join('')}</select></div>
 <div class="srow"><span>${L('Devise','Currency')}</span><select onchange="act('pset','cur|'+this.value)">${curs.map(c=>`<option value="${c}" ${P.cur===c?'selected':''}>${c==='auto'?L('Auto (ville)','Auto (city)'):c}</option>`).join('')}</select></div>
 <div class="srow"><span>${L('Distances','Distances')}</span>${seg('units',[['km','km'],['mi','miles']])}</div>
 <div class="srow"><span>${L('Format horaire','Time format')}</span><div class="segs"><button class="${!P.h12?'on':''}" data-a="pset" data-v="h12|0">24 h</button><button class="${P.h12?'on':''}" data-a="pset" data-v="h12|1">12 h</button></div></div>
 <div class="lbl">${L('Confidentialité','Privacy')}</div>
 <div class="srow"><span>${L('Mode discret','Discreet mode')}<div class="xs dim">${L('Notifications sans contenu','Contentless notifications')}</div></span>${tg('discreet')}</div>
 <button class="btn sec sm" style="margin-top:18px" data-a="reset">${L('Réinitialiser la personnalisation','Reset personalisation')}</button>
 <p class="xs dim" style="margin-top:14px">${L('Prototype · données fictives · taux de change de démonstration.','Prototype · fictitious data · demo exchange rates.')}</p>`}
function renderTop(){$('#mk').textContent=LT(CFG.badge);$('#langb').textContent=P.lang==='en'?'EN':'FR';
 $('#seg').innerHTML=[['client',L('Client','Client')],['agent',L('Agent','Officer')],['biz',L('Entreprise','Business')],['ops',L('Opérations','Operations')]].map(v=>`<button data-a="view" data-v="${v[0]}" class="${S.view===v[0]?'on':''}">${v[1]}</button>`).join('');
 document.title=(CFG.market==='fr'?'ÉGIDE France':'ÉGIDE Global')+' — '+L('Protection rapprochée à la demande','On-demand close protection')}
function renderAll(){applyP();renderTop();$('#c-rail').innerHTML=cRail();$('#a-rail').innerHTML=aRail();cRender();cMarkers(cExtra());cRouteUpdate();aRender();aMarkers();if(S.view==='biz')renderBiz();if(S.view==='ops')renderOps();if($('#drawer').classList.contains('on'))renderDrawer();clk()}
function setView(v){S.view=v;['client','agent','biz','ops'].forEach(x=>$('#v-'+x).hidden=x!==v);renderTop();if(v==='ops')renderOps();if(v==='biz')renderBiz();window.scrollTo(0,0)}
function setCity(i){stopAnim('c');stopAnim('a');clearInterval(offerC);S.city=+i;buildCity();Object.assign(S.c,{step:'home',dest:null,agent:null,mission:null,agentArrived:false,mPos:null});Object.assign(S.a,{stage:null,pos:null});
 if(!S.c.langs.some(l=>city().langs.flat().includes(l)))S.c.langs=[city().langs[0][0]];logAudit(L('Vue ville : ','City view: ')+city().name);renderAll();toast(city().name+' · '+reg().body+' · '+curCode())}

function act(a,v,el){const c=S.c,ag=S.a,o=S.o,b=S.b;
 switch(a){
 case 'view':setView(v);break;case 'toast':toast(v);break;
 case 'settings':{const d=$('#drawer'),on=!d.classList.contains('on');if(on)renderDrawer();d.classList.toggle('on',on);$('#scrim').classList.toggle('on',on);break}
 case 'pset':{let [k,val]=v.split('|');if(k==='h12')val=val==='1';P[k]=val;saveP();if(k==='lang')buildCity();renderAll();break}
 case 'pref':P[v]=!P[v];saveP();renderAll();break;
 case 'lang':P.lang=P.lang==='en'?'fr':'en';saveP();buildCity();renderAll();break;
 case 'reset':P={...DEFP};saveP();buildCity();renderAll();toast(L('Personnalisation réinitialisée','Personalisation reset'));break;
 case 'city':setCity(v);break;
 /* client */
 case 'c:go':cGo(v);break;case 'c:back':cGo(cPrev);break;case 'c:back2':cGo(cPrev2==='prefs'?'tiers':cPrev2);break;
 case 'c:dest':c.dest=PLACES.find(p=>p.id===v);c.hours=Math.max(c.hours,T(c.tier).min||2);if(c.dest.air)c.tier='mobilite';cGo('tiers');break;
 case 'c:quick':c.ctx=v;c.dest=v==='soir'?PLACES[0]:v==='pro'?PLACES[3]:v==='event'?PLACES[7]:PLACES[5];c.tier=v==='event'?'event':v==='voyage'?'mobilite':'escorte';c.hours=2;if(v==='pro')c.dress='Costume';cGo('tiers');break;
 case 'c:fav':{const fa=AGENTS.find(x=>x.id===v);c.dest=c.dest||PLACES[2];c.tier='escorte';c.hours=2;toast(L('Demande envoyée en priorité à ','Request sent first to ')+fa.name);book(fa);break}
 case 'c:favtg':c.favs=c.favs.includes(v)?c.favs.filter(x=>x!==v):[...c.favs,v];cRender();break;
 case 'c:when':c.when=v;cRender();break;case 'c:day':c.day=+v;cRender();break;case 'c:time':c.time=v;cRender();break;case 'c:rec':c.rec=v;cRender();break;
 case 'c:ctx':c.ctx=v;cRender();break;
 case 'c:threat':c.threat=+v;if(c.threat===2&&!['detail','renforce'].includes(c.tier))c.tier='detail';cRender();break;
 case 'c:tier':{c.tier=v;const t=T(v);if(t.min)c.hours=Math.max(c.hours,t.min);cRender();break}
 case 'c:h':{const t=T(c.tier);c.hours=Math.min(12,Math.max(t.min||1,c.hours+ +v));cRender();break}
 case 'c:prot':c.prot=Math.min(6,Math.max(1,c.prot+ +v));cRender();break;
 case 'c:female':c.female=!c.female;cRender();break;case 'c:favonly':c.favOnly=!c.favOnly;cRender();break;
 case 'c:lang':c.langs=c.langs.includes(v)?(c.langs.length>1?c.langs.filter(x=>x!==v):c.langs):[...c.langs,v];cRender();break;
 case 'c:dress':c.dress=v;cRender();break;case 'c:disc':c.disc=+v;cRender();break;case 'c:veh':c.veh=v;cRender();break;
 case 'c:proto':c.proto[v]=!c.proto[v];cRender();break;
 case 'c:pay':c.payAcct=c.payAcct==='perso'?'biz':'perso';cRender();toast(c.payAcct==='biz'?L('Facturé à Hélios Conseil','Billed to Hélios Conseil'):L('Paiement personnel','Personal payment'));break;
 case 'c:book':{const q=quote(c.tier,c.hours,c.prot);if(c.payAcct==='biz'&&q.ttc>b.policy.thresh){b.appr.unshift({id:Date.now(),who:'Camille L.',tier:c.tier,h:c.hours,city:city().name,why:L('Au-delà du seuil d’approbation','Above approval threshold'),eur:q.ttc});toast(L('Envoyée pour approbation (seuil entreprise)','Sent for approval (company threshold)'));cGo('home');break}book();break}
 case 'c:eval':c.evalKind=v;logAudit(v==='menace'?L('Demande d’évaluation — menace identifiée','Assessment request — identified threat'):v==='event'?L('Demande de devis événement','Event quote request'):L('Dossier protection renforcée','Enhanced protection file'));cGo('eval');break;
 case 'c:cancel':stopAnim('c');if(c.mission){c.mission.st=L('Annulée','Cancelled');c.mission.lvl='r'}logAudit(L('Annulation client','Client cancellation'));cGo('home');break;
 case 'c:share':toast(L('Lien de suivi envoyé à vos contacts de confiance','Tracking link sent to trusted contacts'));break;
 case 'c:mismatch':stopAnim('c');if(c.mission){c.mission.st=L('Réassignation','Reassigning');c.mission.lvl='r'}o.alerts.unshift({id:Date.now(),t:L('Code de rencontre non conforme','Meeting code mismatch'),d:'Camille L. · '+city().name,lvl:'r',ack:false,t0:Date.now()});logAudit(L('ALERTE : code non conforme','ALERT: code mismatch'));cGo('mismatch');break;
 case 'c:start':startMission();break;
 case 'c:extend':c.hours=Math.min(12,c.hours+.5);toast(L('Prolongée de 30 min','Extended by 30 min'));cRender();break;
 case 'c:addagent':toast(L('Renfort demandé — estimé dans 11 min','Back-up requested — ETA 11 min'));logAudit(L('Demande de renfort','Back-up request'));break;
 case 'c:stop':toast(L('Arrêt ajouté : ','Stop added: ')+PLACES.find(p=>p.id===v).label);cGo('mission');break;
 case 'c:sosoff':o.alerts.forEach(x=>{if(!x.ack&&x.t.includes('Camille'))x.ack=true});logAudit(L('SOS annulé (fausse alerte)','SOS cancelled (false alarm)'));if(c.agent&&c.mPos){c.mRoute=manhattan(c.mPos,c.dest);cGo('mission');animate('c',16000,t=>{c.mPos=along(c.mRoute,t);cMarkers(cExtra())})}else cGo('home');break;
 case 'c:end':stopAnim('c');if(c.mission){c.mission.st=L('Terminée','Completed');c.mission.lvl='g'}logAudit(L('Fin de mission ','Mission ended ')+(c.mission?c.mission.id:''));c.rating=0;c.tags=[];c.tip=0;cGo('end');break;
 case 'c:rate':c.rating=+v;cRender();break;case 'c:tag':c.tags=c.tags.includes(v)?c.tags.filter(x=>x!==v):[...c.tags,v];cRender();break;case 'c:tip':c.tip=+v;cRender();break;
 case 'c:tg':c[v]=!c[v];cRender();break;
 case 'c:msg':c.msgs.push({me:true,t:v});cRender();setTimeout(()=>{if(S.c.step==='chat'){c.msgs.push({me:false,t:L('Bien reçu.','Got it.')});cRender()}},1200);break;
 case 'c:msgi':{const i=$('#msgi');if(i&&i.value)act('c:msg',i.value);break}
 case 'demo':demo(v);break;case 'ademo':ademo(v);break;
 /* agent */
 case 'a:tab':ag.tab=v;aRender();break;case 'a:online':aOnline();break;
 case 'a:accept':clearInterval(offerC);ag.stage='brief';logAudit('M-2620 '+L('acceptée','accepted'));aRender();break;
 case 'a:decline':clearInterval(offerC);ag.stage=null;aRoute(null);aRender();aMarkers();toast(L('Refusée — aucun impact','Declined — no impact'));break;
 case 'a:stage':ag.stage=v||null;if(!v){aRoute(null);stopAnim('a')}aRender();aMarkers();break;
 case 'a:brief':ag._ret=ag.stage;ag.stage='brief';aRender();break;
 case 'a:go':if(ag._ret==='enroute'||ag._ret==='arrived'){ag.stage=ag._ret;ag._ret=null;aRender();break}aGo();break;
 case 'a:arrive':{stopAnim('a');const f=AOFF().from;ag.pos={x:f.x+10,y:f.y+8};aRoute(null);ag.stage='arrived';aRender();aMarkers();break}
 case 'a:start':aStart();break;case 'a:ck':ag.checks[+v]=!ag.checks[+v];aRender();break;
 case 'a:log':ag.log.unshift({h:hhmm(NOW()),t:v});logAudit('M-2620 : '+v);aRender();break;
 case 'a:end':{stopAnim('a');ag.stage='rate';ag.ratingC=0;const mm=o.missions.find(x=>x.id==='M-2620');if(mm)mm.st=L('Terminée','Completed');logAudit('M-2620 '+L('terminée','completed'));aRender();break}
 case 'a:rate':ag.ratingC=+v;aRender();break;
 case 'a:done':{const p=payFor(AOFF());ag.earnToday+=p;ag.stage=null;ag.pos=null;aRoute(null);aRender();aMarkers();toast('+ '+money(p,1));break}
 case 'a:zone':ag.zones=ag.zones.includes(+v)?ag.zones.filter(x=>x!==+v):[...ag.zones,+v];aRender();break;
 case 'a:av':{const cur=ag.avail[v]!==undefined?ag.avail[v]:(+v.split('-')[1]>=3||(+v.split('-')[0]<5&&+v.split('-')[1]===1));ag.avail[v]=!cur;aRender();break}
 case 'a:ft':ag.filt.tiers=ag.filt.tiers.includes(v)?ag.filt.tiers.filter(x=>x!==v):[...ag.filt.tiers,v];aRender();break;
 case 'a:fn':ag.filt[v]=!ag.filt[v];aRender();break;
 case 'a:goal':ag.goal=Math.max(400,ag.goal+ +v);aRender();break;
 /* entreprise */
 case 'b:tab':b.tab=v;renderBiz();window.scrollTo(0,0);break;case 'b:per':b.period=v;renderBiz();break;
 case 'b:pol':b.policy[v]=!b.policy[v];renderBiz();break;
 case 'b:appr':{const [id,r]=v.split('|');const x=b.appr.find(z=>z.id==id);x.done=r;logAudit(`${L('Approbation entreprise','Business approval')} — ${x.who} : ${r==='ok'?L('approuvée','approved'):L('refusée','declined')}`);renderBiz();break}
 case 'b:csv':{const rows=[['invoice','period','amount_'+curCode(),'jobs'],...Array.from({length:6},(_,i)=>{const mi=(NOW().getMonth()-i+12)%12;return['HC-2026-'+pad(mi+1),MONTHS()[mi],Math.round(BSPEND[11-i]*FX[curCode()]),Math.round(BSPEND[11-i]/690)]})].map(r=>r.join(';')).join('\n');
  try{navigator.clipboard&&navigator.clipboard.writeText(rows).catch(()=>{})}catch(e){}
  const blobSave=()=>{try{const u=URL.createObjectURL(new Blob([rows],{type:'text/csv'}));const l=document.createElement('a');l.href=u;l.download='egide-factures.csv';document.body.appendChild(l);l.click();l.remove()}catch(e){}toast(L('CSV exporté (et copié dans le presse-papiers)','CSV exported (and copied to clipboard)'))};
  if(window.claude&&window.claude.use){window.claude.use('downloads').then(d=>{if(!d)return blobSave();d.save({filename:'egide-factures.csv',data:rows}).then(()=>toast(L('CSV enregistré','CSV saved'))).catch(()=>toast(L('Téléchargement annulé — CSV copié','Download cancelled — CSV copied')))}).catch(blobSave)}else blobSave();break}
 /* ops */
 case 'o:tab':o.tab=v;renderOps();window.scrollTo(0,0);break;case 'o:per':o.period=v;renderOps();break;case 'o:mf':o.mf=v;renderOps();break;
 case 'o:ack':{const x=o.alerts.find(z=>z.id==v);if(x){x.ack=true;x.rt=Math.max(4,Math.round((Date.now()-(x.t0||Date.now()))/1000));logAudit(L('Alerte prise en charge : ','Alert handled: ')+x.t)}renderOps();break}
 case 'o:comp':{const [id,r]=v.split('|');const x=o.comp.find(z=>z.id==id);x.done=r;logAudit(`${L('Conformité','Compliance')} ${x.who} — ${x.doc} : ${r==='ok'?L('validé','approved'):L('suspendu','suspended')}`);renderOps();break}
 case 'o:kyc':{const [id,r]=v.split('|');const x=o.kyc.find(z=>z.id==id);x.done=r;logAudit(`Client ${x.who} : ${r==='ok'?L('accepté','accepted'):L('refusé (motivé)','refused (reasoned)')}`);renderOps();break}
 }}
window.act=act;
document.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(!el)return;e.preventDefault();e.stopPropagation();act(el.dataset.a,el.dataset.v,el)});

function resetClient(){stopAnim('c');Object.assign(S.c,{step:'home',dest:null,threat:0,tier:'escorte',hours:2,when:'now',agent:null,mission:null,mRoute:null,mPos:null,agentArrived:false,prot:1})}
/* Les démonstrations guidées programment des étapes différées : on les annule avant d'en lancer une autre. */
let demoT=[];const dT=(f,ms)=>demoT.push(setTimeout(f,ms));
function demo(v){demoT.forEach(clearTimeout);demoT=[];setView('client');resetClient();
 if(v==='book'){cGo('home');dT(()=>act('c:dest','hotel'),500);dT(()=>book(),1500)}
 if(v==='custom'){S.c.dest=PLACES[3];S.c.prot=3;S.c.langs=[city().langs[0][0],'EN'];S.c.female=true;S.c.disc=2;S.c.proto.recon=true;cGo('tiers');dT(()=>cGo('prefs'),700)}
 if(v==='threat'){S.c.dest=PLACES[0];S.c.ctx='harc';S.c.threat=2;S.c.tier='detail';S.c.hours=4;cGo('tiers')}
 if(v==='mismatch'){S.c.dest=PLACES[2];book();dT(()=>{stopAnim('c');S.c.agentPos={x:ME.x+12,y:ME.y+8};S.c.agentArrived=true;cGo('arrived')},3200)}
 if(v==='sos'){S.c.dest=PLACES[3];S.c.agent=AGENTS[3];S.c.mission={id:nextId(),client:'Camille L.',tier:tName('escorte'),agent:AGENTS[3].name+' '+AGENTS[3].last,zone:city().name,st:L('En cours','Live'),lvl:'g',x:480,y:300};S.o.missions.unshift(S.c.mission);startMission();dT(()=>toast(L('Maintenez le bouton SOS 1,2 s','Hold the SOS button for 1.2 s')),400)}
 if(v==='end'){S.c.dest=PLACES[1];S.c.agent=AGENTS[1];S.c.rating=5;S.c.tags=['Discrétion','Ponctualité'];S.c.tip=10;cGo('end')}
 if(v==='activity')cGo('activity')}
function ademo(v){setView('agent');const a=S.a;stopAnim('a');clearInterval(offerC);clearTimeout(offerT);a.stage=null;a.pos=null;aRoute(null);
 if(v==='online'){a.online=false;a.tab='home';aOnline()}
 if(v==='brief'){a.online=true;a.stage='brief';aRender();aMarkers()}
 if(v==='mission'){a.online=true;a.pos={x:AOFF().from.x,y:AOFF().from.y};aStart()}
 if(v==='plan'){a.tab='plan';aRender();aMarkers()}
 if(v==='earn'){a.tab='earn';aRender();aMarkers()}
 if(v==='docs'){a.tab='profile';aRender();aMarkers()}}
function clk(){const d=NOW();document.querySelectorAll('.clk').forEach(e=>e.textContent=hhmm(d))}
setInterval(()=>{clk();const c=S.c;if(c.step==='mission'){c.elapsed+=1;const e=$('#mtime');if(e){e.textContent=fmtMin(c.elapsed)+' '+L('écoulées sur','elapsed of')+' '+c.hours+' h';e.previousElementSibling.firstElementChild.style.width=Math.min(100,c.elapsed/(c.hours*60)*100)+'%'}}
 const a=S.a;if(a.stage==='mission'){a.elapsed+=1;const e=$('#amtime');if(e){e.textContent=fmtMin(a.elapsed)+' / '+AOFF().h+' h';e.previousElementSibling.firstElementChild.style.width=Math.min(100,a.elapsed/(AOFF().h*60)*100)+'%'}}
 if(S.view==='ops'&&o_live())renderOps()},1000);
function o_live(){return S.o.tab==='live'&&(++S.tick%4===0)}
matchMedia('(prefers-color-scheme: light)').addEventListener&&matchMedia('(prefers-color-scheme: light)').addEventListener('change',()=>{if(P.theme==='auto')applyP()});

/* boot */
applyP();buildCity();seedOps();
S.b.appr=[{id:1,who:'Sana Benali',tier:'detail',h:6,city:CFG.cities[Math.min(2,CFG.cities.length-1)].name,why:L('Au-delà du seuil d’approbation','Above approval threshold'),eur:3240},{id:2,who:'Paul Martin',tier:'prive',h:4,city:CFG.cities[0].name,why:L('Gamme au-dessus du niveau du collaborateur','Tier above employee level'),eur:820},{id:3,who:'Hugo Lenoir',tier:'mobilite',h:3,city:CFG.cities[1].name,why:L('Mission de nuit','Night job'),eur:960}];
renderAll();
