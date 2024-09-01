import MenuIcon from '@/app/icons/Menu'
import Link from 'next/link'
import React from 'react'

const MenuButton = () => {
  return (
    <div>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <MenuIcon />
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><Link href="/kanban">Kanban</Link></li>
          <li><a>Portfolio</a></li>
          <li><a>About</a></li>
        </ul>
      </div>
    </div>
  )
}

export default MenuButton
