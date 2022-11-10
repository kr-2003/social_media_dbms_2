import React, { useEffect, useContext } from 'react'
import { AppContext } from "../App";
function Test() {
    const { loginStatus, user, setLoginStatus, setShowNav } = useContext(AppContext);
    useEffect(()=>{
        setShowNav(false);
    })
  return (
    <video type="video/mp4" src='https://res.cloudinary.com/abhi9av/video/upload/v1668063515/WhatsApp_Video_2022-11-10_at_12.27.20_icmoxx.mp4' autoPlay muted loop></video>
    
  )
}

export default Test;