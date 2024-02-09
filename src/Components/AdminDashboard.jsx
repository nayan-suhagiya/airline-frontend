// Sidebar.js

import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <nav
        className={`bg-gray-800 w-64 px-8 py-4 fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between">
          <div className="text-white text-2xl font-semibold">Logo</div>
          {/* Close button for small screens */}
          <button className="md:hidden" onClick={toggleSidebar}>
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Sidebar navigation links */}
        <div className="mt-4">
          <Link
            to="/dashboard"
            className="block text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="block text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Profile
          </Link>
          <Link
            to="/settings"
            className="block text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Settings
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
      <div className="flex-1 ml-64 p-8">
        {/* Page content goes here */}
        <div className="p-4">{/* Your page content */}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
