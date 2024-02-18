import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emailApi = createApi({
  reducerPath: "emailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "/",
    prepareHeaders: (headers) => {
      headers.set("X-API-Key", import.meta.env.VITE_API_TOKEN);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    subscribeToUpdates: builder.mutation<void, {email: string}>({
      query: (body) => {
        return {
          url: "/subscriber/",
          method: "POST",
          body
        };
      },
    }),
  }),
});

export const { useSubscribeToUpdatesMutation } = emailApi;
