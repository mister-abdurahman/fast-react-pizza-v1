import { configureStore } from "@reduxjs/toolkit";
import userReducer, { initialStateType } from "../src/features/user/userSlice";
import cartReducer, { initialCartType } from "../src/features/cart/cartSlice";

export interface storeType {
  user: initialStateType;
  cart: initialCartType;
}

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
