import React, { Component } from "react";
import Logo from "../../Images/Logo.png";
import "./UserDp.css";
import ProfileSearch from "./ProfileSearch";

class UserDp extends Component {
  render() {
    return (
      <div>
        <ProfileSearch />
        <div className="user_profile">
          <img src={Logo} alt="error" className="profile_img" />
          <div className="user_profile_text">
            Eclat Cafe <div>Anna Nagar,Chennai</div>
          </div>
        </div>
        <div className="user_profile">
          <img src={Logo} alt="error" className="profile_img" />
          <div className="user_profile_text">
            Eclat Cafe <div>Anna Nagar,Chennai</div>
          </div>
        </div>
        <div className="user_profile">
          <img src={Logo} alt="error" className="profile_img" />
          <div className="user_profile_text">
            Eclat Cafe <div>Anna Nagar,Chennai</div>
          </div>
        </div>
        <div>
          <img src={Logo} alt="error" className="profile_img" />
        </div>
      </div>
    );
  }
}

export default UserDp;
