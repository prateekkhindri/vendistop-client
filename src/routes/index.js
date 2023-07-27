import React from "react";
import { Route, Routes } from "react-router-dom";
import { Registration, Login } from "../pages";
export const Routers = () => {
  return (
    <>
      <Routes>
        {/* Login and signup routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
      </Routes>
    </>
  );
};
