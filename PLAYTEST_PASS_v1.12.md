# New Earth v1.12 – Playtest Pass

Änderungen nach vollständigem v1.11-Review:

1. Transportierbare Projekttechnik repariert
- Mobile Forschungsstation, Robotisierte Landwirtschaft und Autonome Förderanlage können nun tatsächlich als Tech-Fracht gewählt werden.
- Ihre New-Earth-Effekte funktionieren dadurch wie auf den Karten beschrieben.

2. Experten müssen wirklich mitfliegen
- Sobald New Earth erreicht ist, prüfen Expertenboni nur noch `newEarth.experts`.
- Zurückgelassene Experten geben dort keine Reichweiten-, Produktions-, Analyse- oder Bauvorteile mehr.

3. Kolonieziele sind jetzt eine echte Landungsentscheidung
- Nach der Landung müssen genau zwei der vier Ziele festgelegt werden.
- Solange die Wahl offen ist, sind normale New-Earth-Aktionen gesperrt.
- Ziele können daher nicht erst später passend zum bereits gebauten Board gewählt werden.
- Die Landing-Celebration weist ausdrücklich auf diese Entscheidung hin.

4. Handkartenaktion verbessert
- 1 Aktion zieht jetzt 2 Projektkarten.
- Man behält genau 1; die andere wandert unter den Projektstapel.
- Handlimit bleibt 5.
- Die KI bewertet beide gezogenen Karten und behält die strategisch passendere.

5. UI
- Private Hand und gemeinsame Auslage sind als zwei getrennte Bereiche dargestellt.
- Handkarten werden als privat markiert; offene Karten als umkämpfte Auslage.
- Die Landungsentscheidung erhält einen sichtbaren Hinweis.

6. Simulation
- Bots wählen die beiden Kolonieziele weiterhin sofort bei Landung anhand ihrer Expedition.
- Transportierbare Projekttechnologien sind in ihren Ladeprioritäten enthalten.
- Nach den Änderungen bleibt die Timingkurve grundsätzlich intakt. 180 opportunistische Shared-Races:
  R3–R5 106:56
  R3–R6 89:62
  R4–R5 74:88
  R4–R6 69:88
  R5–R6 54:105
  R5–R7 104:53
  R6–R7 105:38

Interpretation: R4/R5/R6 bleiben echte Kreuzungspunkte; R7 ist weiter die riskante Extremoption. Die nächsten Erkenntnisse sollten aus echten Playtests kommen, nicht aus weiterem blindem Zahlen-Tuning.
