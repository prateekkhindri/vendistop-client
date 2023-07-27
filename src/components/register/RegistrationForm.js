import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postAdminUser } from "../../helpers/axiosHelper";

export const RegistrationForm = () => {
  const navigate = useNavigate();

  // Local state to grab and store the form data
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    // We do not have a confirmPassword in our schema,
    // so we destructure it out
    const { confirmPassword, ...rest } = form;
    const { status, message } = await postAdminUser(rest);

    toast[status](message);

    status === "success" && navigate("/login");
  };

  return (
    <div className="flex items-center justify-center bg-[#FDF9FF] min-h-screen">
      <div className="w-full p-6 mx-3 lg:mt-0 mt-10 overflow-hidden md:w-2/5 lg:w-2/5 card-shadow rounded-3xl max-w-[400px]">
        {/* Title section */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-xl leading-8 text-[#4C00B0]">
            Registration
          </h1>
          <p className="font-normal text-xs leading-4 text-[#ADADAD]">
            Create your Vendistop Account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <fieldset className="mt-1 ">
            {/* Name input section */}
            <div className="input_container">
              <div className="flex flex-col items-start justify-center">
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:text-base mt-5 text-[#ADADAD] font-normal text-xs leading-4 mb-1">
                  First Name
                </label>
                <input
                  className="transition-all focus:border-[#4C00B0] w-full bg-[#F8F8F8] outline-none border-[#EBEBEB] rounded-3xl px-5 text-xs py-3 border text-[#2C2C2C] font-medium leading-5"
                  required
                  placeholder="Enter first name"
                  type="text"
                  name="fName"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input_container">
              <div className="flex flex-col items-start justify-center">
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:text-base mt-5 text-[#ADADAD] font-normal text-xs leading-4 mb-1">
                  Last Name
                </label>
                <input
                  className="transition-all focus:border-[#4C00B0] w-full bg-[#F8F8F8] outline-none border-[#EBEBEB] rounded-3xl px-5 text-xs py-3 border text-[#2C2C2C] font-medium leading-5"
                  required
                  placeholder="Enter last name"
                  type="text"
                  name="lName"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email input section */}
            <div className="flex flex-col items-start justify-center ">
              <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:text-base mt-5 text-[#ADADAD] font-normal text-xs leading-4 mb-1">
                Email
              </label>
              <input
                className="transition-all focus:border-[#4C00B0] w-full bg-[#F8F8F8] outline-none border-[#EBEBEB] rounded-3xl px-5 text-xs py-3 border text-[#2C2C2C] font-medium leading-5"
                required
                placeholder="Enter your email"
                type="email"
                name="email"
                onChange={handleChange}
              />
            </div>

            {/* password section */}
            <div className="input_container">
              <div className="flex flex-col items-start justify-center">
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:text-base mt-5 text-[#ADADAD] font-normal text-xs leading-4 mb-1">
                  Password
                </label>
                <input
                  className="transition-all focus:border-[#4C00B0] w-full bg-[#F8F8F8] outline-none border-[#EBEBEB] rounded-3xl px-5 text-xs py-3 border text-[#2C2C2C] font-medium leading-5"
                  required
                  placeholder="*******"
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            {/*Retype password section */}
            <div className="input_container">
              <div className="flex flex-col items-start justify-center">
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:text-base mt-5 text-[#ADADAD] font-normal text-xs leading-4 mb-1">
                  Confirm Password
                </label>
                <input
                  className="transition-all focus:border-[#4C00B0] w-full bg-[#F8F8F8] outline-none border-[#EBEBEB] rounded-3xl px-5 text-xs py-3 border text-[#2C2C2C] font-medium leading-5"
                  required
                  placeholder="*******"
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Terms and Condition Section */}
            <div className="flex items-center justify-center mt-5">
              <div className="checkbox-wrapper-12">
                <div className="cbx">
                  <input required id="cbx-12" type="checkbox" />
                  <label htmlFor="cbx-12"></label>
                  <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
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
              <span className="text-[10px] md:text-md md:pl-1 pl-2 font-normal text-[#adadad]">
                By signing up, you agree to
              </span>
              <Link
                to={"/terms"}
                className="text-[#2C2C2C] text-[10px] underline"
              >
                {" "}
                Terms & Conditions
              </Link>
            </div>
          </fieldset>
          <div className="flex items-center justify-center w-full mt-8 ">
            <button
              className="bg-[#4C00B0] text-white px-5 py-3 text-center rounded-3xl font-medium text-sm hover:opacity-75"
              type="submit"
            >
              Create Account
            </button>
          </div>
          <div className="flex items-center justify-center mt-5">
            <span className="text-xs md:text-md font-normal text-[#adadad]">
              Already have an account?
            </span>
            <Link
              to={"/login"}
              className="flex justify-center items-center font-semibold text-[#4C00B0] text-xs underline pl-1"
            >
              {"  "}
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
