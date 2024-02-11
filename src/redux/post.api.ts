import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCityPost, TPostOffice } from "../types";

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
          params
        };
      },
    }),
    getPostOffice: builder.query<TPostOffice[], {
      place: string,
      address: string,
      limit: number 
    }>({
      query: (params) => {
        return {
          url: "/post_office/find_pvz",
          method: "GET",
          params
        }
      }
    })
  }),
});

export const { useGetCitiesPostQuery, useGetPostOfficeQuery } = postApi;
