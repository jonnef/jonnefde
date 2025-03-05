import React from 'react'

async function getPlayerById (id : number) {
  try{
    console.log("Getting single Player...");

    const response = await fetch((`https://player-management-service-production.up.railway.app/api/player/${id}`));

    console.log("Response status:", response.status);
    if(!response.ok){
        throw new Error("Fehler beim Suchen des Spielers!");
    }
    return await response.json();
  }catch(error){
    console.error("API Fehler:", error);
    return[];
  }
}

export default getPlayerById
