import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { deleteProduct } from "../../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { fetchProductsAction } from "../../../pages/upload-product/productAction";
import { useDispatch } from "react-redux";

export const ProductCard = ({ image, title, price, _id }) => {
  const dispatch = useDispatch();

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this product ?")) {
      const responsePromise = deleteProduct(_id);

      toast.promise(responsePromise, {
        pending: "Please wait ...",
      });

      const { status, message } = await responsePromise;

      toast[status](message);

      status === "success" && dispatch(fetchProductsAction());
    }
  };
  return (
    <div className="mb-4 flex justify-between sm:items-center border border-[#EBEBEB] rounded-lg p-1 bg-[#F8F8F8]">
      {/* Image title and price section */}
      <div className="flex items-start justify-start sm:items-center w-3/5">
        <div className="flex items-center w-[70px] gap-x-4">
          <Link to={`/product/${_id}`}>
            <img
              className="object-cover w-full h-full rounded-lg aspect-square"
              src={image}
              alt=""
            />
          </Link>
        </div>
        <div className="flex flex-col justify-center h-full pl-3 sm:items-center">
          <h3 className="text-xs lg:text-sm text-[#464545] font-medium">
            {title}
          </h3>
          <p className="pt-1 text-xs sm:hidden">${price}</p>
        </div>
      </div>
      {/* Price for desktop view */}
      <div className="justify-center hidden h-full pl-3 sm:flex sm:items-center text-right">
        <p className="pt-1 text-xs lg:text-sm">${price}</p>
      </div>
      <div className="flex items-center justify-between pt-3">
        <Link to={`../upload-products/${_id}`}>
          <div className="p-1 bg-white rounded-md cursor-pointer">
            <Icon
              icon="material-symbols:edit"
              className="hover:text-[#4C00B0] lg:text-xl text-[#696969]"
            />
          </div>
        </Link>
        <div
          className="p-1 ml-2 bg-white rounded-md cursor-pointer"
          onClick={() => handleDelete(_id)}
        >
          <Icon
            icon="material-symbols:delete"
            className="hover:text-red-400 lg:text-xl text-[#696969]"
          />
        </div>
      </div>
    </div>
  );
};
