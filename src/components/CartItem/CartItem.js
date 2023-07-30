import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import {
  decrementQuantityInCart,
  incrementQuantityInCart,
  removeProductFromCart,
} from "../../pages/Cart/cartAction";

export const CartItem = ({ _id, title, price, image, amount }) => {
  const dispatch = useDispatch();

  return (
    // main cart section
    <div className="my-4">
      <div className="border border-[#EBEBEB] rounded-lg p-3 bg-[#F8F8F8]">
        {/* Image title and price section */}
        <div className="flex items-start justify-start text-start">
          <div className="flex items-center max-w-[70px] gap-x-4">
            <Link to={`/product/${_id}`}>
              <img
                className="object-cover w-full h-full rounded-lg aspect-square"
                src={image}
                alt=""
              />
            </Link>
          </div>
          <div className="pl-3">
            <h3 className="text-sm text-[#464545] font-medium">{title}</h3>
            <p className="pt-1 text-xs font-semibold">{`${parseFloat(
              price * amount
            ).toFixed(2)}`}</p>
          </div>
        </div>
        {/* Quantity and item delete options */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center justify-center">
            {/* minus icon */}
            <button
              onClick={() =>
                amount > 1
                  ? dispatch(decrementQuantityInCart(_id))
                  : dispatch(removeProductFromCart(_id))
              }
              className="hover:bg-opacity-75 cursor-pointer rounded-tl-md rounded-bl-md bg-[#4C00B0] p-1 h-full flex items-center justify-center flex-1"
            >
              <Icon
                icon={"tabler:minus"}
                className="text-white cursor-pointer"
              />
            </button>

            <div className="flex items-center justify-center h-full px-2 bg-white">
              {amount}
            </div>
            {/* plus icon */}
            <button
              onClick={() => dispatch(incrementQuantityInCart(_id))}
              className="hover:bg-opacity-75 cursor-pointer rounded-br-md rounded-tr-md bg-[#D9D9D9] p-1 flex items-center justify-center flex-1 h-full"
            >
              <Icon icon={"tabler:plus"} className="cursor-pointer" />
            </button>
          </div>
          <div
            onClick={() => dispatch(removeProductFromCart(_id))}
            className="p-1 bg-white rounded-md cursor-pointer"
          >
            <Icon
              icon="material-symbols:delete"
              className="hover:text-red-400 text-[#696969]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
