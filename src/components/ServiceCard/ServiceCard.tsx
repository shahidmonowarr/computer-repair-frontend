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
    <div
      key={service?.serviceId}
      className="w-72 max-h-96 rounded-md bg-gray-100 border-2 border-blue-300 mx-auto hover:border-blue-500 hover:border-opacity-400 hover:shadow-lg hover:scale-103 transform transition duration-500 ease-in-out"
    >
      <Image
        src={service?.serviceImage}
        alt="service image"
        width={300}
        height={270}
        className="w-full h-44 rounded-t-lg p-1"
      />
      <div className="p-3 text-xs text-gray-700 flex justify-between items-center">
        {/* <span className="text-left pr-2 badge badge-secondary">
             {service?.category}
         </span> */}
        <span className="text-right text-green-600 justify-between items-center">
          {service?.serviceStatus}
        </span>
        <hr className="h-2 w-2 " />
      </div>
      <div className="px-2 py-1 flex justify-between ">
        <div>
          <h1 className="text-lg font-semibold">{service?.serviceName}</h1>
          <p className="text-sm">Price: {service?.servicePrice}</p>
        </div>
      </div>
      <div className="flex px-2 gap-8 my-3 justify-between">
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
  );
};

export default ServiceCard;
