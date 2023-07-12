import * as React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { height } from "@mui/system";
import { useState } from "react";
import Axios from "axios";
import Button from "./Button";
import uuid from "react-uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Posts.css";

const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));

export default function InputPost() {
  Axios.defaults.withCredentials = true;
  const [image, setImage] = useState("");
  const [post, setPost] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const postHandler = (e) => {
    setPost(e.target.value);
  };
  const imageHandler = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  let imgUrl = "";

  const uploadImage = async (image) => {
    const formData = new FormData();
    console.log(image);
    formData.append("file", image);
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
        setImageUrl(imgUrl);
        // console.log(imageUrl);
        console.log(data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const savePost = async () => {
    if (image !== "") {
      toast.promise(resolveAfter3Sec, {
        pending: "Uploading!",
        success: "Uploaded!! 👌",
        error: "Promise rejected 🤯",
      });
      await uploadImage(image);
    }
    console.log(imageUrl);
    console.log(imgUrl);
    await Axios.post("http://app:3001/post", {
      post_content: post,
      post_img: imgUrl,
      created_at: String(new Date()),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    setPost("");
  };

  return (
    <>
      <div className="relative text-center justify-center mt-10 -z-0">
        <h1 className="text-4xl mb-4 text-gray-800">CREATE A POST</h1>
        <TextareaAutosize
          maxRows={10}
          aria-label="maximum height"
          placeholder="Enter text..."
          value={post}
          style={{ width: 640, height: 300 }}
          onChange={postHandler}
          className="border-solid border-2 focus:outline-none p-3 rounded-xl bgg text-white"
        />
        <div className="justify-center text-center ml-auto">
          <input
            type="file"
            className="inline text-sm text-slate-500
                       file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-violet-50 file:text-slate-800
                       hover:file:bg-slate-200 justify-center
                      "
            onChange={imageHandler}
          />
          <button
            className="bg-sky-900 text-white fonr-[Poppins] py-2 px-6 rounded-3xl md:ml-8 hover:bg-cyan-800 duration-500 md:mr-0 mr-7"
            onClick={savePost}
          >
            POST
          </button>
        </div>
      </div>
    </>
  );
}
