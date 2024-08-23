import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserLayout from "./pages/User/UserLayout";
import ProfilePage from "./pages/User/ProfilePage/ProfilePage";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import AdminLayout from "./pages/Admin/AdminLayout";
import UserDashboardHome from "./pages/User/UserDashboardHome";
import AdminDashboardOverview from "./pages/Admin/AdminDashboardOverview";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected User Routes */}
      <Route
        path="/userdashboard"
        element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboardHome />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admindashboard"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboardOverview />} />
        {/* Other admin-specific routes */}
      </Route>
    </Route>
  )
);

export default router;
