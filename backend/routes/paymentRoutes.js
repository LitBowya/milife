import express from "express";
import {
  getPayments,
  initiatePayment,
  verifyPayment,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get payments
router.post("/getpayment", protect, getPayments);

// Get All payments
router.get("/getAllPayment", protect, getPayments);

// Initiate Payment
router.post("/pay", initiatePayment);

// Verify Payment
router.get("/verify", verifyPayment);

export default router;
