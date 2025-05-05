import router from 'next/router';
import React, { useState } from 'react'

async function login (username: string, password: string) {
  try{
    console.log("User logging in...");

    const response = await fetch((`localhost:8080/api/login`),{
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({
            username,
            password,
        }),
    });
    console.log("Response status:", response.status);
    if(response.ok){
        router.push("/home")
    }else{
        throw new Error("Anmeldung fehlgeschlagen. Username und/oder Passwort falsch!");
    }
  }catch(error){
    console.error("API Fehler:", error);
    return[];
  }
}

export default login
