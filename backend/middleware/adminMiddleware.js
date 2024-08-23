// middleware/adminMiddleware.js
import User from "../models/userModel.js";
import logger from "../utils/logger.js";

const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      logger.error(`Unauthorized access attempt by user: ${req.user.id}`);
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (error) {
    logger.error(`Error checking admin status: ${error.message}`);
    next(error);
  }
};

export default admin;
