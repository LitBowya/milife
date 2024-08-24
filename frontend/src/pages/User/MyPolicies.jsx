import { Card, Typography, Spin } from "antd";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetUserPoliciesQuery } from "../../slices/userPolicyApiSlice";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/formatDate";

// Custom styled component using MUI's styled utility
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#f6f8fa",
  borderRadius: "10px",
  padding: "16px",
  margin: "5px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
}));

const MyPolicies = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo.user._id;
  const { data: myPolicies, isLoading } = useGetUserPoliciesQuery(userId);

  // Display loading spinner while fetching data
  if (isLoading) return <Spin size="large" />;

  // Render policies in an accordion format
  return (
    <StyledCard title="My Policies">
      {myPolicies?.userPolicy.length > 0 ? (
        myPolicies.userPolicy.map((policy) => (
          <Accordion key={policy._id} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${policy._id}-content`}
              id={`panel-${policy._id}-header`}
            >
              <Typography>
                {policy.policyName} - {policy._id}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <strong>Amount:</strong> {policy.amountPaid}
                <br />
                <strong>Start Date:</strong> {formatDate(policy.startDate)}
                <br />
                <strong>Expiry Date:</strong> {formatDate(policy.expiryDate)}
                <br />
                <strong>Status:</strong>{" "}
                {policy.isActive ? "Active" : "Inactive"}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography>No policies found.</Typography>
      )}
    </StyledCard>
  );
};

export default MyPolicies;
