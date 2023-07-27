import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../pages/login-register/loginRegisterAction";

export const LoginForm = () => {
  const [form, setForm] = useState({});

  const [passwordShown, setPasswordShown] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { user } = useSelector((state) => state.adminUser);

  // console.log(location);          // Check the console to see the users location i.e the page they are coming from
  const origin =
    (location.state && location.state.from && location.state.from.pathname) ||
    "/";

  useEffect(() => {
    user?._id && navigate(origin);
  }, [user, navigate]);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginAction(form));
  };

  return (
    <div className="flex items-start lg:items-center justify-center overflow-hidden bg-[#FDF9FF] min-h-screen">
      <div className="mt-10 lg:mt-0 card-shadow rounded-3xl px-4 lg:w-[400px] pb-8">
        <div className="leading-8 text-center mt-9">
          <h1 className="text-[#4C00B0] text-xl lg:text-2xl font-bold">
            Login
          </h1>
          <p className="text-[#ADADAD] text-xs leading-4 pt-2 font-normal">
            For the process login into your account.
          </p>
        </div>
        <form className="login_input_section_wrapper" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center mt-12 group is-email is-password">
            {/* Email section */}
            <div className="flex items-center justify-center py-2 lg:py-4 px-8 lg:px-8 border-2 border-transparent bg-[#F8F8F8] rounded-full group-[.is-email]:focus-within:border-[#4C00B0]">
              <div className="pr-4 text-[#ADADAD]">
                <Icon
                  icon="ic:baseline-email"
                  className="text-lg text-[#4C00B0]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="eml" className="text-xs text-[#ADADAD] lg:px-4">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  required
                  className="text-sm font-medium transition-all bg-transparent outline-none lg:px-4 focus:scale-95 placeholder:font-normal"
                  onChange={handleChange}
                />
              </div>
              {/* Just for making the inputs width same, no need to change anyting here. Don't get confused */}
              <div className="flex items-center justify-center invisible">
                <Icon
                  icon="mingcute:safe-lock-fill"
                  className="text-[#ADADAD] text-lg"
                />
              </div>
            </div>

            {/* Password input section */}
            <div className="flex items-center justify-center mt-4 py-2 lg:py-4 px-8 lg:px-8 border-2 border-transparent bg-[#F8F8F8] rounded-full group-[.is-password]:focus-within:border-[#4C00B0]">
              <div className="pr-4">
                <Icon
                  icon="mingcute:safe-lock-fill"
                  className="text-[#4C00B0] text-lg"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="log-pass"
                  className="lg:px-4 text-xs text-[#ADADAD]"
                >
                  Password
                </label>
                <input
                  name="password"
                  type={passwordShown ? "text" : "password"}
                  value={form.password || ""}
                  placeholder="Enter your password"
                  required
                  className="text-sm font-medium transition-all bg-transparent outline-none lg:px-4 focus:scale-95 placeholder:font-normal"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-center cursor-pointer">
                <Icon
                  onClick={togglePassword}
                  icon={
                    passwordShown
                      ? "ant-design:eye-filled"
                      : "ant-design:eye-invisible-filled"
                  }
                  className="text-[#ADADAD] text-lg lg:text-xl"
                />
              </div>
            </div>

            {/* Remember check box */}
            <div className="relative flex items-center self-start px-5 pt-4 lg:px-10">
              <div className="checkbox-wrapper-12">
                <div className="cbx">
                  <input id="cbx-12" type="checkbox" />
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
              <label className="text-[#2C2C2C] text-xs font-semibold pl-2">
                Remember me
              </label>
            </div>

            {/* Login button */}
            <div className="flex items-center justify-center w-full mt-10 ">
              <button
                className="bg-[#4C00B0] text-white px-10 py-3 text-center rounded-3xl font-medium text-sm hover:opacity-75"
                type="submit"
              >
                Login
              </button>
            </div>

            {/* Forgot password */}
            <div className="flex flex-col items-center text-xs mt-11">
              <Link to={"/password/email"} className="font-medium">
                Forgot Password
              </Link>
              <span className="flex items-center justify-center pt-2">
                <p className="font-normal text-[#ADADAD] pr-1">
                  Haven't any account?
                </p>
                <Link to={"/signup"} className="font-semibold text-[#4C00B0]">
                  {" "}
                  Create Account
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
