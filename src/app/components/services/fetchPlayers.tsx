import React from 'react'

const fetchPlayers = async () => {
  try{
    console.log("Fetching players...");

    const response = await fetch(('https://player-management-service-production.up.railway.app/api/player/allPlayers'));

    console.log("Response status:", response.status);
    if(!response.ok){
        throw new Error("Fehler beim Laden der Spieler!");
    }
    return await response.json();
  }catch(error){
    console.error("API Fehler:", error);
    return[];
  }
}

export default fetchPlayers
