# New Earth – Rebalance v1.0.1

## Was nach Einführung der zufälligen Märkte auffiel
Die Märkte funktionieren als Varianzquelle, aber die New-Earth-SP waren zu leicht über Exploration zu stapeln. Gleichzeitig war Forschung im Vergleich zu Expansion/Exploration zu unzuverlässig und Industrie bei spätem Abflug schwach.

## Änderungen
- Exploration: SP-Meilensteine jetzt bei 3 und 7 echten Rover-Erkundungen (max. 2 SP statt 3).
- Neue Grenze: benötigt 5 echte Rover-Erkundungen statt 4.
- Alienforschung: 1 SP für die erste Alien-Technologie und ein zweiter bei der dritten. Damit trägt eine echte Forschungsengine früher zum Sieg bei.
- Industriezentrum: Produktionsschwelle 7 M statt 8 M; hohe Industriespezialisierung behält ihren Produktionsbonus.
- Industrie erhält weiterhin nur einen Infrastruktur-SP ab der zweiten Mine; der zuvor getestete zusätzliche SP bei vier Minen bleibt entfernt.
- Markt unverändert: 5 Projekte, 4 Experten, Nachziehen, Projekt-Refresh für 1 Aktion.

## Finaler Bot-Kontrolllauf (250 Seeds je Strategie × Abflugrunde)
### balanced
- R3: Winrate 94 %, erfolgreiche Partien Ø Ende R9.6; Gebäude 2.7 Mine / 2.5 Farm / 1.7 Labor.
- R4: Winrate 95 %, erfolgreiche Partien Ø Ende R10.3; Gebäude 2.7 Mine / 2.5 Farm / 1.8 Labor.
- R5: Winrate 95 %, erfolgreiche Partien Ø Ende R10.4; Gebäude 2.3 Mine / 2.0 Farm / 1.6 Labor.
- R6: Winrate 96 %, erfolgreiche Partien Ø Ende R11.1; Gebäude 2.1 Mine / 1.8 Farm / 1.5 Labor.
- R7: Winrate 95 %, erfolgreiche Partien Ø Ende R11.9; Gebäude 2.0 Mine / 1.9 Farm / 1.5 Labor.
### research
- R3: Winrate 86 %, erfolgreiche Partien Ø Ende R8.8; Gebäude 1.0 Mine / 1.2 Farm / 3.1 Labor.
- R4: Winrate 87 %, erfolgreiche Partien Ø Ende R9.4; Gebäude 1.0 Mine / 1.4 Farm / 3.2 Labor.
- R5: Winrate 88 %, erfolgreiche Partien Ø Ende R10.0; Gebäude 0.9 Mine / 1.1 Farm / 2.8 Labor.
- R6: Winrate 88 %, erfolgreiche Partien Ø Ende R11.1; Gebäude 0.8 Mine / 1.2 Farm / 2.7 Labor.
- R7: Winrate 86 %, erfolgreiche Partien Ø Ende R12.0; Gebäude 0.8 Mine / 1.2 Farm / 2.6 Labor.
### industry
- R3: Winrate 85 %, erfolgreiche Partien Ø Ende R8.2; Gebäude 3.2 Mine / 1.7 Farm / 0.8 Labor.
- R4: Winrate 83 %, erfolgreiche Partien Ø Ende R9.4; Gebäude 3.4 Mine / 1.9 Farm / 0.8 Labor.
- R5: Winrate 78 %, erfolgreiche Partien Ø Ende R11.3; Gebäude 3.4 Mine / 1.4 Farm / 0.8 Labor.
- R6: Winrate 80 %, erfolgreiche Partien Ø Ende R12.0; Gebäude 3.4 Mine / 1.5 Farm / 0.8 Labor.
- R7: Winrate 81 %, erfolgreiche Partien Ø Ende R13.2; Gebäude 3.4 Mine / 1.5 Farm / 0.9 Labor.
### expansion
- R3: Winrate 97 %, erfolgreiche Partien Ø Ende R8.1; Gebäude 2.5 Mine / 3.3 Farm / 1.8 Labor.
- R4: Winrate 96 %, erfolgreiche Partien Ø Ende R8.7; Gebäude 2.5 Mine / 3.3 Farm / 1.7 Labor.
- R5: Winrate 97 %, erfolgreiche Partien Ø Ende R10.5; Gebäude 2.5 Mine / 3.2 Farm / 1.8 Labor.
- R6: Winrate 97 %, erfolgreiche Partien Ø Ende R11.0; Gebäude 2.5 Mine / 3.2 Farm / 1.7 Labor.
- R7: Winrate 98 %, erfolgreiche Partien Ø Ende R12.1; Gebäude 2.6 Mine / 3.1 Farm / 1.7 Labor.
### exploration
- R3: Winrate 99 %, erfolgreiche Partien Ø Ende R8.7; Gebäude 2.7 Mine / 1.7 Farm / 1.8 Labor.
- R4: Winrate 100 %, erfolgreiche Partien Ø Ende R9.8; Gebäude 2.7 Mine / 1.9 Farm / 1.9 Labor.
- R5: Winrate 100 %, erfolgreiche Partien Ø Ende R9.8; Gebäude 2.1 Mine / 1.5 Farm / 1.6 Labor.
- R6: Winrate 100 %, erfolgreiche Partien Ø Ende R10.7; Gebäude 2.0 Mine / 1.4 Farm / 1.6 Labor.
- R7: Winrate 100 %, erfolgreiche Partien Ø Ende R11.6; Gebäude 2.0 Mine / 1.4 Farm / 1.5 Labor.

## Bewertung
Die Spezialisierungen bleiben klar unterschiedlich. Exploration ist noch die robusteste Strategie, aber nicht mehr der früheste automatische SP-Sprint. Forschung hat durch den früheren Alien-Tech-Meilenstein einen eigenständigen Punktpfad. Industrie bleibt bei R5–R7 die anspruchsvollste Strategie; das ist ein echter Playtest-Beobachtungspunkt.

Die absoluten Sieg-Runden sind nicht als perfekte Spielerwerte zu lesen: Die Bots sind Heuristiken. Für Balanceentscheidungen sind vor allem relative Unterschiede, Softlocks und dominante Muster relevant.