import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedProduct: {},
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, { payload = [] }) => {
      state.products = payload;
    },

    setSelectedProduct: (state, { payload = {} }) => {
      state.selectedProduct = payload;
    },
  },
});

const { reducer, actions } = productSlice;

export const { setProduct, setSelectedProduct } = actions;

export default reducer;
