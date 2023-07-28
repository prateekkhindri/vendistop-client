import React, { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { SubmitButton, VerificationBanner } from "../../components";
import { requestOTP } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { EmailContext } from "../../context/EmailContext.js";

const PasswordResetEmail = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [otpRequestSuccess, setOtpRequestSuccess] = useState(false);

  const { setEmail: setSharedEmail } = useContext(EmailContext);

  useEffect(() => {
    if (email && otpRequestSuccess) {
      navigate("/password/reset");
    }
  }, [email, otpRequestSuccess, navigate]);

  const handleOtpRequest = async (e) => {
    e.preventDefault();

    const responsePromise = requestOTP({ email });

    toast.promise(responsePromise, {
      pending: "Please wait ...",
    });

    const { status, message } = await responsePromise;
    toast[status](message);

    if (status === "success") {
      setSharedEmail(email); // Set email in context
      setOtpRequestSuccess(true);
    }
  };

  return (
    <>
      <section className="min-h-screen flex-col justify-center items-center bg-[#FDF9FF]">
        <VerificationBanner />
        <div className="flex flex-col items-center px-7">
          <h1 className="pt-[34px] text-xl font-bold text-[#4C00B0]">
            Forgot your password ?
          </h1>
          <p className="pt-2 text-center text-sm font-normal text-[#ADADAD] leading-5">
            Please enter your email to reset your password
          </p>
        </div>
        <form
          className="flex flex-col items-center justify-center mt-12 group"
          onSubmit={handleOtpRequest}
        >
          <div className="flex items-center justify-center py-2 px-8 border-2 border-gray-400 bg-[#F8F8F8] rounded-full group-focus-within:border-[#4C00B0]">
            <div className="pr-4">
              <Icon icon="ic:baseline-email" className="text-[#4C00B0]" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-xs text-[#ADADAD]">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm font-medium transition-all bg-transparent outline-none focus:scale-95 placeholder:font-normal "
              />
            </div>
          </div>
          <SubmitButton btnContent={"Request OTP"} type="submit" />
        </form>
      </section>
    </>
  );
};

export default PasswordResetEmail;
