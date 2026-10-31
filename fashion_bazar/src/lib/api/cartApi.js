import {baseApi} from './baseApi';



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



        getCartItems: builder.query({

            query: () => ({ url: "/cartItems" }),
            transformResponse: (response) => response.data,
            providesTags: ["CartItem"]
        })




    })



})

export const { useAddToCartMutation, useGetCartItemsQuery } = cartItemsApi;