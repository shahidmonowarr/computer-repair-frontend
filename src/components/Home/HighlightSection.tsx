/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import support from "../../assets/images/Consulting.jpg";
import dataRecovery from "../../assets/images/dataRecovery.jpg";
import repair from "../../assets/images/peripheralImage.jpg";

const HighlightSection = () => {
  const BannerData = [
    {
      title: "Data Recovery",
      description: "Recovering data from damaged or corrupted storage devices",
      image: dataRecovery,
    },
    {
      title: "Peripheral Setup and Repair",
      description: "Repairing or replacing damaged peripheral devices.",
      image: repair,
    },
    {
      title: "IT Consultation and Support",
      description: "Providing advice and recommendations for IT solutions",
      image: support,
    },
  ];

  return (
    <section className="py-[50px] font-inter ">
      <h2 className="mb-12 text-center text-3xl font-bold">
        What We Offer You
      </h2>
      <div className="  max-w-7xl grid gap-6 lg:grid-cols-3">
        {BannerData.map((data, i) => (
          <div
            className="zoom relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20 bg-[50%] "
            key={i}
          >
            <Image
              src={data.image}
              alt="Picture of the author"
              className="w-full align-middle transition duration-300 ease-linear"
              width={200}
              height={200}
            />

            <a href="#!">
              <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed bg-[hsla(0,0%,0%,0.3)]">
                <div className="flex h-full items-end justify-start">
                  <h5 className="m-6 text-lg font-bold text-white">
                    {data.title}
                  </h5>
                </div>
              </div>
              <div>
                <div className="mask absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,99.2%,0.15)]"></div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HighlightSection;
