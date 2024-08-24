import { useGetAllPoliciesQuery } from "../../slices/policyApiSlice";
import { Card } from "antd";

const AdminDashboardOverview = () => {
    const { data: allPolicies } = useGetAllPoliciesQuery();

    console.log('All Policies', allPolicies)

  return (
    <Card title="Admin Dashboard Overview">
      Welcome to the Admin Dashboard!
    </Card>
  );
};

export default AdminDashboardOverview;
