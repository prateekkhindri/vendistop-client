import React, { useEffect, useRef, useState } from "react";
import { OrderListCard } from "./OrderListCard/OrderListCard";

export const DashOrderList = () => {
  const [toggle, setToggle] = useState(false);
  const [currentItem, setCurrentItem] = useState("All");
  const popup_ref = useRef(null);
  const button_ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popup_ref.current &&
        !popup_ref.current.contains(event.target) &&
        !button_ref.current.contains(event.target)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popup_ref]);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleCurrentItem = (e) => {
    setCurrentItem(e.target.innerText.trim());
    setToggle(false);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-[#2c3c3c] text-xl font-semibold">Order List</h1>
        <div className="cursor-pointer" ref={button_ref} onClick={handleToggle}>
          Status:
          <span className="relative">
            <span className="pl-2 font-semibold text-black cursor-pointer">
              {currentItem === null ? (
                <span>All</span>
              ) : (
                <span>{currentItem}</span>
              )}
            </span>
            <div
              ref={popup_ref}
              className={`${
                toggle ? "block" : "hidden"
              } absolute right-0 p-2 bg-white rounded-lg shadow-lg`}
            >
              <ul>
                <li
                  onClick={(e) => handleCurrentItem(e)}
                  className="px-2 py-1 hover:bg-black hover:bg-opacity-5 cursor-pointer rounded-md hover:text-[#4C00B0]"
                >
                  All
                </li>
                <li
                  onClick={(e) => handleCurrentItem(e)}
                  className="px-2 py-1 hover:bg-black hover:bg-opacity-5 cursor-pointer rounded-md hover:text-[#4C00B0]"
                >
                  Pending
                </li>
                <li
                  onClick={(e) => handleCurrentItem(e)}
                  className="px-2 py-1 hover:bg-black hover:bg-opacity-5 cursor-pointer rounded-md hover:text-[#4C00B0]"
                >
                  Delivered
                </li>
              </ul>
            </div>
          </span>
        </div>
      </div>
      <section className="max-w-screen-xl mx-auto">
        <div className="pb-40">
          <div className="p-8 mx-auto overflow-x-auto bg-white rounded-xl">
            <OrderListCard
              status={currentItem === "All" ? null : currentItem}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
