import React from "react";

import { termsConditionsData } from "../../constants/termsConditionsData";
import { Footer, Rules } from "../../components";

const TermsConditions = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-[#4C00B0] lg:text-2xl xl::pt-10 p-6 text-xl leading-8 font-bold">
          Terms & Conditions
        </h1>
        {termsConditionsData.map((data) => {
          return (
            <Rules
              key={data.id}
              title={data.title}
              description={data.description}
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default TermsConditions;
