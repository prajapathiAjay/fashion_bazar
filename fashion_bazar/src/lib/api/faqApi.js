import { baseApi } from "./baseApi";

const faqApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET /api/faq -> { topics: ["Orders & payment", ...], faqs: [{ _id, topic, question, answer }] }
        // only published questions; the admin panel decides what shows here
        getFaqs: builder.query({
            query: () => "/faq",
            transformResponse: (response) => response?.data ?? { topics: [], faqs: [] },
            providesTags: ["Faq"],
        }),

    })
})

export const { useGetFaqsQuery } = faqApi
