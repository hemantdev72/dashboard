import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../features/api/apiSlice.jsx';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export { store };