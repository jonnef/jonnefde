import React from 'react'
import HomeButton from './buttons/Home'
import MenuButton from './buttons/Menu'
import SettingsButton from './buttons/Settings'

function NavbarComponent({ headline }: { headline: string }) {
  return (
    <div className="navbar bg-base-100" data-theme="dark">
      <div className="navbar-start">
        <HomeButton />
        <MenuButton />
      </div>
      <div className="navbar-center lg-flex">
        {headline}
      </div>
      <div className="navbar-end"><SettingsButton /></div>
    </div>
  )
}

export default NavbarComponent
