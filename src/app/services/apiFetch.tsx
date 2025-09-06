import { loadToken } from "./token";

export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = loadToken();
  const headers = new Headers(init.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return fetch(input, { ...init, headers });
}