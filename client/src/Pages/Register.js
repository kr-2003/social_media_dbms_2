import React, { useState, useContext } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Container from "@mui/material/Container";
import dayjs from "dayjs";
import Axios from "axios";
import { AppContext } from "../App";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Register.css";
function Register() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const { loginStatus, setLoginStatus, setUser, user } = useContext(AppContext);
  const navigate = useNavigate();
  //   const { setCurrUser } = useContext(LoginContext);
  //   const { setLoginStatus } = useContext(LoginContext);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const usernameRegHandler = (e) => {
    setUsernameReg(e.target.value);
  };
  const passwordRegHandler = (e) => {
    setPasswordReg(e.target.value);
  };
  const firstNameRegHandler = (e) => {
    setFirstNameReg(e.target.value);
  };
  const lastNameRegHandler = (e) => {
    setLastNameReg(e.target.value);
  };
  const emailRegHandler = (e) => {
    setEmailReg(e.target.value);
  };
  const register = () => {
    if (
      firstNameReg !== "" &&
      lastNameReg !== "" &&
      usernameReg !== "" &&
      passwordReg != "" &&
      value !== "" &&
      emailReg !== ""
    ) {
      Axios.post("http://app/user/register", {
        firstName: firstNameReg,
        lastName: lastNameReg,
        username: usernameReg,
        password: passwordReg,
        dateOfBirth: value,
        email: emailReg,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      toast.success("Registration Successfull!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setUsernameReg("");
      setPasswordReg("");
      setFirstNameReg("");
      setLastNameReg("");
      setEmailReg("");

      navigate("/login");
    } else {
      if (firstNameReg === "") {
        toast.warn("Please enter first name!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      if (lastNameReg === "") {
        toast.warn("Please enter last name!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      if (usernameReg === "") {
        toast.warn("Please enter username!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      if (passwordReg === "") {
        toast.warn("Please enter password!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      if (emailReg === "") {
        toast.warn("Please enter email!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };
  return (
    <motion.div
      className="h-screen w-screen flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div class="mainn"></div>
      <div class="register-box">
        <h2>Register</h2>
        <form>
          <div class="user-box">
            <input
              type="text"
              name=""
              required=""
              onChange={firstNameRegHandler}
              value={firstNameReg}
            />
            <label>First Name</label>
          </div>
          <div class="user-box">
            <input
              type="text"
              name=""
              required=""
              onChange={lastNameRegHandler}
              value={lastNameReg}
            />
            <label>Last Name</label>
          </div>
          <div class="user-box">
            <input
              type="email"
              name=""
              required=""
              onChange={emailRegHandler}
              value={emailReg}
            />
            <label>Email</label>
          </div>
          <div class="user-box">
            <input type="date" />
            <label>Date of birth</label>
          </div>
          <div class="user-box">
            <input
              type="text"
              name=""
              required=""
              onChange={usernameRegHandler}
              value={usernameReg}
            />
            <label>Username</label>
          </div>
          <div class="user-box">
            <input
              type="password"
              name=""
              required=""
              onChange={passwordRegHandler}
              value={passwordReg}
            />
            <label>Password</label>
          </div>
          <button onClick={register}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Register
          </button>
        </form>
      </div>
      {/* <div className="registration h-100 w-98 align-content-center bg-zinc-300 p-10 bg-opacity-25 rounded-md">
        <h1 className="text-5xl mb-8">Registration</h1>
        <Stack spacing={3} className="stack-div">
          <TextField
            className="input-fields"
            label="First Name"
            variant="standard"
            type="text"
            onChange={firstNameRegHandler}
            value={firstNameReg}
          />
          <TextField
            className="input-fields"
            label="Last Name"
            variant="standard"
            type="text"
            onChange={lastNameRegHandler}
            value={lastNameReg}
          />
          <TextField
            className="input-fields"
            label="Username"
            variant="standard"
            type="text"
            onChange={usernameRegHandler}
            value={usernameReg}
          />
          <TextField
            className="input-fields"
            label="Email"
            variant="standard"
            type="text"
            onChange={emailRegHandler}
            value={emailReg}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            className="input-fields"
            label="Password"
            variant="standard"
            type="password"
            onChange={passwordRegHandler}
            value={passwordReg}
          />
          <Button variant="contained" size="large" onClick={register}>
            Register
          </Button>
        </Stack>
      </div> */}
    </motion.div>
  );
}

export default Register;
