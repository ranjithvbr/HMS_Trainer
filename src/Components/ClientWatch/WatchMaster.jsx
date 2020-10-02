import React, { Component } from "react";
import "./WatchMaster.css";
import WatchDetails from "./WatchComp";
import dateFormat from "dateformat";

export default class WatchMaster extends Component {
  render() {
    console.log(dateFormat(new Date(), "dd mmm yyyy"));
    return (
      <div>
        <div className="watchmasterheader">
          <div className="titleuser">WATCH REPORT</div>
        </div>
        <WatchDetails/>
      </div>
    );
  }
}
