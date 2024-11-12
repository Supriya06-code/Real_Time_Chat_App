import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const {setAuthUser} = useAuth();
  const [userInput, setUserInput] = useState({});
  const [loading, setLoading] = useState(false);
  const handleInput = (e) => {
    setUserInput({
      ...userInput,
      [e.target.id]: e.target.value,
    });
  };
  console.log("userInput", userInput);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const login = await axios.post(`/api/auth/login`, userInput);
      const data = login.data;
      if (data.success === false) {
        setLoading(false);
        console.log(data.message);
      }
      toast.success(data.message);
      localStorage.setItem("chatapp", JSON.stringify(data));
      setAuthUser(data)
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Error details:", error.response || error.message); // Log detailed error
      toast.error("Login failed: " + (error.response?.data?.message || "Internal Server Error"));
    }
  };
  return (
    <div className="flex flex-col items-center justify-center max-w-full mx-auto">
      <div className="w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50">
        <h1 className="text-3xl font-bold text-center text-gray-300 mb-4">
          Login<span className="text-gray-950">TalkCircle</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            id="email"
            type="email"
            onChange={handleInput}
            placeholder="Enter your email..."
            className="p-2 rounded border border-gray-300"
            required
          />
          <input
            id="password"
            type="password"
            onChange={handleInput}
            placeholder="Enter your password..."
            className="p-2  rounded border border-gray-300"
          />
          <button
            type="submit"
            className="w-full p-2 rounded bg-purple-600 text-white hover:bg-blue-700 transition duration-300"
          >
            {loading ? "loading.." : "Login"}
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
            Don't have an Account?
            <Link to={"/register"}>
              <span className="text-gray-950">Register Now!!</span>{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
