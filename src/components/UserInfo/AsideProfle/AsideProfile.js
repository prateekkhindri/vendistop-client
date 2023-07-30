import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import profile from "../../../assets/images/profile-picture.jpg";
import { useDispatch, useSelector } from "react-redux";
import { adminUserLogout } from "../../../pages/login-register/loginRegisterAction.js";

export const AsideProfile = () => {
  const location = useLocation().pathname;
  const profileRoute = location === "/profile";

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.adminUser);

  const isAdmin = useSelector((state) => state.adminUser.user.role) === "Admin";

  return (
    <div className="bg-white rounded-lg">
      <div className="flex flex-col items-center justify-center px-6 py-10 ">
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center items-center w-[100px] h-[100px]">
            <img src={profile} alt="" className="w-full h-full rounded-full" />
          </div>
          <h1 className="pt-5 text-center">
            {user.fName} {user.lName}
          </h1>
        </div>
        <ul className="flex flex-col items-start justify-center w-full pt-4">
          {isAdmin && (
            <NavLink
              className="w-full my-1 group hover:text-white"
              to={"/dashboard"}
            >
              <li className="group/history flex items-center hover:bg-[#4C00B0] group-[.active]:bg-[#4C00B0] group-[.active]:text-white rounded-md px-3 transition py-2">
                <Icon
                  icon={"ic:round-dashboard"}
                  className="text-lg text-[#4C00B0] group-hover/history:text-white group-[.active]:text-white transition"
                />
                <p className="pl-2 transition">Dashboard</p>
              </li>
            </NavLink>
          )}

          <NavLink
            className="w-full my-1 hover:text-white group"
            to={"/profile"}
          >
            <li
              className={`group/account flex items-center hover:bg-[#4C00B0] ${
                profileRoute ? "bg-[#4C00B0] text-white" : ""
              } rounded-md px-3 transition py-2`}
            >
              <Icon
                icon={"fluent:person-12-filled"}
                className={`"text-lg text-[#4C00B0] group-hover/account:text-white ${
                  profileRoute ? "text-white" : ""
                } transition`}
              />
              <p className="pl-2 transition">Edit Profile</p>
            </li>
          </NavLink>

          <NavLink
            className="w-full my-1 group hover:text-white"
            to={"history"}
          >
            <li className="group/history flex items-center hover:bg-[#4C00B0] group-[.active]:bg-[#4C00B0] group-[.active]:text-white rounded-md px-3 transition py-2">
              <Icon
                icon={"material-symbols:history"}
                className="text-lg text-[#4C00B0] group-hover/history:text-white group-[.active]:text-white transition"
              />
              <p className="pl-2 transition">Order History</p>
            </li>
          </NavLink>

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
