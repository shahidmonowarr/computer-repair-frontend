"use client";

import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectedField";
import FormTextArea from "@/components/Forms/FormTextArea";
import ModalForm from "@/components/Forms/ModalForm";
import ActionBar from "@/components/ui/ActionBar";
import TableList from "@/components/ui/TableList";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { ServiceStatus } from "@/constants/common";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
} from "@/redux/features/serviceApi";
import Image from "next/image";

const ServiceList = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteService] = useDeleteServiceMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  // get data
  const { data, isLoading } = useGetAllServicesQuery({ ...query });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [updateService, { isLoading: deleteLoading }] =
    useUpdateServiceMutation();

  const handleEdit = async (updated: any) => {
    const editedData = {
      serviceName: updated.serviceName,
      description: updated.description,
      serviceImage: updated.serviceImage,
      servicePrice: parseInt(updated.servicePrice),
      serviceStatus: updated.serviceStatus,
    };

    const id = updated.serviceId;

    try {
      const res = await updateService({ id, data: editedData }).unwrap();
      if (res) {
        message.success("Service updated successfully");
        setIsEditModalOpen(false);
      }
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };

  const HandleDelete = async (id: string) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this Service?",
      onOk: async () => {
        message.loading("Deleting....");
        try {
          await deleteService(id);
          message.success("Service Deleted Successfully");
        } catch (err: any) {
          message.error(err.message);
        }
      },
      onCancel: () => {
        // Do nothing if the user clicks "No" in the modal
      },
    });
  };

  const columns = [
    {
      title: "Image",
      render: function (data: any) {
        return data?.serviceImage ? (
          <Image
            src={data?.serviceImage}
            alt=""
            width={50}
            className=" object-cover object-center rounded-full border h-[50px] w-[50px]"
            height={50}
          />
        ) : (
          "---"
        );
      },
      //   sorter: true,
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      //   sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "servicePrice",
    },
    {
      title: "Status",
      dataIndex: "serviceStatus",
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
              onClick={() => HandleDelete(data.serviceId)}
              danger
              type="primary"
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
              label: "Service Lists",
              link: "/dashboard/service-lists",
            },
          ]}
        />
        <div className="mt-5">
          <ActionBar title="Service Lists">
            <Input
              type="text"
              size="large"
              placeholder="Search by title or description..."
              style={{
                width: "30%",
              }}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <div>
              <Link href="/dashboard/add-service">
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
      {isEditModalOpen && editData && (
        <ModalForm
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          title="Service"
          isLoading={deleteLoading}
        >
          <Form submitHandler={handleEdit} defaultValues={editData}>
            {/* faculty information */}
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                padding: "15px",
              }}
            >
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={24}>
                  <p className="pb-2">Service Image</p>
                  <UploadImage
                    defaultImage={editData?.serviceImage}
                    name="serviceImage"
                  />
                </Col>{" "}
              </Row>

              <Row gutter={{ xs: 24, xl: 24, lg: 24, md: 24 }}>
                <Col span={12}>
                  <div>
                    <FormInput
                      size="large"
                      name="serviceName"
                      label="Service Name"
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <FormInput
                      size="large"
                      name="servicePrice"
                      type="number"
                      label="Price"
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 12, lg: 12, md: 24 }}>
                <Col span={8}>
                  <div>
                    <FormSelectField
                      name="serviceStatus"
                      label="Service Status"
                      options={ServiceStatus.map((c) => ({
                        label: c.label,
                        value: c.value,
                      }))}
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 12, lg: 12, md: 24 }}>
                <Col span={24}>
                  <div>
                    <FormTextArea
                      name="description"
                      label="Service Description"
                      rows={8}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div className="flex mt-3 gap-3">
              <Button htmlType="submit">submit</Button>
              <Button onClick={() => setIsEditModalOpen(false)} danger>
                Cancel
              </Button>
            </div>
          </Form>
        </ModalForm>
      )}
    </>
  );
};

export default ServiceList;
