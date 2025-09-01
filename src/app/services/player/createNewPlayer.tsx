// services/player/createNewPlayer.ts
type CreatePlayerInput = {
  name: string;
  jerseyNumber: number;
};

type CreatePlayerResult =
  | { success: true; data: any }
  | { success: false; message: string; status?: number };

export default async function createNewPlayer(
  input: CreatePlayerInput,
  jwt?: string // optional: Token direkt übergeben; sonst aus localStorage
): Promise<CreatePlayerResult> {
  const baseUrl = process.env.NEXT_PUBLIC_PLAYER_SERVICE_URL;
  if (!baseUrl) {
    return { success: false, message: "NEXT_PUBLIC_PLAYER_SERVICE_URL ist nicht gesetzt." };
  }

  // JWT laden, falls nicht übergeben
  const token =
    jwt ??
    (typeof window !== "undefined" ? localStorage.getItem("JWT") ?? undefined : undefined);

  if (!token) {
    return { success: false, message: "Kein JWT gefunden. Bitte zuerst einloggen." };
  }

  try {
    const resp = await fetch(`${baseUrl}/newPlayer`, {
      method: "POST",
      // Bei Bearer-Auth KEINE Cookies mitsenden:
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        // ✅ Bearer-Header setzen (statt X-CSRF-TOKEN)
        Authorization: `Bearer ${token}`,
      },
      // Nur die Daten schicken, NICHT den Token
      body: JSON.stringify({
        name: input.name,
        jerseyNumber: input.jerseyNumber,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      return {
        success: false,
        status: resp.status,
        message:
          text || `Fehler bei der Anfrage: HTTP ${resp.status} ${resp.statusText}`,
      };
    }

    const data = await resp.json().catch(() => ({}));
    return { success: true, data };
  } catch (err: any) {
    return { success: false, message: err?.message ?? "Unbekannter Fehler" };
  }
}
