import Head from "next/head";
import ToolGrid from "./components/ToolGrid";

export default function HomePage() {
  const tools = [
    { title: "Placeholder", description: "Placeholder", icon: "🏆", link: "/", roles: ["USER","ADMIN"] },
    { title: "Getränkekasse", description: "Getränkekassen übersicht und Verwaltung", icon: "🏆", link: "/union", roles: ["USER","ADMIN"] },
    { title: "Placeholder", description: "Placeholder", icon: "🏆", link: "/", roles: ["USER","ADMIN"] },
  ];

  return (
    <>
      <Head>
        <title>Kenneth&apos; Tool Hub</title>
        <meta name="theme-color" content="#ffffff" />
      </Head>

      {/* WICHTIG: pt-16 damit nichts unter dem sticky Header klebt */}
      <main className="min-h-screen bg-base-100 text-base-content pt-16 py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6">Deine Tools</h2>

        {tools.length === 0 ? (
          <p className="opacity-70">Keine Tools gefunden.</p>
        ) : (
          <ToolGrid tools={tools} />
        )}
      </main>
    </>
  );
}
