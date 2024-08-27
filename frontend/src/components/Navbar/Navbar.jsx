import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../Logo/Logo";
import NavbarCss from "./Navbar.module.css";
import { getProfilePictureUrl } from "../../utils/profilePicture";

const NavbarMenu = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const profilePictureUrl = getProfilePictureUrl();

  return (
    <Navbar expand="lg" className={NavbarCss.navbarContainer}>
      <Container>
        <Navbar.Brand>
          <RouterLink to="/">
            <Logo className={NavbarCss.navbarBrand} />
          </RouterLink>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="nav-link"
            >
              About
            </ScrollLink>
            <ScrollLink
              to="services"
              smooth={true}
              duration={500}
              className="nav-link"
            >
              Services
            </ScrollLink>
            <ScrollLink
              to="whymilife"
              smooth={true}
              duration={500}
              className="nav-link"
            >
              Why milife
            </ScrollLink>
            <ScrollLink
              to="process"
              smooth={true}
              duration={500}
              className="nav-link"
            >
              How It Works
            </ScrollLink>
            <ScrollLink
              to="testimonials"
              smooth={true}
              duration={500}
              className="nav-link"
            >
              Testimonials
            </ScrollLink>
            <ScrollLink
              to="faq"
              smooth={true}
              duration={500}
              className="nav-link"
            >
              FAQ
            </ScrollLink>
            <ScrollLink
              to="ourteam"
              smooth={true}
              duration={500}
              className="nav-link"
            >
              Our Team
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="nav-link"
            >
              Contact Us
            </ScrollLink>
          </Nav>
          <Nav className={NavbarCss.navbarDropdown}>
            {userInfo ? (
              <>
                {userInfo && userInfo.user.isAdmin ? (
                  <>
                    <RouterLink to="/admindashboard" className="nav-link">
                      <Image
                        src={profilePictureUrl}
                        className={NavbarCss.navbarImage}
                        roundedCircle
                      />
                    </RouterLink>
                  </>
                ) : (
                  <>
                    <RouterLink to="/userdashboard" className="nav-link">
                      <Image
                        src={profilePictureUrl}
                        className={NavbarCss.navbarImage}
                        roundedCircle
                      />
                    </RouterLink>
                  </>
                )}
              </>
            ) : (
              <RouterLink to="/login" className="nav-link">
                Login
              </RouterLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
