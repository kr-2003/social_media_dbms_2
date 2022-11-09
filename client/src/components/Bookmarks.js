import Axios from 'axios'
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { duration } from '@mui/material';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
};

function search(idKey, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id = idKey) return array[i];
    }
}

function Bookmarks({ user_id }) {
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [postModal, setPostModal] = useState(-1);
    const [postComment, setPostComment] = useState(-1);
    const [allComments, setAllComments] = useState([]);

    const handleClose = () => {
        setOpen(false);
    }
    useEffect(() => {
        Axios.get(`http://localhost:3001/bookmarks/${user_id}`).then((response) => {
            setPosts(response.data);
            // console.log(posts);
        }).catch(err => {
            console.log(err);
        })
    });

    useEffect(() => {
        Axios.get(`http://localhost:3001/allComments/${user_id}`).then((response) => {
            setAllComments(response.data);
        }).catch(err => {
            console.log(err);
        })
    })

    const handleOpen = (postId) => {
        setOpen(true);
        setPostModal(postId);

    };
    return (
        <motion.div className='grid grid-cols-3 w-[80%] gap-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {posts.map((post) => (
                <motion.div className='filter hover: hover:contrast-800 hover:opacity-1' whileHover={{
                    scale: 1.04,
                    transition: { duration: 0.1 },
                }}>
                    <motion.img onClick={handleOpen.bind(this, post.id)} className='h-80 w-80 object-cover rounded-lg shadow-inner' src={post.post_img} whileHover={{
                        scale: 1.04,
                        transition: { duration: 0.1 },
                    }}>

                    </motion.img>
                    <Modal
                        open={post.id === postModal && open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    //   transition = {{duration: 0.1}}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.3,
                                delay: 0.3,
                            }}
                        >
                            <Box sx={style}>
                                <div className='grid grid-cols-3 h-[100%] w-[100%] m-0'>
                                    <div className='w-[100%] h-[100%] col-span-2 object-cover overflow-scroll'>
                                        <img className='w-[100%] h-[100%] col-span-2 object-cover overflow-scroll' src={post.post_img}></img>
                                    </div>
                                    <div>
                                        <div className='w-[100%] bg-slate-300 p-2'>
                                            <a href={`/user/${post.user_id}`} className='font-bold'>{post.username}</a>
                                        </div>
                                        <div className='p-2'>
                                            <p>{post.post_content}</p>
                                        </div>
                                        <hr></hr>
                                        <div className='p-2 overflow-scroll'>
                                            {allComments.map(comment => (comment.post_id === post.id && (
                                                <div className='mb-4'>
                                                    <div className='text-sm'><a href={comment.commented_by} className='font-bold'>{comment.commented_by_name}</a> : {comment.comment_body}</div>

                                                </div>
                                            )))}
                                        </div>

                                    </div>
                                </div>

                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="success"
                                >
                                    Edit
                                </Button>
                            </Box>
                        </motion.div>

                    </Modal>

                </motion.div>



            ))
            }

        </motion.div>
    )
}

export default Bookmarks