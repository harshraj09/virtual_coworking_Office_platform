import React from 'react'
import './button1.css'

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
    width?: string;
    height?: string;
    style?: React.CSSProperties;
}

const Button:React.FC<ButtonProps> = ({ children, variant='primary', onClick, width='fit-content', height='40px', style }) => {
  return (
    <button
    onClick={onClick}
    className={variant}
    style={{width: width, height: height, ...style}}
    >{children}</button>
  )
}

export default Button