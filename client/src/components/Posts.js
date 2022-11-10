import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { AppContext } from "../App";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditForm from "./EditForm";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Comment from "./Comment";
import "./Posts.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {motion} from "framer-motion"

const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));


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

function Posts(props) {
  const { user } = useContext(AppContext);
  let id;
  if (props.user_id === undefined) {
    id = user.id;
  } else id = props.user_id;

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [postEdit, setPostEdit] = useState({});
  const [editContent, setEditContent] = useState("");
  const [comment, setComment] = useState(-1);
  const [like, setLike] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const commentHandler = (postId) => {
    if (comment !== postId) setComment(postId);
    else setComment(-1);
  };
  const likeHandler = (postId) => {
    setLike((like) => [...like, postId]);
    Axios.post(`http://localhost:3001/like`, {
      post_id: postId,
      user_id: user.id,
      username: user.username,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });


  };

  const unlikeHandler = (postId) => {
    setLike((like) => like.filter((filter) => filter !== postId));
    Axios.post(`http://localhost:3001/unlike`, {
      post_id: postId,
      user_id: user.id,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });


  };

  const handleOpen = (post) => {
    setOpen(true);
    setPostEdit(post);
    setEditContent(post.post_content);
  };
  const handleClose = () => setOpen(false);
  const deletePost = (postId) => {
    console.log(postId);
    Axios.get(`http://localhost:3001/delete/post/${postId}`)
      .then((response) => {
        console.log(response);
        toast.success('Successfully deleted!!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editPost = (e) => {
    Axios.post(`http://localhost:3001/edit/post/${postEdit.id}`, {
      post_content: editContent,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };

  const editContentHandler = (e) => {
    setEditContent(e.target.value);
  };

  const bookmarkHandler = (postId) => {
    console.log(postId);
    Axios.post(`http://localhost:3001/bookmark`, {
      post_id: postId,
      user_id: user.id
    }).then((response) => {
      console.log(response)
    }).catch(err => {
      console.log(err);
    })
  }
  const unbookmarkHandler = (postId) => {
    Axios.post(`http://localhost:3001/unbookmark`, {
      post_id: postId,
      user_id: user.id
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    Axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
      // console.log(new Date(posts[0].created_at));
      setPosts(
        response.data.sort(
          (obj1, obj2) =>
            Number(new Date(obj2.created_at)) -
            Number(new Date(obj1.created_at))
        )
      );
    });
    Axios.get(`http://localhost:3001/getLikes/${id}`).then((response) => {
      setLike(response.data);
      // console.log(like);
    }, []);
    Axios.get(`http://localhost:3001/getBookmarks/${id}`).then((response) => {
      setBookmarks(response.data);
    }, [bookmarks])
    // console.log(posts);
  });

  function convert(str) {
    let date = new Date(str);
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    return [
      [day, mnth, date.getFullYear()].join("-"),
      [hours, minutes].join(":"),
    ].join(", ");
  }

  return (
    <>
      <div className="relative text-center justify-center border-solid border-2">
        <h1 className="text-4xl mb-4 mt-8 mb-6">YOUR POSTS</h1>
        {posts.map((post) => (
          <motion.div key={post.id} 
          initial={{x: -1, opacity: 0 }}
          animate={{x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}>
            <div className="mt-2 bgg container mx-auto text-left md:w-1/2 md:min-h-10 md:max-h-50 border-solid border-2 mb-10 p-2 rounded-lg">
              <div className="h-10 bg-slate-300 p-2 flex items-center flow-root">
                <a
                  className="text-md font-semibold float-left"
                  href={`/user/${post.user_id}`}
                >
                  {post.username}
                </a>
                <span className="float-right text-sm">
                  {convert(post.created_at)}
                </span>
              </div>
              <div className="container mx-auto md:w-full md:h-1/2 mb-3">
                {post.post_img && (
                  <img src={`${post.post_img}`} className="image w-full"></img>
                )}
              </div>
              <div className="container mx-auto mb-3">
                <div className="inline-grid grid-cols-3 gap-3">
                  {!like.some((item) => item.post_id === post.id) && (
                    <button onClick={() => likeHandler(post.id)}>
                      <ion-icon size="large" name="heart-outline"></ion-icon>
                    </button>
                  )}
                  {like.some((item) => item.post_id === post.id) && (
                    <button onClick={() => unlikeHandler(post.id)}>
                      <ion-icon
                        size="large"
                        name="heart"
                        className="heart_filled"
                      ></ion-icon>
                    </button>
                  )}
                  <button onClick={() => commentHandler(post.id)}>
                    <ion-icon size="large" name="chatbubble-outline"></ion-icon>
                  </button>
                  {!bookmarks.some((item) => item.post_id === post.id) && (
                    <button onClick={() => bookmarkHandler(post.id)}>
                      <ion-icon name="bookmarks-outline" size="large"></ion-icon>
                    </button>
                  )}
                  {
                    bookmarks.some((item) => item.post_id === post.id) && (
                      <button onClick={() => unbookmarkHandler(post.id)}>
                        <ion-icon name="bookmarks" size="large"></ion-icon>
                      </button>
                    )
                  }


                </div>
              </div>
              <div className="container mx-auto md:h-1/2">
                {post.num_likes && (<span className="text-sm mb-6 text-slate-200">{post.num_likes} likes</span>)}

                <p className="mt-6 text-white">{post.post_content}</p>
                {user.id === post.user_id && (
                  <div className="mt-5">
                    <button
                      className="bg-sky-900 text-white fonr-[Poppins] py-2 px-6 rounded-3xl md:ml-0 hover:bg-indigo-400 duration-500"
                      onClick={handleOpen.bind(this, post)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-pink-600 text-white fonr-[Poppins] py-2 px-6 rounded-3xl md:ml-4 hover:bg-red-400 duration-500"
                      onClick={deletePost.bind(this, post.id)}
                    >
                      Delete
                    </button>
                    

                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Edit Post
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <TextareaAutosize
                            maxRows={10}
                            aria-label="maximum height"
                            placeholder="Maximum 10 rows"
                            value={editContent}
                            onChange={editContentHandler}
                            style={{ width: "100%", height: 200 }}
                          />
                        </Typography>
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={editPost}
                        >
                          Edit
                        </Button>
                      </Box>
                    </Modal>
                  </div>
                )}
                {comment === post.id && <Comment post_id={post.id}></Comment>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default Posts;
