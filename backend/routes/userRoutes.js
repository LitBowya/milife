import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get User Profile
router.post("/getprofile", protect, getUserProfile);

// Update User Profile
router.put("/updateProfile", protect, updateUserProfile);

router.route("/").get(getUsers);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById);

export default router;
