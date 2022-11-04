import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chat from "../components/Chat"
import { Link } from "react-router-dom";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Profile() {
  Axios.defaults.withCredentials = true;
  const { id } = useParams();
  const { user, setUser, loginStatus, setLoginStatus } = useContext(AppContext);
  const [userPro, setUserPro] = useState({});
  const [followStatus, setFollowStatus] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [modalArray, setModalArray] = useState([]);
  const [arrayType, setArrayType] = useState("");
  let room;
  if(user.id<userPro.id) room = user.id+userPro.id;
  else room = userPro.id + user.id;
  // const room = Math.min([user.id, userPro.id]) + Math.max([userPro.id, userPro.id]);
  // console.log(room)

  const handleOpen = (arr, arrType) => {
    setOpen(true);
    setModalArray(arr);
    setArrayType(arrType);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/user/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(true);
      } else {
        setLoginStatus(false);
        navigate("/login");
      }
    });
  });

  const followHandler = () => {
    Axios.post("http://localhost:3001/follow", {
      followerId: user.id,
      followeeId: userPro.id,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unfollowHandler = () => {
    Axios.post("http://localhost:3001/unfollow", {
      followerId: user.id,
      followeeId: userPro.id,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const joinRoomHandler = () => {
    socket.emit("join_room", room);
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/user/${id}`).then((response) => {
      setUserPro(response.data);
    });
    console.log(userPro);
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
  }, []);

  useEffect(() => {
    // console.log(userPro.id, user.id);
    Axios.get(`http://localhost:3001/followStatus/${userPro.id}/${user.id}`)
      .then((response) => {
        if (response.data.followStatus === true) {
          setFollowStatus(true);
        } else setFollowStatus(false);
        // console.log(response);
      })
      .catch((err) => {
        // console.log(err);
      });
  });

  useEffect(() => {
    Axios.get(`http://localhost:3001/getFollowers/${userPro.id}`)
      .then((response) => {
        setFollowers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log("followers", followers);
  });
  useEffect(() => {
    Axios.get(`http://localhost:3001/getFollowings/${userPro.id}`)
      .then((response) => {
        setFollowings(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log("followings", followings);
  });
  return (
    <div class="p-16">
      <div class="p-8 bg-white shadow mt-24">
        {" "}
        <div class="grid grid-cols-1 md:grid-cols-3">
          {" "}
          <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            {" "}
            <div>
              {" "}
              <p class="font-bold text-gray-700 text-xl">
                {followings.length}
              </p>{" "}
              <a
                onClick={() => handleOpen(followings, "Followings")}
                class="text-gray-400"
              >
                Followings
              </a>{" "}
            </div>{" "}
            <div>
              {" "}
              <p class="font-bold text-gray-700 text-xl">
                {followers.length}
              </p>{" "}
              <a
                onClick={() => handleOpen(followers, "Followers")}
                class="text-gray-400"
              >
                Followers
              </a>{" "}
            </div>{" "}
            <div>
              {" "}
              <p class="font-bold text-gray-700 text-xl">89</p>{" "}
              <p class="text-gray-400">Comments</p>{" "}
            </div>{" "}
          </div>{" "}
          <div class="relative">
            {" "}
            <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>{" "}
            </div>{" "}
          </div>{" "}
          {user.id !== userPro.id && (
            <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              {!followStatus && (
                <button
                  onClick={followHandler}
                  class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  {" "}
                  Follow
                </button>
              )}{" "}
              {followStatus && (
                <button
                  onClick={unfollowHandler}
                  class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  {" "}
                  Unfollow
                </button>
              )}{" "}
              <button
                onClick={joinRoomHandler}
                class="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                {" "}
                Message
              </button>{" "}
            </div>
          )}{" "}
          {user.id === userPro.id && (
            <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button
                onClick={() => navigate("/editProfile")}
                class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                {" "}
                Edit Profile
              </button>{" "}
            </div>
          )}{" "}
        </div>{" "}
        <div class="mt-20 text-center border-b pb-12">
          {" "}
          <h1 class="text-4xl font-medium text-gray-700">
            {userPro.username}, <span class="font-light text-gray-500">27</span>
          </h1>{" "}
          <p class="font-light text-gray-600 mt-3">Bucharest, Romania</p>{" "}
          <p class="mt-8 text-gray-500">
            Solution Manager - Creative Tim Officer
          </p>{" "}
          <p class="mt-2 text-gray-500">University of Computer Science</p>{" "}
        </div>{" "}
        <div class="mt-12 flex flex-col justify-center">
          {" "}
          <p class="text-gray-600 text-center font-light lg:px-16">
            An artist of considerable range, Ryan — the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
            records all of his own music, giving it a warm, intimate feel with a
            solid groove structure. An artist of considerable range.
          </p>{" "}
          <button class="text-indigo-500 py-2 px-4  font-medium mt-4">
            {" "}
            Show more
          </button>{" "}
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {arrayType}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <ul>
                {modalArray.map((user) => (
                  <li>
                    {arrayType === "Followers" && (
                      <a href={`/user/${user.follower_id}`}>{user.username}</a>
                    )}
                    {arrayType === "Followings" && (
                      <a href={`/user/${user.followee_id}`}>{user.username}</a>
                    )}
                  </li>
                ))}
              </ul>
            </Typography>
            <Button variant="outlined" color="success">
              Edit
            </Button>
          </Box>
        </Modal>
      </div>
      <Chat socket={socket} username={user.username} room={room}></Chat>
    </div>
  );
}
