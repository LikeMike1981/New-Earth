# New Earth – Balance Review v0.6.1 (final pass)

Ziel: R3–R7 sollen plausible Abflugzeitpunkte bleiben; die drei zufälligen Kolonie-Meilensteine sollen Strategie lenken, aber nicht automatisch fallen.

## Meilensteine
- Autarke Kolonie: 2 Siedlungen + 2 Farmen + Nahrungsproduktion ≥ Bevölkerung +2.
- Fremde Wissenschaft: 3 Sonderfunde, darunter mindestens 1 Alienfund.
- Industriezentrum: mindestens 2 Minen + Materialproduktion ≥ 8.
- Neue Grenze: 3 Siedlungen + mindestens 8 bekannte/analysierte Felder.
- Neue Wissenschaft: 2 Alien-Technologien + mindestens 1 Labor.
Alle geben 2 SP. Pro Partie werden 3 gewählt.

## Monte Carlo – 1.000 Läufe je Abflugrunde
- R3: Ende Ø 13.67, Winrate 99.4 %, Erdverluste 1.52 Regionen.
- R4: Ende Ø 10.48, Winrate 99.7 %, Erdverluste 2.74 Regionen.
- R5: Ende Ø 11.38, Winrate 98.7 %, Erdverluste 4.00 Regionen.
- R6: Ende Ø 12.45, Winrate 99.2 %, Erdverluste 5.38 Regionen.
- R7: Ende Ø 13.09, Winrate 99.0 %, Erdverluste 7.55 Regionen.

## Claim-Raten der Meilensteine
- R3: selfSufficient 43%, xenoScience 0%, industryHub 24%, frontier 21%, alienTech 12%
- R4: selfSufficient 36%, xenoScience 10%, industryHub 19%, frontier 2%, alienTech 19%
- R5: selfSufficient 34%, xenoScience 22%, industryHub 15%, frontier 5%, alienTech 21%
- R6: selfSufficient 31%, xenoScience 22%, industryHub 17%, frontier 14%, alienTech 18%
- R7: selfSufficient 41%, xenoScience 17%, industryHub 18%, frontier 13%, alienTech 12%

## Einschätzung
R4 ist in der aktuellen Bot-Heuristik noch der schnellste Durchschnittsweg. Der Abstand ist aber teilweise ein Bot-Effekt: R3 nimmt wenig Material mit und nutzt seinen Explorations-Zeitvorsprung nicht intelligent genug. Deshalb keine künstliche Rundenzahl-Belohnung eingebaut. Die Meilensteine wurden stattdessen so justiert, dass Exploration gerade für frühe Starter eine reale alternative Punktroute ist.