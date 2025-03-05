import React from 'react'

async function getPlayerById ({id} : Player) {
  try{
    console.log("Getting single Player...");

    const response = await fetch((`http://localhost:8080/api/player/${id}`));

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
