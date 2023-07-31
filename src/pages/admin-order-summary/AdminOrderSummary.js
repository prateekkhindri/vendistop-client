import React, { useEffect } from "react";
import { DashOrderDetails } from "../../components/Dashboard";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getSingleOrderAction,
  resetCurrentOrderAction,
} from "../orders/orderAction";

const AdminOrderSummary = () => {
  const { _id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleOrderAction(_id));
    return () => dispatch(resetCurrentOrderAction());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <DashOrderDetails adminPage={true} />
    </div>
  );
};

export default AdminOrderSummary;
