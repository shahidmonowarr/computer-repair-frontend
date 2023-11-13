/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

import { sidebarItems } from "@/constants/sidebarMenuItems";
import { getUserInfo } from "@/services/auth.service";
import { Layout, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";

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
        <Link href={"/"} className="md:w-full ">
          <Image
            className="max-h-[50px] mx-auto w-auto"
            src="https://i.ibb.co/fqrVcQt/Untitled-3.png"
            alt="logo"
            width={200}
            height={200}
          />
        </Link>
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
