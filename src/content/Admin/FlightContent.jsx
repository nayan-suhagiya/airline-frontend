import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const FlightContent = () => {
    const [formData, setFormData] = useState({
        flightNumber: '',
        departureID: '',
        destinationID: '',
        departureTime: '',
        arrivalTime: '',
        totalCapacity: '',
        availableSeats: '',
        classType: '',
        baseFare: '',
    });
    const [cities, setCities] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        fetchFlights();
        if (showPopup) {
            fetchCities();
        }
    }, [showPopup]);

    const fetchCities = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5050/api/city/get",
                { headers: { Authorization: `Bearer ${token}` } });
            const { data } = response;
            console.log("Cities data:", data);
            if (data.status === 200) {
                setCities(data.data);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const fetchFlights = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5050/api/flight/get-all",
                { headers: { Authorization: `Bearer ${token}` } });
            const { data } = response;
            console.log("Flights data:", data);
            if (data.status === 200) {
                setFlights(data.data);
            }
        } catch (error) {
            console.error("Error fetching flights:", error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("formData >>>", formData);

        if (!formData.flightNumber || !formData.departureID || !formData.destinationID || !formData.departureTime || !formData.arrivalTime || !formData.totalCapacity || !formData.availableSeats || !formData.classType || !formData.baseFare) {
            toast.error("All fields are required");
            return;
        }

        if (new Date(formData.departureTime) > new Date(formData.arrivalTime)) {
            toast.error("Departure time cannot be greater than arrival time");
            return;
        }

        if (formData.departureID === formData.destinationID) {
            toast.error("Departure and destination cities cannot be same");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:5050/api/flight/add", formData,
                { headers: { Authorization: `Bearer ${token}` } })

            if (response.data.status === 200) {
                toast.success(response.data.msg);
                handleClose();
                fetchFlights();
                setFormData({
                    flightNumber: '',
                    departureID: '',
                    destinationID: '',
                    departureTime: '',
                    arrivalTime: '',
                    totalCapacity: '',
                    availableSeats: '',
                    classType: '',
                    baseFare: '',
                });
            }
        }
        catch (error) {
            console.error("Error adding flight:", error);
        }
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleClose = () => {
        setShowPopup(false);
    };

    return (
        <>
            <div className="p-4">
                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                        <div className="bg-white p-4 rounded-md shadow-lg w-96">
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="flightNumber" className="block font-semibold my-2">Flight Number</label>
                                    <input type="text" id="flightNumber" name="flightNumber" value={formData.flightNumber} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label htmlFor="departureID" className="block font-semibold my-2">Departure City</label>
                                    <select id="departureID" name="departureID" value={formData.departureID} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500">
                                        <option value="">Select Departure City</option>
                                        {cities.map(city => (
                                            <option key={city.id} value={city.id}>{city.cityName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="destinationID" className="block font-semibold my-2">Destination City</label>
                                    <select id="destinationID" name="destinationID" value={formData.destinationID} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500">
                                        <option value="">Select Destination City</option>
                                        {cities.map(city => (
                                            <option key={city.id} value={city.id}>{city.cityName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="departureTime" className="block font-semibold my-2">Departure Time</label>
                                    <input type="datetime-local" id="departureTime" name="departureTime" value={formData.departureTime} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label htmlFor="arrivalTime" className="block font-semibold my-2">Arrival Time</label>
                                    <input type="datetime-local" id="arrivalTime" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label htmlFor="totalCapacity" className="block font-semibold my-2">Total Capacity</label>
                                    <input type="number" id="totalCapacity" name="totalCapacity" value={formData.totalCapacity} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label htmlFor="availableSeats" className="block font-semibold my-2">Available Seats</label>
                                    <input type="number" id="availableSeats" name="availableSeats" value={formData.availableSeats} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label htmlFor="classType" className="block font-semibold my-2">Class Type</label>
                                    <select id="classType" name="classType" value={formData.classType} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500">
                                        <option value="">Select Class Type</option>
                                        <option value="BusinessClass">Business Class</option>
                                        <option value="Non-businessClass">Non-Business Class</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="baseFare" className="block font-semibold my-2">Base Fare</label>
                                    <input type="number" id="baseFare" name="baseFare" value={formData.baseFare} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                                </div>
                            </form>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-indigo-500 text-white rounded-md mt-2 px-4 py-2 focus:outline-none hover:bg-indigo-600" onClick={handleSubmit}>Add Flight</button>
                                <button type="button" onClick={handleClose} className="bg-gray-300 text-gray-800 mt-2 rounded-md px-4 py-2 ml-4 focus:outline-none hover:bg-gray-400">Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='mt-4'>
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-semibold mb-4">All Flights</h2>
                    <button onClick={togglePopup} className="bg-indigo-500 text-white rounded-md px-4 py-2 mb-2 focus:outline-none hover:bg-indigo-600">Add Flight</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">flightNumber</th>
                                <th className="px-4 py-2">departure</th>
                                <th className="px-4 py-2">destination</th>
                                <th className="px-4 py-2">departureTime</th>
                                <th className="px-4 py-2">arrivalTime</th>
                                <th className="px-4 py-2">totalCapacity</th>
                                <th className="px-4 py-2">availableSeats</th>
                                <th className="px-4 py-2">classType</th>
                                <th className="px-4 py-2">baseFare</th>
                                <th className="px-4 py-2">createdAt</th>
                                <th className="px-4 py-2">updatedAt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flights?.map(flight => (
                                <tr key={flight.id}>
                                    <td className="border px-4 py-2">{flight.flightNumber}</td>
                                    <td className="border px-4 py-2">{flight.departureID}</td>
                                    <td className="border px-4 py-2">{flight.destinationID}</td>
                                    <td className="border px-4 py-2">{new Date(flight.departureTime).toLocaleString()}</td>
                                    <td className="border px-4 py-2">{new Date(flight.arrivalTime).toLocaleString()}</td>
                                    <td className="border px-4 py-2">{flight.totalCapacity}</td>
                                    <td className="border px-4 py-2">{flight.availableSeats}</td>
                                    <td className="border px-4 py-2">{flight.classType}</td>
                                    <td className="border px-4 py-2">{flight.baseFare}</td>
                                    <td className="border px-4 py-2">{new Date(flight.createdAt).toLocaleString()}</td>
                                    <td className="border px-4 py-2">{new Date(flight.updatedAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </>

    );
};

export default FlightContent;
