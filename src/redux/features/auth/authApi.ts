import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/create-user`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useRegistrationMutation, useUserLoginMutation } = authApi;
