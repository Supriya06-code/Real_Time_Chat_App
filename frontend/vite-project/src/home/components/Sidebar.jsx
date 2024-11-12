import React from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { BiLogOut } from 'react-icons/bi';
import { IoArrowBackSharp } from 'react-icons/io5'
import userConversation from '../../Zustans/useConversation';
import { useSocketContext } from "../../context/socketContext";
const Sidebar = ({ onSelectUser }) => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();
  const [newMessageUsers, setNewMessageUsers] = useState('');
  const [searchInput, setSearchInput] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatUser, setChatUser] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { messages, setMessage, selectedConversation, setSelectedConversation } = userConversation();
  const { onlineUser, socket } = useSocketContext();
  const nowOnline = chatUser.map((user) => (user._id));
  //chat function
  const isOnline = nowOnline.map(userId => onlineUser.includes(userId));

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setNewMessageUsers(newMessage)
    })
    return () => socket?.off("newMessage");
  }, [socket, messages])

  //Show user with you chatted
  useEffect(() => {
    const chatUserHandler = async () => {
      setLoading(true);
      try {
        const chatters = await axios.get(`/api/user/currentchatters`);
        const data = chatters.data;
        if (data.success === false) {
          setLoading(false);
          console.log(data.message);
        }
        setLoading(false);
        setChatUser(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    chatUserHandler();
  }, []);
  console.log(chatUser);
  //logout
  // const handleLogout=async()=>{

  //   const confirmlogout = window.prompt("type 'UserName' To LOGOUT");
  //   if(confirmlogout === authUser.username){
  //     setLoading(true)
  //     try{
  //     const logout = await axios.post('/api/auth/logout')
  //     const data = logout.data;
  //     if (data?.success === false) {
  //       setLoading(false);
  //       console.log(data?.message);
  //     }
  //     toast.info(data?.message)
  //     localStorage.removeItem('chatapp')
  //     setAuthUser(null)
  //     setLoading(false)
  //     navigate('/login')
  //     }catch(error){
  //       setLoading(false)
  //       console.log(error);
  //     }
  //   }else{
  //     toast.info("LogOut Cancelled")
  //   }

  // }
  const handleLogout = async () => {
    // Ensure authUser is defined before proceeding
    if (!authUser) {
      toast.info("You are not logged in.");
      return;
    }

    const confirmlogout = window.prompt("Type your username to LOGOUT");

    // Check if the user input matches the authUser's username
    if (confirmlogout === authUser.username) {
      setLoading(true);
      try {
        const logout = await axios.post('/api/auth/logout');
        const data = logout.data;

        if (data?.success === false) {
          setLoading(false);
          console.log(data?.message);
        } else {
          toast.info(data?.message);
          localStorage.removeItem('chatapp');
          setAuthUser(null);
          setLoading(false);
          navigate('/login');
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      toast.info("LogOut Cancelled");
    }
  };

  //back from search result
  const handleSearchback = () => {
    setSearchUser([]);
    setSearchInput('')
  }
  //Show user from the search result
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const search = await axios.get(`/api/user/search?search=${searchInput}`);
      const data = search.data;
      if (data.success === false) {
        setLoading(false);
        console.log(data.message);
      }
      setLoading(false);
      if (data.length === 0) {
        toast.info("User Not Found");
      } else {
        setSearchUser(data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  //show which user is selected
  const handleUserClick = (user) => {
    onSelectUser(user);
    setSelectedConversation(user)
    setSelectedUserId(user._id);
    setNewMessageUsers('')
  };
  console.log(searchUser);
  return (
    <div className="h-full w-auto px-1">
      <div className="flex justify-between gap-2">
        <form
          onSubmit={handleSearchSubmit}
          className="w-auto flex items-center justify-between bg-white rounded-full"
        >
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            className="px-4 w-auto bg-transparent outline-none rouned-full"
            placeholder="search user"
          />

          <button className="btn btn-circle bg-sky-700 hover:bg-gray-950">
            <FaSearch />
          </button>
        </form>
        <img
          onClick={() => navigate(`/profile/${authUser._id}`)}
          src={authUser?.profilepic}
          className="self-center h-12 w-12 hover:scale-110 cursor-pointer"
        />
      </div>
      <div className="divider px-3"></div>
      {searchUser?.length > 0 ? (
        <>
          <div className="min-h-[70%] max-h-[80%] m overrflow-y-auto scrollbar">
            <div className="w-auto">
              {searchUser.map((user, index) => (
                <div key={user._id}>
                  <div
                    onClick={() => handleUserClick(user)}
                    className={`flex gap-3 items-center rounded p-2 py-1 cursor-pointer ${selectedUserId === user?._id ? "bg-sky-500" : ""
                      }`}
                  >
                    <div className={`avatar ${isOnline[index] ? 'online' : ''}`}>
                      <div className="w-12 rounded-full">
                        <img src={user.profilepic} alt="user.img" />
                      </div>
                    </div>
                    <div className="flex flex-col flex-1">
                      <p className="font-bold text-gray-950">{user.username}</p>
                    </div>
                  </div>
                  <div className="divider divide-solid px-3 h-[1px]"></div>
                </div>
              ))}
            </div>
          </div>
          <div className='mt-auto px-1 py-1 flex'>
            <button onClick={handleSearchback} className='bg-white rounded-full px-2 py-1 self-center'>
              <IoArrowBackSharp size={25} />
            </button>

          </div>
        </>
      ) : (
        <>
          <div className="min-h-[70%] max-h-[80%] m overrflow-y-auto scrollbar">
            <div className="w-auto">
              {chatUser.length === 0 ? (
                <>
                  <div className="font-bold items-center flex flex-col text-xl text-yellow-500">
                    <h1>🤔 Why are you Alone!!</h1>
                    <h1>🔍 Search username to chat</h1>
                  </div>
                </>
              ) : (
                <>
                  {chatUser.map((user, index) => (
                    <div key={user._id}>
                      <div
                        onClick={() => handleUserClick(user)}
                        className={`flex gap-3 items-center rounded p-2 py-1 cursor-pointer ${selectedUserId === user?._id ? "bg-sky-500" : ""
                          }`}
                      >
                        <div className={`avatar ${isOnline[index] ? 'online' : ''}`}>
                          <div className="w-12 rounded-full">
                            <img src={user.profilepic} alt="user.img" />
                          </div>
                        </div>
                        <div className="flex flex-col flex-1">
                          <p className="font-bold text-gray-950">
                            {user.username}
                          </p>
                        </div>
                        <div>
                          {newMessageUsers.receiverId === authUser._id && newMessageUsers.senderId === user._id ?
                            <div className="rounded-full bg-green-700 text-sm text-white px-[4px]">+1</div> : <></>
                          }
                        </div>
                      </div>

                      <div className="divider divide-solid px-3 h-[1px]"></div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className='mt-auto px-1 py-1 flex'>
            <button onClick={handleLogout} className='hover:bg-red-600  w-10 cursor-pointer hover:text-white rounded-lg'>
              <BiLogOut size={25} />
            </button>
            <p>Logout</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
