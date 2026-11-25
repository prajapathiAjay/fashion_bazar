import { baseApi } from "./baseApi";

export const wishlistApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addToWishlist: build.mutation({
            query: (productId) => ({
                url: "/wishlist",
                method: "POST",
                body: { productId,type: "Product"}

            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ["Wishlist"]

        }),
        getWishlist: build.query({
            query: () => "/wishlist",
            transformResponse: (response) => response.data,
            providesTags: ["Wishlist"]
        }),

        deleteFromWishList:build.mutation({
          query:(id)=>({url:`/wishlist/${id}`,method:"DELETE"}),
            transformResponse: (response) => response.data,
          invalidatesTags:["Wishlist"]


        })



    })

})

export const {useAddToWishlistMutation, useGetWishlistQuery,useDeleteFromWishListMutation} = wishlistApi