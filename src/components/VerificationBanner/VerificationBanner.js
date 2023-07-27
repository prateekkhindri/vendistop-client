import React from "react";
import { images } from "../../constants";

export const VerificationBanner = () => {
  return (
    <div className="flex justify-center items-end overflow-hidden relative before:absolute before:bottom-0 before:left-2/4 before:translate-x-[-50%] before:w-[829px] before:h-[264px] sm:before:w-[1903px] sm:before:h-[420px] 2xl:before:w-[300rem] 2xl:before:h-[90rem] before:bg-[#F9ECFF] before:rounded-[50%] before:origin-bottom pt-8">
      <img
        className="z-[1] sm:h-[13rem]"
        src={images.accountVerifyBanner}
        alt="verify_image"
        draggable="false"
      />
    </div>
  );
};
