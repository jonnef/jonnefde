import React from 'react'

const LoginComponent = () => {
  return (
    <div>
      <fieldset className="fieldset w-xs bg-gray-300 border border-base-300 p-4 rounded-box">
        <label className="fieldset-label">Email</label>
        <input type="email" className="input" placeholder="Email" />
        <label className="fieldset-label">Password</label>
        <input type="password" className="input" placeholder="Password" />
        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </div>
  )
}

export default LoginComponent
