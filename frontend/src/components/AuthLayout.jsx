import React from "react";
import { Outlet, Navigate } from "react-router-dom"; // <-- FIXED
import { useSelector } from "react-redux";

const AuthLayout = ({}) => {
  const isLoggedIn = useSelector((state) => state.auth.status);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />; // send logged-in users to dashboard
  }

  return <Outlet />; // show login/signup/etc if not logged in
};

export default AuthLayout;
