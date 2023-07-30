import React from "react";

import {
  UserDetails,
  UpdatePassword,
} from "../../../components/UserInfo/UserInfo";

const EditProfile = () => {
  return (
    <div>
      <h1 className="text-[#515050] text-xl font-bold">Edit Profile</h1>
      <UserDetails />
      <UpdatePassword />
    </div>
  );
};

export default EditProfile;
