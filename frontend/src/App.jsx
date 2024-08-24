import { Outlet } from "react-router-dom";
import NavbarMenu from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { matchPath } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// Define the routes where the header should not be displayed
  const routesWithoutHeader = [
    "/userdashboard",
    "/userdashboard/policies",
    "/userdashboard/mypolicies",
    "/userdashboard/createclaims",
    "/userdashboard/myclaims",
    "/userdashboard/mypayments",
    "/userdashboard/profile",
    "/admin/user/:id/edit",
    "/admin/productlist/:pageNumber",
  ];

  // Check if the current route is in the routesWithoutHeader array
  const shouldHideHeader = (pathname) => {
    return routesWithoutHeader.some((route) =>
      matchPath({ path: route, exact: true }, pathname)
    );
    };

    const hideHeader = shouldHideHeader(location.pathname);

function App() {
  return (
    <>
      {!hideHeader && <NavbarMenu />}
      <Outlet />
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
