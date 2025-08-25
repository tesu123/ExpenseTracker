import React from "react";
import { Outlet, Navigate } from "react-router-dom"; // <-- FIXED
import { useSelector } from "react-redux";

const ProtectedRoute = ({}) => {
  const isLoggedIn = useSelector((state) => state.auth.status);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
