import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, allowedRole }) => {
  const isAuthenticated = localStorage.getItem("username");
  const role = localStorage.getItem("selectedRole");

  if (!isAuthenticated || role !== allowedRole) {
    return <Navigate to={"/"} />;
  }

  return children;
};