/* eslint-disable @next/next/no-img-element */
"use client";

import { authKey } from "@/constants/common";
import {
  getUserInfo,
  isLoggedIn,
  removeUserInfo,
} from "@/services/auth.service";
import { IHeaderType } from "@/types";
import { AppstoreOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarMenu from "./NavbarMenu";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

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
      <header className=" border-b-2 borderColor bg-blue-100/80">
        <div className="container py-2 px-6 mx-auto  flex gap-3 items-center justify-between ">
          {/* logo */}
          <Link href={"/"} className="md:w-full ">
            <h1 className="text-2xl font-extrabold -webkit-text-stroke-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
              PULSEpc
            </h1>
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
            {/* user */}{" "}
            <div>
              {userLogged ? (
                <div className="flex gap-5 items-center w-full justify-end">
                  <div className="hidden md:flex items-center gap-2 cursor-pointer ">
                    <p>{role}</p>
                  </div>
                  <div className="relative inline-block text-left">
                    <button
                      onClick={handleDropdownToggle}
                      className="text-gray-700 focus:outline-none"
                    >
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src="https://user-images.githubusercontent.com/522079/90506845-e8420580-e122-11ea-82ca-31087fc8486c.png"
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
    </>
  );
};

export default Header;
