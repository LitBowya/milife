import Payment from "../models/paymentModel.js";
import UserPolicy from "../models/userPolicyModel.js";
import User from "../models/userModel.js";
import Policy from "../models/policyModel.js";
import paystack from "../config/paystackConfig.js";
import logger from "../utils/logger.js";

// Get all payments
export const getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ userId: req.user.id });
    logger.info(`Payments fetched successfully for user: ${req.user.id}`);
    res.json({
      status: "success",
      message: "Payments fetched successfully",
      payments,
    });
  } catch (error) {
    logger.error(`Error fetching payments: ${error.message}`);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
    next(error);
  }
};

// Create a new payment
export const createPayment = async (req, res, next) => {
  try {
    const { policyId, amount, paymentMethod, transactionId } = req.body;

    const payment = new Payment({
      userId: req.user.id,
      policyId,
      amount,
      paymentMethod,
      transactionId,
    });

    const createdPayment = await payment.save();
    logger.info(`Payment created successfully: ${createdPayment._id}`);
    res.status(201).json({
      status: "success",
      message: "Payment created successfully",
      payment: createdPayment,
    });
  } catch (error) {
    logger.error(`Error creating payment: ${error.message}`);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
    next(error);
  }
};

// Initiate Payment
export const initiatePayment = async (req, res, next) => {
  try {
    const { email, policyId } = req.body;

    if (!email || !policyId) {
      return res.status(400).json({
        status: "failed",
        message: "Email and policy ID are required",
      });
    }

    // Fetch the policy amount from the database
    const policy = await Policy.findById(policyId);
    if (!policy) {
      return res
        .status(404)
        .json({ status: "failed", message: "Policy not found" });
    }

    // Fetch the user based on email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }
    const userId = user._id;

      const amount = policy.amount; // Use the policy's amount

      logger.info("policyId", policyId)
      logger.info("userid", userId)
      logger.info("amount", amount)

    // Initialize Paystack payment with policy metadata
    const paymentData = {
      amount: amount * 100, // Paystack expects the amount in kobo (i.e., cents)
      email,
      metadata: {
        userId: userId.toString(), // Include user ID in metadata
        policyId: policyId, // Include policy ID in metadata
      },
      callback_url: process.env.PAYSTACK_CALLBACK_URL, // URL to redirect after payment
    };

    const response = await paystack.transaction.initialize(paymentData);

    if (response.status) {
      logger.info(`Payment initiated successfully for amount: ${amount}`);
      res.json({
        status: "success",
        message: "Payment initiated successfully",
        authorization_url: response.data.authorization_url,
      });
    } else {
      logger.error(`Payment initiation failed: ${response.message}`);
      res.status(400).json({ status: "failed", message: response.message });
    }
  } catch (error) {
    logger.error(`Error initiating payment: ${error.message}`);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
    next(error);
  }
};

// Verify Payment
export const verifyPayment = async (req, res, next) => {
  try {
    const { reference } = req.query;

    if (!reference) {
      return res
        .status(400)
        .json({ status: "failed", message: "Reference is required" });
    }

    // Verify the payment with Paystack
    const response = await paystack.transaction.verify({ reference });

    if (response.status) {
      const paymentData = response.data;

      if (
        !paymentData ||
        !paymentData.metadata ||
        !paymentData.metadata.policyId ||
        !paymentData.metadata.userId
      ) {
        return res
          .status(400)
          .json({ status: "failed", message: "Invalid payment data" });
      }

      const userId = paymentData.metadata.userId; // Retrieve user ID from metadata
      let payment = await Payment.findOne({
        transactionId: paymentData.reference,
      });
      if (!payment) {
        // Create a new payment record if it doesn't exist
        payment = new Payment({
          userId,
          policyId: paymentData.metadata.policyId,
          amount: paymentData.amount / 100, // Convert from kobo to currency
          paymentMethod: "Paystack",
          transactionId: paymentData.reference,
          status: "Completed", // Set payment status as completed
        });
        await payment.save();

        // Create a new user policy upon successful payment
        const policy = await Policy.findById(paymentData.metadata.policyId);
        if (!policy) {
          return res
            .status(404)
            .json({ status: "failed", message: "Policy not found" });
        }

        const userPolicy = new UserPolicy({
          userId,
          policyId: paymentData.metadata.policyId,
          amountPaid: paymentData.amount / 100, // Convert from kobo to currency
          startDate: new Date(), // Set start date as current date
          expiryDate: new Date(
            new Date().setMonth(new Date().getMonth() + policy.durationInMonths)
          ), // Set expiry date based on duration
        });
        await userPolicy.save();
      }

      logger.info(`Payment verified successfully: ${paymentData.reference}`);
      res.json({
        status: "success",
        message: "Payment verified successfully",
        payment,
      });
    } else {
      logger.error(`Payment verification failed: ${response.message}`);
      res.status(400).json({ status: "failed", message: response.message });
    }
  } catch (error) {
    logger.error(`Error verifying payment: ${error.message}`);
    if (!res.headersSent) {
      res
        .status(500)
        .json({ status: "failed", message: "Internal Server Error" });
    }
    next(error);
  }
};
