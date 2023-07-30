import React, { useEffect } from "react";
//import useParams
import { useParams } from "react-router-dom";
//import product context
//import icons
import { Icon } from "@iconify/react";
// import cart context
import { Footer } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProductAction } from "../upload-product/productAction";
import { addProductToWishlist } from "../Wishlist/wishlistAction";
import { addProductToCart } from "../Cart/cartAction";

const ProductDetails = () => {
  //get the product id from the url
  const { _id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    _id && dispatch(fetchSingleProductAction(_id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { selectedProduct } = useSelector((state) => state.productStore);

  if (!selectedProduct) {
    return (
      <section className="flex items-center justify-center h-screen">
        Loading...
      </section>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <div className="flex items-center justify-center py-10 bg-white">
            <div className="max-w-screen-xl px-4 mx-auto md:px-8">
              <div className="grid gap-8 md:grid-cols-2">
                {/* <!-- images - start --> */}
                <div className="grid gap-4 lg:grid-cols-5">
                  {/* Bigger image */}
                  <div className="relative overflow-hidden bg-gray-100 rounded-sm lg:col-span-4">
                    <img
                      src={selectedProduct.image}
                      loading="lazy"
                      alt=""
                      className="object-cover object-center w-full h-full"
                    />
                  </div>
                </div>
                {/* <!-- images - end --> */}

                {/* <!-- content - start --> */}
                <div className="md:py-8 lg:pl-10">
                  {/* <!-- name - start --> */}
                  <div className="pb-4 mb-2 border-b md:mb-3">
                    <h2 className="text-xl font-semibold text-[#2C2C2C] lg:text-xl">
                      {selectedProduct.name}
                    </h2>
                    <span className="mb-0.5 mt-3 inline-block text-xs text-gray-500">
                      {selectedProduct.description}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-end gap-2">
                      <span className="text-xl font-bold text-[#4C00B0] md:text-2xl">
                        ${selectedProduct.price}
                      </span>
                    </div>
                  </div>
                  {/* <!-- price - end -->

                  <!-- buttons - start --> */}
                  <div className="lg:w-full flex flex-col lg:flex-row lg:justify-center lg:items-center gap-2.5">
                    <button
                      onClick={() => dispatch(addProductToCart(_id, 1))}
                      className="lg:w-[50%] flex justify-center items-center flex-1 rounded-md bg-[#4C00B0] px-8 py-4 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base"
                    >
                      <Icon
                        icon={"ic:baseline-shopping-bag"}
                        className="mr-2 text-xl"
                      />
                      ADD TO CART
                    </button>

                    <button
                      onClick={() => dispatch(addProductToWishlist(_id))}
                      className="lg:w-[50%] flex justify-center items-center rounded-md border bg-white border-[#EBEBEB] px-8 py-4 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
                    >
                      <Icon
                        icon={"mdi:cards-heart-outline"}
                        className="mr-2 text-xl"
                      />
                      WISHLIST
                    </button>
                  </div>
                  {/* <!-- buttons - end --> */}
                  <div className="w-full mt-10">
                    <h1 className="text-[#2C2C2C] font-semibold text-lg mb-4">
                      Product Details
                    </h1>

                    <div className=" text-[#696969] font-normal text-sm">
                      <p>{selectedProduct.details}</p>
                    </div>
                  </div>
                </div>
                {/* <!-- content - end --> */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProductDetails;
