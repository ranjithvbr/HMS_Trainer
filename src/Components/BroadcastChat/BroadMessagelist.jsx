import React from "../../../node_modules/react";
import "./BroadMessagelist.css";
import Trainee from "../../Images/trainee_img.jpg";

export default function BroadMessageList(props) {
  const { data, isMine, startsSequence, endsSequence, showTimestamp } = props;

  return (
    <div
      className={[
        "message",
        `${isMine ? "mine" : "partner"}`,
        `${startsSequence ? "start" : ""}`,
        `${endsSequence ? "end" : ""}`
      ].join(" ")}
    >
     
      <div className="web_bubble-container">
        <div className="web_bubble">
          {console.log("img align",data.author)}
          {data.author === "orange" ? (
            <div >
             <img src={Trainee} className="web_conversation-photo img-align-left"/>
            </div>
          
              ) : (
          
          <div className="receive_msg">
                   <img className="web_conversation-photo img-align-right" src={Trainee}  />
            </div>
         
          )}
          <div className ="chat_message">
          {data.message}
          </div>
          {/* <div>{data.timestamp}</div> */}
        </div>
   
    </div>
    </div>
  );
}
