import { baseApi } from './baseApi';

// Removes empty values, so the request is /products?size=M and not /products?q=&size=M&color=
const cleanParams = (filters = {}) =>
    Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== "" && value != null && value !== false)
    );

export const productapi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // Pass any of: { q, category, categoryId, size, color, minPrice, maxPrice, onSale, exclude, sort, page, limit }
        // Returns { items, total, page, pages, limit }
        getProducts: build.query({
            query: (filters) => ({ url: "/products", params: cleanParams(filters) }),
            transformResponse: (response) => response.data,
            providesTags: ["Product"]

        }),
        // The sizes, colours and highest price that exist: { sizes, colors, maxPrice }
        getProductFilters: build.query({
            query: () => "/products/filter-options",
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
export const { useGetProductsQuery, useGetProductFiltersQuery, useGetProductsByIdQuery } = productapi;
