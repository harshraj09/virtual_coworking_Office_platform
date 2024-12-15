import React from 'react'
import Box from '../assets/Box/Box'
import Text from '../assets/Font/Text'
import './style.css'
import Button from '../assets/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import {  LogOut } from 'lucide-react'
import logo from "../../images/logo.png"
// import APIService from '../../service/APIService.ts/APIService'

interface IProps {
    name: string,
    searchSpace? : (spaceData : string) => void;
    email : string
}

const DashHeader: React.FC<IProps> = ({ name, email }) => {
    const navigate = useNavigate();
    // const user = APIService.getItem("user");
    // const userId = user._id;
    console.log({name});

    const handelCreateSpaceClick = () => {
        navigate("/space-config")
    }
    
    const handelLogOut = () => {
        localStorage.clear();
        navigate("/login");
    }

    const dropDownItem = [
        {
            label : "Log Out",
            onClick : handelLogOut
        }
    ]


    return (
        <>
            <Box width='100%' height='80px' className='dash-header'>
                <Link to={"/"}><img width={"150px"} src={logo} /></Link>
                {/* <Box width='30%' height='100%' className='search-box'>
                    <TextInput placeholder='Search' onChange={() => { }} name='search' value='' type='text' width='100%' height='50px' />
                    <Button onClick={() => { }} height='50px'><FontAwesomeIcon icon={faMagnifyingGlass}/></Button>
                </Box> */}
                <Box width='20%' height='100%' className='profile-box'>
                    <div>
                        <p>{name}</p>
                        <p>{email}</p>
                    </div>
                    <Text variant='subheading' className='profile-label'><LogOut onClick={handelLogOut}/></Text>
                    <Button variant='secondary' onClick={handelCreateSpaceClick} height='50px'>Create Space</Button>
                </Box>
            </Box>
            <hr className='ruler' />
        </>
    )
}

export default DashHeader