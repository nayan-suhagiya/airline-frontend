import React, { useState, useEffect } from "react";
import axios from "axios";

const Booking = () => {

    const getTodayDateString = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }
    const getTomorrowDateString = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    }

    const [tripType, setTripType] = useState("one-way");
    const [journeyDate, setJourneyDate] = useState(getTodayDateString());
    const [returnDate, setReturnDate] = useState(getTomorrowDateString());
    const [cities, setCities] = useState([]);
    const [dapatureCities, setDepatureCities] = useState([]);
    const [destinationCities, setDestinationCities] = useState([]);
    const [departureID, setDepartureID] = useState("");
    const [destinationID, setDestinationID] = useState("");
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        console.log("tripType", tripType);
        if (tripType === "one-way") {
            setReturnDate("");
        } else {
            setReturnDate(returnDate || getTomorrowDateString());
        }
    }, [tripType]);

    useEffect(() => {

        if (departureID) {
            const destinationCities = cities.filter(city => city.id !== departureID);
            setDestinationCities(destinationCities);
        }

        if (destinationID) {
            const departureCities = cities.filter(city => city.id !== destinationID);
            setDepatureCities(departureCities);
        }

    }, [departureID, destinationID])

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5050/api/city/get",
                { headers: { Authorization: `Bearer ${token}` } });
            const { data } = response;
            console.log("Cities data:", data);
            if (data.status === 200) {
                setCities(data.data);
                setDepatureCities(data.data);
                setDestinationCities(data.data);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const handleFrom = (e) => {
        setDepartureID(e.target.value);
    }

    const handleTo = (e) => {
        setDestinationID(e.target.value);
    }


    const handleTripTypeChange = (e) => {
        const newTripType = e.target.value;
        setTripType(newTripType);
    };

    const handleJourneyDateChange = (e) => {
        setJourneyDate(e.target.value);
    };

    const handleReturnDateChange = (e) => {
        setReturnDate(e.target.value);
        setTripType("round-trip");
    };

    const searchFlights = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:5050/api/flight/get-all?departureId=${departureID}&destinationId=${destinationID}&journeyDate=${journeyDate}&returnDate=${returnDate}`,
                { headers: { Authorization: `Bearer ${token}` } });
            const { data } = response;
            console.log("Flights data:", data);

            if (data.status === 200) {
                setFlights(data.data);
                console.log("flights", flights);

            }

        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };



    return (
        <>
            <div className="container mx-auto pb-8 px-8 my-8">
                <div className="flex justify-between mt-8">
                    <div className="flex">
                        <div className="flex justify-center items-center text-center">
                            <input
                                type="radio"
                                id="one-way"
                                name="flight-type"
                                value="one-way"
                                checked={tripType === "one-way"}
                                onChange={handleTripTypeChange}
                                className="form-radio text-indigo-600 h-5 w-5 mx-2"
                            />
                            <label className="mx-2" htmlFor="one-way">
                                One Way
                            </label>
                        </div>
                        <div className="flex justify-center items-center text-center">
                            <input
                                type="radio"
                                id="round-trip"
                                name="flight-type"
                                value="round-trip"
                                checked={tripType === "round-trip"}
                                onChange={handleTripTypeChange}
                                className="form-radio text-indigo-600 h-5 w-5 mx-2"
                            />
                            <label className="mx-2" htmlFor="round-trip">
                                Round trip
                            </label>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-700">Book International and Domestic Flights</p>
                    </div>
                </div>
                <div className="flex justify-between mt-8">
                    <div className="mt-2">
                        <p className="text-gray-600 text-xl mb-4">From</p>
                        <select id="departureID" name="departureID" value={departureID} onChange={handleFrom} className="border border-gray-300 rounded-md px-4 py-2 ml-4 w-full focus:outline-none focus:border-indigo-500">
                            <option value="">Select Departure City</option>
                            {dapatureCities.map(city => (
                                <option key={city.id} value={city.id}>{city.cityName}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p className="text-gray-600 text-xl mb-4">To</p>
                        <select id="departureID" name="departureID" value={destinationID} onChange={handleTo} className="border border-gray-300 rounded-md px-4 py-2 ml-4 w-full focus:outline-none focus:border-indigo-500">
                            <option value="">Select Departure City</option>
                            {destinationCities.map(city => (
                                <option key={city.id} value={city.id}>{city.cityName}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p className="text-gray-600 text-xl">Departure</p>
                        <input
                            type="date"
                            id="departureTime"
                            name="departureTime"
                            value={journeyDate}
                            onChange={handleJourneyDateChange}
                            className="border border-gray-300 rounded-md mt-2 px-8 py-2 w-full focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <p className="text-gray-600 text-xl">Return</p>
                        <input
                            type="date"
                            id="returnTime"
                            name="returnTime"
                            value={returnDate}
                            onChange={handleReturnDateChange}
                            className="border border-gray-300 rounded-md mt-2 px-8 py-2 w-full focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md" onClick={searchFlights}>Search</button>
                </div>
            </div>
            { }
        </>
    );
};

export default Booking;
