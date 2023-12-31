import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  shippingPrice: 15,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload = [] }) => {
      state.cart = payload;
    },
  },
});

const { reducer, actions } = cartSlice;

export const { setCart } = actions;

export default reducer;
