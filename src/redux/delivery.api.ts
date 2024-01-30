import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TDeliveryMethod } from "../types";

export const deliveryApi = createApi({
  reducerPath: "deliveryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "/",
    prepareHeaders: (headers) => {
      headers.set("X-API-Key", import.meta.env.VITE_API_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDeliveryMehods: builder.query<TDeliveryMethod[], void>({
      query: () => {
        return {
          url: "/delivery-methods/",
          method: "GET",
        };
      },
    }),
  }),
});

export const {useGetDeliveryMehodsQuery} = deliveryApi;
