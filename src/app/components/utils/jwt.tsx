// components/utils/jwt.ts (nur für Username aus dem Token)
export function decodeJwt<T = any>(token: string): T | null {
  try {
    const [, payload] = token.split(".");
    const base = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json =
      typeof window === "undefined"
        ? Buffer.from(base, "base64").toString("utf-8")
        : decodeURIComponent(
            atob(base)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );
    return JSON.parse(json);
  } catch {
    return null;
  }
}
