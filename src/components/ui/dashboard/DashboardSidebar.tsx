"use client";

import { useState } from "react";

import { sidebarItems } from "@/constants/sidebarMenuItems";
import { getUserInfo } from "@/services/auth.service";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const DashboardSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { role } = getUserInfo() as any;

  return (
    <div className="relative   ">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={280}
        className="shadow-lg  shadow-slate-800"
        style={{
          background: "white",
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
          borderRadius: "0 0 0 1rem",
        }}
      >
        <div
          style={{
            color: "skyblue",
            fontSize: "2rem",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          pulsePC
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
