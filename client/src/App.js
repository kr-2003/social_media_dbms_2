import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home";
import Navmenu from "./components/Navmenu";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import Chat from "./Pages/Chat";
import { createContext, useState, useMemo, useEffect } from "react";
import Axios from "axios";
import SearchBar from "./components/SearchBar";
import "./App.css";
import io from "socket.io-client";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Homepage from "./Pages/Homepage";
const socket = io.connect("http://localhost:3001");

export const AppContext = createContext();

function App() {
  Axios.defaults.withCredentials = true;
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    Axios.get("http://localhost:3001/user/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(true);
        setUser({
          username: response.data.user[0].username,
          id: response.data.user[0].id,
        });
      } else {
        setLoginStatus(false);
      }
    });
  });

  return (
    <AppContext.Provider value={{ loginStatus, setLoginStatus, user, setUser }}>
      <Router>
        <Navmenu></Navmenu>
        <AnimatedRoutes></AnimatedRoutes>
        {/* <Homepage/> */}
        <ToastContainer />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
