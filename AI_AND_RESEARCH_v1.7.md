# New Earth v1.7 – KI-Gegner + Forschungsbalance

## KI im Spiel
- Ein KI-Gegner läuft jetzt parallel zur menschlichen Partie.
- Standard: ausgewogene KI, geplanter Abflug Runde 5.
- In Runde 1–2 können Strategie und geplanter Abflug eingestellt werden:
  Forschung, Industrie, Expansion, Exploration oder Ausgewogen; R3–R7.
- Nach jeder menschlichen Runde spielt die KI automatisch ihre komplette Runde.
- Der Statusbereich zeigt Phase, geplanten Abflug bzw. SP, Siedlungen und Kerngebäude.
- Die KI benutzt dieselbe Entscheidungslogik wie die Monte-Carlo-Simulation: Erdkarten/Technologien/Experten, Raketenmodule, reale Vorfertigung, Abflug, New-Earth-Bau, Exploration, Alienforschung und Kontakt.

Wichtig: Die KI besitzt derzeit noch eine eigene New-Earth-Karteninstanz. Sie ist damit ein echter Tempo-/Engine-Gegner, aber noch kein territorialer Gegner, der dem Menschen konkrete Hexfelder wegnehmen kann. Die gemeinsame Karte ist der nächste Multiplayer-Schritt.

## Forschungsbalance
Forschung war im vorherigen Pass deutlich volatiler/schwächer. Deshalb:
- Exobiologisches Labor: +2 statt +1 Wissenschaft/Runde.
- Die erste Alienforschung kostet mit Exobiologischem Labor 1 W weniger.
- Forschungs-Spezialisierung erzeugt bereits ab Profilstufe 3 +1 W/Runde; ab Stufe 5 weiterhin zusätzlich +2.
- Ziel „Neue Wissenschaft“ verlangt 2 statt 3 geborgene Alien-Technologien plus Labor.
- Forschungsstrategie nimmt bei später Expedition Industrie-Vorfertigung mit, damit sie nicht ausschließlich an Materialmangel scheitert.

## KI-Smoketest
Je 500 KI-Partien über gemischte Abflugzeitpunkte:
- Forschung: 310/500 Siege, Ø Zielrunde 9.69 bei Siegen
- Industrie: 398/500, Ø 10.66
- Expansion: 473/500, Ø 9.63
- Exploration: 500/500, Ø 9.73
- Ausgewogen: 443/500, Ø 9.72

Forschung ist jetzt bei erfolgreichen Partien schnell genug, bleibt aber deutlich riskanter als Exploration/Expansion. Das ist momentan erwünscht: Forschung hat höhere Upside über Alien-Tech/Kontakt, aber benötigt passende Funde und eine funktionierende Wissenschafts-/Materialökonomie.

## Noch offen
Die größte verbleibende Simulationseinschränkung ist die getrennte New-Earth-Karte. Für die eigentliche Frage „Frühstarter nimmt die besten Ruinen weg, Spätstarter landet mit stärkerer Engine“ muss als nächstes eine gemeinsame Welt mit Besitz/Beanspruchung simuliert und anschließend auch in die UI übertragen werden.
