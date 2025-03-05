'use client'
import React, { useState } from 'react'
import createNewPlayer from '../services/createNewPlayer';

const NewPlayerCard = () => {
  const [inputValues, setInputValues] = useState<Player>({
    firstName: '',
    lastName: '',
    nickName: '',
    position: '',
    birthDate: '',
    balance: 0,
    jerseyNumber: 0
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setInputValues(prevValues => ({
      ...prevValues,
      [name]: value,  // Aktualisiert nur das entsprechende Feld
    }));
  };

  const saveData = (data: {firstName: string, lastName: string,nickName: string, position: string, birthDate: string, balance: number, jerseyNumber:number}) => {
    createNewPlayer(data);
    setInputValues({
      firstName: '',
      lastName: '',
      nickName: '',
      position: '',
      birthDate: '',
      balance: 0,
      jerseyNumber: 0
    });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Verhindern der Standardaktion (falls notwendig)
    event.preventDefault();

    // Übergebe die Daten an die saveData-Funktion
    saveData(inputValues);
  };
  return (
    <div className='card bg-base-200 w-96 shadow-xl'>
      <div className='card-body'>
      <fieldset className='fieldset w-xs bg-base-200 border border-base-300 p-2 rounded-box'>
            <legend className='fieldset-legend'>Test</legend>
            <label className="fieldset-label" >Vorname</label>
            <input type="text" className="input" name="firstName" value={inputValues.firstName} onChange={handleInputChange} placeholder="Max" />
            <label className="fieldset-label">Nachname</label>
            <input type="text" className="input" name="lastName" value={inputValues.lastName} onChange={handleInputChange} placeholder="Mustermann" />
            <label className="fieldset-label">Spitzname</label>
            <input type="text" className="input" name="nickName" value={inputValues.nickName} onChange={handleInputChange} placeholder="Musti" />
            <label className="fieldset-label">Geburtsdatum</label>
            <input type="date" className="input" name="birthDate" value={inputValues.birthDate ? inputValues.birthDate.toString().split("T")[0] : ""} onChange={handleInputChange} placeholder="01.01.1999" />
            <label className="fieldset-label">Trikotnummer</label>
            <input type="text" className="input" inputMode='numeric' name="jerseyNumber" value={inputValues.jerseyNumber} onChange={handleInputChange} placeholder="my-awesome-page" />
            <label className="fieldset-label">Position</label>
            <select name="position" value={inputValues.position} onChange={handleInputChange}>
              <option value="">Wähle die Position des Spielers</option>
              <option value="Attacker">Stürmer</option>
              <option value="Midfielder">Mittelfeldspieler</option>
              <option value="Defender">Abwerspieler</option>
              <option value="Goalkeeper">Torhüter</option>
            </select>
            <button className="btn join-item" onClick={handleSubmit}>save</button>
        </fieldset>
      </div>
    </div>
  )
}

export default NewPlayerCard
