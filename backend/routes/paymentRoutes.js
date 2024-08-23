import express from "express";
import {
  getPayments,
  initiatePayment,
  verifyPayment,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all payments
router.get("/getPayment", protect, getPayments);

// Initiate Payment
router.post("/pay", initiatePayment);

// Verify Payment
router.get("/verify", verifyPayment);

export default router;
