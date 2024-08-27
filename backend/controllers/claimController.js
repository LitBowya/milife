import Claim from "../models/claimModel.js";
import logger from "../utils/logger.js";

// Get All Claims
export const getAllClaims = async (req, res, next) => {
    try {
        const claims = await Claim.find({}).populate({
            path: "userId",
            select: "name email profilePicture",
        });
        logger.info(`Claims fetched successfully`);
        res.json({
            status: "success",
            message: "Claims fetched successfully",
            claims,
        });
    } catch (error) {
        logger.error(`Error fetching claims: ${error.message}`);
        res
            .status(500)
            .json({ status: "failed", message: "Internal Server Error" });
        next(error);
    }
};

// Get Claim by ID
export const getClaimById = async (req, res, next) => {
    try {
        const { userId } = req.body;

        // Fetch claims by userId and populate the policy details
        const claims = await Claim.find({ userId }).populate({
            path: "policyId",
            select: "policyType",
        });

        console.log(claims);
        console.log("userid", userId);

        if (!claims || claims.length === 0) {
            logger.error(`No claims found for user: ${userId}`);
            return res
                .status(404)
                .json({ status: "failed", message: "Claims not found" });
        }

        logger.info(`Claims fetched successfully for user: ${userId}`);
        res.json({
            status: "success",
            message: "Claims fetched successfully",
            claims,
        });
    } catch (error) {
        logger.error(`Error fetching claims: ${error.message}`);
        res
            .status(500)
            .json({ status: "failed", message: "Internal Server Error" });
        next(error);
    }
};

// Create a New Claim
export const createClaim = async (req, res, next) => {
    try {
        const { policyId, claimType, description } = req.body;

        const claim = new Claim({
            userId: req.user.id,
            policyId,
            claimType,
            description,
        });

        const createdClaim = await claim.save();
        logger.info(`Claim created successfully: ${createdClaim._id}`);
        res.status(201).json({
            status: "success",
            message: "Claim created successfully",
            claim: createdClaim,
        });
    } catch (error) {
        logger.error(`Error creating claim: ${error.message}`);
        res
            .status(500)
            .json({ status: "failed", message: "Internal Server Error" });
        next(error);
    }
};

// Update a Claim
export const updateClaim = async (req, res, next) => {
    try {
        const { policyId, claimType, status } = req.body; // Ensure description is destructured
        const updatedClaim = await Claim.findOneAndUpdate(
            { _id: req.params.id },
            { policyId, claimType, status }, // Update these fields
            { new: true } // Return the updated document
        );

        if (!updatedClaim) {
            logger.error(`Claim not found: ${req.params.id}`);
            return res.status(404).json({ status: "failed", message: "Claim not found" });
        }

        logger.info(`Claim updated successfully: ${req.params.id}`);
        res.json({
            status: "success",
            message: "Claim updated successfully",
            claim: updatedClaim,
        });
    } catch (error) {
        logger.error(`Error updating claim: ${error.message}`);
        res.status(500).json({ status: "failed", message: "Internal Server Error" });
        next(error);
    }
};


// Delete a Claim
export const deleteClaim = async (req, res, next) => {
    try {
        const deletedClaim = await Claim.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });
        if (!deletedClaim) {
            logger.error(`Claim not found: ${req.params.id}`);
            return res
                .status(404)
                .json({ status: "failed", message: "Claim not found" });
        }
        logger.info(`Claim deleted successfully: ${req.params.id}`);
        res.json({ status: "success", message: "Claim deleted successfully" });
    } catch (error) {
        logger.error(`Error deleting claim: ${error.message}`);
        res
            .status(500)
            .json({ status: "failed", message: "Internal Server Error" });
        next(error);
    }
};
