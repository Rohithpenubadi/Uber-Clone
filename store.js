import { configureStore } from '@reduxjs/toolkit';
import navReducer from './slices/navSlices.js';
export const store = configureStore({
    reducer: {
        nav: navReducer,
    }
})