import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StepIndicator from './StepIndicator';
import ProduktAuswahl from './ProduktAuswahl';
import KontaktFormular from './KontaktFormular';
import Bestaetigung from './Bestaetigung';
import { PRODUKTE, type BestellungState, type KontaktDaten, type ProduktMenge } from './types';

const initialKontakt: KontaktDaten = {
  vorname: '',
  nachname: '',
  telefon: '',
  abholDatum: '',
  abholZeit: '',
  bemerkungen: '',
};

const initialProdukte: ProduktMenge = {};

export default function OrderForm() {
  const [state, setState] = useState<BestellungState>({
    schritt: 1,
    produkte: initialProdukte,
    geschaelt: false,
    kontakt: initialKontakt,
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  const setProdukte = (produkte: ProduktMenge) => {
    setState(prev => ({ ...prev, produkte }));
  };

  const setGeschaelt = (geschaelt: boolean) => {
    setState(prev => ({ ...prev, geschaelt }));
  };

  const setKontakt = (kontakt: KontaktDaten) => {
    setState(prev => ({ ...prev, kontakt }));
  };

  const weiterZuKontakt = () => {
    setState(prev => ({ ...prev, schritt: 2 }));
  };

  const zurueckZuProdukte = () => {
    setState(prev => ({ ...prev, schritt: 1 }));
  };

  const resetForm = () => {
    setState({
      schritt: 1,
      produkte: initialProdukte,
      geschaelt: false,
      kontakt: initialKontakt,
      isSubmitting: false,
      isSuccess: false,
      error: null,
    });
  };

  const absenden = async () => {
    setState(prev => ({ ...prev, isSubmitting: true, error: null }));

    try {
      // Bestellte Produkte aufbereiten
      const bestellteProdukte = PRODUKTE
        .filter(p => (state.produkte[p.id] || 0) > 0)
        .map(p => ({
          name: p.name,
          menge: state.produkte[p.id] || 0,
          einheit: p.einheit,
          schaelbar: p.schaelbar,
        }));

      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kontakt: {
            vorname: state.kontakt.vorname,
            nachname: state.kontakt.nachname,
            telefon: '+49 ' + state.kontakt.telefon,
            abholDatum: state.kontakt.abholDatum,
            abholZeit: state.kontakt.abholZeit,
            bemerkungen: state.kontakt.bemerkungen,
          },
          produkte: bestellteProdukte,
          geschaelt: state.geschaelt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fehler beim Senden der Bestellung');
      }

      setState(prev => ({ ...prev, isSubmitting: false, isSuccess: true }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten',
      }));
    }
  };

  // Erfolgsansicht
  if (state.isSuccess) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl">
        <Bestaetigung
          vorname={state.kontakt.vorname}
          nachname={state.kontakt.nachname}
          abholDatum={state.kontakt.abholDatum}
          abholZeit={state.kontakt.abholZeit}
          onNeueBestllung={resetForm}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <StepIndicator currentStep={state.schritt} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl">
        <AnimatePresence mode="wait">
          {state.schritt === 1 && (
            <ProduktAuswahl
              key="schritt1"
              produkte={state.produkte}
              geschaelt={state.geschaelt}
              onProdukteChange={setProdukte}
              onGeschaeltChange={setGeschaelt}
              onWeiter={weiterZuKontakt}
            />
          )}

          {state.schritt === 2 && (
            <KontaktFormular
              key="schritt2"
              kontakt={state.kontakt}
              produkte={state.produkte}
              geschaelt={state.geschaelt}
              isSubmitting={state.isSubmitting}
              error={state.error}
              onKontaktChange={setKontakt}
              onZurueck={zurueckZuProdukte}
              onAbsenden={absenden}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
