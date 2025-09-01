import React from 'react'
import NavbarComponentLoginPage from '../components/LoginNavbar'
import LoginComponent from '../components/LoginComponents'

const LoginPage = () => {
  return (
    <div>
      <div>
        <NavbarComponentLoginPage headline={"Login"}/>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-5">
          <div></div>
          <div></div>
          <div>
            <LoginComponent/>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
