import React, { useEffect } from "react";
import { LoginForm } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { autoAdminLogin } from "./loginRegisterAction";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.adminUser);

  useEffect(() => {
    !user._id && dispatch(autoAdminLogin());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Link to={"/"}>
        <div className="flex items-center py-9">
          <Icon icon="pajamas:go-back" />
          <span className="pl-3">Go Home</span>
        </div>
      </Link>
      <LoginForm />
    </div>
  );
};

export default Login;
