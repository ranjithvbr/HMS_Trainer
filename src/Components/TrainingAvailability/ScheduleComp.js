import React, { Component } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Select } from "antd";
import { message, notification } from "antd";
import { Input } from "antd";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import links from "../../helpers/Constant";
// import { links.APIURL } from "../../App";
import TextField from "@material-ui/core/TextField";
import "./ScheduleComp.css";
import { FiSave } from "react-icons/fi";
import dateFormat from "dateformat";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Language";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const { Option } = Select;
const current_date = dateFormat(new Date(), "hh:mm tt");

class ScheduleComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      durationError: "",
      api: false,
      ipaddress: "126.187.50.1",
      vipError: "",
      slotsError: "",
      details: [],
      days: [],
      home: 0,
      loc: 0,
      lang: 0,

      appointmentData: [
        {
          fromtime: null,
          totime: null,
          slotduration: "",
          NoOfslots: null,
          isvip: null,
        },
      ],
      checkedA: false,
      checkedB: false,
      checkedC: false,
      checkedD: false,
      checkedE: false,
      checkedF: false,
      checkedG: false,
      checkedH: false,
    };
  }

  generateAlert = (description) => {
    notification.success({
      message: "Success",
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  validate = (data) => {
    var noerror = true;
    if (!data.fromtime) {
      alert("Enter Valid From Time");
      return false;
    } else if (!data.totime) {
      alert("Enter Valid To Time");
      return false;
    } else if (!data.slotduration) {
      alert("Enter Duration In Minutes");
      return false;
    } 


    else if (data.home==0 &&  data.lang==0 && data.loc==0) {
      alert("Select Training Mode");
      return false;
    } 
    



    // else if(!data.NoOfslots ){
    //   alert("Slot Duration")
    //   return false;
    // }
    // else if (!data.isvip) {
    //   alert("Select Appointment type");
    //   return false;
    // }
    else if (this.props.packageId == null) {
      alert("Select Package Id");
      return false;
    } else if (data.days.filter((obj) => obj.checked == true).length == 0) {
      alert("Choose The Appointment Days");
      return false;
    }
    return noerror;
  };

  componentWillReceiveProps() {
    //  if(this.props.addrow){
    //    this.addrows()
    // var noerror=true;
    // if(!data.fromtime === this.state.appointmentData.fromtime){
    //   alert("check")
    //   data.fromtimeerror="error";
    //   return false;
    // }else if(data.days.filter((obj)=>obj.checked==true).length==0){
    //   alert("choose any week days...");
    //   return false;
    // }
    // return noerror;
    //  }
  }
  componentDidMount() {
    // this.getDetails();
  }
  addrows = () => {
    // this.setState({
    //   appointmentData:[...this.state.appointmentData,{"fromtime":"","totime":"","slotduration":"","NoOfslots":"","isvip":"","checkedA":false,"checkedB":false,"checkedC":false,"checkedD":false,"checkedE":false,"checkedF":false,"checkedG":false,"checkedH":false}]
    // })
  };

  //delete api
  deleteRows = (id) => {
    if (id) {

      var confirm = window.confirm("Are you sure want to delete");
      if (confirm) {
        fetch(links.APIURL + "trainer/deleteAppointmentSchedule", {
          method: "delete",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        })
          .then((response) => response.json())
          .then((responsejson) => {
            // console.log(responsejson);
            if (responsejson.status == 1) {
              this.generateAlert("Appointment Deleted Successfully");
              this.props.sucessProp(true);
            } else {
              // alert("problem while requesting...");
              this.generateAlert("This Package is Booked");
            }
          });
      }
    }
  };
  handleHomeChange = (event) => {
    console.log(event.target.checked);
    this.setState({
      home: event.target.checked ? 1 : 0,
    });
  };

  handleLangChange = (event) => {
    console.log(event.target.checked);
    this.setState({
      lang: event.target.checked ? 2 : 0,
    });
  };

  handleLocChange = (event) => {
    console.log(event.target.checked);
    this.setState({
      loc: event.target.checked ? 3 : 0,
    });
  };

  converthoursminutes = (hours, minutes) => {
    var date = new Date();
    date = new Date(date.setHours(hours));
    date = new Date(date.setMinutes(minutes));
    return date;
  };
  getTimeIntervals = (time1, time2, slots) => {
    var arr = [];
    while (time1 < time2) {
      arr.push(time1.toTimeString().substring(0, 5));
      time1.setMinutes(time1.getMinutes() + parseInt(slots));
    }
    return arr;
  };

  // send api

  sendDetails = (data) => {
    if (this.state.api) return;
    const isValid = this.validate(data);
    var filterdays = data.days.filter(
      (obj) => obj.checked == true && obj.id != 8
    );
    this.setState({ api: true });
    console.log("iddd", this.props.clinic);
    if (isValid) {
      var daysObject = [];
      filterdays.map((obj2, i) => {
        var tests = {};
        tests.dayId = obj2.id;
        daysObject.push(tests);
      });

      console.log("fufu", {
        trainerId: this.props.clinic,
        fromTime: data.fromtime,
        toTime: data.totime,
        timeDuration: data.slotduration,
        slotsCount: data.NoOfslots,
        days: daysObject,
        packageId: this.props.packageId,
        isVip: data.isvip,
        createdBy: localStorage.getItem("userId"),
        trainingMode: data.home + "," + data.lang + "," + data.loc,
        ipaddress: "126.187.50.1",
        modifiedby: "4",
        appointmentScheduleId: data.id,
      });

      var data = {
        trainerId: this.props.clinic,
        fromTime: data.fromtime,
        toTime: data.totime,
        timeDuration: data.slotduration,
        slotsCount: data.NoOfslots,
        days: daysObject,
        packageId: this.props.packageId,
        isVip: data.isvip,
        createdBy: localStorage.getItem("userId"),
        trainingMode: data.home + "," + data.lang + "," + data.loc,
        ipaddress: "126.187.50.1",
        modifiedby: "4",
        appointmentScheduleId: data.id,
      };
      console.log("inserting data", data);

      fetch(
        links.APIURL +
          (data.appointmentScheduleId
            ? "updateTrainerAppointmentSchedule"
            : "addTrainerAppointmentSchedule"),
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("success or not", responseJson);
          if (responseJson.status == 1) {
            this.generateAlert(
              data.appointmentScheduleId
                ? "Appointment Updated Successfully"
                : "Appointment Inserted Successfully"
            );

            this.props.sucessProp(true);

            setTimeout(() => {
              this.setState({ api: false });
            }, 2000);
          } else {
            this.setState({ api: false });
            notification.error({
              message: "Process failed",
              description: responseJson.msg,
              onClick: () => {
                console.log("Notification Clicked!");
              },
            });
          }

          // alert(data.id ? "updated successfully" : "inserted successfully");
        });

      console.log("sdfkjsdkfjskdfjksfd", data);
    } else {
      this.setState({ api: false });
    }
  };

  handleChange = (event, index, key, checkindex) => {
    this.props.onChange(event, index, key, checkindex);
  };

  editDetails = (id, data) => {
    var confirm = window.confirm("Are you sure want to edit");
  };

  render() {
    console.log(dateFormat(new Date(), "hh:mm tt"));
    // alert(JSON.stringify(this.props.data))
    const { data, index , trainingModeDetails } = this.props;
    return (
      <div>
        <div>
          <div className="AvailabilityDetailsDiv">
            <TableRow>
              <TableCell
                component="th"
                id={""}
                scope="row"
                padding="none"
                style={{ width: "13vw" }}
              >
                <div className="Availability-sno-wrapper"> {index + 1} </div>
              </TableCell>

              <TableCell align="right" style={{ width: "16vw" }}>
                <TextField
                  name="fromtime"
                  type="time"
                  className="timepick"
                  value={data.fromtime}
                  onChange={(e) => this.handleChange(e, index, "fromtime")}
                  style={{ width: 90 }}
                />
                {data.fromtimeerror && <div>{data.fromtimeerror}</div>}
              </TableCell>

              <TableCell align="right" style={{ width: "20vw" }}>
                <TextField
                  name="totime"
                  type="time"
                  className="timepick"
                  value={data.totime}
                  onChange={(e) => this.handleChange(e, index, "totime")}
                  style={{ width: 90 }}
                />
              </TableCell>

              <TableCell align="right" style={{ width: "22vw" }}>
                <input
                  value={data.slotduration}
                  className="Abi"
                  name="slotduration"
                  onChange={(e) => this.handleChange(e, index, "slotduration")}
                  style={{ width: 60 }}
                />
                <label className="slot-duration-unit_label">Min</label>
                <div>{this.state.durationError}</div>{" "}
              </TableCell>

              <TableCell align="right" style={{ width: "14vw" }}>
                <input
                  className="noofslot"
                  value={data.NoOfslots}
                  onChange={(e) => this.handleChange(e, index, "NoOfslots")}
                  name="NoOfslots"
                  style={{ width: 60 }}
                />
                <div>{this.state.slotsError}</div>
              </TableCell>
              <TableCell align="right" style={{ width: "20vw",display:"flex" }}>
                <div className="training_category_fourth">
                {trainingModeDetails &&trainingModeDetails.includes(1) &&
                <>
                  <Checkbox
                    checked={data.home == 1 ? true : false}
                    className="checkbox_height"
                    onChange={(e) => this.handleChange(e, index, "home")}
                    value={1}
                  />
                  <div className="icon_name">
                    <HomeIcon className="home_icon_clr" />
                    <p>Home</p>
                  </div>
                  </>
                }
                {trainingModeDetails && trainingModeDetails.includes(2) &&
                <>
                  <Checkbox
                    checked={data.lang == 2 ? true : false}
                    className="checkbox_height"
                    onChange={(e) => this.handleChange(e, index, "lang")}
                    value={2}
                  />
                  <div>
                    <LanguageIcon className="lang_icon_clr" />
                    <p>Online</p>
                  </div>
                  </>
                }
                {trainingModeDetails && trainingModeDetails.includes(3) &&
                <>
                  <Checkbox
                    checked={data.loc == 3 ? true : false}
                    className="checkbox_height"
                    onChange={(e) => this.handleChange(e, index, "loc")}
                    value={3}
                  />
                  <div>
                    <LocationOnIcon className="location_icon_clr" />
                    <p>Center</p>
                  </div>
                  </>
                }
                </div>
              </TableCell>

              {/* <TableCell align="right" style={{ width: "13vw" }}>
                <div>
                  <Select
                    className="appointmenttype"
                    onChange={(data) => this.handleChange(data, index, "isvip")}
                    value={[data.isvip]}
                    style={{ width: 110 }}
                  >
                    <Option className="appointmenttype" value="2" id="2">
                      Regular
                    </Option>
                    <Option className="appointmenttype" value="1" id="1">
                      Vip
                    </Option>
                  </Select>{" "}
                </div>
                <div>{this.state.vipError}</div>
              </TableCell> */}
            </TableRow>

            <TableRow hover role="checkbox">
              <TableCell align="right" colSpan={8}>
                <FormGroup row className="Availability-checkbox-row-div">
                  {data.days &&
                    data.days.map((obj, dayindex) => {
                      return (
                        <FormControlLabel
                          style={{ width: 80 }}
                          control={
                            <Checkbox
                              name="checkedA"
                              value={obj.value}
                              onChange={() =>
                                this.handleChange(obj, index, "days", dayindex)
                              }
                              checked={obj.checked}
                            />
                          }
                          label={obj.label}
                        />
                      );
                    })}
                </FormGroup>
                <div className="delete_container">
                  {data.id  && (
                    <EditIcon
                      className="save_btn"
                      className="save_btn"
                      onClick={() => this.sendDetails(data)}
                    />
                  )}

                  {!data.id  && (
                        <FiSave
                          className="save_btn"
                          onClick={() => this.sendDetails(data)}
                        ></FiSave>
                      )}

                  <DeleteIcon
                    className="delete_icon"
                    onClick={() => this.deleteRows(data.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          </div>
        </div>
      </div>
    );
  }
}

export default ScheduleComp;
