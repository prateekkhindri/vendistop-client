import React, { useEffect } from "react";
import { DashUploadProducts } from "../../components/Dashboard";
import { useDispatch } from "react-redux";
import {
  fetchSingleProductAction,
  resetSingleProductAction,
} from "./productAction";
import { useParams } from "react-router-dom";

const UploadProduct = () => {
  const dispatch = useDispatch();

  const { _id } = useParams();

  useEffect(() => {
    _id && dispatch(fetchSingleProductAction(_id));
    return () => {
      dispatch(resetSingleProductAction());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <DashUploadProducts />
    </div>
  );
};

export default UploadProduct;
