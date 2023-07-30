import React from "react";
// import link for routing
import { Link } from "react-router-dom";
// import static images
import { images } from "../../../constants/index";
// import circle decorations icon images
import heroMobileCirle from "../../../assets/svg_banner/hero_mobile_circle.svg";
import heroDesktopCirle from "../../../assets/svg_banner/hero_desktop_circle.svg";

export const SlideBanner = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div
        className={`bg-[#A35DFF] relative text-white mx-3 rounded-[20px] overflow-hidden mt-10`}
      >
        <div className="relative flex flex-col items-center justify-between md:px-8 lg:px-14 md:pt-5 md:flex-row">
          <img
            src={heroMobileCirle}
            alt="circle"
            className="absolute lg:hidden -left-3 -bottom-16"
          />
          <img
            src={heroDesktopCirle}
            alt="circle"
            className="absolute hidden lg:block left-1/3 -bottom-28"
          />
          <div className="px-2 hero_title_section">
            <div className="flex flex-col justify-start">
              <h1 className="mt-6 text-2xl font-extrabold leading-9 text-center uppercase md:text-left lg:text-4xl xl:text-5xl">
                Unlock Your Style
              </h1>
              <p className="mt-2 lg:mt-4 text-xs lg:text-base max-w-[477px] font-normal leading-4 text-center md:text-left">
                Embrace Your Individuality with Our Wide Selection of Unique and
                Trendy Products!
              </p>
            </div>
            <div className="flex items-center justify-center mt-4 mb-8 md:justify-start lg:mt-6">
              <Link
                to={"/products"}
                className="text-center bg-[#2C2C2C] hover:bg-[#414141] text-xs lg:text-base font-semibold leading-4 py-2 lg:py-3 px-5 lg:px-8 rounded-full"
              >
                See More
              </Link>
            </div>
          </div>
          <div className="flex">
            <img
              className="object-cover md:hidden w-[239px] h-[217px]"
              src={images.cuteWoman}
              alt="hero_person"
            />
            <img
              className="hidden z-[1] object-cover md:block lg:mt-8"
              src={images.cuteWomanBig}
              alt="hero_person"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
