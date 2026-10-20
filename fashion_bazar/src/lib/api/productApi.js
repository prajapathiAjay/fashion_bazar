import { baseApi } from './baseApi';

export const productapi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => "/products",
            transformResponse: (response) => response.data,
            providesTags: ["Product"]

        }),
        getProductsById: build.query({
            query: (id) => `/products/${id}`,
            transformResponse: (response) => response.data,
            providesTags: (result, error, id) => [{ type: "Product", id }]
        })

    })


})
export const { useGetProductsQuery, useGetProductsByIdQuery } = productapi;