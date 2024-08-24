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
import ProfilePage from "./pages/User/ProfilePage";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import AdminLayout from "./pages/Admin/AdminLayout";
import UserDashboardHome from "./pages/User/UserDashboardHome";
import AdminDashboardOverview from "./pages/Admin/AdminDashboardOverview";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageClaims from "./pages/Admin/ManageClaims";
import ManagePolicy from "./pages/Admin/ManagePolicy";
import CreatePolicy from "./pages/Admin/CreatePolicy";
import Payment from "./pages/Admin/Payment";
import MyClaims from "./pages/User/MyClaims";
import MyPayments from "./pages/User/MyPayments";
import MyPolicies from "./pages/User/MyPolicies";
import Policies from "./pages/User/Policies";
import CreateClaim from "./pages/User/CreateClaim";

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
        <Route path="policies" element={<Policies />} />
        <Route path="mypolicies" element={<MyPolicies />} />
        <Route path="myclaims" element={<MyClaims />} />
        <Route path="createclaims" element={<CreateClaim />} />
        <Route path="mypayments" element={<MyPayments />} />
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
        <Route path="users" element={<ManageUsers />} />
        <Route path="claims" element={<ManageClaims />} />
        <Route path="policies" element={<ManagePolicy />} />
        <Route path="createpolicy" element={<CreatePolicy />} />
        <Route path="payments" element={<Payment />} />
        {/* Other admin-specific routes */}
      </Route>
    </Route>
  )
);

export default router;
