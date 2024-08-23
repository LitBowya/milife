// controllers/authController.js
import User from "../models/userModel.js";
import logger from "../utils/logger.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// Register a new user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: "failed",
        message: "User already exists",
      });
    }

    // Check if a profile image was uploaded
    const profilePicture = req.file ? `/${req.file.path}` : "";

    // Create new user
    user = new User({
      name,
      email,
      password,
      profilePicture,
    });

    await user.save();

    // Generate and set JWT token
    generateToken(res, user._id);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
    next(error);
  }
};


// Login a user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      logger.error(`User not found: ${email}`);
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid email" });
    }

    // Validate password using the matchPassword method
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      logger.error(`Invalid password for user: ${email}`);
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid password" });
    }

    // Generate and set JWT token
    generateToken(res, user.id);

    logger.info(`User ${email} logged in successfully`);
    res.json({ status: "success", message: "Login successful", user });
  } catch (error) {
    logger.error(`Error logging in user: ${error.message}`);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
    next(error);
  }
};

// Logout a user
export const logoutUser = (req, res, next) => {
  try {
    // Clear the JWT token by setting it to expire immediately
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    logger.info(`User logged out successfully`);
    res.status(200).json({ status: "success", message: "Logout successful" });
  } catch (error) {
    logger.error(`Error logging out user: ${error.message}`);
    res.status(500).json({ status: "failed", message: "Internal Server Error" });
    next(error);
  }
};
