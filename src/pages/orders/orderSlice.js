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
  },
});

const { actions, reducer } = orderSlice;

export const { setCurrentOrder, setOrders } = actions;

export default reducer;
