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
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

const TextInput: React.FC<TextInputProps> = ({ children, addtionalClass, name, type, defaultValue, placeholder, value, disabled, required, onChange }) => {
  return (
    <div className='relative w-full'>
      <input
        className={addtionalClass + ' peer h-12  outline rounded-md px-4 outline-slate-200 outline-1 disabled:bg-slate-100 disabled:text-gray-800 [&:not(:disabled)]:hover:outline-slate-400 focus:outline-tertiary focus:outline-2 [&:not(:disabled)]:hover:cursor-text w-full disabled:hover:cursor-not-allowed'}
        name={name}
        type={type}
        defaultValue={defaultValue}
        id={`input${placeholder}`}
        placeholder=''
        onChange={onChange}
        value={value}
        disabled={disabled}
        required={required}
      >{children}</input>
      <label
        htmlFor={`input${placeholder}`}
        className='absolute left-2 -top-5 text-gray-600 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-tertiary'
      >
        {placeholder}
      </label>
    </div>
  )
}

export default TextInput