import React from 'react'
import{FaSearch} from 'react-icons/fa'
import axios from 'axios'
import { useState } from 'react'
import {toast} from 'react-toastify'
import{useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
const Sidebar = () => {
  const navigate = useNavigate();
  const {authUser} = useAuth();
  
  const [searchInput, setSearchInput] = useState('')
  const[searchUser, setSearchUser] =useState([])
  const[loading, setLoading] =useState(false)
  const handleSearchSubmit=async(e)=>{
e.preventDefault();
setLoading(true)
try{
const search = await axios.get(`/api/user/search?search=${searchInput}`);
const data=search.data;
if(data.success===false){
  setLoading(false)
  console.log(data.message)
}
setLoading(false)
if(data.loading === 0){
  toast.info("User Not Found")
}else{
  setSearchUser(data)
}
}catch(error){
setLoading(false)
console.log(error);
}
  }
  console.log(searchUser);
  console.log("authUser:", authUser);
  console.log("Profile Picture URL:", authUser?.profilepic);

  return (
    <div className='h-full w-auto px-1'>
      <div className='flex justify-between gap-2'>
        <form onSubmit={handleSearchSubmit}className='w-auto flex items-center justify-between bg-white rounded-full'>
            <input value={searchInput}
            onChange={(e)=>setSearchInput(e.target.value)} type="text" className='px-4 w-auto bg-transparent outline-none rouned-full' placeholder='search user'/>
           
    <button className='btn btn-circle bg-sky-700 hover:bg-gray-950'>
    <FaSearch />
    </button>
    
        </form>
        <img onClick={()=>navigate(`/profile/${authUser._id}`)}src={authUser?.profilepic}
    className='self-center h-12 w-12 hover:scale-110 cursor-pointer'/>
    

      </div>
      <div className='divider px-3'></div>
    </div>
  )
}

export default Sidebar
