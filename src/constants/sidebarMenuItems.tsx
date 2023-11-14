import {
  AlignLeftOutlined,
  AppstoreOutlined,
  BookOutlined,
  DiffOutlined,
  FileAddOutlined,
  FolderAddOutlined,
  FolderOutlined,
  OrderedListOutlined,
  PlusCircleOutlined,
  PlusSquareOutlined,
  SecurityScanOutlined,
  TableOutlined,
  UserAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <UserOutlined />,
      children: [
        {
          label: <Link href={`/dashboard/profile`}>My Profile</Link>,
          icon: <UserOutlined />,
          key: `/${role}/profile`,
        },
      ],
    },
  ];

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/dashboard/my-booking-lists`}>My Booking List</Link>,
      icon: <BookOutlined />,
      key: `/${role}/booking-list`,
    },
    {
      label: <Link href={`/dashboard/my-reviews`}>My Reviews</Link>,
      icon: <PlusSquareOutlined />,
      key: `/${role}/reviews`,
    },
    {
      label: <Link href={`/dashboard/make-booking`}>Make Booking</Link>,
      icon: <PlusSquareOutlined />,
      key: `/${role}/bookings`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "User management",
      key: "user-management",
      icon: <UserSwitchOutlined />,
      children: [
        {
          label: <Link href={`/dashboard/add-user`}>Add user</Link>,
          key: `/add-user`,
          icon: <UserAddOutlined />,
        },
        {
          label: <Link href={`/dashboard/user-lists`}>User List</Link>,
          key: `/user-list`,
          icon: <UsergroupAddOutlined />,
        },
      ],
    },
    {
      label: "service management",
      key: "service-management",
      icon: <FolderOutlined />,
      children: [
        {
          label: <Link href={`/dashboard/add-service`}>Add Service</Link>,
          key: `/add-service`,
          icon: <FolderAddOutlined />,
        },
        {
          label: <Link href={`/dashboard/service-lists`}>Service List</Link>,
          key: `/service-list`,
          icon: <OrderedListOutlined />,
        },
      ],
    },
    {
      label: "booking management",
      key: "booking-management",
      icon: <BookOutlined />,
      children: [
        {
          label: <Link href={`/dashboard/add-slot`}>Add Slot</Link>,
          key: `/add-slot`,
          icon: <BookOutlined />,
        },
        {
          label: <Link href={`/dashboard/booking-lists`}>Booking List</Link>,
          key: `/booking-list`,
          icon: <OrderedListOutlined />,
        },
      ],
    },
    {
      label: <Link href={`/dashboard/feedback-lists`}>Feedbacks</Link>,
      key: "feedback-list",
      icon: <DiffOutlined />,
    },
    {
      label: "Content Management",
      key: "content-management",
      icon: <SecurityScanOutlined />,
      children: [
        {
          label: <Link href={`/dashboard/add-blog`}>Add Blog</Link>,
          key: `/add-blog`,
          icon: <FileAddOutlined />,
        },
        {
          label: <Link href={`/dashboard/blog-lists`}>Blog List</Link>,
          key: `/blog-list`,
          icon: <OrderedListOutlined />,
        },
        {
          label: <Link href={`/dashboard/add-faq`}>Add FAQ</Link>,
          key: `/add-faq`,
          icon: <BookOutlined />,
        },
        {
          label: <Link href={`/dashboard/faq-lists`}>FAQ List</Link>,
          key: `/faq-list`,
          icon: <AlignLeftOutlined />,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...adminSidebarItems,
    {
      label: "Admin-Management",
      key: "admin-management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/dashboard/add-admin`}>add Admin</Link>,
          icon: <PlusCircleOutlined />,
          key: `/add-admin`,
        },
        {
          label: <Link href={`/dashboard/admin-lists`}>Admin List </Link>,
          icon: <TableOutlined />,
          key: `/admin-list`,
        },
      ],
    },
  ];

  const technicianSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: (
        <Link href={`/dashboard/technician-booking-lists`}>Booking Lists</Link>
      ),
      icon: <TableOutlined />,
      key: `/booking-list`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.TECHNICIAN) return technicianSidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
