import React from "react";
// import link for routing
import { Link } from "react-router-dom";
// import cart context
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { addProductToWishlist } from "../../pages/Wishlist/wishlistAction";
import { addProductToCart } from "../../pages/Cart/cartAction";

export const ProductCard = ({ _id, image, title, price }) => {
  const dispatch = useDispatch();

  return (
    <div className="hover:border-[#4C00B0] md:border-2 border border-transparent z-[1] flex flex-col items-center justify-center float-left p-3 sm:p-4 mx-1 mt-4 duration-100 ease-in bg-white shadow-sm rounded-2xl transition-all">
      <div className="cursor-pointer">
        <div className="relative flex items-center justify-center shrink-0 lg:rounded-3xl">
          <Link to={`/product/${_id}`}>
            <img
              src={image}
              className="object-cover object-center w-full h-full aspect-square rounded-xl lg:rounded-3xl"
              alt="product_image"
            />
          </Link>
          <div
            onClick={() => dispatch(addProductToWishlist(_id))}
            className="z-10 absolute top-0 right-0 p-1 text-3xl text-[#4C00B0] rounded-lg hover:text-white hover:bg-[#4C00B0] transition"
          >
            <div>
              <Icon icon={"mdi:cards-heart-outline"} />
            </div>
          </div>
        </div>
        <Link to={`/product/${_id}`}>
          <div className="py-2 h-10 w-[90%]">
            <p className="overflow-hidden md:text-sm font-medium whitespace-pre-wrap line-clamp-2 text-ellipsis text-[#696969] text-xs">
              {title}
            </p>
          </div>
        </Link>
        <Link to={`/product/${_id}`}>
          <div className="pt-6 text-[#4C00B0] font-bold">
            <span>{`$${parseFloat(price).toFixed(2)}`}</span>
          </div>
        </Link>
      </div>
      <button
        onClick={() => dispatch(addProductToCart(_id, 1))}
        className="w-full rounded-lg py-2 md:py-3 md:text-sm mt-2 border border-[#E4E4E4] text-xs font-semibold text-[#696969] transition-all hover:bg-[#4C00B0] hover:border-transparent hover:text-white duration-300 ease-linear"
      >
        Add to cart
      </button>
    </div>
  );
};
