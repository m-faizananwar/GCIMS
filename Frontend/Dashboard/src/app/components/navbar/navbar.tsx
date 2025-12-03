'use client'
import React from 'react'
import NavButton from '../general/nav_button'
import { FaHome, FaSignInAlt } from 'react-icons/fa'
import { RiDashboardHorizontalFill } from 'react-icons/ri'

const Navbar = () => {
    const handleDeleteCookie = () => { 
        document.cookie = 'user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'; 
    }

    const publicSiteUrl = process.env.NEXT_PUBLIC_PUBLIC_SITE_URL || 'http://localhost:5173';

    return (
        <div className="flex gap-2 w-full bg-[#000d6b] justify-between px-2 shadow-md">
            <div className='flex gap-2'>
                <NavButton link={publicSiteUrl} icon={<FaHome className="hover:text-secondary" size={20} />}>Homepage</NavButton>
                <NavButton link='/dashboard' icon={<RiDashboardHorizontalFill className="hover:text-secondary" size={20} />}>Dashboard</NavButton>
            </div>
            <div className="flex gap-2">
                <NavButton link='/login' onClick={handleDeleteCookie} icon={<FaSignInAlt className="hover:text-secondary" size={20} />}>Log Out</NavButton>
            </div>
        </div>
    )
}

export default Navbar