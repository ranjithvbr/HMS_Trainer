import React, { useEffect, useState } from "../../../node_modules/react";
import BroadMessageList from "./BroadMessagelist";
import moment from "../../../node_modules/moment";
import "./BroadMessagemaster.css";
import { MdSend } from "../../../node_modules/react-icons/md";
import Camera from '../../Images/cameraicon.svg';
import Attach from '../../Images/attachicon.svg';

const MY_USER_ID = "apple";

export default function BroadMessagemaster(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    var tempMessages = [
     
      {
        id: 1,
        author: "orange",
        message: " Hi",
        timestamp: new Date().getTime()
      },
    
      {
        id: 2,
        author: "apple",
        message: "Hello",
        timestamp: new Date().getTime()
      },
   
      {
        id: 3,
        author: "orange",
        message: "How are you doing?",
        timestamp: new Date().getTime()
      },
     
      {
        id: 4,
        author: "apple",
        message: "Good.",
        timestamp: new Date().getTime()
      },
      
    ];
    setMessages([...messages, ...tempMessages]);
  };

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as("hours") < 1) {
          startsSequence = false;
        }

        if (previousDuration.as("hours") < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as("hours") < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <BroadMessageList
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        ></BroadMessageList>
      );

      i += 1;
    }

    return tempMessages;
  };

  return (
  <div className="unique_chat">
    <div className="web_message-list">
      <div className="web_message-list-container">{renderMessages()}</div>
      <div className="web_msg-sent-box">
         <img src={Camera} className = "camera_align"/> 
         <img src ={Attach} className = "attach_align"/> 
        <input
          type="search"
          className="web_managelist-conversation-search-input"
          placeholder="Type here...."
        ></input>
        <MdSend className="web_sent-icon" />
      </div>
      
    </div>
    </div>
  );
}
