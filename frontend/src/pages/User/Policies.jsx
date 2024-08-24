import { Card, Button, notification } from "antd";
import { useGetAllPoliciesQuery } from "../../slices/policyApiSlice";
import {
  styled,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { Spin } from "antd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useInitiatePaymentMutation } from "../../slices/paymentApiSlice";
import { useSelector } from "react-redux";

// Custom styled component using MUI's styled utility
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#f6f8fa",
  borderRadius: "10px",
  padding: "16px",
  margin: "5px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
}));

// The Policies component
const Policies = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { data: policies, isLoading } = useGetAllPoliciesQuery();

  const [
    initiatePayment,
    { isLoading: isPaymentLoading },
  ] = useInitiatePaymentMutation();

  if (isLoading) return <Spin size="large" />;

  // Handle payment initiation
const handlePayment = async (policy) => {
  try {
    const email = userInfo.user.email;
    const policyId = policy._id;
    const paymentData = { email, policyId };

    // Initiate payment and unwrap response
    const response = await initiatePayment(paymentData).unwrap();
    console.log("Payment response:", response);

    const authorizationUrl = response?.data?.authorization_url;

    if (response.status === "success" && authorizationUrl) {
      notification.success({
        message: "Payment Initiated",
        description: "Your payment process has been started successfully.",
      });
      // Redirect user to the authorization URL
      window.location.href = authorizationUrl;
    } else {
      notification.error({
        message: "Payment Failed",
        description:
          response.message ||
          "There was an error initiating the payment. Please try again.",
      });
    }
  } catch (error) {
    console.error("Payment initiation error:", error);
    const errorMessage =
      error?.data?.message ||
      "There was an error initiating the payment. Please try again.";
    notification.error({
      message: "Payment Failed",
      description: errorMessage,
    });
  }
};


  return (
    <StyledCard title="Policies">
      {policies?.policies.map((policy) => (
        <Accordion key={policy._id} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${policy._id}-content`}
            id={`panel-${policy._id}-header`}
          >
            <Typography>
              {policy.policyType} - {policy._id}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Amount:</strong> {policy.amount}
              <br />
              <strong>Duration:</strong> {policy.durationInMonths} months
              <br />
              <strong>Coverage Details:</strong> {policy.coverageDetails}
              <br />
              <strong>Status:</strong> {policy.isActive ? "Active" : "Inactive"}
            </Typography>
            <Button
              type="primary"
              onClick={() => handlePayment(policy)}
              loading={isPaymentLoading}
              disabled={policy.isActive === false}
              style={{ marginTop: 16 }}
            >
              Pay Now
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </StyledCard>
  );
};

export default Policies;
