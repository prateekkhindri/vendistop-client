import {
  getAdminUser,
  loginAdminUser,
  requestNewAccessJWT,
} from "../../helpers/axiosHelper.js";
import { setUser } from "./loginRegisterSlice.js";
import { toast } from "react-toastify";

export const loginAction = (obj) => async (dispatch) => {
  const resultPromise = loginAdminUser(obj);

  toast.promise(resultPromise, {
    pending: "Please wait ...",
  });

  const { status, message, result, accessJWT, refreshJWT } =
    await resultPromise;

  toast[status](message);

  if (status === "success") {
    dispatch(setUser(result));

    sessionStorage.setItem("accessJWT", accessJWT);
    localStorage.setItem("refreshJWT", refreshJWT);
  }
};

export const adminUserLogout = () => (dispatch) => {
  sessionStorage.removeItem("accessJWT");
  localStorage.removeItem("refreshJWT");

  dispatch(setUser({}));
};

export const fetchUser = () => async (dispatch) => {
  const { status, user } = await getAdminUser();

  status === "success" && dispatch(setUser(user));
};

export const autoAdminLogin = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");

  const refreshJWT = localStorage.getItem("refreshJWT");

  // If the accessJWT exists, fetch the user and mount them in the redux store
  if (accessJWT) {
    dispatch(fetchUser());
  } else if (refreshJWT) {
    // If the refreshJWt exists, fetch new accessJWT, fetch the user and mount them in the redux store

    const token = await requestNewAccessJWT();

    token ? dispatch(fetchUser()) : dispatch(adminUserLogout());
  } else {
    // If the refreshJWT is expired, force the user to login again
    dispatch(adminUserLogout());
  }
};
