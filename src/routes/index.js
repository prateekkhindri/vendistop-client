import React, { useRef, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  PasswordResetEmail,
  Registration,
  Dashboard,
  Privacy,
  Terms,
  NotFound,
  Wishlist,
  Cart,
} from "../pages";
import { NavBar, ResetPassword } from "../components";
import { DashNav, Statistics } from "../components/Dashboard";
import DashboardCategories from "../pages/categories/DashboardCategories";
import { PrivateRouter } from "../components/private-route/PrivateRouter";
import UploadProduct from "../pages/upload-product/UploadProduct";
import ProductList from "../pages/dashboard-products/ProductList";
import Orders from "../pages/orders/Orders";

export const Routers = () => {
  const [toggle, setToggle] = useState(false);

  const dashRef = useRef(null);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <Routes>
        <Route element={<NavBar />}>
          {/* Main page routes */}
          <Route path="/" element={<Home />} />

          {/* Wishlist and Cart pages accessible only to a logged in user */}
          <Route
            path="/wishlist"
            element={
              <PrivateRouter>
                <Wishlist />
              </PrivateRouter>
            }
          />

          <Route
            path="/cart"
            element={
              <PrivateRouter>
                <Cart />
              </PrivateRouter>
            }
          />

          {/* Privacy and Terms pages */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Route>
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
        >
          <Route
            path="/dashboard"
            element={
              <PrivateRouter>
                <Dashboard
                  toggle={toggle}
                  handleToggle={handleToggle}
                  dashRef={dashRef}
                />
              </PrivateRouter>
            }
          >
            <Route index element={<Statistics />} />
            <Route
              path="products"
              element={
                <PrivateRouter>
                  <ProductList />
                </PrivateRouter>
              }
            />
            <Route
              path="upload-products"
              element={
                <PrivateRouter>
                  <UploadProduct />
                </PrivateRouter>
              }
            />

            <Route
              path="upload-products/:_id"
              element={
                <PrivateRouter>
                  <UploadProduct />
                </PrivateRouter>
              }
            />

            <Route
              path="order-list"
              element={
                <PrivateRouter>
                  <Orders />
                </PrivateRouter>
              }
            />

            <Route
              path="categories"
              element={
                <PrivateRouter>
                  <DashboardCategories />
                </PrivateRouter>
              }
            />
          </Route>
        </Route>

        {/* If there is not routes available then return 404 page instead */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to={"/404"} />} />
      </Routes>
    </>
  );
};
