import NewPlayerCard from '@/app/components/cards/NewPlayer'
import NavbarComponent from '@/app/components/Navbar'
import React from 'react'

const NewPlayerPage = () => {
  return (
    <div>
        <div>
        <NavbarComponent headline={"Neuer Spieler"} />
        </div>
        <div className='container mx-auto'>
        <div className='grid grid-cols-3'>
          <div>

          </div>
          <div style={{ justifySelf: "center", paddingTop: 5 }}>
            <NewPlayerCard />
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
 )
}

export default NewPlayerPage
