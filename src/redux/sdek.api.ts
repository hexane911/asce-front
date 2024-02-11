import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCitySdek, TPVZSdek } from "../types";

export const sdekApi = createApi({
  reducerPath: "sdekApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "/",
    prepareHeaders: (headers) => {
      headers.set("X-API-Key", import.meta.env.VITE_API_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCitiesSdek: builder.query<
      TCitySdek[],
      { limit: number; search_string: string }
    >({
      query: (params) => {
        return {
          url: "/sdek/find_city",
          method: "GET",
          params
        };
      },
    }),
    getPVZSdek: builder.query<TPVZSdek[], {
      city_code: number,
      address: string,
      limit: number 
    }>({
      query: (params) => {
        return {
          url: "/sdek/find_pvz",
          method: "GET",
          params
        }
      }
    }),
    calculatePriceSdek: builder.query<{total_sum: number}, {to_postal_code: number, cases_amount:number}>({
      query: (params) => {
        return {
          url: "/sdek/calculate_price",
          method: "GET",
          params
        }
      }
    })
  }),
});

export const { useGetCitiesSdekQuery, useGetPVZSdekQuery, useCalculatePriceSdekQuery, useLazyCalculatePriceSdekQuery } = sdekApi;
