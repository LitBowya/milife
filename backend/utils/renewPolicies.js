import paystack from "../config/paystackConfig.js";
import Payment from "../models/paymentModel.js";
import UserPolicy from "../models/userPolicyModel.js";
import Policy from "../models/policyModel.js";
import logger from "./logger.js";

// Function to renew policies
const renewPolicies = async () => {
  try {
    const today = new Date();
    const expiringPolicies = await UserPolicy.find({
      expiryDate: { $lt: today },
      isActive: true,
    });

    for (const userPolicy of expiringPolicies) {
      const policy = await Policy.findById(userPolicy.policyId);
      if (!policy) {
        logger.warn(`Policy not found for user policy ID: ${userPolicy._id}`);
        continue;
      }

      // Create a new payment record
      const payment = new Payment({
        userId: userPolicy.userId,
        policyId: policy._id,
        amount: policy.amount,
        paymentMethod: "Paystack",
        transactionId: generateTransactionId(),
        status: "Pending",
      });

      await payment.save();

      // Initiate payment
      const paymentData = {
        amount: policy.amount * 100,
        email: user.email, // Retrieve user's email
        metadata: {
          userId: userPolicy.userId,
          policyId: policy._id,
        },
        callback_url: process.env.PAYSTACK_CALLBACK_URL,
      };

      const response = await paystack.transaction.initialize(paymentData);

      if (response.status) {
        logger.info(
          `Payment initiated successfully for user policy ID: ${userPolicy._id}`
        );
        // Update the user policy with the new expiry date
        userPolicy.expiryDate = new Date(
          new Date().setMonth(new Date().getMonth() + policy.durationInMonths)
        );
        await userPolicy.save();
      } else {
        logger.error(`Payment initiation failed: ${response.message}`);
      }
    }
  } catch (error) {
    logger.error(`Error during policy renewal: ${error.message}`);
  }
};

function generateTransactionId() {
  return "txn_" + Math.random().toString(36).substr(2, 9);
}

// Export or call renewPolicies function as needed
export default renewPolicies;
