import Link from 'next/link';
import React, { ReactNode } from 'react'

interface NavbarButtonProps {
    children: ReactNode;
    link: string;
    icon?: ReactNode;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({ children, link, icon }) => {
    return (
        <Link href={link}>
            <div
                className="transition-all text-white my-2 px-4 py-2 text-center rounded-full bg-white bg-opacity-0 
                    outline-white hover:outline hover:bg-opacity-20 flex gap-2"
            >
                {icon && icon}
                {children}
            </div>
        </Link>
    )
}

export default NavbarButton