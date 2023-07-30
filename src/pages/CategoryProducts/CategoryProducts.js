import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { Footer, ProductCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../categories/categoryAction";

const CategoryProducts = () => {
  const { catId } = useParams();

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.productStore);

  const { categories } = useSelector((state) => state.categoriesStore);

  // Find the selected category
  const selectedCategory = categories.find(
    (category) => category._id === catId
  );

  // Filter the products as per their category
  const filteredProducts = products.filter(
    (product) => product.catId === catId
  );

  useEffect(() => {
    catId && dispatch(getCategoriesAction());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!filteredProducts) {
    return (
      <section className="flex items-center justify-center h-screen">
        Product not found
      </section>
    );
  }

  return (
    <>
      <div>
        <div className="pt-1 pb-10 mx-auto">
          <div className="bg-[#4C00B0] text-white py-10 xl:py-16 mb-5">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold uppercase">
                {selectedCategory?.name}
              </h1>
              <p className="mt-4 text-xs text-center">
                Embrace Your Individuality with Our Wide Selection of Unique and
                Trendy Products!
              </p>
            </div>
          </div>
          <div className="grid max-w-screen-xl grid-cols-1 mx-auto my-12 xss:grid-cols-2 xs:px-2 xsm:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-x-3">
            {filteredProducts.map((product) => {
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
      </div>
      <Footer />
    </>
  );
};

export default CategoryProducts;
