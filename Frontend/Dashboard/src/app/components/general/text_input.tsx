import React, { ChangeEventHandler, ReactNode } from 'react'

interface TextInputProps {
    children?: ReactNode;
    addtionalClass?: string;
    name?: string;
    type?: string;
    defaultValue?: string;
    placeholder?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

const TextInput: React.FC<TextInputProps> = ({ children, addtionalClass, name, type, defaultValue, placeholder, value, onChange }) => {
  return (
    <input 
        className={addtionalClass + ' h-12  outline rounded-md px-4 outline-slate-200 outline-1 hover:outline-slate-400 focus:outline-tertiary focus:outline-2 hover:cursor-text w-full'}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
    >{children}</input>
  )
}

export default TextInput