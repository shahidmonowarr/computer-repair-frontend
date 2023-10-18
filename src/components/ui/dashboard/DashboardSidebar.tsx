"use client";

import { useState } from "react";

import { sidebarItems } from "@/constants/sidebarMenuItems";
import { getUserInfo } from "@/services/auth.service";
import { Layout, Menu, theme } from "antd";

const { Sider } = Layout;

const DashboardSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { role } = getUserInfo() as any;

  return (
    <div className="relative   ">
      <Sider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={280}
        className="shadow-lg shadow-purple-200 "
        style={{
          background: "#fff",
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
          borderRadius: "40px 0px 0px 40px ",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "2rem",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          PULSEpc
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sidebarItems(role)}
        />
      </Sider>
      {/*  */}
    </div>
  );
};

export default DashboardSidebar;
