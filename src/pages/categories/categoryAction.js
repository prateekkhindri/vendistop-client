import {
  deleteCategories,
  fetchCategory,
  postCategory,
  updateCategory,
} from "../../helpers/axiosHelper";
import { setCategories } from "./categorySlice";
import { toast } from "react-toastify";

export const getCategoriesAction = () => async (dispatch) => {
  const { status, result } = await fetchCategory();

  status === "success" && dispatch(setCategories(result));
};

export const postCategoryAction = (obj) => async (dispatch) => {
  const responsePromise = postCategory(obj);

  toast.promise(responsePromise, {
    pending: "Please wait ...",
  });

  const { status, message } = await responsePromise;

  toast[status](message);

  status === "success" && dispatch(getCategoriesAction());
};

export const deleteCategoryAction = (obj) => async (dispatch) => {
  const responsePromise = deleteCategories(obj);

  toast.promise(responsePromise, {
    pending: "Please wait ...",
  });

  const { status, message } = await responsePromise;

  toast[status](message);

  status === "success" && dispatch(getCategoriesAction());
};

export const updateCategoryAction = (obj) => async (dispatch) => {
  const responsePromise = updateCategory(obj);

  toast.promise(responsePromise, {
    pending: "Please wait ...",
  });

  const { status, message } = await responsePromise;

  toast[status](message);

  status === "success" && dispatch(getCategoriesAction());
};
