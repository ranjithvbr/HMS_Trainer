import React, { Component } from "react";
import BookingDetails from "./BookingDetails";
import { Paper } from "@material-ui/core";

export default class DealsMaster extends Component {
  render() {
    return (
      <div>
        <Paper>
          <div className="hms_trainer_header">
            <div className="titleuser">DEALS</div>
          </div>
          <BookingDetails />
        </Paper>
      </div>
    );
  }
}
