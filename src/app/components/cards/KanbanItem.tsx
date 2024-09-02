import React from 'react'
import { Items } from '../interfaces/Items'

const KanbanItem = (tasks: Items) => {

  return (
    <div className='card bg-base-300 w-96' key={tasks.itemId}>
      <div className='card-body' >
        {tasks.itemText}
      </div>
    </div>
  )
}

export default KanbanItem
