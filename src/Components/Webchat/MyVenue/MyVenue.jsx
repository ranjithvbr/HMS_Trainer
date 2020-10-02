import React, { Component } from "react";
import Logo from "../../../Images/Logo.png";
import "./MyVenue.css";

class MyVenue extends Component {
  render() {
    return (
      <div>
        <div className="my_venue">
          <img src={Logo} alt="error" className="my_venue_img" />
          <div className="my_venue_text">
            Eclat Cafe <div>Anna Nagar,Chennai</div>
          </div>
        </div>
        <div className="my_venue">
          <img src={Logo} alt="error" className="my_venue_img" />
          <div className="my_venue_text">
            Eclat Cafe <div>Anna Nagar,Chennai</div>
          </div>
        </div>
        <div className="my_venue">
          <img src={Logo} alt="error" className="my_venue_img" />
          <div className="my_venue_text">
            Eclat Cafe <div>Anna Nagar,Chennai</div>
          </div>
        </div>
        <div>
          <img src={Logo} alt="error" className="my_venue_img" />
        </div>
      </div>
    );
  }
}

export default MyVenue;
