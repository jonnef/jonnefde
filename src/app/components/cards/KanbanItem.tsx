import React from 'react'

const KanbanItemCard = () => {
  return (
    <div className='card bg-base-200 w-96 shadow-xl'>
      <div className='card-body'>
        <input type='text' placeholder='Type new Kanban Item here' className='input' />
      </div>
    </div>
  )
}

export default KanbanItemCard
