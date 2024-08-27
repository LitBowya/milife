import express from "express";
import {
  getPayments,
  initiatePayment,
    verifyPayment,
    getAllPayments
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get payments
router.post("/getpayment", protect, getPayments);

// Get All payments
router.get("/getallpayment", protect, getAllPayments);

// Initiate Payment
router.post("/pay", initiatePayment);

// Verify Payment
router.get("/verify", verifyPayment);

export default router;
