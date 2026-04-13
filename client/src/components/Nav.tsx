import React from 'react'
import { GiBrassEye } from 'react-icons/gi'

const Nav = () => {
  return (
   <nav className="h-10 pt-4 flex items-center px-10 gap-1 "><GiBrassEye className='text-2xl text-blue-700'/><h1 className="font-normal text-xl">TraceFlow</h1></nav>
  )
}

export default Nav