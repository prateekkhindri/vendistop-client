import React from "react";
import { Link } from "react-router-dom";

export const OrderCard = ({ _id, date, total, status, orderItems }) => {
  const name = orderItems[0]?.name || "";

  const image = orderItems[0]?.image || "";

  return (
    <div className="mb-2 text-[#ADADAD] p-2 bg-[#F8F8F8] border border-[#EBEBEB] grid items-center grid-cols-6 mt-2 rounded-xl">
      <div>
        <Link to={`/order/${_id}`}>
          <img
            src={image}
            className="object-cover w-[60px] h-[60px] rounded-lg"
            alt=""
          />
        </Link>
      </div>
      <div className="pr-2 text-sm">{name}</div>
      <div>{_id.substring(0, 8)}</div>
      <div>{date}</div>
      <div>${total}</div>
      <div>{status === "Delivered" ? "Delivered" : "Pending"}</div>
    </div>
  );
};
