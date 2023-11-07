"use client";
import { useGetBlogsQuery } from "@/redux/features/blogApi";
import { IBlogType } from "@/types";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "./BlogCard";

const BlogSection = () => {
  const query: Record<string, any> = {};

  const { data } = useGetBlogsQuery({ ...query });

  return (
    <div className=" pb-[100px]">
      <h2 className="mb-12 text-center text-3xl font-bold">
        Find the best blog for you
      </h2>

      <div className="">
        <Swiper
          slidesPerView={1}
          spaceBetween={2}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
          }}
          className="mySwiper"
        >
          {data?.map((blog: IBlogType) => (
            <SwiperSlide key={blog?.blogId}>
              <BlogCard blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BlogSection;
