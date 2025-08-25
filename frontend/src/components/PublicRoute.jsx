import React from "react";
import { Outlet, Navigate } from "react-router-dom"; // <-- FIXED
import { useSelector } from "react-redux";

const PublicRoute = ({}) => {
  const isLoggedIn = useSelector((state) => state.auth.status);

  if (!isLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to={"/dashboard"} />;
};

export default PublicRoute;
