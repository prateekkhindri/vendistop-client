import React, { useRef, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Login, PasswordResetEmail, Registration } from "../pages";
import { ResetPassword } from "../components";

import { DashNav, Statistics } from "../components/Dashboard";

export const Routers = () => {
  const [toggle, setToggle] = useState(false);

  const dashRef = useRef(null);

  const handleToggle = () => {
    setToggle(!toggle);
  };

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

        {/* Dashboard Routes - All dashboard routes are private: only accessible to an admin user */}
        <Route
          element={
            <DashNav
              dashRef={dashRef}
              setToggle={setToggle}
              handleToggle={handleToggle}
            />
          }
        ></Route>
      </Routes>
    </>
  );
};
