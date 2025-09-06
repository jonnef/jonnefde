import React from 'react'

async function deletePlayer (jerseyNumber: Number, jwt?: string) {
    const url = process.env.NEXT_PUBLIC_PLAYER_SERVICE_URL;

  try{
    console.log("Delete player...", jerseyNumber);

    const token =
    jwt ??
    (typeof window !== "undefined" ? localStorage.getItem("JWT") ?? undefined : undefined);

    const response = await fetch((`${url}/deletePlayer/${jerseyNumber}`),
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
