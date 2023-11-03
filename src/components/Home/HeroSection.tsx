/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import heroImage from "../../assets/images/dashboard.png";

const HeroSection = () => {
  return (
    <section className="dark:bg-gray-800 bg-blue-100/80 dark:text-gray-100">
      <div className="container max-w-7xl flex flex-col justify-center py-6 mx-auto sm:py-12 lg:py-14 lg:flex-row lg:justify-between">
        <div className="flex items-center justify-center">
          <Image
            className="object-cover w-full h-full"
            src={heroImage}
            alt="hero"
            width={500}
            height={500}
          />
        </div>
        <div className="flex flex-col justify-center text-center rounded-sm lg:max-w-lg xl:max-w-xl lg:text-left">
          <h1 className="text-7xl pb-4 font-roboto font-extrabold sm:text-3xl md:text-5xl lg:text-5xl">
            PULSE PC <br />
            <span className="dark:skyblue text-blue-500">A COMPLETE</span>{" "}
            SOLUTION FOR YOUR <br /> COMPUTER
          </h1>
          <p className="mt-3 mb-4 px-1 sm:mb-5 text-sm">
            So IF you are looking for a PC SOLUTION THEN {""}
            <br className="hidden md:inline lg:hidden" />
            WELCOME
          </p>
          <div className="flex flex-col px-1 space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-8 py-3 text-lg font-semibold rounded dark:bg-blue-500 dark:text-gray-900 bg-blue-400 hover:bg-blue-600 hover:text-gray-100 dark:hover:bg-blue-600 dark:hover:text-gray-100"
            >
              Interested
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-100 hover:bg-black hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900"
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
