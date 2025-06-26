"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import fetchPlayers from "@/app/components/services/player/fetchPlayers";
import createNewPlayer from "@/app/components/services/player/createNewPlayer";
import deletePlayer from '@/app/components/services/player/deletePlayer';


type Player = {
  name: string;
  jerseyNumber: number;
};

export default function Spielerverwaltung() {
  const [player, setPlayer] = useState<Player[]>([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    const loadPlayers = async () => {
      const data = await fetchPlayers();
      console.log(data);
      setPlayer(data);
    };
    loadPlayers();
  }, []);

  const hinzufuegen = async () => {
    const name = newName.trim();
    const number = newNumber;

    if (!name || !number) {
    alert("Bitte Name und Trikotnummer eingeben.");
    return;
    }

    if (player.some((s) => s.name === name)) {
    alert("Spieler mit gleichem Namen existiert bereits.");
    return;
    }

    const payload = {
    name,
    jerseyNumber: Number(number),
    };

    const result = await createNewPlayer(payload);

    if (result.success) {
      const aktualisierteSpieler = await fetchPlayers();
      setPlayer(aktualisierteSpieler);
      setNewName("");
      setNewNumber("");
      alert("Spieler erfolgreich hinzugefügt.");
    } else {
      alert(`Fehler beim Hinzufügen: ${result.message}`);
    }
  };

  const entfernen = (number: number) => {
    setPlayer(player.filter((s) => s.jerseyNumber !== number));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">👥 Spielerverwaltung</h1>

        <div className="mb-6 space-y-2">
          <label className="block text-sm font-medium text-gray-700">Neuen Spieler hinzufügen</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="text"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
              placeholder="Nr."
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <button
              onClick={hinzufuegen}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              Hinzufügen
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-200">
          <h2 className="text-lg font-semibold p-4 border-b">Spielerliste</h2>
          <ul>
            {player.map((s, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center px-4 py-3 border-t text-sm"
              >
                <div className="flex gap-3 items-center">
                  <span className="font-mono text-gray-500 w-6">{s.jerseyNumber}</span>
                  <span>{s.name}</span>
                </div>
                <button
                  onClick={async () => entfernen(await deletePlayer(s.jerseyNumber))}
                  className="text-red-600 hover:text-red-800 transition"
                  title="Spieler löschen"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
            {player.length === 0 && (
              <li className="px-4 py-3 text-gray-500 text-sm">Keine Spieler vorhanden.</li>
            )}
          </ul>
        </div>

        <div className="mt-8">
          <Link
            href="/union"
            className="text-blue-600 text-sm hover:underline"
          >
            ← Zurück zur Übersicht
          </Link>
        </div>
      </div>
    </main>
  );
}
