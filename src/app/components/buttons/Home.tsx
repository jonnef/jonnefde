import HomeIcon from '@/app/icons/Home';
import Link from 'next/link';
import React from 'react'

const HomeButton = () => {
  return (
    <div>
      <button className='btn btn-ghost'><Link href="/"><HomeIcon /></Link></button>
    </div>
  )
}

export default HomeButton
