import React from "react";

import upload from "../../../assets/icons/upload.png";

export const UploadImage = () => {
  return (
    <form>
      <div className="flex flex-col items-center justify-center p-10 mb-4 bg-white rounded-xl">
        <div className="p-3">
          <img src={upload} alt="profile" />
        </div>
        <div className="mb-3 bg-[#4C00B0] py-2 px-3 text-white rounded-lg font-semibold cursor-pointer">
          <label className="cursor-pointer" htmlFor="img">
            Upload Image
          </label>
          <input
            required
            className="hidden"
            type="file"
            id="img"
            name="img"
            accept="image/*"
          />
        </div>
        <div className="text-center text-[#969696] text-base">
          <p>Supported formats: png,jpg,jpeg</p>
          <p>Max size: 16MB allowed</p>
        </div>
      </div>
    </form>
  );
};
