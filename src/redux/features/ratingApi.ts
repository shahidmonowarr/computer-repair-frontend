import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const RatingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => ({
        url: `/reviewsAndRatings/`,
        method: "GET",
      }),
      providesTags: [tagTypes.reviews],
    }),
    // get my reviews
    getMyReviews: builder.query({
      query: () => ({
        url: `/reviewsAndRatings/my-reviews`,
        method: "GET",
      }),
      providesTags: [tagTypes.reviews],
    }),
    createRating: builder.mutation({
      query: (body) => ({
        url: `/reviewsAndRatings/create`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.reviews, tagTypes.service],
    }),
    // delete reviews
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviewsAndRatings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useCreateRatingMutation,
  useGetMyReviewsQuery,
  useDeleteReviewMutation,
} = RatingApi;
