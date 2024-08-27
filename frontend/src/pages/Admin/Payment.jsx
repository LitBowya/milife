import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetAllPaymentsQuery } from "../../slices/paymentApiSlice";
import { formatDate } from "../../utils/formatDate"; // Ensure this utility exists for formatting dates

const Payment = () => {
  const { data: payments, isLoading, error } = useGetAllPaymentsQuery();

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error loading payments</Typography>;

  console.log("all payments", payments);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography sx={{ marginBottom: 3 }}>
        Payments
      </Typography>
      {payments?.length === 0 ? (
        <Typography>No payments found</Typography>
      ) : (
        payments?.payments?.map((payment) => {
          return (
            <Accordion key={payment._id} sx={{ marginBottom: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${payment._id}-content`}
                id={`panel-${payment._id}-header`}
              >
                <Typography sx={{ flexGrow: 1 }}>
                  Payment ID: {payment._id}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  <strong>Amount:</strong> GHS {payment.amount} {payment.currency}
                </Typography>
                <Typography variant="body1">
                  <strong>Paid By:</strong> GHS {payment.amount}
                </Typography>
                <Typography variant="body1">
                  <strong>User Email:</strong> GHS {payment.amount}
                </Typography>
                <Typography variant="body1">
                  <strong>Date:</strong> {formatDate(payment.paymentDate)}
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong> {payment.status}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })
      )}
    </Box>
  );
};

export default Payment;
