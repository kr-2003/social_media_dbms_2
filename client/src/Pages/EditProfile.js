import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Axios from "axios";
import { AppContext } from "../App";
import { motion } from "framer-motion";

function EditProfile() {
  const { loginStatus, user } = useContext(AppContext);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.profile_pic_url);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [profileImage, setProfileImage] = useState();
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const navigate = useNavigate();
  // console.log(user.id);
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
  const profileImageHandler = (e) => {
    setProfileImage(e.target.files[0]);
  };

  let imgUrl = "";

  const uploadImage = async () => {
    const formData = new FormData();
    console.log(profileImage);
    formData.append("file", profileImage);
    formData.append("upload_preset", "g330on9r");
    formData.append("cloud_name", "abhi9av");
    // formData.append("public_id", uniq);

    await fetch("https://api.cloudinary.com/v1_1/abhi9av/image/upload", {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      .then(async (data) => {
        // imgUrl = data.secure_url;
        // return data.secure_url;

        imgUrl = data.secure_url;
        setProfileImageUrl(imgUrl);
        // console.log(imageUrl);
        console.log(imgUrl);
      })
      .catch((err) => {
        console.log(err);
      });
    await Axios.post(`http://localhost:3001/upload/image/${user.id}`, {
      profile_pic_url: imgUrl,
    });
  };

  useEffect(() => {
    // console.log(user.username);
    // setUsername(user.username);
    Axios.get(`http://localhost:3001/user/${user.id}`).then((response) => {
      setUserDetails(response.data);
    });
    // console.log(userDetails);
    setImage(userDetails.profile_pic_url);
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
    <motion.div
      className="h-screen w-[100%] place-items-center h-screen flex items-center justify-center mt-0 sm:mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="grid md:grid-cols-3 w-[50%]">
        <div className="col-span-1">
          <div>
            <div className="h-[200px] w-[200px] bg-slate-300 rounded-full bg-red-800 mb-10">
              <img
                className="h-[200px] w-[200px] bg-slate-300 rounded-full object-cover bg-red-800"
                src={image}
              ></img>
            </div>
            <input
              type="file"
              className="inline text-sm text-slate-500
                file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100 justify-center
                mb-10
             "
              onChange={profileImageHandler}
            />
            <button
              className="border-2 text-sm text-slate-500
                py-4 px-20
                rounded-full border-0
                text-sm font-semibold
                bg-violet-50 text-violet-700
                hover:bg-violet-100 justify-center
                mb-10
                "
              onClick={uploadImage}
            >
              Upload
            </button>
          </div>
        </div>
        <div className="w-[100%] border-2 rounded-lg col-span-2 p-3">
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
              <label for="username">Username</label>
            </div>

            <input
              disabled
              name="username"
              id="username"
              value={username}
              className="border-2 w-[100%] h-10 rounded-lg p-2"
              onChange={usernameHandler}
            ></input>
          </div>

          <div className="w-[100%] mb-6">
            <div className="w-100">
              <label for="password">Password</label>
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
    </motion.div>
  );
}

export default EditProfile;
