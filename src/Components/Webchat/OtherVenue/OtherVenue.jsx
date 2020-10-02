import React, { Component } from "react";
import Logo from "../../../Images/Logo.png";
import "./OtherVenue.css";

class OtherVenue extends Component {
  render() {
    return (
      <div>
        <div className="other_venue">
          <img src={Logo} alt="error" className="other_venue_img" />
          <div className="other_venue_text">
            Eclat Cafe <div>Anna Nagar,Chennai</div>
          </div>
        </div>
        <div className="other_venue">
          <img src={Logo} alt="error" className="other_venue_img" />
          <div className="other_venue_text">
            Eclat Cafe <div>Anna Nagar,Chennai</div>
          </div>
        </div>
        <div className="other_venue">
          <img src={Logo} alt="error" className="other_venue_img" />
          <div className="other_venue_text">
            Eclat Cafe <div>Anna Nagar,Chennai</div>
          </div>
        </div>
        <div>
          <img src={Logo} alt="error" className="other_venue_img" />
        </div>
      </div>
    );
  }
}

export default OtherVenue;
