import { baseApi } from "./baseApi";


const categoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCategory: build.query({
            query: () => "/category",
            transformResponse: (response) => response.data,
            providesTags: [{ type: "Category", id: "LIST" }]


        })



    })



})

export const { useGetCategoryQuery } = categoryApi;