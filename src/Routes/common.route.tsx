import ChangePassword from "../Components/Dashboard/Profile/ChangePassword";
import EditProfile from "../Components/Dashboard/Profile/EditProfile";

//* ------------------ICONS------------------
import profileLogo from "/images/dashboard-logo/profile.svg";
import settingLogo from "/images/dashboard-logo/setting.svg";

export const commonPaths = [
  {
    path: "profile",
    element: <EditProfile />,
    key: "profile",
    name: "Profile",
    icon: profileLogo,
  },
  {
    key: "setting",
    name: "Setting",
    icon: settingLogo,
    children: [
      {
        key: "change-password",
        path: "setting/change-password",
        name: "Change Password",
        icon: <span>&#8226;</span>,
        element: <ChangePassword />,
      },
    ],
  },
];
