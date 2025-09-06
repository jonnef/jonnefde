"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import fetchPlayers from "../services/player/fetchPlayers";
import { useSession } from "next-auth/react"; // ← falls du next-auth nutzt

type Player = {
  name: string;
  balance: number;
};

export default function MannschaftskasseOverview() {
  const [filterMonat, setFilterMonat] = useState<string>("");
  const [playerList, setPlayerList] = useState<Player[]>([]);

  // Admin-Erkennung (next-auth):
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    const ladeSpieler = async () => {
      try {
        const daten = await fetchPlayers();
        setPlayerList(Array.isArray(daten) ? daten : []);
      } catch (e) {
        console.error(e);
        setPlayerList([]);
      }
    };
    ladeSpieler();
  }, []);

  const gesamtsumme = useMemo(() => {
    return playerList.reduce((sum, player) => sum + (player.balance ?? 0), 0);
  }, [playerList]);

  function formatMonat(monat: string) {
    const [jahr, monatNummer] = monat.split("-");
    if (!jahr || !monatNummer) return monat;
    const datum = new Date(parseInt(jahr), parseInt(monatNummer) - 1);
    return datum.toLocaleDateString("de-DE", { year: "numeric", month: "long" });
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">💰 Getränkekasse</h1>

        <div className="flex gap-4 mb-6">
          {/* Admin-only Aktionen */}
          {isAdmin && (
            <>
              <Link
                href="/union/spieler"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition"
              >
                Spielerverwaltung
              </Link>
              <Link
                href="/union/transaktionen"
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm hover:bg-secondary/80 transition"
              >
                Transaktionen
              </Link>
            </>
          )}

          {/* Monatsfilter */}
          <input
            type="month"
            value={filterMonat}
            onChange={(e) => setFilterMonat(e.target.value)}
            className="ml-auto px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground"
            placeholder="Monat filtern"
          />
          {filterMonat && (
            <button
              onClick={() => setFilterMonat("")}
              className="text-muted-foreground hover:text-foreground transition underline text-sm"
              aria-label="Filter zurücksetzen"
            >
              Filter zurücksetzen
            </button>
          )}
        </div>

        <div className="rounded-xl shadow p-4 border border-border bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-4">
            Kontostände {filterMonat && `(Monat: ${formatMonat(filterMonat)})`}
          </h2>

          <table className="min-w-full text-sm text-left">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2 font-medium">Spieler</th>
                <th className="px-4 py-2 font-medium">Kontostand</th>
              </tr>
            </thead>
            <tbody>
              {playerList.map((player, idx) => (
                <tr key={idx} className="border-t border-border">
                  <td className="px-4 py-2">{player.name}</td>
                  <td
                    className={`px-4 py-2 font-mono ${
                      (player.balance ?? 0) < 0
                        ? "text-destructive"
                        : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {(player.balance ?? 0).toFixed(2)} €
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-muted border-t border-border font-semibold">
                <td className="px-4 py-2">Gesamtkontostand</td>
                <td
                  className={`px-4 py-2 ${
                    gesamtsumme < 0
                      ? "text-destructive"
                      : "text-emerald-600 dark:text-emerald-400"
                  }`}
                >
                  {(gesamtsumme ?? 0).toFixed(2)} €
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </main>
  );
}
