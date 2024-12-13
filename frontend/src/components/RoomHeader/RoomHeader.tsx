import React, { useState } from 'react'
import "./roomheader.css"
import logo from '../../images/logo.png'
import { useNavigate, useParams } from 'react-router-dom'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import { Droplet, Menu, MenuIcon } from 'lucide-react'
import { showToast } from '../Toast/Toast'

const RoomHeader:React.FC = () => {
  const navigate = useNavigate();
  const {spaceId} = useParams();
  
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
  
  const copyUrl = () => {
    const url = `http://localhost:5173/space/${spaceId}`;

    try{
      navigator.clipboard.writeText(url);
      showToast("Copy Space Url To clipboard", "success", 3000);
    }catch(err){
      showToast((err as Error).message, "error", 3000);
    }
  }
  
  return (
    <div className='space_header'>
        <div>
            <button className='copy_link_btn' onClick={copyUrl}><i className="fa-solid fa-link"></i></button>
        </div>
        <div>
            <img src={logo} alt="" width={"180px"}/>
        </div>
        <div>
            <DropdownMenu label={<Menu/>} items={dropdownItems}/>
        </div>
    </div>
  )
}

export default RoomHeader