import React from "react";
import { Outlet } from "react-router-dom";

import { AsideProfile } from "../../../components/UserInfo/UserInfo";

const Profile = () => {
  return (
    <div className="max-w-screen-xl px-3 mx-auto my-10">
      <div className="grid min-h-[calc(100vh-153px)] grid-cols-1 lg:grid-cols-4 lg:gap-4">
        <div className="hidden lg:block lg:row-span-1">
          <AsideProfile />
        </div>
        <div className="lg:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
