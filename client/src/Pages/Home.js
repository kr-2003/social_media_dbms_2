import React, { useEffect, useContext } from "react";
import { AppContext } from "../App";
import InputPost from "../components/InputPost";
import Posts from "../components/Posts";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { motion, useScroll } from "framer-motion";

function Home() {
  Axios.defaults.withCredentials = true;
  const { loginStatus, user, setLoginStatus } = useContext(AppContext);
  const navigate = useNavigate();
  let login = false;
  useEffect(() => {
    Axios.get("http://app:3001/user/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(true);
      } else {
        setLoginStatus(false);
        navigate("/login");
      }
    });
  });
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <InputPost className="z-0"></InputPost>
      <Posts></Posts>
    </motion.div>
  );
}

export default Home;
