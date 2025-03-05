import TrashCan from '@/app/icons/TrashCan';
import Link from 'next/link';
import React from 'react'
import deletePlayer from '../services/deletePlayer';

const DeleteButton = (data: {id: Number}) => {
    const delPlayer = (id: Number) => {
        deletePlayer(id);
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>, id: Number) => {
        // Verhindern der Standardaktion (falls notwendig)
        event.preventDefault();
    
        // Übergebe die Daten an die saveData-Funktion
        delPlayer(id);
      };
  return (
    <div role="button" className='btn btn-ghost btn-circle' onClick={() => delPlayer(data.id)}>
      <TrashCan />
    </div>
  )
}

export default DeleteButton
