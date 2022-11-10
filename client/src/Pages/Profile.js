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
import CircularJSON from "circular-json";
import io from "socket.io-client";
import { motion } from "framer-motion";
import Photos from "../components/Photos";
import Bookmarks from "../components/Bookmarks";
const socket = io.connect("http://localhost:3001");



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
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
  const [postState, setPostState] = useState(1);
  let room;
  if (user.id < userPro.id) room = user.id + userPro.id;
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
    console.log({ ...socket })
    navigate(`/chat`, { state: { sender: user.username, receiver: userPro.username, room: room } });
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
  }, [followers]);
  useEffect(() => {
    Axios.get(`http://localhost:3001/getFollowings/${userPro.id}`)
      .then((response) => {
        setFollowings(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log("followings", followings);
  }, [followings]);
  return (
    <motion.div class="p-16" initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div class="p-8 bg-white shadow mt-4">
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
              <img className="h-[100%] w-[100%] bg-slate-300 rounded-full object-cover bg-red-800" src={userPro.profile_pic_url}></img>
            </div>{" "}
            {/* <div className="h-[300px] w-[300px] bg-slate-300 rounded-full bg-red-800">
              
            </div> */}
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
            {userPro.username}
          </h1>{" "}
        </div>
        <div className="w-[100%] flex items-center justify-center">
          <motion.button className={` h-[100%] p-4 hover:bg-slate-200 ${postState === 1 && "bg-slate-400 bg-opacity-[0.3]"}`} onClick={() => setPostState(1)} whileHover={{ transition: { duration: 1 } }}>My Posts</motion.button>
          <motion.button className={` h-[100%] p-4 hover:bg-slate-200 ${postState === 2 && "bg-slate-400 bg-opacity-[0.3]"}`} onClick={() => setPostState(2)} whileHover={{ transition: { duration: 1 } }}>Bookmarks</motion.button>
        </div>

        <div className="flex justify-center">

          {postState === 1 && (
            <Photos user_id={id}

            ></Photos>
          )}
          {postState === 2 && (
            <Bookmarks user_id={id}></Bookmarks>
          )}


        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="border-0 focus:outline-none"
          disableAutoFocus={true}
        >
          <Box sx={style} className="rounded-md drop-shadow-2xl">
            <h1 className="text-center font-extrabold text-xl mb-4">
              {arrayType}
            </h1>
              <ul>
                {modalArray.map((user) => (
                  <motion.li className="bg-gray-400 rounded-md mb-2" whileHover={{backgroundColor: "rgb(132, 136, 132)", transition: {duration: 0.4}}} >
                    {arrayType === "Followers" && (
                      <motion.button className="h-[100%] w-[100%] p-4" onClick={()=>navigate(`/user/${user.follower_id}`)}>{user.username}</motion.button>
                    )}
                    {arrayType === "Followings" && (
                      <motion.button className="h-[100%] w-[100%] p-4" onClick={()=>navigate(`/user/${user.followee_id}`)}>{user.username}</motion.button>
                    )}
                  </motion.li>
                ))}
              </ul>
          </Box>
        </Modal>
      </div>
      {/* <Chat socket={socket} sender={user.username} receiver = {userPro.username} room={room}></Chat> */}
    </motion.div>
  );
}
