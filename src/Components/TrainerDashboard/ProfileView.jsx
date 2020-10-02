import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import Trainee from '../../Images/trainee_img.jpg'
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import "./ProfileView.css";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
const styles = {};

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cancel: null, data: props.view ? props.view[0] : {} };
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  
  open = () => {
    this.setState({ view: true })
  }
  onclose = () => {
    this.setState({ view: false })
  }
  render() {
    const styles = "";
    const { classes, onClose, cancel, selectedValue, view, ...other } = this.props;
    console.log(view)

    return (
      <div className="trainer_popup_details">
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
          className="profile_modal_dashboard"
        >
          <CloseIcon
            className="modal_custom_close"
            onClick={this.props.onClose}
          />
          <div className="trainer">
            <img src={view.profile_image!=null ?view.profile_image:Trainee} className="img_align_dashboard" />
          </div>
          <Grid>
            <div className="trainer_dashboard_view">
              {/*BODY OF MODAL  */}
              <div className="trainer_details_container">
                <div className="trainer_detailsdiv">
                  <h3 className="trainer_name">{view.patientName}</h3>
                  <p className="trainer_age">{view.age} Years</p>
                  <p className="booked_details_font">Booked Details</p>
                </div>


                {/* FIRST PART FIRST DIV */}
                <div className="divider_div">
                  <Grid className="d-flex">
                    <Grid item md={6} sm={6}>
                      <div className="trainerappointment_details">
                        <p className="trainerappointment_details">
                          Booked Date
                          <span className="trainer_date">
                            {moment(view.book_date).format("DD MMM YYYY")}
                          </span>
                        </p>
                      </div>
                      <div className="trainerappointment_details-div">
                        <p className="trainerappointment_details">
                          Booked Time
                          <span className="trainer_date">
                            {moment(view.from_time, "HH:mm").format("hh:mm a")}
                          </span>
                        </p>
                      </div>
                    </Grid>
                    {/* FIRST PART  SECOND DIV */}
                    <Grid item md={6} sm={6} className="book_date_adjust">
                      <div>
                        <p className="trainerappointment_details">
                          From Date
                          <span className="trainer_date">
                            {moment(view.from_date).format("DD MMM YYYY")}
                          </span>
                        </p>
                      </div>
                      <div className="fromdate_adjust-div">
                        <p className="trainerappointment_details">
                          To Date
                          <span className="trainer_date_todate">
                            {moment(view.to_date).format("DD MMM YYYY")}
                          </span>
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <div className="divider_custom"></div>
                  </div>
                  <div className="divider_root" />
                  {/* SECOND PART FIRST DIV */}

                  <Grid className="d-flex">
                    <Grid item md={6} sm={6}>
                      <div className="trainerappointment_details">
                        <p className="trainerappointment_details_cat">
                          Training Category
                          <span className="trainer_date">
                            {view.trainingCategoryName}
                          </span>
                        </p>
                      </div>
                      <div className="trainerappointment_details-div">
                        <p className="trainerappointment_details">
                          Training Mode
                          <span className="trainer_date_in">
                            Home
                          </span>
                        </p>
                      </div>
                      <div className="trainerappointment_details">
                        <p className="trainerappointment_details">
                         Total Sessions
                          <span className="trainer_date_home">{view.tr_session}</span>
                        </p>
                      </div>
                    </Grid>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "1%",
                      }}
                    >
                      <div className="divider_custom_right"></div>
                    </div>
                    {/* FIRST PART  SECOND DIV */}
                    <Grid item md={6} sm={6} className="book_date_adjust">
                      <div>
                        <p className="trainerappointment_details">
                        Training 
                          <span className="trainer_date">
                          {view.trainingName}
                          </span>
                        </p>
                      </div>
                      <div className="fromdate_adjust-div">
                        <p className="trainerappointment_details">
                          Package
                          <span className="trainer_book_date">
                           {view.tr_package_name}
                          </span>
                        </p>
                      </div>
                      <div className="fromdate_adjust-div">
                        <p className="trainerappointment_details">
                          Total Cost
                          <span className="trainer_book_bill">
                            {view.amount} KWD
                          </span>
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </Grid>
        </Dialog>
      </div>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(ProfileView);
