import React, { useEffect, useState } from "react";
import { updateAdminProfileAction } from "../../../pages/UserProfile/EditProfile/profileAction";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  fName: "",
  lName: "",
  phone: "",
  email: "",
  street: "",
  suburb: "",
  state: "",
  postcode: "",
  currentPassword: "",
};
export const UserDetails = () => {
  const [form, setForm] = useState(initialState);

  const { user } = useSelector((state) => state.adminUser);

  const dispatch = useDispatch();

  // We use useEffect to mount the user info in the db, coming in from our redux store
  useEffect(() => {
    if (user.address) {
      const addressComponents = user.address.split(",");
      if (addressComponents.length === 4) {
        setForm({
          ...user,
          street: addressComponents[0].trim(),
          suburb: addressComponents[1].trim(),
          state: addressComponents[2].trim(),
          postcode: addressComponents[3].trim(),
        });
      }
    } else {
      setForm(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      fName,
      lName,
      email,
      phone,
      street,
      suburb,
      state,
      postcode,
      currentPassword,
    } = form;

    const address = `${street},${suburb},${state},${postcode}`;

    dispatch(
      updateAdminProfileAction({
        fName,
        lName,
        email,
        phone,
        address,
        currentPassword,
      })
    );

    setForm(initialState);
  };
  return (
    <div className="flex justify-center items-center bg-white w-full rounded-xl">
      <form className="w-full p-4" onSubmit={handleSubmit}>
        <div className="mb-5 text-[#515050] font-bold text-base lg:text-lg">
          <h1>Update Profile</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/*First Name */}
          <div className="flex flex-col">
            <label
              className="text-xs lg:text-base font-normal text-[#ADADAD]"
              htmlFor="name"
            >
              First Name
            </label>
            <input
              type="text"
              name="fName"
              placeholder="First Name"
              required
              value={form.fName}
              onChange={handleChange}
              className="bg-[#F8F8F8] py-3 lg:py-4 rounded-2xl text-sm px-4 border border-[#EBEBEB] outline-none focus:border-[#4C00B0] transition mt-2"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label
              className="text-xs lg:text-base font-normal text-[#ADADAD]"
              htmlFor="femail"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lName"
              placeholder="Last Name"
              required
              value={form.lName}
              onChange={handleChange}
              className="bg-[#F8F8F8] py-3 lg:py-4 rounded-2xl text-sm px-4 border border-[#EBEBEB] outline-none focus:border-[#4C00B0] transition mt-2"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col ">
            <label
              className="text-xs lg:text-base font-normal text-[#ADADAD]"
              htmlFor="number"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              disabled
              value={form.email}
              onChange={handleChange}
              className="bg-[#F8F8F8] py-3 lg:py-4 rounded-2xl text-sm px-4 border border-[#EBEBEB] outline-none focus:border-[#4C00B0] transition mt-2"
            />
          </div>

          {/* Mobile number */}
          <div className="flex flex-col ">
            <label
              className="text-xs lg:text-base font-normal text-[#ADADAD]"
              htmlFor="city"
            >
              Mobile Number
            </label>
            <input
              type="number"
              name="phone"
              placeholder="Mobile Number"
              required
              value={form.phone}
              onChange={handleChange}
              className="bg-[#F8F8F8] py-3 lg:py-4 rounded-2xl text-sm px-4 border border-[#EBEBEB] outline-none focus:border-[#4C00B0] transition mt-2"
            />
          </div>

          {/* Street Address */}
          <div className="flex flex-col sm:col-span-2 mt-5">
            <label
              className="text-xs lg:text-base font-normal text-[#ADADAD]"
              htmlFor="address"
            >
              Street Address
            </label>
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              required
              value={form.street}
              onChange={handleChange}
              className="bg-[#F8F8F8] py-3 lg:py-4 rounded-2xl text-sm px-4 border border-[#EBEBEB] outline-none focus:border-[#4C00B0] transition mt-2"
            />
          </div>

          {/* Suburb */}
          <div className="flex flex-col sm:col-span-1 mt-5">
            <label
              className="text-xs lg:text-base font-normal text-[#ADADAD]"
              htmlFor="zip"
            >
              Suburb
            </label>
            <input
              type="text"
              name="suburb"
              placeholder="Suburb"
              required
              value={form.suburb}
              onChange={handleChange}
              className="bg-[#F8F8F8] py-3 lg:py-4 rounded-2xl text-sm px-4 border border-[#EBEBEB] outline-none focus:border-[#4C00B0] transition mt-2"
            />
          </div>

          {/* State */}
          <div className="flex flex-col sm:col-span-1 mt-5">
            <label
              className="text-xs lg:text-base font-normal text-[#ADADAD]"
              htmlFor="state"
            >
              State/Province/Region
            </label>
            <select
              type="text"
              name="state"
              required
              value={form.state}
              onChange={handleChange}
              className="bg-[#F8F8F8] py-3 lg:py-4 rounded-2xl text-sm px-4 border border-[#EBEBEB] outline-none focus:border-[#4C00B0] transition mt-2"
            >
              <option value=""> -Select- </option>
              <option value="NSW">NSW</option>
              <option value="VIC">VIC</option>
              <option value="QLD">QLD</option>
            </select>
          </div>

          {/* Postcode */}
          <div className="flex flex-col sm:col-span-1 mt-5">
            <label
              className="text-xs lg:text-base font-normal text-[#ADADAD]"
              htmlFor="postcode"
            >
              Postcode
            </label>
            <input
              type="text"
              name="postcode"
              placeholder="Postcode"
              required
              value={form.postcode}
              onChange={handleChange}
              className="bg-[#F8F8F8] py-3 lg:py-4 rounded-2xl text-sm px-4 border border-[#EBEBEB] outline-none focus:border-[#4C00B0] transition mt-2"
            />
          </div>

          {/* Current Password */}
          <div className="flex flex-col sm:col-span-2 mt-5">
            <label
              className="text-xs lg:text-base font-normal text-[#ADADAD]"
              htmlFor="currentPassword"
            >
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Password"
              required
              value={form.currentPassword}
              onChange={handleChange}
              className="bg-[#F8F8F8] py-3 lg:py-4 rounded-2xl text-sm px-4 border border-[#EBEBEB] outline-none focus:border-[#4C00B0] transition mt-2"
            />
          </div>
        </div>
        <div className="mt-7">
          <button
            type="submit"
            className="bg-[#4C00B0] rounded-full py-3 lg:py-4 px-14 text-white"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};
