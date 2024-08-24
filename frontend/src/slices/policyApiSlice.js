import { POLICY_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const policyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new policy
    createPolicy: builder.mutation({
      query: (policyData) => ({
        url: `${POLICY_URL}/policies`,
        method: "POST",
        body: policyData,
      }),
      invalidatesTags: ["Policies"], // Invalidate the policies cache after creating a new policy
    }),

    // Get all policies
    getAllPolicies: builder.query({
      query: () => ({
        url: `${POLICY_URL}/getAllPolicy`,
      }),
      providesTags: ["Policies"], // Cache the result
      keepUnusedDataFor: 5, // Keep the cache for 5 seconds
    }),

    // Get a specific policy by ID
    getPolicyById: builder.query({
      query: (id) => ({
        url: `${POLICY_URL}/${id}/getPolicy`,
      }),
    }),

    // Update a specific policy by ID
    updatePolicy: builder.mutation({
      query: ({ id, ...policyData }) => ({
        url: `${POLICY_URL}/${id}/updatePolicy`,
        method: "PUT",
        body: policyData,
      }),
    }),

    // Delete a specific policy by ID
    deletePolicy: builder.mutation({
      query: (id) => ({
        url: `${POLICY_URL}/${id}/deletePolicy`,
        method: "DELETE",
      })
    }),
  }),
});

export const {
  useCreatePolicyMutation,
  useGetAllPoliciesQuery,
  useGetPolicyByIdQuery,
  useUpdatePolicyMutation,
  useDeletePolicyMutation,
} = policyApiSlice;
