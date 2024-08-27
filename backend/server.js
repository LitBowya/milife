import express from "express";
import path from "path";
import session from "express-session";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";
import authRoutes from "./routes/authRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import policyRoutes from "./routes/policyRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import userPolicyRoutes from "./routes/userPolicyRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./utils/renewPolicies.js";

// 1. Initialize environment variables
dotenv.config();

// 2. Initialize Express app
const app = express();

// 3. Database connection
connectDB();

// 4. Enable CORS for frontend communication
app.use(
    cors({
        origin: ["http://localhost:5173"], // Allow requests from the Vite frontend
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // Allow sending cookies with requests
    })
);

// 5. Middleware for parsing cookies
app.use(cookieParser());

// 6. Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 7. Serve static files from the "uploads" directory in the root
app.use('/uploads', express.static(path.join(path.resolve(), "uploads")));

// 8. Session management
app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

// 9. Define API routes
app.use("/api/auth", authRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/userpolicy", userPolicyRoutes);
app.use("/api", contactRoutes);

// 10. Error handling middleware
app.use(errorHandler);

// 11. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
