import React from "react";
// import Avatar from '@material-ui/core/Avatar'
import avatar from "../../Images/prf.png";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import "./ProfileLogout.css";
import {withRouter} from "react-router-dom"

class ProfileLogout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      logout: false,
      trainer: JSON.parse(localStorage.getItem("trainer"))
 }; 

 
    this.wrapperRef = React.createRef();
 
    this.handleClickOutside = this.handleClickOutside.bind(this);
  } 

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      // this.props.onClose(false)
    }
  }
   componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }



  logoutOpen=()=> {
    this.setState({ logout: true });
  };
  // logoutClose =() => {
  //   this.props.onClose(false);
  //   localStorage.removeItem("trainerId");
  //   localStorage.removeItem("userId");
  //   localStorage.removeItem("trainer");
  //   this.props.logout(true);
  // };
  logoutClick = () => {
    window.localStorage.clear();
    window.location.assign('/trainermodule/?/')
    this.props.onClose()
  }

  // goToProfile =()=>{
  //   this.props.goToProfile()
  // }
  redirect = () => {

    this.props.history.push("/Home/back")
    this.props.onClose()
  }

 
  render() {
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;

    return (
      <div ref={this.wrapperRef}>
        <div className="avatar_div">
          <Paper className="avatar_container">
            <div className="profile_logout_container" >
              <img onClick={() => this.redirect()} className="profile_logout_image" src={this.props.profilePic != null ? this.props.profilePic : avatar} />
            </div>
            <div className="profile_logout_container1" >
              <div>
                <h6 onClick={() => this.redirect()} className="name_head">{this.props.userName && this.props.userName}</h6>
                <p onClick={() => this.redirect()}>{this.props.userEmail && this.props.userEmail}</p>
              </div>
            </div>
            <Divider />

            <div className="profile_logout_butt">
              <Button className="logout_butt" onClick={() => this.redirect()}>
                Profile
              </Button>

              <Button
                className="logout_butt"
                onClick={this.logoutClick}
              >
                Logout
              </Button>
            </div>

            <Divider />
            <div className="profile_logout_privacy ">
              <p>Privacy Policy Terms of Service</p>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
export default withRouter(ProfileLogout)