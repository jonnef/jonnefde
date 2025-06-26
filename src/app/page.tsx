"use client";
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const tools = [
    {
      title: 'Mannschaftskasse',
      description: 'Beiträge und Ausgaben im Fußballteam verwalten',
      icon: '🏆',
      link: '/union'
    },
    {
      title: 'Zeiterfassung',
      description: 'Einfache App zum Tracken von Aufgaben & Zeit',
      icon: '🕑',
      link: '/tools/zeiterfassung'
    },
    {
      title: 'Haushaltsrechner',
      description: 'Übersicht über monatliche Einnahmen & Ausgaben',
      icon: '📊',
      link: '/tools/haushaltsrechner'
    },
    {
      title: 'Link-Sammlung',
      description: 'Eigene Links / Lesezeichen organisiert speichern',
      icon: '📎',
      link: '/tools/link-sammlung'
    }
  ];

  console.log('TEST:', process.env.NEXT_PUBLIC_PLAYER_SERVICE_URL);
  return (
    <>
      <Head>
        <title>Kenneth&apos; Tool Hub</title>
      </Head>
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Willkommen bei Max&apos; Tool Hub</h1>
          <p className="text-gray-600 mb-8">Hier findest du alle Tools, die ich für mich oder mein Team gebaut habe.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool, index) => (
              <div key={index} className="rounded-2xl shadow-sm bg-white p-6 border border-gray-200">
                <div className="text-3xl mb-2">{tool.icon}</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">{tool.title}</h2>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <Link href={tool.link} legacyBehavior>
                  <a className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">Tool öffnen</a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
