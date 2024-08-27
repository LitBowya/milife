import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useCreatePolicyMutation } from "../../slices/policyApiSlice";

const CreatePolicy = () => {
  const [policyType, setPolicyType] = useState("");
  const [coverageDetails, setCoverageDetails] = useState("");
  const [durationInMonths, setDurationInMonths] = useState("");
  const [amount, setAmount] = useState("");
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);

  const [createPolicy] = useCreatePolicyMutation();

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleCreatePolicy = async () => {
    handleCloseDialog();

    try {
      const formData = new FormData();
      formData.append("policyType", policyType);
      formData.append("coverageDetails", coverageDetails);
      formData.append("durationInMonths", durationInMonths);
      formData.append("amount", amount);
      for (let i = 0; i < files.length; i++) {
        formData.append("policies", files[i]);
      }

      await createPolicy(formData).unwrap();
      console.log("Policy created successfully");

      setPolicyType("");
      setCoverageDetails("");
      setDurationInMonths("");
      setAmount("");
      setFiles([]);
    } catch (error) {
      console.error("Failed to create policy: ", error);
    }
  };

  return (
    <Card
      sx={{
        padding: 3,
        bgcolor: "#f5f5f5",
        boxShadow: 3,
        "&:hover": { boxShadow: 6 },
        marginTop: 4,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 3 }}>
        Create Policy
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Policy Type</InputLabel>
            <Select
              value={policyType}
              label="Policy Type"
              onChange={(e) => setPolicyType(e.target.value)}
            >
              <MenuItem value="Car">Car</MenuItem>
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Coverage Details"
            value={coverageDetails}
            onChange={(e) => setCoverageDetails(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Duration (in months)"
            type="number"
            value={durationInMonths}
            onChange={(e) => setDurationInMonths(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component="label" fullWidth>
            Upload Files
            <input type="file" multiple hidden onChange={handleFileChange} />
          </Button>
          {files.length > 0 && (
            <Box mt={2}>
              {Array.from(files).map((file, index) => (
                <Typography key={index}>{file.name}</Typography>
              ))}
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            fullWidth
          >
            Create Policy
          </Button>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Policy Creation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to create this policy?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreatePolicy} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CreatePolicy;
