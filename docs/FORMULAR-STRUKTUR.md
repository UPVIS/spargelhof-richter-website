# Spargel-Bestellformular - Strukturdokumentation

Dieses Dokument beschreibt die vollständige Struktur des zweistufigen Spargel-Vorbestellformulars für den Spargelhof Richter.

---

## Formular-Übersicht

Das Formular besteht aus zwei Schritten:

1. **Produktauswahl** - Auswahl der Spargelprodukte und Mengen
2. **Kontaktdaten** - Eingabe der persönlichen Daten und Abholwunsch

Nach Absenden wird eine E-Mail über Resend an den Hofladen gesendet.

---

## Schritt 1: Produktauswahl

### Kopfbereich

| Element | Inhalt |
|---------|--------|
| **Überschrift** | "Spargel vorbestellen" |
| **Untertitel** | "Jetzt vorbestellen und ganz einfach in unserem Hofladen abholen." |

### Produktliste

Jedes Produkt wird mit einem Mengen-Steuerungselement (+/- Buttons) dargestellt.

| ID | Produkt | Einheit | Schrittweite | Startwert | Schälbar |
|----|---------|---------|--------------|-----------|----------|
| `spargelKlasse1Weiss` | Spargel Klasse 1 weiß | kg | 1 | 0 | Ja |
| `spargelKlasse1Vio` | Spargel Klasse 1 vio | kg | 1 | 0 | Ja |
| `spargelSpitzen` | Spargel Spitzen | kg | 1 | 0 | Ja |
| `spargelKlasse2Weiss` | Spargel Klasse 2 weiß | kg | 1 | 0 | Ja |
| `spargelKlasse2Vio` | Spargel Klasse 2 vio | kg | 1 | 0 | Ja |
| `spargelBruch` | Spargel Bruch | kg | 1 | 0 | Ja |
| `gruenspargel500g` | Grünspargel 500g Bund | Stück | 1 | 0 | Nein |

### Schäl-Option

| Eigenschaft | Wert |
|-------------|------|
| **Typ** | Zwei-Button-Toggle (Radio-Verhalten) |
| **Option 1** | "Geschält" |
| **Option 2** | "Ungeschält" |
| **Standardwert** | "Ungeschält" |
| **Gilt für** | Alle Produkte außer Grünspargel |

### Navigation

| Element | Wert |
|---------|------|
| **Button-Text** | "Zur Eingabe der Kontaktdaten" |
| **Validierung** | Mindestens 1 Produkt mit Menge > 0 erforderlich |

### Layout

- **Linke Seite:** Formular (ca. 50% Breite)
- **Rechte Seite:** Dekoratives Spargel-Bild (ca. 50% Breite)

---

## Schritt 2: Kontaktdaten

### Kopfbereich

| Element | Inhalt |
|---------|--------|
| **Überschrift** | "Kontaktdaten eingeben" |

### Formularfelder

| ID | Feld | Typ | Pflicht | Placeholder / Details |
|----|------|-----|---------|----------------------|
| `vorname` | Vorname | Text-Input | Ja | "Johann" |
| `nachname` | Nachname | Text-Input | Ja | "Doe" |
| `telefon` | Telefon | Tel-Input mit Ländercode | Ja | Deutschland (+49) vorausgewählt |
| `abholDatum` | Tag der gewünschten Abholung | Datepicker | Ja | "Wählen Sie ein geeignetes Datum aus" |
| `abholZeit` | Uhrzeit der gewünschten Abholung | Dropdown/Select | Ja | "Wählen Sie eine Option aus" |
| `bemerkungen` | Sonstige Bemerkungen | Textarea | Nein | "Schreiben Sie Ihren Text hier.." |

### Dropdown-Optionen: Abholzeiten

Stündliche Zeitfenster von 8:00 bis 18:00 Uhr:

| Wert | Anzeige |
|------|---------|
| `08-09` | 08:00 - 09:00 Uhr |
| `09-10` | 09:00 - 10:00 Uhr |
| `10-11` | 10:00 - 11:00 Uhr |
| `11-12` | 11:00 - 12:00 Uhr |
| `12-13` | 12:00 - 13:00 Uhr |
| `13-14` | 13:00 - 14:00 Uhr |
| `14-15` | 14:00 - 15:00 Uhr |
| `15-16` | 15:00 - 16:00 Uhr |
| `16-17` | 16:00 - 17:00 Uhr |
| `17-18` | 17:00 - 18:00 Uhr |

### Navigation

| Element | Wert |
|---------|------|
| **Button-Text** | "Spargel verbindlich reservieren" |
| **Aktion** | Formular absenden |

### Layout

- Zentriertes Formular in Card/Modal-Stil
- Maximale Breite begrenzt für bessere Lesbarkeit

---

## Datenstruktur

### TypeScript-Interface

```typescript
interface SpargelBestellung {
  // Produktauswahl
  produkte: {
    spargelKlasse1Weiss: number;  // Menge in kg
    spargelKlasse1Vio: number;    // Menge in kg
    spargelSpitzen: number;       // Menge in kg
    spargelKlasse2Weiss: number;  // Menge in kg
    spargelKlasse2Vio: number;    // Menge in kg
    spargelBruch: number;         // Menge in kg
    gruenspargel500g: number;     // Anzahl Bund (Stück)
  };
  geschaelt: boolean;  // true = geschält, false = ungeschält

  // Kontaktdaten
  kontakt: {
    vorname: string;
    nachname: string;
    telefon: string;        // Format: +49...
    abholDatum: Date;
    abholZeit: string;      // z.B. "09:00 - 10:00 Uhr"
    bemerkungen?: string;   // optional
  };
}
```

### Produkt-Konfiguration

```typescript
interface ProduktDefinition {
  id: string;
  name: string;
  einheit: 'kg' | 'Stück';
  schrittweite: number;
  schaelbar: boolean;
}

const PRODUKTE: ProduktDefinition[] = [
  { id: 'spargelKlasse1Weiss', name: 'Spargel Klasse 1 weiß', einheit: 'kg', schrittweite: 1, schaelbar: true },
  { id: 'spargelKlasse1Vio', name: 'Spargel Klasse 1 vio', einheit: 'kg', schrittweite: 1, schaelbar: true },
  { id: 'spargelSpitzen', name: 'Spargel Spitzen', einheit: 'kg', schrittweite: 1, schaelbar: true },
  { id: 'spargelKlasse2Weiss', name: 'Spargel Klasse 2 weiß', einheit: 'kg', schrittweite: 1, schaelbar: true },
  { id: 'spargelKlasse2Vio', name: 'Spargel Klasse 2 vio', einheit: 'kg', schrittweite: 1, schaelbar: true },
  { id: 'spargelBruch', name: 'Spargel Bruch', einheit: 'kg', schrittweite: 1, schaelbar: true },
  { id: 'gruenspargel500g', name: 'Grünspargel 500g Bund', einheit: 'Stück', schrittweite: 1, schaelbar: false },
];
```

### Abholzeiten-Konfiguration

```typescript
const ABHOLZEITEN = [
  { value: '08-09', label: '08:00 - 09:00 Uhr' },
  { value: '09-10', label: '09:00 - 10:00 Uhr' },
  { value: '10-11', label: '10:00 - 11:00 Uhr' },
  { value: '11-12', label: '11:00 - 12:00 Uhr' },
  { value: '12-13', label: '12:00 - 13:00 Uhr' },
  { value: '13-14', label: '13:00 - 14:00 Uhr' },
  { value: '14-15', label: '14:00 - 15:00 Uhr' },
  { value: '15-16', label: '15:00 - 16:00 Uhr' },
  { value: '16-17', label: '16:00 - 17:00 Uhr' },
  { value: '17-18', label: '17:00 - 18:00 Uhr' },
];
```

---

## E-Mail-Übermittlung

### Technologie

- **Service:** Resend (bereits als Dependency installiert)
- **API-Route:** Astro Server-Endpoint

### Konfiguration

| Parameter | Beschreibung |
|-----------|-------------|
| **Empfänger** | Hofladen-E-Mail-Adresse (Environment Variable: `HOFLADEN_EMAIL`) |
| **Absender** | Konfigurierte Resend-Domain |
| **Betreff** | "Neue Spargelbestellung von [Vorname] [Nachname]" |

### E-Mail-Inhalt

Die E-Mail enthält:

1. **Bestellübersicht**
   - Alle Produkte mit Menge > 0
   - Einheit (kg oder Stück) pro Produkt
   
2. **Schäl-Präferenz**
   - "Geschält" oder "Ungeschält"
   - Nur angezeigt, wenn schälbare Produkte bestellt wurden

3. **Kontaktdaten**
   - Vollständiger Name
   - Telefonnummer

4. **Abholwunsch**
   - Datum
   - Zeitfenster

5. **Bemerkungen**
   - Nur angezeigt, wenn vorhanden

### Bestätigungsseite

Nach erfolgreicher Übermittlung wird dem Kunden eine Bestätigungsmeldung angezeigt.

---

## UI/UX-Design

### Farbschema

| Element | Farbe | Hex-Code |
|---------|-------|----------|
| Primär-Button (aktiv) | Grün | `#7B9E6B` |
| Primär-Button (hover) | Dunkelgrün | `#6A8A5C` |
| Toggle (inaktiv) | Hellgrau | `#F3F4F6` |
| Toggle (aktiv) | Grün | `#7B9E6B` |
| Hintergrund | Weiß/Hellgrau | `#FFFFFF` / `#F9FAFB` |
| Text | Dunkelgrau | `#1F2937` |
| Placeholder | Mittelgrau | `#9CA3AF` |

### Typografie

| Element | Stil |
|---------|------|
| Überschriften | Serif-Font (elegant, traditionell) |
| Fließtext | Sans-Serif (modern, lesbar) |
| Labels | Sans-Serif, medium weight |
| Buttons | Sans-Serif, medium weight |

### Komponenten

| Komponente | Beschreibung |
|------------|-------------|
| **Mengen-Steuerung** | Abgerundete Box mit - Button links, Wert in der Mitte, + Button rechts |
| **Toggle-Buttons** | Zwei nebeneinander liegende Buttons mit abgerundeten Ecken |
| **Input-Felder** | Abgerundete Ecken, dezenter Border, großzügiges Padding |
| **Dropdown** | Native Select mit Custom-Styling |
| **Datepicker** | Native Date-Input oder Custom-Komponente |
| **Telefon-Input** | Mit Ländercode-Dropdown (Deutschland vorausgewählt) |
| **Submit-Button** | Volle Breite, grüner Hintergrund, weiße Schrift |

---

## Validierung

### Schritt 1

| Regel | Fehlermeldung |
|-------|---------------|
| Mindestens 1 Produkt mit Menge > 0 | "Bitte wählen Sie mindestens ein Produkt aus." |

### Schritt 2

| Feld | Regel | Fehlermeldung |
|------|-------|---------------|
| Vorname | Pflichtfeld, min. 2 Zeichen | "Bitte geben Sie Ihren Vornamen ein." |
| Nachname | Pflichtfeld, min. 2 Zeichen | "Bitte geben Sie Ihren Nachnamen ein." |
| Telefon | Pflichtfeld, gültiges Format | "Bitte geben Sie eine gültige Telefonnummer ein." |
| Abholdatum | Pflichtfeld, Datum in der Zukunft | "Bitte wählen Sie ein gültiges Abholdatum." |
| Abholzeit | Pflichtfeld | "Bitte wählen Sie eine Abholzeit." |

---

## Komponenten-Struktur (Empfehlung)

```
src/
├── components/
│   └── bestellformular/
│       ├── BestellFormular.tsx        # Haupt-Container mit State-Management
│       ├── ProduktAuswahl.tsx         # Schritt 1
│       ├── MengenSteuerung.tsx        # +/- Buttons Komponente
│       ├── SchaelToggle.tsx           # Geschält/Ungeschält Toggle
│       ├── KontaktFormular.tsx        # Schritt 2
│       ├── TelefonInput.tsx           # Tel-Input mit Ländercode
│       ├── Bestaetigung.tsx           # Erfolgs-Meldung
│       └── types.ts                   # TypeScript Interfaces
├── pages/
│   └── api/
│       └── bestellung.ts              # Resend API-Endpoint
```

---

## Abhängigkeiten

Bereits im Projekt vorhanden:

- `react` / `react-dom` - UI-Komponenten
- `@astrojs/react` - React-Integration für Astro
- `tailwindcss` - Styling
- `framer-motion` - Animationen (optional für Übergänge)
- `lucide-react` - Icons (für +/- Buttons etc.)
- `resend` - E-Mail-Versand

Empfohlene Ergänzungen:

- `react-phone-number-input` - Telefon-Input mit Ländercode
- `react-day-picker` - Datepicker (optional, native auch möglich)
