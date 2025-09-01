import SunIcon from '@/app/components/icons/Sun'
import React from 'react'

const ThemeSwapButton = () => {
  return (
    <div>
      <label className="swap swap-rotate"><input type="checkbox" className="theme-controller" value="dark" />
        {/* sun icon */}
        <SunIcon />

        {/* moon icon */}

      </label>
    </div>
  )
}

export default ThemeSwapButton
