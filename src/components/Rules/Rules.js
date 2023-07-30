import React from "react";

export const Rules = ({ title, description }) => {
  return (
    <div className="py-6">
      <div className="p-6 mx-5 text-left bg-white shadow-sm lg:p-8 rounded-xl">
        <div className="rules_title">
          <h2 className="text-[#2c2c2c] text-base xl:text-xl font-bold">
            {title}
          </h2>
        </div>
        <div className="text-[#696969] text-xs xl:text-lg pl-2 leading-4 font-normal pt-3">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
