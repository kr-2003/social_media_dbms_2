import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import EditProfile from "../Pages/EditProfile";
import Messages from "../Pages/Messages";
import Chat from "../Pages/Chat";
import "../App.css";
import { AnimatePresence } from "framer-motion"

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" exact element={<Home></Home>}></Route>
                <Route path="/login" exact element={<Login></Login>}></Route>
                <Route path="/register" exact element={<Register></Register>}></Route>
                <Route path="/user/:id" exact element={<Profile></Profile>}></Route>
                <Route
                    path="/editProfile"
                    exact
                    element={<EditProfile></EditProfile>}
                ></Route>
                <Route path="/chat" exact element={<Chat></Chat>}></Route>
                <Route path="/messages" exact element={<Messages></Messages>}></Route>
            </Routes>
        </AnimatePresence>


    )
}

export default AnimatedRoutes