import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./products.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { sdekApi } from "./sdek.api";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [sdekApi.reducerPath]: sdekApi.reducer
  },
  middleware: (gdm) => gdm().concat(productsApi.middleware).concat(sdekApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch)