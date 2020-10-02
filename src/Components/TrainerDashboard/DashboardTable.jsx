import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import "./DashboardTable.css";
import dateFormat from "dateformat";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Language";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ProfileView from "./ProfileView";
import axios from "axios";

import links from "../../helpers/Constant";
import { Spin } from "antd";
const current_date = dateFormat(new Date(), "yyyy-mm-dd");
const todays_date = dateFormat(new Date(), "dd mmm yyyy");



class DashboardTable extends React.Component {
  state = {
    openview: false,
    trainerId: localStorage.getItem("trainerId"),
    dashboard: {},
    tableData: [],
    responseAllData: [],
    viewdata: [],
    editdata: [],
    userdata: JSON.parse(localStorage.getItem("trainer")),
    spinner:true
  };

  componentWillMount = () => {
    this.getStatistics();
  };

  componentDidMount = () => {
    this.getTableData();
  };

  getStatistics = () => {
    var self = this;
    axios({
      method: "POST",
      url: links.APIURL + "trainer/trainerDashboard",
      data: {
        trainer_id: this.state.trainerId,
      },
    }).then((response) => {
      self.setState({ dashboard: response.data.data });
    });
  };

  getTableData = () => {
    var self = this;
    axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/trainerTodayBookingDetails",
      data: {
        trainerId: this.state.trainerId,
        date: current_date,
        trainerCategoryId: "1",
        limit: 10,
        pageno: 1,
      },
    }).then((response) => {
      console.log("response_data_count", response);

      var tableData = [];
      var responseAllData = [];
      response.data.data.length > 0 &&
        response.data.data[0].details.map((val) => {

          const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

          var fromdate = new Date(val.from_date)
          var session = null

          if(new Date()<fromdate){
            var session = 0+"/"+val.tr_session
          }
          else if(new Date()>fromdate){
            const diffDays = Math.round(Math.abs((new Date() - fromdate) / oneDay));
            var session = diffDays+"/"+val.tr_session
          }
          else{
            var session = 1+"/"+val.tr_session
          }


          tableData.push({
            type1:val.tr_training_mode,
             

            customer: val.patientName,
            package: val.tr_package_name,
            sessions: session,
            // time: val.from_time,
            id: val.trainerBookingId,
          });
          responseAllData.push(val);
        });
      console.log("cusfsd", tableData);
      self.setState({
        tableData: tableData,
        responseAllData: responseAllData,
        spinner:false
      });
    });
  };

  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);
    var returnobj = {};

    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

  modelopen = (data, id) => {
    if (data === "view") {
      var viewdata = this.state.responseAllData.filter((viewdata) => {
        return viewdata.trainerBookingId === id;
      });
      this.setState({ openview: true, viewdata: viewdata[0] });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };

  render() {
    console.log(this.state,"counts")
    const { dashboard } = this.state;
    return (
      <Spin className="spinner_align" spinning={this.state.spinner}>
        {/* 4 cards */}
        <div className="trainer_dashboard_buttons_wrap">
          <Card
            component={NavLink}
            to="/Home/appointments"
            className="trainer_button1 trainer_button_common_styles"
          >
            <p className="trainer_button_text">Appointments</p>
            <div className="divider_container"></div>
            <div className="trainer_number_wrap">
              <p className="trainer_dash_numeric_value">
                {dashboard.Appointment == null ? 0 : dashboard.Appointment}
              </p>
            </div>
          </Card>
          <Card
            className="trainer_button2 trainer_button_common_styles"
            component={NavLink}
            to="/Home/clients"
          >
            <p className="trainer_button_text">Clients</p>
            <div className="divider_container"></div>
            <div className="trainer_number_wrap">
              <p className="trainer_dash_numeric_value">{dashboard.Patient == null ? 0 : dashboard.Patient}</p>
            </div>
          </Card>
          <Card
            className="trainer_button3 trainer_button_common_styles"
            component={NavLink}
            to="/Home/cancelhistory"
          >
            <p className="trainer_button_text">Manage Appointments</p>
            <div className="divider_container"></div>
            <div className="trainer_number_wrap">
              <p className="trainer_dash_numeric_value">
                {dashboard.Cancel == null ? 0 : dashboard.Cancel}
              </p>
            </div>
          </Card>
          <Card
            className="trainer_button4 trainer_button_common_styles"
            component={NavLink}
            to="/Home/revenue"
          >
            <p className="trainer_button_text">Revenue(KWD)</p>
            <div className="divider_container"></div>
            <div className="trainer_number_wrap">
              <p className="trainer_dash_numeric_value">0</p>
            </div>
          </Card>
        </div>
        {/*  */}

        <div className="today_Appointments">
          <span>Today's Booking </span>
          {"   "}{" "}
          <span
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "rgba(0, 0, 0, 0.54)",
              paddingLeft: 9,
            }}
          >
            {" "}
            {this.state.userdata.trainingCategory} -{" "}
            {this.state.userdata.trainingName}
          </span>
          <span style={{marginLeft:'20px',fontSize:"14px"}}>{todays_date}</span>
        </div>
        {/* Table part */}
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "type1", label: "Type" },

            // { id: "time", label: "Time" },
            { id: "customer", label: "Customer" },

            { id: "package", label: "Package" },
            { id: "sessions", label: "Sessions" },
            { id: "", label: "Action" },
          ]}
          rowdata={this.state.tableData}
          tableicon_align={"cell_eye"}
          modelopen={(e, currentid) => this.modelopen(e, currentid)}
          EditIcon="close"
          DeleteIcon="close"
          props_loading={false}
        />
        {/*  */}
        <div className="buttons_container">
          <div>
            <Button
              className="nurse_dash_bottom_buttons nurse_dash_bottom2"
              component={NavLink}
              to="/Home/uploads"
            >
              Media Uploads
            </Button>
            <Button
              className="nurse_dash_bottom_buttons nurse_dash_bottom3"
              component={NavLink}
              to="/Home/advertise"
            >
              Advertisement Booking
            </Button>
          </div>
        </div>

        <ProfileView
          open={this.state.openview}
          onClose={this.closemodal}
          view={this.state.viewdata}
        />

        <Modalcomp
          visible={this.state.editopen}
          title={"Edit details"}
          closemodal={(e) => this.closemodal(e)}
        ></Modalcomp>
      </Spin>
    );
  }
}

export default DashboardTable;
