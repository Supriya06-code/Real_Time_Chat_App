import React from 'react'
import userConversation from '../../Zustans/useConversation';
import { useAuth } from '../../context/AuthContext';
import{TiMessages} from "react-icons/ti";
import { IoArrowBackSharp } from 'react-icons/io5';
const MessageContainer = () => {
  const {message, selectedConversation, setSelectedConversation} = userConversation();
  const {authUser} = useAuth();
  return (
    <div className='md:min-w-[500px] h-full flex-col py-2'>
  {selectedConversation === null ? (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center text-2xl text-gray-950 font-semibold flex flex-col items-center gap-2'>
<p className='text-2xl'>Welcome!!👋{authUser.username}😊</p>
<p className="text-lg">Select a chat to start messaging 💬</p>
<TiMessages className='text-6xl text-center'/>
        </div>
      </div>
      
  ):(<>
  <div className='flex justify-between gap-1 bg-sky-600 md:px-2 rounded-lg h-10 md:h-12'>
    <div className='flex gap-2 md:justify-between items-center w-full'>
      <div className='md:hidden ml-1 self-center'>
        <button onClick={()=>{""}} className='bg-white rounded-full px-2 py-1 self-center'>
       <IoArrowBackSharp size={25}/>   
        </button>
      </div>
    </div>
  </div>
  </>)}
    </div>
  )
}

export default MessageContainer
