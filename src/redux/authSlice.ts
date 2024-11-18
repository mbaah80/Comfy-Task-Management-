import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the AuthState interface
interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'failed';
}

// Initial state for auth
const initialState: AuthState = {
    token: localStorage.getItem('token'), // Load JWT from localStorage if available
    isAuthenticated: !!localStorage.getItem('token'), // Set isAuthenticated based on token presence
    status: 'idle', // Status of the authentication process
};

// Create auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action to log in and set the token
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload); // Save token to localStorage
        },
        // Action to log out and remove the token
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token'); // Remove token from localStorage
        },
        // Action to set the authentication status (optional, for managing loading/failure states)
        setAuthStatus: (state, action: PayloadAction<'idle' | 'loading' | 'failed'>) => {
            state.status = action.payload;
        },
    },
});

// Export actions
export const { login, logout, setAuthStatus } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
