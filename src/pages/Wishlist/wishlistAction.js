import {
  getUserWishlist,
  addToUserWishlist,
  removeFromUserWishlist,
} from "../../helpers/axiosHelper.js";
import { setWishlist } from "./wishlistSlice.js";
import { toast } from "react-toastify";

export const fetchWishlist = () => async (dispatch) => {
  const { status, wishlist } = await getUserWishlist();

  status === "success" && dispatch(setWishlist(wishlist));
};

export const addProductToWishlist = (productId) => async (dispatch) => {
  const responsePromise = addToUserWishlist(productId);

  toast.promise(responsePromise, {
    pending: "Please wait ...",
  });

  const { status, message } = await responsePromise;

  // console.log(status, message);

  toast[status](message);

  status === "success" && dispatch(fetchWishlist());
};

export const removeProductFromWishlist = (productId) => async (dispatch) => {
  const responsePromise = removeFromUserWishlist(productId);

  toast.promise(responsePromise, {
    pending: "Please wait ...",
  });

  const { status, message } = await responsePromise;

  toast[status](message);

  status === "success" && dispatch(fetchWishlist());
};
