import React, { Component } from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
import './AdvertisementMaster.css'
import Moment from "react-moment";
import { Input } from "antd";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import dateFormat from 'dateformat';
import Paper from "@material-ui/core/Paper";
import BookingDetails from './BookingDetails'
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
const current_date=(dateFormat(new Date(),"dd mmm yyyy"))
class RevenueMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr"
    };
  }

  render() {
    const { Option } = Select;
    const { Search } = Input;
    console.log(dateFormat(new Date(),"dd mmm yyyy"))
    return (
      <div className="trainer_dashboard">
          <Paper>
          <div
             className="hms_trainer_header">
                <div className="titleuser">ADVERTISEMENT BOOKING</div>     
          </div>
          <BookingDetails/>
          </Paper>
          </div>
      
    );
  }
}

export default RevenueMaster;
