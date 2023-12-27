import { message } from "antd";
// import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";

const CopyToClipboard = ({ text }: { text: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success("Copied to clipboard!");
      })
      .catch((error) => {
        console.error("Unable to copy:", error);
        message.error("Failed to copy to clipboard");
      });
  };

  return <FaRegCopy onClick={copyToClipboard} />;
};

export default CopyToClipboard;
