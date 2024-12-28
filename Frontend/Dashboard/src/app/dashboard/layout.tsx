import React, { FC, ReactNode } from 'react'
import DashboardSidebar from '../components/dashboard/sidebar'

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout : React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex w-full h-full overflow-y-hidden mt-2">
        <div className="basis-1/5">
          <DashboardSidebar />
        </div>
        <div className="w-full shadow-md ml-2 bg-white rounded-tl-3xl">{children}</div>
      </div>
  )
}

export default DashboardLayout