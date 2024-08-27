
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
import UserLayoutCss from './UserLayout.module.css'

const { Header, Content, Sider } = Layout;

const UserLayout = () => {

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
        <Menu theme="dark" mode="inline">
          <div className={UserLayoutCss.userInfo}>
            <Image
              src={profilePicture}
              roundedCircle
              className={UserLayoutCss.image}
            />
            <p className={UserLayoutCss.name}>{userInfo.user.name}</p>
            <p className={UserLayoutCss.role}>Role</p>
            <p className={UserLayoutCss.rolePlayed}>
              {userInfo.user.isAdmin ? <>Admin</> : <>User</>}
            </p>
          </div>
          <Menu.Item key="1">
            <Link className={UserLayoutCss.navLink} to="/userdashboard">
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link
              className={UserLayoutCss.navLink}
              to="/userdashboard/policies"
            >
              Policies
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link
              className={UserLayoutCss.navLink}
              to="/userdashboard/mypolicies"
            >
              My Policies
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link
              className={UserLayoutCss.navLink}
              to="/userdashboard/createclaims"
            >
              Create Claim
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link
              className={UserLayoutCss.navLink}
              to="/userdashboard/myclaims"
            >
              My Claims
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link
              className={UserLayoutCss.navLink}
              to="/userdashboard/mypayments"
            >
              My Payments
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link className={UserLayoutCss.navLink} to="/userdashboard/profile">
              Profile
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={UserLayoutCss.navbar}>
          <div>
            <p className={UserLayoutCss.username}>
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

export default UserLayout;
