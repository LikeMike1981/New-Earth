# Balance Review v1.6.1 – Timing, Engines und Alienpfade

## Ziel
Frühstart = Vorsprung auf New Earth, aber schwächere Engine.
Spätstart = weniger Zeit auf New Earth, aber deutlich stärkerer Start und höhere Entwicklungsgeschwindigkeit.
Keine abstrakten Boni für eine bestimmte Abflugrunde.

## Änderungen
- Vorfertigungen günstiger:
  - Agrar / Industrie / Rover: 5 G + 1 M
  - Forschung: 6 G + 1 M
- Vorfertigte Farm/Mine/Labor produzieren zusätzlich +1 ihres Spezialertrags pro Runde. Das repräsentiert auf der Erde vollständig kalibrierte Expeditionsinfrastruktur.
- Bot beginnt für R6/R7 früher mit realer Raketen-/Expeditionsvorbereitung.
- Maximale sinnvolle Vorfertigung im Bot: R5 2, R6 4, R7 5 Module.
- Forschungsvorbereitung nimmt zusätzlich Industrie-Infrastruktur mit, damit eine reine Forschungsstrategie nicht an Material erstickt.
- Industrie kann Wissenschaft effizienter über Material erzeugen; Forschung Material über Wissenschaft.
- Kontaktforschung: Musterlinguistik 3 W, Resonanz 4 W, Wissensaustausch 5 W.
- Kontaktstufen kosten 3 / 4 / 5 W vor Resonanzrabatt.

## Monte-Carlo
1.500 intelligente Strategie-Partien im finalen Pass (300 pro Strategie, verteilt auf R3–R7).

Abflug | Siegquote | globale Zielrunde | NE-Runden bis Ziel
R3 | 88.9% | 9.29 | 6.29
R4 | 89.5% | 9.50 | 5.50
R5 | 86.5% | 9.95 | 4.95
R6 | 83.1% | 10.42 | 4.42
R7 | 82.5% | 11.45 | 4.45

Vorher benötigten R6/R7 grob 5.9 NE-Runden; jetzt etwa 4.4. Der gewünschte Engine-Effekt ist damit deutlich sichtbar.

## Interpretation
R3 bleibt im Solosimulator global vorne. Das ist derzeit ABSICHTLICH nicht vollständig durch Zahlen neutralisiert: Der Simulator modelliert noch keine gemeinsame New-Earth-Karte und damit weder weggenommene Ruinen noch Konkurrenz um gute Gebiete. Um R6/R7 jetzt künstlich auf exakt dieselbe Zielrunde zu drücken, wären die Spätstart-Engines für das spätere Mehrspieler-Race wahrscheinlich überstark.

Der wichtige Wert ist deshalb die Steigung:
- R3 braucht nach Landung ~6.3 Runden.
- R5 ~5.0.
- R6/R7 ~4.4.
Damit landen späte Expeditionen tatsächlich mit einer schnelleren Maschine.

R7 bleibt High-Risk und liegt global etwa 2.2 Runden hinter R3. Vor einer weiteren massiven R7-Stärkung sollte die gemeinsame Karte simuliert werden.

## Strategie-Befund
Exploration und Expansion sind noch robuster als Forschung/Industrie. Forschung hat höhere Varianz und ist aktuell der schwächste Pfad. Das ist der nächste konkrete Strategie-Balancepunkt; nicht mehr pauschal alle Spätstarts stärken.
