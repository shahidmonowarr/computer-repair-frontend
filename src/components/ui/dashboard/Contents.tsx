"use client";

import { Layout } from "antd";
import DashboardHeader from "./DashboardHeader";
const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "black",
      }}
    >
      <>
        <DashboardHeader />
      </>

      <div className="m-5">{children}</div>
    </Content>
  );
};

export default Contents;
