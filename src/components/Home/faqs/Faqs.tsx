"use client";

import { useGetFaqQuery } from "@/redux/features/faqApi";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import type { CSSProperties } from "react";
import React from "react";

const getItems: (
  panelStyle: CSSProperties,
  data: any
) => CollapseProps["items"] = (panelStyle, data) => {
  return data?.map((item: any) => ({
    key: item?.faqId,
    label: item?.faqTitle,
    children: <p>{item?.faqDescription}</p>,
    style: panelStyle,
  }));
};

const Faqs = () => {
  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: "#fff",
    borderRadius: 10,
    border: "none",
    padding: "15px",
    fontSize: "17px",
    fontWeight: "500",
    userSelect: "none",
  };

  const { data, error, isLoading } = useGetFaqQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex justify-center px-4 mx-auto sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="mb-5 flex flex-wrap">
        <div className="w-full items-center px-4 pt-5 rounded-md mx-auto bg-slate-300">
          <Collapse
            bordered={true}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined className="h-5" rotate={isActive ? 90 : 0} />
            )}
            items={getItems(panelStyle, data)}
          />
        </div>
      </div>
    </section>
  );
};

export default Faqs;
