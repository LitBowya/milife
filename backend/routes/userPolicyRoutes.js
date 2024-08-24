import express from "express";
import {
  getUserPolicies,
} from "../controllers/userPolicyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user policies
router.post("/getUserPolicy", getUserPolicies);

export default router;
