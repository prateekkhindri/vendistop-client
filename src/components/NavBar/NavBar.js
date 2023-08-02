import React, { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./navbar.css";
import profile from "../../assets/images/profile-picture.jpg";
import Logo from "../../assets/logos/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../pages/categories/categoryAction.js";
import { adminUserLogout } from "../../pages/login-register/loginRegisterAction";

export const NavBar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.adminUser);

  // Pull the categories from the redux store and display them
  const { categories } = useSelector((state) => state.categoriesStore);

  const isAdmin = useSelector((state) => state.adminUser.user.role) === "Admin";

  // state for search and category popup
  const [searchPopup, setSearchPopup] = useState(false);
  const [categoryPopup, setCategoryPopup] = useState(false);
  const [profilePopup, setProfilePopup] = useState(false);
  // search input ref
  const searchInput = useRef(null);
  const popup_box = useRef(null);
  const button_ref = useRef(null);
  // profile ref
  const profileRef = useRef(null);
  const profileBtnRef = useRef(null);
  // category ref
  const categoryRef = useRef(null);
  const categoryBtnRef = useRef(null);

  // Fetch the categories every time the page reloads
  useEffect(() => {
    !categories.length && dispatch(getCategoriesAction());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // toggle the search popup option
  useEffect(() => {
    const handleClickOutsde = (event) => {
      // Search outside click
      if (
        popup_box.current &&
        !popup_box.current.contains(event.target) &&
        !button_ref.current.contains(event.target)
      ) {
        setSearchPopup(false);
      }
    };
    // Category out side click
    const handleClickOutside1 = (event) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target) &&
        !categoryBtnRef.current.contains(event.target)
      ) {
        setCategoryPopup(false);
      }
    };
    // Profile outsize click
    const handleClickOutside2 = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        !profileBtnRef.current.contains(event.target)
      ) {
        setProfilePopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsde);
    document.addEventListener("mousedown", handleClickOutside1);
    document.addEventListener("mousedown", handleClickOutside2);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsde);
      document.removeEventListener("mousedown", handleClickOutside1);
      document.removeEventListener("mousedown", handleClickOutside2);
    };
  }, [popup_box, categoryRef, profileRef]);

  // Focus to the search input box when it's open
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const searchInputEntry = entries[0];
      if (searchInputEntry.isIntersecting) {
        searchInput.current.focus();
      }
    });

    observer.observe(searchInput.current);

    // Cleanup the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  });

  // handle cart category popup
  const handleCategory = () => {
    setCategoryPopup(!categoryPopup);
  };

  // handle search popup option
  const handleSearch = () => {
    setSearchPopup(!searchPopup);
  };

  // handle profile
  const handleProfile = () => {
    // if user is not logged in
    if (!user._id) {
      navigate("/login"); // navigate to login page
    } else {
      setProfilePopup(!profilePopup);
    }
  };

  return (
    <>
      <div className="h-[68px]">Under Nav</div>
      <div className="fixed top-0 z-10 w-full bg-white shadow-sm">
        <div className="relative flex items-center justify-between max-w-screen-xl px-3 py-4 mx-auto">
          {/* Logo and category section */}
          <div className="flex items-center justify-center">
            {/* Logo container */}
            <Link to={"/"}>
              <div className="text-[#4C00B0] text-lg font-extrabold uppercase">
                <img src={Logo} alt="" className="h-[15px] xs:h-[25px]" />
              </div>
            </Link>
            {/* Category container */}
            <button
              ref={categoryBtnRef}
              onClick={handleCategory}
              className="p-2 mx-2 rounded-md icon_shadow"
            >
              {/* <Icon icon="ri:apps-2-line" /> */}
              <Icon
                icon="grommet-icons:apps-rounded"
                className="text-xl xl:text-2xl"
              />
            </button>
          </div>
          {/* Product search section */}
          <div className="items-center justify-center md:flex hidden w-auto group">
            <div className="flex transition-all duration-300 items-center just w-full overflow-hidden bg-[#F8F8F8] border-[#EBEBEB] rounded-md px-5 text-xs border group-focus-within:border-[#4C00B0]">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-full py-2 font-medium leading-5 outline-none xl:w-96 xl:py-2 xl:text-base text-[#2C2C2C] bg-transparent"
              />
            </div>
            <button className="flex p-2 mx-3 rounded-full icon_shadow ">
              <Icon icon="iconamoon:search" className="xl:text-xl" />
            </button>
          </div>
          {/* Favorite, Cart, Profile Section */}
          <div className="flex items-center justify-between flex-shrink-0">
            <button
              ref={button_ref}
              onClick={handleSearch}
              className="p-2 mr-3 rounded-full md:hidden icon_shadow"
            >
              <Icon icon="iconamoon:search" className="text-xl xl:text-2xl" />
            </button>
            <Link to={"/wishlist"}>
              <div className="relative p-2 mr-3 rounded-full icon_shadow">
                <Icon icon="charm:heart" className="text-xl xl:text-2xl" />
              </div>
            </Link>
            <Link to={"/cart"}>
              <div className="relative p-2 mr-3 rounded-full icon_shadow">
                <Icon
                  icon="uil:shopping-cart"
                  className="text-xl xl:text-2xl"
                />
              </div>
            </Link>
            {/* Below Desktop profile icon */}
            <div
              ref={profileBtnRef}
              onClick={handleProfile}
              className="p-2 rounded-full lg:hidden icon_shadow"
            >
              <Icon icon="ci:user-01" className="text-xl xl:text-2xl" />
            </div>
            {/* Desktop profile icon */}
            <Link className="hidden lg:block" to={"/profile"}>
              <div className="p-2 rounded-full icon_shadow">
                <Icon icon="ci:user-01" className="text-xl xl:text-2xl" />
              </div>
            </Link>
            {/* Category popup */}
            <div
              className={`before:transition-all before:duration-300 ${
                categoryPopup
                  ? "before:translate-x-0 opacity-100 before:block"
                  : "before:-translate-x-52 opacity-0 before:hidden"
              } before:absolute before:top-16 before:z-[2] before:w-full before:h-screen before:opacity-50`}
            >
              <div
                ref={categoryRef}
                className={`transition-all ${
                  categoryPopup
                    ? "translate-y-0 opacity-100 before:visible transition"
                    : "-translate-y-80 opacity-0 before:invisible transition"
                } rounded-lg fixed left-1 xl:left-[10%] top-20 py-4 bg-white z-[4]`}
              >
                <div className="pb-2 mb-3 text-center border-b ">
                  <h1 className="text-lg font-extrabold">Category</h1>
                </div>
                <ul className={`px-4`}>
                  {categories &&
                    categories.map((category) => {
                      return (
                        <Link
                          key={category._id}
                          to={`/products/category/${category._id}`}
                        >
                          <li
                            onClick={handleCategory}
                            key={category._id}
                            className={`p-2 first-letter:uppercase hover:bg-[#4C00B0] hover:text-white text-[#696969] rounded-lg px-4`}
                          >
                            {category.name}
                          </li>
                        </Link>
                      );
                    })}
                </ul>
              </div>
            </div>
            {/* Search popup */}
            <form>
              <div
                className={`before:md:hidden before:transition-all before:duration-300 ${
                  searchPopup
                    ? "before:translate-x-0 opacity-100 before:block"
                    : "before:-translate-x-52 opacity-0 before:hidden"
                } before:absolute before:top-16 before:z-[2] before:left-0 before:w-full before:h-screen before:opacity-50`}
              >
                <div
                  ref={popup_box}
                  className={`md:hidden ${
                    searchPopup
                      ? "translate-x-0 opacity-100 visible"
                      : "-translate-x-52 opacity-0 invisible"
                  }  z-[4] absolute left-[10%] top-[4.5rem] p-2 w-[80%] flex mx-auto justify-between items-center bg-white rounded-md transition-all`}
                >
                  <div className="w-full overflow-hidden border-[#EBEBEB] rounded-md px-5 text-xs border group-focus-within:border-[#4C00B0] bg-[#F8F8F8]">
                    <input
                      type="text"
                      ref={searchInput}
                      placeholder="Search..."
                      className="w-full h-full py-2 font-medium leading-5 outline-none xl:py-5 xl:text-base text-[#2C2C2C] bg-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-2 ml-2 rounded-full icon_shadow"
                  >
                    <Icon
                      icon="iconamoon:search"
                      className="text-xl xl:text-2xl"
                    />
                  </button>
                </div>
              </div>
            </form>

            {/* Profile popup - Mobile View */}
            <div
              className={`before:transition-all before:duration-300 ${
                profilePopup && user._id
                  ? "before:translate-x-0 opacity-100 before:block"
                  : "before:-translate-x-52 opacity-0 before:hidden"
              } before:absolute before:top-16 before:z-[2] before:left-0 before:w-full before:h-screen before:opacity-50`}
            >
              <div
                ref={profileRef}
                className={`transition-all ${
                  profilePopup && user._id
                    ? "-translate-x-0 opacity-100 before:visible"
                    : "translate-x-80 opacity-0 before:invisible"
                } rounded-lg fixed right-2 top-16 mt-2 py-4 min-w-[260px] bg-white z-[4]`}
              >
                <div className="flex flex-col items-center justify-center px-6 py-10 ">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex justify-center items-center w-[100px] h-[100px] rounded-full overflow-hidden">
                      <img
                        src={profile}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="pt-5 text-center">
                      {user.fName} {user.lName}
                    </h1>
                  </div>
                  <ul
                    onClick={handleProfile}
                    className="flex flex-col items-start justify-center w-full pt-4"
                  >
                    {isAdmin && (
                      <NavLink
                        className="w-full my-1 group hover:text-white"
                        to="/dashboard"
                      >
                        <li className="group/account flex items-center hover:bg-[#4C00B0] group-[.active]:bg-[#4C00B0] group-[.active]:text-white rounded-md px-3 transition py-2">
                          <Icon
                            icon={"ic:round-dashboard"}
                            className="text-lg text-[#4C00B0] group-hover/account:text-white transition group-[.active]:text-white"
                          />
                          <p className="pl-2 transition">Dashboard</p>
                        </li>
                      </NavLink>
                    )}
                    <NavLink
                      className="w-full my-1 group hover:text-white"
                      to="/profile"
                    >
                      <li className="group/account flex items-center hover:bg-[#4C00B0] group-[.active]:bg-[#4C00B0] group-[.active]:text-white rounded-md px-3 transition py-2">
                        <Icon
                          icon={"fluent:person-12-filled"}
                          className="text-lg text-[#4C00B0] group-hover/account:text-white transition group-[.active]:text-white"
                        />
                        <p className="pl-2 transition">Edit Profile</p>
                      </li>
                    </NavLink>
                    <NavLink
                      className="w-full my-1 group hover:text-white"
                      to="profile/history"
                    >
                      <li className="group/history flex items-center hover:bg-[#4C00B0] group-[.active]:bg-[#4C00B0] group-[.active]:text-white rounded-md px-3 transition py-2">
                        <Icon
                          icon={"material-symbols:history"}
                          className="text-lg text-[#4C00B0] group-hover/history:text-white group-[.active]:text-white transition"
                        />
                        <p className="pl-2 transition ">Order History</p>
                      </li>
                    </NavLink>
                    <Link
                      className="w-full my-1 hover:text-white"
                      to={"/login"}
                    >
                      <li
                        className=" group/logout flex items-center hover:bg-[#4C00B0] rounded-md px-3 transition py-2"
                        onClick={() => dispatch(adminUserLogout())}
                      >
                        <Icon
                          icon={"solar:logout-linear"}
                          className="text-lg text-[#4C00B0] group-hover/logout:text-white transition"
                        />
                        <p className="pl-2 transition">Logout</p>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
            {/* Profile popup end */}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
