import React from 'react'

interface CustomButtonProps {
    type?: "submit" | "reset" | "button"
    additionalClass?: string
    children?: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({type, additionalClass, children, onClick, disabled }) => {
    return (
        <button 
        type={type} 
        className={additionalClass + " font-bold h-12 flex justify-center items-center rounded-md text-center gap-3 hover:bg-opacity-80 hover:cursor-pointer transition-all"}
        onClick={onClick}
        disabled={disabled}
        >
            {children}
        </button>
    )
}

export default CustomButton