import React, { useEffect } from "react";
// import link for routing
import { Link } from "react-router-dom";
// import product card
import { ProductCard } from "../ProductCard/ProductCard";
// import product context
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../../pages/upload-product/productAction";

export const TrendingProducts = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.productStore);

  const topProducts = products.filter((item) => item.topProduct === true);

  useEffect(() => {
    !topProducts.length && dispatch(fetchProductsAction());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-screen-xl min-h-screen mx-auto my-12">
      <div className="flex items-center justify-between w-full px-3">
        <h3 className="text-[#595858] font-bold text-xl leading-8 ">
          Top Products
        </h3>
        <Link
          className="text-[#4C00B0] underline text-base  leading-6 font-semibold"
          to={"/products"}
        >
          See More
        </Link>
      </div>
      <div className="grid grid-cols-1 xss:grid-cols-2 xs:px-2 xsm:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-3">
        {topProducts.map((product) => {
          return (
            <ProductCard
              key={product._id}
              _id={product._id}
              image={product.image}
              title={product.name}
              price={product.price}
            />
          );
        })}
      </div>
    </div>
  );
};
