# Spargelhof Richter Website

Eine moderne, responsive Website für den Spargelhof Richter in Bad Laer.

## Tech Stack

- **Framework**: [Astro 5](https://astro.build/) mit SSR
- **Interaktivität**: React 19 für das Bestellformular
- **Styling**: Tailwind CSS 4
- **Animationen**: Framer Motion + CSS Animations
- **Icons**: Lucide React
- **E-Mail**: Resend API
- **Deployment**: Vercel

## Seiten

| Seite | Pfad | Beschreibung |
|-------|------|--------------|
| Startseite | `/` | Hero, Über uns, Frischegarantie, Hofladen, Galerie, Kontakt |
| Vorbestellen | `/vorbestellen` | Multi-Step-Bestellformular |
| Impressum | `/impressum` | Rechtliche Angaben |
| Datenschutz | `/datenschutz` | Datenschutzerklärung |

## Entwicklung

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build
npm run build

# Build lokal testen
npm run preview
```

## Deployment

Das Projekt ist für Vercel konfiguriert. Nach dem Push zu GitHub wird automatisch deployed.

### Environment Variables (in Vercel)

| Variable | Beschreibung |
|----------|--------------|
| `RESEND_API_KEY` | API-Key von [resend.com](https://resend.com) |
| `ORDER_EMAIL` | Ziel-E-Mail für Bestellungen |

### Resend Setup

1. Erstelle einen kostenlosen Account auf [resend.com](https://resend.com)
2. Verifiziere deine Domain oder nutze die Sandbox-Domain
3. Erstelle einen API-Key
4. Füge den Key in Vercel als Environment Variable hinzu

## Projektstruktur

```
src/
├── components/
│   ├── Header.astro
│   ├── Hero.astro
│   ├── About.astro
│   ├── FreshGuarantee.astro
│   ├── Hofladen.astro
│   ├── Gallery.astro
│   ├── Contact.astro
│   ├── Footer.astro
│   └── order/          # React-Komponenten
│       ├── OrderForm.tsx
│       ├── StepIndicator.tsx
│       ├── ProductSelection.tsx
│       ├── ContactDetails.tsx
│       └── Confirmation.tsx
├── layouts/
│   └── Layout.astro
├── pages/
│   ├── index.astro
│   ├── vorbestellen.astro
│   ├── impressum.astro
│   ├── datenschutz.astro
│   └── api/
│       └── send-order.ts
└── styles/
    └── global.css
```

## Design

- **Farbpalette**:
  - Primär: Spargelgrün (#2D5016)
  - Akzent: Erdbeere-Rot (#C41E3A)
  - Neutral: Cremeweiß (#FAF8F5)
  - Text: Dunkelbraun (#2C1810)

- **Typografie**:
  - Display: Playfair Display
  - Body: Source Sans 3

## Lizenz

Alle Rechte vorbehalten © Spargelhof Richter
