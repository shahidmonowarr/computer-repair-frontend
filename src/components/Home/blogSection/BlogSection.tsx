"use client";
import { useGetBlogsQuery } from "@/redux/features/blogApi";
import { IBlogType } from "@/types";
import BlogCard from "./BlogCard";

const BlogSection = () => {
  const query: Record<string, any> = {};

  const { data } = useGetBlogsQuery({ ...query });

  return (
    <div className=" pb-[100px]">
      <p className="text-primary text-center md:text-[20px] text-[16px] font-semibold">
        Find Out Your Desire Blogs
      </p>
      <p className=" md:text-[45px] text-[35px] md:w-[550px] py-[30px] ">
        Blogs
      </p>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 justify-between">
        {data?.map((blog: IBlogType) => (
          <BlogCard key={blog?.blogId} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
