import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
  Card,
  Button,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  useGetAllClaimsQuery,
  useUpdateClaimMutation,
} from "../../slices/claimApiSlice";
import { formatDate } from "../../utils/formatDate";

const ManageClaims = () => {
  const {
    data: claimsData,
    isLoading,
    error,
    refetch,
  } = useGetAllClaimsQuery();
  const [updateClaim] = useUpdateClaimMutation();
  const [expanded, setExpanded] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Log the claims data to the console
    if (claimsData) {
      console.log("Claims Data:", claimsData);
    }
  }, [claimsData]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleStatusChange = async (claimId, newStatus) => {
    try {
      await updateClaim({ id: claimId, status: newStatus }).unwrap();
      refetch();
      console.log(`Claim ${claimId} status updated to ${newStatus}`);
    } catch (err) {
      console.error("Failed to update claim status: ", err);
    }
  };

  if (isLoading) return <Typography>Loading claims...</Typography>;
  if (error) return <Typography>Error loading claims</Typography>;

  return (
    <Card
      title="Manage Claims"
      sx={{
        padding: 2,
        bgcolor: "#f5f5f5",
        boxShadow: 3,
        "&:hover": { boxShadow: 6 },
      }}
    >
      {claimsData?.claims?.length === 0 ? (
        <Typography>No claims found</Typography>
      ) : (
        claimsData?.claims.map((claim) => {
          const profilePicture = `${backendUrl}${claim.userId?.profilePicture}`;
          return (
            <Accordion
              key={claim._id}
              expanded={expanded === claim._id}
              onChange={handleChange(claim._id)}
              sx={{ marginBottom: 1, bgcolor: "#ffffff" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${claim._id}-content`}
                id={`panel${claim._id}-header`}
              >
                <Avatar
                  src={profilePicture || "/default-avatar.png"} // Fallback avatar if user doesn't have one
                  alt={claim.userId?.name || "User"}
                  sx={{ marginRight: 2 }}
                />
                <Typography>
                  {claim.userId?.name || "Unknown User"} - {claim.claimType}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  User Email: {claim.userId?.email}
                </Typography>
                <Typography variant="body1">
                  Claim Type: {claim.claimType}
                </Typography>
                <Typography variant="body1">Status: {claim.status}</Typography>
                <Typography variant="body1">
                  Claim Date: {formatDate(claim.claimDate)}
                </Typography>
                <Typography variant="body1">
                  Description: {claim.description || "No description provided"}
                </Typography>

                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleStatusChange(claim._id, "Processing")
                      }
                      disabled={claim.status !== "Pending"}
                    >
                      Mark as Processing
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleStatusChange(claim._id, "Complete")}
                      disabled={claim.status !== "Processing"}
                    >
                      Mark as Complete
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleStatusChange(claim._id, "Decline")}
                      disabled={
                        claim.status === "Complete" ||
                        claim.status === "Decline"
                      }
                    >
                      Decline Claim
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })
      )}
    </Card>
  );
};

export default ManageClaims;
