"use client";

import { DeleteOutlined } from "@ant-design/icons";

import TableList from "@/components/ui/TableList";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useDeleteReviewMutation,
  useGetMyReviewsQuery,
} from "@/redux/features/ratingApi";
import { Button, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const MyReviews = () => {
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
  const { data, isLoading } = useGetMyReviewsQuery({ ...query });

  const [deleteData, { isLoading: deleteLoading }] = useDeleteReviewMutation();

  const deleteHandler = async (id: string) => {
    message.loading("Deleting...");
    try {
      //   console.log(data);
      const res = await deleteData(id);
      if (res) {
        message.success("Review Deleted successfully");
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Service",
      dataIndex: "service",
      render: (service: any) => `${service.serviceName}`,
      //   sorter: true,
    },
    {
      title: "Review Comment",
      dataIndex: "reviewComment",
    },
    {
      title: "Rating",
      dataIndex: "reviewRating",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Button
              onClick={() => deleteHandler(data?.reviewId)}
              type="primary"
              danger
            >
              <DeleteOutlined />
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

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setFirstName("");
    setBookingStatus("");
  };

  return (
    <div className="my-5 bg-white p-5 rounded-2xl">
      <div className="mb-5">
        <UMBreadCrumb
          items={[
            {
              label: "dashboard",
              link: "/dashboard",
            },
            {
              label: "review-list",
              link: "/dashboard/review-lists",
            },
          ]}
        />
      </div>

      <TableList
        columns={columns}
        dataSource={data}
        pageSize={size}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default MyReviews;
