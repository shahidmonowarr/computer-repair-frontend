"use client";

import LoginImage from "@/assets/images/login.jpg";
import InputField from "@/components/InputField/InputField";
import CopyToClipboard from "@/components/ui/CopyToClipboard";
import { useUserLoginMutation } from "@/redux/features/auth/authApi";
import { storeUserInfo } from "@/services/auth.service";

import { Button, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
const LoginPage = () => {
  const [login, { isLoading, error }] = useUserLoginMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await login(data).unwrap();

      if (res?.accessToken) {
        storeUserInfo({ accessToken: res?.accessToken });
        message.success("User logged in successfully!");
        location.reload();
        router.push("/");
      }
    } catch (error: any) {
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-1/2 py-10 px-5 md:px-10"
          >
            <div className="text-center mb-5">
              <h1 className="font-bold text-3xl mb-2 text-gray-900">Login</h1>
              <p>Login Credential For Super Admin & Admin</p>
              <div className="">
                <div className="relative bg-white border border-gray-400 rounded-lg">
                  <div className="text-gray-800 text-sm">
                    <div className="text-sm text-gray-600 hover:bg-[#f3f4f9] block px-4 py-2 duration-300">
                      <h4>Super Admin</h4>
                      <p className="relative">
                        Email: superadmin@gmail.com
                        <span className="absolute right-0 top-[6px] hover:text-blue-500">
                          <CopyToClipboard text="superadmin@gmail.com" />
                        </span>
                      </p>
                      <p className="relative">
                        Password: 12345678
                        <span className="absolute right-0 top-[6px] hover:text-blue-500">
                          <CopyToClipboard text="12345678" />
                        </span>
                      </p>
                    </div>
                    <div className="text-gray-600 hover:bg-[#f3f4f9] block px-4 py-2 duration-300">
                      <h4>Admin</h4>
                      <p className="relative">
                        Email: admin@gmail.com
                        <span className="absolute right-0 top-[6px] hover:text-blue-500">
                          <CopyToClipboard text="admin@gmail.com" />
                        </span>
                      </p>
                      <p className="relative">
                        Password: 12345678
                        <span className="absolute right-0 top-[6px] hover:text-blue-500">
                          <CopyToClipboard text="12345678" />
                        </span>
                      </p>
                    </div>
                    <div className="absolute top-0 left-[48%] md:left-[20px] transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-3 h-3 bg-white border-l border-t border-gray-400"></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
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
                  href="/sign-up"
                  className="inline-flex items-center font-bold text-[#47177e] hover:text-blue-700 hover:underline text-xs text-center"
                >
                  <span className="ml-2">Don&apos;t have account?</span>
                </Link>
              </div>

              <div className="flex -mx-3 my-[16px]">
                <div className="w-full px-3 mb-5">
                  <Button
                    type="primary"
                    className="w-full"
                    size="large"
                    htmlType="submit"
                    loading={isLoading}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </form>
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            <div className="text-center">
              <h1 className="font-bold text-3xl text-white">Login</h1>
              <p className="text-white">Enter your information to Login</p>
            </div>
            <div className="w-full h-full flex justify-center items-center">
              <Image
                src={LoginImage}
                alt="register"
                className="w-[300px] h-[300px] object-cover rounded-full border-4 border-indigo-300 mb-2"
                height={300}
                width={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
