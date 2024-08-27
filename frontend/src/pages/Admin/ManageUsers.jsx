import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
  Avatar,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { formatDate } from "../../utils/formatDate";

const ManageUsers = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [expanded, setExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleOpenDialog = (userId) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUserId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(selectedUserId).unwrap();
      handleCloseDialog(); // Close the dialog after deletion
    } catch (err) {
      console.error("Failed to delete the user: ", err);
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading users</Typography>;

  return (
    <Card title="Manage Users" sx={{ padding: 2 }}>
      {users.length === 0 ? (
        <Typography>No users found</Typography>
      ) : (
        users.users.map((user) => {
          const profilePicture = `${backendUrl}${user.profilePicture}`;
          return (
            <Accordion
              key={user._id}
              expanded={expanded === user._id}
              onChange={handleChange(user._id)}
              sx={{ marginBottom: 1 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${user._id}-content`}
                id={`panel${user.id}-header`}
              >
                <Avatar
                  src={profilePicture}
                  alt={user.name}
                  sx={{ marginRight: 2 }}
                />
                <Typography>{user.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">Email: {user.email}</Typography>
                <Typography variant="body1">
                  isAdmin: {user.isAdmin ? "Yes" : "No"}
                </Typography>
                <Typography variant="body1">
                  Joined Date: {formatDate(user.createdAt)}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleOpenDialog(user._id)}
                  sx={{ marginTop: 2 }}
                >
                  Delete User
                </Button>
              </AccordionDetails>
            </Accordion>
          );
        })
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ManageUsers;
