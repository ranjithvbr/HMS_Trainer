import React, { Component } from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
import './ProfileComp.css'
import Paper from "@material-ui/core/Paper";
// import Calendar from './Calendar';
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
class ProfileComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr"
    };
  }

  render() {
  

    return (
      <div className="deal_listcreatead">
          <Paper className="profile_background">
             <div className="profileback_first">PROFILE</div>
            
          </Paper>
          </div>
      
    );
  }
}

export default ProfileComp;
