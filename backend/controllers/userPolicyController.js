
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
      return res.status(400).json({
        status: "failed",
        message: "User ID, policy ID, and amount paid are required",
      });
    }

    // Find the policy by policyId
    const policy = await Policy.findById(policyId);
    if (!policy) {
      return res
        .status(404)
        .json({ status: "failed", message: "Policy not found" });
      }

      console.log('Policy found', policy)

    // Extract the policy name (using policyType as the name)
    const policyName = policy.policyType;
    console.log("This is the policy name: ", policyName);

    // Create the user policy with the policy name
    const userPolicy = new UserPolicy({
      userId,
      policyId,
      policyName,
      amountPaid,
      startDate: new Date(), // Set start date as current date
      expiryDate: new Date(
        new Date().setMonth(new Date().getMonth() + policy.durationInMonths)
      ), // Set expiry date based on policy duration
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
     const { userId } = req.body;

     const userPolicy = await UserPolicy.find({ userId });
     console.log(userPolicy);
     console.log("userid", userId);

     if (!userPolicy || userPolicy.length === 0) {
       logger.error(`No userPolicy found for user: ${userId}`);
       return res
         .status(404)
         .json({ status: "failed", message: "userPolicy not found" });
     }

     logger.info(`userPolicy fetched successfully for user: ${userId}`);
     res.json({
       status: "success",
       message: "userPolicy fetched successfully",
       userPolicy,
     });
   } catch (error) {
     logger.error(`Error fetching claims: ${error.message}`);
     res
       .status(500)
       .json({ status: "failed", message: "Internal Server Error" });
     next(error);
   }
};
