# New Earth – spielbarer Prototyp v0.2

Offline-fähiger Vanilla-HTML/CSS/JS-Prototyp nach **New Earth – Design- und Balancing-Dokument v0.2**.

## Start
`index.html` in Safari/Browser öffnen. Kein Build-Schritt nötig.

## Enthalten
- Erde mit 18 Regionen, 3 Schadenszuständen und v0.2-Einkommen
- 5 immer verfügbare Standardgebäude
- 15 Projektkarten, 10 Zukunftstechnologien, 8 Experten
- 12 Ereignisse in Instabilität/Krise/Kollaps
- modulare Rakete, harte Beladekapazitäten und individueller Abflug
- New Earth: Siedlungen, Mine, Farm, Labor, Rover, Exploration/Analyse, 10-SP-Ende
- Debugmodus mit Ressourcen/Runde/Seed, Tech/Experten, Rakete, Ereignis erzwingen, Export/Import
- UI-unabhängige Regel-Engine und Headless-Simulation

## Tests / Simulation
```sh
node tests/test.js
node simulate.js
```
`simulate.js` führt 10.000 Monte-Carlo-Läufe pro Abflugstrategie R3–R7 aus und schreibt `SIMULATION_RESULTS.json`.

Siehe `IMPLEMENTATION_NOTES_v0.2.md` und `BALANCE_REPORT_v0.2.md`.
