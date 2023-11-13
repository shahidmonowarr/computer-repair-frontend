import { useGetMyProfileQuery } from "@/redux/features/users/userApi";
import { getUserInfo } from "@/services/auth.service";
import { Dropdown, theme } from "antd";
import Image from "next/image";
import Link from "next/link";

const DashboardHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const {
    data: myProfileResponse,
    isError,
    isLoading,
    isFetching,
    error,
  } = useGetMyProfileQuery(undefined);

  const user = getUserInfo() as any;

  const items = [
    {
      key: "1",
      label: <Link href={"/"}>Home Page</Link>,
    },
  ];
  return (
    <div
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.06) -3px 0px 0px -8px, #e9d8ff6b -11px 23px 13px -15px",
        boxSizing: "border-box",
      }}
      className="mx-auto border-b px-5 py-2 sticky top-0 h-14  w-full z-10 bg-[#fff]"
    >
      <div className="flex items-center sm:justify-between sm:gap-4">
        <div className="flex flex-1 items-center justify-between gap-8 sm:justify-end">
          <Dropdown menu={{ items }} placement="topLeft" arrow>
            <button
              type="button"
              className="group flex shrink-0 items-center rounded-lg transition mx-[10px]"
            >
              <span className="sr-only">Menu</span>
              <Image
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src={
                  myProfileResponse?.profile?.profileImage ??
                  "https://user-images.githubusercontent.com/522079/90506845-e8420580-e122-11ea-82ca-31087fc8486c.png"
                }
                alt=""
                width={100}
                height={100}
              />

              <p className="ms-2 hidden text-left text-xs sm:block">
                <span className="text-gray-500">{user?.email} </span>
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ms-4 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
