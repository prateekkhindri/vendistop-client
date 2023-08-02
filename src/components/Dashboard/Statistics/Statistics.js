import { Icon } from "@iconify/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./statistics.css";

const Card = ({ date, time, name, amount, status }) => {
  return (
    <div className="grid grid-cols-card gap-4 py-2 border-b-2 border-gray-200 hover:bg-gray-100 transition-colors duration-200 text-sm md:text-base">
      <div>
        {date}
        <br />
        {time}
      </div>
      <div>{name}</div>
      <div>${amount}</div>
      <div>{status}</div>
    </div>
  );
};

export const Statistics = () => {
  const { orders } = useSelector((state) => state.orderStore);

  const { products } = useSelector((state) => state.productStore);

  return (
    <div>
      <div className="text-[#515050] font-semibold text-xl pb-5">
        <h1>Dashboard</h1>
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-4 xsm:grid-cols-4">
        <div className="bg-[#C7CDFF] rounded-xl p-4">
          <div className="flex h-full w-full flex-col justify-between items-start text-[#2C2C2C}">
            <div className="text-xl md:text-3xl">
              <Icon icon="ant-design:dollar-outlined" />
            </div>
            <div className="flex items-end justify-between w-full pt-3 md:pt-5">
              <div>
                <h3 className="text-sm font-semibold md:text-lg">$78.90</h3>
                <p className="text-[10px] lg:text-sm">TOTAL BALANCE </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#BAFFBD] rounded-xl p-4">
          <div className="flex h-full w-full flex-col justify-between items-start text-[#2C2C2C}">
            <div className="text-xl md:text-3xl">
              <Icon icon="fluent-mdl2:activate-orders" />
            </div>
            <div className="flex items-end justify-between w-full pt-3 md:pt-5">
              <div>
                <h3 className="text-sm font-semibold md:text-lg">
                  {orders?.length || 0}
                </h3>
                <p className="text-[10px] lg:text-sm">ORDERS</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#FFF4BA] rounded-xl p-4">
          <div className="flex h-full w-full flex-col justify-between items-start text-[#2C2C2C}">
            <div className="text-xl md:text-3xl">
              <Icon icon="fluent:person-circle-24-regular" />
            </div>
            <div className="flex items-end justify-between w-full pt-3 md:pt-5">
              <div>
                <h3 className="text-sm font-semibold md:text-lg">999</h3>
                <p className="text-[10px] lg:text-sm">CUSTOMERS</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F0D0FF] rounded-xl p-4">
          <div className="flex h-full w-full flex-col justify-between items-start text-[#2C2C2C}">
            <div className="text-xl md:text-3xl">
              <Icon icon="basil:shopping-bag-solid" />
            </div>
            <div className="flex items-end justify-between w-full pt-3 md:pt-5">
              <div>
                <h3 className="text-sm font-semibold md:text-lg">
                  {products?.length || 0}
                </h3>
                <p className="text-[10px] lg:text-sm">PRODUCTS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 mt-4 bg-white md:p-8 rounded-xl">
        <div className="flex items-center justify-between text-xs">
          <p className="text-base md:text-lg text-[#696969] font-semibold">
            Latest Orders
          </p>
          <Link
            to={"orders"}
            className="text-[#4C00B0] underline font-semibold"
          >
            View all orders
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <label className="text-lg md:text-2xl text-[#ADADAD]">
              No orders to show
            </label>
          </div>
        ) : (
          <div className="my-2 overflow-x-auto max-w-screen-xl mx-auto">
            <div className="min-w-[350px] w-full mt-5">
              <div className="grid grid-cols-card text-left w-full text-xs md:text-sm font-medium md:font-normal text-[#ADADAD]">
                <span>Date</span>
                <span>Customer Name</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              <div className="mt-3">
                {orders.map((item) => {
                  const date = new Date(item.createdAt);
                  const datePart = date.toLocaleDateString("en-AU", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });
                  const timePart = date.toLocaleTimeString("en-AU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <Card
                      key={item._id}
                      date={datePart}
                      time={timePart}
                      name={item.customerDetails.name}
                      amount={item.totalPrice}
                      status={item.orderStatus}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
