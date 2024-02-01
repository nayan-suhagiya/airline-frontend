import React, { useState } from "react";
import { Link } from "react-router-dom";
import navicon from "../assets/navicon.gif";

const Nav = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="p-4" style={{ backgroundColor: "#4f46e5" }}>
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-white font-bold text-4xl">AirLine</span>
          </div>

          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-white text-lg hover:text-gray-300">
              Home
            </Link>
            <Link to="about" className="text-white text-lg hover:text-gray-300">
              About
            </Link>
            <Link to="login" className="text-white text-lg hover:text-gray-300">
              Login
            </Link>
            <Link
              to="logout"
              className="text-white text-lg hover:text-gray-300"
            >
              Logout
            </Link>
          </div>

          <div className="md:hidden">
            <button
              id="menu-toggle"
              className="text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <img src={navicon} alt="navicon" />
            </button>
          </div>
        </div>

        <div
          className={`md:hidden ${
            isMobileMenuOpen ? "block" : "hidden"
          } mt-4 px-4`}
        >
          <div>
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </div>
          <div>
            <Link to="about" className="text-white hover:text-gray-300">
              About
            </Link>
          </div>
          <div>
            <Link to="login" className="text-white text-lg hover:text-gray-300">
              Login
            </Link>
          </div>
          <div>
            <Link
              to="logout"
              className="text-white text-lg hover:text-gray-300"
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;