"use client";

import ActionBar from "@/components/ui/ActionBar";
import TableList from "@/components/ui/TableList";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useDeleteFeedbackMutation,
  useGetFeedBacksQuery,
  useUpdateFeedbackMutation,
} from "@/redux/features/feedbackApi";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
const { confirm } = Modal;

const FeedBackList = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  // get data
  const { data, isLoading } = useGetFeedBacksQuery({ ...query });

  const [updateFeedback, { isLoading: deleteLoading }] =
    useUpdateFeedbackMutation();

  // delete
  const [deleteFeedback, { isError }] = useDeleteFeedbackMutation();

  const deleteHandler = async (id: string) => {
    confirm({
      title: "Do you Want to delete this  FeedBack?",
      icon: <ExclamationCircleFilled />,
      content: "Please confirm your action!",
      async onOk() {
        try {
          const res: any = await deleteFeedback(id);
          console.log(res);
          if (res && res?.success) {
            message.success("Service Deleted successfully");
          }
        } catch (err: any) {
          console.error(err.data?.message);
          message.error(err.data?.message || "Something went wrong!");
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns = [
    {
      title: "Feedback Subject",
      dataIndex: "feedbackSubject",
    },
    {
      title: "Feedback Message",
      dataIndex: "feedbackDescription",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <div className="flex gap-3">
            <Button
              onClick={() => deleteHandler(data?.feedbackId)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </div>
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
    setSearchTerm("");
  };

  return (
    <>
      <div className="bg-white  p-5 rounded-2xl shadow-lg">
        <UMBreadCrumb
          items={[
            {
              label: "Dashboard",
              link: "/dashboard",
            },
            {
              label: "Feedback Lists",
              link: "/dashboard/feedback-lists",
            },
          ]}
        />
        <div className="mt-5">
          <ActionBar title="Feedback List"></ActionBar>
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
    </>
  );
};

export default FeedBackList;
