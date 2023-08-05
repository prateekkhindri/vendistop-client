import { toast } from "react-toastify";
import { updateAdminProfile } from "../../../helpers/axiosHelper";
import { setUser } from "../../login-register/loginRegisterSlice.js";

export const updateAdminProfileAction = (obj) => async (dispatch) => {
  const resultPromise = updateAdminProfile(obj);

  toast.promise(resultPromise, {
    pending: "Please wait ....",
  });

  const { status, message, user } = await resultPromise;

  toast[status](message);

  //   If the status is success, we refetch the user profile
  status === "success" && dispatch(setUser(user));
};
