import React from 'react'
import HomeButton from './buttons/Home'
import MenuButton from './buttons/Menu'
import SettingsButton from './buttons/Settings'

function NavbarComponentLoginPage({ headline }: { headline: string }) {
  return (
    <div className="navbar bg-base-100" data-theme="dark">
      <div className="navbar-start">

      </div>
      <div className="navbar-center lg-flex">
        {headline}
      </div>
      <div className="navbar-end"></div>
    </div>
  )
}

export default NavbarComponentLoginPage
