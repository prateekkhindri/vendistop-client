import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./pages/login-register/loginRegisterSlice";

const store = configureStore({
  reducer: {
    adminUser: loginReducer,
  },
});

export default store;
