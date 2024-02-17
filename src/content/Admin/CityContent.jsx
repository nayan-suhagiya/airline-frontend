import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const CityContent = () => {
    const [cityName, setCityName] = useState('');
    const [editCityName, setEditCityName] = useState('');
    const [cities, setCities] = useState([]);
    const [editCityId, setEditCityId] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteCityId, setDeleteCityId] = useState(null);

    const handleInputChangeForAdd = (e) => {
        setCityName(e.target.value);
    };

    const handleInputChangeForEdit = (e) => {
        setEditCityName(e.target.value);
    };

    const handleEdit = (cityId) => {
        setEditCityId(cityId);
        setShowEditPopup(true);
    };

    const handleDelete = (cityId) => {
        setShowDeleteConfirmation(true);
        setDeleteCityId(cityId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cityName) {
            toast.error("Please enter a valid city name");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:5050/api/city/add",
                { cityName },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { data } = response;
            if (data.status === 200) {
                toast.success(data.msg);
                setCityName("");
                getAllCities();
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };

    const handleUpdate = async () => {
        if (!editCityName) {
            toast.error("Please enter a valid city name");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:5050/api/city/edit/${editCityId}`,
                { cityName: editCityName },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { data } = response;
            if (data.status === 200) {
                toast.success(data.msg);
                setEditCityName("");
                setEditCityId(null);
                setShowEditPopup(false);
                getAllCities();
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(
                `http://localhost:5050/api/city/delete/${deleteCityId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { data } = response;
            if (data.status === 200) {
                toast.success(data.msg);
                setShowDeleteConfirmation(false);
                getAllCities();
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };

    useEffect(() => {
        getAllCities();
    }, []);

    const getAllCities = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://localhost:5050/api/city/get",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { data } = response;
            if (data.status === 200) {
                setCities(data.data);
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };

    return (
        <>
            <div className="container mx-auto mt-10">
                <h2 className="text-2xl font-semibold mb-4">Add City</h2>
                <form>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={cityName}
                            onChange={handleInputChangeForAdd}
                            placeholder="Enter city name"
                            className="border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-indigo-500"
                        />
                        <button
                            className="bg-indigo-500 text-white rounded-md px-4 py-2 focus:outline-none hover:bg-indigo-600"
                            onClick={handleSubmit}
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
            <div className='mt-8'>
                <h2 className="text-2xl font-semibold mb-4">All Cities</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">City Name</th>
                                <th className="px-4 py-2">Created At</th>
                                <th className="px-4 py-2">Updated At</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cities.map(city => (
                                <tr key={city.id}>
                                    <td className="border px-4 py-2">{city.cityName}</td>
                                    <td className="border px-4 py-2">{new Date(city.createdAt).toLocaleString()}</td>
                                    <td className="border px-4 py-2">{new Date(city.updatedAt).toLocaleString()}</td>
                                    <td className="border px-4 py-2">
                                        <button className="bg-blue-500 text-white rounded-md px-4 py-2 focus:outline-none hover:bg-blue-600 mx-2" onClick={() => handleEdit(city.id)}>Edit</button>
                                        <button className="bg-red-500 text-white rounded-md px-4 py-2 focus:outline-none hover:bg-red-600 mx-2" onClick={() => handleDelete(city.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showEditPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Edit City</h2>
                        <input
                            type="text"
                            value={editCityName}
                            onChange={handleInputChangeForEdit}
                            placeholder="Enter Update city name"
                            className="border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-indigo-500"
                        />
                        <div className="flex justify-end">
                            <button className="bg-indigo-500 text-white rounded-md px-4 py-2 focus:outline-none hover:bg-indigo-600" onClick={handleUpdate}>Update</button>
                            <button className="bg-gray-300 text-gray-800 rounded-md px-4 py-2 ml-4 focus:outline-none hover:bg-gray-400" onClick={() => setShowEditPopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {showDeleteConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this city?</p>
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

export default CityContent;
