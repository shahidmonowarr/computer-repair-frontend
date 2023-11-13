/* eslint-disable @next/next/no-img-element */
"use client";

import { authKey } from "@/constants/common";
import { USER_ROLE } from "@/constants/role";
import { useGetMyProfileQuery } from "@/redux/features/users/userApi";
import {
  getUserInfo,
  isLoggedIn,
  removeUserInfo,
} from "@/services/auth.service";
import { IHeaderType } from "@/types";
import { AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddToCard from "../addToCart/AddToCart";
import NavbarMenu from "./NavbarMenu";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const {
    data: myProfileResponse,
    isError,
    isLoading,
    isFetching,
    error,
  } = useGetMyProfileQuery(undefined);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const NavbarData: IHeaderType[] = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "Blogs",
      link: "/blogs",
    },
  ];
  const [userLogged, setUserLogged] = useState(false);

  const userLoggedIn = isLoggedIn();

  const { role, email, profileId, userId } = getUserInfo() as any;

  const [isCardOpen, setIsCardOpen] = useState(false);
  useEffect(() => {
    if (userLoggedIn) {
      setUserLogged(true);
    } else {
      setUserLogged(false);
    }
  }, [userLoggedIn]);

  const handleLogout = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  return (
    <>
      <header className="  border-b-2   bg-blue-100/80">
        <div className="container mx-auto py-2 px-6 max-w-7xl  flex gap-3 items-center justify-center  ">
          {/* logo */}
          <Link href={"/"} className="md:w-full ">
            <img
              className="max-h-[50px] w-auto"
              src="https://i.ibb.co/qNDc0xm/logo.png"
              alt="logo"
            />
          </Link>
          {/* NavData */}
          <div className="md:flex hidden gap-3 w-full justify-between ">
            {NavbarData?.map((nav: IHeaderType, i: number) => (
              <NavbarMenu key={i} navbarData={nav} />
            ))}
          </div>

          {/* appointment */}

          <div className="flex gap-5 items-center w-full justify-end  ">
            {/* button and drawer */}
            <>
              <button
                onClick={showDrawer}
                className="block md:hidden text-[32px] border rounded-lg"
              >
                <AppstoreOutlined />
              </button>

              <Drawer
                title="Menu"
                placement="right"
                onClose={onCloseDrawer}
                visible={openDrawer}
                // ... other props
              >
                {/* Drawer content */}
                {NavbarData?.map((nav: IHeaderType, i: number) => (
                  <p key={i} className="text-[20px] my-[20px]">
                    <Link href={nav.link}>{nav.name}</Link>
                  </p>
                ))}
              </Drawer>
            </>

            <div>
              {userLogged ? (
                <div className="flex gap-5 items-center w-full justify-end">
                  <div className="hidden md:flex items-center gap-2 cursor-pointer ">
                    {role === USER_ROLE.USER && (
                      <button
                        onClick={() => setIsCardOpen(true)}
                        className="text-gray-700 flex justify-between w-full px-2 py-2 text-sm leading-5 text-left hover:bg-gray-300 hover:text-black rounded "
                        role="menuitem"
                      >
                        <ShoppingCartOutlined style={{ fontSize: "20px" }} />
                      </button>
                    )}
                  </div>
                  <div className="hidden md:flex items-center gap-2 cursor-pointer ">
                    <p>{myProfileResponse?.profile?.firstName}</p>
                  </div>
                  <div className="relative inline-block text-left">
                    <button
                      onClick={handleDropdownToggle}
                      className="text-gray-700 focus:outline-none"
                    >
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
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                        <div className="py-1">
                          <Link
                            href="/dashboard/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Profile Settings
                          </Link>
                          <Link
                            href="/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Dashboard
                          </Link>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={() => handleLogout()}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Link href={"/login"}>
                  <div className="relative inline-flex  group">
                    <p
                      title="Get quote now"
                      className="relative inline-flex items-center justify-center px-4 py-2 text-lg  text-white transition-all duration-200 bg-gray-700 font-pj rounded-xl "
                      role="button"
                    >
                      Login
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      {userLogged && <AddToCard setOpen={setIsCardOpen} open={isCardOpen} />}
    </>
  );
};

export default Header;
