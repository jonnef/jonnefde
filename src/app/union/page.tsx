'use client'
import React, { useEffect, useState } from 'react'
import NavbarComponent from '../components/Navbar'
import Table from '../components/Table'
import fetchPlayers from '../components/services/fetchPlayers'

const UnionPage = () => {

    const [players, setPlayers] = useState([]);
    useEffect(()=>{
      const loadData = async () => {
          const data = await fetchPlayers();
          setPlayers(data);
      };
      loadData();
    }, []);

  return (
    <div>
      <div>
        <NavbarComponent headline={"Union 2te Mannschaft"} />
      </div>
      <div className='container mx-auto'>
        <div className='grid grid-cols-3'>
          <div>

          </div>
          <div style={{ justifySelf: "center", paddingTop: 5 }}>
            <Table data={players}/>
          </div>
          <div>
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnionPage
