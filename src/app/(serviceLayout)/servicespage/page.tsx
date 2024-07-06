"use client";

import ServiceCard from "@/components/ServiceCard/ServiceCard";
import { useGetAllServicesQuery } from "@/redux/features/serviceApi";
import { Spin, Input, Select, Button } from "antd"; // Import Input, Select, and Button from antd
import { useEffect, useState } from "react";

const { Option } = Select;

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const query: Record<string, any> = {}; 

  const { data: serviceData, isLoading, isError, refetch } = useGetAllServicesQuery({ ...query });

  useEffect(() => {
    if (serviceData) {
      let data = [...serviceData];

      // Apply search filter
      if (searchTerm) {
        data = data.filter(service =>
          service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply sorting
      if (sortBy) {
        data.sort((a, b) => {
          if (sortOrder === "asc") {
            return a[sortBy] > b[sortBy] ? 1 : -1;
          } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
          }
        });
      }

      setFilteredData(data);
    }
  }, [serviceData, searchTerm, sortBy, sortOrder]);

  return (
    <div className="container mx-auto">
        <div className="pb-[100px] max-w-7xl px-6 mx-auto">
      <h2 className="py-12 text-center text-3xl font-bold">
        Here is The Best Service For You
      </h2>
      
      {/* Search Input */}
      <div className="mb-8 text-center">
        <Input
          placeholder="Search services"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/4 mx-auto"
        />
      </div>

      {/* Sort and Filter Options */}
      <div className="mb-8 text-center flex justify-center gap-4">
          <select
            value={sortBy}
            placeholder="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
            className="w-1/6"
          >
            <option value="">Sort By</option>
            <option value="createdAt">Date</option>
            <option value="servicePrice">Price</option>
          </select>
          <select
            value={sortOrder}
            placeholder="Order"
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-1/6"
          >
            <option value="">Order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <Button onClick={() => refetch()}>Reset</Button> 
        </div>

      <Spin spinning={isLoading && !isError} tip="Loading Services...">
        <div className="">
          <div className="grid grid-cols-4 gap-4"> {/* Updated class for grid layout */}
            {filteredData.map((service: any) => (
              <ServiceCard key={service.serviceId} service={service} />
            ))}
          </div>
        </div>
      </Spin>
    </div>
    </div>
  );
};

export default ServicesPage;
