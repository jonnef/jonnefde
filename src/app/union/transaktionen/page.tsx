"use client";

import { useEffect, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import fetchTransactions from "@/app/services/transaction/fetchTransactions";
import fetchPlayers from "@/app/services/player/fetchPlayers";
import createNewTransaction from "@/app/services/transaction/createNewTransaction";
import BackButton from "@/app/components/buttons/BackButon";

type Spieler = {
  name: string;
  nummer: string;
};

type Transaktion = {
  id: number;
  spieler: string;
  monat: string;
  betrag: number;
  beschreibung: string;
};

export default function Transaktionsverwaltung() {
  const [spielerListe, setSpielerListe] = useState<Spieler[]>([]);
  const [transaktionen, setTransaktionen] = useState<Transaktion[]>([]);
  const [filterSpieler, setFilterSpieler] = useState<string>("Alle");
  const [filterMonat, setFilterMonat] = useState<string>("Alle");

  const [neuerSpieler, setNeuerSpieler] = useState<string>("");
  const [neuerBetrag, setNeuerBetrag] = useState<string>("");

  useEffect(() => {
    const ladeDaten = async () => {
      try {
        const spielerDaten = await fetchPlayers();
        const umgewandelteSpieler = spielerDaten.map((p: any) => ({
          name: p.name,
          nummer: String(p.jerseyNumber),
        }));
        setSpielerListe(umgewandelteSpieler);
        if (umgewandelteSpieler.length > 0) {
          setNeuerSpieler(umgewandelteSpieler[0].name);
        }

        const transaktionsDaten = await fetchTransactions();
        const umgewandelteTransaktionen = transaktionsDaten.map((t: any, index: number) => ({
          id: index + 1,
          spieler: t.name,
          monat: t.date.slice(0, 7),
          betrag: t.amount,
          beschreibung: t.description || "Importiert",
        }));
        setTransaktionen(umgewandelteTransaktionen);
      } catch (err) {
        console.error("Fehler beim Laden der Daten", err);
      }
    };

    ladeDaten();
  }, []);

  const filteredTransaktionen = useMemo(() => {
    return transaktionen.filter((t) => {
      const matchSpieler = filterSpieler === "Alle" || t.spieler === filterSpieler;
      const matchMonat = filterMonat === "Alle" || t.monat === filterMonat;
      return matchSpieler && matchMonat;
    });
  }, [transaktionen, filterSpieler, filterMonat]);

  const alleMonate = useMemo(() => {
    const monate = new Set(transaktionen.map((t) => t.monat));
    return Array.from(monate).sort();
  }, [transaktionen]);

  const hinzufügen = async () => {
    if (!neuerSpieler || !neuerBetrag) return;

    const betragNum = parseFloat(neuerBetrag);
    if (isNaN(betragNum)) return;

    try {
      // Nur Spieler und Betrag übergeben, keine Monat oder Beschreibung mehr
      await createNewTransaction({
        playerName: neuerSpieler,
        amount: betragNum,
      });

      const daten = await fetchTransactions();
      const umgewandelteTransaktionen = daten.map((t: any, index: number) => ({
        id: index + 1,
        spieler: t.name,
        monat: t.date.slice(0, 7),
        betrag: t.amount,
        beschreibung: t.description || "Importiert",
      }));
      setTransaktionen(umgewandelteTransaktionen);

      // Felder zurücksetzen (Monat und Beschreibung nicht mehr vorhanden)
      setNeuerBetrag("");
    } catch (err) {
      console.error("Fehler beim Speichern der Transaktion", err);
    }
  };

  const entfernen = (id: number) => {
    setTransaktionen((t) => t.filter((trans) => trans.id !== id));
    // Optional: Hier könnte ein DELETE-Request ans Backend kommen
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">💸 Transaktionsverwaltung</h1>

        <div className="flex gap-4 mb-6" style={{justifyContent:"center"}}>
          <select
            value={filterSpieler}
            onChange={(e) => setFilterSpieler(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="Alle">Alle Spieler</option>
            {spielerListe.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            value={filterMonat}
            onChange={(e) => setFilterMonat(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="Alle">Alle Monate</option>
            {alleMonate.map((monat) => (
              <option key={monat} value={monat}>
                {monat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 space-y-2" >
          <label className="block text-sm font-medium text-gray-700">Neue Transaktion</label>
          <div className="flex gap-2 flex-wrap" style={{justifyContent:"center"}}>
            {/* Nur Spieler auswählen */}
            <select
              value={neuerSpieler}
              onChange={(e) => setNeuerSpieler(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              {spielerListe.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>

            {/* Nur Betrag eingeben */}
            <input
              type="number"
              value={neuerBetrag}
              onChange={(e) => setNeuerBetrag(e.target.value)}
              placeholder="Betrag (€)"
              className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />

            <button
              onClick={hinzufügen}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
            >
              Hinzufügen
            </button>
          </div>
        </div>

<BackButton/>

        <div className="bg-white rounded-xl shadow border border-gray-200 px-4 py-4 mt-4">
          <h2 className="text-lg font-semibold p-4 border-b">Transaktionen</h2>
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 font-medium">Spieler</th>
                <th className="px-4 py-2 font-medium">Monat</th>
                <th className="px-4 py-2 font-medium">Betrag (€)</th>
                <th className="px-4 py-2 font-medium">Beschreibung</th>
                <th className="px-4 py-2 font-medium">Aktion</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransaktionen.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center px-4 py-3 text-gray-500">
                    Keine Transaktionen gefunden.
                  </td>
                </tr>
              )}
              {filteredTransaktionen.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="px-4 py-2">{t.spieler}</td>
                  <td className="px-4 py-2 font-mono">{t.monat}</td>
                  <td
                    className={`px-4 py-2 font-mono ${
                      t.betrag < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {t.betrag.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">{t.beschreibung}</td>
                  <td className="px-4 py-2 text-red-600 cursor-pointer hover:text-red-800 transition">
                    <button onClick={() => entfernen(t.id)} title="Transaktion löschen">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
