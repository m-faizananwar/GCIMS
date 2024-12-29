import Link from 'next/link'
import React from 'react'
import NavButton from '../general/nav_button'
import { FaHome, FaSignInAlt } from 'react-icons/fa'
import { RiDashboardHorizontalFill } from 'react-icons/ri'

const Navbar = () => {
    return (
        <div className="flex gap-2 w-full bg-[#000d6b] justify-between px-2 shadow-md">
            <div className='flex gap-2'>
                <NavButton link='http://localhost:5173' icon={<FaHome className="hover:text-secondary" size={20} />}>Home</NavButton>
                <NavButton link='/dashboard' icon={<RiDashboardHorizontalFill className="hover:text-secondary" size={20} />}>Dashboard</NavButton>
            </div>
            <div className="flex gap-2">
                <NavButton link='/login' icon={<FaSignInAlt className="hover:text-secondary" size={20} />}>Login</NavButton>
            </div>
        </div>
    )
}

export default Navbar