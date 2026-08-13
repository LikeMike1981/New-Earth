# New Earth v1.9 – Smart AI Review

Die KI wurde nach manueller Analyse einzelner Partien überarbeitet. Ziel war ausdrücklich NICHT, ihre Siegquote künstlich zu erhöhen, sondern offensichtlich schlechte Entscheidungen zu entfernen.

## Erde
- Vorfertigungen haben jetzt strategische Obergrenzen. Industrie baut maximal 2 Industriemodule, Forschung maximal 2 Forschungsmodule, Expansion maximal 2 Agrarmodule; Nebenmodule normalerweise nur einmal.
- Experten werden aus dem aktuellen gemeinsamen Markt bewertet statt nach einer starren Namensliste genommen.
- Die KI nimmt maximal zwei Experten und rekrutiert einen zweiten nur, wenn dessen strategischer Wert hoch genug ist.
- Beispiel: Okafor erhält für Forschung sehr hohen Wert; Sato für Industrie; Alvarez für Expansion; Johnson für Exploration.
- Projekte werden ebenfalls nach Strategie und aktuellem Markt bewertet statt einfach das erste bezahlbare Projekt zu kaufen.

## New Earth
- Bereits vom Gegner beanspruchte Funde werden bei der Analyse ausgeschlossen.
- Ruinen und Signale erhalten in der Schlussphase höhere Priorität.
- Ab 7 SP versucht die KI, direkt punktende Siedlungen vor zusätzlichem Engine-Ausbau zu bauen.
- Spezialisierung ist nicht mehr „baue 4–5 gleiche Gebäude“:
  Forschung max. etwa 3 Labore, Industrie max. etwa 3 Minen, Expansion max. etwa 3 Farmen, sofern kein konkretes Ziel etwas anderes verlangt.
- Normale Siedlungsexpansion ist auf 4 Siedlungen begrenzt, Expansion auf 5; darüber nur, wenn eine unmittelbare Schlussaktion sie rechtfertigt.
- Exploration bleibt stark, aber der Bot soll nach erreichten Meilensteinen eher wertvolle Funde verwerten als blind weiter aufzudecken.

## Kontrollsimulation nach den Änderungen
Balanced vs Balanced, 180 gemeinsame Partien pro Timingpaar:

R3 vs R5: 45 – 103, 32 Rest
R3 vs R6: 72 – 75, 33 Rest
R4 vs R6: 74 – 72, 34 Rest
R5 vs R6: 78 – 48, 54 Rest
R5 vs R7: 111 – 23, 46 Rest

Besonders wichtig:
- R3 vs R6 ist praktisch exakt offen.
- R4 vs R6 ebenfalls.
- R5 ist aktuell gegen R3 zu stark; das ist jetzt eher ein echter Balancehinweis, weil grobe KI-Fehler reduziert wurden.
- R7 bleibt deutlich riskanter/extremer.
- Die nächste Zahlenkorrektur sollte daher eher R5 leicht abschwächen bzw. den zusätzlichen Vorbereitungswert zwischen R5 und R6 verschieben, nicht pauschal Spätstarts stärken.

## Noch nicht perfekt
Die KI ist weiterhin heuristisch, kein Suchalgorithmus. Sie plant keine vollständigen fünf Runden voraus. Sie bewertet aber nun Markt, Strategie, Enginelimits, Siegpunktenähe und gegnerisch beanspruchte Orte. Damit sind ihre Partien wesentlich brauchbarer als Balancegrundlage.
