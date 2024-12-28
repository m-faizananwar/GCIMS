import React from 'react'
import SidebarButton from './sidebar_button'
import { FaChartPie, FaSearch } from 'react-icons/fa'

const DashboardSidebar = () => {
    return (
        <div className="bg-gradient-to-b from-[#1C0F13] to-[#372127] text-white flex flex-col gap-2 w-full h-full p-5 shadow-md rounded-tr-3xl overflow-y-auto">
            <div className="text-6xl mx-auto mt-2 mb-10 font-bold">GCIMS</div>
            <SidebarButton link={'/dashboard/'} icon={<FaChartPie size={20} color='white' />}>Overview</SidebarButton>
            <SidebarButton link={'/dashboard/search'} icon={<FaSearch size={20} color='white' />}>Search</SidebarButton>
        </div>
    )
}

export default DashboardSidebar