import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TCartItem } from "../types";

export const cartSlice = createSlice({
  name: "cart",
  initialState: !!localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") || "")
    : [],
  reducers: {
    addToCart: (
      state: TCartItem[],
      { payload }: PayloadAction<{ id: number; price: number }>
    ) => {
      const { id, price } = payload;

      let existingItem = state.find((el) => el.id === id);

      if (!existingItem) {
        state.push({ id: id, quantity: 1, price: price });
      } else {
        existingItem.quantity++;
      }
    },
    removeFromCart: (
      state: TCartItem[],
      { payload }: PayloadAction<{ id: number; deleteAll?: boolean }>
    ) => {
      const { id, deleteAll } = payload;
      let existingItem = state.find((el) => el.id === id);

      let withoutExisting = state.filter((el) => el.id != id);

      if (existingItem && (deleteAll || existingItem.quantity === 1)) {
        if (!withoutExisting.length) {
          localStorage.setItem("cart", JSON.stringify([]));
        }
        return withoutExisting;
      }
      else if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity = deleteAll ? 0 : existingItem.quantity - 1;
      }

    },
    setCart: (state, { payload: store }) => store,
  },
});

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
