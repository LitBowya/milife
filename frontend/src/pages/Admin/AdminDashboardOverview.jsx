import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import {
  FaFileAlt,
  FaUser,
  FaRegFileAlt,
  FaDollarSign,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useGetAllPoliciesQuery } from "../../slices/policyApiSlice";
import { useGetUsersQuery } from "../../slices/usersApiSlice";
import { useGetAllClaimsQuery } from "../../slices/claimApiSlice";
import { useGetAllPaymentsQuery } from "../../slices/paymentApiSlice";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import {
  BarChart,
  Bar,
  XAxis as BarXAxis,
  YAxis as BarYAxis,
  Tooltip as BarTooltip,
  Legend as BarLegend,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import dayjs from "dayjs"; // For date manipulation
import { format } from "date-fns"; // For date formatting

// Helper function to convert month number to short month name
const getMonthName = (monthNumber) => {
  const date = new Date(2000, monthNumber - 1); // Year is arbitrary
  return format(date, "MMM"); // Use short month format (e.g., "Jan", "Feb")
};

// Function to get month-year from date and sort data
const getSortedMonthlyData = (data, dateField, valueField) => {
  const monthlyData = {};

  data.forEach((item) => {
    const monthYear = dayjs(item[dateField]).format("YYYY-MM");
    const monthNumber = parseInt(dayjs(item[dateField]).format("M"));
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { monthYear, count: 0 };
    }
    monthlyData[monthYear].count += valueField ? item[valueField] : 1;
  });

  // Generate data for all months from January to December
  const allMonths = Array.from({ length: 12 }, (_, i) => {
    const monthYear = dayjs().month(i).format("YYYY-MM");
    return { monthYear, count: 0 };
  });

  // Combine and sort data
  const sortedData = allMonths.map((month) => {
    const monthKey = dayjs()
      .month(month.monthYear.split("-")[1] - 1)
      .format("YYYY-MM");
    return monthlyData[monthKey] || month;
  });

  return sortedData.map((item) => ({
    ...item,
    monthYear: getMonthName(parseInt(item.monthYear.split("-")[1], 10)), // Get short month name
  }));
};

const AdminDashboardOverview = () => {
  const { data: allPolicies } = useGetAllPoliciesQuery();
  const { data: allUsers } = useGetUsersQuery();
  const { data: allClaims } = useGetAllClaimsQuery();
  const { data: allPayments } = useGetAllPaymentsQuery();

  // Default values in case data is undefined or null
  const policies = allPolicies?.policies || [];
  const users = allUsers?.users || [];
  const claims = allClaims?.claims || [];
  const payments = allPayments?.payments || [];

  // Calculate monthly data
  const usersByMonth = getSortedMonthlyData(users, "createdAt");
  const paymentsByMonth = getSortedMonthlyData(payments, "createdAt", "amount");
  const claimsByMonth = getSortedMonthlyData(claims, "createdAt");

  // Total Revenue
  const totalRevenue = payments.reduce(
    (total, payment) => total + (payment.amount || 0),
    0
  );
  const paymentCount = payments.length;

  return (
    <Grid container spacing={3}>
      {/* Top Row */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{ bgcolor: "white", boxShadow: 3, "&:hover": { boxShadow: 6 } }}
        >
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{ display: "flex", alignItems: "center", color: "black" }}
            >
              <FaFileAlt style={{ color: "#f57f17", marginRight: "8px" }} />{" "}
              Policies
            </Typography>
            <Typography variant="h5" color="text.primary">
              {policies.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{ bgcolor: "white", boxShadow: 3, "&:hover": { boxShadow: 6 } }}
        >
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{ display: "flex", alignItems: "center", color: "black" }}
            >
              <FaUser style={{ color: "#000", marginRight: "8px" }} /> Users
            </Typography>
            <Typography variant="h5" color="text.primary">
              {users.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{ bgcolor: "white", boxShadow: 3, "&:hover": { boxShadow: 6 } }}
        >
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{ display: "flex", alignItems: "center", color: "black" }}
            >
              <FaRegFileAlt style={{ color: "#f1f", marginRight: "8px" }} />{" "}
              Claims
            </Typography>
            <Typography variant="h5" color="text.primary">
              {claims.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Bottom Row */}
      <Grid item xs={12} sm={6} md={6}>
        <Card
          sx={{ bgcolor: "white", boxShadow: 3, "&:hover": { boxShadow: 6 } }}
        >
          <CardContent>
            <Typography variant="h6" component="div" sx={{ color: "black" }}>
              <FaDollarSign style={{ color: "#00796b", marginRight: "8px" }} />{" "}
              Total Revenue
            </Typography>
            <Typography variant="h5" color="text.primary">
              GHS {totalRevenue.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <Card
          sx={{ bgcolor: "white", boxShadow: 3, "&:hover": { boxShadow: 6 } }}
        >
          <CardContent>
            <Typography variant="h6" component="div" sx={{ color: "black" }}>
              <FaMoneyBillWave
                style={{ color: "#d81b60", marginRight: "8px" }}
              />{" "}
              Payments
            </Typography>
            <Typography variant="h5" color="text.primary">
              {paymentCount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Charts Section */}
      <Grid item xs={12} sm={6} md={6}>
        <Card
          sx={{
            height: "100%",
            bgcolor: "white",
            boxShadow: 3,
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardContent>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: "black" }}
            >
              Users Registered by Month
            </Typography>
            <div style={{ overflowX: "auto" }}>
              <BarChart width={500} height={300} data={usersByMonth}>
                <BarXAxis dataKey="monthYear" />
                <BarYAxis />
                <BarTooltip />
                <BarLegend />
                <Bar dataKey="count" fill="#2196f3" />
              </BarChart>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <Card
          sx={{
            height: "100%",
            bgcolor: "white",
            boxShadow: 3,
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardContent>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: "black" }}
            >
              Claims by Month
            </Typography>
            <div style={{ overflowX: "auto" }}>
              <PieChart width={500} height={300}>
                <Pie
                  data={claimsByMonth}
                  dataKey="count"
                  nameKey="monthYear"
                  outerRadius={100}
                  fill="#4caf50"
                  label
                >
                  {claimsByMonth.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`#${Math.floor(Math.random() * 16777215).toString(
                        16
                      )}`}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card
          sx={{
            height: "100%",
            bgcolor: "white",
            boxShadow: 3,
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardContent>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: "black" }}
            >
              Payments by Month
            </Typography>
            <div style={{ overflowX: "auto" }}>
              <LineChart width={1000} height={300} data={paymentsByMonth}>
                <XAxis dataKey="monthYear" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#ff5722" />
              </LineChart>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdminDashboardOverview;
