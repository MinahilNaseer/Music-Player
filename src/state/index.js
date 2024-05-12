
import { shazamCoreApi } from './services/shazamCore.js';
import playerReducer from './features/playerSlice.js';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer:{
        [shazamCoreApi.reducerPath]:shazamCoreApi.reducer,
        player: playerReducer,
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(shazamCoreApi.middleware)
});

export default store;
