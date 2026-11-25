/* ================= CORE ================= */
const REG={
 fr:{short:'CNAPS',sub:'France SAS',flag:'FR',country:{fr:'France',en:'France'},body:'CNAPS',ent:'ÉGIDE France SAS',cardP:'CAR-075-2029-',lic:{fr:'Carte professionnelle (5 ans) · autorisation d’exercice · agrément dirigeant',en:'Professional card (5 yrs) · operating authorisation · manager approval'},
  armed:'dossier',armedTxt:{fr:'Risque exceptionnel uniquement, autorisation nominative ≤ 1 an',en:'Exceptional risk only, named authorisation ≤ 1 year'},
  mention:{fr:'« L’autorisation d’exercice ne confère aucun caractère officiel à l’entreprise ou aux personnes qui en bénéficient. Elle n’engage en aucune manière la responsabilité des pouvoirs publics. » (L612-14/15 CSI — à valider par avocat)',en:'“The operating authorisation confers no official status on the company or its staff and in no way engages the responsibility of public authorities.” (Art. L612-14/15 CSI — to be validated by counsel)'},
  note:{fr:'Activité exclusive (L612-2) ; ancienne qualité police/armée interdite sur les profils (L612-15).',en:'Exclusive activity (L612-2); former police/military status may not be advertised (L612-15).'},auth:'AUT-075-2031-•••'},
 uk:{short:'SIA',sub:'UK Ltd',flag:'GB',country:{fr:'Royaume-Uni',en:'United Kingdom'},body:'SIA',ent:'ÉGIDE UK Ltd',cardP:'SIA CP •••• ',lic:{fr:'Licence SIA Close Protection (3 ans, qualification niveau 3)',en:'SIA Close Protection licence (3 yrs, Level 3 qualification)'},
  armed:'no',armedTxt:{fr:'Les agents privés ne portent pas d’arme au Royaume-Uni',en:'Private close protection officers do not carry firearms in the UK'},
  mention:{fr:'Agents titulaires d’une licence SIA Close Protection en cours de validité.',en:'Operatives hold a valid SIA Close Protection licence.'},
  note:{fr:'Une licence étrangère ne permet pas d’exercer au Royaume-Uni sans licence SIA.',en:'Overseas accreditation does not permit licensable work in the UK without an SIA licence.'},auth:'Companies House ••••••••'},
 de:{short:'§34a GewO',sub:'Deutschland GmbH',flag:'DE',country:{fr:'Allemagne',en:'Germany'},body:'Gewerbeamt · IHK',ent:'ÉGIDE Deutschland GmbH',cardP:'Bewacher-ID ••••',lic:{fr:'Autorisation §34a GewO + Sachkundeprüfung (IHK)',en:'§34a GewO permit + Sachkundeprüfung (IHK)'},
  armed:'permit',armedTxt:{fr:'L’autorisation §34a n’autorise pas le port d’arme : permis d’arme et justification du besoin',en:'§34a permit does not cover weapons: firearm licence and demonstrated need required'},
  mention:{fr:'Entreprise titulaire d’une autorisation §34a GewO.',en:'Company holds a §34a GewO permit.'},
  note:{fr:'Assurance responsabilité obligatoire ; inscription au registre des gardes (Bewacherregister).',en:'Mandatory liability insurance; guards registered in the Bewacherregister.'},auth:'§34a GewO ••••'},
 es:{short:'Interior',sub:'España S.L.',flag:'ES',country:{fr:'Espagne',en:'Spain'},body:'Ministerio del Interior',ent:'ÉGIDE España S.L.',cardP:'TIP nº •••••',lic:{fr:'Habilitation « escolta privado » (TIP) — Ley 5/2014',en:'“Escolta privado” licence (TIP) — Ley 5/2014'},
  armed:'permit',armedTxt:{fr:'Selon habilitation et licence d’arme — à vérifier',en:'Subject to licence and firearm permit — to verify'},
  mention:{fr:'Empresa de seguridad inscrita en el Registro del Ministerio del Interior.',en:'Security company registered with the Spanish Ministry of the Interior.'},
  note:{fr:'Habilitation personnelle délivrée par le ministère de l’Intérieur.',en:'Individual licence issued by the Ministry of the Interior.'},auth:'Reg. MIR ••••'},
 ch:{short:'Canton',sub:'Suisse SA',flag:'CH',country:{fr:'Suisse',en:'Switzerland'},body:'Police cantonale',ent:'ÉGIDE Suisse SA',cardP:'Concordat GE-••••',lic:{fr:'Autorisation concordataire (4 ans, cantons romands) — pas de loi fédérale',en:'Concordat authorisation (4 yrs, French-speaking cantons) — no federal law'},
  armed:'permit',armedTxt:{fr:'Permis de port d’arme cantonal',en:'Cantonal carry permit'},
  mention:{fr:'Entreprise autorisée au sens du concordat du 18 octobre 1996.',en:'Company authorised under the Concordat of 18 Oct 1996.'},
  note:{fr:'Régimes différents à Berne et Zurich : une autorisation par canton de siège.',en:'Bern and Zurich have their own regimes: one authorisation per seat canton.'},auth:'CES ••••'},
 ae:{short:'SIRA',sub:'Security LLC',flag:'AE',country:{fr:'Émirats (Dubaï)',en:'UAE (Dubai)'},body:'SIRA · Dubai Police',ent:'ÉGIDE Security LLC',cardP:'SIRA ••••••',lic:{fr:'Licence société SIRA (annuelle) + carte individuelle ; licence « mainland » obligatoire',en:'SIRA company licence (annual) + individual cadre card; mainland licence required'},
  armed:'permit',armedTxt:{fr:'Cadre SIRA / ministère de l’Intérieur — à vérifier',en:'SIRA / Ministry of Interior framework — to verify'},
  mention:{fr:'Licensed by the Security Industry Regulatory Agency (SIRA), Dubai.',en:'Licensed by the Security Industry Regulatory Agency (SIRA), Dubai.'},
  note:{fr:'Une entité de zone franche ne peut pas déployer d’agents sur le terrain.',en:'A free-zone entity cannot deploy officers on the ground.'},auth:'SIRA ••••'},
 usny:{short:'NYS DOS',sub:'Inc. (NY)',flag:'US',country:{fr:'États-Unis (NY)',en:'United States (NY)'},body:'NYS Dept. of State',ent:'ÉGIDE Protective Services Inc. (NY)',cardP:'NYS Reg. ••••',lic:{fr:'Enregistrement agent (2 ans, 8 h de formation préalable) + licence d’agence',en:'Security Guard registration (2 yrs, 8-hr pre-assignment) + agency licence'},
  armed:'permit',armedTxt:{fr:'Permis de port d’arme NY requis',en:'NY pistol permit required'},
  mention:{fr:'Licensed Watch, Guard or Patrol Agency — NYS Department of State.',en:'Licensed Watch, Guard or Patrol Agency — NYS Department of State.'},
  note:{fr:'Licence d’agence : titulaire de 25 ans minimum, avec expérience requise.',en:'Agency licence holder must be 25+ with qualifying experience.'},auth:'NYS WGP ••••'},
 usca:{short:'BSIS · PPO',sub:'Inc. (CA)',flag:'US',country:{fr:'États-Unis (CA)',en:'United States (CA)'},body:'BSIS',ent:'ÉGIDE Protective Services Inc. (CA)',cardP:'Guard Card G••••',lic:{fr:'Guard Card (2 ans) sous licence PPO — agents non indépendants',en:'Guard Card (2 yrs) under a PPO licence — guards cannot work independently'},
  armed:'permit',armedTxt:{fr:'Permis d’arme apparente BSIS ; port dissimulé = CCW local',en:'BSIS exposed firearm permit; concealed carry needs local CCW'},
  mention:{fr:'Licensed Private Patrol Operator — California BSIS.',en:'Licensed Private Patrol Operator — California BSIS.'},
  note:{fr:'Les agents doivent être employés par un PPO licencié.',en:'Guards must be employed by a licensed PPO.'},auth:'PPO ••••'}
};
const FX={EUR:1,GBP:.87,CHF:.94,AED:4.0,USD:1.09};
const LOC={EUR:'fr-FR',GBP:'en-GB',CHF:'de-CH',AED:'en-AE',USD:'en-US'};

/* préférences (personnalisation) */
const DEFP={theme:'dark',accent:'#0a84ff',lang:CFG.defLang,cur:'auto',units:'km',h12:false,density:'comfort',size:'m',reduce:false,contrast:false,discreet:false};
let P={...DEFP};
try{const s=localStorage.getItem(CFG.storeKey);if(s)P={...DEFP,...JSON.parse(s)}}catch(e){}
function saveP(){try{localStorage.setItem(CFG.storeKey,JSON.stringify(P))}catch(e){}}
const L=(fr,en)=>P.lang==='en'?en:fr;
const LT=o=>o?(P.lang==='en'?o.en:o.fr):'';
function applyP(){const d=document.documentElement;
 const th=P.theme==='auto'?(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'):P.theme;
 d.dataset.theme=th;d.dataset.density=P.density;d.dataset.reduce=P.reduce?'on':'off';d.dataset.contrast=P.contrast?'high':'';
 d.style.setProperty('--ac',P.accent);d.lang=P.lang;
 document.getElementById('app').style.zoom={s:.92,m:1,l:1.1}[P.size]||1}

/* utilitaires */
const $=s=>document.querySelector(s);
const pad=n=>String(n).padStart(2,'0');
const NOW=()=>new Date();
function hhmm(d){if(!P.h12)return pad(d.getHours())+':'+pad(d.getMinutes());let h=d.getHours()%12||12;return h+':'+pad(d.getMinutes())+(d.getHours()<12?' am':' pm')}
const city=()=>CFG.cities[S.city];
const reg=()=>REG[city().reg];
const curCode=()=>P.cur==='auto'?city().cur:P.cur;
function money(eur,dec){const c=curCode();const v=eur*FX[c];try{return new Intl.NumberFormat(P.lang==='en'?LOC[c]:'fr-FR',{style:'currency',currency:c,maximumFractionDigits:dec?2:0,minimumFractionDigits:dec?2:0}).format(v)}catch(e){return Math.round(v)+' '+c}}
function moneyK(eur){const c=curCode();const v=eur*FX[c];const sym={EUR:'€',GBP:'£',CHF:'CHF ',AED:'AED ',USD:'$'}[c];
 const s=v>=1e6?(v/1e6).toFixed(2)+'M':v>=1e3?(v/1e3).toFixed(v>=1e5?0:1)+'k':Math.round(v)+'';return (c==='EUR'?s+' €':sym+s).replace('.',P.lang==='en'?'.':',')}
const dist=km=>P.units==='mi'?(km*.621).toFixed(1).replace('.',P.lang==='en'?'.':',')+' mi':String(km).replace('.',P.lang==='en'?'.':',')+' km';
const nf=n=>Math.round(n).toLocaleString(P.lang==='en'?'en-GB':'fr-FR');
const pct=n=>(Math.round(n*10)/10).toLocaleString(P.lang==='en'?'en-GB':'fr-FR')+' %';
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),2600)}
function rng(seed){let s=seed%2147483647||1;return()=>(s=s*16807%2147483647)/2147483647}

const IC={
shield:'<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
pin:'<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',chat:'<path d="M4 5h16v11H9l-5 4V5z"/>',
phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/>',share:'<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>',
x:'<path d="M6 6l12 12M18 6L6 18"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"/>',
chev:'<path d="M9 6l6 6-6 6"/>',back:'<path d="M15 6l-6 6 6 6"/>',down:'<path d="M6 9l6 6 6-6"/>',plus:'<path d="M12 5v14M5 12h14"/>',bolt:'<path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z"/>',
car:'<path d="M5 16v-5l2-5h10l2 5v5"/><path d="M3 16h18v3h-3v-3M6 16v3H3"/>',people:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 2.9-6 6.5-6s6.5 2.5 6.5 6"/><circle cx="17" cy="9" r="2.8"/><path d="M16.5 14c3 0 5 2 5 5"/>',
cal:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',doc:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
alert:'<path d="M12 3l10 18H2L12 3z"/><path d="M12 10v5M12 18v.5"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
home:'<path d="M3 11l9-7 9 7v9h-6v-6H9v6H3z"/>',brief:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 13h18"/>',
euro:'<path d="M17 6.5A6.5 6.5 0 1 0 17 17.5M4 10h9M4 14h9"/>',list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',nav:'<path d="M3 11l18-8-8 18-2-8-8-2z"/>',
gift:'<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8c-2-4-6-3-5 0M12 8c2-4 6-3 5 0"/>',card:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/>',
mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
power:'<path d="M12 3v9M6.3 6.3a8 8 0 1 0 11.4 0"/>',scale:'<path d="M12 3v18M5 21h14M5 7h14M5 7l-3 7a3 3 0 0 0 6 0L5 7zM19 7l-3 7a3 3 0 0 0 6 0l-3-7z"/>',
grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
flow:'<rect x="3" y="3" width="7" height="5" rx="1"/><rect x="14" y="16" width="7" height="5" rx="1"/><path d="M6.5 8v5.5h11V16"/>',
heart:'<path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/>',tag:'<path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="7.5" cy="7.5" r="1.3"/>',
plane:'<path d="M10 14l-7-3 1.5-1.5 7 1L16 6c1-1 3-1.5 3.5-1S19 7.5 18 8.5L13.5 13l1 7L13 21.5 10 14z"/>',repeat:'<path d="M17 2l3 3-3 3M3 11V9a4 4 0 0 1 4-4h13M7 22l-3-3 3-3M21 13v2a4 4 0 0 1-4 4H4"/>',
sliders:'<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
download:'<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',filter:'<path d="M3 5h18l-7 8v6l-4 2v-8L3 5z"/>',moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',activity:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',
building:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/>'
};
const I=(n,c='')=>`<svg class="i ${c}" viewBox="0 0 24 24">${IC[n]||''}</svg>`;

