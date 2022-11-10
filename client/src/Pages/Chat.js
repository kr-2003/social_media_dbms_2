import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import CircularJSON from "circular-json";
import io from "socket.io-client";
import { motion } from "framer-motion"
const socket = io.connect("http://localhost:3001");

function Chat() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [pastMsgs, setPastMsgs] = useState([]);
  const location = useLocation();
  const sender = location.state.sender;
  const receiver = location.state.receiver;
  const room = location.state.room;
  // console.log(socket);
  useEffect(() => {
    socket.emit("join_room", room);
  }, [])

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: sender,
        receiver: receiver,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };


  useEffect(() => {
    Axios.get(`http://localhost:3001/get_msgs/${sender}/${receiver}`).then((response) => {
      console.log(response)
      setPastMsgs(response.data);
    }).catch(err => {
      console.log(err);
    })


  }, []);

  useEffect(() => {
    console.log("Tanwish is legend!!")
    console.log(pastMsgs)
    for (let i = 0; i < pastMsgs.length; i++) {
      const msg = pastMsgs[i];

      const messageData = {
        room: room,
        author: msg.sender_id,
        receiver: msg.receiver_id,
        message: msg.message,
        time: msg.created_at
      }
      // console.log(messageData);
      if (msg.sender_id !== undefined && msg.receiver_id !== undefined) {
        setMessageList((list) => [...list, messageData])
      }

    }
  }, [pastMsgs])



  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, []);



  return (
    <motion.div className="w-screen h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <motion.div className="chat-window w-[60%] h-[90%]"
      >
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={sender === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </motion.div>
    </motion.div>

  );
}

export default Chat;
