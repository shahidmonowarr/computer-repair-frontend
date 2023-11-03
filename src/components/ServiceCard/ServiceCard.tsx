/* eslint-disable no-extra-boolean-cast */
"use client";

import { addToCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IServiceTypes } from "@/types";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import Image from "next/image";
import Link from "next/link";

type ServiceCardProps = {
  service: IServiceTypes;
};

const ServiceCard = ({ service }: ServiceCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (addedService: IServiceTypes) => {
    dispatch(addToCart(addedService));

    //show toast
    if (!!addedService) {
      message.success("Service added to cart successfully!");
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg border border-transparent shadow-lg">
      <div className="relative pb-48 overflow-hidden">
        <Image
          className="absolute h-full w-full"
          src={service?.serviceImage}
          height={200}
          width={200}
          alt={service?.serviceName}
        />
      </div>
      <div className="p-3 text-xs text-gray-700 flex justify-between items-center">
        {/* <span className="text-left pr-2 badge badge-secondary">
            {service?.category}
          </span> */}
        <span className="text-right text-gray-600 justify-between items-center">
          {service?.serviceStatus}
        </span>
      </div>
      <div className="p-4 border-t border-b">
        <h2 className="mb-2 text-lg uppercase font-bold">
          {service?.serviceName}
        </h2>
        <div className="mt-2 flex items-center">
          <span className="font-bold">Price: {service?.servicePrice}</span>
          &nbsp;
          <span className="text-md font-semibold">$</span>
        </div>
        <div className="flex gap-8 justify-center">
          <Link href={`/services/${service?.serviceId}`}>
            <Button className=" text-gray-900 " type="primary">
              <EyeOutlined style={{ fontSize: "20px" }} />
            </Button>
          </Link>
          <Button
            onClick={() => handleAddToCart(service)}
            type="primary"
            className=" text-gray-900  "
          >
            <ShoppingCartOutlined style={{ fontSize: "20px" }} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
