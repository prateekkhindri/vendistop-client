import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateAdminPassword } from "../../../helpers/axiosHelper.js";

const initialState = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};
export const UpdatePassword = () => {
  const [form, setForm] = useState(initialState);

  const [error, setError] = useState("");

  const [disableBtn, setDisableBtn] = useState(true);

  const { user } = useSelector((state) => state.adminUser);

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

    // console.log(form);

    const { confirmPassword, ...rest } = form;
    // const result = await updateAdminPassword({ ...rest, email: user.email });

    const response = updateAdminPassword({ ...rest, email: user.email });

    toast.promise(response, {
      pending: "Please wait ...",
    });

    const { status, message } = await response;

    toast[status](message);

    status === "success" && setForm(initialState);
    setDisableBtn(true);
  };

  return (
    <div className="flex justify-center items-center bg-white w-full rounded-xl mt-4">
      <form className="w-full p-4" onSubmit={handleSubmit}>
        <div className="mb-5 text-[#515050] font-bold text-base lg:text-lg">
          <h1>Update Password</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Current password */}
          <div className="flex flex-col ">
            <label
              className="text-xs lg:text-base font-normal text-[#ADADAD]"
              htmlFor="password"
            >
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              placeholder="********"
              value={form.currentPassword}
              onChange={handleChange}
              required
              className="bg-[#F8F8F8] py-3 lg:py-4 rounded-2xl text-sm px-4 border border-[#EBEBEB] outline-none focus:border-[#4C00B0] transition mt-2"
            />
          </div>
          {/* New password */}
          <div className="flex flex-col ">
            <label
              className="text-xs lg:text-base font-normal text-[#ADADAD]"
              htmlFor="newpassword"
            >
              New Password
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              value={form.password}
              placeholder="********"
              className="bg-[#F8F8F8] py-3 lg:py-4 rounded-2xl text-sm px-4 border border-[#EBEBEB] outline-none focus:border-[#4C00B0] transition mt-2"
            />
          </div>
          {/* Re-type password */}
          <div className="flex flex-col ">
            <label
              className="text-xs lg:text-base font-normal text-[#ADADAD]"
              htmlFor="retypepassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              onChange={handleChange}
              value={form.confirmPassword}
              placeholder="********"
              className="bg-[#F8F8F8] py-3 lg:py-4 rounded-2xl text-sm px-4 border border-[#EBEBEB] outline-none focus:border-[#4C00B0] transition mt-2"
            />
          </div>
        </div>

        <div className="mt-3 text-red-500 font-bold">{error}</div>

        <div className="mt-7">
          <button
            type="submit"
            disabled={disableBtn}
            className="bg-[#4C00B0] rounded-full py-3 lg:py-4 px-14 text-white"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};
