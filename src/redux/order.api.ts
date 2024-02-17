import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCityPost, TPostOffice } from "../types";
import { url } from "node:inspector";

type Order = {
  id: number;
  status: "paid" | "unpaind";
  comment: string;
  point_of_delivery: string;
  delivery_price: number;
  products_price: number;
  full_price: number;
  applied_promo_code_id: number | null;
  buyer_id: number;
  delivery_method_id: number;
  product_ids: number[];
};

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
      Order,
      {
        comment: string;
        point_of_delivery: string;
        delivery_price: number;
        products_price: number;
        full_price: number;
        applied_promo_code_id: number | null;
        buyer_id: number;
        delivery_method_id: number;
        product_ids: number[];
      }
    >({
      query: (body) => {
        return {
          url: "/order/",
          method: "POST",
          body: { ...body, status: "unpaid" },
        };
      },
    }),
    createPayment: builder.mutation<{payment_url: string}, {amount: number, payment: string, desc: string}>({
      query: body => {
        return {
          url: "/payok/create_payment/",
          method: "POST",
          body
        }
      }
    }),
  getOrder: builder.query<Order, number>({
    query: id => {
      return {
        url: `/order/${id}`,
        method: "GET"
      }
    }
  }) 

  }),
});

export const { useCreateOrderMutation, useCreatePaymentMutation, useGetOrderQuery } = orderApi;
