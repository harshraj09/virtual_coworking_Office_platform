import React from 'react'
import './text.css'

interface TextProps {
    children: React.ReactNode;
    size?: string;
    weight?: string;
    color?: string;
    variant?: "heading" | "subheading" | "body";
    style?: React.CSSProperties;
    className? : string
}

const Text: React.FC<TextProps> = ({ children, variant = 'heading', style, className=""}) => {
    return (
        <>
            <p
                className={`${variant} ${className}`} style={style}>{children}
            </p>
        </>

    )
}

export default Text