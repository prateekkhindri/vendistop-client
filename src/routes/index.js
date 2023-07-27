import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/login-register/Login.js";
import Registration from "../pages/login-register/Registration.js";

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
