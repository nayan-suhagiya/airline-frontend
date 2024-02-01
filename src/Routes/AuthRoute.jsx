import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoute = () => {
  const [success, setSuccess] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const isValid = async () => {
      const res = await axios.get(`http://localhost:5050/api/auth/validuser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("res >>>>", res);
      if (res.data && res.statusText === "OK") {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    };
    if (token) {
      isValid();
    }
    if (success === false) {
      navigate("/login");
    }
  }, [navigate, success, token]);
  return success && <Outlet />;
};

export default AuthRoute;
