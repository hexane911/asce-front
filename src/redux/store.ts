import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./products.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { sdekApi } from "./sdek.api";
import cartReducer from "./cart.slice";
import { deliveryApi } from "./delivery.api";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [sdekApi.reducerPath]: sdekApi.reducer,
    [deliveryApi.reducerPath]: deliveryApi.reducer,
    cart: cartReducer,
  },
  middleware: (gdm) =>
    gdm()
      .concat(productsApi.middleware)
      .concat(sdekApi.middleware)
      .concat(deliveryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
