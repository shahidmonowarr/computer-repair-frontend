import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const feedback_API = "/feedbacks";

const feedBackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedBacks: builder.query({
      query: () => ({
        url: `${feedback_API}`,
        method: "GET",
      }),
      providesTags: [tagTypes.feedback],
    }),

    // create Faq
    createFeedBack: builder.mutation({
      query: (data) => ({
        url: `${feedback_API}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
    // update Faq
    updateFeedback: builder.mutation({
      query: ({ id, data }) => ({
        url: `${feedback_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),

    // delete Blog
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `/${feedback_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
  }),
});

export const {
  useGetFeedBacksQuery,
  useCreateFeedBackMutation,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedBackApi;
