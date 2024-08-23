import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
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
  claimType: {
    type: String,
    enum: ["Health", "Car", "House"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  description: {
    type: String,
    required: true,
  },
  claimDate: {
    type: Date,
    default: Date.now,
  },
}, {
    timestamps: true
});

const Claim = mongoose.model("Claim", claimSchema);
export default Claim;
