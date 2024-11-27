import React, { useCallback, useEffect, useState } from 'react'
import DashHeader from '../../components/DashHeader/DashHeader'
import "./style.css"
import Loading from '../../components/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import Box from '../../components/assets/Box/Box';
import Text from '../../components/assets/Font/Text';
import APIService from '../../service/APIService.ts/APIService';

interface IspaceData {
    spaceName: string,
    _id: string
}


const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData as string);
    const [spaces, setSpaces] = useState<IspaceData[]>([]);
    const navigate = useNavigate();

    const handelApiCall = useCallback(async () => {
        setLoading(true);
        const token = APIService.getItem("token");
        try {
            const response = await APIService.axiosInstance.get("/api/dashboard", {
                headers : {
                    Authorization : `Bearear ${token}`
                }
            })
            if (response.data.success) {
                setLoading(true);
            } else {
                navigate("/login");
            }
        } catch (error) {
            navigate("/login");
        }
        setLoading(false);
    }, [])
    
    const showSpaces = useCallback(async () => {
        setLoading(true);
        const token = APIService.getItem("token");
        try {
            const response = await APIService.axiosInstance.get("/api/show-spaces", {
                headers : {
                    Authorization : `Bearear ${token}`
                }
            })
            if (response.data.success) {
                setSpaces(response.data.data);
            } else {
                navigate('/login');
            }
        } catch (error) {
            navigate("/login");
        }
        setLoading(false);
    }, [])

    useEffect(() => {
        handelApiCall();
        showSpaces();
    }, [handelApiCall, showSpaces]);


    return (
        <div className='dashboard'>
            {
                loading ? <Loading /> :
                    <>
                        <DashHeader name={user?.name} />
                        <Box className='show-space' width='100%' height='fit-content'>
                            {
                                spaces.map((ele) => (
                                    <Link to={`/space/${ele._id}`} style={{ textDecoration: "none" }} key={ele._id}>
                                        <Box className='box space-text' width='300px' height='200px' >
                                            <Text variant='heading'>{ele?.spaceName}</Text>
                                        </Box>
                                        <div />
                                    </Link>
                                ))
                            }
                        </Box>
                    </>
            }
        </div>
    )
}

export default Dashboard