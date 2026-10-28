import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        signup: builder.mutation({
            query: (data) => ({ url: "/users/signup", method: "POST", body: data }),
            transformResponse: (response) => response?.data,
        }),


        signin: builder.mutation({
            query: (data) => ({ url: "/users/signin", method: "POST", body: data }),
            transformResponse: (response) => response?.data,
        }),


        getUserById: builder.query({
            query: () => ({ url: "/users", method: "GET" }),
            transformResponse: (response) => response?.data,
            providesTags: ["User"]
        }),
        updateUser: builder.mutation({
            query: (data) => ({ url: "/users/update-user", method: "POST", body: data }),
            transformResponse: (response) => response?.data,
            invalidatesTags: ["User"]

        })




    })

})

export const { useSignupMutation, useSigninMutation, useGetUserByIdQuery,useUpdateUserMutation } = userApi;