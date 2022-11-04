import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Axios from "axios";
import { AppContext } from "../App";

function EditProfile() {
  const { loginStatus, user } = useContext(AppContext);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const editProfileHandler = () => {
    Axios.post(`http://localhost:3001/edit/${user.id}`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      username: username,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    navigate("/");
  };

  useEffect(() => {
    // console.log(user.username);
    // setUsername(user.username);
    Axios.get(`http://localhost:3001/user/${user.id}`).then((response) => {
      setUserDetails(response.data);
    });
  });

  //   useEffect(() => {
  //     // console.log(userDetails);
  //     setFirstName(userDetails.first_name);
  //     setLastName(userDetails.last_name);
  //     setEmail(userDetails.email_id);
  //   });
  //   console.log(firstName);
  //   console.log(username);

  //   useEffect(() => {
  //     Axios.post(`http://localhost:3001/edit/${user.id}`, {
  //       first_name: firstName,
  //       last_name: lastName,
  //       email: email,
  //       password: password,
  //     })
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  return (
    <div className="h-screen w-[100%] grid md:grid-cols-2 grid place-items-center h-screen">
      <div>
        <div>
          <div className="h-70 w-70 bg-slate-300 rounded-full">
            <img className="h-70 w-70 bg-slate-300 rounded-full object-scale-down" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"></img>
          </div>
          <input
            type="file"
            className="inline text-sm text-slate-500
       file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100 justify-center
      
    "
          />
        </div>
      </div>
      <div className="w-[50%] border-2 p-3 rounded-lg ">
        <div className="w-[100%] mb-6">
          <div className="w-100">
            <label className="" for="firstName">
              First Name
            </label>
          </div>
          <input
            name="firstName"
            id="firstName"
            value={firstName}
            className="border-2 w-[100%] h-10 rounded-lg p-2"
            onChange={firstNameHandler}
          ></input>
        </div>
        <div className="w-[100%] mb-6">
          <div className="w-100">
            <label for="lastName">Last Name</label>
          </div>

          <input
            name="lastName"
            id="lastName"
            value={lastName}
            className="border-2 w-[100%] h-10 rounded-lg p-2"
            onChange={lastNameHandler}
          ></input>
        </div>

        <div className="w-[100%] mb-6">
          <div className="w-100">
            <label for="username">Username</label>
          </div>

          <input
            name="username"
            id="username"
            value={username}
            className="border-2 w-[100%] h-10 rounded-lg p-2"
            onChange={usernameHandler}
          ></input>
        </div>

        <div className="w-[100%] mb-6">
          <div className="w-100">
            <label for="email">Email</label>
          </div>

          <input
            name="email"
            id="email"
            value={email}
            className="border-2 w-[100%] h-10 rounded-lg p-2"
            onChange={emailHandler}
          ></input>
        </div>

        <div className="w-[100%] mb-6">
          <div className="w-100">
            <label for="email">Password</label>
          </div>

          <input
            name="password"
            id="password"
            type="password"
            value={password}
            className="border-2 w-[100%] h-10 rounded-lg p-2"
            onChange={passwordHandler}
          ></input>
        </div>

        <button
          onClick={editProfileHandler}
          className="bg-[#F0EBCE] p-2 text-white rounded-3xl p-3 px-6 text-[#395144] font-bold"
        >
          Edit Changes
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-red-800 p-2 text-white rounded-3xl ml-2 p-3 px-6 font-bold"
        >
          Exit
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
