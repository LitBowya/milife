import Policy from "../models/policyModel.js";
import logger from "../utils/logger.js";

// Create a new policy
export const createPolicy = async (req, res, next) => {
  try {
    const { policyType, coverageDetails, durationInMonths, amount } = req.body;

    if (!policyType || !coverageDetails || !durationInMonths || !amount) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }

    // Check if files were uploaded
    const files = req.files;

    // Create an array of file paths
    const filePaths = files.map((file) => file.path);

    const policy = new Policy({
      policyType,
      coverageDetails,
      durationInMonths,
      amount,
      filePaths,
      startDate: new Date(), // Set start date as current date
      expiryDate: new Date(
        new Date().setMonth(new Date().getMonth() + durationInMonths)
      ),
    });

    const createdPolicy = await policy.save();
    logger.info(`Policy created successfully: ${createdPolicy._id}`);
    res.status(201).json({
      status: "success",
      message: "Policy created successfully",
      policy: createdPolicy,
    });
  } catch (error) {
    logger.error(`Error creating policy: ${error.message}`);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
    next(error);
  }
};

// Get all policies
export const getAllPolicies = async (req, res, next) => {
  try {
    const policies = await Policy.find();
    logger.info("Policies fetched successfully");
    res.json({
      status: "success",
      message: "Policies fetched successfully",
      policies,
    });
  } catch (error) {
    logger.error(`Error fetching policies: ${error.message}`);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
    next(error);
  }
};

// Get a specific policy
export const getPolicyById = async (req, res, next) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) {
      return res
        .status(404)
        .json({ status: "failed", message: "Policy not found" });
    }
    logger.info(`Policy fetched successfully: ${policy._id}`);
    res.json({
      status: "success",
      message: "Policy fetched successfully",
      policy,
    });
  } catch (error) {
    logger.error(`Error fetching policy: ${error.message}`);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
    next(error);
  }
};

// Update Policy by ID
export const updatePolicy = async (req, res, next) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      logger.error(`Policy not found: ${req.params.id}`);
      return res
        .status(404)
        .json({ status: "failed", message: "Policy not found" });
    }

    // Ensure the policy belongs to the user or the user is an admin
    if (policy.userId.toString() !== req.user.id && !req.user.isAdmin) {
      logger.error(`Unauthorized access to policy: ${req.params.id}`);
      return res
        .status(403)
        .json({ status: "failed", message: "Unauthorized" });
    }

    // Update the policy fields
    policy.policyType = req.body.policyType || policy.policyType;
    policy.coverageDetails = req.body.coverageDetails || policy.coverageDetails;
    policy.expiryDate = req.body.expiryDate || policy.expiryDate;

    const updatedPolicy = await policy.save();
    logger.info(`Policy updated successfully: ${req.params.id}`);
    res.json({
      status: "success",
      message: "Policy updated successfully",
      policy: updatedPolicy,
    });
  } catch (error) {
    logger.error(`Error updating policy: ${error.message}`);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
    next(error);
  }
};

// Delete Policy by ID
export const deletePolicy = async (req, res, next) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      logger.error(`Policy not found: ${req.params.id}`);
      return res
        .status(404)
        .json({ status: "failed", message: "Policy not found" });
    }

    // Ensure the policy belongs to the user or the user is an admin
    if (policy.userId.toString() !== req.user.id && !req.user.isAdmin) {
      logger.error(`Unauthorized access to policy: ${req.params.id}`);
      return res
        .status(403)
        .json({ status: "failed", message: "Unauthorized" });
    }

    await policy.remove();
    logger.info(`Policy deleted successfully: ${req.params.id}`);
    res.json({ status: "success", message: "Policy removed" });
  } catch (error) {
    logger.error(`Error deleting policy: ${error.message}`);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
    next(error);
  }
};
