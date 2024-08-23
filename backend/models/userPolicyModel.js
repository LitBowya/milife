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
  },
  {
    timestamps: true,
  }
);

const UserPolicy = mongoose.model("UserPolicy", userPolicySchema);
export default UserPolicy;
