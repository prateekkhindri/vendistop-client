import axios from "axios";

const rootUrl = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;
const loginRegisterEp = rootUrl + "/register-login";
const loginEp = loginRegisterEp + "/login";
const userEp = rootUrl + "/admin";

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
