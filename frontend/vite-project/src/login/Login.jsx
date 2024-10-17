import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-full mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50'>
        <h1 className='text-3xl font-bold text-center text-gray-300 mb-4'>
          Login<span className='text-gray-950'>TalkCircle</span>
        </h1>
        <form className='flex flex-col space-y-4'>
          <input id="email"
            type='email'
            placeholder='Enter your email...'
            className='p-2 rounded border border-gray-300'
          required />
          <input id="password"
            type='password'
            placeholder='Enter your password...'
            className='p-2  rounded border border-gray-300'
          />
          <button
            type='submit'
            className='w-full p-2 rounded bg-purple-600 text-white hover:bg-blue-700 transition duration-300'
          >
            Login
          </button>
        </form>
        <div className='pt-2'>
<p className='text-sm font-semibold text-gray-800'>Don't have an Account?<Link to={'/signup'}><span className='text-gray-950'>Register Now!!</span> </Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
