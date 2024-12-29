import React, { ChangeEventHandler, ReactNode } from 'react'

interface TextInputProps {
    children?: ReactNode;
    addtionalClass?: string;
    name?: string;
    type?: string;
    defaultValue?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

const TextInput: React.FC<TextInputProps> = ({ children, addtionalClass, name, type, defaultValue, placeholder, value, disabled, onChange }) => {
  return (
    <input 
        className={addtionalClass + ' h-12  outline rounded-md px-4 outline-slate-200 outline-1 disabled:bg-slate-100 disabled:text-gray-800 [&:not(:disabled)]:hover:outline-slate-400 focus:outline-tertiary focus:outline-2 [&:not(:disabled)]:hover:cursor-text w-full disabled:hover:cursor-not-allowed'}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
    >{children}</input>
  )
}

export default TextInput