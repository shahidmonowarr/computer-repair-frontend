/* eslint-disable @next/next/no-img-element */
"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ModalForm from "@/components/Forms/ModalForm";
import { Metadata } from "next";

import UploadImage from "@/components/ui/UploadImage";

import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useUpdateMyUserInfoMutation,
} from "@/redux/features/users/userApi";
import { Button, Col, Row, Spin, message } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

const metadata: Metadata = {
  title: "Profile - PulsePC",
};

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPassEmailEditModalOpen, setIsPassEmailEditModalOpen] =
    useState(false);

  const {
    data: myProfileResponse,
    isError,
    isLoading,
    isFetching,
    error,
  } = useGetMyProfileQuery(undefined);
  const [
    updateMyProfile,
    { isLoading: updateLoadings, isError: isErrorUpdate },
  ] = useUpdateMyProfileMutation();

  const handleEdit = async (data: any) => {
    const updateData = {
      firstName: data?.profile?.firstName,
      lastName: data?.profile?.lastName,
      profileImage: data?.profileImage,
      phoneNumber: data?.profile?.phoneNumber,
      address: data?.profile?.address,
    };

    try {
      const res = await updateMyProfile(updateData).unwrap();
      if (res && !isErrorUpdate) {
        message.success("Profile updated successfully");
        setIsEditModalOpen(false);
      }
    } catch (error: any) {
      console.error(error?.data?.message);
      message.error(error?.data?.message);
    }
  };
  const [
    updateMyUserInfo,
    { isLoading: updateUserLoadings, isError: isUserErrorUpdate },
  ] = useUpdateMyUserInfoMutation();

  const handleUpdateMyUserInfo = async (data: any) => {
    const updateData = {
      email: data?.email,
      oldPassword: data?.oldPassword,
      newPassword: data?.newPassword,
    };

    try {
      const res = await updateMyUserInfo(updateData).unwrap();
      if (res && !isUserErrorUpdate) {
        message.success(" Successfully Updated");
        setIsPassEmailEditModalOpen(false);
      }
      if (!res) {
        message.error("Old Password is not correct");
      }
    } catch (error: any) {
      console.log(error);
      console.error(error?.data?.message);
      message.error(error?.data?.message);
    }
  };
  return (
    <>
      <section className="pt-5 rounded-2xl shadow-2xl  bg-white mt-5 mb-5">
        <div className="flex justify-between p-5 ">
          <div className="flex  gap-10">
            <div className="-mt-5 ">
              <Image
                width={200}
                height={200}
                src={
                  myProfileResponse?.profile?.profileImage ??
                  "https://user-images.githubusercontent.com/522079/90506845-e8420580-e122-11ea-82ca-31087fc8486c.png"
                }
                className="w-[200px]  h-[200px] object-center  rounded-full border shadow-xl"
                alt="profile Image"
              />
            </div>

            <div className="mt-5">
              <h2 className="text-2xl font-semibold">
                {myProfileResponse?.profile?.firstName}{" "}
                {myProfileResponse?.profile?.lastName}
              </h2>
              <p className="font-medium font-mono text-[#9f9fa3]">
                {myProfileResponse?.email}
              </p>
              <Button
                onClick={() => {
                  setIsEditModalOpen(true);
                }}
                type="default"
                className="font-medium my-2"
                size="middle"
              >
                Edit Profile
              </Button>
              <br />
              <Button
                onClick={() => {
                  setIsPassEmailEditModalOpen(true);
                }}
                type="default"
                className="font-medium"
                size="middle"
              >
                Change Email or Password
              </Button>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="flex relative justify-center">
          <div className="absolute">
            {isLoading ||
              (isFetching && <Spin spinning={isLoading || isFetching}></Spin>)}
          </div>
        </div>
        <div className="p-5">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Profile Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Personal details
            </p>
          </div>
          <div className="mt-6 border-t font-semibold border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  First Name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {myProfileResponse?.profile?.firstName}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {myProfileResponse?.profile?.lastName}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {myProfileResponse?.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Role
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {myProfileResponse?.profile?.role}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {myProfileResponse?.profile?.phoneNumber ?? "- -"}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Address
                </dt>
                <dd className="mt-1 text-sm  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {myProfileResponse?.profile?.address ?? "- -"}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Created At
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {myProfileResponse?.profile?.createdAt &&
                    dayjs(myProfileResponse?.profile?.createdAt).format(
                      "MMM D, YYYY hh:mm A"
                    )}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Updated At
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {myProfileResponse?.profile?.updatedAt &&
                    dayjs(myProfileResponse?.profile?.updatedAt).format(
                      "MMM D, YYYY hh:mm A"
                    )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      {isEditModalOpen && (
        <ModalForm
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          title="Update Profile"
          isLoading={updateLoadings}
          width={900}
        >
          <Form defaultValues={myProfileResponse} submitHandler={handleEdit}>
            {/* profile information  */}
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
                <Col span={12}>
                  <FormInput
                    name="profile.firstName"
                    label="First Name"
                    size="large"
                    placeholder="Enter First Name"
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="profile.lastName"
                    label="Last Name."
                    size="large"
                    placeholder="Enter Last Name"
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="profile.phoneNumber"
                    label="Contact Number"
                    size="large"
                    placeholder="Enter Contact Number"
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    name="profile.address"
                    label="Address"
                    size="large"
                    placeholder="Enter Address"
                  />
                </Col>
                <Col span={24} className="mt-2">
                  <label htmlFor="image">Profile Image</label>
                  <UploadImage
                    name="profileImage"
                    key="profileImage"
                    defaultImage={myProfileResponse?.profile?.profileImage}
                  />
                </Col>
              </Row>
            </div>

            <div className="flex  justify-end gap-5">
              <Button
                htmlType="submit"
                type="primary"
                loading={updateLoadings}
                disabled={updateLoadings}
              >
                Update User
              </Button>

              <Button
                onClick={() => setIsEditModalOpen(false)}
                htmlType="button"
                type="default"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </ModalForm>
      )}
      {isPassEmailEditModalOpen && (
        <ModalForm
          open={isPassEmailEditModalOpen}
          setOpen={setIsPassEmailEditModalOpen}
          title="Update Email and Password"
          isLoading={updateUserLoadings}
          width={500}
        >
          <Form
            defaultValues={myProfileResponse}
            submitHandler={handleUpdateMyUserInfo}
          >
            {/* profile information  */}
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={24}>
                  <FormInput
                    name="email"
                    label="Email"
                    size="large"
                    type="email"
                    placeholder="Enter your Email"
                  />
                </Col>
                <Col span={24}>
                  <FormInput
                    name="oldPassword"
                    label="Old Password"
                    size="large"
                    placeholder="Enter Your Old Password"
                  />
                </Col>
                <Col span={24}>
                  <FormInput
                    name="newPassword"
                    label="New Password"
                    size="large"
                    placeholder="Enter Your New Password"
                  />
                </Col>
              </Row>
            </div>

            <div className="flex  justify-end gap-5">
              <Button
                htmlType="submit"
                type="primary"
                loading={updateUserLoadings}
                disabled={updateUserLoadings}
              >
                Update User
              </Button>

              <Button
                onClick={() => setIsPassEmailEditModalOpen(false)}
                htmlType="button"
                type="default"
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

export default Profile;
