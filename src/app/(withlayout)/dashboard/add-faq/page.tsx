"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useCreateFaqMutation } from "@/redux/features/faqApi";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const AddFaq = () => {
  const [createFaq, { isLoading, isSuccess }] = useCreateFaqMutation(undefined);

  const router = useRouter();

  const faqOnSubmit = async (data: any) => {
    message.loading("Creating...");
    const faqData = {
      faqTitle: data.faqTitle,
      faqDescription: data.faqDescription,
    };
    try {
      const res = await createFaq(faqData).unwrap();

      if (res && isSuccess && !isLoading) {
        message.success("FAQ created successfully");
        router.push("/dashboard/faq-lists");
      }
    } catch (err: any) {
      message.error(err?.data?.message);
    }
  };

  return (
    <div className="bg-white  p-5 rounded-2xl shadow-lg">
      <UMBreadCrumb
        items={[
          { label: `Dashboard`, link: `/dashboard` },
          { label: "Add FAQ", link: `/dashboard/add-faq` },
        ]}
      />
      <div>
        <div>
          <h1 className="text-[25px] my-[12px] font-semibold">Add FAQ</h1>
        </div>

        <Form submitHandler={faqOnSubmit}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={22} style={{ margin: "10px 0" }}>
                <FormInput
                  name="faqTitle"
                  label="FAQ Title"
                  placeholder="Enter FAQ Title"
                  size="large"
                  type="text"
                />
              </Col>
              <Col span={24} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="faqDescription"
                  label="FAQ Description"
                  placeholder="Enter FAQ Description"
                  rows={6}
                />
              </Col>{" "}
            </Row>
          </div>
          <div className="mt-5">
            <Button htmlType="submit">Create</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddFaq;
