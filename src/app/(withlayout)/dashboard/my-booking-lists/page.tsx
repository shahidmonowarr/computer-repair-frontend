"use client";

import { EditOutlined } from "@ant-design/icons";

import Form from "@/components/Forms/Form";
import FormSelectField from "@/components/Forms/FormSelectedField";
import ModalForm from "@/components/Forms/ModalForm";
import ActionBar from "@/components/ui/ActionBar";
import TableList from "@/components/ui/TableList";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useGetMyBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/features/bookingApi";
import { useGetAllServicesQuery } from "@/redux/features/serviceApi";
import { useGetSlotsQuery } from "@/redux/features/slotApi";
import { Button, Col, Input, Row, Select, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const MyBookingList = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [bookingStatus, setBookingStatus] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["firstName"] = firstName;
  query["bookingStatus"] = bookingStatus;

  // get data
  const { data, isLoading } = useGetMyBookingQuery(query);

  const { data: slotData, isLoading: slotLoading } = useGetSlotsQuery("");

  const { data: serviceData, isLoading: serviceLoading } =
    useGetAllServicesQuery(query);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [updateBooking, { isLoading: deleteLoading, error }] =
    useUpdateBookingMutation();

  const handleEdit = async (updated: any) => {
    const dateString = updated?.bookingDate?.$d ?? updated?.bookingDate;

    const dateObject = new Date(dateString);

    // Get ISO string
    const isoString = dateObject?.toISOString();

    const editedData = {
      bookingStatus: updated?.bookingStatus,
    };

    const id = updated.bookingId;

    try {
      const res: any = await updateBooking({ id, data: editedData });

      if (res?.data) {
        message.success("Booking updated successfully");
        setIsEditModalOpen(false);
      }
    } catch (error: any) {
      console.log(error, "booking errror");
      console.error(error?.data);
      message.error(error?.data?.message);
    }
  };
  const columns = [
    {
      title: "Full Name",
      dataIndex: "profile",
      render: (profile: any) => `${profile.firstName} ${profile.lastName}`,
    },
    {
      title: "Phone No",
      dataIndex: "profile",
      render: (profile: any) => `${profile.phoneNumber}`,
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      render: (text: any) => {
        const date = new Date(text);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${day}-${month}-${year}`;
      },
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
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
    {
      title: "Status",
      dataIndex: "bookingStatus",
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
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const status = [
    { label: "Pending", value: "pending" },
    { label: "Cancelled", value: "cancelled" },
  ];

  const statusOnChange = (value: string) => {
    setBookingStatus(value);
    console.log(value);
  };

  return (
    <div className="container rounded bg-white mt-1 mb-5 p-4">
      <UMBreadCrumb
        items={[
          {
            label: "dashboard",
            link: "/dashboard",
          },
          {
            label: "User-booking-list",
            link: "/dashboard/booking/my-booking-lists",
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
      </ActionBar>

      <TableList
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pageSize={size}
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
              <Row gutter={{ xs: 24, xl: 12, lg: 12, md: 24 }}>
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
              </Row>
            </div>

            <Button htmlType="submit">submit</Button>
          </Form>
        </ModalForm>
      )}
    </div>
  );
};

export default MyBookingList;
