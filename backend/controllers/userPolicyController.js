
import UserPolicy from "../models/userPolicyModel.js";
import Policy from "../models/policyModel.js";
import Payment from "../models/paymentModel.js";
import logger from "../utils/logger.js";

// Create a new user policy
export const createUserPolicy = async (req, res, next) => {
  try {
    const { userId, policyId, amountPaid } = req.body;

    // Validate required fields
    if (!userId || !policyId || !amountPaid) {
      return res
        .status(400)
        .json({
          status: "failed",
          message: "User ID, policy ID, and amount paid are required",
        });
    }

    // Find the policy
    const policy = await Policy.findById(policyId);
    if (!policy) {
      return res
        .status(404)
        .json({ status: "failed", message: "Policy not found" });
    }

    // Create the user policy
    const userPolicy = new UserPolicy({
      userId,
      policyId,
      amountPaid,
      startDate: new Date(), // Set start date as current date
      expiryDate: new Date(
        new Date().setMonth(new Date().getMonth() + policy.durationInMonths)
      ), // Set expiry date based on duration
    });

    const createdUserPolicy = await userPolicy.save();
    logger.info(`User policy created successfully: ${createdUserPolicy._id}`);
    res.status(201).json({
      status: "success",
      message: "User policy created successfully",
      userPolicy: createdUserPolicy,
    });
  } catch (error) {
    logger.error(`Error creating user policy: ${error.message}`);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
    next(error);
  }
};

// Get user policies
export const getUserPolicies = async (req, res, next) => {
  try {
    const userPolicies = await UserPolicy.find({
      userId: req.user.id,
    }).populate("policyId");
    logger.info(`User policies fetched successfully for user: ${req.user.id}`);
    res.json({
      status: "success",
      message: "User policies fetched successfully",
      userPolicies,
    });
  } catch (error) {
    logger.error(`Error fetching user policies: ${error.message}`);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
    next(error);
  }
};
