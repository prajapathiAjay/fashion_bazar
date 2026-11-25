import { baseApi } from "./baseApi";

// Current delivery rates set by the admin (public, no login needed)
// GET /api/shipping -> { standard: { enabled, price, freeAbove, minDays, maxDays }, express: { ...same } }
export const shippingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShipping: builder.query({
      query: () => "/shipping",
      transformResponse: (response) => response?.data,
      providesTags: ["Shipping"],
    }),
  }),
});

export const { useGetShippingQuery } = shippingApi;
