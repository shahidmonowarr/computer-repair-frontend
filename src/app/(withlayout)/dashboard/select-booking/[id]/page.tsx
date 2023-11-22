"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectedField";
import { useCreateBookingMutation } from "@/redux/features/bookingApi";
import { useGetSingleServiceQuery } from "@/redux/features/serviceApi";
import { useGetSlotsQuery } from "@/redux/features/slotApi";
import { isLoggedIn } from "@/services/auth.service";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
const { confirm } = Modal;

const SelectBookingPage = ({ params }: { params: any }) => {
  const { id } = params;

  const userLoggedIn = isLoggedIn();

  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  query["searchTerm"] = searchTerm;

  const { data: slotData, isLoading: slotLoading } =
    useGetSlotsQuery(undefined);

  const { data: serviceData, isLoading: serviceLoading } =
    useGetSingleServiceQuery(id);

  const [createBooking, { isLoading, isError }] = useCreateBookingMutation();

  const router = useRouter();

  const bookingOnSubmit = async (data: any) => {
    const dateString = data?.bookingDate?.$d;
    const dateObject = new Date(dateString);

    const isoString = dateObject?.toISOString();

    const BookingData = {
      bookingDate: isoString,
      slotId: data.slot.slotId,
      serviceId: id,
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
        <div className=" px-5 gap-2 mx-auto">
          <h2 className="text-gray-900 text-xl mb-1 font-medium title-font">
            FillUp The Form
          </h2>
          <p className="leading-relaxed mb-2 text-gray-600 text-[14px]">
            Please Fill Up The Form To Book Your Schedule
          </p>
          <FormInput
            name="service.serviceId"
            label="Service Name"
            type="text"
            value={serviceData?.serviceName}
            disabled={true}
          />
          <FormDatePicker name="bookingDate" label="Booking Date" />
          <FormSelectField
            name="slot.slotId"
            label="Booking Slot"
            options={slotData?.map((c: any) => ({
              label: c.slotTime,
              value: c.slotId,
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
      </Form>
    </section>
  );
};

export default SelectBookingPage;
