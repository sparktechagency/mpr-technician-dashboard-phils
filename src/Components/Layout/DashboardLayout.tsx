import { Link, Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";
import logoutLogo from "/images/dashboard-logo/logout.svg";
import getActiveKeys from "../../utils/activeKey";
import { adminPaths } from "../../Routes/admin.route";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import Sider from "antd/es/layout/Sider";
import Topbar from "../Shared/Topbar";
import { AllImages } from "../../../public/images/AllImages";
import { commonPaths } from "../../Routes/common.route";
import { BarsOutlined } from "@ant-design/icons";
import Container from "../../ui/Container";
import useUserData from "../../hooks/useUserData";
import Cookies from "js-cookie";

const DashboardLayout = () => {
  const userRole = useUserData();
  const location = useLocation();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const rootSubmenuKeys = ["hosts", "activity", "promo", "setting"];

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find(
      (key: string) => openKeys.indexOf(key) === -1
    );
    if (latestOpenKey && rootSubmenuKeys.includes(latestOpenKey)) {
      setOpenKeys([latestOpenKey]); // Only keep the latest submenu open
    } else {
      setOpenKeys(keys); // Update normally for closing or nested submenus
    }
  };

  const defaultUrl = userRole?.role === "technician" ? "/technician" : "/";
  const normalizedPath = location.pathname.replace(defaultUrl, "");

  const [collapsed, setCollapsed] = useState(true);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 768) {
  //       setCollapsed(true);
  //     } else {
  //       setCollapsed(false);
  //     }
  //   };

  //   handleResize();

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const activeKeys = getActiveKeys(normalizedPath);
  const menuItems =
    userRole?.role === "technician"
      ? //   ? sidebarItemsGenerator(adminPaths, "admin")
        sidebarItemsGenerator(adminPaths, userRole?.role)
      : [];

  const otherItem = sidebarItemsGenerator(
    commonPaths,
    userRole?.role as string
  );

  const handleLogout = () => {
    Cookies.remove("mrt_tech_accessToken");
    window.location.href = "/sign-in";
    window.location.reload();
  };

  otherItem.push({
    key: "logout",
    icon: (
      <img
        src={logoutLogo}
        alt="logout"
        width={16}
        height={16}
        style={{ color: "#222222", fontSize: "16px", marginRight: "5px" }}
      />
    ),
    label: (
      <div onClick={() => handleLogout()}>
        <span className="text-base-color cursor-pointer">Logout</span>
      </div>
    ),
  });

  return (
    <div className="h-screen bg-ring-primary-color relative">
      <img
        src={AllImages?.background}
        alt="background"
        className="fixed h-screen w-full object-cover"
        draggable={false}
      />
      <ScrollRestoration />

      <Layout className="flex !bg-transparent relative">
        <Sider
          theme="light"
          width={280}
          trigger={null}
          breakpoint="lg"
          collapsedWidth="0"
          collapsible
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
            background: "rgba(255, 255, 255, 0)", // semi-transparent background
            backdropFilter: "blur(50px)", // apply the blur effect
          }}
          className={` border-r !border-[#D5D5D5] !fixed !z-[9998] !transition-all !duration-500 !ease-in-out ${
            collapsed ? "!left-[-300px]" : "!left-0"
          }`}
        >
          <div className="flex items-center justify-end my-5 px-4">
            <BarsOutlined
              onClick={() => setCollapsed(!collapsed)}
              className="text-3xl !text-base-color"
            />
          </div>
          <Link to="/">
            <img
              src={AllImages.logo}
              alt="logo"
              className="w-[90%] mx-auto h-auto mb-8 mt-4"
            />
          </Link>
          <Typography.Title
            className="mb-1 !text-[#667085] font-bold"
            level={5}
            style={{
              paddingLeft: "6px",
              paddingRight: "6px",
              marginLeft: "12%",
            }}
          >
            Menu
          </Typography.Title>
          <Menu
            mode="inline"
            openKeys={openKeys} // Bind openKeys state
            onOpenChange={onOpenChange} // Handle open/close
            defaultSelectedKeys={activeKeys}
            selectedKeys={activeKeys}
            style={{
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            items={menuItems}
          />
          <div className="h-10"></div>
          <Typography.Title
            className="mb-1 !text-[#667085] font-bold"
            level={5}
            style={{
              paddingLeft: "6px",
              paddingRight: "6px",
              marginLeft: "12%",
            }}
          >
            Other
          </Typography.Title>
          <Menu
            mode="inline"
            openKeys={openKeys} // Bind openKeys state
            onOpenChange={onOpenChange} // Handle open/close
            defaultSelectedKeys={activeKeys}
            selectedKeys={activeKeys}
            style={{
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            items={otherItem}
          />
        </Sider>
        <Layout className="!bg-transparent">
          <Header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 999,
              marginLeft: 0,
              background: "rgba(255, 255, 255, 0)", // semi-transparent background
              backdropFilter: "blur(20px)", // apply the blur effect
              borderRadius: "10px", // optional: for a rounded corner effect
            }}
            className="!bg-transparent"
          >
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content className="">
            <Container className=" py-6 xl:py-8 ">
              <Outlet />
            </Container>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
