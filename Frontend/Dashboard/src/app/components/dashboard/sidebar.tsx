import React from 'react'
import { FaChartPie, FaSearch } from 'react-icons/fa'
import NavButton from '../general/nav_button'

const DashboardSidebar = () => {
    return (
        <div className="bg-[#000d6b] text-white flex flex-col gap-2 w-full h-full p-5 shadow-md rounded-tr-lg overflow-y-auto">
            <div className="text-6xl mx-auto mt-2 mb-10 font-bold">GCIMS</div>
            <NavButton link={'/dashboard'} icon={<FaChartPie className="hover:text-secondary" size={20} />}>Overview</NavButton>
            {/* <SidebarButton link={'/dashboard/search'} icon={<FaSearch size={20} color='white' />}>Search</SidebarButton> */}
        </div>
    )
}

export default DashboardSidebar