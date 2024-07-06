"use client";
import { useState, useEffect } from "react";
import { useGetBlogsQuery } from "@/redux/features/blogApi";
import { Input, Spin } from "antd";
import BlogCard from "@/components/Home/blogSection/BlogCard";

const BlogSection = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const query: Record<string, any> = {};

  const { data:blogData, refetch, isLoading, isError } = useGetBlogsQuery({ ...query });
  const [filteredData, setFilteredData] = useState<any[]>(blogData || []);

  useEffect(() => {
    if (blogData) {
      let data = [...blogData];

      // Apply search filter
      if (searchTerm) {
        data = data.filter(blog =>
          (blog?.blogTitle && blog?.blogTitle.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      setFilteredData(data);
      refetch();
    }
  }, [blogData, searchTerm]);

  return (
    <div className="container mx-auto">
        <div className="pb-[100px] max-w-7xl px-6 mx-auto">
      <h2 className="mb-12 text-center text-3xl font-bold">
        Find The Best Blog For You
      </h2>

      {/* Search Input */}
      <div className="mb-8 text-center">
        <Input
          placeholder="Search blogs"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className="w-1/4 mx-auto"
        />
      </div>

      <Spin spinning={isLoading && !isError} tip="Loading Blogs...">
      <div className="">
      <div className="grid grid-cols-4 gap-4">
                {filteredData?.map((blog: any) => (
                    <BlogCard blog={blog} key={blog.id} />
                ))}
              </div>
      </div>
        </Spin>
    </div>
    </div>
  );
};

export default BlogSection;
