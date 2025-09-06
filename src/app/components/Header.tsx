"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { Settings, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

// --- Types -----------------------------------------------------------------
export type NavbarProps = {
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

// --- Config ----------------------------------------------------------------
const NAV_LINKS: Array<
  | { href: string; label: string; requireRole?: never }
  | { href: string; label: string; requireRole: "admin" | "editor" | string }
> = [
  { href: "/admin", label: "Admin", requireRole: "admin" },
];

// --- Component --------------------------------------------------------------
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
  const pathname = usePathname();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const settingsRef = useRef<HTMLDivElement>(null);
  const formFirstInputRef = useRef<HTMLInputElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  // Close popovers on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        settingsRef.current &&
        !settingsRef.current.contains(target)
      ) {
        setSettingsOpen(false);
      }
      if (
        mobilePanelRef.current &&
        !mobilePanelRef.current.contains(target) &&
        !(target as HTMLElement).closest("#mobileMenuButton")
      ) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Close on Escape & simple focus trap
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSettingsOpen(false);
        setMobileOpen(false);
      }
      // focus trap for settings popover
      if (settingsOpen && (e.key === "Tab" || e.key === "Shift")) {
        const root = settingsRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [settingsOpen]);

  // When opening settings, focus the first field if not logged in
  useEffect(() => {
    if (settingsOpen && !role) {
      formFirstInputRef.current?.focus();
    }
  }, [settingsOpen, role]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const filteredLinks = useMemo(() => {
    return NAV_LINKS.filter((l) => !l.requireRole || role === l.requireRole);
  }, [role]);

  return (
    <header className="bg-base-100 sticky top-0 z-50 shadow-md supports-[backdrop-filter]:backdrop-blur">
      <div className="w-full px-3 sm:px-4">
        <div className="h-14 flex items-center justify-between gap-2">
          {/* Left: Logo + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              id="mobileMenuButton"
              aria-label="Hauptmenü öffnen"
              aria-controls="mobileNavPanel"
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen((v) => !v);
                setSettingsOpen(false);
              }}
              className="sm:hidden p-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-700/60 transition"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

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

          {/* Center: Headline */}
          <div className="hidden sm:block">
            <span className="text-base sm:text-lg font-semibold">{headline}</span>
          </div>

          {/* Right: Desktop Nav + Theme + Settings */}
          <div className="flex items-center gap-1 sm:gap-2 relative">
            {/* Desktop Links */}
            <nav aria-label="Hauptnavigation" className="hidden md:flex items-center gap-1">
              {filteredLinks.map((link) => (
                <ActiveLink key={link.href} href={link.href} pathname={pathname}>
                  {link.label}
                </ActiveLink>
              ))}
            </nav>

            <ThemeToggle />

            <div ref={settingsRef} className="relative">
              <button
                onClick={() => {
                  setSettingsOpen((v) => !v);
                  setMobileOpen(false);
                }}
                className="p-2 rounded-full hover:bg-gray-200/70 dark:hover:bg-gray-700/60 transition"
                aria-haspopup="dialog"
                aria-expanded={settingsOpen}
                aria-label="Einstellungen"
              >
                <Settings className="h-6 w-6" />
              </button>

              {settingsOpen && (
                <div
                  role="dialog"
                  aria-modal="true"
                  className="absolute right-0 top-[calc(100%+8px)] w-80 max-w-[90vw] bg-white dark:bg-neutral-900 dark:text-neutral-100 shadow-xl rounded-xl border border-gray-200/70 dark:border-neutral-700 p-4"
                >
                  {!role ? (
                    <form onSubmit={isRegister ? onRegister : onLogin} className="space-y-3">
                      <h2 className="text-lg font-semibold">
                        {isRegister ? "Registrieren" : "Anmelden"}
                      </h2>
                      {error && (
                        <p className="text-red-600 text-sm" role="alert">
                          {error}
                        </p>
                      )}
                      <input
                        ref={formFirstInputRef}
                        type="text"
                        placeholder="Benutzername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded bg-white dark:bg-neutral-800 dark:border-neutral-700"
                        required
                        autoComplete="username"
                      />
                      <input
                        type="password"
                        placeholder="Passwort"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded bg-white dark:bg-neutral-800 dark:border-neutral-700"
                        required
                        autoComplete={isRegister ? "new-password" : "current-password"}
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center"
                      >
                        {loading ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
                            Bitte warten…
                          </span>
                        ) : isRegister ? (
                          "Registrieren"
                        ) : (
                          "Login"
                        )}
                      </button>
                      <p
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-center text-blue-600 dark:text-blue-400 cursor-pointer hover:underline select-none text-sm"
                      >
                        {isRegister
                          ? "Schon registriert? Login"
                          : "Noch keinen Account? Registrieren"}
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
                          setSettingsOpen(false);
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
        </div>
      </div>

      {/* Mobile Sheet */}
      <div
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-[60] ${mobileOpen ? "" : "pointer-events-none"}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 transition-opacity ${mobileOpen ? "opacity-100 bg-black/40" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          id="mobileNavPanel"
          ref={mobilePanelRef}
          className={`absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-neutral-900 shadow-xl transform transition-transform ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b border-gray-200/70 dark:border-neutral-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/images/j-mark.svg" alt="Logo" width={28} height={28} />
              <span className="font-semibold">{headline}</span>
            </div>
            <button
              aria-label="Menü schließen"
              className="p-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-700/60"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="p-3 flex flex-col gap-1" aria-label="Mobiles Hauptmenü">
            {filteredLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded-lg text-base hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  pathname === l.href ? "font-semibold bg-gray-100 dark:bg-gray-800" : ""
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-3 border-t border-gray-200/70 dark:border-neutral-700 flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-neutral-300">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

// --- Helpers ---------------------------------------------------------------
function ActiveLink({
  href,
  children,
  pathname,
}: {
  href: string;
  children: React.ReactNode;
  pathname: string | null;
}) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
        isActive ? "font-semibold bg-gray-100 dark:bg-gray-800" : ""
      }`}
    >
      {children}
    </Link>
  );
}
