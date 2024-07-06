"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

const ServiceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default ServiceLayout;
