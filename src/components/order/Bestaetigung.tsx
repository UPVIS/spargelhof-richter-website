import { motion } from 'framer-motion';
import { Check, Home } from 'lucide-react';

interface BestaetigungProps {
  vorname: string;
  nachname: string;
  abholDatum: string;
  abholZeit: string;
  onNeueBestllung: () => void;
}

export default function Bestaetigung({
  vorname,
  nachname,
  abholDatum,
  abholZeit,
  onNeueBestllung,
}: BestaetigungProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12 max-w-lg mx-auto"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
        className="w-24 h-24 bg-[#7B9E6B] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
      >
        <Check className="w-12 h-12 text-white" strokeWidth={3} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-['Playfair_Display'] text-3xl text-[#1F2937] mb-4">
          Vielen Dank, {vorname}!
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Ihre Spargelbestellung wurde erfolgreich übermittelt. 
          Wir bereiten alles für Sie vor.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#7B9E6B]/10 rounded-2xl p-6 mb-8"
      >
        <h3 className="font-medium text-[#1F2937] mb-4">Ihre Abholung</h3>
        <div className="space-y-2 text-gray-600">
          <p>
            <strong className="text-[#1F2937]">{formatDate(abholDatum)}</strong>
          </p>
          <p>{abholZeit}</p>
          <p className="pt-2 border-t border-[#7B9E6B]/20 mt-4">
            Spargelhof Richter<br />
            Warendorfer Str. 40<br />
            49196 Bad Laer
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <button
          onClick={onNeueBestllung}
          className="w-full py-4 rounded-lg font-semibold bg-[#7B9E6B] text-white hover:bg-[#6A8A5C] shadow-md hover:shadow-lg transition-all"
        >
          Weitere Bestellung aufgeben
        </button>
        
        <a
          href="/"
          className="w-full py-4 rounded-lg font-semibold bg-gray-100 text-[#1F2937] hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Zurück zur Startseite
        </a>
      </motion.div>
    </motion.div>
  );
}
