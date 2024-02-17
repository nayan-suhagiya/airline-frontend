import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Landing from "./Pages/Landing";
import About from "./Pages/About";
import { AuthProvider } from "./Context/Auth";
import PrivateRoute from "./Routes/PrivateRoute"; // Assuming this only handles authorization
import NotFound from "./Pages/NotFound";
import AdminDashboard from "./Components/AdminDashboard";
import UserDashboard from "./Components/UserDashboard";
import Nav from "./Components/Nav";
import UserProfile from "./Pages/User/UserProfile";
import Register from "./Auth/Register";
import ProfileContent from "./content/Admin/ProfileContent";
import FlightContent from "./content/Admin/FlightContent";
import BookingContent from "./content/Admin/BookingContent";
import UserContent from "./content/Admin/UserContent";
import CityContent from "./content/Admin/CityContent";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing title={"Airline-Home"} />} />
          <Route path="/about" element={<About title={"Airline-About"} />} />
          <Route path="/login" element={<Login title={"Airline-Login"} />} />
          <Route
            path="/register"
            element={<Register title={"Airline-Register"} />}
          />
          <Route path="dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<UserDashboard />}>
              <Route path="profile" element={<UserProfile />} />
            </Route>
            <Route path="admin" element={<AdminDashboard />}>
              <Route path="profile" element={<ProfileContent />} />
              <Route path="flight" element={<FlightContent />} />
              <Route path="booking" element={<BookingContent />} />
              <Route path="user" element={<UserContent />} />
              <Route path="city" element={<CityContent />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
};

export default App;
