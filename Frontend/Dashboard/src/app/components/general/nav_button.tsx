'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react'

interface NavButtonProps {
    children: ReactNode;
    link: string;
    icon?: ReactNode;
    onClick?: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ children, link, icon, onClick }) => {
    const path = usePathname()
    const myClass = `transition-all text-white my-2 px-4 py-2 text-center rounded-md bg-white bg-opacity-0 outline-secondary hover:text-secondary flex gap-2 ${path === link && 'text-secondary'}`
    return (
        <Link onClick={onClick} href={link}>
            <div
                className={myClass}
            >
                {icon && icon}
                {children}
            </div>
        </Link>
    )
}

export default NavButton