# New Earth – Smart Simulation Review v0.7

## Warum dieser Pass
Die alte Simulation traf offensichtlich schlechte Entscheidungen (Experten rekrutieren und trotz freiem Sitz zurücklassen; Material-Softlocks; SP durch bloßes Analysieren farmen). Solche Läufe taugen nicht zum Balancing.

## Änderungen
- Raketenbeladung priorisiert jetzt sinnvolle Auslastung und nimmt rekrutierte Experten mit, sofern Sitzplätze vorhanden sind.
- Frühe Starts sichern zuerst 5 Personenplätze und Frachtraum; zusätzliche Wohnmodule für Experten kommen danach.
- Der Bot rekrutiert bei sehr frühem Start keine Experten, wenn dadurch die notwendige Frachtvorbereitung verdrängt würde.
- New Earth baut früh mindestens eine Mine und anschließend eine Wissenschaftsbasis, statt sich in 1-Material/Runde festzufahren.
- Gewählte Ziele beeinflussen die Entscheidungen des Bots tatsächlich.
- Neue Grenze zählt echte Rover-Erkundungen statt kostenlos beim Landen sichtbarer Felder.
- Exploration kann Entdeckungstypen wiederholt ziehen; die 8 Typen sind keine einmaligen Karten.
- Normale Analyse gibt nicht mehr automatisch 1 SP. SP entstehen überwiegend durch Erschließen/Nutzen eines Fundes; das seltene Signal bleibt 1 SP wert.
- Produktive Erschließung eines passenden Sonderfeldes durch Mine/Farm/Labor gibt 1 SP.

## Kontrolllauf – 400 Partien je Abflugrunde
- R3: erfolgreiche Läufe Ø Ende R10.62; Winrate bis R40 47.0%; ungenutzte Personenplätze Ø 0.00; Ressourcenplätze Ø 3.23.
- R4: erfolgreiche Läufe Ø Ende R11.04; Winrate bis R40 37.0%; ungenutzte Personenplätze Ø 0.00; Ressourcenplätze Ø 0.01.
- R5: erfolgreiche Läufe Ø Ende R12.46; Winrate bis R40 39.2%; ungenutzte Personenplätze Ø 0.29; Ressourcenplätze Ø 0.08.
- R6: erfolgreiche Läufe Ø Ende R12.85; Winrate bis R40 39.5%; ungenutzte Personenplätze Ø 0.13; Ressourcenplätze Ø 0.01.
- R7: erfolgreiche Läufe Ø Ende R13.58; Winrate bis R40 40.2%; ungenutzte Personenplätze Ø 0.03; Ressourcenplätze Ø 0.00.

## Extreme erfolgreiche Einzelpartien
- Schnellster Lauf: Seed 1130213, Abflug R3, 10 SP in R8. Ladung: {'population': 5, 'experts': [], 'material': 9, 'tech': []}.
- Langsamster erfolgreicher Lauf: Seed 1170001, Abflug R7, 10 SP in R24. Ladung: {'population': 1, 'experts': ['johnson'], 'material': 11, 'tech': ['drones']}.

## Noch nicht als endgültige Balance lesen
Die Winrate bis Runde 40 ist nach dem Entfernen der Gratis-SP noch zu niedrig. Das ist jetzt aber ein ehrlicheres Signal: Die Siegpunktökonomie auf New Earth braucht als nächsten Schritt zusätzliche sinnvolle Entwicklungs-/Kolonie-SP oder niedrigere Zielhürden. Ich habe nicht wieder Gratis-SP eingebaut, nur um die Simulation schön aussehen zu lassen.