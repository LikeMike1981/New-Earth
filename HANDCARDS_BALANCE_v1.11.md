# New Earth v1.11 – Handkarten + Balance

## Handkartensystem
- Jeder Spieler startet mit 3 privaten Projektkarten.
- Zusätzlich liegen 3 gemeinsame Projektkarten offen aus.
- Eine Handkarte kann nur ihr Besitzer bauen.
- Eine offene Karte kann vom Gegner weggeschnappt werden.
- Nach Kauf aus der offenen Auslage wird sofort aus dem gemeinsamen Projektstapel nachgezogen.
- Handkarten werden nicht automatisch ersetzt.
- Für 1 Aktion darf 1 neue Projektkarte gezogen werden.
- Handlimit: 5.
- Für 1 Aktion darf weiterhin die komplette offene Auslage erneuert werden.
- Experten bleiben ein gemeinsamer offener Markt.
- Technologien bleiben persönliche Forschung.

Damit hat ein Spieler zu Beginn nicht mehr den vollständigen Projektkatalog. Strategie entsteht aus privater Hand + gemeinsamer Auslage + Expertenmarkt + Regionen + Ereignissen.

## KI
- Die KI bewertet jetzt sowohl ihre privaten Handkarten als auch die gemeinsame Auslage.
- Neue Strategieoption „Opportunistisch“ reagiert auf Karten und Experten der konkreten Partie und legt daraus einen Schwerpunkt fest.
- Im Browser ist Opportunistisch der Standardgegner.
- Gemeinsame Marktinitiative wechselt pro Runde: Mensch beginnt in ungeraden Runden, KI in geraden. Damit hat nicht immer derselbe Spieler Erstzugriff auf offene Karten.
- Die Race-Simulation verwendet dieselbe wechselnde Initiative.

## Balanceänderungen nach Einführung der Handkarten
Handkarten erhöhten die Varianz und machten Expansion/Exploration zu zuverlässig. Deshalb:
- Alien-Tech-Forschung: 1 SP für die erste und einen zweiten SP für die zweite geborgene Alien-Technologie.
- Industrie: 1 SP bei 2 Minen, zweiter Infrastruktur-SP bei 3 Minen.
- Exploration: nur noch 1 direkter Erkundungs-SP bei 5 Rover-Erkundungen. Weitere Erkundung lohnt sich über Gebiete/Funde, nicht über automatische SP.
- „Neue Grenze“ benötigt 6 echte Rover-Erkundungen.
- „Autarke Kolonie“ benötigt 3 Farmen und Nahrungsproduktion mindestens Bevölkerung +3.

## Strategie-Kontrollläufe
Die spezialisierten Bots sind weiterhin unterschiedlich:
- Forschung ist deutlich konkurrenzfähiger, aber schwankt stärker durch Funde/Kontakt.
- Industrie ist stabiler geworden und hat einen echten Spezialisierungs-SP-Pfad.
- Expansion bleibt robust, aber Autarkie ist nicht mehr fast automatisch.
- Exploration ist weiterhin zuverlässig, gewinnt aber langsamer und muss Funde tatsächlich verwerten.
- Opportunistisch liegt als allgemeiner Gegner zwischen den Extremen und reagiert auf seine Karten.

## Gemeinsame Race-Simulation – Opportunistisch gegen Opportunistisch
240 Partien pro Paar, wechselnde Initiative:

- R3 vs R5: 129 – 82, 29 Rest
- R3 vs R6: 111 – 88, 41 Rest
- R4 vs R5: 117 – 90, 33 Rest
- R4 vs R6: 105 – 102, 33 Rest
- R5 vs R6: 75 – 131, 34 Rest
- R5 vs R7: 151 – 58, 31 Rest
- R6 vs R7: 132 – 61, 47 Rest

Besonders wichtig:
- R4 vs R6 ist praktisch 50:50.
- R3 vs R6 bleibt offen genug, aber der Frühstarter hat einen realen territorialen Vorteil.
- R6 schlägt R5 häufig durch die deutlich stärkere vorbereitete Engine.
- R7 ist als Extremstrategie insgesamt riskant, kann aber mit passenden Strategien sehr wohl gewinnen.

Beispiel R5 vs R7 über verschiedene Strategien:
- R5 Industrie vs R7 Forschung: nahezu ausgeglichen.
- R5 Exploration vs R7 Forschung: R7 gewann deutlich häufiger.
- R5 Exploration vs R7 Expansion: R7 gewann deutlich häufiger.

Damit erfüllt R7 besser die gewünschte Rolle „Top oder Flop abhängig von Vorbereitung und Partie“ statt schlicht nur „schlechter weil später“.

## Noch offen
Der nächste gute Playtest ist jetzt nicht wieder ein großer Regelumbau, sondern echte Partien mit Handkarten:
- Fühlt sich 3 Hand + 3 offen nach genug Auswahl an?
- Ist 1 Aktion für Nachziehen interessant oder zu teuer?
- Entsteht durch die private Hand ein Plan, ohne dass man sich schon in Runde 1 festgelegt fühlt?
