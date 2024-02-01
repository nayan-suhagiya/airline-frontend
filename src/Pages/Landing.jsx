import React from "react";
import Air1 from "../assets/air1.jpg";
import Air2 from "../assets/air2.jpg";
import Air4 from "../assets/air4.jpg";
import Air5 from "../assets/air5.jpg";
import Air6 from "../assets/air6.jpg";
import Air7 from "../assets/air7.jpg";

const Landing = () => {
  return (
    <>
      <div className="relative overflow-hidden bg-white">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl animate__animated animate__fadeInDownBig">
                Welcome to AirLine
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Explore seamless skies with our user-friendly airline website.
                Discover effortless booking, real-time flight updates, and
                exclusive deals. Elevate your travel experience with our
                intuitive interface, making your journey from booking to
                boarding a breeze. Fly with confidence, fly with our Airline
                Name
              </p>
            </div>
            <div className="mt-4">
              <div>
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="hidden sm:block pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src={Air1}
                            alt="air1"
                            className="h-full w-full object-cover object-center animate__animated animate__fadeInTopLeft"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={Air2}
                            alt="air2"
                            className="h-full w-full object-cover object-center animate__animated animate__fadeInBottomLeft"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={Air4}
                            alt="air4"
                            className="h-full w-full object-cover object-center animate__animated animate__fadeInDownBig"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={Air5}
                            alt="air5"
                            className="h-full w-full object-cover object-center animate__animated animate__fadeInUpBig"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={Air6}
                            alt="air6"
                            className="h-full w-full object-cover object-center animate__animated animate__fadeInTopRight"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={Air7}
                            alt="air7"
                            className="h-full w-full object-cover object-center animate__animated animate__fadeInBottomRight"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="inline-block rounded-md border border-transparent bg-green-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700">
                  Fly in the sky with us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
