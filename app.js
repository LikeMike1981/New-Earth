const terrainNames={plains:"Ebene",forest:"Wald",mountain:"Gebirge",water:"Wasser",city:"Stadt"};
const buildingDefs={
 food:{name:"Nahrungsproduktion",cost:2,allowed:["plains","water"],production:{food:3}},
 extraction:{name:"Ressourcenförderung",cost:2,allowed:["forest","mountain"],production:{material:3}},
 lab:{name:"Labor",cost:3,allowed:["city"],production:{science:2}},
 factory:{name:"Fabrik",cost:4,allowed:["city","mountain"],production:{material:2}},
 infrastructure:{name:"Infrastruktur",cost:3,allowed:["plains","forest","mountain","water","city"],production:{}}
};
const events=[
 {name:"Hitzewelle",types:["plains","plains"],effect:"Nahrungsgebäude produzieren diese Runde 1 weniger.",mod:{food:-1}},
 {name:"Waldbrand",types:["forest","forest"],effect:"Ressourcenförderung im Wald produziert diese Runde 1 weniger.",mod:{}},
 {name:"Erdbeben",types:["mountain","mountain"],effect:"Bauen kostet diese Runde 1 Material mehr.",mod:{buildCost:1}},
 {name:"Überschwemmung",types:["water","city"],effect:"Labore produzieren diese Runde 1 Forschung weniger.",mod:{science:-1}},
 {name:"Smog",types:["city"],effect:"Rekrutieren kostet diese Runde 1 zusätzliche Nahrung.",mod:{recruitCost:1}},
 {name:"Ressourcenboom",types:["mountain"],effect:"Ressourcenförderung produziert diese Runde 2 Material mehr.",mod:{material:2}},
 {name:"Rekordernte",types:[],effect:"Nahrungsgebäude produzieren diese Runde 2 Nahrung mehr.",mod:{food:2}},
 {name:"Internationale Hilfe",types:[],effect:"Repariere ein beschädigtes Feld und Bauen kostet 1 weniger.",mod:{buildCost:-1},repair:true},
 {name:"Sonnensturm",types:[],effect:"Forschung kostet diese Runde 1 zusätzliche Wissenschaft.",mod:{researchCost:1}},
 {name:"Meteorit",types:["plains"],effect:"Du erhältst sofort 3 Material.",mod:{instantMaterial:3}}
];
const rocketDefs=[
 {id:"cargo",name:"Ressourcenlager",cost:3,capacity:4},
 {id:"tech",name:"Technikarchiv",cost:3,capacity:2},
 {id:"habitat",name:"Wohnmodul",cost:4,capacity:3},
 {id:"greenhouse",name:"Gewächshaus",cost:4,capacity:1},
 {id:"lab",name:"Mobiles Labor",cost:5,capacity:1},
 {id:"shield",name:"Schutzschild",cost:4,capacity:0}
];

let state;
function newGame(){
 const types=["plains","forest","mountain","water","city","plains","forest","mountain","water","city","plains","forest","mountain","water","city"];
 state={round:1,eventDrawn:false,currentEvent:null,eventMod:{},population:3,experts:0,workers:3,
 material:5,food:5,science:0,culture:0,rocketModules:[],engineLevel:0,
 tiles:types.map((type,i)=>({id:i,type,health:2,buildings:[null,null]}))};
 render(); message("Decke das Ereignis für Runde 1 auf.");
}
function message(t){document.getElementById("message").textContent=t}
function render(){
 document.getElementById("round").textContent=state.round;
 document.getElementById("workers").textContent=state.workers;
 document.getElementById("engineLevel").textContent=state.engineLevel;
 const cap=state.rocketModules.reduce((s,m)=>s+m.capacity,0);
 document.getElementById("rocketCapacity").textContent=cap;
 document.getElementById("stats").innerHTML=[
  ["Siedler",state.population],["Experten",state.experts],["Nahrung",state.food],
  ["Material",state.material],["Wissenschaft",state.science],["Worker frei",state.workers]
 ].map(([a,b])=>`<div class="stat"><span>${a}</span><strong>${b}</strong></div>`).join("");
 document.getElementById("earthBoard").innerHTML=state.tiles.map(t=>`
 <div class="tile ${t.type} ${t.health===2?"healthy":t.health===1?"damaged":"lost"}">
  <div><span class="tile-title">${terrainNames[t.type]}</span><br><small>${t.health===2?"gesund":t.health===1?"beschädigt":"verloren"}</small></div>
  <div class="slots">${t.buildings.map(b=>`<div class="slot">${b?buildingDefs[b].name:"Bauplatz"}</div>`).join("")}</div>
 </div>`).join("");
 document.getElementById("rocketModules").innerHTML=state.rocketModules.map(m=>`<div class="rocket-module">${m.name}<br><small>Kapazität +${m.capacity}</small></div>`).join("");
 document.getElementById("drawEvent").disabled=state.eventDrawn;
 document.querySelectorAll("[data-action]").forEach(b=>b.disabled=!state.eventDrawn||state.workers<1);
}
function damageType(type){
 const candidates=state.tiles.filter(t=>t.type===type&&t.health>0);
 if(!candidates.length)return;
 // In v0.1 automatisch das am wenigsten bebaute Feld treffen.
 candidates.sort((a,b)=>a.buildings.filter(Boolean).length-b.buildings.filter(Boolean).length);
 candidates[0].health--;
 if(candidates[0].health===0)candidates[0].buildings=[null,null];
}
function drawEvent(){
 if(state.eventDrawn)return;
 const ev=events[(state.round-1)%events.length];
 state.currentEvent=ev; state.eventMod={...ev.mod}; state.eventDrawn=true;
 ev.types.forEach(damageType);
 if(ev.mod.instantMaterial)state.material+=ev.mod.instantMaterial;
 if(ev.repair){
  const t=state.tiles.find(x=>x.health===1); if(t)t.health=2;
 }
 document.getElementById("eventCard").innerHTML=`<strong>${ev.name}</strong><span>${ev.types.length?"Beschädigt: "+ev.types.map(x=>terrainNames[x]).join(", ")+". ":""}${ev.effect}</span>`;
 message(`${ev.name}: Plane deine Aktionen.`);
 render();
}
function spendWorker(){if(state.workers<1)return false;state.workers--;return true}
function openChoices(title,choices){
 const d=document.getElementById("choiceDialog");document.getElementById("dialogTitle").textContent=title;
 document.getElementById("dialogContent").innerHTML=choices.map((c,i)=>`<button class="choice" data-choice="${i}" value="cancel">${c.label}</button>`).join("");
 document.querySelectorAll("[data-choice]").forEach(btn=>btn.onclick=()=>{choices[+btn.dataset.choice].run();d.close();render()});
 d.showModal();
}
function build(){
 const choices=[];
 Object.entries(buildingDefs).forEach(([id,b])=>{
  const cost=Math.max(1,b.cost+(state.eventMod.buildCost||0));
  state.tiles.forEach(t=>t.buildings.forEach((slot,si)=>{
   if(t.health>0&&!slot&&b.allowed.includes(t.type)&&state.material>=cost){
    choices.push({label:`${b.name} auf ${terrainNames[t.type]} – ${cost} Material`,run:()=>{
     if(!spendWorker())return;state.material-=cost;t.buildings[si]=id;message(`${b.name} gebaut.`)
    }});
   }
  }));
 });
 if(!choices.length)return message("Kein passender Bauplatz oder zu wenig Material.");
 openChoices("Gebäude bauen",choices.slice(0,30));
}
function recruit(){
 const cost=2+(state.eventMod.recruitCost||0);
 const choices=[];
 if(state.food>=cost)choices.push({label:`1 Siedler rekrutieren – ${cost} Nahrung`,run:()=>{spendWorker();state.food-=cost;state.population++;message("Ein neuer Siedler schließt sich an.")}});
 if(state.food>=cost&&state.science>=1)choices.push({label:`1 Experten rekrutieren – ${cost} Nahrung + 1 Wissenschaft`,run:()=>{spendWorker();state.food-=cost;state.science--;state.experts++;message("Ein Experte wurde rekrutiert.")}});
 if(!choices.length)return message("Zu wenig Nahrung oder Wissenschaft.");
 openChoices("Rekrutieren",choices);
}
function research(){
 const cost=3+(state.eventMod.researchCost||0);
 if(state.science<cost)return message(`Du benötigst ${cost} Wissenschaft.`);
 openChoices("Technologie erforschen",[
  {label:`Wissensdatenbank – ${cost} Wissenschaft: Experten künftig günstiger (Platzhalter)`,run:()=>{spendWorker();state.science-=cost;state.culture++;message("Wissensdatenbank erforscht.")}},
  {label:`Frachtkomprimierung – ${cost} Wissenschaft: Raketen-Kapazität +2`,run:()=>{spendWorker();state.science-=cost;state.rocketModules.push({name:"Frachtkomprimierung",capacity:2});message("Frachtkomprimierung erforscht.")}},
  {label:`Schutzkuppel – ${cost} Wissenschaft: Repariere ein Feld`,run:()=>{spendWorker();state.science-=cost;const t=state.tiles.find(x=>x.health===1);if(t)t.health=2;message("Ein Feld wurde durch eine Schutzkuppel stabilisiert.")}}
 ]);
}
function rocket(){
 const choices=[];
 if(state.engineLevel===0&&state.material>=4)choices.push({label:"Chemischer Antrieb – 4 Material",run:()=>{spendWorker();state.material-=4;state.engineLevel=1;message("Antrieb gebaut.")}});
 if(state.engineLevel>0)rocketDefs.forEach(m=>{
  if(state.material>=m.cost)choices.push({label:`${m.name} – ${m.cost} Material`,run:()=>{spendWorker();state.material-=m.cost;state.rocketModules.push(m);message(`${m.name} installiert.`)}})
 });
 if(!choices.length)return message("Baue zuerst einen Antrieb oder sammle mehr Material.");
 openChoices("Rakete bauen",choices);
}
function production(){
 let prod={food:0,material:0,science:0};
 state.tiles.filter(t=>t.health>0).forEach(t=>t.buildings.filter(Boolean).forEach(id=>{
  const b=buildingDefs[id], factor=t.health===1?.5:1;
  Object.entries(b.production).forEach(([k,v])=>prod[k]+=v*factor);
 }));
 prod.food=Math.max(0,prod.food+(state.eventMod.food||0));
 prod.material=Math.max(0,prod.material+(state.eventMod.material||0));
 prod.science=Math.max(0,prod.science+(state.eventMod.science||0));
 state.food+=Math.floor(prod.food);state.material+=Math.floor(prod.material);state.science+=Math.floor(prod.science);
 return prod;
}
function endRound(){
 if(!state.eventDrawn)return message("Zuerst muss ein Ereignis aufgedeckt werden.");
 const prod=production();
 const upkeep=state.population+state.experts;
 if(state.food>=upkeep)state.food-=upkeep;
 else{
  const missing=upkeep-state.food;state.food=0;
  const loss=Math.min(state.population-1,missing);state.population-=loss;
  message(`Nahrungsmangel: ${loss} Siedler verloren.`);
 }
 if(state.round>=10){message(`Testpartie beendet. Raketen-Kapazität ${state.rocketModules.reduce((s,m)=>s+m.capacity,0)}, Bevölkerung ${state.population}.`);document.getElementById("endRound").disabled=true;render();return}
 state.round++;state.eventDrawn=false;state.currentEvent=null;state.eventMod={};state.workers=state.population;
 document.getElementById("eventCard").innerHTML="<strong>Noch kein Ereignis</strong><span>Decke die nächste Ereigniskarte auf.</span>";
 message(`Produktion: +${Math.floor(prod.food)} Nahrung, +${Math.floor(prod.material)} Material, +${Math.floor(prod.science)} Wissenschaft. Runde ${state.round}.`);
 render();
}
document.getElementById("drawEvent").onclick=drawEvent;
document.getElementById("endRound").onclick=endRound;
document.getElementById("resetGame").onclick=()=>{if(confirm("Partie wirklich zurücksetzen?"))newGame()};
document.querySelectorAll("[data-action]").forEach(b=>b.onclick=()=>({build,recruit,research,rocket}[b.dataset.action])());
newGame();
