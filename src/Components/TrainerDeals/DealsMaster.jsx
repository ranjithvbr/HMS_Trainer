import React, { Component } from "react";
import BookingDetails from "./BookingDetails";
import "./DealsMaster.css";

import dateFormat from "dateformat";

export default class DealsMaster extends Component {
  render() {
    console.log(dateFormat(new Date(), "dd mmm yyyy"));
    return (
      <div>
        <div className="hms_trainer_header">
          <div className="center_headline">DEALS</div>
        </div>
        <BookingDetails />
      </div>
    );
  }
}
