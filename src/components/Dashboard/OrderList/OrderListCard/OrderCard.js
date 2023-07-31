import React from "react";
import { Link } from "react-router-dom";

export const OrderCard = ({
  _id,
  name,
  totalPrice,
  status,
  date,
  orderItems,
}) => {
  const totalQty = orderItems.reduce((acc, item) => acc + item.qty, 0);
  const image = orderItems[0]?.image || "";

  return (
    <div className="mb-2 text-[#ADADAD] p-2 bg-[#F8F8F8] border border-[#EBEBEB] grid items-center grid-cols-8 mt-2 rounded-xl">
      <div>{_id.substring(0, 8)}</div>
      <div className="flex items-center justify-start col-span-2">
        <div className="w-9 h-9">
          <img
            src={image}
            alt=""
            className="object-cover object-center w-full h-full rounded-full"
          />
        </div>
        <span className="pl-2">{name}</span>
      </div>
      <div>{totalQty}</div>
      <div>${totalPrice}</div>
      <div
        className={` ${
          status === "delivered"
            ? "bg-[#A4FFA7] text-[#23B53A]"
            : "bg-[#EBC0FF] text-[#A75ECA]"
        } p-1 text-center rounded-md mr-3`}
      >
        {status}
      </div>
      <div>{date}</div>
      <div className="bg-[#4C00B0] text-white text-sm text-center rounded-md p-2 hover:bg-opacity-80">
        <Link to={`/dashboard/orders/${_id}`}>View Details</Link>
      </div>
    </div>
  );
};
