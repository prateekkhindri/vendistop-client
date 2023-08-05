import React from "react";
import { OrderCard } from "./OrderCard";
import { capitalize } from "../../constants/capitalize";

export const OrderHistoryCard = ({ userOrders }) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <div className="min-w-[690px]">
      <div className="grid grid-cols-6">
        <div>Item</div>
        <div>Name</div>
        <div>Order id</div>
        <div>Date</div>
        <div>Total</div>
        <div>Status</div>
      </div>

      {userOrders.map((item) => {
        const date = new Date(item.createdAt);
        const formattedDate = new Intl.DateTimeFormat("en-AU", options).format(
          date
        );
        return (
          <OrderCard
            key={item._id}
            orderItems={item.orderItems}
            _id={item._id}
            date={formattedDate}
            total={item.totalPrice}
            status={capitalize(item.orderStatus)}
          />
        );
      })}
    </div>
  );
};
