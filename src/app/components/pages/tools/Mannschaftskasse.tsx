// pages/tools/mannschaftskasse.tsx

import { useState } from 'react';
import Head from 'next/head';

interface Spieler {
  id: number;
  name: string;
  kontostand: number;
}

interface Transaktion {
  id: number;
  spielerId: number;
  betrag: number;
  beschreibung: string;
}

export default function Mannschaftskasse() {
  const [spieler, setSpieler] = useState<Spieler[]>([]);
  const [transaktionen, setTransaktionen] = useState<Transaktion[]>([]);
  const [nameInput, setNameInput] = useState('');

  const addSpieler = () => {
    if (!nameInput.trim()) return;
    const neuerSpieler: Spieler = {
      id: Date.now(),
      name: nameInput,
      kontostand: 0
    };
    setSpieler([...spieler, neuerSpieler]);
    setNameInput('');
  };

  const deleteSpieler = (id: number) => {
    setSpieler(spieler.filter(s => s.id !== id));
    setTransaktionen(transaktionen.filter(t => t.spielerId !== id));
  };

  const addTransaktion = (spielerId: number, betrag: number, beschreibung: string) => {
    const neueTransaktion: Transaktion = {
      id: Date.now(),
      spielerId,
      betrag,
      beschreibung
    };
    setTransaktionen([...transaktionen, neueTransaktion]);
    setSpieler(spieler.map(s =>
      s.id === spielerId ? { ...s, kontostand: s.kontostand + betrag } : s
    ));
  };

  return (
    <>
      <Head>
        <title>Mannschaftskasse</title>
      </Head>

      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">🏆 Mannschaftskasse</h1>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Spieler hinzufügen</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                placeholder="Spielername"
              />
              <button
                onClick={addSpieler}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >Hinzufügen</button>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Spielerliste & Kontostände</h2>
            <ul className="space-y-4">
              {spieler.map(s => (
                <li key={s.id} className="bg-white p-4 rounded shadow-sm border">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-sm text-gray-600">Kontostand: {s.kontostand.toFixed(2)}€</p>
                    </div>
                    <button
                      onClick={() => deleteSpieler(s.id)}
                      className="text-red-500 hover:underline"
                    >Löschen</button>
                  </div>

                  <div className="mt-4">
                    <TransaktionForm onAdd={(betrag, beschreibung) => addTransaktion(s.id, betrag, beschreibung)} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Alle Transaktionen</h2>
            <ul className="space-y-2">
              {transaktionen.map(t => (
                <li key={t.id} className="text-sm bg-white border rounded p-3">
                  <span className="font-medium">{spieler.find(s => s.id === t.spielerId)?.name}:</span> {t.betrag.toFixed(2)}€ - {t.beschreibung}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

function TransaktionForm({ onAdd }: { onAdd: (betrag: number, beschreibung: string) => void }) {
  const [betrag, setBetrag] = useState('');
  const [beschreibung, setBeschreibung] = useState('');

  const handleAdd = () => {
    const parsed = parseFloat(betrag);
    if (isNaN(parsed) || !beschreibung.trim()) return;
    onAdd(parsed, beschreibung);
    setBetrag('');
    setBeschreibung('');
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 mt-2">
      <input
        type="number"
        placeholder="Betrag (€)"
        value={betrag}
        onChange={e => setBetrag(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
      <input
        type="text"
        placeholder="Beschreibung"
        value={beschreibung}
        onChange={e => setBeschreibung(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >Hinzufügen</button>
    </div>
  );
}
