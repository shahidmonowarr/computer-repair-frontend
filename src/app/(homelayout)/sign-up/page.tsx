"use client";

import RegisterImage from "@/assets/images/register.jpg";
import InputField from "@/components/InputField/InputField";
import { useRegistrationMutation } from "@/redux/features/auth/authApi";
import { Button, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [registration, { isLoading, isSuccess, error }] =
    useRegistrationMutation();

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const res = await registration(data).unwrap();
      if (res?.success) {
        router.push("/login");
        message.success("Registration success.Please Login");
        reset();
      }
    } catch (error: any) {
      console.log(error);
      console.error(error?.data?.message);
      message.error(error?.data?.message);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-bgColor flex items-center justify-center px-5 py-5">
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style={{
          maxWidth: "1000px",
        }}
      >
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            <div className="text-center mb-2">
              <h1 className="font-bold text-3xl text-white">REGISTER</h1>
              <p className="text-white">Enter your information to register</p>
            </div>
            <div className="w-full h-full flex justify-center items-center">
              <Image
                src={RegisterImage}
                alt="register"
                className="w-[300px] h-[300px] object-cover rounded-full border-4 border-indigo-300"
                height={300}
                width={300}
              />
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-1/2 py-10 px-5 md:px-10"
          >
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
              <p>Enter your information to register</p>
            </div>

            <div>
              <InputField
                label="First Name"
                name="firstName"
                placeholder="Enter your first name"
                register={register}
                errors={errors}
                required={true}
                type="text"
              />
              {errors?.firstName && (
                <p className="text-rose-500 my-[2px] text-[12px]">
                  First name is Required
                </p>
              )}

              <InputField
                label="Last Name"
                name="lastName"
                placeholder="Enter your Last name"
                register={register}
                errors={errors}
                required={true}
                type="text"
              />
              {errors?.lastName && (
                <p className="text-rose-500 my-[2px] text-[12px]">
                  Last name is Required
                </p>
              )}

              <InputField
                label="Email"
                name="email"
                placeholder="Enter your email"
                register={register}
                errors={errors}
                required={true}
                type="email"
              />

              {errors?.email && errors?.email?.message === "" && (
                <p className="text-rose-500 my-[2px] text-[12px]">
                  Email is Required
                </p>
              )}
              {errors?.email && errors?.email?.message && (
                <p className="text-rose-500 my-[2px] text-[12px]">
                  {errors?.email?.message as string}
                </p>
              )}

              <InputField
                label="Password"
                name="password"
                placeholder="Enter your password"
                register={register}
                errors={errors}
                required={true}
                type="password"
              />
              {errors?.password && errors?.password?.message === "" && (
                <p className="text-rose-500 my-[2px] text-[12px]">
                  Password is Required
                </p>
              )}
              {errors?.password && errors?.password?.message && (
                <p className="text-rose-500 my-[2px] text-[12px]">
                  {errors?.password?.message as string}
                </p>
              )}

              {/* already have account */}
              <div className="flex items-center justify-end mt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center font-bold text-[#47177e] hover:text-blue-700 hover:underline text-xs text-center"
                >
                  <span className="ml-2">Already have an account?</span>
                </Link>
              </div>

              <div className="flex -mx-3 my-[16px]">
                <div className="w-full px-3 mb-5">
                  <Button
                    className="w-full"
                    size="large"
                    loading={isLoading}
                    type="primary"
                    htmlType="submit"
                  >
                    REGISTER NOW
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
