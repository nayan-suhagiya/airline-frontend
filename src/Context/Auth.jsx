import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    const userData = {
      token,
      id: decodedToken.id,
      name: decodedToken.name,
      isAdmin: decodedToken.isAdmin,
    };

    setUser(userData);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userData = {
          token,
          id: decodedToken.id,
          name: decodedToken.name,
          isAdmin: decodedToken.isAdmin,
        };
        setUser(userData);
      } catch (error) {
        // Handle invalid token or any other decoding errors
        console.error("Error decoding token:", error);
        setUser(null); // Set user to null if token is invalid
        localStorage.removeItem("token"); // Remove invalid token from storage
      }
    } else {
      setUser(null); // Set user to null if token is not present
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
