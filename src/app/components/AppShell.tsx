"use client";
import React from "react";
import Header from "./Header";
import { useAuth } from "../services/useAuth";
import NavbarComponent from "./Navbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const {
    username, password, role, error, loading, isRegister,
    setUsername, setPassword, setIsRegister,
    login, register, logout,
  } = useAuth();

  return (
    <>
      <Header
              role={role}
              username={username}
              password={password}
              error={error}
              loading={loading}
              isRegister={isRegister}
              onLogin={login}
              onRegister={register}
              onLogout={logout}
              setUsername={setUsername}
              setPassword={setPassword}
              setIsRegister={setIsRegister}
              headline={"Home"}      />
      <main>{children}</main>
    </>
  );
}
