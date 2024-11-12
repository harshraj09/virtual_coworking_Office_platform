import React from 'react'
import Box from '../components/assets/Box/Box'
import Text from '../components/assets/Font/Text'

const Login:React.FC = () => {
  return (
    <Box className="box" width="100%" height="100vh">
      <Text variant='heading'>Login</Text>
      <Text variant='subheading'>Welcome back to our platform</Text>
    </Box>
  )
}

export default Login