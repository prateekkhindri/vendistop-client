import axios from "axios";

const rootUrl = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;
const loginRegisterEp = rootUrl + "/register-login";
const loginEp = loginRegisterEp + "/login";
const userEp = rootUrl + "/admin";
const catEp = rootUrl + "/categories";
const productEp = rootUrl + "/products";
const orderEp = rootUrl + "/orders";
const cartEp = rootUrl + "/cart";

// Re-usable function so we do not have to repeat the process below
const apiProcessor = async ({ method, url, data, privateAPI, token }) => {
  try {
    const headers = privateAPI
      ? {
          Authorization: token || sessionStorage.getItem("accessJWT"),
        }
      : null;

    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    let message = error.message;

    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");

      return { status: "error", message: "Unauthenticated" };
    }

    if (error.response && error.response.data) {
      message = error.response.data.message;
    }

    if (message === "jwt expired") {
      const token = await requestNewAccessJWT();

      return apiProcessor({ method, url, data, privateAPI, token });
    }

    return {
      status: "error",
      message,
    };
  }
};

// Endpoint to request a new accessJWT
export const requestNewAccessJWT = async () => {
  const option = {
    method: "get",
    url: userEp + "/accessjwt",
    privateAPI: true,
    token: localStorage.getItem("refreshJWT"),
  };

  const { accessJWT } = await apiProcessor(option);

  sessionStorage.setItem("accessJWT", accessJWT);

  return accessJWT;
};

// Registration and Login API calls

// Registration
export const postAdminUser = (data) => {
  const option = {
    method: "post",
    url: loginRegisterEp,
    data,
  };
  return apiProcessor(option);
};

// API endpoint for login
export const loginAdminUser = (data) => {
  const option = {
    method: "post",
    url: loginEp,
    data,
  };
  return apiProcessor(option);
};

export const getAdminUser = () => {
  const option = {
    method: "get",
    url: userEp,
    privateAPI: true,
  };

  return apiProcessor(option);
};

// Password reset API'S
// In the query below, data is an object
export const requestOTP = (data) => {
  const option = {
    method: "post",
    url: loginRegisterEp + "/otp-request",
    data,
  };
  return apiProcessor(option);
};

export const resetPassword = (data) => {
  const option = {
    method: "patch",
    url: loginRegisterEp + "/password",
    data,
  };
  return apiProcessor(option);
};

// Category Endpoints
// All category EP's are private routes except for getting categories

// Get all categories
export const fetchCategory = (_id) => {
  const url = _id ? catEp + "/" + _id : catEp;

  const option = {
    method: "get",
    url,
  };
  return apiProcessor(option);
};

// Post/Add a new category
export const postCategory = (data) => {
  const option = {
    method: "post",
    url: catEp,
    data,
    privateAPI: true,
  };
  return apiProcessor(option);
};

// Delete  categories
export const deleteCategories = (data) => {
  const option = {
    method: "delete",
    url: catEp,
    data,
    privateAPI: true,
  };
  return apiProcessor(option);
};

// Update  category
export const updateCategory = (data) => {
  const option = {
    method: "put",
    url: catEp,
    data,
    privateAPI: true,
  };
  return apiProcessor(option);
};

// PRODUCT API'S
export const getProducts = () => {
  const option = {
    method: "get",
    url: productEp,
    // privateAPI: true,
  };
  return apiProcessor(option);
};

export const getSingleProduct = (_id) => {
  const option = {
    method: "get",
    url: productEp + "/" + _id,
  };

  return apiProcessor(option);
};

export const postProduct = (data) => {
  const option = {
    method: "post",
    url: productEp,
    privateAPI: true,
    data,
  };

  return apiProcessor(option);
};

export const updateProduct = (data, _id) => {
  const option = {
    method: "put",
    url: `${productEp}/${_id}`,
    privateAPI: true,
    data,
  };

  return apiProcessor(option);
};

export const deleteProduct = (_id) => {
  const option = {
    method: "delete",
    url: productEp + "/" + _id,
    privateAPI: true,
  };

  return apiProcessor(option);
};

// Order API'S

// Get order by _id
export const getSingleOrder = (_id) => {
  const option = {
    method: "get",
    url: orderEp + "/" + _id,
    privateAPI: true,
  };

  return apiProcessor(option);
};

// Get all orders
export const getAllOrders = () => {
  const option = {
    method: "get",
    url: orderEp,
    privateAPI: true,
  };

  return apiProcessor(option);
};

// Create a new order
export const createOrder = (orderData) => {
  const option = {
    method: "post",
    url: orderEp,
    data: orderData,
    privateAPI: true,
  };

  return apiProcessor(option);
};

// Update order to delivered
export const updateOrderToDelivered = (_id) => {
  const option = {
    method: "put",
    url: orderEp + "/" + _id + "/deliver",
    privateAPI: true,
  };

  return apiProcessor(option);
};

// Get orders by user
export const getOrdersByUser = (_id) => {
  const option = {
    method: "get",
    url: orderEp + "/my-orders",
    privateAPI: true,
  };

  return apiProcessor(option);
};

// WishList API'S
export const getUserWishlist = () => {
  const option = {
    method: "get",
    url: userEp + "/wishlist",
    privateAPI: true,
  };

  return apiProcessor(option);
};

export const addToUserWishlist = (productId) => {
  const option = {
    method: "post",
    url: userEp + "/wishlist/" + productId,
    privateAPI: true,
  };

  return apiProcessor(option);
};

export const removeFromUserWishlist = (productId) => {
  const option = {
    method: "delete",
    url: userEp + "/wishlist/" + productId,
    privateAPI: true,
  };

  return apiProcessor(option);
};

// CART API's
export const getUserCart = () => {
  const option = {
    method: "get",
    url: cartEp,
    privateAPI: true,
  };

  return apiProcessor(option);
};

export const addToUserCart = (productId) => {
  const option = {
    method: "post",
    url: cartEp + "/" + productId,
    privateAPI: true,
  };

  return apiProcessor(option);
};

export const removeFromUserCart = (productId, removeAll = false) => {
  const option = {
    method: "delete",
    url: cartEp + "/" + productId,
    data: { removeAll },
    privateAPI: true,
  };

  return apiProcessor(option);
};

// Clear user cart

export const clearUserCart = () => {
  const option = {
    method: "delete",
    url: cartEp + "/clear",
    privateAPI: true,
  };

  return apiProcessor(option);
};
