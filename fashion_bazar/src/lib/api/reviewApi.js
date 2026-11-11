import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addReview: builder.mutation({
            query: (data) => ({ url: "/review", method: "POST", body: data }),
            transformResponse: (response) => response?.data
        }),
        getReview:builder.query({
         query:(Id)=>({url:`/review/${Id}`}),
 transformResponse: (response) => response?.data
        })


    })



})

export const {useAddReviewMutation,useGetReviewQuery}=reviewApi
