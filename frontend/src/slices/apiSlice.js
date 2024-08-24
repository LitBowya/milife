import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api", // Use the relative path
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["UserPolicy", "Claim", "Policy", "Auth", "Payment", "User"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
