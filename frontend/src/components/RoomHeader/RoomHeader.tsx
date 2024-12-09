import React from 'react'
import "./roomheader.css"
import logo from '../../images/logo.png'

const RoomHeader:React.FC = () => {
  return (
    <div className='space_header'>
        <div>
            <button className='copy_link_btn'><i className="fa-solid fa-link"></i></button>
        </div>
        <div>
            <img src={logo} alt="" width={"180px"}/>
        </div>
        <div>
            <p>option</p>
        </div>
    </div>
  )
}

export default RoomHeader