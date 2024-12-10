
import React from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
import Dashboard from './Pages/Dashboard/Dashboard'
import SpaceConfig from './Pages/SpaceConfig/SpaceConfig'
import VirtualSpace from './Pages/VirtualSpace/JoinPage'
import { SocketProvider } from './context/SocketContext/SocketContext'
import Room from './Pages/VirtualSpace/Room'
import LandingPage from './Pages/Home/page'
import FeaturePage from './Pages/Home/features/page'
import AboutPage from './Pages/Home/components/AboutUs'

const App: React.FC = () => {

  return (
    <>
    <div>
        <Router future={{ v7_startTransition: true }}>
          <SocketProvider>
            <Routes>
              <Route path='/features' element={<FeaturePage/>}/>
              <Route path='/about' element={<AboutPage/>}/>
              <Route path='/' element={<LandingPage/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/space-config" element={<SpaceConfig />} />
              <Route path="/space/:spaceId" element={<VirtualSpace />} />
              <Route path="/space/:spaceId/room" element={<Room />} />
            </Routes>
          </SocketProvider>
        </Router>
    </div>
    </>
  )
}

export default App