/* ---------- gammes & prix ---------- */
const TIERS=[
 {id:'escorte',ic:'user',rate:95,min:2,eta:8,n:1,nm:{fr:'Escorte',en:'Escort'},ds:{fr:'1 agent · trajets, sorties, retour',en:'1 officer · trips, evenings, home'}},
 {id:'prive',ic:'shield',rate:145,min:3,eta:12,n:1,nm:{fr:'Privé',en:'Private'},ds:{fr:'1 agent senior · 8 ans et +',en:'1 senior officer · 8+ yrs'}},
 {id:'detail',ic:'people',rate:340,min:4,eta:20,n:2,nm:{fr:'Détail',en:'Detail'},ds:{fr:'2 agents dont 1 chef de mission',en:'2 officers incl. team lead'}},
 {id:'mobilite',ic:'car',rate:215,min:2,eta:16,n:1,nm:{fr:'Mobilité',en:'Mobility'},ds:{fr:'Agent + véhicule avec chauffeur partenaire',en:'Officer + chauffeured vehicle (partner)'}},
 {id:'event',ic:'cal',quote:true,nm:{fr:'Événement',en:'Event'},ds:{fr:'Équipe dimensionnée · devis < 1 h',en:'Sized team · quote < 1 h'}},
 {id:'renforce',ic:'lock',dossier:true,nm:{fr:'Renforcée',en:'Enhanced'},ds:{fr:'Risque exceptionnel · sur dossier',en:'Exceptional risk · on file'}}
];
const T=id=>TIERS.find(t=>t.id===id);
const CTX=[['pro',{fr:'Déplacement pro',en:'Business trip'}],['soir',{fr:'Soirée',en:'Night out'}],['event',{fr:'Événement',en:'Event'}],['media',{fr:'Personnalité exposée',en:'High-profile'}],['harc',{fr:'Harcèlement',en:'Harassment'}],['voyage',{fr:'Voyage',en:'Travel'}]];
const isNight=()=>{const h=NOW().getHours();return h>=22||h<6};
function quote(id,h,prot){const t=T(id);if(!t||!t.rate)return null;const k=city().k;const night=isNight()?1+S.o.night/100:1;const surge=S.o.surge[S.city]||1;
 const extra=Math.max(0,(prot||1)-(t.n===2?3:2))*.25;const base=t.rate*k*h*(1+extra);const ht=base*night*surge;const fee=4.9;const tva=(ht+fee)*.2;
 return{base,ht,fee,tva,ttc:ht+fee+tva,night,surge,extra}}

