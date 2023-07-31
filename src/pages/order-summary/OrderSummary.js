import React, { useEffect } from "react";
import { DashOrderDetails } from "../../components/Dashboard";
import { Icon } from "@iconify/react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getSingleOrderAction,
  resetCurrentOrderAction,
} from "../orders/orderAction";

const OrderSummary = () => {
  const { _id } = useParams();

  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleOrderAction(_id));

    return () => {
      dispatch(resetCurrentOrderAction());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[#FDF9FF] min-h-screen">
      <section className="max-w-screen-xl px-3 mx-auto">
        <div className="cartlist-wrapper">
          {location.state?.paymentSuccess && (
            <div className="flex items-center justify-between px-4 py-8">
              <h1 className="text-[#2c3c3c] text-xl font-semibold flex flex-row gap-1">
                <Icon icon="ant-design:check-circle-filled" color="green" />
                Your order has been successfully placed
              </h1>
            </div>
          )}

          <DashOrderDetails adminPage={false} />
        </div>
      </section>
    </div>
  );
};

export default OrderSummary;
