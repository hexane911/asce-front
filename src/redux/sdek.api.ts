import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCitySdek } from "../types";


export const sdekApi = createApi({
  reducerPath: "sdekApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.API_URL || "/" }),
  endpoints: (builder) => ({
    getCitiesSdek: builder.query<TCitySdek[], void>({
      query: () => {
        return {
          url: "/сities_sdek/",
          method: "GET"
        }
      },
    }),
  }),
});

export const { useGetCitiesSdekQuery } = sdekApi;
