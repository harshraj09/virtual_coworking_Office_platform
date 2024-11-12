import React, { useEffect, useState } from 'react'
import Box from '../../components/assets/Box/Box'
import './Signup.css'
import Text from '../../components/assets/Font/Text'
import TextInput from '../../components/assets/TextInput/TextInput'
import Button from '../../components/assets/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import { apiContext, setAuthHeader } from '../../utils/apiContext'
import { showToast } from '../../components/Toast/Toast'
import Loading from '../../components/Loading/Loading'

interface IFormData {
    email: string;
    password: string;
}

const Login:React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<IFormData>({
        email: "",
        password: ""
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async () => {
        setLoading(true);
        const response = await apiContext.post("/api/login", formData);
        if(response.status === 200){
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setAuthHeader(response.data.token);
            showToast(response.data.message, 'success', 3000);
            navigate('/');
        }else{
            showToast(response.data.message, 'error', 3000);
        }
        setLoading(false);
    }

    useEffect(() => {
        window.addEventListener("keydown", (e:KeyboardEvent)=>{
            if(e.key === "Enter"){
                handleSubmit();
            }

            return () => {
                window.removeEventListener("keydown", (e:KeyboardEvent)=>{
                    if(e.key === "Enter"){
                        handleSubmit();
                    }
                });
            }
        })
    }, []);
    
  return (
    <>  
        {loading && <Loading />}
        <Box className="signup-container" width='100vw' height='100vh'>
            <Box width='500px' height='500px' className='box'>
                <Box width='100%' height='100px' className='box-inner'>
                    <Text variant="heading">Welcome Back</Text>
                    <Text variant="body">sign in to continue</Text>
                </Box>
                <Box width='100%' height='300px' className='input-container'>
                    <TextInput placeholder='john@doe.com' onChange={handleChange} name='email' value={formData.email} type='email' width='100%' height='60px'/>
                    <TextInput placeholder='********' onChange={handleChange} name='password' value={formData.password} type='password' width='100%' height='60px'/>
                    <Button onClick={handleSubmit} variant='secondary'>{"Let's Go ->"}</Button>
                </Box>
                <Box width='100%' height='100px' className='already-have-account'>
                    <Text variant='body'>Don't have an account? <Link to="/signup"><Text variant='body'>Sign Up</Text></Link></Text>
                </Box>
            </Box>
        </Box>
    </>
  )
}

export default Login