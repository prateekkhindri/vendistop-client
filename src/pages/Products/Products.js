import React, { useEffect } from "react";
import { ProductCard, Footer } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../upload-product/productAction";

const Products = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.productStore);

  useEffect(() => {
    !products.length && dispatch(fetchProductsAction());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="bg-[#4C00B0] text-white py-10 xl:py-16">
          <div className="flex flex-col items-center justify-center max-w-screen-xl mx-auto">
            <h1 className="text-2xl font-bold uppercase">Products</h1>
            <p className="mt-4 text-xs text-center">
              Embrace Your Individuality with Our Wide Selection of Unique and
              Trendy Products!
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <label className="text-lg md:text-2xl text-[#ADADAD]">
              No products to show
            </label>
          </div>
        ) : (
          <div className="grid max-w-screen-xl grid-cols-1 mx-auto my-12 xss:grid-cols-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-4">
            {products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  _id={product._id}
                  image={product.image}
                  title={product.name}
                  price={product.price}
                />
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
