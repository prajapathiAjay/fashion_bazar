import {baseApi} from "./baseApi";
export const checkoutApi=baseApi.injectEndpoints({

    endpoints:(builder)=>({
        // check a coupon on the current cart: data = { code }
        // returns { code, type, value, maxDiscount, minOrder, amount, subTotal }
        applyCoupon:builder.mutation({query:(data)=>({
            url:"/discounts/apply",method:"POST",body:data}),
            transformResponse:(response)=>response.data}),

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
            providesTags:["Order"]}),

        // cancel before it ships: { id, reason? }. Stock goes back, so products refetch too.
        // Returns the whole response so the page can show `message` (refund info).
        cancelOrder:builder.mutation({query:({id, reason})=>({
            url:`/orders/${id}/cancel`,method:"POST",body:{reason}}),
            invalidatesTags:["Order","Product"]}),

        // ask to return a delivered order: { id, reason, refundTo? }
        requestReturn:builder.mutation({query:({id, ...body})=>({
            url:`/orders/${id}/return`,method:"POST",body}),
            invalidatesTags:["Order"]}),
    })
})
 export const {usePlaceOrderMutation,useVerifyPaymentMutation,useGetMyOrdersQuery,useApplyCouponMutation,useCancelOrderMutation,useRequestReturnMutation}=checkoutApi;