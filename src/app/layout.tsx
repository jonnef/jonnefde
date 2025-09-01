import "./globals.css";
import AppShell from "./components/AppShell"; // Client-Komponente mit Header

export const metadata = {
  title: "Kenneth' Tool Hub",
  description: "Tools & Utilities",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
