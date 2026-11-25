import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { logout } from '../slices/authSlice';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth?.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers;
    }
});

// Runs every request. If we sent a token and the server says 401 (expired or invalid login),
// log out here once, instead of every page quietly failing while still looking logged in.
const baseQueryWithLogout = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401 && api.getState().auth?.token) {
        api.dispatch(logout());
        // forget the old user's cart, wishlist, orders...
        api.dispatch(baseApi.util.resetApiState());
    }
    return result;
};

export const baseApi = createApi({

    reducerPath: "api",
    baseQuery: baseQueryWithLogout,
    tagTypes: ["Product", "Category", "CartItem", "User", "Wishlist", "Order", "Review", "Shipping", "Faq", "Settings"],
    endpoints: () => ({})
})
