import { Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { useLogoutMutation } from "../../slices/authApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { getProfilePictureUrl } from "../../utils/profilePicture";
import AdminLayoutCss from "./AdminLayout.module.css";

const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();

    const profilePicture = getProfilePictureUrl()

    const handleLogout = async () => {
      try {
        await logout().unwrap();
        dispatch(setCredentials(null)); // Clear user info from the state
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu theme="dark" mode="inline" className={AdminLayoutCss.sider}>
          <div className={AdminLayoutCss.userInfo}>
            <Image
              src={profilePicture}
              roundedCircle
              className={AdminLayoutCss.image}
            />
            <p className={AdminLayoutCss.name}>{userInfo.user.name}</p>
            <p className={AdminLayoutCss.role}>Role</p>
            <p className={AdminLayoutCss.rolePlayed}>
              {userInfo.user.isAdmin ? <>Admin</> : <>User</>}
            </p>
          </div>
          <Menu.Item key="1">
            <Link to="/admindashboard" className={AdminLayoutCss.navLink}>
              Overview
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link className={AdminLayoutCss.navLink} to="/admindashboard/users">
              Manage Users
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link
              className={AdminLayoutCss.navLink}
              to="/admindashboard/claims"
            >
              Manage Claims
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link
              className={AdminLayoutCss.navLink}
              to="/admindashboard/createpolicy"
            >
              Create Policy
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link
              className={AdminLayoutCss.navLink}
              to="/admindashboard/policies"
            >
              Manage Policy
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link
              className={AdminLayoutCss.navLink}
              to="/admindashboard/payments"
            >
              Payments
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={AdminLayoutCss.navbar}>
          <div>
            <p className={AdminLayoutCss.username}>
              Welcome {userInfo.user.name}
            </p>
          </div>
          <div onClick={handleLogout}>
            <FaSignOutAlt size={30} />
          </div>
        </Header>
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
