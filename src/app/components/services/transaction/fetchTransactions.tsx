import React from 'react'

const fetchTransactions = async () => {
    const url = process.env.NEXT_PUBLIC_TRANSACTION_SERVICE_URL;

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
