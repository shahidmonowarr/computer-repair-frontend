"use client";
import { useGetBlogsQuery } from "@/redux/features/blogApi";
import { IBlogType } from "@/types";
import BlogCard from "./BlogCard";

const BlogSection = () => {
  const query: Record<string, any> = {};

  const { data } = useGetBlogsQuery({ ...query });

  return (
    <div className=" pb-[100px]">
      <h2 className="mb-12 text-center text-3xl font-bold">
        Find the best blog for you
      </h2>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 justify-between">
        {data?.map((blog: IBlogType) => (
          <BlogCard key={blog?.blogId} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
