import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const salesApi = createApi({
  reducerPath: "salesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "/",
    prepareHeaders: (headers) => {
      headers.set("X-API-Key", import.meta.env.VITE_API_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    checksSale: builder.query<
      {
        is_sale: boolean;
        sale_discount: number;
        min_amount_of_products_to_trigger_sale: number;
        max_amount_of_products_to_trigger_sale: number;
      },
      void
    >({
      query: () => {
        return {
          url: "configuration/sale_info/",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useChecksSaleQuery } = salesApi;
