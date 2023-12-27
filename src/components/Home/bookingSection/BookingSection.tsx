"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import bookingImg from "@/assets/images/booking.png";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormSelectField from "@/components/Forms/FormSelectedField";
import { useCreateBookingMutation } from "@/redux/features/bookingApi";
import { useGetAllServicesQuery } from "@/redux/features/serviceApi";
import { useGetSlotsQuery } from "@/redux/features/slotApi";
import { isLoggedIn } from "@/services/auth.service";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import Image from "next/image";
const { confirm } = Modal;

const BookingSection = () => {
  const userLoggedIn = isLoggedIn();

  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  query["searchTerm"] = searchTerm;

  const { data: slotData, isLoading: slotLoading } =
    useGetSlotsQuery(undefined);

  const { data: serviceData, isLoading: serviceLoading } =
    useGetAllServicesQuery({ limit: 20 });

  const [createBooking, { isLoading, isError }] = useCreateBookingMutation();

  const router = useRouter();

  const bookingOnSubmit = async (data: any) => {
    const dateString = data?.bookingDate?.$d;
    const dateObject = new Date(dateString);

    const isoString = dateObject?.toISOString();

    const BookingData = {
      bookingDate: isoString,
      slotId: data.slot.slotId,
      serviceId: data.service.serviceId,
    };

    if (!userLoggedIn) {
      confirm({
        title: "Please Login First",
        icon: <ExclamationCircleFilled />,
        content: "You need to login first to book. Do you want to login?",
        onOk() {
          return router.push("/login");
        },
        onCancel() {},
      });

      return;
    } else {
      try {
        const res: any = await createBooking(BookingData);

        if (!!res?.data) {
          message.success(
            "Booking Added Successfully To This Slot. Please Check Your Dashboard if you want to cancel it"
          );
        }
      } catch (error: any) {
        console.error(error);
        message.error(error?.data?.message);
      }
    }
  };

  return (
    <section className="text-gray-600 body-font relative  ">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Book Your Schedule
      </h2>

      <Form submitHandler={bookingOnSubmit}>
        <div className=" px-5 grid grid-cols-1 md:grid-cols-2 gap-2 mx-auto">
          <div className=" bg-white rounded-lg my-auto p-6 flex flex-col  z-5 shadow-md">
            <h2 className="text-gray-900 text-xl mb-1 font-medium title-font">
              FillUp The Form
            </h2>
            <p className="leading-relaxed mb-2 text-gray-600 text-[14px]">
              Please Fill Up The Form To Book Your Schedule
            </p>
            <FormDatePicker name="bookingDate" label="Booking Date" />
            <FormSelectField
              name="slot.slotId"
              label="Booking Slot"
              options={slotData?.map((c: any) => ({
                label: c.slotTime,
                value: c.slotId,
              }))}
            />
            <FormSelectField
              name="service.serviceId"
              label="Service Name"
              options={serviceData?.map((c: any) => ({
                label: c.serviceName,
                value: c.serviceId,
              }))}
            />
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 mt-[8px] px-6 text-white"
            >
              Book
            </Button>
          </div>
          <div>
            <Image src={bookingImg} alt="" />
          </div>
        </div>
      </Form>
    </section>
  );
};

export default BookingSection;
