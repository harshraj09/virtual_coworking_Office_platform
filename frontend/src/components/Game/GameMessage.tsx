'use client'

import { useState, useEffect } from 'react'
import './GameMessage.css'

interface GamingToastCardProps {
  isVisible: boolean
  message: string
  onClose?: () => void
}

export function GameMessage({ isVisible, message, onClose }: GamingToastCardProps) {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsShown(true)
    } else {
      const timer = setTimeout(() => setIsShown(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  if (!isShown) return null

  return (
    <div className={`gaming-toast ${isVisible ? 'visible' : ''}`}>
      <div className="gaming-toast-content">
        <p>{message}</p>
        <button onClick={onClose} className="gaming-toast-close">×</button>
      </div>
    </div>
  )
}

