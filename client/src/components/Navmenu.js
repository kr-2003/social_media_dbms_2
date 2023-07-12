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
import { useNavigate } from "react-router-dom";
import "./nav.css";
function Navmenu() {
  const { loginStatus, user, setUser } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
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
      <div className="shadow-md w-full sticky top-0 left-0 colo opacity-100 z-50">
        <div className="md:flex items-center justify-between colo py-4 md:px-10 px-7">
          <div className="font-bold text-2xl cursor-pointer flex items-center text-gray-800">
            <span className="text-3xl text-cyan-900 mr-1">
              <ion-icon name="logo-wechat" className="kk"></ion-icon>
              <h1 className="inline ii">AK</h1>
            </span>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
            {/* <ion-icon name="close-circle-outline"></ion-icon> */}
          </div>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static z-0 colo md:z-50 z-50 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-200 ease-in ${
              open ? "top-19.5" : "top-[-500px]"
            }`}
          >
            {links.map((links) => (
              <li key={links.name} className="md:ml-8 text-xl md:my-0 my-7">
                <button
                  onClick={() => navigate(links.link)}
                  className="text-gray-800 hover:text-gray-400 duration-500 "
                >
                  {links.name}
                </button>
              </li>
            ))}
            <SearchBar placeholder={`Search users`} data={userData}></SearchBar>
            {loginStatus && (
              <>
                <button onClick={() => navigate(`/user/${user.id}`)}>
                  <Button value={username}></Button>
                </button>

                <a href="/login" onClick={logoutHandler}>
                  <Button value={"LOGOUT"}></Button>
                </a>
              </>
            )}
            {!loginStatus && (
              <>
                <a href="/login">
                  <Button value={"LOGIN"}></Button>
                </a>
                <a href="/register">
                  <Button value={"REGISTER"}></Button>
                </a>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navmenu;
