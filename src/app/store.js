import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";
import searchReducer from "../redux/searchSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
  },
});
