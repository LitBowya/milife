// config/paystack.js
import Paystack from "paystack-api";

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

export default paystack;
