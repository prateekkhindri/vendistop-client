import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const AdminRouter = ({ children, ...rest }) => {
  const location = useLocation();
  const isAdmin = useSelector((state) => state.adminUser.user.role) === "Admin";

  return isAdmin ? (
    children
  ) : (
    <Navigate to="/404" replace state={{ from: location }} />
  );
};
