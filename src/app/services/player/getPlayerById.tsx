import React from 'react'

async function getPlayerById (id : number) {
  const url = process.env.NEXT_PUBLIC_PLAYER_SERVICE_URL;
  try{
    console.log("Getting single Player...");

    const response = await fetch((`${url}/${id}`));

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
