"use client";

/* eslint-disable @next/next/no-img-element */
import { removeFromCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { Dialog, Transition } from "@headlessui/react";
import { Empty } from "antd";
import Link from "next/link";
import { Fragment } from "react";

type IAddToCardProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddToCard({ open, setOpen }: IAddToCardProps) {
  const { cart } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (serviceId: string) => {
    console.log(serviceId);
    dispatch(removeFromCart(serviceId));
  };

  const subtotal = cart?.reduce(
    (total: any, single: any) => total + single.servicePrice,
    0
  );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          My Cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <CloseOutlined className="h-6 w-6" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cart?.map((service: any) => (
                              <>
                                <li
                                  key={service.serviceId}
                                  className="flex px-3  py-6 rounded-lg border border-gray-200"
                                >
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={service.serviceImage}
                                      alt={service.serviceImage}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3 className="font-bold">
                                          {service?.serviceName}
                                        </h3>
                                        <br />
                                        <p className="ml-4">
                                          ${service?.servicePrice}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex justify-end w-full">
                                        <button
                                          onClick={() =>
                                            handleRemoveFromCart(
                                              service?.serviceId
                                            )
                                          }
                                          type="button"
                                          className="font-medium px-2 py-2 border rounded-md  text-white bg-blue-500 hover:bg-blue-600"
                                        >
                                          <DeleteOutlined />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </>
                            ))}
                          </ul>
                        </div>
                        <div className="flex justify-center items-center">
                          {cart?.length === 0 && (
                            <Empty
                              description={<span>{`Add a Service First`}</span>}
                            ></Empty>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>$ {subtotal}</p>
                      </div>
                      <div className="mt-6">
                        <Link
                          href="/checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-blue-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-600"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-3 flex justify-center  text-center text-sm text-gray-500">
                        <p>
                          OR
                          <br />
                          <button
                            type="button"
                            className="font-medium text-blue-600 hover:text-blue-500"
                            onClick={() => setOpen(false)}
                          >
                            Back To Normal
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
