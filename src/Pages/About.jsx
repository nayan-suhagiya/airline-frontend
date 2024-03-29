import React from "react";
import air1 from "../assets/ab1.jpeg";
import air2 from "../assets/ab2.jpeg";
import air3 from "../assets/ab3.jpeg";

const About = () => {
  return (
    <>
      <div className="bg-gray-100 px-8">
        {/* About Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 pr-8">
                <h2 className="text-4xl font-bold mb-6">About Our Airline</h2>
                <p className="text-gray-700">
                  Welcome to XYZ Airlines, your preferred choice for seamless
                  and enjoyable air travel experiences. With a commitment to
                  safety, comfort, and convenience, we strive to provide
                  top-notch services for our passengers.Welcome to XYZ Airlines,
                  your preferred choice for seamless and enjoyable air travel
                  experiences. With a commitment to safety, comfort, and
                  convenience, we strive to provide top-notch services for our
                  passengers.
                </p>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0">
                <img
                  src={air1}
                  alt="Airplane"
                  className="w-auto h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mt-8 md:mt-0">
                <img
                  src={air2}
                  alt="Our Team"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2 pl-8">
                <h2 className="text-4xl font-bold mb-6">Meet Our Team</h2>
                <p className="text-gray-700">
                Welcome to XYZ Airlines, your preferred choice for seamless and enjoyable air travel experiences. With a commitment to safety, comfort, and convenience, we strive to provide top-notch services for our passengers.Welcome to XYZ Airlines, your preferred choice for seamless and enjoyable air travel experiences. With a commitment to safety, comfort, and convenience, we strive to provide top-notch services for our passengers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 pr-8">
                <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-700">
                Welcome to XYZ Airlines, your preferred choice for seamless and enjoyable air travel experiences. With a commitment to safety, comfort, and convenience, we strive to provide top-notch services for our passengers.Welcome to XYZ Airlines, your preferred choice for seamless and enjoyable air travel experiences. With a commitment to safety, comfort, and convenience, we strive to provide top-notch services for our passengers.
                </p>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0">
                <img
                  src={air3}
                  alt="Our Mission"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;