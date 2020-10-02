/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import plus from "../../Images/plus.png";
import Grid from "@material-ui/core/Grid";
import { Select } from "antd";
import Axios from "axios";
import "./AppointmentMaster.css";
// import { apiurl } from "../../App";
import AppointmentDetails from "./AppointmentDetails";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Language";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import links from "../../helpers/Constant";
const { Option } = Select;

// function handleChange(value) {
//   console.log(`selected ${value}`);
// }
const daysjson = [
  { id: 8, label: "ALL", checked: false },
  { id: 7, label: "SUN", checked: false },
  { id: 1, label: "MON", checked: false },
  { id: 2, label: "TUE", checked: false },
  { id: 3, label: "WED", checked: false },
  { id: 4, label: "THU", checked: false },
  { id: 5, label: "FRI", checked: false },
  { id: 6, label: "SAT", checked: false },
  
];


const appdetails = {
  fromtime: "",
  totime: "",
  home: 0,
  loc: 0,
  lang: 0,
  slotduration: "",
  NoOfslots: "",
  isvip: 0,
  days: JSON.parse(JSON.stringify(daysjson)),
};
export default class Availabilitymaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: 0,
      loc: 0,
      lang: 0,
      addrow: false,
      date: "rrr",
      data: [],
      clinic: null,
      clinicData: [],
      appDetails: [JSON.parse(JSON.stringify(appdetails))],
      trainerId: localStorage.getItem("trainerId"),
      trainingCatId: JSON.parse(localStorage.getItem('trainer')).tr_training_category_id,
      trainingId: JSON.parse(localStorage.getItem('trainer')).tr_training_id,
      userdata: JSON.parse(localStorage.getItem('trainer')),
      packageId: null,
      training: [
        
      ],
      category: [
        
      ],
      package: [
        {
          trainerPackageId: "",
          tr_package_name: "Select",
        },
      ],
    };
  }

  converthoursminutes = (hours, minutes) => {
    var date = new Date();
    date = new Date(date.setHours(hours));
    date = new Date(date.setMinutes(minutes));
    return date;
  };

  checkCount =(index,key)=>{
    var appDetails = this.state.appDetails;
    var countTick=0;
    if (appDetails[index]['home']==1)
    countTick++;

    if (appDetails[index]['lang']==2)
    countTick++;

    if (appDetails[index]['loc']==3)
    countTick++;

    return countTick;

  }

  updateDetails = (event, index, key, checkindex) => {

    console.log(index,"appdetails")
    console.log(key,"appdetails")

    var appDetails = this.state.appDetails;
   

    if (key == "fromtime" || key == "totime" || key == "slotduration") {
      appDetails[index][key] = event.target.value;
      appDetails[index].NoOfslots = this.getHoursInterval(
        appDetails[index].fromtime,
        appDetails[index].totime,
        appDetails[index].slotduration
      );
     
    } else if (key == "isvip") {
      appDetails[index][key] = event;
      
    } 
    else if (key == "home") {
    
      // if (this.checkCount(index, key) >= 1 && appDetails[index][key]!=1)
      // {
      //   alert('Select Any One Mode')
      //   return ;
      // }
      appDetails[index][key] = event.target.checked ? 1 : 0;
      appDetails[index].lang =  0;
      appDetails[index].loc =  0;

      
    }
    else if (key == "lang") {
      // if (this.checkCount(index, key) >= 1 && appDetails[index][key] != 2) {
      //   alert('Select Any One Mode')
      //   return;
      // }

      appDetails[index][key] = event.target.checked ? 2 : 0;
      appDetails[index].home =  0;
      appDetails[index].loc =  0;

    }
     else if (key == "loc") {
      // if (this.checkCount(index, key) >= 1 && appDetails[index][key] != 3) {
      //   alert('Select Any One Mode')
      //   return;
      // }
      appDetails[index][key] = event.target.checked ? 3 : 0;
      appDetails[index].lang =  0;
      appDetails[index].home =  0;
      
    }

    
    
    else if (key == "days") {
      
      console.log(event, checkindex);
      if (event.id == 8) { 
       
        if (event.checked == false) {
          appDetails[index][key].map((obj) => {
            var obj1 = obj;
            obj1.checked = true;
            return obj1;
          });
        } else {
          appDetails[index][key].map((obj) => {
            var obj1 = obj;
            obj1.checked = false;
            return obj1;
          });
        }
        console.log(appDetails);
      } else {
       
        appDetails[index][key][0].checked = false;
        appDetails[index][key][checkindex].checked = !event.checked;
      }
    } else {
     
      appDetails[index][key] = event.target.value;
    }
    this.setState({ appDetails });
  };

  componentDidMount = () => {
    
    // this.getCategoryList();
    this.getPackageList()
  };

  AddRow = () => {
    var appDetails = this.state.appDetails;
    appDetails.unshift(JSON.parse(JSON.stringify(appdetails)));
    this.setState({ appDetails });
    // this.setState({addrow:true})
  };

  getHoursInterval = (fromtime, totime, slotduration) => {
    console.log("intervaldata", fromtime, totime, slotduration);
    slotduration = slotduration ? parseInt(slotduration) : 0;
    if (fromtime != null && totime != null && slotduration != null) {
      var splitfromtime = fromtime.split(":");
      var splittotime = totime.split(":");
      var convertedfromtime = this.converthoursminutes(
        splitfromtime[0],
        splitfromtime[1]
      );
      var convertedtotime = this.converthoursminutes(
        splittotime[0],
        splittotime[1]
      );
      var arr = 0;
      var gettotalminutes = this.getTimeIntervals(
        convertedfromtime,
        convertedtotime,
        1
      );
      if (parseInt(slotduration) > 0) {
        arr = Math.floor(gettotalminutes.length / slotduration);
      }
      return arr;
      // this.setState({NoOfslots:arr})
    }
  };

  getTimeIntervals = (time1, time2, slots) => {
    var arr = [];
    while (time1 < time2) {
      arr.push(time1.toTimeString().substring(0, 5));
      time1.setMinutes(time1.getMinutes() + parseInt(slots));
    }
    return arr;
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

  //get api

  getDetailsByClinic = (clinicId) => {
    fetch(links.APIURL + "getTrainerAppointmentSchedule", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trainerId: this.state.trainerId,
        packageId: this.state.packageId,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let responseData = responseJson.data;
        console.log("responsecheck", responseData);
        var details = this.state.details;
        if (responseJson.status == 1 && responseData.length > 0) {
          console.log("response", responseJson);
          let responsedetails = responseData;
          var appDetails = this.state.appDetails;
          var detailsarray = [];
          responsedetails.map((val) => {
            var mode_array = val.tr_training_mode.split(",");
            console.log('modd',mode_array)
            var obj = JSON.parse(JSON.stringify(appdetails));
            obj.fromtime = val.tr_from_time;
            obj.totime = val.tr_to_time;
            obj.slotduration = val.tr_slot_duration;
            obj.NoOfslots = val.tr_no_of_slots;
            obj.isvip = 0;
            obj.home = mode_array.length >= 1 ? mode_array[0] : 0;
            obj.lang = mode_array.length >= 2 ? mode_array[1]: 0;
            obj.loc = mode_array.length >= 3 ? mode_array[2] : 0;
            obj.id = val.appointmentScheduleId;
            obj.days = obj.days.map((obj2) => {
              if (val.daysList.length > 0) {
                var obj1 = obj2;
                if (val.daysList.length == 7) {
                  obj1.checked = true;
                } else {
                  console.log("id", obj2.id.toString());
                  console.log("day", obj2);
                  var findIndex = val.daysList.findIndex(
                    (item) => item.tr_day_id == obj2.id.toString()
                  );
                  if (findIndex != -1) obj1.checked = true;
                }
                return obj1;
              } else {
                return obj2;
              }
            });
            detailsarray.push(obj);
          });
          this.setState({ appDetails: detailsarray }, () =>
            console.log("called ", detailsarray)
          );
        } else {
          var detailsarray = [];
          var obj = JSON.parse(JSON.stringify(appdetails));
          detailsarray.push(obj);
          this.setState({ appDetails: detailsarray });
        }
      });
  };

  handleChange = (data, key) => {
    if (key == 0) {
      this.setState(
        {
          trainingCatId: data,
        },
        () => {
          this.getTrainingList();
        }
      );
    } else if (key == 1) {
      this.setState(
        {
          trainingId: data,
        },
        () => {
          this.getPackageList();
        }
      );
    } else if (key == 2) {
      this.setState(
        {
          packageId: data,
        },
        () => {
          this.getDetailsByClinic();
        }
      );
    }

    var trainingmode = this.state.fulltrainingMode.find((val)=>{
      return val.trainerPackageId === data
    })

    this.setState({
      trainingMode:trainingmode.tr_training_mode
    })
  };

  getCategoryList = () => {
    var self = this;
    Axios({
      method: "POST", //get method
      url: links.APIURL + "getTrainerCategoryList",
      data: {
        trainerId: this.state.trainerId,
      },
    }).then((response) => {
      if (response.data.status) {
        this.setState({
          category: response.data.data,
        });
      }
    });
  };

  getTrainingList = () => {
    var self = this;
    Axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/getTrainingListCategoryBased",
      data: {
        trainerId: this.state.trainerId,
        trainingCatId: this.state.trainingCatId,
      },
    }).then((response) => {
      if (response.data.status) {
        this.setState({
          training: response.data.data,
        });
      }
    });
  };

  getPackageList = () => {
    var self = this;
    Axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/scheduleTrainingBasedPackage",
      data: {
        trainerId: this.state.trainerId,
        trainingCategoryId: this.state.trainingCatId,
        trainingId: this.state.trainingId,
      },
    }).then((response) => {
      console.log(response.data.data,"response.data.data")
      if (response.data.status) {
        this.setState({
          package: response.data.data,
          fulltrainingMode:response.data.data
        });
      }
    });
  };

  render() {
    return (
      <div className="uploadmaster">
        <Paper>
          <div className="uploadsmasterheader" style={{ display: "block" }}>
            {/* <Grid container> */}
            {/* <Grid items xs={12} md={12}> */}
            <div className="titleuser">TRAINING AVAILABILITY</div>
            {/* </Grid> */}
            <div className="training_category_full_div">
              {/*FIRST  */}
              {/* <div className="training_category_first">
                <label className="training_category_label_category">
                  Training Category{" "}
                </label>
                <Select
                  className=" "
                  defaultValue={this.state.userdata.trainingCategory}
                  style={{ width: 130 }}
                  onChange={(value) => this.handleChange(value, 0)}
                  
                >
                  {this.state.category.map((e, key) => {
                    return (
                      <option key={key} value={e.trainerCatId}>
                        {e.trainerCatName}
                      </option>
                    );
                  })}
                </Select>
              </div> */}
              {/*SECOND  */}
              {/* <div className="training_category_second">
                <label className="training_category_label">Training </label>
                <Select
                  className=" "
                  defaultValue={this.state.userdata.trainingName}
                  style={{ width: 100 }}
                  onChange={(value) => this.handleChange(value, 1)}
                  
                >
                  {this.state.training.map((e, key) => {
                    return (
                      <option key={key} value={e.trainingId}>
                        {e.trainingName}
                      </option>
                    );
                  })}
                </Select>
              </div> */}
              {/*THIRD  */}
              <div className="training_category_third">
                <label className="training_category_label">Package </label>
                <Select
                  className=" "
                  defaultValue="Select"
                  style={{ width: 150 }}
                  onChange={(value) => this.handleChange(value, 2)}
                >
                  {this.state.package.map((e, key) => {
                    return (
                      <option key={key} value={e.trainerPackageId}>
                        {e.tr_package_name}
                      </option>
                    );
                  })}
                </Select>
                <div className="indoor-fitness">{this.state.userdata.trainingCategory} -
                 {this.state.userdata.trainingName}</div>
              </div>

              {/* FOURTH  */}
              {/* <div className="training_category_fourth">
                <label className="training_category_label">
                  Training mode{" "}
                </label>
                <Checkbox
                  checked={this.state.home}
                  className="checkbox_height"
                  onChange={this.handleHomeChange}
                  value={1}
                />
                <div className="icon_name">
                  <HomeIcon className="home_icon_clr" />
                  <p>Home</p>
                </div>
                <Checkbox
                  checked={this.state.lang}
                  className="checkbox_height"
                  onChange={this.handleLangChange}
                  value={2}
                />
                <div>
                  <LanguageIcon className="lang_icon_clr" />
                  <p>Online</p>
                </div>
                <Checkbox
                  checked={this.state.loc}
                  className="checkbox_height"
                  onChange={this.handleLocChange}
                  value={3}
                />
                <div>
                  <LocationOnIcon className="location_icon_clr" />
                  <p>Center</p>
                </div>
              </div> */}
              <div>
                <img className="plus-icon" src={plus} onClick={this.AddRow} />
              </div>
            </div>
            {/* <Grid items xs={6} md={6} className="plus-container">
                <div>
                  <img className="plus-icon" src={plus} onClick={this.AddRow} />
                </div>
              </Grid> */}
            {/* </Grid> */}
          </div>
          {this.state.appDetails.length > 0 && (
            <AppointmentDetails
              sucessProp={() => this.getDetailsByClinic()}
              onChange={(event, index, key, checkindex) =>
                this.updateDetails(event, index, key, checkindex)
              }
              clinic={this.state.trainerId}
              packageId={this.state.packageId}
              trainingMode={
                this.state.home + "," + this.state.lang + "," + this.state.loc
              }
              appDetails={this.state.appDetails}
              trainingModeDetails={this.state.trainingMode}
            />
          )}
        </Paper>
      </div>
    );
  }
}
