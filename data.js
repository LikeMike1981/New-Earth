window.NE_DATA = (() => {
 const C={start:{money:10,material:4,science:2,population:5,baseMoney:4},winVP:10,engineLimitEnabled:false};
 const regionTypes={industry:{name:'Industrie',icon:'🏭',yield:{money:[0,1,3]}},resources:{name:'Rohstoffe',icon:'⛏️',yield:{material:[0,1,2]}},research:{name:'Forschung',icon:'🔬',yield:{science:[0,1,2]}}};
 const regions=[]; Object.keys(regionTypes).forEach(type=>{for(let i=1;i<=6;i++)regions.push({id:`${type}-${i}`,type,name:`${regionTypes[type].name} ${i}`})});
 const buildings={
  mine:{name:'Mine',region:'resources',cost:{money:6,material:2},production:{material:2}},
  factory:{name:'Fabrik',region:'industry',cost:{money:7,material:2},production:{money:3}},
  researchCenter:{name:'Forschungszentrum',region:'research',cost:{money:7,material:2},production:{science:2}},
  highTechLab:{name:'High-Tech-Labor',region:'research',cost:{money:10,material:3},effect:'Technologieforschung 1 W günstiger (1×/Runde)'},
  disasterProtection:{name:'Katastrophenschutz',region:'any',cost:{money:8,material:3},effect:'1 Schutzmarker: negiert nächsten Regionsschaden'}
 };
 const projects=[
 ['deepDrilling','Tiefenbohrtechnik',{money:8,material:2},'Eine Mine +2 M/Runde.'],['automatedChain','Automatisierte Förderkette',{money:10,material:3},'Alle Minen zusammen +3 M/Runde.'],['industry40','Industrie 4.0',{money:9,material:2},'Eine Fabrik +4 G/Runde.'],['globalContracts','Globale Lieferverträge',{money:8},'+3 G/Runde; bei Versorgungskrise kein Bonus.'],['aiResearch','KI-Forschungsnetz',{money:10,material:2},'Ein Forschungszentrum +2 W/Runde.'],['openScience','Open-Science-Konsortium',{money:7},'Sofort +3 W; danach +1 W/Runde.'],['underground','Unterirdischer Komplex',{money:9,material:4},'Ein Gebäude ignoriert ersten Regionsschaden dauerhaft.'],['redundantGrid','Redundante Stromnetze',{money:8,material:3},'1×/Runde Produktionsverlust durch Ereignis um 2 reduzieren.'],['evacNetwork','Evakuierungsnetz',{money:7,material:2},'Evakuierte Meeple nicht inaktiv; Kollaps-Evakuierung 1 G.'],['resourceDepot','Ressourcenlager',{money:6,material:2},'Sofort +5 M; ein Frachtraum 2 G günstiger.'],['recycling','Recyclingverbund',{money:8,material:2},'+1 M/Runde; Raketenmodule 1 M günstiger (min. 1).'],['privateSpace','Private Raumfahrtinitiative',{money:9,material:2},'Nächstes Raketenmodul 4 G günstiger.'],['mobileResearch','Mobile Forschungsstation',{money:10,material:2},'+1 W/Runde; als Tech-Fracht auf New Earth einmalig +2 W.'],['robotFarm','Robotisierte Landwirtschaft',{money:9,material:2},'+2 G/Runde; erste Farm auf New Earth 2 M günstiger als Tech-Fracht.'],['autonomousMining','Autonome Förderanlage',{money:11,material:3},'+2 M/Runde; erste Mine auf New Earth 3 M günstiger als Tech-Fracht.']
 ].map(([id,name,cost,effect])=>({id,name,cost,effect}));
 const technologies=[
 ['oxygen','Regenerativer Sauerstoffkreislauf',5,{money:6,material:2},'Explorations-/Aktionsradius +1.'],['crops','Extremophile Nutzpflanzen',4,{money:5,material:1},'Erste Farm kostenlos.'],['recycler','Nahrungsrecycler',5,{money:6,material:2},'Start-Nahrung +2; Siedlungen benötigen 1 Nahrung weniger.'],['builders','Autonome Baumaschinen',6,{money:8,material:2},'Erstes Nicht-Siedlungsgebäude kostenlos; danach erstes weiteres −2 M.'],['drones','Prospektionsdrohnen',4,{money:5,material:1},'Beim Erkunden 4 statt 3 Optionen.'],['habitats','Modulare Habitate',6,{money:7,material:3},'Erste zusätzliche Siedlung −3 M.'],['fusion','Kompakter Fusionsreaktor',8,{money:10,material:4},'Startproduktion +2 flexible Produktion/Runde.'],['longRover','Langstrecken-Rover',5,{money:7,material:2},'Rover-Reichweite +2; erste Rover-Erkundung/Runde günstiger.'],['fabrication','3D-Fabrikation',7,{money:9,material:3},'Standardgebäude auf New Earth −1 M.'],['exobio','Exobiologisches Labor',7,{money:7,material:2},'Alien/Biologie-Analyse −2 W; erster Fund +1 SP.']
 ].map(([id,name,research,cost,effect])=>({id,name,research,cost,effect}));
 const experts=[
 ['varga','Dr. Elena Varga – Klimaforschung',9,'Nächste Katastrophe sehen; 1×/Spiel unter Stapel legen.'],['johnson','Dr. Malik Johnson – Geologie',10,'Rohstoff-Exploration +1 Auswahl; erste Mine −2 M.'],['alvarez','Dr. Sofia Alvarez – Agronomie',10,'Farmen +1 Nahrung.'],['sato','Kenji Sato – Systemingenieur',9,'Ein Raketenmodul −2 M; erstes New-Earth-Gebäude −2 M.'],['lin','Mei Lin – Robotik',11,'Robotik/Rover-Tech −1 W; Rover-Reichweite +1.'],['williams','Noah Williams – Logistik',9,'Jeder Frachtraum +3 Ressourcen.'],['okafor','Dr. Amara Okafor – Exobiologie',10,'Alien/Biologie +1 Auswahl; Analyse −1 W.'],['petrov','Yuri Petrov – Raumfahrttechnik',8,'Ein Wohn-/Fracht-/Techmodul −3 G; bei Antriebslimit +1 Modul.']
 ].map(([id,name,cost,effect])=>({id,name,cost:{money:cost},effect}));
 const rocket={capsule:{name:'Basiskapsel',cost:{},people:2,cargo:3,tech:1},hab:{name:'Wohnmodul',cost:{money:8,material:3},people:3,cargo:0,tech:0},cargo:{name:'Frachtraum',cost:{money:7,material:3},people:0,cargo:8,tech:0},tech:{name:'Techmodul',cost:{money:8,material:2},people:0,cargo:0,tech:2},engine:{name:'Verbesserter Antrieb',cost:{money:10,material:4}}};
 const events={
 instability:[['heat','Hitzewelle','Klima','Fabriken −1 G.'],['brainDrain','Forschungsabwanderung','Unruhen','−1 W Einkommen.'],['supply','Lieferkettenstörung','Infrastruktur','Erstes Gebäude +2 G.'],['storm','Sturmfront','Klima','Schäden auf unterschiedliche Regionen.']],
 crisis:[['drought','Megadürre','Klima','Rohstoffregionen −1 M.'],['energy','Energieknappheit','Ressourcen','Fabriken −2 G.'],['infra','Infrastrukturbruch','Infrastruktur','Beschädigte Regionen priorisiert.'],['flight','Massenflucht','Unruhen','1 Meeple aus beschädigter Region evakuiert/inaktiv.']],
 collapse:[['cascade','Kaskadenausfall','Infrastruktur','+1 Schaden auf beschädigte Region.'],['war','Ressourcenkrieg','Ressourcen','Rohstoffgebäude in zerstörter getroffener Region sofort zerstört.'],['state','Staatszerfall','Unruhen','Evakuierung 3 G/Meeple oder Verlust.'],['window','Letzte Startfenster','Infrastruktur','Wer bleibt: nächste Runde Raketenmodule +3 G.']]
 }; Object.keys(events).forEach(k=>events[k]=events[k].map(([id,name,category,effect])=>({id,name,category,effect})));
 const newEarth={buildings:{mine:{name:'Mine',cost:4,production:{material:2}},farm:{name:'Farm',cost:4,production:{food:2}},lab:{name:'Labor',cost:5,production:{science:2}},rover:{name:'Rover',cost:4},settlement:{name:'Neue Siedlung',cost:7,vp:1}},discoveries:[
  {id:'mineral',name:'Reiches Mineralfeld',type:'resource',bonus:'Mine hier: +1 M/Runde'}, {id:'fertile',name:'Fruchtbares Becken',type:'biology',bonus:'Farm hier: +1 Nahrung/Runde'}, {id:'ruin',name:'Alien-Ruinen',type:'alien',analysis:3,vp:1,bonus:'+2 W nach Analyse'}, {id:'microbes',name:'Extremophile Mikroben',type:'biology',analysis:2,vp:1,bonus:'Farmen +1 Nahrung diese Runde'}, {id:'canyon',name:'Basalt-Canyon',type:'resource',bonus:'Neue Siedlung hier −1 M'}, {id:'signal',name:'Unbekanntes Signal',type:'alien',analysis:4,vp:2,bonus:'einmalig +2 M'}, {id:'ice',name:'Unterirdisches Eis',type:'biology',analysis:2,vp:1,bonus:'+2 Nahrung'}, {id:'plain',name:'Stabile Ebene',type:'generic',bonus:'Bauzone ohne Bonus'}
 ]};
 return {C,regionTypes,regions,buildings,projects,technologies,experts,rocket,events,newEarth};
})();

// Compatibility/data API for the shared rule engine and headless simulator.
(function(root){
 const X=root.NE_DATA;
 const REGION_TYPES={industry:{name:'Industrie',intact:{money:3},damaged:{money:1}},resources:{name:'Rohstoffe',intact:{material:2},damaged:{material:1}},research:{name:'Forschung',intact:{science:2},damaged:{science:1}}};
 const STANDARD_BUILDINGS={};Object.entries(X.buildings).forEach(([id,b])=>STANDARD_BUILDINGS[id]={...b});
 const PROJECTS=X.projects.map(p=>({...p,transportable:p.id==='mobileResearch'}));
 const idmap={crops:'extremophile',recycler:'foodRecycler',exobio:'exobioLab'};
 const TECHNOLOGIES=X.technologies.map(t=>({...t,id:idmap[t.id]||t.id}));
 const emap={lin:'mei'};const EXPERTS=X.experts.map(e=>({...e,id:emap[e.id]||e.id}));
 const tier={instability:'Instabilität',crisis:'Krise',collapse:'Kollaps'};const EVENT_META={heat:{prefer:['industry','resources']},storm:{different:true},infra:{prioritizeDamaged:true},cascade:{extraDamaged:true},flight:{},state:{},window:{}};
 const EVENTS=[];Object.entries(X.events).forEach(([k,arr])=>arr.forEach(e=>EVENTS.push({...e,id:e.id==='state'?'collapse':e.id==='window'?'lastWindow':e.id,tier:tier[k],damage:k==='instability'?2:k==='crisis'?3:4,...(EVENT_META[e.id]||{})})));
 const ROCKET={base:X.rocket.capsule,habitat:X.rocket.hab,cargo:X.rocket.cargo,tech:X.rocket.tech,engine:X.rocket.engine};
 const DISCOVERIES=X.newEarth.discoveries.map(d=>({...d,analysis:d.analysis||2,vp:d.vp||1,material:d.id==='signal'?2:0,science:d.id==='ruin'?2:0,foodProd:d.id==='fertile'?1:0,materialProd:d.id==='mineral'?1:0}));
 const NEW_EARTH={buildings:X.newEarth.buildings};
 const BALANCE={winVP:10,featureFlags:{improvedEngine:false},danger:[{from:1,to:3,name:'Instabilität',damage:2},{from:4,to:6,name:'Krise',damage:3},{from:7,to:99,name:'Kollaps',damage:4}]};
 const api={REGION_TYPES,STANDARD_BUILDINGS,PROJECTS,TECHNOLOGIES,EXPERTS,EVENTS,ROCKET,DISCOVERIES,NEW_EARTH,BALANCE};root.NewEarthData=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
