import React from "react";
import Air1 from "../assets/air1.jpg";
import Air2 from "../assets/air2.jpg";
import Air3 from "../assets/air3.jpg";
import Air4 from "../assets/air4.jpg";
import Air5 from "../assets/air5.jpg";
import Air6 from "../assets/air6.jpg";
import Air7 from "../assets/air7.jpg";

const Landing = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to AirLine
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Explore seamless skies with our user-friendly airline website. Discover effortless booking, real-time flight updates, and exclusive deals. Elevate your travel experience with our intuitive interface, making your journey from booking to boarding a breeze. Fly with confidence, fly with our Airline Name
        </p>
        <div className="mt-8">
          <a
            href="#"
            className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
          >
            Fly in the sky with us
          </a>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mt-12">
        <div className="h-80 overflow-hidden rounded-lg">
          <img
            src={Air1}
            alt="air1"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="h-80 overflow-hidden rounded-lg">
          <img
            src={Air2}
            alt="air2"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="h-80 overflow-hidden rounded-lg">
          <img
            src={Air3}
            alt="air3"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="h-80 overflow-hidden rounded-lg">
          <img
            src={Air4}
            alt="air4"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="h-80 overflow-hidden rounded-lg">
          <img
            src={Air5}
            alt="air5"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="h-80 overflow-hidden rounded-lg">
          <img
            src={Air6}
            alt="air6"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
