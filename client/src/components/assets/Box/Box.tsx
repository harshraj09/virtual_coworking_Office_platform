import React from 'react'
import './box.css'

interface BoxProps {
    children: React.ReactNode;
    width?: string;
    height?: string;
    style?: React.CSSProperties;
    className?: "box" | string;
}

const Box:React.FC<BoxProps> = ({children, width=0, height=0, className='', style}) => {
  return (
    <div className={className} style={{width: width, height: height, ...style}}>{children}</div>
  )
}

export default Box