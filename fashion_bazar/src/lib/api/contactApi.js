import { baseApi } from "./baseApi";

const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // { name, email, orderId, topic, message }
        sendContactMessage: builder.mutation({
            query: (data) => ({ url: "/contact", method: "POST", body: data }),
        }),

        // newsletter sign-up
        subscribe: builder.mutation({
            query: (email) => ({ url: "/contact/subscribe", method: "POST", body: { email } }),
        }),

    })
})

export const { useSendContactMessageMutation, useSubscribeMutation } = contactApi
