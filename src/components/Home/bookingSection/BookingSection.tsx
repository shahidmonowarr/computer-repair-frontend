"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormSelectField from "@/components/Forms/FormSelectedField";
import { useCreateBookingMutation } from "@/redux/features/bookingApi";
import { useGetAllServicesQuery } from "@/redux/features/serviceApi";
import { useGetSlotsQuery } from "@/redux/features/slotApi";
import { isLoggedIn } from "@/services/auth.service";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, message } from "antd";
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
    const dateString = data?.appointmentDate?.$d;
    const dateObject = new Date(dateString);

    const isoString = dateObject?.toISOString();

    const BookingData = {
      appointmentDate: isoString,
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

        if (res?.data) {
          message.success(
            "Slot added on your booking.admin will verified and confirm your booking"
          );
        }
      } catch (error: any) {
        console.error(error);
        message.error(error?.data?.message);
      }
    }
  };

  return (
    <div className="common md:flex gap-10 items-center mb-[60px]">
      <div className="font-inter my-[20px] md:my-0 flex flex-col md:h-[400px] justify-around ">
        <p className="text-primary md:text-[20px] text-[16px] font-semibold">
          Booking
        </p>
        <p className="font-poppins md:text-[45px] text-[35px] md:w-[550px]">
          Book Your Schedule
        </p>
        <p className="md:w-[500px] text-gray-[400px] font-poppins text-gray-500"></p>

        <Form submitHandler={bookingOnSubmit}>
          <div className="my-[12px] flex flex-col items-center justify-center gap-2 w-full">
            <div style={{ margin: "10px 0px", width: "100%" }}>
              <FormDatePicker name="appointmentDate" label="Appointment Date" />
            </div>
            <div style={{ margin: "10px 0px", width: "100%" }}>
              <FormSelectField
                name="slot.slotId"
                label="Booking Slot"
                options={slotData?.map((c: any) => ({
                  label: c.slotTime,
                  value: c.slotId,
                }))}
              />
            </div>
            <div style={{ margin: "10px 0px", width: "100%" }}>
              <FormSelectField
                name="service.serviceId"
                label="Service Name"
                options={serviceData?.map((c: any) => ({
                  label: c.serviceName,
                  value: c.serviceId,
                }))}
              />
            </div>
          </div>

          <button type="submit" className="appointmentButton">
            Make Appointment
          </button>
        </Form>
      </div>
    </div>
  );
};

export default BookingSection;
