'use client'
import React, { useState } from 'react'

const KanbanItemCard = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };

  const clearInput = () => {
    setInputValue("");
  };
  return (
    <div className='card bg-base-200 w-96 shadow-xl'>
      <div className='card-body'>
        <div>
          <input type='text' placeholder='Type new Kanban Item here' className='input' value={inputValue} onChange={handleInputChange} />
        </div>
        <div>
          <button className='btn btn-wide' data-theme="autumn" onClick={clearInput}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default KanbanItemCard
