import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useContext } from "react";
import { AppContext } from "../App";
import Button from "./Button";
import Axios from "axios";
import SearchBar from "./SearchBar";
import "./navey.css";
function Navmenu() {
  const { loginStatus, user, setUser } = useContext(AppContext);
  const [username, setUsername] = useState("");
  let links = [
    { name: "HOME", link: "/" },
    { name: "SERVICE", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "BLOGS", link: "/" },
  ];

  useEffect(() => {
    Axios.get(`http://localhost:3001/getUsername/${user.id}`)
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const logoutHandler = () => {
    Axios.get("http://localhost:3001/logout")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/userData")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(userData);
  return (
    <>
    <div>
    <div class="area"></div><nav class="main-menu">
            <ul>
                <li>
                    <a href="#">
                        <i class="fa fa-home fa-2x"></i>
                        <span class="nav-text">
                            AK
                        </span>
                    </a>
                  
                </li>
                <li class="has-subnav">
                    <a href="#">
                        <i class="fa fa-laptop fa-2x"></i>
                        <span class="nav-text">
                            Stars Components
                        </span>
                    </a>
                    
                </li>
                <li class="has-subnav">
                    <a href="#">
                       <i class="fa fa-list fa-2x"></i>
                        <span class="nav-text">
                            Forms
                        </span>
                    </a>
                    
                </li>
                <li class="has-subnav">
                    <a href="#">
                       <i class="fa fa-folder-open fa-2x"></i>
                        <span class="nav-text">
                            Pages
                        </span>
                    </a>
                   
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-bar-chart-o fa-2x"></i>
                        <span class="nav-text">
                            Graphs and Statistics
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-font fa-2x"></i>
                        <span class="nav-text">
                           Quotes
                        </span>
                    </a>
                </li>
                <li>
                   <a href="#">
                       <i class="fa fa-table fa-2x"></i>
                        <span class="nav-text">
                            Tables
                        </span>
                    </a>
                </li>
                
                <li>
                   <a href="#">
                        <i class="fa fa-map-marker fa-2x"></i>
                        <span class="nav-text">
                            Maps
                        </span>
                    </a>
                </li>
                <li>
                    <a href="/Register" value={"REGISTER"}>
                    {/* <Button value={"REGISTER"}></Button> */}
                       <i class="fa fa-info fa-2x"></i>
                        <span class="nav-text">
                        Registration
                        </span>
                    </a>
                </li>
                {/* <li> */}
                    {/* <a href="/Login" value={"LOGIN"}> */}
                    {/* <Button value={"REGISTER"}></Button> */}
                       {/* <i class="fa fa-info fa-2x"></i> */}
                        {/* <span class="nav-text"> */}
                        {/* Login */}
                        {/* </span> */}
                    {/* </a> */}
                {/* </li> */}
            </ul>
            <li>
            <i class="fa fa-info fa-2x"></i>
            <span class="nav-text">
            
            {/* <span class="nav-text"> */}
            <SearchBar placeholder={`Search users`} data={userData}></SearchBar>
                        {/* </span> */}
            
                        </span>
                {/* {links.map((links) => (
              <li key={links.name} className="md:ml-8 text-xl md:my-0 my-7">
                <a
                  href={links.link}
                  className="text-gray-800 hover:text-gray-400 duration-500 "
                >
                  {links.name}
                </a>
              </li>
            ))} */}
            
                </li>

            <ul class="logout">
                <li>
                   <a href="/login" value={"LOGOUT"} onClick={logoutHandler}>
                         <i class="fa fa-power-off fa-2x"></i>
                        <span class="nav-text">
                            Logout
                        </span>
                    </a>
                </li>  
            </ul>
        </nav>
    </div>
    </>
  );
}

export default Navmenu;