import React, { useState, useContext } from "react";
import Axios from "axios";
import { AppContext } from "../App";

function Comments(props) {
  const [comments, setComments] = useState([]);
  const { loginStatus, user } = useContext(AppContext);
  Axios.get(`http://localhost:3001/comment/${props.post_id}`)
    .then((response) => {
      setComments(response.data);
    })
    .catch((err) => {
      console.log(err);
    }, []);

  return (
    <>
      {comments
        .slice(0)
        .reverse()
        .map((comment) => (
          <div className="border-2 border-solid p-3 mb-2">
            <div key={comment.id}>
              <span className="text-white">{comment.comment_body}</span>
            </div>
            <a href={`/user/${comment.commented_by}`}>
              <span className="text-xs  text-slate-200">
                By {comment.commented_by_name}
              </span>
            </a>
            <br></br>
            {user.username === comment.commented_by_name && (
              <>
                <button className="text-xs bg-sky-900  py-1 px-3 text-white mr-2 rounded-3xl">
                  Edit
                </button>
                <button className="text-xs bg-pink-600 py-1 px-3 text-white mr-2 rounded-3xl">
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
    </>
  );
}

export default Comments;
