import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./products.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { sdekApi } from "./sdek.api";
import cartReducer from "./cart.slice";
import { deliveryApi } from "./delivery.api";
import { postApi } from "./post.api";
import { buyerApi } from "./buyer.api";
import { promoApi } from "./promo.api";
import { authApi } from "./auth.api";
import { orderApi } from "./order.api";
import { emailApi } from "./email.api";
import { salesApi } from "./sales.api";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [sdekApi.reducerPath]: sdekApi.reducer,
    [deliveryApi.reducerPath]: deliveryApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [buyerApi.reducerPath]: buyerApi.reducer,
    [promoApi.reducerPath]: promoApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [emailApi.reducerPath]: emailApi.reducer,
    [salesApi.reducerPath]: salesApi.reducer,
    cart: cartReducer,
  },
  middleware: (gdm) =>
    gdm()
      .concat(productsApi.middleware)
      .concat(sdekApi.middleware)
      .concat(deliveryApi.middleware)
      .concat(postApi.middleware)
      .concat(buyerApi.middleware)
      .concat(promoApi.middleware)
      .concat(authApi.middleware)
      .concat(orderApi.middleware)
      .concat(emailApi.middleware)
      .concat(salesApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
