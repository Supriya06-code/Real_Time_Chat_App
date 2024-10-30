// import React from "react";
// import { Outlet, Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export const VerifyUser = () => {
//   const { authUser } = useAuth();
//   const location = useLocation();

//   return authUser ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const VerifyUser = () => {
  const { authUser } = useAuth();

  // Directly check localStorage in case of manual deletion
  const isAuthenticated = authUser || JSON.parse(localStorage.getItem("chatapp"));

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
