import React from 'react'

async function deletePlayer (id: Number) {
  try{
    console.log("Delete player...", id);

    const response = await fetch((`https://player-management-service-production.up.railway.app/api/player/deletePlayer/${id}`),{method: 'DELETE',headers: {
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
