import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard:React.FC = () => {
  return (
    <div>
      <button><Link to="/login">Login</Link></button>
    </div>
  )
}

export default Dashboard