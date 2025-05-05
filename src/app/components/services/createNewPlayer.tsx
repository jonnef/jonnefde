import React from 'react'

const createNewPlayer = async (data: {firstName: string, lastName: string, position: string}) => {
    //PROD: const url = 'https://player-management-service-production.up.railway.app/api/player/newPlayer';
    const url = 'http://localhost:8080/api/player/newPlayer';
  try{
    console.log("Neuer spieler wird erstellt!");
    console.log(data);
    const resp = await fetch(url, {
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
