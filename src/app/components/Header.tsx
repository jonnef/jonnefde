"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuButton from "./buttons/Menu";
import ThemeToggle from "./ThemeToggle";
import { Settings } from "lucide-react";

type NavbarProps = {
  headline: string;
  role: string | null;
  username: string;
  password: string;
  error: string | null;
  loading: boolean;
  isRegister: boolean;
  onLogin: (e: React.FormEvent) => void;
  onRegister: (e: React.FormEvent) => void;
  onLogout: () => void;
  setUsername: (val: string) => void;
  setPassword: (val: string) => void;
  setIsRegister: (val: boolean) => void;
};

export default function Header({
  headline,
  role,
  username,
  password,
  error,
  loading,
  isRegister,
  onLogin,
  onRegister,
  onLogout,
  setUsername,
  setPassword,
  setIsRegister,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!popRef.current) return;
      if (!popRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">

      <div className="navbar-start flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 hover:opacity-85">

          <Image
            src="/images/j-mark.svg"
            alt="Jonnef Logo"
            width={32}
            height={32}
            priority
          />
        </Link>
      </div>

      <div className="navbar-center">
        <span className="text-base sm:text-lg font-semibold">{headline}</span>
      </div>

      <div className="navbar-end flex items-center gap-1 sm:gap-2 relative" ref={popRef}>
        <ThemeToggle />

        <button
          onClick={() => setOpen((v) => !v)}
          className="p-2 rounded-full hover:bg-gray-200/70 dark:hover:bg-gray-700/60 transition"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Einstellungen"
        >
          <Settings className="h-6 w-6" />
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 top-[calc(100%+8px)] w-72 sm:w-80 bg-white dark:bg-neutral-900 dark:text-neutral-100
                       shadow-xl rounded-xl border border-gray-200/70 dark:border-neutral-700 p-4"
          >
            {!role ? (
              <form onSubmit={isRegister ? onRegister : onLogin}>
                <h2 className="text-lg font-semibold mb-3">
                  {isRegister ? "Registrieren" : "Anmelden"}
                </h2>
                {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
                <input
                  type="text"
                  placeholder="Benutzername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 mb-2 border rounded bg-white dark:bg-neutral-800 dark:border-neutral-700"
                  required
                />
                <input
                  type="password"
                  placeholder="Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 mb-3 border rounded bg-white dark:bg-neutral-800 dark:border-neutral-700"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  {loading ? "..." : isRegister ? "Registrieren" : "Login"}
                </button>
                <p
                  onClick={() => setIsRegister(!isRegister)}
                  className="mt-3 text-center text-blue-600 dark:text-blue-400 cursor-pointer hover:underline select-none text-sm"
                >
                  {isRegister ? "Schon registriert? Login" : "Noch keinen Account? Registrieren"}
                </p>
              </form>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-gray-600 dark:text-neutral-300">
                  Eingeloggt als <b>{role}</b>
                </p>
                <button
                  onClick={() => {
                    onLogout();
                    setOpen(false);
                  }}
                  className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
