import mongoose from "mongoose";

const userPolicySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    policyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
      required: true,
    },
    policyName: {
        type: String,
        required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
      default: Date.now, // Default to current date if not provided
    },
    expiryDate: {
      type: Date,
      required: true, // Ensure expiry date is always set
    },
  },
  {
    timestamps: true,
  }
);

const UserPolicy = mongoose.model("UserPolicy", userPolicySchema);
export default UserPolicy;
