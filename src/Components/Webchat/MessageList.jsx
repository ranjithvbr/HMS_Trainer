import React from "../../../node_modules/react";
import "./MessageList.css";
import Trainee from "../../Images/trainee_img.jpg";

export default function MessageList(props) {
  const { data, isMine, startsSequence, endsSequence, showTimestamp } = props;

  return (
    <div
      className={[
        "message",
        `${isMine ? "mine" : ""}`,
        `${startsSequence ? "start" : ""}`,
        `${endsSequence ? "end" : ""}`
      ].join(" ")}
    >
      <div className="web_bubble-container">
        <div className="web_bubble">
          {data.author === "orange" ? (
            <img
              className="web_conversation-photo img-align-left"
              src={Trainee}    />
          ) : (
            <img
              className="web_conversation-photo img-align-right"
              src={Trainee} />
          )}
          {data.message}
        </div>
      </div>
    </div>
  );
}
