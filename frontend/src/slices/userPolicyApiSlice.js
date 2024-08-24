
import { apiSlice } from "./apiSlice.js";

export const userPolicyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get user policies
    getUserPolicies: builder.query({
      query: (userId) => ({
            url: `userpolicy/getUserPolicy`,
            method: "POST",
            body: { userId },
      }),
      keepUnusedDataFor: 5, // Cache duration
    }),
  }),
});

export const { useCreateUserPolicyMutation, useGetUserPoliciesQuery } =
  userPolicyApiSlice;
