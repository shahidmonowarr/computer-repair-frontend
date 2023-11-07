"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectedField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { ServiceStatus } from "@/constants/common";
import { useCreateServiceMutation } from "@/redux/features/serviceApi";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const AddServicePage = () => {
  const [createService, { isLoading, isError }] = useCreateServiceMutation();

  const router = useRouter();

  const serviceOnSubmit = async (data: any) => {
    message.loading("Creating new Service");
    const ServiceData = {
      serviceName: data.serviceName,
      description: data.description,
      serviceImage: data.serviceImage,
      servicePrice: parseInt(data.servicePrice),
      serviceStatus: data.serviceStatus,
    };

    console.log(ServiceData);
    try {
      const res: any = await createService({ data: ServiceData });

      if (res?.data && !isError) {
        message.success("Service created successfully");
        router.push("/dashboard/service-lists");
      }
    } catch (err: any) {
      console.error(err?.data?.message);
      message.error("something went wrong");
    }
  };

  return (
    <div className="bg-white  p-5 rounded-2xl shadow-lg">
      <UMBreadCrumb
        items={[
          { label: `dashboard`, link: `/dashboard` },
          { label: "Add Service", link: `/dashboard/add-service` },
        ]}
      />
      <div className="mt-3">
        <div className="mb-3">
          <h1 className="text-lg text-black/70 font-bold">
            Create New Service
          </h1>
        </div>
        <Form submitHandler={serviceOnSubmit}>
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
              Service information
            </p>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={3} style={{ margin: "10px 0" }}>
                <p className="pb-2">Service Image</p>
                <UploadImage name="serviceImage" />
              </Col>{" "}
            </Row>

            <Row gutter={{ xs: 24, xl: 24, lg: 24, md: 24 }}>
              <Col span={12} style={{ margin: "10px 0" }}>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput
                    size="large"
                    name="serviceName"
                    label="Service Name"
                  />
                </div>
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput size="large" name="servicePrice" label="Price" />
                </div>
              </Col>
            </Row>
            <Row gutter={{ xs: 24, xl: 12, lg: 12, md: 24 }}>
              <Col span={8} style={{ margin: "10px 0" }}>
                <div style={{ margin: "10px 0px" }}>
                  <FormSelectField
                    name="serviceStatus"
                    label="Service Status"
                    options={ServiceStatus}
                  />
                </div>
              </Col>
            </Row>
            <Row gutter={{ xs: 24, xl: 12, lg: 12, md: 24 }}>
              <Col span={24} style={{ margin: "10px 0" }}>
                <div style={{ margin: "10px 0px" }}>
                  <FormTextArea
                    name="description"
                    label="Service Description"
                    rows={8}
                  />
                </div>
              </Col>
            </Row>
          </div>

          <Button htmlType="submit">submit</Button>
        </Form>
        <br />
        <br />

        <br />
      </div>
    </div>
  );
};

export default AddServicePage;
