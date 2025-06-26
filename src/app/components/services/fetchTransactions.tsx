import React from 'react'

const fetchTransactions = async () => {
  //const url = 'https://player-management-service-production.up.railway.app/api/player/newPlayer';
    const url = 'http://localhost:8080/api/transaction';

  try{
    console.log("Fetching transactions...");

    const response = await fetch(`${url}/all`,{
      method: 'GET',
    });

    console.log("Response status:", response.status);
    console.log(response.json);
    if(!response.ok){
        throw new Error("Fehler beim Laden der Transaktionen!");
    }
    return await response.json();
  }catch(error){
    console.error("API Fehler:", error);
    return[];
  }
}

export default fetchTransactions
