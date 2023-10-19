"use client";

import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { Button, Col, Row, message } from "antd";
import Link from "next/link";
import { useState } from "react";

import {
  useDeleteFaqMutation,
  useGetFaqQuery,
  useUpdateFaqMutation,
} from "@/redux/features/faqApi";
import { Modal } from "antd";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import ModalForm from "@/components/Forms/ModalForm";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";

const { confirm } = Modal;

const FaqLists = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isLoading } = useGetFaqQuery(query);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [updateFaq, { isLoading: deleteLoading }] = useUpdateFaqMutation();

  const handleEdit = async (data: any) => {
    const editData = {
      faqTitle: data.faqTitle,
      faqDescription: data.faqDescription,
    };

    const id = data.faqId;

    try {
      const res = await updateFaq({ id, data: editData }).unwrap();

      if (res) {
        message.success("FAQ updated successfully");
        setIsEditModalOpen(false);
      }
    } catch (error: any) {
      console.error(error?.data?.message);
      message.error(error?.data?.message);
    }
  };

  const [deleteFaq, { isError }] = useDeleteFaqMutation();

  const HandleDelete = async (id: string) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this FAQ?",
      onOk: async () => {
        message.loading("Deleting....");
        try {
          await deleteFaq(id);
          message.success("FAQ Deleted Successfully");
        } catch (err: any) {
          message.error(err.data?.message);
        }
      },
      onCancel: () => {
        // Do nothing if the user clicks "No" in the modal
      },
    });
  };

  // delete end

  const columns = [
    {
      title: "Title",
      dataIndex: "faqTitle",
      //   sorter: true,
    },
    {
      title: "Description",
      dataIndex: "faqDescription",
      //   sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <div className="flex gap-3">
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
            <Button
              onClick={() => HandleDelete(data?.faqId)}
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
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  //   console.log(dataSource);

  return (
    <>
      <div className="container rounded bg-white mt-1 mb-5 p-4">
        <UMBreadCrumb
          items={[
            {
              label: "dashboard",
              link: "/dashboard",
            },
            {
              label: "faq-Lists",
              link: "/dashboard/faq-lists",
            },
          ]}
        />

        <div className="mt-5">
          <ActionBar title="FAQ Lists">
            <div>
              <Link href="/dashboard/add-faq">
                <Button type="primary">Create</Button>
              </Link>
              {(!!sortBy || !!sortOrder || !!searchTerm) && (
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
        </div>

        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={data}
          pageSize={size}
          // totalPages="meta?.total"
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>

      {/* edit */}

      {isEditModalOpen && editData && (
        <ModalForm
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          title="FAQ"
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
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={24} style={{ margin: "10px 0" }}>
                  <FormInput
                    name="faqTitle"
                    label="FAQ Title"
                    placeholder="FAQ Title"
                    size="large"
                    type="text"
                  />
                </Col>
                <Col span={24} style={{ margin: "10px 0" }}>
                  <FormTextArea
                    name="faqDescription"
                    label="FAQ Description"
                    rows={8}
                    placeholder="Enter FAQ Description"
                  />
                </Col>{" "}
              </Row>
            </div>

            <div className="flex gap-5">
              <Button loading={deleteLoading} htmlType="submit">
                Update FAQ
              </Button>

              <Button
                onClick={() => setIsEditModalOpen(false)}
                htmlType="button"
                type="primary"
                danger
              >
                Cancel
              </Button>
            </div>
          </Form>
        </ModalForm>
      )}
    </>
  );
};

export default FaqLists;
