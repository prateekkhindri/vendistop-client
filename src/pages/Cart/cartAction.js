import {
  getUserCart,
  addToUserCart,
  removeFromUserCart,
  clearUserCart,
} from "../../helpers/axiosHelper.js";
import { setCart } from "./cartSlice.js";
import { toast } from "react-toastify";

export const fetchCartAction = () => async (dispatch) => {
  const { status, cart } = await getUserCart();

  status === "success" && dispatch(setCart(cart));
};

export const incrementQuantityInCart = (productId) => async (dispatch) => {
  const { status } = await addToUserCart(productId, 1);
  status === "success" && dispatch(fetchCartAction());
};

export const decrementQuantityInCart = (productId) => async (dispatch) => {
  const { status } = await removeFromUserCart(productId, false);
  status === "success" && dispatch(fetchCartAction());
};

export const addProductToCart =
  (productId, amount = 1) =>
  async (dispatch) => {
    const responsePromise = addToUserCart(productId, amount);

    toast.promise(responsePromise, {
      pending: "Please wait ...",
    });

    const { status, message } = await responsePromise;

    toast[status](message);

    status === "success" && dispatch(fetchCartAction());
  };

export const removeProductFromCart = (productId) => async (dispatch) => {
  const responsePromise = removeFromUserCart(productId, true);

  toast.promise(responsePromise, {
    pending: "Please wait ...",
  });

  const { status, message } = await responsePromise;

  toast[status](message);

  status === "success" && dispatch(fetchCartAction());
};

// Clear cart Action
export const clearCartAction = () => async (dispatch) => {
  const responsePromise = clearUserCart();

  toast.promise(responsePromise, {
    pending: "Please wait ...",
  });

  const { status } = await responsePromise;

  status === "success" && dispatch(fetchCartAction());
};
