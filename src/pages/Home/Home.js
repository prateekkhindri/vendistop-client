import React from "react";
import { HomeSlider } from "../../components/HomeSlider/HomeSlider";
import { TrendingProducts } from "../../components";
import { Footer } from "../../components";
const Home = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <HomeSlider />
        <TrendingProducts />
      </div>
      <Footer />
    </>
  );
};
export default Home;
