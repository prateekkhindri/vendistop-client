import { toast } from "react-toastify";
import {
  getProducts,
  getSingleProduct,
  postProduct,
  updateProduct,
} from "../../helpers/axiosHelper";
import { setProduct, setSelectedProduct } from "./productSlice";

export const fetchProductsAction = () => async (dispatch) => {
  const { status, products } = await getProducts();

  status === "success" && dispatch(setProduct(products));
};

export const fetchSingleProductAction = (_id) => async (dispatch) => {
  const { status, products } = await getSingleProduct(_id);

  status === "success" && dispatch(setSelectedProduct(products));
};

export const resetSingleProductAction = () => (dispatch) => {
  dispatch(setSelectedProduct({}));
};

export const postProductAction = (data) => async (dispatch) => {
  const responsePromise = postProduct(data);

  toast.promise(responsePromise, {
    pending: "Please wait ...",
  });

  const { status, message } = await responsePromise;

  toast[status](message);

  status === "success" && dispatch(fetchProductsAction());
};

export const updateProductAction = (data, _id) => async (dispatch) => {
  const responsePromise = updateProduct(data, _id);

  toast.promise(responsePromise, {
    pending: "Please wait ...",
  });

  const { status, message } = await responsePromise;

  toast[status](message);

  status === "success" && dispatch(fetchSingleProductAction(_id));
};
