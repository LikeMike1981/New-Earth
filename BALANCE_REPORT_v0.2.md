# Balance-Report v0.2

50.000 Monte-Carlo-Läufe (10.000 je Abflug R3–R7), identische Regel-Engine wie UI.

| Abflug | Ø Runde bis 10 SP | Prod. NE1 | NE2 | NE3 | Ø zerstörte Erdregionen | Ø Tech-Fracht | Ø freie Fracht |
|---|---:|---:|---:|---:|---:|---:|---:|
| R3 | 17,56 | 5,14 | 5,33 | 5,65 | 0,30 | 0,96 | 6,79 |
| R4 | 17,72 | 5,25 | 5,48 | 6,40 | 0,72 | 1,25 | 5,55 |
| R5 | **17,35** | 6,37 | 7,18 | 8,23 | 2,09 | 1,59 | 3,88 |
| R6 | 17,81 | 6,89 | 8,11 | 8,85 | 3,53 | 1,72 | 2,61 |
| R7 | 18,51 | 7,21 | 8,67 | 9,18 | 5,01 | 1,95 | 1,83 |

## Interpretation
- In dieser ersten Heuristik dominiert **keine** Abflugrunde klar. R5 ist im Mittel am schnellsten, aber nur ca. 0,2–0,5 Runden vor R3/R4/R6.
- R7 startet erwartungsgemäß mit der stärksten Kolonie, verliert den Zeitvorteil aber und trägt deutlich höhere Erdverluste.
- R3 hat viel ungenutzte Fracht und wenig Tech: genau das gewünschte Pioneer-Profil.
- R6/R7 haben deutlich höhere Produktion nach 1–3 Planetenrunden: der gewünschte Catch-up ist sichtbar.
- Vor konkreten Zahlenänderungen sollten echte Spielentscheidungen/Pick-Rates getestet werden. Der Agent kauft Karten/Experten noch nicht strategisch genug, um deren Einzelwert belastbar zu bewerten.
