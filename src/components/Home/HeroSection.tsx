/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import heroImage from "../../assets/images/dashboard.png";

const HeroSection = () => {
  return (
    <section className="dark:bg-gray-800 dark:text-gray-100 container">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-14 lg:flex-row lg:justify-between">
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <Image
            className="object-cover w-full h-full rounded-md shadow-2xl"
            src={heroImage}
            alt="hero"
            width={500}
            height={500}
          />
        </div>
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-3xl font-bold sm:text-3xl">
            PULSE PC <br />
            <span className="dark:skyblue text-cyan-500">A COMPLETE</span>{" "}
            SOLUTION FOR YOUR PC
          </h1>
          <p className="mt-3 mb-3 px-1 sm:mb-5 text-sm">
            So IF you are looking for a PC SOLUTION THEN
            <br className="hidden md:inline lg:hidden" />
            WELCOME TO PULSE PC
          </p>
          <div className="flex flex-col px-1 space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-8 py-3 text-lg font-semibold rounded dark:bg-cyan-400 dark:text-gray-900 bg-cyan-400 hover:bg-cyan-600 hover:text-gray-100 dark:hover:bg-cyan-600 dark:hover:text-gray-100"
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
