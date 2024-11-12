import React from 'react'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
const Register = () => {
    const navigate = useNavigate();
    const {setAuthUser} = useAuth();
const [loading,setLoading] = useState(false);
const[inputData, setInputData] =useState({})
    const handleInput=(e)=>{
        setInputData({
            ...inputData,
            [e.target.id]: e.target.value,
          });
    }
console.log(inputData);
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(inputData.password !== inputData.confpassword.toLowerCase()){
        setLoading(false)
        return toast.error("Password Doesn't match")
    }
    try {
      const register = await axios.post(`/api/auth/register`, inputData);
      const data = register.data;
      if (data.success === false) {
        setLoading(false);
        toast.error(data.message)
        console.log(data.message);
      }
      toast.success(data?.message);
      localStorage.setItem("chatapp", JSON.stringify(data));
      setAuthUser(data)
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.error("Error details:", error.response || error.message); // Log detailed error
      toast.error("Login failed: " + (error.response?.data?.message || "Internal Server Error"));
    }
  };
    const selectGender = (gender) => {
        setInputData((prev) => ({
          ...prev,
          gender: prev.gender === gender ? '' : gender,
        }));
      };
  return (
    <div className="flex flex-col items-center justify-center max-w-full mx-auto">
      <div className="w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50">
      <h1 className="text-3xl font-bold text-center text-gray-300 mb-4">
          Register
          <span className="text-gray-950">TalkCircle</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
            id="fullname"
            type="text"
            onChange={handleInput}
            placeholder="Enter Full Name"
            className="p-2 rounded border border-gray-300"
            required
          />
          <input
            id="username"
            type="text"
            onChange={handleInput}
            placeholder="Enter User Name"
            className="p-2 rounded border border-gray-300"
            required
          />
          <input
            id="email"
            type="email"
            onChange={handleInput}
            placeholder="Enter email"
            className="p-2 rounded border border-gray-300"
            required
          />
          <input
            id="password"
            type="password"
            onChange={handleInput}
            placeholder="Enter password"
            className="p-2  rounded border border-gray-300"
          />
          <input
            id="confpassword"
            type="text"
            onChange={handleInput}
            placeholder="Enter your confirm password"
            className="p-2  rounded border border-gray-300"
          />
          <div id="gender" className="flex gap-2">
            <label className="cursor-pointer label flex gap-2">
            <span classNAme="label-text font-semibold text-gray-950">male</span>
            <input type='checkbox' 
            onChange={()=>selectGender('male')}
            checked={inputData.gender === 'male'}
            className="checkbox checkbox-info"/>
            </label>
            <label className="cursor-pointer label flex gap-2">
            <span classNAme="label-text font-semibold text-gray-950">female</span>
            <input type='checkbox' 
             onChange={()=>selectGender('female')}
             checked={inputData.gender === 'female'}className="checkbox checkbox-info"/>
            </label>
          </div>
          <button
            type="submit"
            className="w-full p-2 rounded bg-purple-600 text-white hover:bg-blue-700 transition duration-300"
          >
            {loading ? "loading.." : "Register"}
          </button>
          {/* <button
            type="submit"
            className="w-full p-2 rounded bg-purple-600 text-white hover:bg-blue-700 transition duration-300"
          >
            Guest user
          </button> */}
        </form>
        <div className="pt-2">
          <p className="text-sm font-semibold text-gray-800">
            Do you already have an Account?
            <Link to={"/login"}>
              <span className="text-gray-950">Login Now!!</span>{" "}
            </Link>
          </p>
        </div>
      </div>
      
      </div>
  )
}

export default Register
