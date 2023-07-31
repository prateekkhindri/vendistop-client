import React, { useEffect } from "react";
import { DashOrderDetails } from "../../components/Dashboard";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSingleOrderAction } from "../orders/orderAction";

const AdminOrderSummary = () => {
  const { _id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    _id && dispatch(getSingleOrderAction(_id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <DashOrderDetails adminPage={true} />
    </div>
  );
};

export default AdminOrderSummary;
