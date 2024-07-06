"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default HomeLayout;
