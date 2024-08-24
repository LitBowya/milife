import express from "express";
import {
  createClaim,
  getClaimById,
  updateClaim,
  deleteClaim,
  getAllClaims,
} from "../controllers/claimController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new claim
router.post("/create", protect, createClaim);

// Get all claims
router.get("/getclaims", getAllClaims);

// Get a specific claim by ID
router.post("/getclaim", getClaimById);

// Update a specific claim by ID
router.put("/:id/updateClaim", protect, updateClaim);

// Delete a specific claim by ID
router.delete("/:id/deleteClaim", protect, deleteClaim);

export default router;
