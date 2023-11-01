"use client";

import { IBlogType } from "@/types";
import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

type IType = {
  blog: IBlogType;
};

const BlogCard = ({ blog }: IType) => {
  return (
    <div className="p-5 bg-white rounded-lg border border-transparent shadow-lg">
      <div className="relative pb-48 overflow-hidden">
        <Image
          className="absolute h-full w-full"
          src={blog?.blogImage}
          height={200}
          width={200}
          alt={blog?.blogTitle}
        />
      </div>
      <div className="p-3 text-xs text-gray-700 flex justify-between items-center"></div>
      <div className="p-4 border-t border-b">
        <h2 className="mb-2 text-lg uppercase font-bold">{blog?.blogTitle}</h2>
        <div className="mt-2 flex items-center">
          <p className="mb-2"> {blog?.blogDescription}</p>
        </div>
        <div className="flex gap-8 justify-center">
          <Link href={`/blogs/${blog?.blogId}`}>
            <Button className=" text-gray-900 " type="primary">
              <EyeOutlined style={{ fontSize: "20px" }} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
