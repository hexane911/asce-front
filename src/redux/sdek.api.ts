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
      query: (payload) => {
        return {
          url: "/sdek/find_city",
          method: "GET",
          params: {
            ...payload,
          },
        };
      },
    }),
    getPVZSdek: builder.query<TPVZSdek[], {
      city_code: number,
      address: string,
      limit: number 
    }>({
      query: (payload) => {
        return {
          url: "/sdek/find_pvz",
          method: "GET",
          params: {
            ...payload
          }
        }
      }
    })
  }),
});

export const { useGetCitiesSdekQuery, useGetPVZSdekQuery } = sdekApi;
