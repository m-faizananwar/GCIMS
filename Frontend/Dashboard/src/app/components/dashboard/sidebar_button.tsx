import Link from 'next/link';
import React, { ReactNode } from 'react'

interface SidebarButtonProps {
    children: ReactNode;
    link: string;
    icon?: ReactNode;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ children, link, icon }) => {
    return (
        <Link href={link}>
            <div
                className="flex gap-2 transition-all my-2 px-4 py-2 text-center rounded-full bg-white bg-opacity-0 
                    outline-white hover:outline hover:bg-opacity-20"
            >
                {icon && icon}
                {children}
            </div>
        </Link>
    )
}

export default SidebarButton