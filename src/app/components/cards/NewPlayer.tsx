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

  const saveData = (data: {firstName: string, lastName: string, nickName: string, position: string, birthDate: string, balance: number, jerseyNumber:number}) => {
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
    <div className="md:container md:mx-auto p-4">
  <fieldset className="fieldset max-w-4xl w-full bg-base-200 border border-base-300 p-6 rounded-lg shadow-lg">
    <div className="space-y-6">
      <div className="field-group">
        <label className="fieldset-label" htmlFor="firstName">Vorname</label>
        <input
          id="firstName"
          type="text"
          className="input w-full p-2 border rounded-md"
          name="firstName"
          value={inputValues.firstName}
          onChange={handleInputChange}
          placeholder="Max"
        />
      </div>

      <div className="field-group">
        <label className="fieldset-label" htmlFor="lastName">Nachname</label>
        <input
          id="lastName"
          type="text"
          className="input w-full p-2 border rounded-md"
          name="lastName"
          value={inputValues.lastName}
          onChange={handleInputChange}
          placeholder="Mustermann"
        />
      </div>

      <div className="field-group">
        <label className="fieldset-label" htmlFor="nickName">Spitzname</label>
        <input
          id="nickName"
          type="text"
          className="input w-full p-2 border rounded-md"
          name="nickName"
          value={inputValues.nickName}
          onChange={handleInputChange}
          placeholder="s"
        />
      </div>

      <div className="field-group">
        <label className="fieldset-label" htmlFor="birthDate">Geburtsdatum</label>
        <input
          id="birthDate"
          type="date"
          className="input w-full p-2 border rounded-md"
          name="birthDate"
          value={inputValues.birthDate ? inputValues.birthDate.toString().split("T")[0] : ""}
          onChange={handleInputChange}
          placeholder="01.01.1999"
        />
      </div>

      <div className="field-group">
        <label className="fieldset-label" htmlFor="jerseyNumber">Trikotnummer</label>
        <input
          id="jerseyNumber"
          type="text"
          className="input w-full p-2 border rounded-md"
          inputMode="numeric"
          name="jerseyNumber"
          value={inputValues.jerseyNumber}
          onChange={handleInputChange}
          placeholder="Nummer"
        />
      </div>

      <div className="field-group">
        <label className="fieldset-label" htmlFor="position">Position</label>
        <select
          id="position"
          name="position"
          className="input w-full p-2 border rounded-md"
          value={inputValues.position}
          onChange={handleInputChange}
        >
          <option value="">Wähle die Position des Spielers</option>
          <option value="Attacker">Stürmer</option>
          <option value="Midfielder">Mittelfeldspieler</option>
          <option value="Defender">Abwehrspieler</option>
          <option value="Goalkeeper">Torhüter</option>
        </select>
      </div>

      <div className="mt-4">
        <button
          className="btn w-full bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2"
          onClick={handleSubmit}
        >
          Speichern
        </button>
      </div>
    </div>
  </fieldset>
</div>

  )
}

export default NewPlayerCard
