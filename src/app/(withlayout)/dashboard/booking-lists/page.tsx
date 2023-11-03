"use client";

import { EditOutlined, ReloadOutlined } from "@ant-design/icons";

import Form from "@/components/Forms/Form";
import FormSelectField from "@/components/Forms/FormSelectedField";
import ModalForm from "@/components/Forms/ModalForm";
import ActionBar from "@/components/ui/ActionBar";
import TableList from "@/components/ui/TableList";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import {
  useGetBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/features/bookingApi";
import { useGetAllServicesQuery } from "@/redux/features/serviceApi";
import { useGetSlotsQuery } from "@/redux/features/slotApi";
import { Button, Col, Input, Row, Select, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const BookingList = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [bookingStatus, setbookingStatus] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["firstName"] = firstName;
  query["bookingStatus"] = bookingStatus;

  // get data
  const { data, isLoading } = useGetBookingQuery(query);
  console.log("data", data);

  const { data: slotData, isLoading: slotLoading } =
    useGetSlotsQuery(undefined);

  const { data: serviceData, isLoading: serviceLoading } =
    useGetAllServicesQuery(query);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [updateBooking, { isLoading: deleteLoading }] =
    useUpdateBookingMutation();

  const handleEdit = async (updated: any) => {
    const dateString = updated?.bookingDate?.$d ?? updated?.bookingDate;

    console.log("updated", updated);

    const dateObject = new Date(dateString);

    // Get ISO string
    const isoString = dateObject?.toISOString();

    const id = updated?.BookingId;

    const editedData = {
      serviceId: updated?.service.serviceId,
      firstName: updated?.profile.firstName,
      phoneNumber: updated?.profile.phoneNumber,
      bookingDate: isoString,
      bookingStatus: updated?.bookingStatus,
      slotId: updated?.slot.slotId,
    };

    console.log("booking id", id);

    try {
      const res = await updateBooking({ id, body: editedData }).unwrap();

      if (res) {
        message.success("Booking updated successfully");
        setIsEditModalOpen(false);
      }
    } catch (error: any) {
      console.error(error?.data);
      message.error(error?.data);
    }
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "profile",
      render: (profile: any) => `${profile.firstName} ${profile.lastName}`,
      //   sorter: true,
    },
    {
      title: "Contact No",
      dataIndex: "profile",
      render: (profile: any) => `${profile.phoneNumber}`,
      //   sorter: true,
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      render: (text: any) => {
        const date = new Date(text);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
        const day = date.getDate().toString().padStart(2, "0");
        return `${day}-${month}-${year}`;
      },
      //   sorter: true,
    },
    {
      title: "Time Slot",
      dataIndex: "slot",
      render: (slot: any) => `${slot.slotTime}`,
    },
    {
      title: "Service",
      dataIndex: "service",
      render: (service: any) => `${service.serviceName}`,
      //   sorter: true,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      //   sorter: true,
    },
    {
      title: "Status",
      dataIndex: "bookingStatus",
      render: function (data: any) {
        return (
          <p
            className={` text-center rounded-lg text-xs text-white px-2 py-1 ${
              data === "pending" && "bg-blue-600"
            }  ${data === "confirmed" && "bg-green-600"}  ${
              data === "cancelled" && "bg-red-600"
            }`}
          >
            {data}
          </p>
        );
      },
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Button
              style={{
                margin: "0px 5px",
              }}
              onClick={() => {
                setIsEditModalOpen(true);
                setEditData(data);
              }}
              type="primary"
            >
              <EditOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setFirstName("");
    setbookingStatus("");
  };

  const status = [
    { label: "Pending", value: "pending" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Cancelled", value: "cancelled" },
  ];

  const statusOnChange = (value: string) => {
    setbookingStatus(value);
  };

  return (
    <div className="p-5 bg-white rounded-3xl">
      <UMBreadCrumb
        items={[
          {
            label: "dashboard",
            link: "/dashboard",
          },
          {
            label: "booking-list",
            link: "/dashboard/booking/booking-list",
          },
        ]}
      />

      <ActionBar title="Booking List">
        <div className="flex gap-3">
          <Input
            type="text"
            size="large"
            placeholder="Search with Name"
            style={{
              width: "100%",
            }}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <Select
            showSearch
            size="large"
            placeholder="Select Status"
            optionFilterProp="children"
            onChange={statusOnChange}
            options={status}
          />
        </div>
        <div>
          {(!!sortBy || !!sortOrder || !!firstName) && (
            <Button
              onClick={resetFilters}
              type="primary"
              style={{ margin: "0px 5px" }}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <TableList
        // loading={isLoading}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pageSize={size}
        // totalPages="meta?.total"
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      {isEditModalOpen && editData && (
        <ModalForm
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          title="Blog"
          isLoading={deleteLoading}
        >
          <Form submitHandler={handleEdit} defaultValues={editData}>
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  margin: "5px 0px",
                }}
              >
                Booking information
              </p>

              <Row gutter={{ xs: 24, xl: 24, lg: 24, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <div style={{ margin: "10px 0px" }}>
                    <FormInput
                      size="large"
                      name="profile.firstName"
                      label="Full Name"
                    />
                  </div>
                </Col>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <div style={{ margin: "10px 0px" }}>
                    <FormInput
                      size="large"
                      name="profile.phoneNumber"
                      label="Contact No"
                    />
                  </div>
                </Col>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <div style={{ margin: "10px 0px" }}>
                    <FormSelectField
                      name="service.serviceId"
                      label="Service Name"
                      loading={serviceLoading}
                      options={serviceData?.map((c: any) => ({
                        label: c.serviceName,
                        value: c.serviceId,
                      }))}
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 12, lg: 12, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <div style={{ margin: "10px 0px" }}>
                    <FormDatePicker name="bookingDate" label="Booking Date" />
                  </div>
                </Col>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <div style={{ margin: "10px 0px" }}>
                    <FormSelectField
                      name="bookingStatus"
                      label="Booking Status"
                      options={status.map((c: any) => ({
                        label: c.label,
                        value: c.value,
                      }))}
                    />
                  </div>
                </Col>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <div style={{ margin: "10px 0px" }}>
                    <FormSelectField
                      name="slot.slotId"
                      label="Booking Slot"
                      loading={slotLoading}
                      options={slotData?.map((c: any) => ({
                        label: c.slotTime,
                        value: c.slotId,
                      }))}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <Button htmlType="submit">submit</Button>
          </Form>
        </ModalForm>
      )}
    </div>
  );
};

export default BookingList;
