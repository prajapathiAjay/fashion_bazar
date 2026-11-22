import {baseApi} from "./baseApi";
export const checkoutApi=baseApi.injectEndpoints({

    endpoints:(builder)=>({
        placeOrder:builder.mutation({query:(data)=>({
            url:"/orders",method:"POST",body:data}),
            // server empties the cart and reduces stock, so refetch those
            invalidatesTags:["CartItem","Product","Order"]}),

        // after the Razorpay popup succeeds: server checks the signature, then creates the order
        // data = { razorpay_order_id, razorpay_payment_id, razorpay_signature }
        verifyPayment:builder.mutation({query:(data)=>({
            url:"/orders/verify-payment",method:"POST",body:data}),
            invalidatesTags:["CartItem","Product","Order"]}),

        // orders of the logged-in user, newest first
        getMyOrders:builder.query({query:()=>({url:"/orders"}),
            transformResponse:(response)=>response.data,
            providesTags:["Order"]})
    })
})
 export const {usePlaceOrderMutation,useVerifyPaymentMutation,useGetMyOrdersQuery}=checkoutApi;