import { baseApi } from './baseApi';



export const cartItemsApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        addToCart: builder.mutation({

            query: (data) => ({

                url: '/cartItems',
                method: 'POST',
                body: data
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ["CartItem"]

        }),
        updateCartItem: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/cartItems/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ["CartItem"]

        }),
        getCartItems: builder.query({

            query: () => ({ url: "/cartItems" }),
            transformResponse: (response) => response.data,
            providesTags: ["CartItem"]
        }),

        deleteCartItem: builder.mutation({
            query: (id) => ({
                url: `/cartItems/${id}`,
                method: 'DELETE'

            }),
            invalidatesTags: ["CartItem"]




        })



    })
})

export const { useAddToCartMutation, useGetCartItemsQuery, useDeleteCartItemMutation, useUpdateCartItemMutation } = cartItemsApi;