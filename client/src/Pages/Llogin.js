// import React, { useState, useEffect, useContext } from "react";
// import { AppContext } from "../App";
// import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import Axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { loginStatus, setLoginStatus } = useContext(AppContext);
//   Axios.defaults.withCredentials = true;
//   const usernameHandler = (e) => {
//     setUsername(e.target.value);
//   };
//   const passwordHandler = (e) => {
//     setPassword(e.target.value);
//   };
//   const login = () => {
//     Axios.post("http://localhost:3001/user/login", {
//       username: username,
//       password: password,
//     })
//       .then((response) => {
//         if (!response.data.auth) {
//           setLoginStatus(false);
//         } else {
//           console.log(response.data);
//           setLoginStatus(true);
//         }
//         console.log(response);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     setLoginStatus(true);
//     navigate("/");
//     navigate("/");
//   };

//   if (loginStatus) navigate("/");

//   return (
//     <div class="main">
//       <div class="login-box">
//         <h1>LOGIN</h1>
//         <form>
//           <div class="user-box">
//             <input type="text" name="" required="" onChange={usernameHandler} value={username}/>
//             <label>Username</label>
//           </div>
//           <div class="user-box">
//             <input type="password" name="" required="" onChange={passwordHandler} value={password}/>
//             <label>Password</label>
//           </div>
//           <button onClick={login}>
//             <span></span>
//             <span></span>
//             <span></span>
//             <span></span>
//             LOGIN
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
