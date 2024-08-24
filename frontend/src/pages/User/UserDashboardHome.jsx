import { Card, Col, Row, Spin } from "antd";
import { useGetClaimByIdQuery } from "../../slices/claimApiSlice";
import { useGetUserPoliciesQuery } from "../../slices/userPolicyApiSlice";
import { useSelector } from "react-redux";
import { FaFileAlt, FaShieldAlt } from "react-icons/fa";

const UserDashboardHome = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo.user._id;

  // Fetch claims using POST request with userId in body
  const {
    data: claims,
    isLoading: isClaimsLoading,
  } = useGetClaimByIdQuery(userId);

  const {
    data: policies,
    isLoading: isPoliciesLoading,
    } = useGetUserPoliciesQuery(userId);

  // Fetch policies

  // Calculate the quantities
  const claimsCount = claims?.claims?.length || 0;
  const policiesCount = policies?.userPolicy?.length || 0;

  if (isClaimsLoading || isPoliciesLoading) {
    return <Spin size="large" />;
  }

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card
          title="My Claims"
          bordered={false}
          style={{
            backgroundColor: "#f6f8fa",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <FaFileAlt style={{ fontSize: "40px", color: "#1890ff" }} />
          <h2>{claimsCount}</h2>
          <p>Active Claims</p>
        </Card>
      </Col>
      <Col span={12}>
        <Card
          title="My Policies"
          bordered={false}
          style={{
            backgroundColor: "#f6f8fa",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <FaShieldAlt style={{ fontSize: "40px", color: "#52c41a" }} />
          <h2>{policiesCount}</h2>
          <p>Active Policies</p>
        </Card>
      </Col>
    </Row>
  );
};

export default UserDashboardHome;
