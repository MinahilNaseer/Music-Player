import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "04b24d2e9emshaab3e5c4b867e90p1e7ab1jsn56d0b2712a22"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: (countryCode) => `/charts/world?country_code=${countryCode}`,
    }),
  }),
});

export const { useGetTopChartsQuery } = shazamCoreApi;
