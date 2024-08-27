import { PAYMENT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all payments for the authenticated user
        getPayments: builder.query({
            query: (userId) => ({
                url: `${PAYMENT_URL}/getpayment`,
                method: "POST",
                body: { userId },
            })
        }),

        getAllPayments: builder.query({
            query: () => ({
                url: `${PAYMENT_URL}/getallpayment`,
                method: "GET"
            })
        }),

        // Initiate a new payment
        initiatePayment: builder.mutation({
            query: (paymentData) => ({
                url: `/payments/pay`,
                method: "POST",
                body: paymentData, // Send paymentData directly
            }),
            invalidatesTags: ["Payments"], // Invalidate cache related to payments
        }),

        // Verify a payment
        verifyPayment: builder.query({
            query: (reference) => ({
                url: `${PAYMENT_URL}/verify`,
                params: { reference },
            }),
            providesTags: ["Payments"], // Cache this data
        }),
    }),
});

export const {
    useGetPaymentsQuery,
    useGetAllPaymentsQuery,
    useInitiatePaymentMutation,
    useVerifyPaymentQuery,
} = paymentApiSlice;
