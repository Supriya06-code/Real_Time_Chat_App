import React from 'react'
import { useAuth } from '../context/AuthContext';
const Home = () => {
    const {authUser} = useAuth();
    
  return (
    <div className='text-3xl'>
      hiii {authUser?.username}
    </div>
  )
}

export default Home
