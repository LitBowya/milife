import { CLAIM_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const claimsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create a new claim
        createClaim: builder.mutation({
            query: (claimData) => ({
                url: `${CLAIM_URL}/create`,
                method: "POST",
                body: claimData,
            }),
            invalidatesTags: ["Claims"], // Invalidate cache for claims after creating a new claim
        }),

        // Get all claims for the authenticated user
        getAllClaims: builder.query({
            query: () => ({
                url: `${CLAIM_URL}`,
                method: "GET",
            }),
        }),

        getClaimById: builder.query({
            query: (userId) => ({
                url: `${CLAIM_URL}/getclaim`,
                method: "POST",
                body: { userId },
            }),
        }),

        // Update a specific claim by ID
        updateClaim: builder.mutation({
            query: ({ id, ...updatedData }) => ({
                url: `${CLAIM_URL}/${id}/updateClaim`,
                method: "PUT",
                body: updatedData,
            }),
        }),

        // Delete a specific claim by ID
        deleteClaim: builder.mutation({
            query: (id) => ({
                url: `${CLAIM_URL}/${id}/deleteClaim`,
                method: "DELETE",
            }),
            invalidatesTags: ["Claims"], // Invalidate cache for claims after deletion
        }),
    }),
});

export const {
    useCreateClaimMutation,
    useGetAllClaimsQuery,
    useGetClaimByIdQuery,
    useUpdateClaimMutation,
    useDeleteClaimMutation,
} = claimsApiSlice;
