import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Blogs",
  description: 'Blogs page',
}

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default BlogLayout;
