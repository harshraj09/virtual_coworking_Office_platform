import React from 'react'
import "./roomheader.css"
import logo from '../../images/logo.png'
import { useNavigate } from 'react-router-dom'
import DropdownMenu from '../DropdownMenu/DropdownMenu'

const RoomHeader:React.FC = () => {
  const navigate = useNavigate();
  
  const dropdownItems = [
    {
      label: 'Leave Space',
      onClick: () => navigate("/dashboard")
    },
    {
      label: 'Home',
      onClick: () => navigate("/")
    },
    {
      label: 'Logout',
      onClick:  () => {
        localStorage.clear();
        window.location.href = "/"
      }
    }
  ]; 
  
  
  return (
    <div className='space_header'>
        <div>
            <button className='copy_link_btn'><i className="fa-solid fa-link"></i></button>
        </div>
        <div>
            <img src={logo} alt="" width={"180px"}/>
        </div>
        <div>
            <DropdownMenu items={dropdownItems}/>
        </div>
    </div>
  )
}

export default RoomHeader