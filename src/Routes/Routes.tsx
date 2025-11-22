import {
  createBrowserRouter,
  RouteObject,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

import Loading from "../ui/Loading";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.route";
import ProtectedRoute from "./ProtectedRoute";

//* Auth
import SignIn from "../pages/Auth/SignIn";
import ForgotPassword from "../pages/Auth/ForgetPassword";
import OtpPage from "../pages/Auth/OtpPage";
import UpdatePassword from "../pages/Auth/UpdatePassword";

import NotFound from "../ui/NotFound/NotFound";
import DashboardLayout from "../Components/Layout/DashboardLayout";
import { commonPaths } from "./common.route";
import useUserData from "../hooks/useUserData";
import SignUp from "../pages/Auth/SignUp";
import SignupOtpVerify from "../pages/Auth/SignUpOtp";

// eslint-disable-next-line react-refresh/only-export-components
function AuthRedirect() {
  const user = useUserData();
  const navigate = useNavigate();

  console.log("user", user);

  useEffect(() => {
    if (user && user.role === "technician") {
      navigate(`/${user.role}/dashboard`, {
        replace: true,
      });
    } else {
      navigate("/sign-in", { replace: true });
    }
  }, [navigate, user]);

  // Optionally display a loading indicator
  return <Loading />;
}
// Define routes with TypeScript types
const router: RouteObject[] = [
  {
    path: "/",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/dashboard",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/technician",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "technician",
    element: (
      <ProtectedRoute role="technician">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths), // Generating child routes dynamically
  },
  {
    path: "technician",
    element: (
      <ProtectedRoute role="technician">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(commonPaths), // Generating child routes dynamically
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "sign-up/verify",
    element: <SignupOtpVerify />,
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "forgot-password/otp-verify",
    element: <OtpPage />,
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },
  {
    path: "*", // Catch-all for undefined routes
    element: <NotFound />,
  },
];

// Create the router using createBrowserRouter
const routes = createBrowserRouter(router);

export default routes;
