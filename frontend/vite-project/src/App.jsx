// import Login from "./login/Login.jsx"
// import Register from "./register/Register.jsx";
// import Home from "./home/Home.jsx";
// import { ToastContainer } from "react-toastify"
// import 'react-toastify/dist/ReactToastify.css';
// import {Route, Routes} from "react-router-dom"
// import { VerifyUser } from "./utils/verifyUser.jsx";
// function App() {
  

//   return (
//     <>
//     <div className="p-2 w-screen h-screen flex items-center justify-center">
//       <Routes>
   
//         <Route path="/login" element={<Login/>}/>
//         <Route path="/register" element={<Register/>}/>
//         <Route elements={<VerifyUser />}>
//         <Route path="/" element={<Home />}/>
//         </Route>
//       </Routes>

// <ToastContainer/>
//     </div>
   
//       </>
//   )
// }

// export default App
import Login from "./login/Login.jsx";
import Register from "./register/Register.jsx";
import Home from "./home/Home.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, Navigate } from "react-router-dom";
import { VerifyUser } from "./utils/verifyUser.jsx";
import { useAuth } from "./context/AuthContext";

function App() {
  const { authUser } = useAuth(); // Check if the user is authenticated

  return (
    <>
      <div className="p-2 w-screen h-screen flex items-center justify-center">
        <Routes>
          {/* Redirect to /login if not authenticated */}
          <Route path="/" element={authUser ? <Navigate to="/home" /> : <Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Only allow access to the Home page if the user is authenticated */}
          <Route element={<VerifyUser />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </div>
      
      <ToastContainer />
    </>
  );
}

export default App;
