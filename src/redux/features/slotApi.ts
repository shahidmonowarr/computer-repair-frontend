import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const SLOT_API = "/slots";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getSlot
    getSlots: builder.query({
      query: () => ({
        url: `${SLOT_API}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    // create slot
    createSlot: builder.mutation({
      query: (data) => ({
        url: `${SLOT_API}/create`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.slots],
    }),

    // update slot
    updateSlot: builder.mutation({
      query: ({ id, data }) => ({
        url: `${SLOT_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.slots],
    }),
    // delete slot
    deleteSlot: builder.mutation({
      query: (id) => ({
        url: `${SLOT_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.slots],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useUpdateSlotMutation,
  useDeleteSlotMutation,
  useGetSlotsQuery,
} = slotApi;
