import React from 'react'
import HomeButton from '../components/buttons/Home'
import NavbarComponent from '../components/Navbar'
import KanbanItemCard from '../components/cards/KanbanItem'

const KanbanPage = () => {
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
            <KanbanItemCard />
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default KanbanPage
