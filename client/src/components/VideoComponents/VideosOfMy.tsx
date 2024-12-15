'use client'
import "./VideoOfMy.css";
import React, { useRef, useEffect, useCallback, useMemo } from 'react'

interface MultipleVideoCardsProps {
  stream: MediaStream
  numberOfInstances: number
}

const MultipleVideoCards: React.FC<MultipleVideoCardsProps> = ({ stream, numberOfInstances }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const setVideoRef = useCallback((index: number) => (el: HTMLVideoElement | null) => {
    videoRefs.current[index] = el
  }, [])

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, numberOfInstances)
  }, [numberOfInstances])

  useEffect(() => {
    videoRefs.current.forEach((videoRef) => {
      if (videoRef) {
        videoRef.srcObject = stream
      }
    })
  }, [stream])

  const videoElements = useMemo(() => {
    return Array(numberOfInstances).fill(null).map((_, index) => (
      <div key={index} className="video-card">
        <video
          ref={setVideoRef(index)}
          autoPlay
          playsInline
          muted
          className="video-element"
        />
      </div>
    ))
  }, [numberOfInstances, setVideoRef])

  return (
    <div className="video-container">
      {videoElements}
    </div>
  )
}

export default MultipleVideoCards

