"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectedField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { useRegistrationMutation } from "@/redux/features/auth/authApi";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const AddAdminPage = () => {
  const roles = [
    {
      label: "admin",
      value: "admin",
    },

    {
      label: "super_admin",
      value: "super_admin",
    },
  ];
  const router = useRouter();
  const [registration, { isLoading, error }] = useRegistrationMutation();

  const adminOnSubmit = async (data: any) => {
    message.loading(`Creating ${data?.role} `);
    if (!data?.role) {
      return message.error("Please Select role");
    } else if (!data?.profileImage) {
      return message.error("Please Upload Image");
    }

    try {
      const res: any = await registration(data);
      console.log(res);
      if (res?.data) {
        message.success(`${data?.role} created successfully!`);
        router.push("/dashboard/admin-lists");
      }
    } catch (err: any) {
      console.log(err);
      console.error(err?.data?.message);
      message.error(err?.data?.message);
    }
  };
  console.log(error);
  return (
    <div className="bg-white  p-5 rounded-2xl shadow-lg">
      <UMBreadCrumb
        items={[
          { label: `Dashboard`, link: `/dashboard` },
          { label: "add-user", link: `/dashboard/add-admin` },
        ]}
      />
      <div className="mt-3">
        <div className="mb-3">
          <h1 className="text-lg text-black/70 font-bold">Create New ADMIN</h1>
        </div>
        <Form submitHandler={adminOnSubmit}>
          {/* faculty information */}
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}
            >
              Profile information
            </p>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormInput
                  name="email"
                  label="Email"
                  type="email"
                  size="large"
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormInput
                  type="password"
                  name="password"
                  label="Password"
                  size="large"
                />
              </Col>{" "}
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormSelectField
                  name="role"
                  label="User Role"
                  options={roles}
                  size="large"
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
              style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}
            >
              Basic information
            </p>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormInput name="firstName" label="First Name" size="large" />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormInput name="lastName" label="Last Name." size="large" />
              </Col>{" "}
              <Col span={12} style={{ margin: "10px 0" }}>
                <label htmlFor="image">Profile Image</label>
                <UploadImage name="profileImage" />
              </Col>
            </Row>
          </div>

          <Button htmlType="submit">submit</Button>
        </Form>
        <br />
        <br />
      </div>
    </div>
  );
};

export default AddAdminPage;
