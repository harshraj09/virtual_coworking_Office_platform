import React from 'react'
import './inputstyle.css'

interface TextInputProps {
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    name: string;
    value: string;
    type: string;
    width?: string;
    height?: string;
}

const TextInput:React.FC<TextInputProps> = ({placeholder, onChange, name, value="", type, width, height}) => {
  return (
    <input type={type} className='input' placeholder={placeholder} onChange={onChange} name={name} value={value} style={{width: width, height: height}} />
  )
}

export default TextInput