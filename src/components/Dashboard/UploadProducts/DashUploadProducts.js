import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postProductAction,
  updateProductAction,
} from "../../../pages/upload-product/productAction";
import UploadImage from "./UploadImage";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  catId: "",
  description: "",
  price: "",
  topProduct: false,
  details: "",
};

export const DashUploadProducts = () => {
  const categorySelector = useRef(null);
  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState(null);

  const { selectedProduct } = useSelector((state) => state.productStore);

  // Pull the list of categories from the redux store to display in the drop down
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categoriesStore);

  useEffect(() => {
    setForm({
      name: selectedProduct.name,
      catId: selectedProduct.catId,
      description: selectedProduct.description,
      price: selectedProduct.price,
      topProduct: selectedProduct.topProduct,
      details: selectedProduct.details,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct._id]);

  const handleChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "topProduct") {
      value = checked;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image && !selectedProduct._id) {
      toast.error("Please upload an image");
      return;
    }

    if (!image && selectedProduct._id) {
      toast.error("Please upload a new image");
      return;
    }

    const formData = new FormData();

    for (const key in form) {
      if (key === "topProduct") {
        formData.append(key, (form[key] ?? false).toString());
      } else {
        formData.append(key, form[key]);
      }
    }

    if (image) {
      formData.append("image", image);
    }

    selectedProduct._id
      ? dispatch(updateProductAction(formData, selectedProduct._id))
      : dispatch(postProductAction(formData));

    setForm(initialState);
    setImage("");
    categorySelector.current.value = "";
  };

  return (
    <div className="flex items-center justify-center w-full mt-4 bg-white rounded-xl">
      <form className="w-full p-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5">
          {/* Title */}
          <div className="flex flex-col">
            <label
              className="text-xs lg:text-base font-normal text-[#ADADAD]"
              htmlFor="text"
            >
              Title
            </label>
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="bg-[#F8F8F8] py-3 lg:py-4 rounded-2xl text-sm px-4 border border-[#EBEBEB] outline-none focus:border-[#4C00B0] transition mt-2"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col sm:col-span-1 mt-5">
            <label
              className="text-xs lg:text-base font-normal text-[#ADADAD]"
              htmlFor="state"
            >
              Category
            </label>
            <select
              type="text"
              ref={categorySelector}
              name="catId"
              required
              value={form.catId}
              onChange={handleChange}
              className="bg-[#F8F8F8] py-3 lg:py-4 rounded-2xl text-sm px-4 border border-[#EBEBEB] outline-none focus:border-[#4C00B0] transition mt-2"
            >
              <option value="" className="pl-3 text-[#ADADAD]">
                {" "}
                - Choose a category -{" "}
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col ">
            <label
              className="text-xs lg:text-base font-normal text-[#ADADAD]"
              htmlFor="description"
            >
              Description
            </label>
            <input
              required
              type="text"
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter your descriptions"
              className="bg-[#F8F8F8] py-3 lg:py-4 rounded-2xl text-sm px-4 border border-[#EBEBEB] outline-none focus:border-[#4C00B0] transition mt-2"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col ">
            <label
              className="text-xs lg:text-base font-normal text-[#ADADAD]"
              htmlFor="price"
            >
              Price
            </label>
            <input
              required
              type="number"
              name="price"
              id="price"
              value={form.price}
              onChange={handleChange}
              placeholder="$  00.00"
              className="spin-button-none bg-[#F8F8F8] py-3 lg:py-4 rounded-2xl text-sm px-4 border border-[#EBEBEB] outline-none focus:border-[#4C00B0] transition mt-2"
            />
          </div>
        </div>
        {/* Upload Image section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:place-items-center">
          {/* Bigger Image upload */}
          <div className="w-full py-5">
            <UploadImage
              selectedProductImage={selectedProduct.image}
              image={image}
              setImage={setImage}
            />
          </div>
        </div>

        <div>
          {/* Top Product section */}
          <div className="flex items-center justify-start my-6">
            <div className="mr-2 checkbox-wrapper-12">
              <div className="cbx">
                <input
                  id="cbx-12"
                  type="checkbox"
                  name="topProduct"
                  checked={form.topProduct}
                  onChange={handleChange}
                />
                <label htmlFor="cbx-12"></label>
                <svg width="14" height="13" viewBox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>

              <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="goo-12">
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="4"
                      result="blur"
                    ></feGaussianBlur>
                    <feColorMatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                      result="goo-12"
                    ></feColorMatrix>
                    <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
                  </filter>
                </defs>
              </svg>
            </div>
            <h2 className="text-[#2C2C2C] text-sm md:text-base font-semibold">
              Top Product
            </h2>
          </div>

          {/* Product Details section */}
          <div className="w-full">
            <label
              htmlFor="product-description"
              className="text-[#ADADAD] text-lg"
            >
              Product Details
            </label>
            <textarea
              name="details"
              id="product-description"
              value={form.details}
              onChange={handleChange}
              placeholder="Enter your products details"
              className="bg-[#F8F8F8] p-3 w-full rounded-lg text-sm text-[#2c2c2c] font-medium resize-y mt-3 transition h-48 outline-none border-2 focus:border-[#4C00B0] border-[#EBEBEB]"
            />
          </div>
        </div>

        <div className="flex justify-start w-full">
          <button
            className="shadow-lg hover:bg-opacity-80 active:shadow-none bg-[#4C00B0] text-white rounded-full px-14 py-3"
            type="submit"
          >
            {selectedProduct._id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};
