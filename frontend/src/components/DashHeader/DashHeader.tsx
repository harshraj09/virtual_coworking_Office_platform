import React from 'react'
import Box from '../assets/Box/Box'
import Text from '../assets/Font/Text'
import './style.css'
import TextInput from '../assets/TextInput/TextInput'
import Button from '../assets/Button/Button'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// import APIService from '../../service/APIService.ts/APIService'

interface IProps {
    name: string,
    searchSpace? : (spaceData : string) => void;
}

const DashHeader: React.FC<IProps> = ({ name }) => {
    const navigate = useNavigate();
    // const user = APIService.getItem("user");
    // const userId = user._id;

    const handelCreateSpaceClick = () => {
        navigate("/space-config")
    }

    return (
        <>
            <Box width='100%' height='80px' className='dash-header'>
                <Text style={{ color: '#E74C3C' }} variant='heading' className='pointer'>MR</Text>
                <Box width='30%' height='100%' className='search-box'>
                    <TextInput placeholder='Search' onChange={() => { }} name='search' value='' type='text' width='100%' height='50px' />
                    <Button onClick={() => { }} height='50px'><FontAwesomeIcon icon={faMagnifyingGlass}/></Button>
                </Box>
                <Box width='20%' height='100%' className='profile-box'>
                    <Text variant='subheading' className='profile-label'>{name}</Text>
                    <Button variant='secondary' onClick={handelCreateSpaceClick} height='50px'>Create Space</Button>
                </Box>
            </Box>
            <hr className='ruler' />
        </>
    )
}

export default DashHeader