import { USERS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Update User Profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateProfile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"], // Tag for invalidation after updating
    }),

    // Get User Profile
    getProfile: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/getprofile`,
            method: "POST",
        body: { userId },
      }),
      providesTags: ["Profile"], // Tag for cache invalidation
    }),

    // Get Users
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["Users"], // Tag for caching
      keepUnusedDataFor: 5, // Keep data in cache for 5 seconds
    }),

    // Delete User
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"], // Tag for invalidation after deletion
    }),

    // Get User Details by ID
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5, // Keep data in cache for 5 seconds
    }),

    // Update User by ID
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"], // Tag for invalidation after update
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetProfileQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = usersApiSlice;
