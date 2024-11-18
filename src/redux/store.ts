import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Assuming you have an authSlice
import taskReducer from './taskSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer,
    },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type (optional, but useful if you need it)
export type AppDispatch = typeof store.dispatch;
