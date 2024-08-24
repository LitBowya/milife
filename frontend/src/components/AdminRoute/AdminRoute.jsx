import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return userInfo && userInfo.user.isAdmin ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
