import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const BLOG_API = "/blogs";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${BLOG_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.blog],
    }),
    // Get Blog By Id
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `${BLOG_API}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    // Create Blog
    createBlog: builder.mutation({
      query: ({ data }) => ({
        url: `${BLOG_API}/create`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    // update Blog
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BLOG_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    // delete Blog
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `${BLOG_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetSingleBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
