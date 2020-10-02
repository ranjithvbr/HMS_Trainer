import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./TrainerAppointmentsmaster.css";
import Moment from "react-moment";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TrainerAppointmentsdetails from "./TrainerAppointmentsdetails";
// import Calendar from './TrainerAppoinment_calendar.jsx'
import DateFnsUtils from "@date-io/date-fns";
import Calendar from "./calendar";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default class TrainerAppointmentsmaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  render() {
    // var date = moment();
    // console.log(date);

    return (
      <div className="trainer">
        <div className="uploadmaster">
          <div className="uploadsmasterheader">
            <div className="titleuser">Appointments</div>
            <div className="date-function">
              <FaChevronLeft className="date-left-icon" />
              <label
                onClick={() => this.setState({ date: !this.state.date })}
                className="display-date_div"
              >
                {" "}
                <Moment format="DD MMM YY" date={this.state.date} />
              </label>
              <FaChevronRight className="date-right-icon" />
            </div>
          </div>
        </div>

        <div id="TrainerAppointmentsmaster">
          <TrainerAppointmentsdetails />
        </div>
        <div>
          <div className="trainer_calendar_container">
            <div className="trainer_calendar_div">
              <div>
                <div>
                  <Grid container justify="center">
                    {this.state.date ? <Calendar /> : null}
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
