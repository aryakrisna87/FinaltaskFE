import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export const PrivateRouteUser = () => {
  const admin = localStorage.Email;
  return admin == "admin@mail.com" ? <Outlet /> : <Navigate to="/" />;
};
