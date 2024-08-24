
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../../slices/usersApiSlice";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import { formatDate } from "../../utils/formatDate";

const ProfilePage = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo.user._id;

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useGetProfileQuery(userId);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="error">Error: {error.message}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 2,
        maxWidth: 600,
        margin: "auto",
        mt: 4,
      }}
    >
      <Card>
        <CardContent sx={{ textAlign: "center" }}>
          <Avatar
            alt={profile.name}
            src={profile.profilePicture}
            sx={{ width: 100, height: 100, margin: "auto" }}
          />
          <Typography variant="h5" color="textSecondary" gutterBottom>
            {profile.user.name}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {profile.user.email}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            <strong>Joined:</strong> {formatDate(profile.user.createdAt)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
