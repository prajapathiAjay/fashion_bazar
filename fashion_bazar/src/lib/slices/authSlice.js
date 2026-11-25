import { createSlice } from "@reduxjs/toolkit";
import { isTokenExpired } from "../../utils/tokenExpiry";

// Read the saved login once at start-up. If it has already expired, drop it right away,
// so the navbar never shows "logged in" for a login the server will refuse.
const readSavedToken = () => {
    const saved = localStorage.getItem("token");
    if (saved && isTokenExpired(saved)) {
        localStorage.removeItem("token");
        return { token: null, sessionExpired: true };
    }
    return { token: saved, sessionExpired: false };
};

const initialState = readSavedToken();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload;
            state.sessionExpired = false;
            localStorage.setItem("token", action.payload);
        },

        // dispatch(logout())                  -> the shopper clicked "Log out"
        // dispatch(logout({ expired: true }))  -> the login expired or the server refused it
        logout: (state, action) => {
            state.token = null;
            state.sessionExpired = Boolean(action?.payload?.expired);
            localStorage.removeItem("token");
        },

        // the login page has shown the "session expired" message
        clearSessionExpired: (state) => {
            state.sessionExpired = false;
        },
    },
});

export const { setCredentials, logout, clearSessionExpired } = authSlice.actions;
export default authSlice.reducer;
