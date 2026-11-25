import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addReview: builder.mutation({
            query: (data) => ({ url: "/review", method: "POST", body: data }),
            transformResponse: (response) => response?.data,
            // refetch the review list, and the products (their rating changed)
            invalidatesTags: ["Review", "Product"]
        }),
        getReview: builder.query({
            query: (Id) => ({ url: `/review/${Id}` }),
            transformResponse: (response) => response?.data,
            providesTags: ["Review"]
        })


    })



})

export const { useAddReviewMutation, useGetReviewQuery } = reviewApi
