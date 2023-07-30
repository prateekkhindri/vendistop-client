import React, { useEffect } from "react";
import { OrderHistoryCard } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserAction } from "../../orders/orderAction";

const OrderHistory = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orderStore);

  useEffect(() => {
    !orders.length && dispatch(getOrdersByUserAction());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <h1 className="text-[#2c3c3c] mb-10 text-xl font-semibold">
        Order History
      </h1>
      <section className="max-w-screen-xl mx-auto">
        {orders.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <label className="text-lg md:text-2xl text-[#ADADAD]">
              No orders to show
            </label>
          </div>
        ) : (
          <div className="pb-40">
            <div className="max-w-[930px] overflow-x-auto mx-auto bg-white rounded-xl p-8">
              <OrderHistoryCard />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderHistory;
