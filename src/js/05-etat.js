/* ---------- état global ---------- */
const S={view:'client',city:Math.max(0,CFG.cities.findIndex(c=>c.id===CFG.defCity)),tick:0,
 c:{step:'home',dest:null,ctx:'pro',threat:0,hours:2,tier:'escorte',when:'now',day:0,time:'20:00',rec:'once',prot:1,female:false,langs:['FR'],dress:'Costume',disc:1,veh:'Berline',
    proto:{door:true,hall:false,recon:false,brief:true},flight:'',payAcct:'perso',cc:'Direction',promo:'',prefsOpen:false,safeCheck:true,
    agent:null,eta:0,elapsed:0,rating:0,tip:0,tags:[],code:'ATLAS 27',planned:[],autoshare:true,sosOn:true,mission:null,favs:['a0','a3'],
    msgs:[],tab:'home'},
 a:{online:false,tab:'home',stage:null,count:30,elapsed:0,checks:[false,false,false,false],log:[],earnToday:236,goal:1800,hours7:31,
    zones:[0,1],filt:{tiers:['escorte','prive','detail','mobilite'],maxKm:8,minH:2,night:true,team:true},avail:{},ratingC:0},
 b:{tab:'overview',period:'12m',policy:{maxTier:{exec:'detail',mgr:'prive',staff:'escorte'},night:true,thresh:2500,riskCities:true,approver:'Claire D.'},appr:null,q:''},
 o:{tab:'overview',night:25,surge:{},alerts:[],audit:[],mq:'',mf:'all',period:'30'}
};
let MID=2621;const nextId=()=>'M-'+(MID++);
function logAudit(t){S.o.audit.unshift({h:hhmm(NOW()),t});if(S.view==='ops'&&S.o.tab==='audit')renderOps()}

