import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./Pages/Landing";
import { About } from "./Pages/About";
import Nav from "./Components/Nav";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import AuthRoute from "./Routes/AuthRoute";
import AdminHome from "./Pages/Admin/AdminHome";
import UserHome from "./Pages/User/UserHome";
import NotFound from "./Pages/NotFound";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing title={"Airline-Home"} />} />
        <Route path="/about" element={<About title={"Airline-About"} />} />
        <Route path="/login" element={<Login title={"Airline-Login"} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="dashboard" element={<AuthRoute />}>
          <Route path="user" element={<UserHome />} />
        </Route>
        <Route path="dashboard" element={<AuthRoute />}>
          <Route path="admin" element={<AdminHome />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
