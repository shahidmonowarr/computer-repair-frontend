/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import heroImage from "../../assets/images/dashboard.png";

const HeroSection = () => {
  return (
    <section className="bg-blue-100/80">
      <div className="sm:pt-1 lg:pt-1 pt-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
              <span className="block xl:inline pe-2">Pulse PC is a{""}</span>
              <span className="block text-blue-600 xl:inline">
                Solution for PC
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              So IF you are looking for a PC solution then welcome to PULSE PC
              and we will provide you the best solution for your PC.
            </p>
            <div className="flex flex-col mt-3 space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold rounded   bg-blue-400 hover:bg-blue-600 hover:text-gray-100 dark:hover:bg-blue-600 dark:hover:text-gray-100"
              >
                Interested
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold border rounded  hover:bg-black hover:text-white  "
              >
                Explore
              </a>
            </div>
          </div>

          <div className="lg:inset-y-0 lg:right-0 lg:w-1/2">
            <Image
              width={700}
              height={700}
              className="h-full w-full object-cover sm:h-full md:h-full lg:w-full lg:h-full"
              src={heroImage}
              alt="hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
