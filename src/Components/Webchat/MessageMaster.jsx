import React, { useEffect, useState } from "../../../node_modules/react";
// import Compose from "../Compose";
// import Toolbar from "../Toolbar";
// import ToolbarButton from "../ToolbarButton";
import MessageList from "./MessageList";
import moment from "../../../node_modules/moment";
import "./MessageMaster.css";
import { MdSend } from "../../../node_modules/react-icons/md";

const MY_USER_ID = "apple";

export default function MessageMaster(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    var tempMessages = [
      {
        id: 1,
        author: "apple",
        message: "Hello world! .",
        timestamp: new Date().getTime()
      },
      {
        id: 2,
        author: "orange",
        message: " Lets see what a reply looks like!",
        timestamp: new Date().getTime()
      },
      {
        id: 3,
        author: "orange",
        message:
          "Hello world! This is a long message that will hopefully get wrapped by our message .",
        timestamp: new Date().getTime()
      },
      {
        id: 4,
        author: "apple",
        message: "It looks like it wraps exactly as it is supposed to.",
        timestamp: new Date().getTime()
      },
      {
        id: 5,
        author: "apple",
        message: "Hello world! We will see how well it works.",
        timestamp: new Date().getTime()
      },
      {
        id: 6,
        author: "apple",
        message:
          "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
        timestamp: new Date().getTime()
      },
      {
        id: 7,
        author: "orange",
        message: "Hello world!  We will see how well it works.",
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
        <MessageList
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        ></MessageList>
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  };

  return (
    <div className="web_message-list">
      <div className="web_message-list-container">{renderMessages()}</div>
      <div className="web_msg-sent-box">
        <input
          type="search"
          className="web_managelist-conversation-search-input"
          placeholder="Type"
        ></input>
        <MdSend className="web_sent-icon" />
      </div>
    </div>
  );
}
