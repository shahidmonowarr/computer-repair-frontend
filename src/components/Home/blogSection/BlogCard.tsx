import { IBlogType } from "@/types";
import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next"

type IType = {
  blog: IBlogType;
};

const BlogCard = ({ blog }: IType) => {
  return (
    // transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110
    <div
      key={blog?.blogId}
      className="w-72 h-96 rounded-md bg-gray-100 border-2 border-blue-300 mx-auto hover:border-blue-500 hover:border-opacity-400 hover:shadow-lg hover:scale-103 transform transition duration-500 ease-in-out"
    >
      <Image
        src={blog?.blogImage}
        alt="blog image"
        width={300}
        height={270}
        className="w-full h-44 rounded-t-lg p-1"
      />
      <div className="px-2 py-3 flex justify-between ">
        <div>
          <h1 className="text-lg font-semibold text-cBlack">
            {blog?.blogTitle}
          </h1>
          <p className="text-sm">{blog?.blogDescription.slice(0, 70)}...</p>
        </div>
      </div>
      <div className="flex gap-8 my-5 justify-between px-2">
        <Link href={`/blogs/${blog?.blogId}`}>
          <Button className=" text-gray-900 " type="primary">
            View {""}
            <EyeOutlined style={{ fontSize: "20px", paddingBottom: "5px" }} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
