import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { Link, Outlet } from "react-router-dom";

import Logo from "../../../assets/logos/logo.png";

export const DashNav = ({ dashRef, handleToggle, setToggle }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    const handleClickOutsideDash = (event) => {
      if (
        dashRef &&
        dashRef.current &&
        !dashRef.current.contains(event.target) &&
        !btnRef.current.contains(event.target)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDash);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDash);
    };
  });

  return (
    <>
      <div className="relative w-full bg-white shadow-sm">
        <div className="flex items-center justify-between max-w-screen-xl px-3 py-4 mx-auto">
          <button
            ref={btnRef}
            onClick={handleToggle}
            className="p-2 lg:hidden rounded-xl icon_shadow active:shadow-none"
          >
            <Icon icon="ion:list-outline" className="text-xl xl:text-2xl" />
          </button>
          <div className="text-[#4C00B0] text-lg font-extrabold uppercase">
            <Link to={"/"}>
              <div>
                <img
                  src={Logo}
                  alt=""
                  className="h-[25px] xs:h-[40px] object-cover"
                />
              </div>
            </Link>
          </div>
          <Link to={"/profile"}>
            <div className="p-2 rounded-full icon_shadow active:shadow-none">
              <Icon icon="ci:user-01" className="text-xl xl:text-2xl" />
            </div>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};
