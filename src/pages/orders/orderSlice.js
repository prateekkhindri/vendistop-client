import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentOrder: {},
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCurrentOrder: (state, { payload }) => {
      state.currentOrder = payload;
    },

    setOrders: (state, { payload }) => {
      state.orders = payload;
    },

    resetCurrentOrder: (state) => {
      state.currentOrder = {};
    },
  },
});

const { actions, reducer } = orderSlice;

export const { setCurrentOrder, setOrders, resetCurrentOrder } = actions;

export default reducer;
