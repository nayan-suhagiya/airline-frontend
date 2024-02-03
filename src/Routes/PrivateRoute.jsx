import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/Auth';

const PrivateRoute = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  console.log("user PrivateRoute >>>", user);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log('Logged in user in PrivateRoute:', user);

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
