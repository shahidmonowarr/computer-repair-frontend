"use client";

import { addToCart } from "@/redux/features/cartSlice";
import { useGetSingleServiceQuery } from "@/redux/features/serviceApi";
import { useAppDispatch } from "@/redux/hooks";
import { IServiceTypes } from "@/types";
import { Button, Spin, message } from "antd";
import Image from "next/image";

const ServiceDetailsPage = ({ params }: { params: { serviceId: string } }) => {
  const { data: serviceDetails, isLoading: isLoadingSingleService } =
    useGetSingleServiceQuery({
      serviceId: params?.serviceId,
    });

  const dispatch = useAppDispatch();

  const handleAddToCart = (addedService: IServiceTypes) => {
    dispatch(addToCart(addedService));
    message.success("Service Added to Cart");
  };

  console.log(serviceDetails);
  return (
    <>
      {" "}
      <Spin tip="Loading" spinning={isLoadingSingleService} size="large">
        <div className="max-w-5xl  my-20 mx-auto grid grid-cols-3 gap-10 items-center">
          <div className="col-span-1">
            <Image
              alt={serviceDetails?.serviceName}
              src={serviceDetails?.serviceImage}
              height={80}
              width={80}
              className="w-full h-[300px] object-cover object-center rounded border "
            />
          </div>
          <div className="w-full col-span-2 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Service Name
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {serviceDetails?.serviceName}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">
                  {serviceDetails?._count?.reviewAndRatings} Reviews
                </span>
              </span>
              <div className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <span className="text-gray-600 ml-3">
                  {serviceDetails?._count?.appointmentBooked} Appointment Booked
                </span>
              </div>
            </div>
            <div className="mt-5 border-t pt-4">
              <p className="leading-relaxed">{serviceDetails?.description}</p>
            </div>

            <div className="flex mt-10 justify-between border-t pt-4 ">
              <span className="title-font font-medium text-2xl text-gray-900">
                $ {serviceDetails?.servicePrice}
              </span>
              <Button
                onClick={() => handleAddToCart(serviceDetails)}
                type="primary"
                className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default ServiceDetailsPage;
