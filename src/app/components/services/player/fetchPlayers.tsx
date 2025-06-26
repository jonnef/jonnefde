import React from 'react'

const fetchPlayers = async () => {
    const base_url = process.env.NEXT_PUBLIC_PLAYER_SERVICE_URL;
   
    const service_url = `${base_url}/allPlayers`;

  try{
    console.log("Fetching players...");
    console.log("end",process.env);
    console.log("envURL", process.env.NEXT_PUBLIC_PLAYER_SERVICE_URL);

    const response = await fetch(service_url,{
      method: 'GET',
    });

    console.log("URL:", service_url);
    console.log("Response status:", response.status);
    console.log(response.json);
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
