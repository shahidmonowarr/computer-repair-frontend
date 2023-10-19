import { Result } from "antd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404-not-found",
};

const NotFoundPage = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </div>
  );
};

export default NotFoundPage;
