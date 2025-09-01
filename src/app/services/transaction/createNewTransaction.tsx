import React from 'react'

const createNewTransaction = async (data: {playerName: string, amount: number},jwt?: string) => {
    const url = process.env.NEXT_PUBLIC_TRANSACTION_SERVICE_URL;
    const token =
    jwt ??
    (typeof window !== "undefined" ? localStorage.getItem("JWT") ?? undefined : undefined);
  try{
    
    console.log("Neue Transaktion wird erstellt!");
    console.log(data);
    const resp = await fetch(`${url}/newTransaction`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        body: JSON.stringify(data)
    })
    if (resp.ok) {
        const responseData = await resp.json();
        return { success: true, data: responseData }; // Erfolgreiche Antwort
      } else {
        throw new Error(`Fehler bei der Anfrage: ${resp.statusText}`);
      }
    } catch (error: any) {
      console.error('Fehler beim Senden der Anfrage:', error);
      return { success: false, message: error.message }; // Fehlerbehandlung
    }
}

export default createNewTransaction
