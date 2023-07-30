import React from "react";

import stripe from "../../assets/logos/stripe.png";
import { Link } from "react-router-dom";
import LogoFooter from "../../assets/logos/logo-footer.png";

export const Footer = () => {
  return (
    <div className="bg-[#4C00B0] text-white pt-5">
      <div className="grid max-w-screen-xl grid-cols-1 p-5 mx-auto xl:items-start xl:place-items-center sm:grid-cols-2 md:grid-cols-3 xs:gap-x-3 gap-y-4 lg:grid-cols-4 lg:py-10">
        <div className="logo-container">
          <div className="logo">
            <div>
              <img className="h-[25px]" src={LogoFooter} alt="logo_footer" />
            </div>
            <div className="pr-3 my-2 text-xs font-normal lg:text-sm">
              <p>
                Explore millions of products across diverse categories at
                competitive prices. Enjoy secure transactions, easy returns, and
                world-class customer service. With VendiStop, discover more than
                just shopping
              </p>
            </div>
          </div>
          <div className="">
            <img src={stripe} className="h-[40px]" alt="strapi" />
          </div>
        </div>
        <div className="title">
          <h1 className="text-base font-semibold lg:text-lg">Pages</h1>
          <ul className="my-2 text-xs font-normal">
            <li className="py-1 md:py-2 lg:text-base">
              <Link to={"/profile"}>Account</Link>
            </li>
            <li className="py-1 md:py-2 lg:text-base">
              <Link to={"/products"}>Products</Link>
            </li>
            <li className="py-1 md:py-2 lg:text-base">
              <Link to={"/wishlist"}>Wishlist</Link>
            </li>
            <li className="py-1 md:py-2 lg:text-base">
              <Link to={"/cart"}>Shopping Cart</Link>
            </li>
          </ul>
        </div>
        <div className="privacy">
          <h1 className="text-base font-semibold lg:text-lg">Terms</h1>
          <ul className="my-2 text-xs font-normal">
            <li className="py-1 md:py-2 lg:text-base">
              <Link to={"/terms"}>Terms & Conditions</Link>
            </li>
            <li className="py-1 md:py-2 lg:text-base">
              <Link to={"/privacy"}>Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className="Contacts">
          <h1 className="text-base font-semibold lg:text-lg">Contact</h1>
          <ul className="my-2 text-xs font-normal">
            <li className="py-1 md:py-2 lg:text-base">
              <label htmlFor="emails">Email</label>
              <p id="emails">info@vendistop.com</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
