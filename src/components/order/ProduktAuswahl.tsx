import { motion } from 'framer-motion';
import { PRODUKTE, type ProduktMenge } from './types';
import MengenSteuerung from './MengenSteuerung';

interface ProduktAuswahlProps {
  produkte: ProduktMenge;
  geschaelt: boolean;
  onProdukteChange: (produkte: ProduktMenge) => void;
  onGeschaeltChange: (geschaelt: boolean) => void;
  onWeiter: () => void;
}

export default function ProduktAuswahl({
  produkte,
  geschaelt,
  onProdukteChange,
  onGeschaeltChange,
  onWeiter,
}: ProduktAuswahlProps) {
  const updateMenge = (produktId: string, menge: number) => {
    onProdukteChange({ ...produkte, [produktId]: menge });
  };

  const hatProdukte = Object.values(produkte).some(menge => menge > 0);
  const hatSchaelbareProdukte = PRODUKTE
    .filter(p => p.schaelbar)
    .some(p => (produkte[p.id] || 0) > 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-xl mx-auto"
    >
      {/* Formular */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <h2 className="font-['Playfair_Display'] text-3xl text-[#1F2937] mb-2">
            Produkte auswählen
          </h2>
          <p className="text-gray-500">
            Wählen Sie Ihre gewünschten Produkte und Mengen.
          </p>
        </div>

        {/* Produktliste */}
        <div className="space-y-4 mb-8">
          {PRODUKTE.map((produkt, index) => (
            <motion.div
              key={produkt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <span className="font-medium text-[#1F2937]">{produkt.name}</span>
              <MengenSteuerung
                value={produkte[produkt.id] || 0}
                onChange={(menge) => updateMenge(produkt.id, menge)}
                einheit={produkt.einheit}
              />
            </motion.div>
          ))}
        </div>

        {/* Schäl-Toggle */}
        {hatSchaelbareProdukte && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8"
          >
            <p className="text-sm text-gray-500 mb-3">Schäl-Option (gilt für alle schälbaren Produkte)</p>
            <div className="flex rounded-lg overflow-hidden border border-gray-200">
              <button
                type="button"
                onClick={() => onGeschaeltChange(true)}
                className={`
                  flex-1 py-3 px-4 text-center font-medium transition-all
                  ${geschaelt 
                    ? 'bg-[#7B9E6B] text-white' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                Geschält
              </button>
              <button
                type="button"
                onClick={() => onGeschaeltChange(false)}
                className={`
                  flex-1 py-3 px-4 text-center font-medium transition-all
                  ${!geschaelt 
                    ? 'bg-[#7B9E6B] text-white' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                Ungeschält
              </button>
            </div>
          </motion.div>
        )}

        {/* Weiter-Button */}
        <button
          type="button"
          onClick={onWeiter}
          disabled={!hatProdukte}
          className={`
            w-full py-4 rounded-lg font-semibold text-lg transition-all
            ${hatProdukte 
              ? 'bg-[#7B9E6B] text-white hover:bg-[#6A8A5C] shadow-md hover:shadow-lg' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          Zur Eingabe der Kontaktdaten
        </button>

        {!hatProdukte && (
          <p className="text-center text-sm text-red-500 mt-3">
            Bitte wählen Sie mindestens ein Produkt aus.
          </p>
        )}
      </div>
    </motion.div>
  );
}
