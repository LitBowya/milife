import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  useGetAllPoliciesQuery,
  useDeletePolicyMutation,
} from "../../slices/policyApiSlice";
import { formatDate } from "../../utils/formatDate";

const ManagePolicy = () => {
  const {
    data: policies,
    isLoading,
    error,
    refetch,
  } = useGetAllPoliciesQuery();
  const [deletePolicy] = useDeletePolicyMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPolicyId, setSelectedPolicyId] = useState(null);

  const handleDeleteClick = (policyId) => {
    setSelectedPolicyId(policyId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePolicy(selectedPolicyId).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete policy: ", error);
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error loading policies</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 3 }}>
        Manage Policies
      </Typography>
      {policies?.length === 0 ? (
        <Typography>No policies found</Typography>
      ) : (
        policies?.policies?.map((policy) => {
          const imagePicture = `${backendUrl}/${policy.filePaths[0]}`

          return (
            <Accordion key={policy._id} sx={{ marginBottom: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${policy._id}-content`}
                id={`panel-${policy._id}-header`}
              >
                <Avatar
                  src={imagePicture}
                  alt={policy.policyType}
                  sx={{ backgroundColor: "#ddd", marginRight: 2 }}
                />
                <Typography>{policy.policyType}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  <strong>Coverage Details:</strong> {policy.coverageDetails}
                </Typography>
                <Typography variant="body1">
                  <strong>Duration:</strong> {policy.durationInMonths} months
                </Typography>
                <Typography variant="body1">
                  <strong>Amount:</strong> GHS {policy.amount}
                </Typography>
                <Typography variant="body1">
                  <strong>Start Date:</strong> {formatDate(policy.startDate)}
                </Typography>
                <Typography variant="body1">
                  <strong>Expiry Date:</strong> {formatDate(policy.expiryDate)}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteClick(policy._id)}
                  sx={{ marginTop: 2 }}
                >
                  Delete Policy
                </Button>
              </AccordionDetails>
            </Accordion>
          );
        })
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Policy Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this policy? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagePolicy;
