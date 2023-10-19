"use client";

import ServiceCard from "@/components/ServiceCard/ServiceCard";
import { useGetAllServicesQuery } from "@/redux/features/serviceApi";
import { Spin } from "antd";
import { useState } from "react";
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
      <p className="text-primary text-center md:text-[20px] text-[16px] font-semibold">
        Find Out Your Desire Service
      </p>
      <p className=" md:text-[45px] text-[35px] md:w-[550px] py-[30px] ">
        Our Services
      </p>

      <Spin spinning={isLoading && !isError} tip="Loading Services...">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 justify-between">
          {serviceData?.map((service: any, index: number) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default ServiceSection;