import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./pages/login-register/loginRegisterSlice";
import categoryReducer from "./pages/categories/categorySlice.js";

const store = configureStore({
  reducer: {
    adminUser: loginReducer,
    categoriesStore: categoryReducer,
  },
});

export default store;
