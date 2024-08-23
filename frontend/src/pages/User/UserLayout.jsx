
import { Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const UserLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <Link to="/userdashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/userdashboard/profile">Profile</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
