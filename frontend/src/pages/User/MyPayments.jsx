import {Card, Spin} from "antd"
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetPaymentsQuery } from "../../slices/paymentApiSlice";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/formatDate";

const MyPayments = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo.user._id;

  // Fetch payments using the provided query hook
  const {
    data: payments,
    isLoading,
    isError,
    error,
  } = useGetPaymentsQuery(userId);

  // Handle loading state
  if (isLoading) return <Spin size="large" />;

  // Handle error state
  if (isError) {
    return (
      <Card sx={{ padding: 2, margin: 2 }}>
        <Alert severity="error">Error: {error.message}</Alert>
      </Card>
    );
  }

  return (
    <Card sx={{ padding: 2, margin: 2 }}>
      <Typography sx={{ marginBottom: 2 }}>My Payments</Typography>
      {payments?.payments.length === 0 ? (
        <Typography>No payments found.</Typography>
      ) : (
        payments?.payments.map((payment, index) => (
          <Accordion key={index} sx={{ marginBottom: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography>Policy: {payment.policyId.policyType}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Typography>
                  <strong>Amount:</strong> GHS {payment.amount}
                </Typography>
                <Typography>
                  <strong>Date:</strong>{" "}
                  {formatDate(payment.paymentDate)}
                </Typography>
                <Typography>
                  <strong>Status:</strong> {payment.status}
                </Typography>
                <Typography>
                  <strong>TransactionId:</strong> {payment.transactionId}
                </Typography>
                <Typography>
                  <strong>Payment Method:</strong> {payment.paymentMethod}
                </Typography>
                {/* Add more fields as needed */}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Card>
  );
};

export default MyPayments;
