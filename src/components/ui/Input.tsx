import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type InputProps = {
    title: string;
    placeholder: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    type?: string;
    name?: string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    value?: string
    required?: boolean
}

function Input({
    title,
    placeholder,
    icon,
    type = 'text',
    disabled = false,
    value,
    name,
    required = true,
    onChange
}: InputProps) {

    const [inputType, setInputType] = useState(type);

    return (
        <div className='flex flex-col gap-1 w-full'>
            <label className='text-sm sm:text-base font-medium text-gray-700 mb-1.5'>
                {title} {required && <span className="text-red-500">*</span>}
            </label>
            <div className='relative'>
                <input 
                    required={required} 
                    disabled={disabled} 
                    value={value} 
                    type={type === 'password' ? inputType : type}
                    name={name}
                    className='w-full px-4 py-2.5 sm:py-3 pl-11 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-blue-500 focus:border-transparent transition-all text-sm sm:text-base bg-white disabled:opacity-50 disabled:cursor-not-allowed' 
                    placeholder={placeholder} 
                    onChange={onChange}
                    autoComplete={type === 'password' ? 'current-password' : 'off'}
                />
                {icon && (
                    <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-2xl pointer-events-none'>
                        {icon}
                    </span>
                )}
                {type === 'password' && (
                    <span 
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-lg sm:text-xl cursor-pointer hover:text-dark-blue-600 transition-colors p-1' 
                        onClick={() => setInputType(inputType === 'text' ? 'password' : 'text')}
                        aria-label={inputType === 'password' ? 'Show password' : 'Hide password'}
                    >
                        {inputType === 'password' ? <FaEye /> : <FaEyeSlash />}
                    </span>
                )}
            </div>
        </div>
    )
}

export default Input