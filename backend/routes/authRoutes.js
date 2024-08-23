import express from "express";
import {
  registerUser,
    loginUser,
  logoutUser
} from "../controllers/authController.js";
import { uploadSingleImage} from "../utils/fileUpload.js";

const router = express.Router();

// Registration Route
router.post("/register", uploadSingleImage, registerUser);

// Email/Password Login Route
router.post("/login", loginUser);

// Logout Route
router.post("/logout", logoutUser);

export default router;
