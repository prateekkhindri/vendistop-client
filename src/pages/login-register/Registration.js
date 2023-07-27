import React from "react";
import { RegistrationForm } from "../../components";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Registration = () => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <Link to={"/"}>
          <div className="flex items-center py-9">
            <Icon icon="pajamas:go-back" />
            <span className="pl-3">Go Home</span>
          </div>
        </Link>
      </div>
      <RegistrationForm />
    </div>
  );
};

export default Registration;
