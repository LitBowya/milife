import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    policyType: {
      type: String,
      enum: ["Health", "Car", "House"],
      required: true,
    },
    coverageDetails: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    durationInMonths: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    filePaths: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Policy = mongoose.model("Policy", policySchema);
export default Policy;
