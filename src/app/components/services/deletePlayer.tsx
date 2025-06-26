import React from 'react'

async function deletePlayer (jerseyNumber: Number) {
  //const url = 'https://player-management-service-production.up.railway.app/api/player/newPlayer';
    const url = 'http://localhost:8080/api/player';

  try{
    console.log("Delete player...", jerseyNumber);

    const response = await fetch((`${url}/deletePlayer/${jerseyNumber}`),{method: 'DELETE',headers: {
      'Content-Type': 'application/json',
    },});

    console.log("Response status:", response.status);
    if(!response.ok){
        throw new Error("Fehler beim Löschen des Spielers!");
    }
    return await response.json();
  }catch(error){
    console.error("API Fehler:", error);
    return[];
  }
}

export default deletePlayer
