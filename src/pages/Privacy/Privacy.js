import React from "react";
import { privacyPolicyData } from "../../constants/privacyPolicyData";

import { Footer, Rules } from "../../components";

const Privacy = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-[#4C00B0] lg:text-2xl xl::pt-10 p-6 text-xl leading-8 font-bold">
          Privacy & Policy
        </h1>
        {privacyPolicyData.map((data) => {
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

export default Privacy;
