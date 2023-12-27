import aboutUs from "@/assets/images/About us page-rafiki.png";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="container my-24 mx-auto md:px-6">
      <section className="mb-32">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Projects We Are Proud Of
        </h2>

        <div className="flex flex-wrap items-center">
          <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-6 lg:mb-0 lg:w-5/12">
            <div
              className="relative overflow-hidden rounded-lg bg-cover bg-[50%] bg-no-repeat shadow-lg dark:shadow-black/20"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <Image
                src={aboutUs}
                className="w-full"
                width={500}
                height={500}
                alt="about us"
              />
            </div>
          </div>

          <div className="w-full shrink-0 grow-0 basis-auto md:px-6 lg:w-7/12">
            <div className="mb-12 flex">
              <div className="shrink-0">
                <div className="rounded-md p-4 shadow-lg bg-blue-500 dark:bg-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    className="h-6 w-6 text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4 grow">
                <p className="mb-2 font-bold">Support 24/7</p>
                <p className="text-neutral-500 dark:text-neutral-300">
                  Our dedicated team is available around the clock to provide
                  immediate assistance with your computer-related issues. We
                  understand that technical problems can happen at any time, and
                  we are here to help you, day or night.
                </p>
              </div>
            </div>

            <div className="mb-12 flex">
              <div className="shrink-0">
                <div className="rounded-md p-4 shadow-lg bg-blue-500 dark:bg-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    className="h-6 w-6 text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4 grow">
                <p className="mb-2 font-bold">Robust Solutions</p>
                <p className="text-neutral-500 dark:text-neutral-300">
                  Your computers safety and stability are paramount to us. We
                  ensure your device is not only repaired but also fortified to
                  prevent future issues. Your satisfaction and the long-term
                  health of your computer are our top priorities.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="shrink-0">
                <div className="rounded-md p-4 shadow-lg bg-blue-500 dark:bg-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    className="h-6 w-6 text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4 grow">
                <p className="mb-2 font-bold">Real-Time Monitoring</p>
                <p className="text-neutral-500 dark:text-neutral-300">
                  Our services include live analytics, enabling us to monitor
                  your computers performance and security in real time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
