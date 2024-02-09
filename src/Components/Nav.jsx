import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import navicon from "../assets/navicon.gif";
import { useAuth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isProfileMenuOpen &&
        !event.target.closest(".profile-dropdown-button")
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const { user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
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
            <Link
              to="book-ticket"
              className="text-white text-lg hover:text-gray-300"
            >
              Book Ticket
            </Link>
            {user ? (
              <div className="relative">
                <button
                  className="profile-dropdown-button text-white text-lg hover:text-gray-300"
                  onClick={toggleProfileMenu}
                >
                  {user && user.name ? user.name : "Profile"}
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute top-10 right-0 bg-white rounded shadow-md">
                    {user.isAdmin ? (
                      <Link
                        to="/dashboard/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/dashboard/user"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="login"
                className="text-white text-lg hover:text-gray-300"
              >
                Login
              </Link>
            )}
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
          {user ? (
            <div className="relative">
              <button
                className="profile-dropdown-button text-white text-lg hover:text-gray-300"
                onClick={toggleProfileMenu}
              >
                {user && user.name ? user.name : "Profile"}
              </button>
              {isProfileMenuOpen && (
                <div className="absolute top-10 right-0 bg-white rounded shadow-md">
                  {user.isAdmin ? (
                    <Link
                      to="/dashboard/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard/user"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="login" className="text-white text-lg hover:text-gray-300">
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
