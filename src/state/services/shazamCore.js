import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://shazam-core7.p.rapidapi.com',
        prepareHeaders:(headers)=>{
            headers.set('X-RapidAPI-Key','04b24d2e9emshaab3e5c4b867e90p1e7ab1jsn56d0b2712a22');
            return headers;
        },
    }),
    endpoints:(builder)=>({
        getTopCharts: builder.query({query:()=> '/charts/get-top-songs-in-world'}),
    })
});

export const {
    useGetTopChartsQuery,
} = shazamCoreApi;