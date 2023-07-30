import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, { payload = [] }) => {
      state.wishlist = payload;
    },
  },
});

const { reducer, actions } = wishlistSlice;

export const { setWishlist } = actions;

export default reducer;
