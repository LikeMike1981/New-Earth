(function(root){
const D=root.NewEarthData||(typeof require!=='undefined'?require('./data.js'):null),E=root.NewEarthEngine||(typeof require!=='undefined'?require('./engine.js'):null);
const afford=(s,c)=>(!c.money||s.money>=c.money)&&(!c.material||s.material>=c.material)&&(!c.science||s.science>=c.science);
function chooseAdaptiveStrategy(s){
 const ids=[...(s.projectHand||[]),...(s.projectMarket||[])],ex=s.expertMarket||[];
 const score={research:0,industry:0,expansion:0,exploration:0};
 const add=(st,n)=>score[st]+=n;
 for(const id of ids){
  if(['aiResearch','openScience','mobileResearch'].includes(id))add('research',3);
  if(['deepDrilling','automatedChain','industry40','autonomousMining','resourceDepot'].includes(id))add('industry',3);
  if(['robotFarm','recycling','evacNetwork'].includes(id))add('expansion',3);
  if(['mobileResearch','privateSpace','resourceDepot'].includes(id))add('exploration',2);
 }
 for(const id of ex){
  if(id==='okafor')add('research',4);if(id==='sato')add('industry',4);if(id==='johnson'){add('industry',2);add('exploration',3)}
  if(id==='alvarez')add('expansion',4);if(id==='mei'){add('research',2);add('exploration',3)}if(id==='williams')add('expansion',2);
 }
 const best=Object.entries(score).sort((a,b)=>b[1]-a[1]);return best[0][1]>=best[1][1]+2?best[0][0]:'balanced'
}
function effectiveStrategy(s,strategy){if(strategy!=='adaptive')return strategy;if(!s.strategyLean)s.strategyLean=chooseAdaptiveStrategy(s);return s.strategyLean}
function tryEarth(s,launchRound,u,log,strategy='balanced'){strategy=effectiveStrategy(s,strategy);const r=s.round,c=E.capacities(s),record=x=>{if(log)log.push({round:s.round,phase:'earth',action:x,money:s.money,material:s.material,science:s.science})};
if(r>=launchRound-(launchRound>=6?4:3)){if(c.people<5&&afford(s,E.rocketCost(s,'habitat'))){if(E.buildRocket(s,'habitat').ok){record('Wohnmodul gebaut');return}}
if(launchRound>=6&&['expansion','balanced'].includes(strategy)&&c.people<8&&(s.population+s.experts.length)>=6&&afford(s,E.rocketCost(s,'habitat'))){if(E.buildRocket(s,'habitat').ok){record('zweites Wohnmodul gebaut');return}}if(c.resources<9&&afford(s,E.rocketCost(s,'cargo'))){if(E.buildRocket(s,'cargo').ok){record('Frachtraum gebaut');return}}
if(launchRound>=5){
 const prefabPriority=launchRound===5?['roverHangar']:{research:['prefabLab','prefabMine','roverHangar'],industry:['prefabMine','prefabLab','prefabFarm'],expansion:['prefabFarm','prefabMine'],exploration:['roverHangar','prefabLab'],balanced:['prefabMine','prefabFarm','prefabLab']}[strategy]||[];
 const maxPrefab=launchRound>=7?4:launchRound>=6?2:1;
 const builtPrefab=(s.rocket.prefabFarm||0)+(s.rocket.prefabMine||0)+(s.rocket.prefabLab||0)+(s.rocket.roverHangar||0);
 if(builtPrefab<maxPrefab)for(const pt of prefabPriority){const cap=E.capacities(s),needsTech=pt==='prefabLab',fits=needsTech?cap.tech>0:cap.resources>0;const lim=pt==='roverHangar'?1:(launchRound>=7&&strategy==='industry'&&pt==='prefabMine'?2:launchRound>=7&&strategy==='research'&&pt==='prefabLab'?2:launchRound>=7&&strategy==='expansion'&&pt==='prefabFarm'?2:1);if(fits&&(s.rocket[pt]||0)<lim&&afford(s,E.rocketCost(s,pt))){if(E.buildRocket(s,pt).ok){record(`${D.ROCKET[pt].name} gebaut`);return}}}
}
if(launchRound>=6&&['research','balanced','industry'].includes(strategy)&&c.tech<3&&E.transportableTechs(s).length>1&&afford(s,E.rocketCost(s,'tech'))){if(E.buildRocket(s,'tech').ok){record('Techmodul gebaut');return}}
if(launchRound>=7&&c.tech<5&&E.transportableTechs(s).length>3&&afford(s,E.rocketCost(s,'tech'))){if(E.buildRocket(s,'tech').ok){record('zweites Techmodul gebaut');return}}if(c.people<Math.min(7,s.population+s.experts.length)&&afford(s,E.rocketCost(s,'habitat'))){if(E.buildRocket(s,'habitat').ok){record('Wohnmodul gebaut');return}}}
const techPriority={
 research:['exobioLab','mobileResearch','drones','fabrication','extremophile','foodRecycler','habitats','longRover','builders','oxygen'],
 industry:['fabrication','autonomousMining','robotFarm','mobileResearch','builders','fusion','drones','habitats','foodRecycler','extremophile','exobioLab','longRover','oxygen'],
 expansion:['habitats','robotFarm','mobileResearch','autonomousMining','foodRecycler','extremophile','drones','longRover','fabrication','builders','exobioLab','oxygen','fusion'],
 exploration:['drones','longRover','mobileResearch','autonomousMining','robotFarm','exobioLab','habitats','fabrication','extremophile','foodRecycler','builders','oxygen','fusion'],
 balanced:['drones','mobileResearch','robotFarm','autonomousMining','extremophile','fabrication','exobioLab','habitats','longRover','foodRecycler','builders','oxygen','fusion']
};const pr=techPriority[strategy]||techPriority.balanced;
for(const id of pr){const t=D.TECHNOLOGIES.find(x=>x.id===id);if(s.technologies[id]==='researched'&&afford(s,t.cost)){if(E.buildTech(s,id).ok){u.tech[id]=(u.tech[id]||0)+1;record(`${t.name} gebaut`);return}}}
for(const id of pr){const t=D.TECHNOLOGIES.find(x=>x.id===id);if(s.technologies[id]==='locked'&&s.science>=Math.max(0,t.research-1)){if(E.researchTech(s,id).ok){record(`${t.name} erforscht`);return}}}
if(r<=launchRound-1){
 const futureSeats=E.capacities(s).people+(afford(s,E.rocketCost(s,'habitat'))?3:0),maxExperts=Math.min(2,Math.max(0,futureSeats-3));
 const base={research:{okafor:12,mei:7,varga:5,sato:4,johnson:5,alvarez:3,williams:4,petrov:3},industry:{sato:11,johnson:9,williams:6,mei:5,alvarez:4,okafor:4,petrov:3,varga:2},expansion:{alvarez:11,williams:8,sato:6,mei:5,johnson:5,okafor:3,petrov:4,varga:3},exploration:{johnson:10,mei:8,okafor:7,williams:6,sato:4,alvarez:4,petrov:3,varga:3},balanced:{johnson:8,okafor:8,sato:7,alvarez:7,mei:6,williams:5,petrov:3,varga:3}}[strategy]||{};
 if(s.experts.length<maxExperts){
  const candidates=(s.expertMarket||[]).filter(id=>!s.experts.includes(id)).map(id=>{const x=D.EXPERTS.find(e=>e.id===id);let score=base[id]||3;if(id==='williams'&&s.rocket.cargo<1)score-=8;if(launchRound<=4&&s.rocket.cargo<1)score-=4;score-=s.experts.length*2;return{id,x,score}}).filter(z=>z.x&&afford(s,z.x.cost)).sort((a,b)=>b.score-a.score);
  const best=candidates[0];if(best&&best.score>=6){if(E.hireExpert(s,best.id).ok){u.expert[best.id]=(u.expert[best.id]||0)+1;record(`${best.x.name} rekrutiert`);return}}
 }
 const projectScores={
 research:{openScience:11,aiResearch:10,mobileResearch:9,recycling:7,resourceDepot:6,privateSpace:6,globalContracts:5,autonomousMining:5,deepDrilling:4,automatedChain:4,industry40:4,robotFarm:4,underground:4,redundantGrid:4,evacNetwork:3},
 industry:{autonomousMining:11,automatedChain:10,deepDrilling:9,resourceDepot:9,recycling:8,industry40:8,globalContracts:7,privateSpace:6,mobileResearch:5,robotFarm:5,openScience:4,aiResearch:3,underground:4,redundantGrid:4,evacNetwork:3},
 expansion:{robotFarm:11,recycling:9,resourceDepot:8,privateSpace:7,globalContracts:6,autonomousMining:6,mobileResearch:5,openScience:4,deepDrilling:4,automatedChain:4,industry40:4,aiResearch:3,underground:5,redundantGrid:4,evacNetwork:5},
 exploration:{mobileResearch:10,resourceDepot:8,openScience:8,recycling:7,privateSpace:7,autonomousMining:6,robotFarm:5,globalContracts:5,aiResearch:5,deepDrilling:4,automatedChain:4,industry40:3,underground:4,redundantGrid:4,evacNetwork:3},
 balanced:{recycling:9,resourceDepot:8,mobileResearch:8,privateSpace:8,globalContracts:7,openScience:7,autonomousMining:7,robotFarm:6,deepDrilling:6,automatedChain:6,aiResearch:6,industry40:5,underground:5,redundantGrid:5,evacNetwork:4}
 }[strategy]||{};
 const availableProjects=[...new Set([...(s.projectHand||[]),...(s.projectMarket||[])])];const pc=availableProjects.map(id=>({id,q:D.PROJECTS.find(x=>x.id===id),score:projectScores[id]||3,source:(s.projectHand||[]).includes(id)?'hand':'market'})).filter(z=>z.q&&!s.projects.includes(z.id)&&afford(s,z.q.cost)).sort((a,b)=>b.score-a.score)[0];
 if(pc&&pc.score>=6){if(E.buyProject(s,pc.id).ok){u.project[pc.id]=(u.project[pc.id]||0)+1;record(`${pc.q.name} gebaut (${pc.source==='hand'?'Hand':'Auslage'})`);return}}
 if(r<=launchRound-2&&(s.projectHand||[]).length<4&&(s.projectDeck||[]).length&&s.actions>=2){const q=E.drawProjectOffer(s);if(q.ok){const pick=q.cards.map(id=>({id,score:projectScores[id]||3})).sort((a,b)=>b.score-a.score)[0];E.chooseProjectCard(s,pick.id);record(`2 Projektkarten gezogen · ${D.PROJECTS.find(x=>x.id===pick.id)?.name||pick.id} behalten`);return}}
}
for(const [bid,type] of [['mine','resources'],['researchCenter','research'],['factory','industry']]){const b=D.STANDARD_BUILDINGS[bid],reg=s.regions.find(x=>x.type===type&&x.status&&x.buildings.length===0);if(reg&&afford(s,b.cost)){if(E.buildEarth(s,bid,reg.id).ok){record(`${b.name} gebaut`);return}}}
s.actions=0}
function load(s,strategy='balanced'){strategy=effectiveStrategy(s,strategy);const c=E.capacities(s),rank=['johnson','okafor','sato','alvarez','mei','williams','petrov','varga'],owned=rank.filter(id=>s.experts.includes(id));const targetColonists=c.people>=8?Math.min(6,s.population):c.people>=5?Math.min(4,s.population):Math.min(2,s.population);let population=targetColonists,experts=[];for(const id of owned)if(population+experts.length<c.people)experts.push(id);while(population<s.population&&population+experts.length<c.people)population++;const tr={research:['exobioLab','mobileResearch','robotFarm','autonomousMining','drones','fabrication','extremophile','foodRecycler','habitats','longRover','builders','oxygen','fusion'],industry:['fabrication','autonomousMining','robotFarm','mobileResearch','builders','fusion','drones','habitats','foodRecycler','extremophile','exobioLab','longRover','oxygen'],expansion:['habitats','robotFarm','mobileResearch','autonomousMining','foodRecycler','extremophile','drones','longRover','fabrication','builders','exobioLab','oxygen','fusion'],exploration:['drones','longRover','mobileResearch','autonomousMining','robotFarm','exobioLab','habitats','fabrication','extremophile','foodRecycler','builders','oxygen','fusion'],balanced:['drones','mobileResearch','robotFarm','autonomousMining','extremophile','fabrication','exobioLab','longRover','habitats','foodRecycler','builders','oxygen','fusion']}[strategy]||[];return{population,experts,material:Math.min(s.material,c.resources),tech:tr.filter(id=>E.transportableTechs(s).includes(id)).slice(0,c.tech)}}
function tryNE(s,log,strategy='balanced'){strategy=effectiveStrategy(s,strategy);const n=s.newEarth,record=x=>{if(log)log.push({round:s.round,phase:'newEarth',action:x,vp:n.vp,material:n.material,food:n.food,science:n.science})};
if(n.missions.filter(m=>m.selected).length<2){const pref={research:{alienTech:6,xenoScience:5},industry:{industryHub:6,xenoScience:2},expansion:{selfSufficient:6,frontier:4},exploration:{frontier:6,xenoScience:5},balanced:{}}[strategy]||{};const score=id=>(pref[id]||0)+({industryHub:n.landingMaterial>=7?8:5,selfSufficient:n.population>=4?8:5,alienTech:(n.experts.includes('okafor')||n.tech.includes('exobioLab'))?9:5,frontier:(n.tech.includes('drones')||n.tech.includes('longRover'))?9:6,xenoScience:(n.experts.includes('okafor')||n.tech.includes('exobioLab'))?8:6}[id]||5);for(const m of n.missions.filter(x=>!x.selected).sort((x,y)=>score(y.id)-score(x.id)).slice(0,2)){E.selectMission(s,m.id);record(`Kolonieziel gewählt: ${m.name}`)}}
const missions=n.missions.filter(m=>m.selected&&!m.claimed).map(m=>m.id),home=n.tiles.find(x=>x.settlement);
const valid=(kind,t)=>t&&t.state!=='unknown'&&E.hexDist(home,t)<=1&&!t.buildings.includes(kind);
const tileFor=(kind,terrains)=>n.tiles.find(t=>valid(kind,t)&&t.analyzed&&terrains.includes(t.discovery?.terrain))||n.tiles.find(t=>valid(kind,t)&&t.analyzed)||home;
const doBuild=(kind,terrains)=>{if(n.material<E.neCost(s,kind))return false;const t=tileFor(kind,terrains),q=E.neBuild(s,kind,t.id);if(q.ok){record(q.msg);return true}return false};
const prod=()=>{const c=JSON.parse(JSON.stringify(s));return E.neProduction(c)};
const freeKnown=t=>!t.blockedBy;
const nearWin=n.vp>=7;
const canScoreSite=t=>t&&freeKnown(t)&&t.analyzed&&!t.settlement;

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
// New-Earth engine projects: known cards compete with opportunities unlocked by exploration.
const projectScore=x=>{
 let z=0;if(x.production?.material)z+=x.production.material*(strategy==='industry'?5:3);if(x.production?.food)z+=x.production.food*(strategy==='expansion'?5:3);if(x.production?.science)z+=x.production.science*(strategy==='research'?5:3);
 if(x.range)z+=x.range*(strategy==='exploration'?7:3);if(x.oxygen)z+=x.oxygen*(n.population>=E.oxygenCapacity(s)-1?4:1);if(x.flex)z+=x.flex*4;if(x.settlementDiscount)z+=x.settlementDiscount*(strategy==='expansion'?4:2);if(x.unlock)z+=2;return z-(x.cost.material||0)*.35-(x.cost.science||0)*.25
};
const candidates=E.availableNEProjects(s).filter(x=>!E.neProjectHas(s,x.id)&&n.material>=(x.cost.material||0)&&n.science>=(x.cost.science||0)).sort((a,b)=>projectScore(b)-projectScore(a));
if(candidates.length&&projectScore(candidates[0])>=7){const q=E.buildNEProject(s,candidates[0].id);if(q.ok){record(q.msg);return}}
// Goal-driven builds; no universal mandatory order.
if(missions.includes('industryHub')&&prod().material<7&&doBuild('mine',['mineral','canyon','plain']))return;
if(missions.includes('selfSufficient')&&(n.buildings.farm<3||E.neFoodProd(s)<n.population+3)&&doBuild('farm',['fertile','ice','plain']))return;
if(missions.includes('alienTech')&&n.buildings.lab<1&&doBuild('lab',['ruin','plain']))return;
if(missions.includes('alienTech')&&n.alienResearch.length<3){for(const x of E.ALIEN_RESEARCH.filter(x=>x.path==='salvage'))if(!E.hasAlien(s,x.id)&&n.science>=x.cost){const q=E.alienResearch(s,x.id);if(q.ok){record(q.msg);return}}}
// Frontier is a legitimate opening: exploration itself now has milestone SP.
if(missions.includes('frontier')&&(n.roverExplored||0)<6){const fr=E.frontierTiles(s),opts=E.explorationOptions(s);if(fr.length&&opts.length){const pick=opts.slice().sort((x,y)=>((y.type==='alien'?5:0)+(y.id==='mineral'?3:0)+(y.id==='fertile'?2:0))-((x.type==='alien'?5:0)+(x.id==='mineral'?3:0)+(x.id==='fertile'?2:0)))[0],q=E.explore(s,pick.id,null,fr[0].id);if(q.ok){record(`Erkundet: ${pick.name}`);return}}}
// Analyze valuable known finds: relics, mission finds, then productive terrain.
const value=t=>(!freeKnown(t)?-100:0)+(['ruin','signal'].includes(t.discovery.id)?(nearWin?14:11):0)+(missions.includes('xenoScience')?3:0)+(t.discovery.id==='mineral'&&n.buildings.mine<2?5:0)+(['fertile','ice','microbes'].includes(t.discovery.id)&&n.buildings.farm<2?4:0)-(t.discovery.analysis||0);
for(const t of n.tiles.filter(t=>t.discovery&&!t.analyzed&&!t.blockedBy&&t.discovery.id!=='plain').sort((x,y)=>value(y)-value(x))){const q=E.analyze(s,t.discovery.id,t.id);if(q.ok){record(q.msg);return}}
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
// Exploration is useful for its 5-discovery milestone and for claiming valuable sites.
if((n.roverExplored||0)<5){const next=5;if(next-(n.roverExplored||0)<=2){const fr=E.frontierTiles(s),opts=E.explorationOptions(s);if(fr.length&&opts.length){const pick=opts.slice().sort((x,y)=>(y.type==='alien'?1:0)-(x.type==='alien'?1:0))[0],q=E.explore(s,pick.id,null,fr[0].id);if(q.ok){record(`Erkundet: ${pick.name}`);return}}}}
// Near the finish line, stop engine-building if a settlement can score immediately.
if(nearWin&&n.material>=E.neCost(s,'settlement')&&E.neFoodProd(s)>=(E.has(s,'foodRecycler')?0:n.settlements+1)){const t=n.tiles.find(x=>x.analyzed&&!x.settlement&&!x.blockedBy&&E.neReach(s,x));if(t){const q=E.neBuild(s,'settlement',t.id);if(q.ok){record(q.msg);return}}}
// Deep specialization: only while it still improves a relevant economy; don't spam a fourth/fifth building by identity alone.
if(strategy==='research'&&n.buildings.lab<3&&!nearWin&&doBuild('lab',['ruin','plain']))return;
if(strategy==='industry'&&n.buildings.mine<3&&!nearWin&&doBuild('mine',['mineral','canyon','plain']))return;
if(strategy==='expansion'&&n.buildings.farm<3&&!nearWin&&doBuild('farm',['fertile','ice','plain']))return;
if(strategy==='exploration'&&(n.roverExplored||0)<6){const fr=E.frontierTiles(s),opts=E.explorationOptions(s);if(fr.length&&opts.length){const pick=opts.slice().sort((x,y)=>(y.type==='alien'?1:0)-(x.type==='alien'?1:0))[0],q=E.explore(s,pick.id,null,fr[0].id);if(q.ok){record(`Erkundet: ${pick.name}`);return}}}
// Develop special sites for SP rather than spam generic buildings.
if(n.buildings.mine<(strategy==='industry'?3:strategy==='research'?1:2)&&doBuild('mine',['mineral','canyon']))return;
if(n.buildings.farm<(strategy==='expansion'?3:strategy==='industry'?1:2)&&doBuild('farm',['fertile','ice']))return;
if(n.buildings.lab<(strategy==='research'?3:strategy==='industry'?1:2)&&doBuild('lab',['ruin']))return;
// Settlement network: useful, but diminishing SP means it is not the only late-game answer.
const settlementCap=strategy==='expansion'?5:4;if(n.settlements<settlementCap&&n.material>=E.neCost(s,'settlement')&&E.neFoodProd(s)>=(E.has(s,'foodRecycler')?0:n.settlements+1)){const t=n.tiles.find(x=>x.analyzed&&!x.settlement&&!x.blockedBy&&E.neReach(s,x));if(t){const q=E.neBuild(s,'settlement',t.id);if(q.ok){record(q.msg);return}}}
n.actions=0}
function runOne(launchRound,seed=1,det=false,withLog=false,strategy='balanced'){const s=E.newGame(seed),launchStyle=strategy,preferredShift={research:0,industry:0,balanced:0,expansion:0,exploration:0}[strategy]||0,plannedLaunch=Math.max(3,Math.min(7,launchRound+preferredShift)),usage={tech:{},expert:{},project:{}},vpTimeline={},log=[];let landingRound=null,launchLoad=null;while(!s.gameOver&&s.round<40){if(s.phase==='earth'){if(!s.event)E.drawEvent(s,det?({1:'heat',2:'brainDrain',3:'supply',4:'drought',5:'energy',6:'infra',7:'cascade'}[s.round]):undefined);while(s.actions>0&&s.round<plannedLaunch)tryEarth(s,plannedLaunch,usage,withLog?log:null,strategy);if(s.round>=plannedLaunch){launchLoad=load(s,strategy);if(E.launch(s,launchLoad).ok){landingRound=s.round;if(withLog)log.push({round:s.round,phase:'launch',action:'RAKETENSTART',load:launchLoad,vp:s.newEarth.vp});continue}}E.endRound(s)}else{while(s.newEarth.actions>0&&!s.gameOver)tryNE(s,withLog?log:null,strategy);E.endRound(s);vpTimeline[s.round]=s.newEarth.vp}}
const n=s.newEarth||{prodHistory:[],vp:0,tech:[],experts:[],population:0,landingMaterial:0},cap=E.capacities(s);return{seed,strategy,launchRound:plannedLaunch,launchAnchor:launchRound,finishRound:s.gameOver?s.round:null,landingRound,launchLoad,log:withLog?log:undefined,vpTimeline,neRoundsToWin:s.gameOver&&landingRound!=null?s.round-landingRound:null,prod1:n.prodHistory[0]||null,prod2:n.prodHistory[1]||null,prod3:n.prodHistory[2]||null,earthLosses:s.earthLosses,techValue:n.tech.length,unused:{people:Math.max(0,cap.people-n.population-n.experts.length),resources:Math.max(0,cap.resources-(n.landingMaterial||0)),tech:Math.max(0,cap.tech-n.tech.length)},usage,finalVP:n.vp,buildings:n.buildings||{},profile:s.newEarth?E.strategyProfile(s):{},contactLevel:n.contactLevel||0,contactUnlocked:!!n.contactUnlocked,alienResearch:[...(n.alienResearch||[])],missions:(n.missions||[]).map(m=>({id:m.id,selected:!!m.selected,claimed:!!m.claimed,vp:m.vp}))}}
const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;function aggregate(rows){const sum=kind=>{const o={};for(const r of rows)for(const[k,v]of Object.entries(r.usage[kind]))o[k]=(o[k]||0)+v;return Object.fromEntries(Object.entries(o).map(([k,v])=>[k,v/rows.length]))},prod=i=>({material:avg(rows.map(r=>r[`prod${i}`]?.material||0)),food:avg(rows.map(r=>r[`prod${i}`]?.food||0)),science:avg(rows.map(r=>r[`prod${i}`]?.science||0))});return{launchRound:rows[0].launchRound,n:rows.length,finishRound:avg(rows.map(r=>r.finishRound).filter(Boolean)),winRate:rows.filter(r=>r.finishRound).length/rows.length,prod1:prod(1),prod2:prod(2),prod3:prod(3),earthRegions:avg(rows.map(r=>r.earthLosses.regions)),earthBuildings:avg(rows.map(r=>r.earthLosses.buildings)),earthMeeples:avg(rows.map(r=>r.earthLosses.meeples)),techValue:avg(rows.map(r=>r.techValue)),unusedPeople:avg(rows.map(r=>r.unused.people)),unusedResources:avg(rows.map(r=>r.unused.resources)),unusedTech:avg(rows.map(r=>r.unused.tech)),usage:{tech:sum('tech'),expert:sum('expert'),project:sum('project')},missions:Object.fromEntries(['selfSufficient','xenoScience','industryHub','frontier','alienTech'].map(id=>{const selected=rows.filter(r=>(r.missions||[]).some(m=>m.id===id&&m.selected)).length,claimed=rows.filter(r=>(r.missions||[]).some(m=>m.id===id&&m.claimed)).length;return[id,{selected,claimed,claimRate:selected?claimed/selected:0}]}))}}
function compareDeterministic(){const rows=[3,4,5,6,7].map(r=>runOne(r,424242,true));for(const later of rows){later.earlyLead={};for(const early of rows.filter(x=>x.launchRound<later.launchRound))later.earlyLead[early.launchRound]=early.vpTimeline[later.launchRound]||0}return rows}function monteCarlo(n=10000){return[3,4,5,6,7].map(r=>aggregate(Array.from({length:n},(_,i)=>runOne(r,100000*r+i))))}

function createDuel(human,seed=777,strategy='balanced',launchRound=5){
 const ai=createAI(seed,strategy,launchRound),market={projectDeck:human.projectDeck,projectMarket:human.projectMarket,expertDeck:human.expertDeck,expertMarket:human.expertMarket},world={tiles:null};
 dealProjectHand(ai.s,market,3);syncMarketToPlayer(ai.s,market);return{human,ai,market,world,humanOwner:'H',aiOwner:'KI'};
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
function advanceDuelAI(duel){
 while(!duel.ai.finished&&duel.ai.s.round<duel.human.round)aiDuelTurn(duel);
 if(!duel.ai.finished&&duel.ai.s.round===duel.human.round&&duel.human.round%2===0)aiDuelTurn(duel);
 return duel.ai
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
function aiSnapshot(ai){const s=ai.s,n=s.newEarth;return{phase:s.phase,round:s.round,strategy:ai.strategy==='adaptive'?(s.strategyLean||'adaptive'):ai.strategy,launchRound:ai.launchRound,vp:n?.vp||0,settlements:n?.settlements||0,buildings:n?.buildings||{},material:n?.material||0,food:n?.food||0,science:n?.science||0,contactLevel:n?.contactLevel||0,finished:ai.finished}}

const api={runOne,aggregate,compareDeterministic,monteCarlo,createAI,configureAI,aiTurn,aiSnapshot,createDuel,syncHumanDuel,aiDuelTurn,advanceDuelAI};root.NewEarthSimulation=api;if(typeof module!=='undefined')
function makeSharedMarket(seed=1){
 const host=E.newGame(seed);
 // host hand is returned: runRace deals private hands from one common deck.
 return{projectDeck:[...(host.projectDeck||[]),...(host.projectHand||[])],projectMarket:host.projectMarket,expertDeck:host.expertDeck,expertMarket:host.expertMarket};
}
function dealProjectHand(player,market,count=3){player.projectHand=[];while(player.projectHand.length<count&&market.projectDeck.length)player.projectHand.push(market.projectDeck.shift())}
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
 players.forEach(p=>dealProjectHand(p.s,market,3));
 let worldRound=1;
 while(worldRound<25&&!players.some(p=>p.finished)){
  const order=worldRound%2?players:[...players].reverse();
  for(const p of order){
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
 return players.map(p=>({id:p.id,launchRound:p.launchRound,strategy:p.strategy,finished:p.finished,vp:p.s.newEarth?.vp||0,landed:p.landed,experts:p.s.experts||[],projects:p.s.projects||[],rocket:p.s.rocket,settlements:p.s.newEarth?.settlements||0,explored:p.s.newEarth?.roverExplored||0,buildings:p.s.newEarth?.buildings||{}}));
}
api.runRace=runRace;module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
