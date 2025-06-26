"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import fetchPlayers from "../components/services/fetchPlayers";

type Player = {
  name: string;
  balance: number;
}

export default function MannschaftskasseOverview() {
  const [filterMonat, setFilterMonat] = useState<string>("");

  const [playerList, setPlayerList] = useState<Player[]>([]);

  useEffect(() => {
    const ladeSpieler = async () => {
    const daten = await fetchPlayers();
    setPlayerList(daten);
  };
  ladeSpieler();
}, []);

  const gesamtsumme = useMemo(() => {
  return playerList.reduce((sum, player) => sum + (player.balance ?? 0), 0);
}, [playerList]);

  function formatMonat(monat: string) {
  // Erwarte Monat in "YYYY-MM"
  const [jahr, monatNummer] = monat.split("-");
  if (!jahr || !monatNummer) return monat;

  // Date-Objekt auf den ersten Tag im Monat
  const datum = new Date(parseInt(jahr), parseInt(monatNummer) - 1);

  // Lokale Darstellung, nur Monat + Jahr, deutsch
  return datum.toLocaleDateString("de-DE", { year: "numeric", month: "long" });
}


  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">💰 Getränkekasse</h1>

        <div className="flex gap-4 mb-6">
          <Link
            href="/union/spieler"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Spielerverwaltung
          </Link>
          <Link
            href="/union/transaktionen"
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
          >
            Transaktionen
          </Link>

          {/* Monatsfilter */}
          <input
            type="month"
            value={filterMonat}
            onChange={(e) => setFilterMonat(e.target.value)}
            className="ml-auto px-3 py-2 border border-gray-300 rounded-lg text-sm"
            placeholder="Monat filtern"
          />
          {filterMonat && (
            <button
              onClick={() => setFilterMonat("")}
              className="text-gray-600 hover:text-gray-800 transition underline text-sm"
              aria-label="Filter zurücksetzen"
            >
              Filter zurücksetzen
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Kontostände {filterMonat && `(Monat: ${formatMonat(filterMonat)})`}
          </h2>


          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 font-medium">Spieler</th>
                <th className="px-4 py-2 font-medium">Kontostand</th>
              </tr>
            </thead>
            <tbody>
              {playerList.map((player, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{player.name}</td>
                  <td
                    className={`px-4 py-2 font-mono ${
                      player.balance < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {(player.balance ?? 0).toFixed(2)} €
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 border-t font-semibold">
                <td className="px-4 py-2">Gesamtkontostand</td>
                <td className={`px-4 py-2 ${
                      gesamtsumme < 0 ? "text-red-600" : "text-green-600"
                    }`}>{(gesamtsumme ?? 0).toFixed(2)} €</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </main>
  );
}