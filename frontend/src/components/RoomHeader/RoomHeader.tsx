import React, { useContext } from 'react'
import "./roomheader.css"
import logo from '../../images/logo.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import { BookmarkCheck, Menu, MessageCircle, User } from 'lucide-react'
import { showToast } from '../Toast/Toast'
import { GlobalContext } from '../../context/SocketContext/global/globalstate/GlobalState'

type ComponentState = "Join_User" | "Chat_State" | "Active_Chat"


interface RoomHeaderProps {
  handlState : (state:ComponentState) => void
}

const RoomHeader:React.FC<RoomHeaderProps> = ({handlState}) => {
  const navigate = useNavigate();
  const {spaceId} = useParams();
  const {joinMembers} = useContext(GlobalContext)
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
        <div style={{
          width : "100%",
          display : "flex",
          justifyContent : "flex-end"
        }}>
            <Link to={"/"}><img src={logo} alt="" width={"180px"}/></Link>
        </div>
        <div className='back_ele'>
            <button className='copy_link_btn' onClick={() => {navigate(`/space/${spaceId}/tasks`)}}><BookmarkCheck /></button>
            <button className='copy_link_btn' onClick={() => handlState('Active_Chat')}><MessageCircle /></button>
            <button className='copy_link_btn' onClick={() => handlState('Join_User')}><p className='smalles_state'>{joinMembers}</p><User/></button>
            <DropdownMenu label={<Menu/>} items={dropdownItems}/>
        </div>
    </div>
  )
}

export default RoomHeader