import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRouter = ({ children, ...rest }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.adminUser);

  return user._id ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
