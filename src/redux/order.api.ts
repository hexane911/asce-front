import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCityPost, TPostOffice } from "../types";
import { url } from "node:inspector";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "/",
    prepareHeaders: (headers) => {
      headers.set("X-API-Key", import.meta.env.VITE_API_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      void,
      {
        comment: string;
        point_of_delivery: string;
        delivery_price: number;
        products_price: number;
        full_price: number;
        applied_promo_code_id: number | null;
        buyer_id: number;
        delivery_method_id: number;
        product_ids: number[]
      }
    >({
      query: (body) => {
        return {
          url: "/order/",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
