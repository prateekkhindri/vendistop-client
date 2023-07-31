import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { adminUserLogout } from "../../../pages/login-register/loginRegisterAction";
import { useDispatch } from "react-redux";

export const DashAside = ({ handleToggle }) => {
  const dispatch = useDispatch();

  const location = useLocation().pathname;
  const dashboard = location === "/dashboard";

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-center px-6 py-7 ">
        <ul
          onClick={handleToggle}
          className="flex flex-col items-start justify-center w-full"
        >
          {/* Dashboard */}
          <Link
            className="w-full my-1 group hover:text-white"
            to={"/dashboard"}
          >
            <li
              className={`group/history flex items-center hover:bg-[#4C00B0] ${
                dashboard ? "bg-[#4C00B0] text-white" : ""
              }  group-[.active]:text-white rounded-md px-3 transition py-2`}
            >
              <Icon
                icon={"ic:round-dashboard"}
                className={`text-lg text-[#4C00B0] group-hover/history:text-white ${
                  dashboard ? "text-white" : ""
                } transition`}
              />
              <p className="pl-2 transition">Dashboard</p>
            </li>
          </Link>

          {/* Products */}
          <NavLink
            className="w-full my-1 group hover:text-white"
            to={"products"}
          >
            <li className="group/history flex items-center hover:bg-[#4C00B0] group-[.active]:bg-[#4C00B0] group-[.active]:text-white rounded-md px-3 transition py-2">
              <Icon
                icon={"material-symbols:shopping-bag"}
                className="text-lg text-[#4C00B0] group-hover/history:text-white group-[.active]:text-white transition"
              />
              <p className="pl-2 transition">Products</p>
            </li>
          </NavLink>

          {/* Upload Products */}
          <NavLink
            className="w-full my-1 hover:text-white group"
            to={"upload-products"}
          >
            <li className="group/account flex items-center hover:bg-[#4C00B0] group-[.active]:bg-[#4C00B0] group-[.active]:text-white rounded-md px-3 transition py-2">
              <Icon
                icon={"ic:baseline-upload"}
                className="text-lg text-[#4C00B0] group-hover/account:text-white group-[.active]:text-white transition"
              />
              <p className="pl-2 transition">Upload Products</p>
            </li>
          </NavLink>

          {/* Order List */}
          <NavLink className="w-full my-1 group hover:text-white" to={"orders"}>
            <li className="group/history flex items-center hover:bg-[#4C00B0] group-[.active]:bg-[#4C00B0] group-[.active]:text-white rounded-md px-3 transition py-2">
              <Icon
                icon={"material-symbols:order-approve-sharp"}
                className="text-lg text-[#4C00B0] group-hover/history:text-white group-[.active]:text-white transition"
              />
              <p className="pl-2 transition">Orders</p>
            </li>
          </NavLink>

          {/*Categories */}
          <NavLink
            className="w-full my-1 group hover:text-white"
            to={"categories"}
          >
            <li className="group/history flex items-center hover:bg-[#4C00B0] group-[.active]:bg-[#4C00B0] group-[.active]:text-white rounded-md px-3 transition py-2">
              <Icon
                icon={"ph:shopping-cart-fill"}
                className="text-lg text-[#4C00B0] group-hover/history:text-white group-[.active]:text-white transition"
              />
              <p className="pl-2 transition">Categories</p>
            </li>
          </NavLink>

          {/* Logout */}
          <Link className="w-full my-1 hover:text-white" to={"/login"}>
            <li
              className=" group/logout flex items-center hover:bg-[#4C00B0] rounded-md px-3 transition py-2"
              onClick={() => dispatch(adminUserLogout())}
            >
              <Icon
                icon={"solar:logout-linear"}
                className="text-lg text-[#4C00B0] group-hover/logout:text-white transition"
              />
              <p className="pl-2 transition">Logout</p>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
