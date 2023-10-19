/* eslint-disable @next/next/no-img-element */
"use client";

import { EditOutlined, ReloadOutlined } from "@ant-design/icons";

import { Button, Col, Input, Row, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectedField";
import ActionBar from "@/components/ui/ActionBar";
import TableList from "@/components/ui/TableList";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import {
  useGetAllUsersQuery,
  useUpdateUserInfoMutation,
} from "@/redux/features/users/userApi";
import { getUserInfo } from "@/services/auth.service";
import { Modal } from "antd";
const { confirm } = Modal;

import ModalForm from "@/components/Forms/ModalForm";

const UserList = () => {
  const { userRole } = getUserInfo() as any;

  const superAdminRole = [
    {
      label: "USER",
      value: "USER",
    },
    {
      label: "ADMIN",
      value: "ADMIN",
    },
    {
      label: "SUPER_ADMIN",
      value: "SUPER_ADMIN",
    },
  ];
  const adminRole = [
    {
      label: "USER",
      value: "USER",
    },
    {
      label: "ADMIN",
      value: "ADMIN",
    },
  ];

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
  query["role"] = "USER";

  const { data: allUsersResponse, isLoading } = useGetAllUsersQuery(query);

  // handle edit

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [updateUser, { isLoading: updateLoading, isError: isErrorUpdate }] =
    useUpdateUserInfoMutation();

  const handleEdit = async (data: any) => {
    const updateData = {
      email: data?.email,
      firstName: data?.profile?.firstName,
      lastName: data?.profile?.lastName,
      profileImage: data?.profileImage ?? editData?.profile?.profileImage,
      phoneNumber: data?.profile?.phoneNumber,
      address: data?.profile?.address,
      role: data?.profile?.role,
    };

    const id = data?.profile?.profileId;

    try {
      const res = await updateUser({ id, body: updateData }).unwrap();

      if (res && !isErrorUpdate) {
        message.success("Admin updated successfully");
        setIsEditModalOpen(false);
        setEditData(null);
      }
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "profile",
      render: function (data: Record<string, string>) {
        const fullName = `${data?.firstName} ${data?.lastName}`;
        return (
          <div className="flex gap-2 items-center">
            <img
              src={
                data?.profileImage ??
                "https://user-images.githubusercontent.com/522079/90506845-e8420580-e122-11ea-82ca-31087fc8486c.png"
              }
              alt={fullName}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            {fullName}
          </div>
        );
      },
      //   sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      //   sorter: true,
    },
    {
      title: "Address",
      dataIndex: "profile",
      render: function (data: Record<string, string>) {
        return <>{data?.address ?? "-"}</>;
      },
    },
    {
      title: "Phone No",
      dataIndex: "profile",
      render: function (data: Record<string, string>) {
        return <>{data?.phoneNumber ?? "-"}</>;
      },
      //   sorter: true,
    },
    {
      title: "Role",
      dataIndex: "profile",
      render: function (data: Record<string, string>) {
        return <>{data?.role ?? "-"}</>;
      },
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
      <div className=" rounded bg-white mt-1 mb-5 p-4">
        <UMBreadCrumb
          items={[
            {
              label: "dashboard",
              link: "/dashboard",
            },
            {
              label: "User Lists",
              link: "/dashboard/user-lists",
            },
          ]}
        />

        <div className="mt-5">
          <ActionBar title="Admin Lists">
            <Input
              type="text"
              size="large"
              placeholder="Search by name, email, role..."
              style={{
                width: "30%",
              }}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <div>
              <Link href="/dashboard/add-user">
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
          loading={isLoading}
          columns={columns}
          dataSource={allUsersResponse?.data}
          pageSize={size}
          // totalPages="meta?.total"
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
          title="FAQ"
          isLoading={updateLoading}
        >
          <Form submitHandler={handleEdit} defaultValues={editData}>
            {/* faculty information */}
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <h1
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    margin: "5px 0px",
                  }}
                >
                  Profile information
                </h1>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={12} style={{ margin: "10px 0" }}>
                  <FormInput
                    name="email"
                    label="Email"
                    type="email"
                    size="large"
                    placeholder="Enter email"
                    disabled
                  />
                </Col>

                <Col span={12} style={{ margin: "10px 0" }}>
                  <FormSelectField
                    name="profile.role"
                    label="User Role"
                    options={
                      userRole === "SUPER_ADMIN" ? superAdminRole : adminRole
                    }
                    size="large"
                    placeholder="Select Role"
                  />
                </Col>
              </Row>
            </div>
            {/* basic information  */}
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
                Basic information
              </p>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={24} style={{ margin: "10px 0" }}>
                  <label htmlFor="image">Profile Image</label>
                  <UploadImage
                    name="profileImage"
                    key="file"
                    defaultImage={editData?.profile?.profileImage}
                  />
                </Col>
                <Col span={12} style={{ margin: "10px 0" }}>
                  <FormInput
                    name="profile.firstName"
                    label="First Name"
                    size="large"
                    placeholder="Enter First Name"
                  />
                </Col>
                <Col span={12} style={{ margin: "10px 0" }}>
                  <FormInput
                    name="profile.lastName"
                    label="Last Name."
                    size="large"
                    placeholder="Enter Last Name"
                  />
                </Col>{" "}
                <Col span={12} style={{ margin: "10px 0" }}>
                  <FormInput
                    name="profile.contactNumber"
                    label="Contact Number"
                    size="large"
                    placeholder="Enter Contract Number"
                  />
                </Col>
                <Col span={12} style={{ margin: "10px 0" }}>
                  <FormInput
                    name="profile.address"
                    label="Address"
                    size="large"
                    placeholder="Enter Address"
                  />
                </Col>{" "}
              </Row>
            </div>

            <div className="flex gap-5">
              <Button
                htmlType="submit"
                type="primary"
                loading={updateLoading}
                disabled={updateLoading}
              >
                Update User
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

export default UserList;
