import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/",
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
      query: (countryCode) => `v1/charts/country?country_code=${countryCode}`,
    }),
    getSongsByCountry: builder.query({ 
      query: (countryCode) => `v1/charts/country?country_code=${countryCode}`,
    }),
    getTopArtist: builder.query({

      query:(genreCode,countryCode='IN') =>`v1/charts/genre-world?genre_code=${genreCode}&country_code=${countryCode}`,
    }),
    getTrackDetails: builder.query({
      query:(trackId)=>`v2/tracks/details?track_id=${trackId}`
    }),
  getSongsBySearch: builder.query({ 
      query: (searchTerm) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` 
    })
  }),
});

export const { useGetTopChartsQuery, useGetSongsByCountryQuery,useGetTopArtistQuery,useGetTrackDetailsQuery,useGetSongsBySearchQuery } = shazamCoreApi;



