import { Link, useRouterState } from '@tanstack/react-router'
import React from 'react'
import type { IconType } from 'react-icons'
import { RxDashboard } from 'react-icons/rx'

const Buttons = ({ name, to ,icon: Icon}: { name: string,  to: string ,icon:IconType}) => {
  const location = useRouterState({select(state) {
    return state.location
  },})
  const isSelected = location.pathname == to
  return (
    <Link to={to} className={`flex items-center justify-between w-full ${isSelected && "bg-blue-400/15"}  p-3 rounded-xl cursor-pointer`}>
      <div className="flex items-center gap-2">
        <Icon className={`${isSelected ? "text-blue-600":" text-neutral-800"} font-semibold`} />
        <h3 className={`${isSelected ? "text-blue-600":" text-neutral-800"} font-semibold`}>{name}</h3>
      </div>
      {/* <IoChevronDownOutline  className="text-blue-800 font-semibold"/> */}
    </Link >
  )
}

export default Buttons