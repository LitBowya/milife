import express from "express";
import {
    createPolicy,
    getPolicyById,
    updatePolicy,
    deletePolicy,
    getAllPolicies,
} from "../controllers/policyController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { uploadMultipleImages } from "../utils/fileUpload.js";

const router = express.Router();

// Create a new policy
router.post("/create", uploadMultipleImages, protect, createPolicy);

// Get all policies
router.get("/getAllPolicy", protect, getAllPolicies);

// Get a specific policy by ID
router.post("/getPolicy", protect, getPolicyById);

// Update a specific policy by ID
router.put("/:id/updatePolicy", protect, admin, updatePolicy);

// Delete a specific policy by ID
router.delete("/:id/deletePolicy", protect, admin, deletePolicy);

export default router;
