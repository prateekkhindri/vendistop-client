import React, { useContext, useState } from "react";
import { resetPassword } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { EmailContext } from "../../context/EmailContext.js";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  otp: "",
  password: "",
  confirmPassword: "",
};

export const ResetPassword = () => {
  const navigate = useNavigate();

  const { email } = useContext(EmailContext);

  const [form, setForm] = useState(initialState);

  const [error, setError] = useState("");

  const [disableBtn, setDisableBtn] = useState(true);

  const handleChange = (e) => {
    let { name, value } = e.target;

    let hasError = "";

    if (name === "password" || name === "confirmPassword") {
      setError("");

      !disableBtn && setDisableBtn(true);
    }

    setForm({
      ...form,
      [name]: value,
    });

    if (name === "confirmPassword") {
      const { password } = form;

      if (password !== value) {
        hasError = "Passwords do not match";
      }

      if (password.length < 6) {
        hasError = "Password must be a minimum of 6 characters";
      }

      if (!/[a-z]/.test(password)) {
        hasError = "Password must contain lowercase characters";
      }

      if (!/[A-Z]/.test(password)) {
        hasError = "Password must contain an uppercase character";
      }

      if (!/[0-9]/.test(password)) {
        hasError = "Password must contain a number";
      }

      if (!password) {
        hasError = "New password must be provided";
      }

      setError(hasError);
      !hasError && setDisableBtn(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;

    const responsePromise = resetPassword({ ...rest, email });

    toast.promise(responsePromise, {
      pending: "Please wait ...",
    });

    const { status, message } = await responsePromise;

    toast[status](message);

    if (status === "success") {
      setForm(initialState);
      navigate("/login");
    }

    setDisableBtn(true);
  };

  return (
    <div className="flex items-center justify-center bg-[#FDF9FF] min-h-screen">
      <div className="w-full px-6 py-10 xl:py-12 mx-3 mt-10 overflow-hidden card-shadow rounded-3xl max-w-[542px]">
        {/* Title section */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-xl transition-all duration-300 xl:text-3xl leading-8 text-[#4C00B0] ">
            Reset your password
          </h1>
          <p className="transition-all duration-300 mt-2 xl:mt-5 font-normal text-xs xl:text-sm leading-4 text-center text-[#ADADAD]">
            New password must be different from the previous used passwords
          </p>

          <Link to={"/password/email"}>
            <button className="pt-[16px] font-medium text-sm leading-[18px] underline text-[#4C00B0]">
              Resend OTP
            </button>
          </Link>
        </div>
        <form className="transition-all duration-300" onSubmit={handleSubmit}>
          {/* OTP Section */}
          <div className="flex flex-col items-start justify-center group/item">
            <label className=" mt-5 text-[#ADADAD] font-normal text-xs lg:text-sm leading-4 mb-1 transition-all duration-300">
              OTP
            </label>
            <div className="transition-all duration-300 flex items-center justify-center  w-full overflow-hidden bg-[#F8F8F8] group-focus-within/item:border-[#4C00B0] border-[#EBEBEB] rounded-2xl px-5 text-xs border ">
              <input
                className="w-full h-full py-3 font-medium leading-5 outline-none xl:py-5 xl:text-base text-[#2C2C2C] bg-transparent"
                required
                type="number"
                placeholder="123456"
                name="otp"
                value={form.otp}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* password section */}

          <div className="flex flex-col items-start justify-center group/item">
            <label className=" mt-5 text-[#ADADAD] font-normal text-xs lg:text-sm leading-4 mb-1 transition-all duration-300">
              New Password
            </label>
            <div className="transition-all duration-300 flex items-center justify-center  w-full overflow-hidden bg-[#F8F8F8] group-focus-within/item:border-[#4C00B0] border-[#EBEBEB] rounded-2xl px-5 text-xs border ">
              <input
                className="w-full h-full py-3 font-medium leading-5 outline-none xl:py-5 xl:text-base text-[#2C2C2C] bg-transparent"
                required
                placeholder="Enter password"
                type={"password"}
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/*Retype password section */}

          <div className="flex flex-col items-start justify-center group/sinput">
            <label className="mt-5 text-[#ADADAD] font-normal text-xs xl:text-sm leading-4 mb-1 lg:mb-2 transition-all duration-300">
              Confirm Password
            </label>
            <div className="transition-all duration-300 flex items-center just  w-full overflow-hidden bg-[#F8F8F8] border-[#EBEBEB] rounded-2xl px-5 text-xs border group-focus-within/sinput:border-[#4C00B0]">
              <input
                className="w-full h-full py-3 font-medium leading-5 outline-none xl:py-5 xl:text-base text-[#2C2C2C] bg-transparent"
                required
                placeholder="Confirm password"
                type={"password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-3 text-red-500 font-bold">{error}</div>

          <div className="flex items-center justify-center w-full mt-8 ">
            <button
              className="bg-[#4C00B0] text-white px-5 py-3 xl:py-4 text-center rounded-3xl font-medium text-sm hover:opacity-75"
              type="submit"
              disabled={disableBtn}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
