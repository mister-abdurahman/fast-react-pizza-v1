import { createSlice } from "@reduxjs/toolkit";
import { CartType } from "./cart";
import { storeType } from "../../store";

export interface initialCartType {
  cart: CartType[];
}

const initialState: initialCartType = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
    increaseAnItemQuantity(state, action) {
      const item = state.cart.find((el) => el.pizzaId === action.payload)!;
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseAnItemQuantity(state, action) {
      const item = state.cart.find((el) => el.pizzaId === action.payload)!;
      if (item.quantity > 0) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }
      if (item?.quantity === 0)
        cartSlice.caseReducers.deleteAnItem(state, action);
    },
    deleteAnItem(state, action) {
      state.cart = state.cart.filter((el) => el.pizzaId !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  increaseAnItemQuantity,
  decreaseAnItemQuantity,
  deleteAnItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: storeType) => state.cart.cart;
export const getTotalPizzaQuantity = (state: storeType) =>
  state.cart.cart.reduce((acc, cur) => acc + cur.quantity, 0);
export const getTotalPizzaPrice = (state: storeType) =>
  state.cart.cart.reduce((acc, cur) => acc + cur.totalPrice, 0);
