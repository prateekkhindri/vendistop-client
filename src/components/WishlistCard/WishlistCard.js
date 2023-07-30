import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { removeProductFromWishlist } from "../../pages/Wishlist/wishlistAction.js";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../pages/Cart/cartAction.js";

export const WishlistCard = ({ _id, image, title, price }) => {
  const dispatch = useDispatch();

  return (
    <div className="mx-3 my-4">
      <div className="grid grid-cols-3 border border-[#EBEBEB] rounded-lg p-3 bg-[#F8F8F8]">
        {/* Image title and price section */}
        <div className="flex items-start justify-start col-span-2 sm:col-span-1 sm:items-center">
          <div className="flex items-center max-w-[70px] gap-x-4">
            <Link to={`/product/${_id}`}>
              <img
                className="object-cover w-full h-full rounded-lg aspect-square"
                src={image}
                alt=""
              />
            </Link>
          </div>
          <div className="flex flex-col justify-center h-full pl-3 sm:items-center">
            <h3 className="text-xs lg:text-sm text-[#464545] font-medium line-clamp-1">
              {title}
            </h3>
            <p className="pt-1 text-xs sm:hidden">{`$${price}`}</p>
          </div>
        </div>
        {/* Price for desktop view */}
        <div className="justify-center hidden h-full pl-3 sm:flex sm:items-center">
          <p className="pt-1 text-xs lg:text-sm">{`$${price}`}</p>
        </div>
        {/* Add to cart and remove from favorite buttons*/}
        <div className="flex items-center justify-end pt-3">
          <div
            onClick={() => dispatch(addProductToCart(_id, 1))}
            className="p-1 bg-white rounded-md cursor-pointer"
          >
            <Icon
              icon="uil:shopping-cart"
              className="hover:text-red-400 lg:text-xl text-[#696969]"
            />
          </div>
          <div
            onClick={() => dispatch(removeProductFromWishlist(_id))}
            className="p-1 ml-2 bg-white rounded-md cursor-pointer"
          >
            <Icon
              icon="material-symbols:delete"
              className="hover:text-red-400 lg:text-xl text-[#696969]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
