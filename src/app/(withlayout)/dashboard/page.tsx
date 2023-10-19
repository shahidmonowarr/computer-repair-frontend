import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DashboardHomePhoto from "../../../assets/images/dashboard.png";

export const metadata: Metadata = {
  title: "Dashboard - PulsePC",
};

const DashboardHome = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Image
          src={DashboardHomePhoto}
          alt="dashboard home photo"
          width={500}
          height={500}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href="/dashboard/profile">
          <button
            className="
          display: inline-block
          justify-center
        items-center
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        rounded
        "
          >
            Visit Your Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
