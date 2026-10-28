import { baseApi } from "./baseApi";

export const wishlistApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addToWishlist: build.query({
            query: (productId) => ({
                url: "/wishlist",
                method: "POST",
                params: { productId }

            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ["Wishlist"]

        }),
        getWishlist: build.query({
            query: () => "/wishlist",
            transformResponse: (response) => response.data,
            providesTags: ["Wishlist"]
        })



    })

})