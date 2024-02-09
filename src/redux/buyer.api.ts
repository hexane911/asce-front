import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TBuyer, TBuyerForm } from "../types";

export const buyerApi = createApi({
  reducerPath: "buyerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "/",
    prepareHeaders: (headers) => {
      headers.set("X-API-Key", import.meta.env.VITE_API_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    setBuyer: builder.mutation<number, TBuyerForm>({
        query: (payload) => {
            return {
                url: "buyer/",
                body: payload,
                method: "POST"
            }
        }
    }),
    getBuyer: builder.query<TBuyer, {email: string}>({
        query: (payload) => {
            return {
                url: "buyer/",
                method: "GET",
                params: payload
            }
        }
    })
  }),
});

export const {  useGetBuyerQuery, useSetBuyerMutation, useLazyGetBuyerQuery} = buyerApi;
