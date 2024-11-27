import React from 'react'
import "./loading.css"

const Loading: React.FC = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#2C3E50",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "40px",
        color: "white",
      }}
    >
      <div className="loader">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
        <div className="bar7"></div>
        <div className="bar8"></div>
        <div className="bar9"></div>
        <div className="bar10"></div>
        <div className="bar11"></div>
        <div className="bar12"></div>
      </div>
    </div>
  )
}

export default Loading