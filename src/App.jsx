import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Landing from './Pages/Landing';
import About from './Pages/About';
import { AuthProvider } from './Context/Auth';
import PrivateRoute from './Routes/PrivateRoute'; // Assuming this only handles authorization
import NotFound from './Pages/NotFound';
import AdminDashboard from './Components/AdminDashboard';
import UserDashboard from './Components/UserDashboard';
import Nav from './Components/Nav';
import UserProfile from './Pages/User/UserProfile';
import AdminProfile from './Pages/Admin/AdminProfile';
import Register from './Auth/Register';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing title={"Airline-Home"} />} />
          <Route path="/about" element={<About title={"Airline-About"} />} />
          <Route path="/login" element={<Login title={"Airline-Login"} />} />
          <Route path="/register" element={<Register title={"Airline-Register"} />} />
          <Route path='dashboard' element={<PrivateRoute />} >
            <Route path='user' element={<UserDashboard />}>
              <Route path='profile' element={<UserProfile />} />
            </Route>
            <Route path='admin' element={<AdminDashboard />}>
              <Route path='profile' element={<AdminProfile />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
