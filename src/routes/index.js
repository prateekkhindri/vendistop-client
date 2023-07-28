import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Login, PasswordResetEmail, Registration } from "../pages";
import { ResetPassword } from "../components";

export const Routers = () => {
  return (
    <>
      <Routes>
        {/* Login and signup routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />

        {/* Reset Password routes for a registered user */}
        <Route path="/password">
          <Route path="email" element={<PasswordResetEmail />} />
          <Route path="reset" element={<ResetPassword />} />
          <Route
            path="/password"
            element={<Navigate to={"/password/email"} />}
          />
        </Route>
      </Routes>
    </>
  );
};
