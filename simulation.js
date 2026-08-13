(function(root){
const D=root.NewEarthData||(typeof require!=='undefined'?require('./data.js'):null),E=root.NewEarthEngine||(typeof require!=='undefined'?require('./engine.js'):null);
const afford=(s,c)=>(!c.money||s.money>=c.money)&&(!c.material||s.material>=c.material)&&(!c.science||s.science>=c.science);
function tryEarth(s,launchRound,u,log,strategy='balanced'){const r=s.round,c=E.capacities(s),record=x=>{if(log)log.push({round:s.round,phase:'earth',action:x,money:s.money,material:s.material,science:s.science})};
if(r>=launchRound-(launchRound>=6?4:3)){if(c.people<5&&afford(s,E.rocketCost(s,'habitat'))){if(E.buildRocket(s,'habitat').ok){record('Wohnmodul gebaut');return}}
if(launchRound>=6&&['expansion','balanced'].includes(strategy)&&c.people<8&&(s.population+s.experts.length)>=6&&afford(s,E.rocketCost(s,'habitat'))){if(E.buildRocket(s,'habitat').ok){record('zweites Wohnmodul gebaut');return}}if(c.resources<9&&afford(s,E.rocketCost(s,'cargo'))){if(E.buildRocket(s,'cargo').ok){record('Frachtraum gebaut');return}}
if(launchRound>=5){
 const prefabPriority={research:['prefabLab','prefabMine','roverHangar'],industry:['prefabMine','prefabLab','prefabFarm'],expansion:['prefabFarm','prefabMine'],exploration:['roverHangar','prefabLab'],balanced:['prefabMine','prefabFarm','prefabLab']}[strategy]||[];
 const maxPrefab=launchRound>=7?5:launchRound>=6?4:2;
 const builtPrefab=(s.rocket.prefabFarm||0)+(s.rocket.prefabMine||0)+(s.rocket.prefabLab||0)+(s.rocket.roverHangar||0);
 if(builtPrefab<maxPrefab)for(const pt of prefabPriority){const cap=E.capacities(s),needsTech=pt==='prefabLab',fits=needsTech?cap.tech>0:cap.resources>0;if(fits&&(pt!=='roverHangar'||(s.rocket[pt]||0)<1)&&afford(s,E.rocketCost(s,pt))){if(E.buildRocket(s,pt).ok){record(`${D.ROCKET[pt].name} gebaut`);return}}}
}
if(launchRound>=5&&['research','balanced','industry'].includes(strategy)&&c.tech<3&&E.transportableTechs(s).length>1&&afford(s,E.rocketCost(s,'tech'))){if(E.buildRocket(s,'tech').ok){record('Techmodul gebaut');return}}
if(launchRound>=7&&c.tech<5&&E.transportableTechs(s).length>3&&afford(s,E.rocketCost(s,'tech'))){if(E.buildRocket(s,'tech').ok){record('zweites Techmodul gebaut');return}}if(c.people<Math.min(7,s.population+s.experts.length)&&afford(s,E.rocketCost(s,'habitat'))){if(E.buildRocket(s,'habitat').ok){record('Wohnmodul gebaut');return}}}
const techPriority={
 research:['exobioLab','mobileResearch','drones','fabrication','extremophile','foodRecycler','habitats','longRover','builders','oxygen'],
 industry:['fabrication','builders','fusion','drones','habitats','foodRecycler','extremophile','exobioLab','longRover','oxygen'],
 expansion:['habitats','foodRecycler','extremophile','drones','longRover','fabrication','builders','exobioLab','oxygen','fusion'],
 exploration:['drones','longRover','exobioLab','habitats','fabrication','extremophile','foodRecycler','builders','oxygen','fusion'],
 balanced:['drones','extremophile','fabrication','exobioLab','habitats','longRover','foodRecycler','builders','oxygen','fusion']
};const pr=techPriority[strategy]||techPriority.balanced;
for(const id of pr){const t=D.TECHNOLOGIES.find(x=>x.id===id);if(s.technologies[id]==='researched'&&afford(s,t.cost)){if(E.buildTech(s,id).ok){u.tech[id]=(u.tech[id]||0)+1;record(`${t.name} gebaut`);return}}}
for(const id of pr){const t=D.TECHNOLOGIES.find(x=>x.id===id);if(s.technologies[id]==='locked'&&s.science>=Math.max(0,t.research-1)){if(E.researchTech(s,id).ok){record(`${t.name} erforscht`);return}}}
if(r<=launchRound-1){
 const futureSeats=E.capacities(s).people+(afford(s,E.rocketCost(s,'habitat'))?3:0),maxExperts=Math.max(0,futureSeats-3);
 if(s.experts.length<maxExperts){for(const id of ({research:['okafor','varga','mei','sato','johnson','alvarez','williams','petrov'],industry:['sato','johnson','williams','mei','alvarez','okafor','petrov','varga'],expansion:['alvarez','williams','sato','mei','johnson','okafor','petrov','varga'],exploration:['johnson','mei','okafor','williams','sato','alvarez','petrov','varga'],balanced:['johnson','okafor','sato','alvarez','mei','williams','petrov','varga']}[strategy]||['johnson','okafor','sato','alvarez','mei','williams','petrov','varga'])){const x=D.EXPERTS.find(e=>e.id===id);if(s.expertMarket?.includes(id)&&!s.experts.includes(id)&&!(id==='williams'&&s.rocket.cargo<1)&&!(launchRound<=4&&s.rocket.cargo<1)&&afford(s,x.cost)){if(E.hireExpert(s,id).ok){u.expert[id]=(u.expert[id]||0)+1;record(`${x.name} rekrutiert`);return}}}}
 for(const id of ['openScience','resourceDepot','recycling','mobileResearch','robotFarm','autonomousMining','globalContracts']){const q=D.PROJECTS.find(x=>x.id===id);if(s.projectMarket?.includes(id)&&!s.projects.includes(id)&&afford(s,q.cost)){if(E.buyProject(s,id).ok){u.project[id]=(u.project[id]||0)+1;record(`${q.name} gebaut`);return}}}
}
for(const [bid,type] of [['mine','resources'],['researchCenter','research'],['factory','industry']]){const b=D.STANDARD_BUILDINGS[bid],reg=s.regions.find(x=>x.type===type&&x.status&&x.buildings.length===0);if(reg&&afford(s,b.cost)){if(E.buildEarth(s,bid,reg.id).ok){record(`${b.name} gebaut`);return}}}
s.actions=0}
function load(s,strategy='balanced'){const c=E.capacities(s),rank=['johnson','okafor','sato','alvarez','mei','williams','petrov','varga'],owned=rank.filter(id=>s.experts.includes(id));const targetColonists=c.people>=8?Math.min(6,s.population):c.people>=5?Math.min(4,s.population):Math.min(2,s.population);let population=targetColonists,experts=[];for(const id of owned)if(population+experts.length<c.people)experts.push(id);while(population<s.population&&population+experts.length<c.people)population++;const tr={research:['exobioLab','drones','fabrication','extremophile','foodRecycler','habitats','longRover','builders','oxygen','fusion'],industry:['fabrication','builders','fusion','drones','habitats','foodRecycler','extremophile','exobioLab','longRover','oxygen'],expansion:['habitats','foodRecycler','extremophile','drones','longRover','fabrication','builders','exobioLab','oxygen','fusion'],exploration:['drones','longRover','exobioLab','habitats','fabrication','extremophile','foodRecycler','builders','oxygen','fusion'],balanced:['drones','extremophile','fabrication','exobioLab','longRover','habitats','foodRecycler','builders','oxygen','fusion']}[strategy]||[];return{population,experts,material:Math.min(s.material,c.resources),tech:tr.filter(id=>E.transportableTechs(s).includes(id)).slice(0,c.tech)}}
function tryNE(s,log,strategy='balanced'){const n=s.newEarth,record=x=>{if(log)log.push({round:s.round,phase:'newEarth',action:x,vp:n.vp,material:n.material,food:n.food,science:n.science})};
if(n.missions.filter(m=>m.selected).length<2){const pref={research:{alienTech:6,xenoScience:5},industry:{industryHub:6,xenoScience:2},expansion:{selfSufficient:6,frontier:4},exploration:{frontier:6,xenoScience:5},balanced:{}}[strategy]||{};const score=id=>(pref[id]||0)+({industryHub:n.landingMaterial>=7?8:5,selfSufficient:n.population>=4?8:5,alienTech:(n.experts.includes('okafor')||n.tech.includes('exobioLab'))?9:5,frontier:(n.tech.includes('drones')||n.tech.includes('longRover'))?9:6,xenoScience:(n.experts.includes('okafor')||n.tech.includes('exobioLab'))?8:6}[id]||5);for(const m of n.missions.filter(x=>!x.selected).sort((x,y)=>score(y.id)-score(x.id)).slice(0,2)){E.selectMission(s,m.id);record(`Kolonieziel gewählt: ${m.name}`)}}
const missions=n.missions.filter(m=>m.selected&&!m.claimed).map(m=>m.id),home=n.tiles.find(x=>x.settlement);
const valid=(kind,t)=>t&&t.state!=='unknown'&&E.hexDist(home,t)<=1&&!t.buildings.includes(kind);
const tileFor=(kind,terrains)=>n.tiles.find(t=>valid(kind,t)&&t.analyzed&&terrains.includes(t.discovery?.terrain))||n.tiles.find(t=>valid(kind,t)&&t.analyzed)||home;
const doBuild=(kind,terrains)=>{if(n.material<E.neCost(s,kind))return false;const t=tileFor(kind,terrains),q=E.neBuild(s,kind,t.id);if(q.ok){record(q.msg);return true}return false};
const prod=()=>{const c=JSON.parse(JSON.stringify(s));return E.neProduction(c)};
// Strategic opening: building is not mandatory. Frontier/relic plans may explore/analyze first.
if(n.rounds===0&&(n.buildings.mine+n.buildings.farm+n.buildings.lab)===0){
 const plans=[
  {kind:'explore',score:(strategy==='exploration'?7:0)+(missions.includes('frontier')?10:3)+(n.tech.includes('drones')?2:0)},
  {kind:'analyze',score:(strategy==='research'?5:strategy==='exploration'?3:0)+(missions.some(x=>['xenoScience','alienTech'].includes(x))?9:3)+(n.experts.includes('okafor')?2:0)},
  {kind:'mine',terr:['mineral','canyon','plain'],score:4+(strategy==='industry'?6:0)+(n.material<=5?3:0)+(missions.includes('industryHub')?4:0)},
  {kind:'farm',terr:['fertile','ice','plain'],score:4+(strategy==='expansion'?6:0)+(n.population>=5?2:0)+(missions.includes('selfSufficient')?4:0)},
  {kind:'lab',terr:['ruin','plain'],score:4+(strategy==='research'?6:0)+(n.science<=3?2:0)+(missions.some(x=>['xenoScience','alienTech'].includes(x))?4:0)}
 ].sort((x,y)=>y.score-x.score);
 for(const c of plans){
  if(c.kind==='explore'){const fr=E.frontierTiles(s),opts=E.explorationOptions(s);if(fr.length&&opts.length){const pick=opts.slice().sort((x,y)=>(y.type==='alien'?1:0)-(x.type==='alien'?1:0))[0],q=E.explore(s,pick.id,null,fr[0].id);if(q.ok){record(`Erkundet: ${pick.name}`);return}}}
  else if(c.kind==='analyze'){const t=n.tiles.filter(t=>t.discovery&&!t.analyzed&&t.discovery.id!=='plain').sort((x,y)=>(['ruin','signal'].includes(y.discovery.id)?1:0)-(['ruin','signal'].includes(x.discovery.id)?1:0))[0];if(t){const q=E.analyze(s,t.discovery.id,t.id);if(q.ok){record(q.msg);return}}}
  else if(doBuild(c.kind,c.terr))return;
 }
}
// Goal-driven builds; no universal mandatory order.
if(missions.includes('industryHub')&&prod().material<7&&doBuild('mine',['mineral','canyon','plain']))return;
if(missions.includes('selfSufficient')&&(n.buildings.farm<2||E.neFoodProd(s)<n.population+2)&&doBuild('farm',['fertile','ice','plain']))return;
if(missions.includes('alienTech')&&n.buildings.lab<1&&doBuild('lab',['ruin','plain']))return;
if(missions.includes('alienTech')&&n.alienResearch.length<3){for(const x of E.ALIEN_RESEARCH.filter(x=>x.path==='salvage'))if(!E.hasAlien(s,x.id)&&n.science>=x.cost){const q=E.alienResearch(s,x.id);if(q.ok){record(q.msg);return}}}
// Frontier is a legitimate opening: exploration itself now has milestone SP.
if(missions.includes('frontier')&&(n.roverExplored||0)<5){const fr=E.frontierTiles(s),opts=E.explorationOptions(s);if(fr.length&&opts.length){const pick=opts.slice().sort((x,y)=>((y.type==='alien'?5:0)+(y.id==='mineral'?3:0)+(y.id==='fertile'?2:0))-((x.type==='alien'?5:0)+(x.id==='mineral'?3:0)+(x.id==='fertile'?2:0)))[0],q=E.explore(s,pick.id,null,fr[0].id);if(q.ok){record(`Erkundet: ${pick.name}`);return}}}
// Analyze valuable known finds: relics, mission finds, then productive terrain.
const value=t=>(['ruin','signal'].includes(t.discovery.id)?9:0)+(missions.includes('xenoScience')?3:0)+(t.discovery.id==='mineral'&&n.buildings.mine<2?5:0)+(['fertile','ice','microbes'].includes(t.discovery.id)&&n.buildings.farm<2?4:0)-(t.discovery.analysis||0);
for(const t of n.tiles.filter(t=>t.discovery&&!t.analyzed&&t.discovery.id!=='plain').sort((x,y)=>value(y)-value(x))){const q=E.analyze(s,t.discovery.id,t.id);if(q.ok){record(q.msg);return}}
// Contact is a different late-game engine: prepared science/exploration colonies can invest in communication instead of merely copying relic tech.
if(n.contactUnlocked&&['research','exploration','balanced'].includes(strategy)){
 if(!E.hasAlien(s,'linguistics')&&n.science>=4){const q=E.alienResearch(s,'linguistics');if(q.ok){record(q.msg);return}}
 if(E.hasAlien(s,'linguistics')&&n.contactLevel<3&&n.science>=3+n.contactLevel){const q=E.contactAliens(s);if(q.ok){record(q.msg);return}}
 if(n.contactLevel>=1&&!E.hasAlien(s,'resonance')&&n.science>=5){const q=E.alienResearch(s,'resonance');if(q.ok){record(q.msg);return}}
 if(n.contactLevel>=2&&!E.hasAlien(s,'exchange')&&n.science>=6){const q=E.alienResearch(s,'exchange');if(q.ok){record(q.msg);return}}
}
// Specialized economies can bridge a missing resource instead of copying the same building mix.
if(strategy==='research'&&n.material<6&&n.science>=5){const q=E.convertResource(s,'scienceBuild');if(q.ok){record(q.msg);return}}
if(strategy==='industry'&&n.science<5&&n.material>=6){const q=E.convertResource(s,'industryResearch');if(q.ok){record(q.msg);return}}
if(strategy==='expansion'&&n.material<4&&n.food>=8){const q=E.convertResource(s,'foodBuild');if(q.ok){record(q.msg);return}}
// If current economy is constrained, branch according to the actual bottleneck.
const p=prod();
if(p.material<4&&doBuild('mine',['mineral','canyon','plain']))return;
if(p.food<n.population&&doBuild('farm',['fertile','ice','plain']))return;
if(p.science<2&&doBuild('lab',['ruin','plain']))return;
// Exploration is also useful without Frontier because 3/7 discoveries score.
if((n.roverExplored||0)<7){const next=(n.roverExplored||0)<3?3:7;if(next-(n.roverExplored||0)<=2){const fr=E.frontierTiles(s),opts=E.explorationOptions(s);if(fr.length&&opts.length){const pick=opts.slice().sort((x,y)=>(y.type==='alien'?1:0)-(x.type==='alien'?1:0))[0],q=E.explore(s,pick.id,null,fr[0].id);if(q.ok){record(`Erkundet: ${pick.name}`);return}}}}
// Deep specialization: once stable, different colonies deliberately over-invest in different engines.
if(strategy==='research'&&n.buildings.lab<4&&doBuild('lab',['ruin','plain']))return;
if(strategy==='industry'&&n.buildings.mine<5&&doBuild('mine',['mineral','canyon','plain']))return;
if(strategy==='expansion'&&n.buildings.farm<4&&doBuild('farm',['fertile','ice','plain']))return;
if(strategy==='exploration'&&(n.roverExplored||0)<7){const fr=E.frontierTiles(s),opts=E.explorationOptions(s);if(fr.length&&opts.length){const pick=opts.slice().sort((x,y)=>(y.type==='alien'?1:0)-(x.type==='alien'?1:0))[0],q=E.explore(s,pick.id,null,fr[0].id);if(q.ok){record(`Erkundet: ${pick.name}`);return}}}
// Develop special sites for SP rather than spam generic buildings.
if(n.buildings.mine<(strategy==='industry'?5:strategy==='research'?1:3)&&doBuild('mine',['mineral','canyon']))return;
if(n.buildings.farm<(strategy==='expansion'?4:strategy==='industry'?1:2)&&doBuild('farm',['fertile','ice']))return;
if(n.buildings.lab<(strategy==='research'?4:strategy==='industry'?1:2)&&doBuild('lab',['ruin']))return;
// Settlement network: useful, but diminishing SP means it is not the only late-game answer.
if(n.material>=E.neCost(s,'settlement')&&E.neFoodProd(s)>=(E.has(s,'foodRecycler')?0:n.settlements+1)){const t=n.tiles.find(x=>x.analyzed&&!x.settlement&&E.neReach(s,x));if(t){const q=E.neBuild(s,'settlement',t.id);if(q.ok){record(q.msg);return}}}
n.actions=0}
function runOne(launchRound,seed=1,det=false,withLog=false,strategy='balanced'){const s=E.newGame(seed),launchStyle=strategy,preferredShift={research:0,industry:0,balanced:0,expansion:0,exploration:0}[strategy]||0,plannedLaunch=Math.max(3,Math.min(7,launchRound+preferredShift)),usage={tech:{},expert:{},project:{}},vpTimeline={},log=[];let landingRound=null,launchLoad=null;while(!s.gameOver&&s.round<40){if(s.phase==='earth'){if(!s.event)E.drawEvent(s,det?({1:'heat',2:'brainDrain',3:'supply',4:'drought',5:'energy',6:'infra',7:'cascade'}[s.round]):undefined);while(s.actions>0&&s.round<plannedLaunch)tryEarth(s,plannedLaunch,usage,withLog?log:null,strategy);if(s.round>=plannedLaunch){launchLoad=load(s,strategy);if(E.launch(s,launchLoad).ok){landingRound=s.round;if(withLog)log.push({round:s.round,phase:'launch',action:'RAKETENSTART',load:launchLoad,vp:s.newEarth.vp});continue}}E.endRound(s)}else{while(s.newEarth.actions>0&&!s.gameOver)tryNE(s,withLog?log:null,strategy);E.endRound(s);vpTimeline[s.round]=s.newEarth.vp}}
const n=s.newEarth||{prodHistory:[],vp:0,tech:[],experts:[],population:0,landingMaterial:0},cap=E.capacities(s);return{seed,strategy,launchRound:plannedLaunch,launchAnchor:launchRound,finishRound:s.gameOver?s.round:null,landingRound,launchLoad,log:withLog?log:undefined,vpTimeline,neRoundsToWin:s.gameOver&&landingRound!=null?s.round-landingRound:null,prod1:n.prodHistory[0]||null,prod2:n.prodHistory[1]||null,prod3:n.prodHistory[2]||null,earthLosses:s.earthLosses,techValue:n.tech.length,unused:{people:Math.max(0,cap.people-n.population-n.experts.length),resources:Math.max(0,cap.resources-(n.landingMaterial||0)),tech:Math.max(0,cap.tech-n.tech.length)},usage,finalVP:n.vp,buildings:n.buildings||{},profile:s.newEarth?E.strategyProfile(s):{},contactLevel:n.contactLevel||0,contactUnlocked:!!n.contactUnlocked,alienResearch:[...(n.alienResearch||[])],missions:(n.missions||[]).map(m=>({id:m.id,selected:!!m.selected,claimed:!!m.claimed,vp:m.vp}))}}
const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;function aggregate(rows){const sum=kind=>{const o={};for(const r of rows)for(const[k,v]of Object.entries(r.usage[kind]))o[k]=(o[k]||0)+v;return Object.fromEntries(Object.entries(o).map(([k,v])=>[k,v/rows.length]))},prod=i=>({material:avg(rows.map(r=>r[`prod${i}`]?.material||0)),food:avg(rows.map(r=>r[`prod${i}`]?.food||0)),science:avg(rows.map(r=>r[`prod${i}`]?.science||0))});return{launchRound:rows[0].launchRound,n:rows.length,finishRound:avg(rows.map(r=>r.finishRound).filter(Boolean)),winRate:rows.filter(r=>r.finishRound).length/rows.length,prod1:prod(1),prod2:prod(2),prod3:prod(3),earthRegions:avg(rows.map(r=>r.earthLosses.regions)),earthBuildings:avg(rows.map(r=>r.earthLosses.buildings)),earthMeeples:avg(rows.map(r=>r.earthLosses.meeples)),techValue:avg(rows.map(r=>r.techValue)),unusedPeople:avg(rows.map(r=>r.unused.people)),unusedResources:avg(rows.map(r=>r.unused.resources)),unusedTech:avg(rows.map(r=>r.unused.tech)),usage:{tech:sum('tech'),expert:sum('expert'),project:sum('project')},missions:Object.fromEntries(['selfSufficient','xenoScience','industryHub','frontier','alienTech'].map(id=>{const selected=rows.filter(r=>(r.missions||[]).some(m=>m.id===id&&m.selected)).length,claimed=rows.filter(r=>(r.missions||[]).some(m=>m.id===id&&m.claimed)).length;return[id,{selected,claimed,claimRate:selected?claimed/selected:0}]}))}}
function compareDeterministic(){const rows=[3,4,5,6,7].map(r=>runOne(r,424242,true));for(const later of rows){later.earlyLead={};for(const early of rows.filter(x=>x.launchRound<later.launchRound))later.earlyLead[early.launchRound]=early.vpTimeline[later.launchRound]||0}return rows}function monteCarlo(n=10000){return[3,4,5,6,7].map(r=>aggregate(Array.from({length:n},(_,i)=>runOne(r,100000*r+i))))}

function createDuel(human,seed=777,strategy='balanced',launchRound=5){
 const ai=createAI(seed,strategy,launchRound),market={projectDeck:human.projectDeck,projectMarket:human.projectMarket,expertDeck:human.expertDeck,expertMarket:human.expertMarket},world={tiles:null};
 syncMarketToPlayer(ai.s,market);return{human,ai,market,world,humanOwner:'H',aiOwner:'KI'};
}
function syncHumanDuel(duel){
 const h=duel.human;syncMarketFromPlayer(h,duel.market);
 if(h.newEarth){if(!duel.world.tiles)claimSharedTiles({s:h},duel.world,duel.humanOwner);else{applyWorldToPlayer({s:h},duel.world,duel.humanOwner);mergeWorldFromPlayer({s:h},duel.world,duel.humanOwner)}}
}
function aiDuelTurn(duel){
 syncHumanDuel(duel);const ai=duel.ai,s=ai.s;syncMarketToPlayer(s,duel.market);
 if(ai.finished)return ai;
 if(s.phase==='earth'){
  if(!s.event)E.drawEvent(s);
  while(s.actions>0&&s.round<ai.launchRound){tryEarth(s,ai.launchRound,ai.usage,null,ai.strategy);syncMarketFromPlayer(s,duel.market);syncMarketToPlayer(s,duel.market)}
  if(s.round>=ai.launchRound){const l=load(s,ai.strategy);if(E.launch(s,l).ok){ai.landed=s.round;claimSharedTiles(ai,duel.world,duel.aiOwner);applyWorldToPlayer(ai,duel.world,duel.aiOwner);while(s.newEarth.actions>0&&!s.gameOver)tryNE(s,null,ai.strategy);mergeWorldFromPlayer(ai,duel.world,duel.aiOwner);E.endRound(s);if(s.gameOver)ai.finished=s.round}}
  if(s.phase==='earth')E.endRound(s);
 }else{applyWorldToPlayer(ai,duel.world,duel.aiOwner);while(s.newEarth.actions>0&&!s.gameOver)tryNE(s,null,ai.strategy);mergeWorldFromPlayer(ai,duel.world,duel.aiOwner);E.endRound(s);if(s.gameOver)ai.finished=s.round}
 syncMarketFromPlayer(s,duel.market);
 // Push depleted shared markets and newly revealed world back to the human immediately.
 syncMarketToPlayer(duel.human,duel.market);if(duel.human.newEarth)applyWorldToPlayer({s:duel.human},duel.world,duel.humanOwner);
 return ai;
}
function createAI(seed=777,strategy='balanced',launchRound=5){return{s:E.newGame(seed),strategy,launchRound,usage:{tech:{},expert:{},project:{}},landed:null,finished:null}}
function aiTurn(ai){
 const s=ai.s;if(ai.finished)return ai;
 if(s.phase==='earth'){
  if(!s.event)E.drawEvent(s);
  while(s.actions>0&&s.round<ai.launchRound)tryEarth(s,ai.launchRound,ai.usage,null,ai.strategy);
  if(s.round>=ai.launchRound){const l=load(s,ai.strategy);if(E.launch(s,l).ok){ai.landed=s.round;while(s.newEarth.actions>0&&!s.gameOver)tryNE(s,null,ai.strategy);E.endRound(s);if(s.gameOver)ai.finished=s.round}}
  if(s.phase==='earth')E.endRound(s);
 }else{
  while(s.newEarth.actions>0&&!s.gameOver)tryNE(s,null,ai.strategy);
  E.endRound(s);if(s.gameOver)ai.finished=s.round;
 }
 return ai;
}
function configureAI(ai,strategy,launchRound){if(strategy)ai.strategy=strategy;if(launchRound)ai.launchRound=Number(launchRound);return ai}
function aiSnapshot(ai){const s=ai.s,n=s.newEarth;return{phase:s.phase,round:s.round,strategy:ai.strategy,launchRound:ai.launchRound,vp:n?.vp||0,settlements:n?.settlements||0,buildings:n?.buildings||{},material:n?.material||0,food:n?.food||0,science:n?.science||0,contactLevel:n?.contactLevel||0,finished:ai.finished}}

const api={runOne,aggregate,compareDeterministic,monteCarlo,createAI,configureAI,aiTurn,aiSnapshot,createDuel,syncHumanDuel,aiDuelTurn};root.NewEarthSimulation=api;if(typeof module!=='undefined')
function makeSharedMarket(seed=1){
 const host=E.newGame(seed);
 return{projectDeck:host.projectDeck,projectMarket:host.projectMarket,expertDeck:host.expertDeck,expertMarket:host.expertMarket};
}
function syncMarketToPlayer(p,m){p.projectDeck=m.projectDeck;p.projectMarket=m.projectMarket;p.expertDeck=m.expertDeck;p.expertMarket=m.expertMarket}
function syncMarketFromPlayer(p,m){m.projectDeck=p.projectDeck;m.projectMarket=p.projectMarket;m.expertDeck=p.expertDeck;m.expertMarket=p.expertMarket}
function claimSharedTiles(p,world,owner){
 const n=p.s.newEarth;if(!n)return;
 // First arrival creates the physical world. Later arrivals receive the same discoveries/states.
 if(!world.tiles){world.tiles=n.tiles;for(const t of world.tiles){t.owner=t.settlement?owner:null;t.claimedBy=t.settlement?owner:null}}
 else{
  // Copy common world into this player's NE state while preserving own starting settlements as claims on free center tiles.
  const ownStarts=n.tiles.filter(t=>t.settlement).map(t=>t.id);
  n.tiles=JSON.parse(JSON.stringify(world.tiles));
  let placed=0;
  for(const id of ownStarts){let t=n.tiles.find(x=>x.id===id);if(t&&!t.claimedBy){t.settlement=true;t.claimedBy=owner;t.owner=owner;placed++}}
  if(!placed){const free=n.tiles.find(t=>!t.claimedBy&&t.state!=='unknown')||n.tiles.find(t=>!t.claimedBy);if(free){free.settlement=true;free.claimedBy=owner;free.owner=owner;free.state=free.state==='unknown'?'surveyed':free.state;placed=1}}
  n.settlements=placed;
 }
}
function mergeWorldFromPlayer(p,world,owner){
 const n=p.s.newEarth;if(!n)return;
 if(!world.tiles){claimSharedTiles(p,world,owner);return}
 for(const pt of n.tiles){const wt=world.tiles.find(x=>x.id===pt.id);if(!wt)continue;
   // Exploration/analysis is global knowledge: first player permanently reveals it.
   const rank={unknown:0,surveyed:1,discovered:2,analyzed:3,settled:4};
   if((rank[pt.state]||0)>(rank[wt.state]||0)){wt.state=pt.state;wt.discovery=pt.discovery?JSON.parse(JSON.stringify(pt.discovery)):wt.discovery;wt.analyzed=pt.analyzed||wt.analyzed;if(pt.analyzed&&!wt.claimedBy){wt.claimedBy=owner;wt.owner=owner}}
   // Settlements/buildings claim a location for that player.
   if(pt.settlement&&!wt.claimedBy){wt.claimedBy=owner;wt.owner=owner;wt.settlement=true}
 }
}
function applyWorldToPlayer(p,world,owner){
 if(!p.s.newEarth||!world.tiles)return;
 const n=p.s.newEarth;
 for(const wt of world.tiles){const t=n.tiles.find(x=>x.id===wt.id);if(!t)continue;
   // Other players' claimed sites cannot be used as our settlements.
   if(wt.claimedBy&&wt.claimedBy!==owner){t.blockedBy=wt.claimedBy;if(t.settlement&&n.tiles.some(x=>x!==t&&x.settlement&&!x.blockedBy)){t.settlement=false;t.buildings=[]}}
   if(['surveyed','discovered','analyzed'].includes(wt.state)&&t.state==='unknown'){t.state=wt.state;t.discovery=wt.discovery?JSON.parse(JSON.stringify(wt.discovery)):null;t.analyzed=!!wt.analyzed}
 }
}
function runRace(seed=1,strategies=['balanced','balanced'],launches=[3,5]){
 const market=makeSharedMarket(seed),world={tiles:null},players=launches.map((lr,i)=>({id:i,s:E.newGame(seed+i*7919),strategy:strategies[i]||'balanced',launchRound:lr,usage:{tech:{},expert:{},project:{}},landed:null,finished:null}));
 let worldRound=1;
 while(worldRound<25&&!players.some(p=>p.finished)){
  for(const p of players){
   const st=p.s;if(p.finished)continue;syncMarketToPlayer(st,market);
   if(st.phase==='earth'){
    if(!st.event)E.drawEvent(st);
    while(st.actions>0&&st.round<p.launchRound){tryEarth(st,p.launchRound,p.usage,null,p.strategy);syncMarketFromPlayer(st,market);syncMarketToPlayer(st,market)}
    if(st.round>=p.launchRound){const l=load(st,p.strategy);if(E.launch(st,l).ok){p.landed=worldRound;claimSharedTiles(p,world,p.id);applyWorldToPlayer(p,world,p.id);while(st.newEarth.actions>0&&!st.gameOver)tryNE(st,null,p.strategy);mergeWorldFromPlayer(p,world,p.id);E.endRound(st);if(st.gameOver)p.finished=worldRound}}
    if(st.phase==='earth')E.endRound(st);
   }else{
    applyWorldToPlayer(p,world,p.id);while(st.newEarth.actions>0&&!st.gameOver)tryNE(st,null,p.strategy);mergeWorldFromPlayer(p,world,p.id);E.endRound(st);if(st.gameOver)p.finished=worldRound;
   }
   syncMarketFromPlayer(st,market);
  }
  if(players.some(p=>p.finished))break;worldRound++;
 }
 return players.map(p=>({id:p.id,launchRound:p.launchRound,strategy:p.strategy,finished:p.finished,vp:p.s.newEarth?.vp||0,landed:p.landed,experts:p.s.experts||[],projects:p.s.projects||[],settlements:p.s.newEarth?.settlements||0,explored:p.s.newEarth?.roverExplored||0}));
}
api.runRace=runRace;module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
