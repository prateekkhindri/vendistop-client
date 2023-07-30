import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./pages/login-register/loginRegisterSlice";
import categoryReducer from "./pages/categories/categorySlice.js";
import productReducer from "./pages/upload-product/productSlice.js";
import orderReducer from "./pages/orders/orderSlice.js";

const store = configureStore({
  reducer: {
    adminUser: loginReducer,
    categoriesStore: categoryReducer,
    productStore: productReducer,
    orderStore: orderReducer,
  },
});

export default store;
