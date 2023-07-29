import React from "react";
import { OrderCard } from "./OrderCard";
import { useSelector } from "react-redux";

export const OrderListCard = ({ status }) => {
  const { orders } = useSelector((state) => state.orderStore);

  // Filter the orders based on the status
  const filteredOrders = status
    ? orders.filter(
        (order) => order.orderStatus.toLowerCase() === status.toLowerCase()
      )
    : orders;

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <div className="min-w-[900px]">
      <div className="grid grid-cols-8">
        <div>Order Id</div>
        <div className="col-span-2">Customer</div>
        <div>Quantity</div>
        <div>Total</div>
        <div>Status</div>
        <div>Date</div>
        <div>Action</div>
      </div>
      {filteredOrders.map((item) => {
        const date = new Date(item.createdAt);
        const formattedDate = new Intl.DateTimeFormat("en-AU", options).format(
          date
        );

        return (
          <OrderCard
            key={item._id}
            _id={item._id}
            name={item.customerDetails.name}
            orderItems={item.orderItems}
            totalPrice={item.totalPrice}
            date={formattedDate}
            status={item.orderStatus}
          />
        );
      })}
    </div>
  );
};
