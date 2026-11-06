import {baseApi} from "./baseApi";
export const checkoutApi=baseApi.injectEndpoints({

    endpoints:(builder)=>({
        placeOrder:builder.mutation({query:(data)=>({
            url:"/orders",method:"POST",body:data}),
            // server empties the cart and reduces stock, so refetch those
            invalidatesTags:["CartItem","Product","Order"]}),

        // orders of the logged-in user, newest first
        getMyOrders:builder.query({query:()=>({url:"/orders"}),
            transformResponse:(response)=>response.data,
            providesTags:["Order"]})
    })
})
 export const {usePlaceOrderMutation,useGetMyOrdersQuery}=checkoutApi;