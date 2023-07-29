import axios from "axios";

const rootUrl = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;
const loginRegisterEp = rootUrl + "/register-login";
const loginEp = loginRegisterEp + "/login";
const userEp = rootUrl + "/admin";
const catEp = rootUrl + "/categories";
const productEp = rootUrl + "/products";

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
    // privateAPI: true,
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
