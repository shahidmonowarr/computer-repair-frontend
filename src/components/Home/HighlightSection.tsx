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
    <section className="   py-[50px] text-white font-inter ">
      <h2 className="text-2xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl text-center">
        Highlighted Services
      </h2>
      <div className="  max-w-7xl  mx-auto flex flex-col md:flex-row md:gap-3 gap-10  justify-between">
        {BannerData.map((data, i) => (
          <div
            className="items-center gap-4 p-4 bg-blue-400 rounded-md "
            key={i}
          >
            <Image
              src={data.image}
              alt="Picture of the author"
              width={200}
              height={200}
              className="bg-white rounded items-center"
            />

            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-[20px]">{data.title}</h3>
              <p>{data.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HighlightSection;
