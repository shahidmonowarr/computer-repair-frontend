"use client";

import ServiceCard from "@/components/ServiceCard/ServiceCard";
import { useGetAllServicesQuery } from "@/redux/features/serviceApi";
import { Spin } from "antd";
import { useState } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const ServiceSection = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  // get data
  const {
    data: serviceData,
    isLoading,
    isError,
    error,
  } = useGetAllServicesQuery({ ...query });

  console.log(error);

  return (
    <div className=" pb-[100px]">
      <h2 className="mb-12 text-center text-3xl font-bold">
        Find the best service for you
      </h2>

      <Spin spinning={isLoading && !isError} tip="Loading Services...">
        <div className="">
          <Swiper
            slidesPerView={1}
            spaceBetween={2}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
            }}
            className="mySwiper mx-2"
          >
            {serviceData?.map((service: any, index: number) => (
              <SwiperSlide key={service.serviceId}>
                <ServiceCard service={service} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Spin>
    </div>
  );
};

export default ServiceSection;
