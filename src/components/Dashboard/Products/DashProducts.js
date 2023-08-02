import { Icon } from "@iconify/react";
import React from "react";
import { ProductCard } from "./ProductCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const DashProducts = () => {
  const { products } = useSelector((state) => state.productStore);

  return (
    <div className="p-container">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[#515050] text-lg font-semibold">Products</p>
        </div>
        <Link to="../upload-products">
          <div className="p-1 transition text-lg text-[#696969] md:text-2xl bg-[#f7f7f7] rounded-md hover:text-white hover:bg-[#4C00B0] font-semibold">
            <Icon icon={"ic:round-plus"} />
          </div>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <label className="text-lg md:text-2xl text-[#ADADAD]">
            No products to show
          </label>
        </div>
      ) : (
        <div className="mt-3 bg-white rounded-xl">
          <label className="text-xs md:text-sm text-[#ADADAD]">
            {products.length} Products Found !
          </label>

          {/* Card container section */}
          <div className="p-3">
            {products.map((item) => {
              return (
                <ProductCard
                  key={item._id}
                  image={item.image}
                  title={item.name}
                  price={item.price}
                  _id={item._id}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
