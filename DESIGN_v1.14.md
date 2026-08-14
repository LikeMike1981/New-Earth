# New Earth v1.14 – Two Engines Consolidation

## Leitidee
Ein Engine Builder mit hartem Cut:
- Erde: bekannte, reiche, kollabierende Welt. Engine aus Karten, Gebäuden, Experten und Technologie.
- Raketenstart: Engine wird bewusst komprimiert; nur ausgewählte Teile überleben.
- New Earth: räumliche zweite Engine. Die Welt ist unbekannt; Exploration eröffnet neue Möglichkeiten.

## Rundenstruktur
- Ziel: 15 globale Runden.
- 3 Hauptaktionen pro Runde statt Aktionen = Bevölkerung.
- Experten/Engine können kleine Zusatzvorteile erzeugen, aber keine endlosen Aktionsketten.
- Abflug bleibt individuell (Extrem R3 bis R8).

## Erde
- Erdverfall etwas weniger brachial pro Einzelereignis, aber Zeitdruck durch 15-Runden-Uhr.
- Fabrik verbessert Bauen: erstes Gebäude/Raketenmodul pro Runde −1 Material.
- Forschungszentrum verbessert Forschen: einmal pro Runde −1 Wissenschaft.
- High-Tech-Labor stapelt einen weiteren Forschungsrabatt.
- Standardgebäude zeigen ihre Trigger in den Daten/UI.
- Karten, Hand, Experten, Tags, Raketenmodule und Verfall aus v1.13 bleiben erhalten.

## New Earth
### Scan → Exploration
- Unbekannte erreichbare Hexfelder können für 1 Aktion gescannt werden.
- Scan zeigt nur eine Signatur: Biologie, Anomalie, Mineralien, Eis/Wasser, Geologie oder Siedlungspotenzial.
- Danach kann das Feld gezielt erkundet werden.
- Blindes Erkunden bleibt möglich.
- Prospektionssatellit gibt den ersten Scan pro Runde kostenlos.

### Discovery Engine
- Analyse besonderer Funde schaltet weiterhin direkt neue Technologien/Projekte frei.
- Kein zusätzlicher Forschungsbaum.
- Exploration ist damit Input für die Engine, nicht bloß Punktequelle.

### Räumliche Kolonie-Engine
Siedlungen können einmal spezialisiert werden:
- Industriekolonie: angrenzende Minen +1 Material.
- Forschungskolonie: angrenzende Analysen −1 Wissenschaft.
- Biosphäre: +2 O₂ und angrenzende Farmen +1 Nahrung.
Voraussetzung ist jeweils passende Infrastruktur in der Nähe.

### Sauerstoff
- bleibt reine Kapazität.
- Basis 5; mitgebrachte Erdtechnik und planetare Projekte erhöhen sie.
- Expansion wird dadurch begrenzt, aber Sauerstoff ist keine Pflichtaktion bei Landung.

## Spielende
14 Zukunftspunkte sind Zielwert, aber Punkte allein reichen nicht.
Eine siegfähige Zivilisation braucht:
- mindestens 5 Bevölkerung
- mindestens 2 Siedlungen
- O₂-Kapazität >= Bevölkerung
- ausreichende Nahrungsproduktion (derzeit ceil(Bevölkerung/2), mindestens 2)
So kann keine tote Hochtechnologie-Kolonie gewinnen.

## Erste automatische Plausibilitätsprobe
150 adaptive Läufe je Startzeitpunkt nach dem Umbau lagen bei ungefähr 11–12 Zukunftspunkten im Mittel. R4–R6 liegen erwartungsgemäß etwas stabiler als die Extreme; der Bot ist für die neuen Scan-/Spezialisierungsentscheidungen noch nicht vollständig optimiert. Deshalb sind diese Zahlen ausdrücklich kein finales Balanceurteil.

## Nächster Playtest-Fokus
1. Fühlen sich drei Hauptaktionen nach genug Entscheidung an?
2. Erzeugen Triggergebäude befriedigende kleine Combos?
3. Ist Scannen interessant oder nur eine zusätzliche Aktion?
4. Ändern Entdeckungen tatsächlich Pläne?
5. Werden Siedlungsspezialisierungen auf dem Brett als Engine sichtbar?
6. Fühlt sich R3 klein aber chancenreich und R7/R8 mächtig aber unter Zeitdruck an?
