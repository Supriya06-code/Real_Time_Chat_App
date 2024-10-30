// import { createContext, useContext, useState } from "react";
// export const AuthContext = createContext();

// export const useAuth =()=>{
//     return useContext(AuthContext)
// }

// export const AuthContextProvider =({children})=>{
//     const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('chatapp')) || null);
//     return <AuthContext.Provider value={{authUser, setAuthUser}}>
//         {children}
//     </AuthContext.Provider>
// }
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chatapp")) || null
  );

  // Sync authUser state with localStorage manually
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("chatapp"));
      setAuthUser(storedUser);
    };

    // Attach event listener for storage changes across tabs/windows
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
