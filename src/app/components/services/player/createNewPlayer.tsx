import React from 'react'

const createNewPlayer = async (data: {name: string, jerseyNumber: number}) => {
    const url = process.env.NEXT_PUBLIC_PLAYER_SERVICE_URL;
  try{
    console.log("Neuer spieler wird erstellt!");
    console.log(data);
    const resp = await fetch(`${url}/newPlayer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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

export default createNewPlayer
