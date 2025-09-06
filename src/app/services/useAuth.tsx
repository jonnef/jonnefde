// services/useAuth.tsx  (Ausschnitt)
import { useEffect, useState } from "react";
import { saveToken, loadToken, clearToken } from "./token";
import { apiFetch } from "../services/apiFetch";
import { decodeJwt } from "../components/utils/jwt";

type JwtPayload = { sub?: string; roles?: string[]; role?: string; exp?: number };

export function useAuth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_USER_SERVICE_URL;

  useEffect(() => {
    const t = loadToken();
    if (!t) return;
    const p = decodeJwt<JwtPayload>(t);
    // Im aktuellen Token gibt's keine Rollen – nur sub:
    // wenn du willst, kannst du hier den Anzeigenamen setzen o.ä.
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error(`Login fehlgeschlagen (${res.status})`);

      const data = await res.json();
      const token = data.token as string;            // ✅ HIER: data.token
      if (!token) throw new Error("Kein Token in der Login-Antwort gefunden.");
      saveToken(token);

      // Optional: Username aus dem Token für die UI
      const payload = decodeJwt<JwtPayload>(token);
      // setDisplayName(payload?.sub ?? null);

      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  };

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error(await res.text());
      alert("Registrierung erfolgreich! Bitte einloggen.");
      setIsRegister(false);
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setRole(null);
    clearToken();
  };

  // Beispiel: Protected Call (setzt automatisch Bearer)
  const loadPlayers = async () => {
    const res = await apiFetch(`${process.env.NEXT_PUBLIC_PLAYER_SERVICE_URL}/allPlayers`);
    if (!res.ok) throw new Error(`players: ${res.status}`);
    return res.json();
  };

  return {
    username, password, role, error, loading, isRegister,
    setUsername, setPassword, setIsRegister,
    login, register, logout, loadPlayers,
  };
}
