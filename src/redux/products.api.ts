import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TProduct } from "../types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "/",
    prepareHeaders: (headers) => {
      headers.set("X-API-Key", import.meta.env.VITE_API_TOKEN);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getProducts: builder.query<TProduct[], void>({
      query: () => {
        return {
          url: "/products/",
          method: "GET",
        };
      },
    }),
    getProductById: builder.query<TProduct, number>({
      query: (id) => {
        return {
          url: `/product/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
