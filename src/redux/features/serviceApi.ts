import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const SERVICE_API = "/services";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => ({
        url: `${SERVICE_API}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),

    // Create Service
    createService: builder.mutation({
      query: (data) => ({
        url: `${SERVICE_API}/create`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.service],
    }),
    // Update Service
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `${SERVICE_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.service],
    }),

    // Delete Service
    deleteService: builder.mutation({
      query: (id) => ({
        url: `${SERVICE_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = categoryApi;
