"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import { Button } from "antd";
import Image from "next/image";
import feedbackBro from "../../../assets/images/Feedback-bro.png";

const FeedbackSection = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <section className="text-gray-600 body-font relative  ">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Give Us Your Feedback
      </h2>
      <Form submitHandler={handleSubmit}>
        <div className=" px-5 py-12 grid grid-cols-1 md:grid-cols-2 gap-2 mx-auto">
          <div>
            <Image src={feedbackBro} alt="" />
          </div>

          <div className=" bg-white rounded-lg p-6 flex flex-col  z-5 shadow-md">
            <h2 className="text-gray-900 text-xl mb-1 font-medium title-font">
              Feedback
            </h2>
            <p className="leading-relaxed mb-2 text-gray-600 text-[14px]">
              Please give us your feedback and we will get back to you soon.
            </p>

            <FormInput
              name="feedbackSubject"
              label="Subject"
              placeholder="Enter Subject"
              type="text"
            />

            <FormTextArea
              name="feedbackComment"
              label="Message"
              placeholder="Enter Message"
              rows={10}
            />

            <Button
              htmlType="submit"
              type="primary"
              className="text-white mt-[8px] bg-blue-500 border-0  px-6 hover:bg-blue-600 rounded text-lg"
            >
              Submit
            </Button>
            <p className="text-xs text-gray-500 mt-3">
              We will get back to you soon.
            </p>
          </div>
        </div>
      </Form>
    </section>
  );
};

export default FeedbackSection;