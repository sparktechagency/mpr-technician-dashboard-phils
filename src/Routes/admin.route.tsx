//* ------------------ICONS------------------
import dashboardLogo from "/images/dashboard-logo/dashboard.svg";

//* ------------------IMPORT COMPONENTS------------------
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Notifications from "../pages/Common/Notifications";
import AdminAllApplication from "../pages/Admin/AdminAllApplication";
import AdminApplicationDetailsPage from "../pages/Admin/AdminApplicationDetailsPage";

export const adminPaths = [
  {
    path: "dashboard",
    element: <AdminDashboard />,
    key: "dashboard",
    name: "Dashboard",
    icon: dashboardLogo,
  },
  {
    path: "application",
    element: <AdminAllApplication />,
    key: "application",
    name: "Application",
    icon: dashboardLogo,
  },
  {
    key: "application",
    path: "application/:id",
    element: <AdminApplicationDetailsPage />,
  },
  {
    path: "notifications",
    element: <Notifications />,
    key: "notifications",
  },
];
