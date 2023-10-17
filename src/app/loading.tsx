import { Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Spin />
    </div>
  );
};

export default Loading;
