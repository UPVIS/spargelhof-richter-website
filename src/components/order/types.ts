export interface ProduktDefinition {
  id: string;
  name: string;
  einheit: 'kg' | 'Stück';
  schrittweite: number;
  schaelbar: boolean;
}

export const PRODUKTE: ProduktDefinition[] = [
  { id: 'spargelKlasse1Weiss', name: 'Spargel Klasse 1 weiß', einheit: 'kg', schrittweite: 1, schaelbar: true },
  { id: 'spargelKlasse1Vio', name: 'Spargel Klasse 1 vio', einheit: 'kg', schrittweite: 1, schaelbar: true },
  { id: 'spargelSpitzen', name: 'Spargel Spitzen', einheit: 'kg', schrittweite: 1, schaelbar: true },
  { id: 'spargelKlasse2Weiss', name: 'Spargel Klasse 2 weiß', einheit: 'kg', schrittweite: 1, schaelbar: true },
  { id: 'spargelKlasse2Vio', name: 'Spargel Klasse 2 vio', einheit: 'kg', schrittweite: 1, schaelbar: true },
  { id: 'spargelBruch', name: 'Spargel Bruch', einheit: 'kg', schrittweite: 1, schaelbar: true },
  { id: 'gruenspargel500g', name: 'Grünspargel 500g Bund', einheit: 'Stück', schrittweite: 1, schaelbar: false },
];

export const ABHOLZEITEN = [
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

export interface ProduktMenge {
  [produktId: string]: number;
}

export interface KontaktDaten {
  vorname: string;
  nachname: string;
  telefon: string;
  abholDatum: string;
  abholZeit: string;
  bemerkungen: string;
}

export interface BestellungState {
  schritt: 1 | 2;
  produkte: ProduktMenge;
  geschaelt: boolean;
  kontakt: KontaktDaten;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}
