import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const FlightContent = () => {
    const [formData, setFormData] = useState({
        flightNumber: '',
        departureID: '',
        destinationID: '',
        journeyDate:'',
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
    const [editFlightData, setEditFlightData] = useState({});
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteFlightId, setDeleteFlightId] = useState(null);
    const [dapatureCities,setDepatureCities] = useState([]);
    const [destinationCities,setDestinationCities] = useState([]);

    useEffect(() => {
        fetchFlights();
        if (showPopup || showEditPopup) {
            fetchCities();
        }
    }, [showPopup,showEditPopup]);

    useEffect(() => {

        if(formData.departureID){
            const destinationCities = cities.filter(city => city.id !== formData.departureID);
            setDestinationCities(destinationCities);
        }

        if(formData.destinationID){
            const departureCities = cities.filter(city => city.id !== formData.destinationID);
            setDepatureCities(departureCities);
        }

    },[formData.departureID,formData.destinationID])
    

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

    const handleChangeForAdd = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("formData >>>", formData);

        if (!formData.flightNumber || !formData.departureID || !formData.destinationID || !formData.journeyDate || !formData.departureTime || !formData.arrivalTime || !formData.totalCapacity || !formData.availableSeats || !formData.classType || !formData.baseFare) {
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
                handleClosePopup();
                fetchFlights();
                setFormData({
                    flightNumber: '',
                    departureID: '',
                    destinationID: '',
                    journeyDate:'',
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

    const handleClosePopup = () => {
        setShowPopup(false);
        setFormData({
            flightNumber: '',
            departureID: '',
            destinationID: '',
            journeyDate:'',
            departureTime: '',
            arrivalTime: '',
            totalCapacity: '',
            availableSeats: '',
            classType: '',
            baseFare: '',
        });
    };

    const handleCloseEditPopup = () => {
        setShowEditPopup(false);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleEdit = (flightId) => {
        const flightToEdit = flights.find(flight => flight.id === flightId);
        setEditFlightData(flightToEdit);
        setShowEditPopup(true);
    };

    const handleChangeForEdit = (e) => {
        const { name, value } = e.target;
        setEditFlightData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateFlight = async () => {
        try {
            if (!editFlightData.flightNumber || !editFlightData.departureID || !editFlightData.destinationID || editFlightData.journeyDate || !editFlightData.departureTime || !editFlightData.arrivalTime || !editFlightData.totalCapacity || !editFlightData.availableSeats || !editFlightData.classType || !editFlightData.baseFare) {
                toast.error("All fields are required");
                return;
            }
    
            if (new Date(editFlightData.departureTime) > new Date(editFlightData.arrivalTime)) {
                toast.error("Departure time cannot be greater than arrival time");
                return;
            }
    
            if (editFlightData.departureID === editFlightData.destinationID) {
                toast.error("Departure and destination cities cannot be same");
                return;
            }
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:5050/api/flight/edit/${editFlightData.id}`,
                editFlightData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("response >>>", response);

            if(response.status === 200){
                toast.success("Flight updated successfully");
                setShowEditPopup(false);
                fetchFlights();
            }

        } catch (error) {
            toast.error("Failed to update flight");
        }
    };

    const handleDelete = (fightId) => {
        setShowDeleteConfirmation(true);
        setDeleteFlightId(fightId);
    };

    const handleConfirmDelete = async () => {
        
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://localhost:5050/api/flight/delete/${deleteFlightId}`, { headers: { Authorization: `Bearer ${token}` } });
            console.log("response >>>", response);
            if(response.status === 200){
                toast.success("Flight deleted successfully");
                setShowDeleteConfirmation(false);
                fetchFlights();
            }
        } catch (error) {
            toast.error("Failed to delete flight");
        }
    };

    

    return (
        <>
            <div className="p-4">
                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                        <div className="bg-white p-4 rounded-md shadow-lg w-96 h-96 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="flightNumber" className="block font-semibold my-2">Flight Number</label>
                                    <input type="text" id="flightNumber" name="flightNumber" value={formData.flightNumber} onChange={handleChangeForAdd} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label htmlFor="departureID" className="block font-semibold my-2">Departure City</label>
                                    <select id="departureID" name="departureID" value={formData.departureID} onChange={handleChangeForAdd} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500">
                                        <option value="">Select Departure City</option>
                                        {dapatureCities.map(city => (
                                            <option key={city.id} value={city.id}>{city.cityName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="destinationID" className="block font-semibold my-2">Destination City</label>
                                    <select id="destinationID" name="destinationID" value={formData.destinationID} onChange={handleChangeForAdd} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500">
                                        <option value="">Select Destination City</option>
                                        {destinationCities.map(city => (
                                            <option key={city.id} value={city.id}>{city.cityName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="journeyDate" className="block font-semibold my-2">journeyDate</label>
                                    <input type="date" id="journeyDate" name="journeyDate" value={formData.journeyDate} onChange={handleChangeForAdd} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label htmlFor="departureTime" className="block font-semibold my-2">Departure Time</label>
                                    <input type="datetime-local" id="departureTime" name="departureTime" value={formData.departureTime} onChange={handleChangeForAdd} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label htmlFor="arrivalTime" className="block font-semibold my-2">Arrival Time</label>
                                    <input type="datetime-local" id="arrivalTime" name="arrivalTime" value={formData.arrivalTime} onChange={handleChangeForAdd} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label htmlFor="totalCapacity" className="block font-semibold my-2">Total Capacity</label>
                                    <input type="number" id="totalCapacity" name="totalCapacity" value={formData.totalCapacity} onChange={handleChangeForAdd} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label htmlFor="availableSeats" className="block font-semibold my-2">Available Seats</label>
                                    <input type="number" id="availableSeats" name="availableSeats" value={formData.availableSeats} onChange={handleChangeForAdd} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label htmlFor="classType" className="block font-semibold my-2">Class Type</label>
                                    <select id="classType" name="classType" value={formData.classType} onChange={handleChangeForAdd} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500">
                                        <option value="">Select Class Type</option>
                                        <option value="BusinessClass">Business Class</option>
                                        <option value="Non-businessClass">Non-Business Class</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="baseFare" className="block font-semibold my-2">Base Fare</label>
                                    <input type="number" id="baseFare" name="baseFare" value={formData.baseFare} onChange={handleChangeForAdd} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                                </div>
                            </form>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-indigo-500 text-white rounded-md mt-2 px-4 py-2 focus:outline-none hover:bg-indigo-600" onClick={handleSubmit}>Add Flight</button>
                                <button type="button" onClick={handleClosePopup} className="bg-gray-300 text-gray-800 mt-2 rounded-md px-4 py-2 ml-4 focus:outline-none hover:bg-gray-400">Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='mt-4'>
                <div className='w-11/12 flex justify-between'>
                    <h2 className="text-2xl font-semibold mb-4">All Flights</h2>
                    <button onClick={togglePopup} className="bg-indigo-500 text-white rounded-md px-4 py-2 mb-2 focus:outline-none hover:bg-indigo-600">Add Flight</button>
                </div>
                <div className="overflow-x-scroll w-11/12">
                    <table className="table-auto border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">flightNumber</th>
                                <th className="px-4 py-2">departure</th>
                                <th className="px-4 py-2">destination</th>
                                <th className="px-4 py-2">journeyDate</th>
                                <th className="px-4 py-2">departureTime</th>
                                <th className="px-4 py-2">arrivalTime</th>
                                <th className="px-4 py-2">totalCapacity</th>
                                <th className="px-4 py-2">availableSeats</th>
                                <th className="px-4 py-2">classType</th>
                                <th className="px-4 py-2">baseFare</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flights?.map(flight => (
                                <tr key={flight.id}>
                                    <td className="border px-4 py-2">{flight.flightNumber}</td>
                                    <td className="border px-4 py-2">{flight.departureCity.cityName}</td>
                                    <td className="border px-4 py-2">{flight.destinationCity.cityName}</td>
                                    <td className="border px-4 py-2">{new Date(flight.journeyDate).toLocaleString()}</td>
                                    <td className="border px-4 py-2">{new Date(flight.departureTime).toLocaleString()}</td>
                                    <td className="border px-4 py-2">{new Date(flight.arrivalTime).toLocaleString()}</td>
                                    <td className="border px-4 py-2">{flight.totalCapacity}</td>
                                    <td className="border px-4 py-2">{flight.availableSeats}</td>
                                    <td className="border px-4 py-2">{flight.classType}</td>
                                    <td className="border px-4 py-2">{flight.baseFare}</td>
                                    <td className=" px-4 py-2 flex">
                                        <button className="bg-blue-500 text-white rounded-md px-4 py-2 focus:outline-none hover:bg-blue-600 mx-2 my-2" onClick={() => handleEdit(flight.id)}>Edit</button>
                                        <button className="bg-red-500 text-white rounded-md px-4 py-2 focus:outline-none hover:bg-red-600 mx-2 my-2" onClick={() => handleDelete(flight.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showEditPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-4 rounded-md shadow-lg w-96 h-96 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="flightNumber" className="block font-semibold my-2">Flight Number</label>
                                <input type="text" id="flightNumber" name="flightNumber" value={editFlightData.flightNumber} onChange={handleChangeForEdit} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                            </div>
                            <div>
                                <label htmlFor="departureID" className="block font-semibold my-2">Departure City</label>
                                <select id="departureID" name="departureID" value={editFlightData.departureID} onChange={handleChangeForEdit} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500">
                                    <option value="">Select Departure City</option>
                                    {cities.map(city => (
                                        <option key={city.id} value={city.id}>{city.cityName}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="destinationID" className="block font-semibold my-2">Destination City</label>
                                <select id="destinationID" name="destinationID" value={editFlightData.destinationID} onChange={handleChangeForEdit} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500">
                                    <option value="">Select Destination City</option>
                                    {cities.map(city => (
                                        <option key={city.id} value={city.id}>{city.cityName}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="departureTime" className="block font-semibold my-2">Departure Time</label>
                                <input type="datetime-local" id="departureTime" name="departureTime" value={editFlightData.departureTime ? editFlightData.departureTime.slice(0, -1) : ''} onChange={handleChangeForEdit} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                            </div>
                            <div>
                                <label htmlFor="arrivalTime" className="block font-semibold my-2">Arrival Time</label>
                                <input type="datetime-local" id="arrivalTime" name="arrivalTime" value={editFlightData.arrivalTime ? editFlightData.arrivalTime.slice(0, -1) : ''} onChange={handleChangeForEdit} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                            </div>
                            <div>
                                <label htmlFor="totalCapacity" className="block font-semibold my-2">Total Capacity</label>
                                <input type="number" id="totalCapacity" name="totalCapacity" value={editFlightData.totalCapacity} onChange={handleChangeForEdit} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                            </div>
                            <div>
                                <label htmlFor="availableSeats" className="block font-semibold my-2">Available Seats</label>
                                <input type="number" id="availableSeats" name="availableSeats" value={editFlightData.availableSeats} onChange={handleChangeForEdit} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                            </div>
                            <div>
                                <label htmlFor="classType" className="block font-semibold my-2">Class Type</label>
                                <select id="classType" name="classType" value={editFlightData.classType} onChange={handleChangeForEdit} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500">
                                    <option value="">Select Class Type</option>
                                    <option value="BusinessClass">Business Class</option>
                                    <option value="Non-businessClass">Non-Business Class</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="baseFare" className="block font-semibold my-2">Base Fare</label>
                                <input type="number" id="baseFare" name="baseFare" value={editFlightData.baseFare} onChange={handleChangeForEdit} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-500" />
                            </div>
                        </form>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-indigo-500 text-white rounded-md mt-2 px-4 py-2 focus:outline-none hover:bg-indigo-600" onClick={handleUpdateFlight}>Update Flight</button>
                            <button type="button" onClick={handleCloseEditPopup} className="bg-gray-300 text-gray-800 mt-2 rounded-md px-4 py-2 ml-4 focus:outline-none hover:bg-gray-400">Close</button>
                        </div>
                    </div>
                </div>
            )}
         
            {showDeleteConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this flight?</p>
                        <div className="flex justify-end">
                            <button className="bg-red-500 text-white rounded-md px-4 py-2 focus:outline-none hover:bg-red-600" onClick={handleConfirmDelete}>Delete</button>
                            <button className="bg-gray-300 text-gray-800 rounded-md px-4 py-2 ml-4 focus:outline-none hover:bg-gray-400" onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </>

    );
};

export default FlightContent;
