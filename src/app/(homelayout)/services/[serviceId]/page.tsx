/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Rate, Spin } from "antd";

import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, message } from "antd";
import { useRouter } from "next/navigation";
const { confirm } = Modal;

import Form from "@/components/Forms/Form";
import FormRating from "@/components/Forms/FormRating";
import FormTextArea from "@/components/Forms/FormTextArea";
import { addToCart } from "@/redux/features/cartSlice";
import { useCreateRatingMutation } from "@/redux/features/ratingApi";
import { useGetSingleServiceQuery } from "@/redux/features/serviceApi";
import { useAppDispatch } from "@/redux/hooks";
import { isLoggedIn } from "@/services/auth.service";
import { IServiceTypes } from "@/types";
import Image from "next/image";

const faqs = [
  {
    question: "What format are these icons?",
    answer:
      "The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.",
  },
  {
    question: "Can I use the icons at different sizes?",
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
  },
  // More FAQs...
];
const license = {
  href: "#",
  summary:
    "For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.",
  content: `
    <h4>Overview</h4>
    
    <p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.</p>
    
    <ul role="list">
    <li>You're allowed to use the icons in unlimited projects.</li>
    <li>Attribution is not required to use the icons.</li>
    </ul>
    
    <h4>What you can do with it</h4>
    
    <ul role="list">
    <li>Use them freely in your personal and professional work.</li>
    <li>Make them your own. Change the colors to suit your project or brand.</li>
    </ul>
    
    <h4>What you can't do with it</h4>
    
    <ul role="list">
    <li>Don't be greedy. Selling or distributing these icons in their original or modified state is prohibited.</li>
    <li>Don't be evil. These icons cannot be used on websites or applications that promote illegal or immoral beliefs or activities.</li>
    </ul>
  `,
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const ServiceDetails = ({ params }: any) => {
  const [createRating, { isLoading: reviewLoading }] =
    useCreateRatingMutation();
  const dispatch = useAppDispatch();
  const userLoggedIn = isLoggedIn();

  const router = useRouter();
  const serviceId = params?.serviceId;

  const { data: singleService, isLoading: singleServiceLoading } =
    useGetSingleServiceQuery(serviceId);

  // review

  const handleReview = async (data: any) => {
    if (!userLoggedIn) {
      confirm({
        title: "Please Login First",
        icon: <ExclamationCircleFilled />,
        content:
          "You need to login first to give Review. Do you want to login?",
        onOk() {
          return router.push("/login");
        },
        onCancel() {},
      });

      return;
    } else {
      try {
        const updateData = {
          reviewComment: data?.reviewComment,
          reviewRating: data?.reviewRating?.toString(),
          serviceId,
        };

        const res: any = await createRating(updateData);

        if (res?.data) {
          message.success("Review Added Successfully");
        }
      } catch (error: any) {
        console.error(error);
        message.error(error?.data?.message);
      }
    }
  };

  // add to cart

  const handleAddToCart = (addedService: IServiceTypes) => {
    if (!userLoggedIn) {
      confirm({
        title: "Please Login First",
        icon: <ExclamationCircleFilled />,
        content:
          "You need to login first to Add To Cart This. Do you want to login?",
        onOk() {
          return router.push("/login");
        },
        onCancel() {},
      });

      return;
    } else {
      dispatch(addToCart(addedService));
      message.success("Service added to cart");
    }
  };

  let rating = 0;

  if (
    singleService?.reviewAndRatings &&
    singleService?.reviewAndRatings?.length > 0
  ) {
    for (const review of singleService?.reviewAndRatings) {
      rating += Number(review.reviewRating);
    }
  }

  return (
    <section className="max-w-7xl mx-auto">
      {" "}
      <Spin tip="Loading" spinning={singleServiceLoading} size="large">
        <div className="max-w-5xl  my-20 mx-auto grid grid-cols-3 gap-10 items-center">
          <div className="col-span-1">
            <Image
              alt={singleService?.serviceName}
              src={singleService?.serviceImage}
              height={80}
              width={80}
              className="w-full p-5 h-[350px] shadow-lg  object-cover object-center rounded-lg border "
            />
          </div>
          <div className="w-full col-span-2 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Service Name
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {singleService?.serviceName}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">
                  {singleService?._count?.reviewAndRatings} Reviews
                </span>
              </span>
              <div className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <span className="text-gray-600 ml-3">
                  {singleService?._count?.appointmentBooked} Appointment Booked
                </span>
              </div>
            </div>
            <div className="mt-5 border-t pt-4">
              <p className="leading-relaxed">{singleService?.description}</p>
            </div>

            <div className="flex mt-10 justify-between border-t pt-4 ">
              <span className="title-font font-medium text-2xl text-gray-900">
                $ {singleService?.servicePrice}
              </span>
              <Button
                onClick={() => handleAddToCart(singleService)}
                type="primary"
                className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </Spin>
      <div className=" ">
        <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          {/* Product */}

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <h3 className="sr-only">Customer Reviews</h3>

            <div className="mt-2">
              <Form submitHandler={handleReview}>
                <div className="flex items-center gap-3">
                  <div>
                    <FormRating name="reviewRating" />
                  </div>
                  <p>Your Rating</p>
                </div>
                <FormTextArea
                  name="reviewComment"
                  placeholder="Write your review here"
                  rows={5}
                />

                <Button
                  loading={reviewLoading}
                  disabled={reviewLoading}
                  htmlType="submit"
                  size={"large"}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  Submit
                </Button>
              </Form>
            </div>

            <div className="grid grid-cols-3 gap-5 mt-5">
              {singleService?.reviewAndRatings?.length > 0 &&
                singleService?.reviewAndRatings?.map(
                  (review: any, reviewIdx: number) => (
                    <div
                      key={reviewIdx}
                      className="border rounded-lg  p-3 shadow-lg"
                    >
                      <div
                        key={reviewIdx}
                        className="flex space-x-4 text-sm text-gray-500 w-full"
                      >
                        <div className="flex-none ">
                          <img
                            src={
                              review?.profile?.profileImage ??
                              "https://www.truckeradvisor.com/media/uploads/profilePics/notFound.jpg"
                            }
                            alt=""
                            className="h-10 w-10 rounded-full bg-gray-100"
                          />
                        </div>
                        <div
                          className={classNames(reviewIdx === 0 ? "" : "", "")}
                        >
                          <h3 className="font-medium text-gray-900">
                            {review?.profile?.firstName +
                              " " +
                              review?.profile?.lastName}
                          </h3>
                          <p>
                            {new Date(review?.createdAt!).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>

                          <div className="mt-4 flex items-center">
                            <Rate disabled defaultValue={review.reviewRating} />
                          </div>
                          <p className="sr-only">
                            {review?.reviewRating} out of 5 stars
                          </p>

                          <div
                            className="prose prose-sm mt-4 max-w-none text-gray-500"
                            dangerouslySetInnerHTML={{
                              __html: review?.reviewComment,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
