import { baseApi } from "./baseApi";

const settingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET /api/settings -> { storeName, supportEmail, supportPhone, supportHours, address }
        // edited in the admin panel (Settings > Store details)
        getStoreSettings: builder.query({
            query: () => "/settings",
            transformResponse: (response) => response?.data,
            providesTags: ["Settings"],
        }),

    })
})

export const { useGetStoreSettingsQuery } = settingsApi
