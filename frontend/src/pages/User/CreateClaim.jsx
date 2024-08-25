import { useState } from "react";
import { Spin, Card } from "antd";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
} from "@mui/material";
import { notification } from "antd";
import { useCreateClaimMutation } from "../../slices/claimApiSlice";
import { useGetUserPoliciesQuery } from "../../slices/userPolicyApiSlice";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/formatDate";

const CreateClaim = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo.user._id;
  const {
    data: policies,
    isLoading: isLoadingPolicies,
    isError: isPoliciesError,
    refetch,
  } = useGetUserPoliciesQuery(userId);

  const [createClaim, { isLoading: isCreating, isError: isCreatingError }] =
    useCreateClaimMutation();

  const [policyId, setPolicyId] = useState("");
  const [claimType, setClaimType] = useState(""); // claimType here will reflect the policyName selected
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createClaim({ policyId, claimType, description }).unwrap();
      notification.success({
        message: "Claim Created",
        description: "Claim created successfully.",
      });
      refetch();
      // Reset form after successful submission
      setPolicyId("");
      setClaimType("");
      setDescription("");
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        "There was an error creating the claim. Please try again.";
      notification.error({
        message: "Creation Failed",
        description: errorMessage,
      });
    }
  };

  const handleChange = (event) => {
    const selectedPolicy = policies.userPolicy.find(
      (policy) => policy._id === event.target.value
    );
    setPolicyId(event.target.value);
    setClaimType(selectedPolicy ? selectedPolicy.policyName : ""); // Reflect policyName in claimType
  };

  if (isLoadingPolicies) return <Spin size="large" />;
  if (isPoliciesError)
      return (
        <Card sx={{ padding: 2, margin: 2 }}>
          <Alert severity="info">You have no current policies</Alert>
        </Card>
      );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ padding: 2, maxWidth: 600, margin: "auto" }}
    >
      <Typography sx={{ marginBottom: 2 }}>Create New Claim</Typography>

      {isCreatingError && <Alert severity="error">Error creating claim.</Alert>}

      {!policies?.userPolicy ? (
        <Alert severity="info">You have no current policies available.</Alert>
      ) : (
        <>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="policy-select-label">Policy Type</InputLabel>
            <Select
              labelId="policy-select-label"
              value={policyId}
              onChange={handleChange}
              required
              sx={{
                "& .MuiInputLabel-root": {
                  // Ensure label does not overlap
                  backgroundColor: "#eee",
                  padding: "0 4px",
                },
                "& .MuiInputLabel-shrink": {
                  // Adjust label when shrunk
                  top: "58px",
                  left: "50px",
                  fontSize: "5rem",
                  backgroundColor: "#eee",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                  // Ensure rounded borders are consistent
                },
              }}
            >
              {policies?.userPolicy?.map((policy) => (
                <MenuItem key={policy._id} value={policy._id}>
                  {policy.policyName} -{" "}
                  {`Purchased On ${formatDate(policy.purchaseDate)}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Claim Type"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={claimType} // Show selected policyName here
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isCreating}
          >
            {isCreating ? <CircularProgress size={24} /> : "Create Claim"}
          </Button>
        </>
      )}
    </Box>
  );
};

export default CreateClaim;
