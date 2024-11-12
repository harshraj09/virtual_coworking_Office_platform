
import React from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
import Dashboard from './Pages/Dashboard/Dashboard'


const App: React.FC = () => {

  return (
    <>
      <Router future={{v7_startTransition: true}}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App