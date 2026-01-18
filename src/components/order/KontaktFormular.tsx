import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Send } from 'lucide-react';
import { ABHOLZEITEN, PRODUKTE, type KontaktDaten, type ProduktMenge } from './types';

interface KontaktFormularProps {
  kontakt: KontaktDaten;
  produkte: ProduktMenge;
  geschaelt: boolean;
  isSubmitting: boolean;
  error: string | null;
  onKontaktChange: (kontakt: KontaktDaten) => void;
  onZurueck: () => void;
  onAbsenden: () => void;
}

export default function KontaktFormular({
  kontakt,
  produkte,
  geschaelt,
  isSubmitting,
  error,
  onKontaktChange,
  onZurueck,
  onAbsenden,
}: KontaktFormularProps) {
  const updateField = (field: keyof KontaktDaten, value: string) => {
    onKontaktChange({ ...kontakt, [field]: value });
  };

  // Validierung
  const isValid = 
    kontakt.vorname.trim().length >= 2 &&
    kontakt.nachname.trim().length >= 2 &&
    kontakt.telefon.trim().length >= 6 &&
    kontakt.abholDatum &&
    kontakt.abholZeit;

  // Minimum Datum (morgen)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Bestellübersicht
  const bestellteProdukte = PRODUKTE.filter(p => (produkte[p.id] || 0) > 0);
  const hatSchaelbareProdukte = bestellteProdukte.some(p => p.schaelbar);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-xl mx-auto"
    >
      <div className="mb-8 text-center">
        <h2 className="font-['Playfair_Display'] text-3xl text-[#1F2937] mb-2">
          Kontaktdaten eingeben
        </h2>
      </div>

      {/* Bestellübersicht */}
      <div className="bg-gray-50 rounded-xl p-5 mb-8">
        <h3 className="font-medium text-[#1F2937] mb-3">Ihre Bestellung:</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          {bestellteProdukte.map(p => (
            <li key={p.id} className="flex justify-between">
              <span>{p.name}</span>
              <span className="font-medium">{produkte[p.id]} {p.einheit}</span>
            </li>
          ))}
        </ul>
        {hatSchaelbareProdukte && (
          <p className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600">
            Schäl-Option: <span className="font-medium">{geschaelt ? 'Geschält' : 'Ungeschält'}</span>
          </p>
        )}
      </div>

      {/* Formular */}
      <div className="space-y-5">
        {/* Vorname & Nachname */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="vorname" className="block text-sm font-medium text-[#1F2937] mb-2">
              Vorname <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="vorname"
              value={kontakt.vorname}
              onChange={(e) => updateField('vorname', e.target.value)}
              placeholder="Johann"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B9E6B] focus:ring-2 focus:ring-[#7B9E6B]/20 outline-none transition-all"
            />
          </div>
          <div>
            <label htmlFor="nachname" className="block text-sm font-medium text-[#1F2937] mb-2">
              Nachname <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nachname"
              value={kontakt.nachname}
              onChange={(e) => updateField('nachname', e.target.value)}
              placeholder="Doe"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B9E6B] focus:ring-2 focus:ring-[#7B9E6B]/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Telefon */}
        <div>
          <label htmlFor="telefon" className="block text-sm font-medium text-[#1F2937] mb-2">
            Telefon <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
              🇩🇪 +49
            </span>
            <input
              type="tel"
              id="telefon"
              value={kontakt.telefon}
              onChange={(e) => updateField('telefon', e.target.value)}
              placeholder="123 456789"
              className="flex-1 px-4 py-3 rounded-r-lg border border-gray-200 focus:border-[#7B9E6B] focus:ring-2 focus:ring-[#7B9E6B]/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Abholdatum */}
        <div>
          <label htmlFor="abholDatum" className="block text-sm font-medium text-[#1F2937] mb-2">
            Tag der gewünschten Abholung <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="abholDatum"
            value={kontakt.abholDatum}
            onChange={(e) => updateField('abholDatum', e.target.value)}
            min={minDate}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B9E6B] focus:ring-2 focus:ring-[#7B9E6B]/20 outline-none transition-all"
          />
        </div>

        {/* Abholzeit */}
        <div>
          <label htmlFor="abholZeit" className="block text-sm font-medium text-[#1F2937] mb-2">
            Uhrzeit der gewünschten Abholung <span className="text-red-500">*</span>
          </label>
          <select
            id="abholZeit"
            value={kontakt.abholZeit}
            onChange={(e) => updateField('abholZeit', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B9E6B] focus:ring-2 focus:ring-[#7B9E6B]/20 outline-none transition-all bg-white"
          >
            <option value="">Wählen Sie eine Option aus</option>
            {ABHOLZEITEN.map(zeit => (
              <option key={zeit.value} value={zeit.label}>
                {zeit.label}
              </option>
            ))}
          </select>
        </div>

        {/* Bemerkungen */}
        <div>
          <label htmlFor="bemerkungen" className="block text-sm font-medium text-[#1F2937] mb-2">
            Sonstige Bemerkungen <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            id="bemerkungen"
            value={kontakt.bemerkungen}
            onChange={(e) => updateField('bemerkungen', e.target.value)}
            placeholder="Schreiben Sie Ihren Text hier.."
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B9E6B] focus:ring-2 focus:ring-[#7B9E6B]/20 outline-none transition-all resize-none"
          />
        </div>
      </div>

      {/* Fehlermeldung */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mt-6"
        >
          {error}
        </motion.div>
      )}

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          type="button"
          onClick={onZurueck}
          disabled={isSubmitting}
          className="flex-1 py-4 rounded-lg font-semibold bg-gray-100 text-[#1F2937] hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <ArrowLeft className="w-5 h-5" />
          Zurück
        </button>
        <button
          type="button"
          onClick={onAbsenden}
          disabled={!isValid || isSubmitting}
          className={`
            flex-1 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2
            ${isValid && !isSubmitting
              ? 'bg-[#7B9E6B] text-white hover:bg-[#6A8A5C] shadow-md hover:shadow-lg' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Wird gesendet...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Spargel verbindlich reservieren
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
