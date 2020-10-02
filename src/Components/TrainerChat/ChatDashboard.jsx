import React, { Component } from "react";
import "./ChatDashboard.css";
import "antd/dist/antd.css";
import Moment from "react-moment";
import Chatwindow from "./Chatwindow";
import { Input } from "antd";
import dateFormat from 'dateformat';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import Labelbox from "../../helpers/labelbox/labelbox";
import Paper from '@material-ui/core/Paper';
const current_date=(dateFormat(new Date(),"dd mmm yyyy"))

class ChatDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "rrr"
    };
  }

  render() {

    const { Search } = Input;
    console.log(dateFormat(new Date(),"dd mmm yyyy"))
    return (
      <div className="trainer_chat">
        <Paper>  
  {/*APPOINTMENT HEADING  */}
          <div className="media_service_head">
          <div className="titleuser">
               <div>CHATS</div>
          </div>

{/* SEARCH AREA */}
      
          </div>
        </Paper>
        <Chatwindow />
      </div>
    );
  }
}

export default ChatDashboard;
