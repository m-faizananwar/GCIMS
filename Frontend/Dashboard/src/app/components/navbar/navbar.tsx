import Link from 'next/link'
import React from 'react'
import NavbarButton from './navbar_button'
import { FaHome, FaSignInAlt } from 'react-icons/fa'
import { RiDashboardHorizontalFill } from 'react-icons/ri'

const Navbar = () => {
    return (
        <div className="flex gap-2 w-full bg-[#1C0F13] justify-between px-2 shadow-md">
            <div className='flex gap-2'>
                <NavbarButton link='/' icon={<FaHome size={20} color='white'/>}>Home</NavbarButton>
                <NavbarButton link='/dashboard'icon={<RiDashboardHorizontalFill size={20} color='white'/>}>Dashboard</NavbarButton>
            </div>
            <div className="flex gap-2">
                <NavbarButton link='/login'icon={<FaSignInAlt size={20} color='white'/>}>Login</NavbarButton>
            </div>
        </div>
    )
}

export default Navbar