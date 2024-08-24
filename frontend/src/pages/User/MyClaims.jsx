import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Alert,
} from "@mui/material";
import { Spin, Card } from "antd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetClaimByIdQuery } from "../../slices/claimApiSlice";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/formatDate";

const MyClaims = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo.user._id;

  // Fetch claims using the provided query hook
  const {
    data: claims,
    isLoading,
    isError,
  } = useGetClaimByIdQuery(userId);

  // Handle loading state
    if (isLoading) return <Spin size="large" />;
    console.log(claims)

  // Handle error state
  if (isError) {
    return (
      <Card sx={{ padding: 2, margin: 2 }}>
        <Alert severity="info">You have no policies available</Alert>
      </Card>
    );
  }

  return (
    <Card sx={{ padding: 2, margin: 2 }}>
      <Typography sx={{ marginBottom: 2 }}>My Claims</Typography>
      {claims && claims.claims.length === 0 ? (
        <Typography>No claims found.</Typography>
      ) : (
        claims &&
        claims?.claims.map((claim, index) => (
          <Accordion key={index} sx={{ marginBottom: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography>
                {claim && claim?.claimType}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Typography>
                  <strong>Status:</strong> {claim.status}
                </Typography>
                <Typography>
                  <strong>Date Filed:</strong> {formatDate(claim.claimDate)}
                </Typography>
                <Typography>
                  <strong>Description:</strong> {claim.description}
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

export default MyClaims;
