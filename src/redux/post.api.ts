import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCityPost, TPostOffice } from "../types";
import { url } from "node:inspector";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "/",
    prepareHeaders: (headers) => {
      headers.set("X-API-Key", import.meta.env.VITE_API_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCitiesPost: builder.query<
      TCityPost[],
      { limit: number; search_string: string }
    >({
      query: (params) => {
        return {
          url: "/post_office/find_city",
          method: "GET",
          params,
        };
      },
    }),
    getPostOffice: builder.query<
      TPostOffice[],
      {
        place: string;
        address: string;
        limit: number;
      }
    >({
      query: (params) => {
        return {
          url: "/post_office/find_pvz",
          method: "GET",
          params,
        };
      },
    }),
    calculatePricePost: builder.query<{delivery_price_in_rub: number, errors?: string[]}, { to_postal_code: number, cases_amount: number }>({
      query: (params) => {
        return {
          url: "/post_office/calculate_price",
          method: "GET",
          params,
        };
      },
    }),
  }),
});

export const { useGetCitiesPostQuery, useGetPostOfficeQuery, useLazyCalculatePricePostQuery } = postApi;
