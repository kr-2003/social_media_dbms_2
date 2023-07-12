import React from "react";
import "./button.css"
function Button(props) {
  return (
    <button className="bgsameaslogin text-white fonr-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-cyan-900 duration-500 md:mr-0 mr-7">
      {props.value}
    </button>
  );
}

export default Button;
