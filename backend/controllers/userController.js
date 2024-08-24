import User from "../models/userModel.js";
import logger from "../utils/logger.js";

// Get User Profile
export const getUserProfile = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            logger.error(`User not found: ${req.user._id}`);
            return res
                .status(404)
                .json({ status: "failed", message: "User not found" });
        }
        logger.info(`User profile fetched successfully: ${req.user.id}`);
        res.json({
            status: "success",
            message: "User profile fetched successfully",
            user,
        });
    } catch (error) {
        logger.error(`Error fetching user profile: ${error.message}`);
        res
            .status(500)
            .json({ status: "failed", message: "Internal Server Error" });
        next(error);
    }
};

// Update User Profile
export const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            logger.error(`User not found: ${req.user.id}`);
            return res
                .status(404)
                .json({ status: "failed", message: "User not found" });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        logger.info(`User profile updated successfully: ${req.user.id}`);
        res.json({
            status: "success",
            message: "User profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        logger.error(`Error updating user profile: ${error.message}`);
        res
            .status(500)
            .json({ status: "failed", message: "Internal Server Error" });
        next(error);
    }
};

// Get All Users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        logger.info("Users list fetched successfully");
        res.json({
            status: "success",
            message: "Users list fetched successfully",
            users,
        });
    } catch (error) {
        logger.error(`Error fetching users list: ${error.message}`);
        res
            .status(500)
            .json({ status: "failed", message: "Internal Server Error" });
        next(error);
    }
};

// Get User By ID
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            logger.error(`User not found: ${req.params.id}`);
            return res
                .status(404)
                .json({ status: "failed", message: "User not found" });
        }
        logger.info(`User fetched successfully: ${req.params.id}`);
        res.json({
            status: "success",
            message: "User fetched successfully",
            user,
        });
    } catch (error) {
        logger.error(`Error fetching user by ID: ${error.message}`);
        res
            .status(500)
            .json({ status: "failed", message: "Internal Server Error" });
        next(error);
    }
};

// Delete User
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            logger.error(`User not found: ${req.params.id}`);
            return res
                .status(404)
                .json({ status: "failed", message: "User not found" });
        }

        if (user.isAdmin) {
            logger.error(`Attempt to delete admin user: ${req.params.id}`);
            return res
                .status(400)
                .json({ status: "failed", message: "Cannot delete admin user" });
        }

        await User.deleteOne({ _id: user._id });
        logger.info(`User deleted successfully: ${req.params.id}`);
        res.json({
            status: "success",
            message: "User deleted successfully",
        });
    } catch (error) {
        logger.error(`Error deleting user: ${error.message}`);
        res
            .status(500)
            .json({ status: "failed", message: "Internal Server Error" });
        next(error);
    }
};
