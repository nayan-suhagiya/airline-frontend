import React, { useState } from "react";
import CitySelector from "../Components/CitySelector"; // Assuming CitySelector is the name of your component

const Landing = () => {
  const [journeyDate, setjourneyDate] = useState();
  const [returnDate, setRetrunDate] = useState();
  const selectDate = (e) => {
    setjourneyDate(e.target.value);
  }
  const selectReturnDate = (e) => {
    setRetrunDate(e.target.value);
  }
  return (
    <>
      <div className="container mx-auto px-8 my-8">
        <div className="flex justify-between">
          <div className="flex">
            <div className="flex justify-center items-center text-center">
              <input type="radio" id="one-way" name="flight-type" className="form-radio text-indigo-600 h-5 w-5 mx-2" />
              <label className="mx-2" htmlFor="one-way">One Way</label>
            </div>
            <div className="flex justify-center items-center text-center">
              <input type="radio" id="round-trip" name="flight-type" className="form-radio text-indigo-600 h-5 w-5 mx-2" />
              <label className="mx-2" htmlFor="round-trip">Round trip</label>
            </div>
          </div>
          <div>
            <p className="text-gray-700">Book International and Domestic Flights</p>
          </div>
        </div>
        <div className="flex justify-between m-4">
          <div className="mt-2">
            <p className="text-gray-600 text-xl">From</p>
            <CitySelector />
          </div>
          <div>
            <p className="text-gray-600 text-xl">To</p>
            <CitySelector />
          </div>
          <div>
            <p className="text-gray-600 text-xl">Depature</p>
            <input type="date" id="departureTime" name="departureTime" value={journeyDate} onChange={selectDate} className="border border-gray-300 rounded-md mt-2 px-8 py-2 w-full focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <p className="text-gray-600 text-xl">Depature</p>
            <input type="date" id="departureTime" name="departureTime" value={returnDate} onChange={selectReturnDate} className="border border-gray-300 rounded-md mt-2 px-8 py-2 w-full focus:outline-none focus:border-indigo-500" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
