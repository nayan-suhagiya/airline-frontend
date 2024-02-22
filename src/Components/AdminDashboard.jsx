// AdminDashboard.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContentArea from "./ContentArea";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState('profile');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-x-hidden">
      {/* Sidebar */}
      <nav
        className={`bg-gray-800 w-52 px-8 py-4 fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between">
          {/* Close button for small screens */}
          <button className="md:hidden" onClick={toggleSidebar}>
            {/* SVG icon */}
          </button>
        </div>

        {/* Sidebar navigation links */}
        <div className="mt-4">
          <Link
            to="/dashboard/admin/profile"
            className={`block text-white py-2 px-4 my-4 rounded-md hover:bg-gray-700 ${selectedLink === 'profile' ? 'bg-gray-700' : ''}`}
            onClick={() => setSelectedLink('profile')}
          >
            Profile
          </Link>
          <Link
            to="/dashboard/admin/flight"
            className={`block text-white py-2 px-4 my-4 rounded-md hover:bg-gray-700 ${selectedLink === 'flight' ? 'bg-gray-700' : ''}`}
            onClick={() => setSelectedLink('flight')}
          >
            Flights
          </Link>
          <Link
            to="/dashboard/admin/booking"
            className={`block text-white py-2 px-4 my-4 rounded-md hover:bg-gray-700 ${selectedLink === 'booking' ? 'bg-gray-700' : ''}`}
            onClick={() => setSelectedLink('booking')}
          >
            Bookings
          </Link>
          <Link
            to="/dashboard/admin/user"
            className={`block text-white py-2 px-4 my-4 rounded-md hover:bg-gray-700 ${selectedLink === 'user' ? 'bg-gray-700' : ''}`}
            onClick={() => setSelectedLink('user')}
          >
            Users
          </Link>
          <Link
            to="/dashboard/admin/city"
            className={`block text-white py-2 px-4 my-4 rounded-md hover:bg-gray-700 ${selectedLink === 'city' ? 'bg-gray-700' : ''}`}
            onClick={() => setSelectedLink('city')}
          >
            Cities
          </Link>
        </div>
      </nav>

      {/* Button to toggle sidebar visibility on smaller screens */}
      <div className="fixed md:hidden top-4 right-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 focus:outline-none"
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 6L6 18M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {/* Content area */}
      <ContentArea isOpen={isOpen} selectedLink={selectedLink} />
    </div>
  );
};

export default AdminDashboard;
