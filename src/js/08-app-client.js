/* ================= APP CLIENT ================= */
const TAGS=['Discrétion','Ponctualité','Anticipation','Courtoisie','Tenue','Itinéraire'],TAGS_EN=['Discretion','Punctuality','Anticipation','Courtesy','Dress','Route'];
function cTabbar(){const c=S.c;return `<div class="tabbar">${[['home','home',L('Accueil','Home')],['activity','chart',L('Activité','Activity')],['account','user',L('Compte','Account')]].map(t=>`<button class="${c.step===t[0]?'on':''}" data-a="c:go" data-v="${t[0]}">${I(t[1])}${t[2]}</button>`).join('')}</div>`}
function cRail(){return `<h1>${L('Protection rapprochée,<br>en deux gestes.','Close protection,<br>in two taps.')}</h1>
 <p class="lead">${L('App client. Chaque agent détient le titre exigé localement','Client app. Every officer holds the locally required licence')} (${reg().body}), ${L('contrôlé avant chaque mission.','checked before every mission.')}</p>
 <div class="grp"><h4>${L('Démo guidée','Guided demo')}</h4>
 ${[['book',L('Réserver une escorte (raccourci → confirmer)','Book an escort (shortcut → confirm)')],['custom',L('Personnaliser : protégés, langues, protocoles','Customise: principals, languages, protocols')],['threat',L('Menace identifiée → évaluation humaine','Identified threat → human assessment')],['mismatch',L('Code de rencontre non conforme','Meeting code mismatch')],['sos',L('Déclencher un SOS (visible en Opérations)','Trigger SOS (shown in Operations)')],['end',L('Fin de mission, note, facture','End of mission, rating, invoice')],['activity',L('Tableau de bord client','Client dashboard')]].map((x,i)=>`<button class="jump" data-a="demo" data-v="${x[0]}"><span class="n">${i+1}</span>${x[1]}</button>`).join('')}</div>
 <div class="grp"><h4>${L('Fonctionnalités','Features')}</h4><div class="feat">${(P.lang==='en'?['<b>6 tiers</b>','<b>Upfront</b> price','<b>Live</b> tracking','<b>Meeting</b> code','<b>Schedule</b> & repeat','<b>Multi</b>-principal','<b>Favourite</b> officers','<b>Airport</b> meet','<b>Protocols</b>','<b>Discretion</b> level','<b>SOS</b> long-press','<b>Duress</b> word','<b>Safe</b> arrival check','<b>Business</b> account','<b>Cercle</b> plan','<b>Local</b> compliance']:['<b>6 gammes</b>','<b>Prix</b> affiché avant','<b>Suivi</b> en direct','<b>Code</b> de rencontre','<b>Planifier</b> & récurrence','<b>Multi</b>-protégés','<b>Agents</b> favoris','<b>Accueil</b> aéroport','<b>Protocoles</b>','<b>Niveau</b> de discrétion','<b>SOS</b> appui long','<b>Mot</b> de détresse','<b>Arrivée</b> confirmée','<b>Compte</b> entreprise','<b>Cercle</b> abonnement','<b>Conformité</b> locale']).map(x=>`<span>${x}</span>`).join('')}</div></div>`}
function cMarkers(extra){const c=S.c;let s='';
 if(['home','dest','tiers','search','city'].includes(c.step))AGENTS.forEach(a=>s+=mkAgent(a.x,a.y,false));
 if(c.dest&&!['home','dest','city'].includes(c.step))s+=mkDest(c.dest.x,c.dest.y);
 s+=extra||'';if(!(c.step==='mission'||(c.step==='sos'&&c.mPos)))s+=mkMe(ME.x,ME.y);
 const g=$('#cm-mk');g&&(g.innerHTML=s)}
function cRoute(pts,dash){const g=$('#cm-rt');g&&(g.innerHTML=pts?`<polyline points="${polyStr(pts)}" fill="none" stroke="var(--t1)" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" ${dash?'stroke-dasharray="1 9" opacity=".7"':''}/>`:'')}
const tName=id=>LT(T(id).nm);
function agentCard(a){return `<div class="agent" style="margin-top:12px"><div class="av">${a.ini}<span class="vf">${I('check')}</span></div><div style="flex:1;min-width:0"><div style="display:flex;justify-content:space-between"><b style="font-size:16px">${a.name} ${a.last}</b><span class="sm">${I('star','s')} ${a.r.toFixed(2)}</span></div>
 <div class="xs dim" style="margin-top:2px">${a.m} missions · ${a.yrs} ${L('ans d’exp.','yrs exp.')} · ${a.langs.join(' / ')}</div><div class="tags">${a.spec.map(x=>`<span>${P.lang==='en'?SPEC_EN[x]:x}</span>`).join('')}${a.certs.slice(0,2).map(x=>`<span>${x}</span>`).join('')}</div>
 <div class="xs" style="margin-top:6px;color:var(--ok)">${I('check','s')} ${reg().body} · ${a.card} · ${L('vérifié aujourd’hui','verified today')}</div></div></div>`}
function fmtMin(m){m=Math.floor(m);return m>=60?Math.floor(m/60)+' h '+pad(m%60):m+' min'}
function greet(){const h=NOW().getHours();return h<5?L('Bonne nuit','Good night'):h<18?L('Bonjour','Hello'):L('Bonsoir','Good evening')}
function placeList(q){q=(q||'').toLowerCase();return PLACES.filter(p=>(p.label+p.sub).toLowerCase().includes(q)).map(p=>`<button class="li" data-a="c:dest" data-v="${p.id}"><span class="lic">${I(p.ic||'pin','s')}</span><div class="tx"><b>${p.label}</b><span>${p.sub}</span></div>${I('chev','s')}</button>`).join('')||`<div class="li"><div class="tx"><span>${L('Adresse libre acceptée en production','Free-text address accepted in production')}</span></div></div>`}
window.filterPlaces=v=>{$('#plist').innerHTML=placeList(v)};

function cRender(){
 const c=S.c,u=$('#c-ui');let h='';
 const top=`<div class="float"><button class="fab" data-a="c:go" data-v="account">${I('user')}</button><button class="fab txt" data-a="c:go" data-v="city">${I('pin','s')}${city().name}${I('down','s')}</button><button class="fab txt" data-a="c:go" data-v="safety">${I('shield','s')}${L('Sécurité','Safety')}</button></div>`;
 switch(c.step){
 case 'home':{const up=c.planned[0];
  h=top+`<div class="sheet" style="padding-bottom:96px"><div class="grab"></div><h2>${greet()}.</h2>
  <button class="search" data-a="c:go" data-v="dest">${I('search')}<span>${L('Où vous accompagne-t-on ?','Where are we escorting you?')}</span><span class="when">${I('clock','s')}${L('Maintenant','Now')}</span></button>
  <div class="short">${PLACES.slice(0,3).map(p=>`<button data-a="c:dest" data-v="${p.id}">${I(p.ic,'s')}<b>${p.label}</b><span>${p.sub}</span></button>`).join('')}</div>
  ${up?`<div class="banner b">${I('cal','s')}<div><b>${L('Planifiée','Scheduled')}</b> · ${up}</div></div>`:''}
  <div class="lbl">${L('Vos agents favoris','Your favourite officers')}</div><div class="favs">${c.favs.map(id=>AGENTS.find(a=>a.id===id)).filter(Boolean).map(a=>`<button data-a="c:fav" data-v="${a.id}"><div class="av md">${a.ini}<span class="vf">${I('check')}</span></div>${a.name}</button>`).join('')}<button data-a="toast" data-v="${L('Ajoutez un agent en favori après une mission','Add an officer as favourite after a mission')}"><div class="av md" style="background:var(--s2)">${I('plus')}</div>${L('Ajouter','Add')}</button></div>
  <div class="qcards">
   <button class="qcard" data-a="c:quick" data-v="soir">${I('home')}<div><b>${L('Retour en sécurité','Safe ride home')}</b><br><span>${L('Porte à porte, ce soir','Door to door, tonight')}</span></div></button>
   <button class="qcard" data-a="c:quick" data-v="pro">${I('brief')}<div><b>${L('Rendez-vous d’affaires','Business meeting')}</b><br><span>${L('Costume, discret','Suit, discreet')}</span></div></button>
   <button class="qcard" data-a="c:quick" data-v="event">${I('cal')}<div><b>${L('Événement','Event')}</b><br><span>${L('Équipe sur devis','Team on quote')}</span></div></button>
   <button class="qcard" data-a="c:quick" data-v="voyage">${I('plane')}<div><b>${L('Accueil aéroport','Airport meet')}</b><br><span>${L('Suivi du vol inclus','Flight tracking included')}</span></div></button></div>
  <div class="trust">${I('check','s ok')}<span>${AGENTS.length} ${L('agents vérifiés à proximité','verified officers nearby')} · ${reg().body} · ${LT(reg().country)}</span></div></div>${cTabbar()}`;break}
 case 'city':{
  h=`<div class="full"><div class="hdr" style="margin-bottom:14px"><button class="ib" data-a="c:go" data-v="home">${I('back')}</button><h3>${CFG.market==='fr'?L('Implantations','Locations'):L('Villes & pays','Cities & countries')}</h3></div>
  <p class="sm muted" style="margin-bottom:10px">${L('Chaque ville est opérée par une entité locale titulaire des autorisations du pays. Prix, devise, numéros d’urgence et règles d’armement s’adaptent.','Each city is run by a local entity holding that country’s licences. Price, currency, emergency numbers and firearm rules adapt.')}</p>
  <div class="list">${CFG.cities.map((ct,i)=>{const r=REG[ct.reg];return `<button class="li" data-a="city" data-v="${i}"><span class="lic" style="font-size:11px;font-weight:700">${r.flag}</span><div class="tx"><b>${ct.name}</b><span>${r.body} · ${ct.cur} · ${L('urgence','emergency')} ${ct.emerg[0][0]}</span></div>${i===S.city?I('check','s ac'):I('chev','s')}</button>`}).join('')}</div></div>`;break}
 case 'dest':{
  h=`<div class="full"><div class="hdr" style="margin-bottom:16px"><button class="ib" data-a="c:go" data-v="home">${I('back')}</button><h3>${L('Destination','Destination')}</h3></div>
  <div class="seg2" style="margin-bottom:12px"><button class="${c.when==='now'?'on':''}" data-a="c:when" data-v="now">${L('Maintenant','Now')}</button><button class="${c.when==='later'?'on':''}" data-a="c:when" data-v="later">${L('Planifier','Schedule')}</button></div>
  ${c.when==='later'?planRow():''}
  <div class="search" style="background:var(--s2)">${I('search')}<input id="q" placeholder="${L('Adresse, lieu, hôtel…','Address, venue, hotel…')}" autocomplete="off" oninput="filterPlaces(this.value)"></div>
  <div class="list" id="plist">${placeList('')}</div></div>`;break}
 case 'tiers':h=vTiers();break;
 case 'search':h=`<div class="sheet"><div class="grab"></div><h3>${L('Recherche de votre agent…','Finding your officer…')}</h3><p class="sm muted" style="margin-top:4px">${tName(c.tier)} · ${c.hours} h · ${c.prot} ${L('protégé(s)','principal(s)')}</p>
  <div class="checks" id="chk"><div><span class="ck">${I('check')}</span>${L('Titre','Licence')} ${reg().body} ${L('valide','valid')}</div><div><span class="ck">${I('check')}</span>${L('Assurance et formation à jour','Insurance and training up to date')}</div><div><span class="ck">${I('check')}</span>${L('Profil','Profile')} : ${c.female?L('agent femme · ','female officer · '):''}${c.langs.join('/')} · ${dressName(c.dress)}</div><div><span class="ck">${I('check')}</span>${L('Disponibilité confirmée','Availability confirmed')}</div></div>
  <button class="btn sec sm" data-a="c:cancel" style="margin-top:12px">${L('Annuler','Cancel')}</button></div>`;break;
 case 'assigned':{const a=c.agent;
  h=top+`<div class="sheet"><div class="grab"></div><div class="eta"><b id="etaN">${c.eta}</b><span class="muted">min · ${a.name} ${L('arrive','is on the way')}</span></div>${agentCard(a)}
  <div class="code"><div><div class="xs dim" style="margin-bottom:2px">${L('CODE DE RENCONTRE','MEETING CODE')}</div><span class="sm muted">${a.name} ${L('doit vous l’annoncer','must say it to you')}</span></div><b>${c.code}</b></div>
  <div class="acts"><button data-a="c:go" data-v="chat">${I('chat')}${L('Message','Message')}</button><button data-a="toast" data-v="${L('Appel masqué — votre numéro n’est jamais communiqué','Masked call — your number is never shared')}">${I('phone')}${L('Appeler','Call')}</button><button data-a="c:share">${I('share')}${L('Partager','Share')}</button><button data-a="c:go" data-v="safety">${I('shield')}${L('Sécurité','Safety')}</button></div>
  <button class="btn sec sm" data-a="c:cancel" style="margin-top:12px">${L('Annuler · gratuit pendant 2 min','Cancel · free for 2 min')}</button></div>`;break}
 case 'arrived':{const a=c.agent;
  h=`<div class="sheet"><div class="grab"></div><h3>${a.name} ${L('est arrivé.','has arrived.')}</h3><p class="sm muted" style="margin:4px 0 12px">${L('Ne suivez personne avant d’avoir vérifié le code.','Do not follow anyone before checking the code.')}</p>${agentCard(a)}
  <div class="code"><div><div class="xs dim" style="margin-bottom:2px">${L('L’AGENT DOIT DIRE','OFFICER MUST SAY')}</div></div><b>${c.code}</b></div>
  <div class="btns" style="margin-top:14px"><button class="btn sec" data-a="c:mismatch">${L('Ne correspond pas','Doesn’t match')}</button><button class="btn grn" data-a="c:start">${L('Code vérifié','Code verified')}</button></div></div>`;break}
 case 'mismatch':h=`<div class="overlay red"><div class="pulse"><div>${I('alert','l')}</div></div><h2 style="text-align:center">${L('Ne suivez pas cette personne.','Do not follow this person.')}</h2>
  <p style="text-align:center;color:#ffb3ad;margin-bottom:22px">${L('Le centre opérationnel vous appelle et votre agent réel est réassigné.','The operations centre is calling you and your real officer is reassigned.')}</p>
  <div class="list"><div class="li"><span class="lic">${I('phone','s')}</span><div class="tx"><b>${L('Opérateur en ligne','Operator on the line')}</b><span>${L('Appel entrant','Incoming call')}</span></div></div><div class="li"><span class="lic">${I('pin','s')}</span><div class="tx"><b>${L('Position partagée','Location shared')}</b><span>${L('Avec le centre opérationnel','With operations centre')}</span></div></div></div>
  <div style="margin-top:auto" class="btns"><button class="btn sec" data-a="c:go" data-v="home">${L('Fermer','Close')}</button><button class="btn red" data-a="toast" data-v="Démo : ${city().emerg[0][0]}">${L('Appeler le','Call')} ${city().emerg[0][0]}</button></div></div>`;break;
 case 'mission':{const a=c.agent,tot=c.hours*60,pc=Math.min(100,c.elapsed/tot*100);
  h=top+`<div class="sheet"><div class="grab"></div><div style="display:flex;justify-content:space-between;align-items:flex-start"><div><div class="xs dim">${L('MISSION EN COURS','MISSION LIVE')} · ${tName(c.tier).toUpperCase()}</div><h3 style="margin-top:3px">${L('Vers','To')} ${c.dest.label}</h3></div><span class="badge g">${L('Protégé','Protected')}</span></div>
  <div class="prog"><i style="width:${pc}%"></i></div><div class="sm muted" id="mtime">${fmtMin(c.elapsed)} ${L('écoulées sur','elapsed of')} ${c.hours} h</div>
  <div class="agent" style="margin-top:12px;padding:10px 12px"><div class="av sm">${a.ini}</div><div style="flex:1"><b>${a.name} ${a.last}</b><div class="xs dim">${a.card}</div></div><button class="ib" data-a="c:go" data-v="chat">${I('chat','s')}</button></div>
  <div class="acts"><button data-a="c:extend">${I('plus')}+30 min</button><button data-a="c:addagent">${I('people')}+1 ${L('agent','officer')}</button><button data-a="c:share">${I('share')}${L('Partager','Share')}</button><button data-a="c:go" data-v="dest2">${I('pin')}${L('Arrêt','Stop')}</button></div>
  <div class="sos" id="sosb"><i></i><span>${I('alert')} ${L('MAINTENIR POUR SOS','HOLD FOR SOS')}</span></div>
  <button class="btn sec sm" data-a="c:end" style="margin-top:10px">${L('Terminer la mission','End mission')}</button></div>`;break}
 case 'sos':h=`<div class="overlay red"><div class="pulse"><div>${I('alert','l')}</div></div><h2 style="text-align:center">${L('Alerte transmise','Alert sent')}</h2>
  <p style="text-align:center;color:#ffb3ad;margin-bottom:22px">${L('Votre agent et le centre opérationnel sont prévenus.','Your officer and the operations centre have been alerted.')}</p>
  <div class="list">${[[L('Centre opérationnel','Operations centre'),L('Opérateur affecté · rappel immédiat','Operator assigned · immediate callback')],[L('Position en continu','Live location'),L('Partagée avec l’opérateur','Shared with operator')],[L('Contacts de confiance','Trusted contacts'),L('2 personnes prévenues','2 people notified')],[L('Enregistrement audio','Audio recording'),L('Activé · chiffré · 30 jours','On · encrypted · 30 days')]].map(x=>`<div class="li"><span class="lic">${I('check','s ok')}</span><div class="tx"><b>${x[0]}</b><span>${x[1]}</span></div></div>`).join('')}</div>
  <div style="margin-top:auto"><button class="btn red" data-a="toast" data-v="Démo : ${city().emerg[0][0]}">${L('Appeler le','Call')} ${city().emerg[0][0]}</button><button class="btn sec" style="margin-top:10px;background:rgba(255,255,255,.1);color:#fff" data-a="c:sosoff">${L('Fausse alerte · annuler','False alarm · cancel')}</button></div></div>`;break;
 case 'end':{const a=c.agent;
  h=`<div class="sheet tall"><div class="grab"></div><div style="text-align:center"><div class="av" style="margin:6px auto 10px">${a.ini}</div><h3>${L('Comment s’est passée la mission avec','How was your mission with')} ${a.name} ?</h3></div>
  <div class="stars">${[1,2,3,4,5].map(n=>`<button class="${c.rating>=n?'on':''}" data-a="c:rate" data-v="${n}">${I('star')}</button>`).join('')}</div>
  <div class="chips w" style="justify-content:center">${TAGS.map((t,i)=>`<button class="chip ${c.tags.includes(t)?'on':''}" data-a="c:tag" data-v="${t}">${P.lang==='en'?TAGS_EN[i]:t}</button>`).join('')}</div>
  <div class="lbl">${L('Pourboire · 100 % reversé','Tip · 100% to officer')}</div><div class="chips">${[0,10,20,30].map(v=>`<button class="chip ${c.tip===v?'on':''}" data-a="c:tip" data-v="${v}">${v?money(v):L('Aucun','None')}</button>`).join('')}</div>
  <div class="rowl" style="margin-top:8px"><span class="sm">${I('heart','s')} ${L('Ajouter','Add')} ${a.name} ${L('aux favoris','to favourites')}</span><button class="tg ${c.favs.includes(a.id)?'on':''}" data-a="c:favtg" data-v="${a.id}"></button></div>
  <div class="rowl"><span class="sm">${I('home','s')} ${L('Confirmer mon arrivée dans 30 min','Check I got home in 30 min')}</span><button class="tg ${c.safeCheck?'on':''}" data-a="c:tg" data-v="safeCheck"></button></div>
  <button class="btn" style="margin-top:14px" data-a="c:go" data-v="receipt">${L('Envoyer et voir la facture','Submit and view invoice')}</button>
  <button class="btn sec sm" style="margin-top:8px" data-a="toast" data-v="${L('Signalement transmis (réponse sous 24 h)','Report sent (reply within 24 h)')}">${L('Signaler un incident','Report an incident')}</button></div>`;break}
 case 'receipt':h=vReceipt();break;
 case 'safety':h=vSafety();break;
 case 'account':h=vAccount()+cTabbar();break;
 case 'activity':h=vActivity()+cTabbar();break;
 case 'prefs':h=vPrefs();break;
 case 'chat':h=vChat();break;
 case 'eval':h=vEval();break;
 case 'proteges':h=vProteges();break;
 case 'dest2':h=`<div class="full"><div class="hdr" style="margin-bottom:16px"><button class="ib" data-a="c:go" data-v="mission">${I('back')}</button><h3>${L('Ajouter un arrêt','Add a stop')}</h3></div>
  <div class="list">${PLACES.filter(p=>p.id!==c.dest.id).slice(0,5).map(p=>`<button class="li" data-a="c:stop" data-v="${p.id}"><span class="lic">${I(p.ic||'pin','s')}</span><div class="tx"><b>${p.label}</b><span>${p.sub}</span></div></button>`).join('')}</div></div>`;break;
 }
 const old=u.querySelector('.sheet,.full'),same=u._k===c.step,sc=old?old.scrollTop:0;
 u.innerHTML=h;u._k=c.step;const nw=u.querySelector('.sheet,.full');if(same&&nw){nw.style.animation='none';nw.scrollTop=sc}
 if(c.step==='mission')bindSOS('sosb',()=>triggerSOS());
}
const dressName=d=>({Costume:L('costume','suit'),Discrète:L('discrète','low-key'),Sport:'sport'})[d]||d;
function planRow(){const c=S.c;const d=P.lang==='en'?['Today','Tomorrow','Sat','Sun']:['Aujourd’hui','Demain','Sam.','Dim.'];const t=['08:00','12:30','18:00','20:00','23:00'];
 return `<div class="chips" style="margin-bottom:8px">${d.map((x,i)=>`<button class="chip ${c.day===i?'on':''}" data-a="c:day" data-v="${i}">${x}</button>`).join('')}</div>
 <div class="chips" style="margin-bottom:8px">${t.map(x=>`<button class="chip ${c.time===x?'on':''}" data-a="c:time" data-v="${x}">${x}</button>`).join('')}</div>
 <div class="chips" style="margin-bottom:14px">${[['once',L('Une fois','Once')],['week',L('Chaque semaine','Weekly')],['wd',L('Jours ouvrés','Weekdays')]].map(x=>`<button class="chip ${c.rec===x[0]?'on':''}" data-a="c:rec" data-v="${x[0]}">${I('repeat','s')} ${x[1]}</button>`).join('')}</div>`}
function armedState(){const a=reg().armed;return a==='no'?{dis:true,txt:LT(reg().armedTxt)}:{dis:false,txt:LT(reg().armedTxt)}}
function vTiers(){
 const c=S.c,menace=c.threat===2,t=T(c.tier),q=quote(c.tier,c.hours,c.prot),arm=armedState();
 const allowed=id=>(menace?['detail','renforce'].includes(id):true)&&!(id==='renforce'&&arm.dis);
 const row=x=>{const qq=quote(x.id,Math.max(x.min||0,c.hours),c.prot);
  return `<button class="tier ${c.tier===x.id?'on':''} ${allowed(x.id)?'':'off'}" data-a="c:tier" data-v="${x.id}"><span class="ic">${I(x.ic)}</span><div style="min-width:0"><div class="nm">${LT(x.nm)}${x.quote?`<span class="badge">${L('Devis','Quote')}</span>`:''}${x.dossier?`<span class="badge ${arm.dis?'r':'w'}">${arm.dis?L('Non autorisé','Not permitted'):L('Dossier','On file')}</span>`:''}</div><div class="ds">${x.dossier&&arm.dis?arm.txt:LT(x.ds)}</div></div>
  <div class="pr">${qq?money(qq.ttc):'—'}<small>${qq?(c.when==='now'?x.eta+' min':L('confirmé J-1','confirmed D-1')):x.quote?'< 1 h':L('48–72 h','48–72 h')}</small></div></button>`};
 let cta;if(menace)cta=`<button class="btn" data-a="c:eval" data-v="menace">${L('Demander une évaluation · rappel < 10 min','Request assessment · callback < 10 min')}</button>`;
 else if(t.quote)cta=`<button class="btn" data-a="c:eval" data-v="event">${L('Demander un devis','Request a quote')}</button>`;
 else if(t.dossier)cta=`<button class="btn" data-a="c:eval" data-v="renforce">${L('Ouvrir un dossier d’évaluation','Open an assessment file')}</button>`;
 else cta=`<button class="btn" data-a="c:book">${c.when==='now'?L('Confirmer','Confirm'):L('Planifier','Schedule')} ${tName(c.tier)} · ${money(q.ttc)}</button>`;
 const surge=S.o.surge[S.city]||1,air=c.dest&&c.dest.air;
 return `<div class="sheet tall"><div class="grab"></div>
 <div class="hdr"><button class="ib" data-a="c:go" data-v="dest">${I('back')}</button><div class="route"><div><i class="dot me"></i>${L('Position actuelle','Current location')}</div><div><i class="dot dst"></i>${c.dest.label} <span>${c.dest.sub}</span></div></div></div>
 ${c.when==='later'?`<div class="banner b">${I('cal','s')}<div>${L('Planifiée','Scheduled')} · ${[L('Aujourd’hui','Today'),L('Demain','Tomorrow'),L('Samedi','Saturday'),L('Dimanche','Sunday')][c.day]} ${c.time}${c.rec!=='once'?' · '+I('repeat','s')+' '+(c.rec==='week'?L('chaque semaine','weekly'):L('jours ouvrés','weekdays')):''}</div></div>`:''}
 <div class="lbl">${L('Contexte','Context')}</div><div class="chips">${CTX.map(x=>`<button class="chip ${c.ctx===x[0]?'on':''}" data-a="c:ctx" data-v="${x[0]}">${LT(x[1])}</button>`).join('')}</div>
 <div class="seg2">${[L('Préventif','Preventive'),L('Exposé','Exposed'),L('Menace identifiée','Identified threat')].map((x,i)=>`<button class="${c.threat===i?'on':''} ${i===2&&c.threat===2?'red':''}" data-a="c:threat" data-v="${i}">${x}</button>`).join('')}</div>
 ${menace?`<div class="banner r">${I('alert','s')}<div>${L('Une menace identifiée nécessite une <b>évaluation par un chef de mission</b>. Danger immédiat :','An identified threat requires <b>assessment by a team lead</b>. Immediate danger:')} <b>${city().emerg.map(e=>e[0]).join(' / ')}</b>.</div></div>`:''}
 ${c.ctx==='harc'&&!menace?`<div class="banner y">${I('info','s')}<div>${L('Un agent protège votre intégrité physique ; il ne peut ni enquêter, ni agir contre un tiers. Nous pouvons vous accompagner pour porter plainte.','An officer protects your physical safety; they cannot investigate or act against a third party. We can accompany you to file a complaint.')}</div></div>`:''}
 ${surge>1?`<div class="banner y">${I('bolt','s')}<div>${L('Forte demande','High demand')} ×${surge.toFixed(2)}, ${L('affiché avant confirmation','shown before confirming')}.</div></div>`:''}
 ${air?`<div class="lbl">${L('Accueil aéroport','Airport meet')}</div><div class="search" style="background:var(--s2);height:46px">${I('plane','s')}<input id="flt" value="${c.flight}" placeholder="${L('N° de vol (ex. AF1234)','Flight no. (e.g. BA304)')}" oninput="S.c.flight=this.value"></div>`:''}
 <div class="tiers">${TIERS.map(row).join('')}</div>
 ${!t.quote&&!t.dossier&&!menace?`<div class="rowl"><span>${L('Durée','Duration')} <span class="xs dim">· min. ${t.min} h</span></span><div class="step"><button data-a="c:h" data-v="-1">−</button><b>${c.hours} h</b><button data-a="c:h" data-v="1">+</button></div></div>
 <div class="rowl"><span>${L('Personnes protégées','Principals')} <span class="xs dim">${c.prot>(t.n===2?3:2)?'· +25 % / '+L('pers.','pers.'):''}</span></span><div class="step"><button data-a="c:prot" data-v="-1">−</button><b>${c.prot}</b><button data-a="c:prot" data-v="1">+</button></div></div>`:''}
 <button class="rowl" style="width:100%" data-a="c:go" data-v="prefs"><span>${L('Préférences & protocoles','Preferences & protocols')} <span class="xs dim">· ${c.female?L('Agent femme · ','Female · '):''}${c.langs.join('/')} · ${dressName(c.dress)} · ${[L('visible','visible'),L('discret','discreet'),L('invisible','invisible')][c.disc]}</span></span>${I('chev','s')}</button>
 <button class="pay" data-a="c:pay">${I('card','s')}<span>${c.payAcct==='perso'?'Visa •••• 4242 · <b>'+L('Personnel','Personal')+'</b>':'<b>Hélios Conseil</b> · '+L('centre de coût','cost centre')+' '+c.cc}</span><span style="margin-left:auto" class="xs">${L('Changer','Change')}</span></button>
 ${cta}<p class="xs dim" style="margin-top:10px;text-align:center">${L('Prix TTC ferme · minutes supplémentaires au prorata · annulation gratuite 2 min','Fixed price incl. tax · extra minutes pro rata · free cancellation 2 min')}</p></div>`}
function vPrefs(){const c=S.c,LG=['FR','EN','ES','AR','IT','DE','RU','ZH','PT'];
 const tg=(k,lab,sub)=>`<div class="li"><div class="tx"><b>${lab}</b><span>${sub}</span></div><button class="tg ${c.proto[k]?'on':''}" data-a="c:proto" data-v="${k}"></button></div>`;
 return `<div class="full"><div class="hdr" style="margin-bottom:12px"><button class="ib" data-a="c:back2">${I('back')}</button><h3>${L('Préférences & protocoles','Preferences & protocols')}</h3></div>
 <div class="lbl">${L('Agent','Officer')}</div><div class="chips w"><button class="chip ${c.female?'on':''}" data-a="c:female">${L('Agent femme','Female officer')}</button><button class="chip ${c.favOnly?'on':''}" data-a="c:favonly">${L('Favoris en priorité','Favourites first')}</button></div>
 <div class="lbl">${L('Langues parlées (multi)','Languages (multi)')}</div><div class="chips w">${LG.map(l=>`<button class="chip ${c.langs.includes(l)?'on':''}" data-a="c:lang" data-v="${l}">${l}</button>`).join('')}</div>
 <div class="lbl">${L('Tenue','Dress')}</div><div class="chips">${['Costume','Discrète','Sport'].map(d=>`<button class="chip ${c.dress===d?'on':''}" data-a="c:dress" data-v="${d}">${dressName(d)}</button>`).join('')}</div>
 <div class="lbl">${L('Niveau de discrétion','Discretion level')}</div><div class="seg2">${[L('Visible','Visible'),L('Discret','Discreet'),L('Invisible','Invisible')].map((x,i)=>`<button class="${c.disc===i?'on':''}" data-a="c:disc" data-v="${i}">${x}</button>`).join('')}</div>
 <p class="xs dim" style="margin-top:6px">${[L('Présence dissuasive, au contact.','Deterrent presence, close contact.'),L('Proximité sans signe distinctif.','Nearby, no visible signs.'),L('Distance de sécurité, contact radio.','Safe distance, radio contact.')][c.disc]}</p>
 <div class="lbl">${L('Véhicule (Mobilité)','Vehicle (Mobility)')}</div><div class="chips">${['Berline','SUV','Van',L('Blindé (devis)','Armoured (quote)')].map(v=>`<button class="chip ${c.veh===v?'on':''}" data-a="c:veh" data-v="${v}">${v}</button>`).join('')}</div>
 <div class="lbl">${L('Protocoles','Protocols')}</div><div class="list">${tg('door',L('Porte à porte','Door to door'),L('L’agent vous raccompagne jusqu’à l’intérieur','Officer escorts you inside'))}${tg('hall',L('Attente dans le hall','Wait in lobby'),L('Pendant vos rendez-vous','During your meetings'))}${tg('recon',L('Repérage préalable','Advance recon'),L('Reconnaissance du lieu avant arrivée (+30 min)','Venue recon before arrival (+30 min)'))}${tg('brief',L('Appel de briefing','Briefing call'),L('10 min avant la prise en charge','10 min before pickup'))}</div>
 <div class="lbl">${L('Code promo','Promo code')}</div><div class="search" style="background:var(--s2);height:46px">${I('tag','s')}<input placeholder="EGIDE10" value="${c.promo}" oninput="S.c.promo=this.value"></div>
 <button class="btn" style="margin-top:16px" data-a="c:back2">${L('Enregistrer','Save')}</button>
 <p class="xs dim" style="margin-top:8px;text-align:center">${L('Enregistré comme profil par défaut pour vos prochaines missions.','Saved as your default profile for future missions.')}</p></div>`}
function vReceipt(){const c=S.c,q=quote(c.tier,c.hours,c.prot),a=c.agent,r=reg();const total=q.ttc+c.tip,d=NOW();
 return `<div class="full"><div class="hdr" style="margin-bottom:14px"><button class="ib" data-a="c:go" data-v="home">${I('x')}</button><h3>${L('Facture','Invoice')}</h3></div>
 <div class="xs dim">N° EG-${city().id.slice(0,3).toUpperCase()}-2026-${100000+(c.elapsed*7919)%899999} · ${d.toLocaleDateString(P.lang==='en'?'en-GB':'fr-FR')} · ${hhmm(d)}</div>
 <h2 style="margin:6px 0 2px">${money(total,1)}</h2><p class="sm muted">${tName(c.tier)} · ${c.hours} h · ${a.name} ${a.last}</p>
 <div class="list" style="margin-top:14px"><div class="rowl"><span>${tName(c.tier)} · ${c.hours} h${c.prot>1?' · '+c.prot+' '+L('protégés','principals'):''}</span><b>${money(q.base,1)}</b></div>
 ${q.night>1?`<div class="rowl"><span>${L('Majoration nuit','Night rate')} +${S.o.night} %</span><b>${money(q.base*(q.night-1),1)}</b></div>`:''}${q.surge>1?`<div class="rowl"><span>${L('Forte demande','High demand')} ×${q.surge.toFixed(2)}</span><b>${money(q.ht-q.base*q.night,1)}</b></div>`:''}
 <div class="rowl"><span>${L('Frais de service','Service fee')}</span><b>${money(q.fee,1)}</b></div><div class="rowl"><span>${L('TVA','VAT')} 20 %</span><b>${money(q.tva,1)}</b></div>${c.tip?`<div class="rowl"><span>${L('Pourboire','Tip')}</span><b>${money(c.tip,1)}</b></div>`:''}<div class="rowl"><b>Total</b><b>${money(total,1)}</b></div></div>
 ${c.payAcct==='biz'?`<div class="banner b">${I('brief','s')}<div>${L('Imputé à','Charged to')} Hélios Conseil · ${c.cc} · ${L('facture mensuelle consolidée','consolidated monthly invoice')}</div></div>`:''}
 <div class="legal"><b style="color:var(--t2)">${r.ent}</b> — ${r.body} · ${r.auth} <i>(${L('fictif','fictitious')})</i><br>${L('Agent','Officer')} : ${a.name} ${a.last} — ${a.card} <i>(${L('fictif','fictitious')})</i><br>${LT(r.mention)}${curCode()!=='EUR'?`<br>${L('Montants convertis à titre indicatif (taux de démonstration).','Amounts converted for illustration (demo rates).')}`:''}</div>
 <div class="btns" style="margin-top:16px"><button class="btn sec sm" data-a="toast" data-v="${L('PDF envoyé par e-mail','PDF emailed')}">${I('doc','s')}PDF</button><button class="btn sm" data-a="c:go" data-v="home">${L('Terminé','Done')}</button></div></div>`}
function vSafety(){const c=S.c,ct=city();
 return `<div class="full"><div class="hdr" style="margin-bottom:16px"><button class="ib" data-a="c:back">${I('back')}</button><h3>${L('Centre sécurité','Safety centre')}</h3></div>
 <div class="banner r" style="margin-top:0">${I('alert','s')}<div>${L('Danger immédiat','Immediate danger')} · ${ct.name} : ${ct.emerg.map(e=>`<b>${e[0]}</b> (${e[1]})`).join(', ')}. ${L('ÉGIDE ne remplace pas les forces de l’ordre.','ÉGIDE does not replace law enforcement.')}</div></div>
 <div class="list" style="margin-top:12px">
  <div class="li"><span class="lic">${I('share','s')}</span><div class="tx"><b>${L('Partage automatique du trajet','Auto-share trip')}</b><span>${L('Avec vos contacts de confiance','With trusted contacts')}</span></div><button class="tg ${c.autoshare?'on':''}" data-a="c:tg" data-v="autoshare"></button></div>
  <div class="li"><span class="lic">${I('people','s')}</span><div class="tx"><b>${L('Contacts de confiance','Trusted contacts')}</b><span>Camille · Antoine</span></div>${I('chev','s')}</div>
  <div class="li"><span class="lic">${I('mic','s')}</span><div class="tx"><b>${L('Mot de détresse','Duress word')}</b><span>${L('« parapluie bleu » déclenche une alerte silencieuse','“blue umbrella” triggers a silent alert')}</span></div>${I('chev','s')}</div>
  <div class="li"><span class="lic">${I('alert','s')}</span><div class="tx"><b>${L('SOS par appui long','Long-press SOS')}</b><span>1,2 s · ${L('opérateur + position + contacts','operator + location + contacts')}</span></div><button class="tg ${c.sosOn?'on':''}" data-a="c:tg" data-v="sosOn"></button></div>
  <div class="li"><span class="lic">${I('home','s')}</span><div class="tx"><b>${L('Arrivée confirmée','Safe-arrival check')}</b><span>${L('Relance 30 min après la fin de mission','Prompt 30 min after mission end')}</span></div><button class="tg ${c.safeCheck?'on':''}" data-a="c:tg" data-v="safeCheck"></button></div>
  <div class="li"><span class="lic">${I('eye','s')}</span><div class="tx"><b>${L('Mode discret','Discreet mode')}</b><span>${L('Notifications sans contenu, icône neutre','Contentless notifications, neutral icon')}</span></div><button class="tg ${P.discreet?'on':''}" data-a="pref" data-v="discreet"></button></div></div>
 <div class="lbl">${L('Ce qu’un agent peut — et ne peut pas — faire','What an officer can — and cannot — do')}</div>
 <div class="list"><div class="li"><span class="lic">${I('check','s ok')}</span><div class="tx"><b>${L('Protéger votre intégrité physique','Protect your physical safety')}</b><span>${L('Anticipation, accompagnement, mise à l’abri','Anticipation, escort, extraction')}</span></div></div>
 <div class="li"><span class="lic">${I('x','s bad')}</span><div class="tx"><b>${L('Aucun pouvoir de police','No police powers')}</b><span>${L('Ni contrôle d’identité, ni fouille, ni action contre un tiers','No ID checks, searches or action against third parties')}</span></div></div>
 <div class="li"><span class="lic">${I('lock','s')}</span><div class="tx"><b>${L('Armement','Firearms')} · ${ct.name}</b><span>${LT(reg().armedTxt)}</span></div></div></div></div>`}
function vAccount(){const c=S.c;const it=(ic,t,s,a,v)=>`<button class="li" data-a="${a||'toast'}" data-v="${v||t+' — démo'}"><span class="lic">${I(ic,'s')}</span><div class="tx"><b>${t}</b><span>${s}</span></div>${I('chev','s')}</button>`;
 return `<div class="full" style="padding-bottom:110px"><h2>${L('Compte','Account')}</h2>
 <div class="agent"><div class="av">CL</div><div><b style="font-size:17px">Camille L.</b><div class="xs dim">${L('Identité vérifiée','ID verified')} · ${I('star','s')} 4,96</div></div></div>
 <button class="qcard" style="width:100%;margin-top:12px;min-height:0;gap:8px" data-a="toast" data-v="Cercle — ${money(49)}/${L('mois','month')}"><div style="display:flex;justify-content:space-between;width:100%"><b style="letter-spacing:.2em">CERCLE</b><span class="badge a">${money(49)} / ${L('mois','mo')}</span></div><span>${L('−10 % · affectation prioritaire · chef de mission référent · annulation 30 min','−10% · priority dispatch · dedicated team lead · 30-min cancellation')}</span></button>
 <div class="lbl">${L('Personnalisation','Personalisation')}</div><div class="list">
 ${it('sliders',L('Préférences par défaut','Default preferences'),c.langs.join('/')+' · '+dressName(c.dress),'c:go','prefs')}
 ${it('people',L('Personnes protégées','Principals'),L('Vous + 2 profils (famille)','You + 2 profiles (family)'),'c:go','proteges')}
 ${it('pin',L('Lieux enregistrés','Saved places'),PLACES.slice(0,3).map(p=>p.label).join(' · '))}
 ${it('eye',L('Apparence, langue, devise','Appearance, language, currency'),(P.theme==='light'?L('Clair','Light'):P.theme==='auto'?'Auto':L('Sombre','Dark'))+' · '+P.lang.toUpperCase()+' · '+curCode(),'settings','')}</div>
 <div class="lbl">${L('Paiement & entreprise','Payment & business')}</div><div class="list">
 ${it('brief',L('Compte entreprise','Business account'),'Hélios Conseil · '+L('politique de voyage active','travel policy active'),'view','biz')}
 ${it('card',L('Moyens de paiement','Payment methods'),'Visa •••• 4242 · Apple Pay')}
 ${it('gift',L('Parrainage','Referral'),L('Offrez 1 h, recevez 1 h','Give 1 h, get 1 h'))}</div>
 <div class="lbl">${L('Données','Data')}</div><div class="list">
 ${it('heart',L('Fiche d’urgence (facultative)','Emergency profile (optional)'),L('Chiffrée, visible par l’agent uniquement en mission','Encrypted, visible to officer only during mission'))}
 ${it('lock',L('Confidentialité','Privacy'),L('Conservation 30 j · export · effacement','30-day retention · export · erase'))}
 ${it('shield',L('Devenir agent','Become an officer'),reg().body+' · '+LT(reg().lic).split('·')[0])}</div></div>`}
function vProteges(){return `<div class="full"><div class="hdr" style="margin-bottom:14px"><button class="ib" data-a="c:go" data-v="account">${I('back')}</button><h3>${L('Personnes protégées','Principals')}</h3></div>
 <div class="list">${[['CL','Camille L.',L('Vous · profil principal','You · main profile')],['AL','Antoine L.',L('Conjoint · EN, FR','Spouse · EN, FR')],['JL','Jules L.',L('Enfant · consignes école : remise à l’adulte référent','Child · school protocol: hand-over to named adult')]].map(p=>`<div class="li"><div class="av sm">${p[0]}</div><div class="tx"><b>${p[1]}</b><span>${p[2]}</span></div>${I('chev','s')}</div>`).join('')}</div>
 <button class="btn sec" style="margin-top:14px" data-a="toast" data-v="${L('Ajout de profil — démo','Add profile — demo')}">${I('plus','s')} ${L('Ajouter une personne','Add a person')}</button>
 <p class="xs dim" style="margin-top:10px">${L('Réservez pour un proche : il reçoit le code de rencontre et le suivi, vous gardez la main sur la mission.','Book for someone else: they get the meeting code and tracking; you keep control of the mission.')}</p></div>`}
function vActivity(){const sp=[620,940,410,1280,860,1490],m=last12().slice(6);
 return `<div class="full" style="padding-bottom:110px"><h2>${L('Activité','Activity')}</h2>
 <div class="kv"><div><b>${money(sp.reduce((a,b)=>a+b,0))}</b><span>${L('dépensés · 6 mois','spent · 6 months')}</span></div><div><b>18</b><span>missions</span></div><div><b>41 h</b><span>${L('sous protection','protected')}</span></div><div><b>${money(312)}</b><span>${L('économisés (Cercle)','saved (Cercle)')}</span></div></div>
 <div class="card2"><h4>${L('Dépenses mensuelles','Monthly spend')}</h4>${barChart({w:340,h:170,labels:m,series:[{name:L('Dépenses','Spend'),vals:sp}],fmt:v=>moneyK(v),hl:5})}</div>
 <div class="card2"><h4>${L('Répartition par gamme','By tier')}</h4>${donut([[tName('escorte'),9],[tName('prive'),4],[tName('detail'),2],[tName('mobilite'),3]],'18','missions',130)}</div>
 <div class="card2"><h4>${L('Agents les plus fréquents','Most frequent officers')}</h4>${AGENTS.slice(0,3).map((a,i)=>`<div class="rowl"><div style="display:flex;gap:10px;align-items:center"><div class="av sm">${a.ini}</div><div><b>${a.name} ${a.last}</b><div class="xs dim">${[7,4,2][i]} missions</div></div></div><button class="mini" data-a="c:fav" data-v="${a.id}">${L('Réserver','Book')}</button></div>`).join('')}</div>
 <div class="card2"><h4>${L('Historique','History')}</h4>${[[L('Hier','Yesterday'),'Escorte 2 h',230],['12/11','Détail 4 h',1650],['08/11','Mobilité 3 h',780]].map(x=>`<div class="rowl"><div><b class="sm">${x[1]}</b><div class="xs dim">${x[0]}</div></div><b class="sm">${money(x[2])}</b></div>`).join('')}</div></div>`}
function vChat(){const c=S.c;const a=c.agent||AGENTS[0];if(!c.msgs.length)c.msgs=[{me:false,t:L('Bonsoir, je suis en route.','Hello, I’m on my way.')}];
 return `<div class="full" style="display:flex;flex-direction:column"><div class="hdr" style="margin-bottom:8px"><button class="ib" data-a="c:back">${I('back')}</button><div class="av sm">${a.ini}</div><div><b>${a.name}</b><div class="xs dim">${L('Chiffré · numéros masqués · traduction auto','Encrypted · masked numbers · auto-translate')}</div></div></div>
 <div class="chat">${c.msgs.map(m=>`<div class="msg ${m.me?'me':''}">${m.t}</div>`).join('')}</div>
 <div style="margin-top:auto"><div class="chips" style="margin-bottom:10px">${[L('Je suis à l’entrée principale','I’m at the main entrance'),L('Je porte un manteau noir','I’m wearing a black coat'),L('5 min de retard','Running 5 min late')].map(t=>`<button class="chip" data-a="c:msg" data-v="${t}">${t}</button>`).join('')}</div>
 <div class="search" style="background:var(--s2);height:48px"><input id="msgi" placeholder="Message…" onkeydown="if(event.key==='Enter'&&this.value){act('c:msg',this.value)}"><button class="ib" style="width:34px;height:34px;background:var(--ac);color:#fff" data-a="c:msgi">${I('nav','s')}</button></div></div></div>`}
function vEval(){const k=S.c.evalKind;const M={menace:[L('Évaluation demandée','Assessment requested'),L('Un chef de mission vous rappelle sous 10 minutes. Danger immédiat :','A team lead will call you within 10 minutes. Immediate danger:')+' '+city().emerg[0][0]+'.'],
 event:[L('Demande de devis envoyée','Quote request sent'),L('Équipe dimensionnée et devis ferme sous une heure.','Sized team and firm quote within one hour.')],
 renforce:[L('Dossier ouvert','File opened'),LT(reg().armedTxt)+'. '+L('Analyse de risque documentée et autorisations préalables : jamais à la demande.','Documented risk assessment and prior authorisations: never on demand.')]}[k];
 return `<div class="full"><div class="hdr" style="margin-bottom:24px"><button class="ib" data-a="c:go" data-v="home">${I('x')}</button></div><div class="pulse" style="background:rgba(48,209,88,.18);animation:none"><div style="background:var(--ok);color:#000">${I('check','l')}</div></div>
 <h2 style="text-align:center">${M[0]}</h2><p class="muted" style="text-align:center">${M[1]}</p><button class="btn" style="margin-top:24px" data-a="c:go" data-v="home">${L('Retour à l’accueil','Back home')}</button></div>`}

/* logique client */
let cPrev='home',cPrev2='tiers';
function cGo(step){const c=S.c;if(step==='assigned'&&c.agentArrived)step='arrived';if(['safety','account','chat','activity'].includes(step)&&!['safety','account','chat','activity'].includes(c.step))cPrev=c.step;if(step==='prefs')cPrev2=c.step;c.step=step;cRender();cMarkers(cExtra());cRouteUpdate()}
function cExtra(){const c=S.c;if((c.step==='assigned'||c.step==='arrived')&&c.agent)return mkAgent(c.agentPos.x,c.agentPos.y,true);if(c.step==='mission')return mkAgent(c.mPos.x+10,c.mPos.y+6,true)+mkMe(c.mPos.x,c.mPos.y);if(c.step==='sos'&&c.mPos)return mkSOS(c.mPos.x,c.mPos.y);return ''}
function cRouteUpdate(){const c=S.c;if(c.step==='tiers'&&c.dest)cRoute(manhattan(ME,c.dest),true);else if(c.step==='assigned')cRoute(c.route);else if(c.step==='mission')cRoute(c.mRoute);else cRoute(null)}
function pickAgent(){const c=S.c;let pool=AGENTS.filter(a=>(!c.female||a.f)&&c.langs.some(l=>a.langs.includes(l)));if(c.favOnly){const f=pool.filter(a=>c.favs.includes(a.id));if(f.length)pool=f}if(!pool.length)pool=AGENTS;
 return pool.sort((a,b)=>Math.hypot(a.x-ME.x,a.y-ME.y)-Math.hypot(b.x-ME.x,b.y-ME.y))[0]}
function book(forceAgent){const c=S.c,t=T(c.tier);
 if(c.when==='later'){const d=[L('Aujourd’hui','Today'),L('Demain','Tomorrow'),L('Samedi','Saturday'),L('Dimanche','Sunday')][c.day];c.planned.unshift(`${tName(c.tier)} ${c.hours} h · ${d} ${c.time} → ${c.dest.label}${c.rec!=='once'?' ↻':''}`);
  S.o.missions.unshift({id:nextId(),client:'Camille L.',tier:tName(c.tier),agent:L('Affectation J-1','Assign D-1'),zone:city().name,st:L('Planifiée','Scheduled'),lvl:'y',x:420,y:300});logAudit(`${L('Mission planifiée','Mission scheduled')} ${tName(c.tier)} — ${d} ${c.time}`);toast(L('Mission planifiée — agent confirmé la veille','Mission scheduled — officer confirmed the day before'));c.when='now';cGo('home');return}
 c.step='search';cRender();cMarkers();cRoute(null);
 const mid={id:nextId(),client:'Camille L.',tier:tName(c.tier),agent:'—',zone:city().name,st:L('Affectation','Dispatching'),lvl:'y',x:470,y:310};S.o.missions.unshift(mid);c.mission=mid;
 [0,1,2,3].forEach(i=>setTimeout(()=>{if(S.c.step!=='search')return;const r=document.querySelectorAll('#chk>div')[i];r&&r.classList.add('d')},450+i*520));
 setTimeout(()=>{if(S.c.step==='search')assign(forceAgent)},2700)}
function assign(force){const c=S.c,a=force||pickAgent();c.agent=a;c.agentArrived=false;c.agentPos={x:a.x,y:a.y};c.route=manhattan(a,ME);c.eta=T(c.tier).eta||10;
 c.code=['ATLAS','ORION','SIRIUS','VEGA'][Math.floor(Math.random()*4)]+' '+(10+Math.floor(Math.random()*89));
 if(c.mission){c.mission.agent=a.name+' '+a.last;c.mission.st=L('En route','En route')}logAudit(`${L('Affectation','Dispatch')} ${c.mission?c.mission.id:''} → ${a.name} ${a.last}`);
 cGo('assigned');const eta0=c.eta;
 animate('c',8000,t=>{c.agentPos=along(c.route,t);const n=Math.max(1,Math.ceil(eta0*(1-t)));if(c.eta!==n){c.eta=n;const e=$('#etaN');e&&(e.textContent=n)}cMarkers(cExtra());if(c.step==='assigned')cRoute(rest(c.route,t))},
  ()=>{c.agentPos={x:ME.x+12,y:ME.y+8};c.agentArrived=true;if(S.c.step==='assigned')cGo('arrived')})}
function startMission(){const c=S.c;c.elapsed=0;c.mPos={...ME};c.mRoute=manhattan(ME,c.dest);if(c.mission){c.mission.st=L('En cours','Live');c.mission.lvl='g'}
 logAudit(L('Début de mission ','Mission started ')+(c.mission?c.mission.id:''));cGo('mission');animate('c',22000,t=>{c.mPos=along(c.mRoute,t);cMarkers(cExtra())})}
function bindSOS(id,fn){const b=document.getElementById(id);if(!b)return;let tm;const on=e=>{e.preventDefault();b.classList.add('hold');tm=setTimeout(fn,1200)},off=()=>{b.classList.remove('hold');clearTimeout(tm)};
 b.addEventListener('pointerdown',on);['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,off))}
function triggerSOS(src){const c=S.c;if(src!=='agent'){stopAnim('c');c.step='sos';cRender();cMarkers(cExtra())}
 const who=src==='agent'?L('Agent','Officer')+' '+AGENTS[0].name+' '+AGENTS[0].last:'Client Camille L.';
 S.o.alerts.unshift({id:Date.now(),t:`SOS — ${who}`,d:`${city().name} · ${L('position transmise','location sent')} · ${hhmm(NOW())}`,lvl:'r',ack:false,t0:Date.now()});
 logAudit(`${L('ALERTE SOS','SOS ALERT')} — ${who}`);updateSideCount();if(src!=='agent')toast(L('SOS transmis — visible dans Opérations','SOS sent — visible in Operations'))}

