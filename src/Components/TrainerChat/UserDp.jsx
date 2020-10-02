import React, { Component } from "react";
import Trainee from '../../Images/trainee_img.jpg';
import "./UserDp.css";
import ProfileSearch from "./ProfileSearch";

class UserDp extends Component {
  render() {
    return (
      <div className="first_side_chat">
        <ProfileSearch />
        <div className="user_profile">
          <img src={Trainee} alt="error" className="profile_img" />
          <div className = "profile_name_workout">
             <div className="profile_name">Warina</div>
             <div className="profile_workout">Super Slim</div>
          </div>
        </div>

        <div className="user_profile">
          <img src={Trainee} alt="error" className="profile_img" />
          <div className = "profile_name_workout">
             <div className="profile_name">Naser</div>
             <div className="profile_workout">6 Pack Abs</div>
          </div>
        </div>

        <div className="user_profile">
          <img src={Trainee} alt="error" className="profile_img" />
          <div className = "profile_name_workout">
             <div className="profile_name">Vinay</div>
             <div className="profile_workout">Super Slim</div>
          </div>
        </div>

        <div  className="user_profile">
          <img src={Trainee} alt="error" className="profile_img" />
          <div className = "profile_name_workout">
             <div className="profile_name">Bader</div>
             <div className="profile_workout">Mega Man</div>
          </div>
        </div>
      </div>

    );
  }
}

export default UserDp;
