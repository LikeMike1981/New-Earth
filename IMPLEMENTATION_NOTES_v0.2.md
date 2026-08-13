# New Earth v0.2 – Implementierungsnotizen

## Wiederverwendet
- Vanilla HTML/CSS/JS ohne Build-Schritt
- iPad-/Safari-orientierte Touch-Oberfläche
- Karten-/Panel-Grundlayout

## Ersetzt / neu
- 15 alte Geländeplättchen → 18 Wirtschaftsregionen (6/6/6)
- alte Nahrung/Worker-Erdökonomie → v0.2 Geld/Material/Wissenschaft + 5 Meeple
- Platzhaltergebäude/-forschung/-rakete → v0.2 Standardgebäude, 15 Projekte, 10 Technologien, 8 Experten, Raketenmodule
- 10 alte Ereignisse → 12 gestufte Ereignisse
- vollständiger Abflug + New-Earth-Phase bis 10 SP
- zentrale Daten (`data.js`) und UI-unabhängige Regel-Engine (`engine.js`)
- Debug/Import/Export und Seed
- Headless-Tests und Simulation (`tests/test.js`, `simulate.js`)

## Reversible Annahmen für offene Punkte
1. Erdregionen sind abstrakte Slots; Startmeeple liegen gesammelt auf Industrie 1 / Rohstoffe 1 / Forschung 1.
2. Pro Standard-Produktionsgebäude wird im Prototyp eine Region verwendet; Katastrophenschutz ist zusätzlich möglich.
3. Projekt-/Expertenmarkt ist für den Kern-Test vollständig offen, damit Kartenglück die Abflugfrage nicht verdeckt.
4. New-Earth-Versorgung ist minimal: Start-Siedlung erzeugt 1 Nahrung; zusätzliche Siedlung verlangt ausreichende Nahrungsproduktion. Nahrungsrecycler kann diesen Bedarf auf 0 reduzieren.
5. Exploration benötigt einen Rover und eine Aktion. Gute Funde werden erst nach Analyse zu SP.
6. Verbesserter Antrieb ist als Feature Flag standardmäßig deaktiviert.
7. Der Simulationsagent ist bewusst heuristisch und kein perfekter Spieler; Ergebnisse sind ein Balance-Signal, keine Endbalance.
