import React from 'react'

// {auth}
interface InputProps {
    id: string;
    onChange: any;
    value: string;
    label: string;
    type?: string;
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
    return (
        <div className='relative flex justify-between'>
            <label htmlFor={id}>
                {label}
            </label>
            <input
                onChange={onChange}
                type={type}
                value={value}
                id={id}
                className='border-2'
            />
        </div>
    )
}

export default Input
