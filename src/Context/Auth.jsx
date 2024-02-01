import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const userItem = localStorage.getItem("token");
    if (userItem) {
      const decodedToken = jwtDecode(userItem);
      setAuth(decodedToken);
    }
  }, [])


  const logout = () => {
    setAuth({});
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
