import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "/",
    prepareHeaders: (headers) => {
      headers.set("X-API-Key", import.meta.env.VITE_API_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    checkPW: builder.query<string, void>({
        query: () => {
            return {
                url: "auth/is_password_required",
                method: "GET",
            }
        }
    }),
    auth: builder.mutation<void, {password: string}>({
      query: (payload) => {
          return {
              url: "buyer/",
              body: payload,
              method: "POST"
          }
      }
  }),
  }),
});

export const { useCheckPWQuery, useAuthMutation } = authApi;
