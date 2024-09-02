"use client"
import React, { useState } from 'react'
import NavbarComponent from '../components/Navbar'
import NewKanbanItemCard from '../components/cards/NewKanbanItem'
import { closestCorners, DndContext } from '@dnd-kit/core'
import TodoColumn from './todo/page'

const KanbanPage = () => {

  const [items, setItems] = useState([
    { id: 0, text: "Merge new icons" },
    { id: 1, text: "Rebase from develop" },
    { id: 2, text: "Push to Branch" },
    { id: 3, text: "Merge to develop" },
  ])

  return (
    <div>
      <div>
        <NavbarComponent headline={"Kanban board"} />
      </div>
      <div className='container mx-auto'>
        <div className='grid grid-cols-3'>
          <div>

          </div>
          <div style={{ justifySelf: "center", paddingTop: 5 }}>
            <DndContext collisionDetection={closestCorners}>
              <TodoColumn items={items} />
            </DndContext>
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default KanbanPage
