import { createSlice } from "@reduxjs/toolkit";
import { TCartItem } from "../types";

export const cartSlice = createSlice({
  name: "cart",
  initialState: !!localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") || "")
    : [],
  reducers: {
    addToCart: (state: TCartItem[], { payload }) => {
      const { id, price } = payload;
      let existingItem = state.find(
        (el) => el.id === id
      );
      let withoutExisting = state.filter(
        (el) => el.id != id
      );
      if (existingItem) {
        return [
          ...withoutExisting,
          { ...existingItem, quantity: existingItem.quantity + 1 },
        ];
      }
      let lastOrder = state.length
        ? [...state].sort((a, b) => a.order - b.order)[state.length - 1].order
        : 0;
      return [
        ...state,
        { id: id, quantity: 1, order: lastOrder + 1, price: price },
      ];
    },
    removeFromCart: (state: TCartItem[], { payload }) => {
      const { id, deleteAll } = payload;
      let existingItem = state.find(
        (el) => el.id === id
      );
      let withoutExisting = state.filter(
        (el) => el.id != id
      );
      if (!existingItem) {
        return state;
      }
      if (existingItem && existingItem.quantity > 1) {
        return [
          ...withoutExisting,
          {
            ...existingItem,
            quantity: !!deleteAll ? 0 : existingItem.quantity - 1,
          },
        ];
      }
      if (!withoutExisting.length) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      return withoutExisting;
    },
    setCart: (state, {payload: store}) => store
  },
});

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
