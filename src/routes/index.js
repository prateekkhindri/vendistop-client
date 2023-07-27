import React from "react";
import { Route, Routes } from "react-router-dom";
import { Registration } from "../pages";
export const Routers = () => {
  return (
    <>
      <Routes>
        {/* Login and signup routes */}
        <Route path="/signup" element={<Registration />} />
      </Routes>
    </>
  );
};
