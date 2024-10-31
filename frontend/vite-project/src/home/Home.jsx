import React from 'react'
import { useAuth } from '../context/AuthContext';
import Sidebar from './components/Sidebar';
import MessageContainer from './components/MessageContainer';
const Home = () => {
    const {authUser} = useAuth();
    
  return (
    <div className="flex flex-col items-center justify-center max-w-full mx-auto">
      <div className="w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50">

        <div>
<Sidebar/>
        </div>
        <div>
<MessageContainer/>
        </div>
      </div>
    </div>
  )
}

export default Home
