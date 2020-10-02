import React, { Component } from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
import "./Profilepage.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { TiLocation, MdLocationOn, MdLocalPhone } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import EditIcon from "@material-ui/icons/Edit";
import Trainee from "../../Images/trainee_img.jpg";
import Modalcomp from "./ProfileModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Email from "../../Images/inbox.svg";
import links from "../../helpers/Constant";
import axios from "axios";
import moment from "moment";

import LanguageIcon from "@material-ui/icons/Language";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HomeIcon from "@material-ui/icons/Home";
import CircularProgress from "@material-ui/core/CircularProgress";

class Profilepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr",
      open: false,
      trainerId: localStorage.getItem("trainerId"),
      userdata: JSON.parse(localStorage.getItem("trainer")),
      tableData: {},
      responseAllData: [],
      vendor_profile_path: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.getTableData();
  }

  getTableData = () => {
    var self = this;
    this.setState({ loading: true });
    axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/getTrainerDetails",
      data: {
        trainerId: this.state.trainerId,
      },
    }).then((response) => {
      console.log(response.data.data[0], "response_data");
      this.setState({ loading: false });

      self.setState(
        {
          tableData: response.data.data[0],
        },
        () => console.log("pushed", response.data.data)
      );
    });
  };

  componentWillReceiveProps() {
    console.log(this.props, "getdatacall");

    if (this.props.getdatacall) {
      this.getTableData();
    }
  }

  handleopen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  savefile = (file) => {
    this.setState({ vendor_profile_path: file });
  };

  check = (data) => {
    if (Object.keys(this.state.tableData).length > 0) {
      var training_mode = this.state.tableData.training_mode;
      return training_mode.match(data);
    } else return false;
  };

  render() {
    const { tableData, loading } = this.state;
    console.log("table", tableData);

    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      );
    }

    return (
      <div className="deal_listcreatead">
        <Paper className="profile_background">
          <div className="profileback_first">PROFILE</div>

          <div className="profilepaper_container">
            <Paper className="profilebackground">
              <Grid container spacing={4} className="total">
                <Grid item xs={12} md={5}>
                  <div className="trainee_image_container">
                    <div className="trainee_image_div">
                      <img
                        className="trainee_image"
                        src={
                          tableData.vendor_profile_path != null
                            ? tableData.vendor_profile_path
                            : ""
                        }
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={7} className="addtrainee_gridcontainer">
                  <div className="addtraineee_containerdiv">
                    <div className="icon_edit">
                      <EditIcon className="icon" onClick={this.handleopen} />
                    </div>
                    <div className="profile_details_left_align">
                      <div>
                        <h1 className="trainee_head">
                          {tableData.trainerName}{" "}
                        </h1>
                        <div className="profile_age_details">
                          <h5>
                            <MdLocationOn className="group_icons" />
                          </h5>
                          <p className="trainee_text">
                            {tableData.vendor_address}{" "}
                            <span className="elipse">...</span>
                          </p>
                        </div>
                        <div className="profile_age_details">
                          <h5>
                            <MdLocalPhone className="group_icons" />
                          </h5>
                          <p className="trainee_text">
                            {tableData.vendor_phone}{" "}
                          </p>
                        </div>
                        <div className="profile_age_details">
                          <h5>
                            <img
                              src={Email}
                              className="group_icons inbox_icon"
                            />
                          </h5>
                          <p className="trainee_text">
                            {tableData.vendor_email}{" "}
                          </p>
                        </div>
                        <div className="profile_age_details">
                          <h5>
                            <LanguageIcon className="group_icons" />
                          </h5><p className="trainee_text">
                            {tableData.vendor_website}{" "}
                          </p>
                          <p className="trainee_text">
                            {/* {tableData.vendor_phone}{" "} */}
                          </p>
                        </div>
                      </div>

                      <div>
                        <hr></hr>
                        <div className="traing_home_flex">
                          <span className="traing_mode">Training Mode</span>

                          {this.check(1) && (
                            <div style={{textAlign:'center'}}>
                              <HomeIcon className="home_icon" />
                              <p style={{margin:"0px 5px 0px 10px"}} className="trainingmode_text">Home</p>
                            </div>
                          )}

                          {this.check(2) && (
                            <div style={{textAlign:'center'}}>
                              <LanguageIcon className="lang_icon_clr" />
                              <p style={{margin:"0px 5px 0px 5px"}} className="trainingmode_text">Online</p>
                            </div>
                          )}

                          {this.check(3) && (
                            <div style={{textAlign:'center'}}>
                              <LocationOnIcon className="location_icon_clr" />
                              <p style={{margin:"0px 5px 0px 5px"}} className="trainingmode_text">Center</p>
                            </div>
                          )}
                        </div>
                        <hr></hr>
                        <div className="">
                          <p className="trainee_text1">
                            <span className="traing_mode">
                              Training Category :
                            </span>{" "}
                            {this.state.userdata.trainingCategory}
                            <br></br>
                            <span className="traing_mode">Training :</span>{" "}
                            {this.state.userdata.trainingName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </Paper>
        <Modalcomp
          open={this.state.open}
          onClose={this.handleClose}
          editdata={this.state.tableData}
          title="gfffffffffffffh"
          savefile={this.savefile}
          getdatacall={this.getTableData}
          profileDetails={this.props.profileDetails}
        />
      </div>
    );
  }
}

export default Profilepage;
