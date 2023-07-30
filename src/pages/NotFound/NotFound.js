import React from "react";
import NotFoundImage from "../../assets/svg_banner/not-found.svg";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Footer } from "../../components";

const NotFound = () => {
  return (
    <>
      <div className="bg-white min-h-[100vh]">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center h-[92vh]">
            <div className="">
              <h1 className="text-5xl font-extrabold text-center">Oops!</h1>
              <p className="text-lg font-extrabold text-center py-7">
                You are lost
              </p>
            </div>
            <div className="flex">
              <img src={NotFoundImage} alt="Not_found_image" />
            </div>
            <Link to={"/"}>
              <div className="flex items-center py-9">
                <Icon icon="pajamas:go-back" />
                <span className="pl-3">Go Home</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
