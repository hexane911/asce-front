import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TPromoCode } from "../types";

export const promoApi = createApi({
  reducerPath: "promoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "/",
    prepareHeaders: (headers) => {
      headers.set("X-API-Key", import.meta.env.VITE_API_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPromocode: builder.query<TPromoCode, {promo_code_name: string}>({
        query: (payload) => {
            return {
                url: "promo_code/",
                method: "GET",
                params: payload
            }
        }
    })
  }),
});

export const { useLazyGetPromocodeQuery } = promoApi;
