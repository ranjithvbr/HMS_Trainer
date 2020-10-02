import React, { Component } from "react";
import "./AppointmentsDashboard.css";
import "antd/dist/antd.css";
import AppointmentsTable from "./AppointmentsTable";
import { Input } from "antd";

import dateFormat from "dateformat";

import Print from "../../Images/print.svg";
import Excel from "../../Images/excel.svg";
import Pdf from "../../Images/pdf.svg";
import Paper from "@material-ui/core/Paper";
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./AppointmentsTable.css";
import moment from "moment";
import Profilepage from "./Profilepage";
import links from "../../helpers/Constant";
import axios from "axios";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Language";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import ReactSVG from "react-svg";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactExport from "react-data-export";
import ReactToPrint from "react-to-print";
import PrintData from "./printdata";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class AppointmentsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "rrr",
      openview: false,
      tableData: [],
      responseAllData: [],
      viewdata: [],
      editdata: [],
      search: null,
      userdata: JSON.parse(localStorage.getItem("trainer")),
      trainerId: localStorage.getItem("trainerId"),
      icon: null,
    };
  }
  componentDidMount() {
    this.getTableData();
  }

  componentWillReceiveProps() {
    console.log(this.props, "getdatacall");

    if (this.props.getdatacall) {
      this.getTableData();
    }
  }

  handleClickclose = () => {
    this.setState({ open: false });
  };
  searchChange = (e) => {
    this.setState({
      search: e.target.value,
    });
    this.setState({});
  };
  formatTimeShow = (h_24) => {
    var h = Number(h_24.substring(0, 2)) % 12;
    if (h === 0) h = 12;
    return (
      (h < 10 ? "0" : "") +
      h +
      ":" +
      h_24.substring(3, 5) +
      (Number(h_24.substring(0, 2)) < 12 ? " AM" : " PM")
    );
  };
  check = (id, data) => {

    return data.match(id);

  };
  // PDF FUNCTION
  generatepdf = () => {
    if (this.state.tableData.length === 0) {
      alert("Table data is empty");
    } else {
      // alert("ee")
      const doc = new jsPDF("a3");
      var bodydata = [];
      this.state.tableData.map((data, index) => {
        bodydata.push([
          index + 1,
          data.type1.includes("1") ? "Home" : data.type1.includes("2") ? "Online" : "Center",
          data.customer,
          data.package,
          data.sessions,
          data.time,
        ]);
      });
      doc.autoTable({
        beforePageContent: function (data) {
          doc.text("Today's Appointments", 15, 23); // 15,13 for css
        },
        margin: { top: 30 },
        showHead: "everyPage",
        theme: "grid",
        head: [
          [
            "S.No",
            "Type",
            "Customer",
            "Package",
            "Sessions",
            "Time",
          ],
        ],
        body: bodydata,
      });

      doc.save("TodayAppointments.pdf");
    }
  };
  // PRINT FUNCTION
  generateprint = () => {
    this.setState({
      printComOpen: true,
    });
  };

  getTableData = () => {
    this.setState({ props_loading: true })
    var self = this;
    axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/getAppointmentListBasedonDate",
      data: {
        trainerId: this.state.trainerId,
        fromDate: dateFormat(new Date(), "yyyy-mm-dd"),
        toDate: dateFormat(new Date(), "yyyy-mm-dd"),
        limit: 100,
        pageno: 1,
      },
    }).then((response) => {
      console.log("response_data", response);


      var tableData = [];
      var responseAllData = [];
      response.data.data.length > 0 &&
        response.data.data[0].details.map((val) => {

          const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

          var fromdate = new Date(val.from_date)
          var session = null

          if (new Date() < fromdate) {
            var session = 0 + "/" + val.tr_session
          }
          else if (new Date() > fromdate) {
            const diffDays = Math.round(Math.abs((new Date() - fromdate) / oneDay));
            var session = diffDays + "/" + val.tr_session
          }
          else {
            var session = 1 + "/" + val.tr_session
          }

          tableData.push({
            type1: val.tr_training_mode,
            customer: val.patientName,
            package: val.tr_package_name,
            sessions: session,
            time: val && this.formatTimeShow(val.from_time),
            id: val.trainerBookingId,
          });
          responseAllData.push(val);
        });
      self.setState({
        tableData: tableData,
        responseAllData: responseAllData,
        props_loading: false
      });
    });
  };

  modelopen = (data, id) => {
    if (data === "view") {
      var viewdata = this.state.responseAllData.filter((viewdata) => {
        return viewdata.trainerBookingId === id;
      });
      this.setState({ openview: true, viewdata: viewdata[0] });
    } else if (data === "edit") {
      var editdata = this.state.responseAllData.filter((editdata) => {
        return editdata.trainerBookingId === id;
      });

      console.log(editdata, "editdata");
      this.setState({ editopen: true, editdata: editdata });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };

  getAppointmentListByDate = () => {
    this.setState({ props_loading: true })
    var self = this;
    axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/getAppointmentListBasedonDate",
      data: {
        trainerId: this.state.trainerId,
        // trainerCategoryId: "1",
        fromDate: this.state.from_date,
        toDate: this.state.to_date,
        limit: 100,
        pageno: 1,
      },
    }).then((response) => {
      console.log("response_data", response);

      var tableData = [];
      var responseAllData = [];
      response.data.data.length > 0 &&
        response.data.data[0].details.map((val) => {

          const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

          var fromdate = new Date(val.from_date)

          var session = null

          if (new Date() < fromdate) {
            var session = 0 + "/" + val.tr_session
          }
          else if (new Date() > fromdate) {
            const diffDays = Math.round(Math.abs((new Date() - fromdate) / oneDay));
            var session = diffDays + "/" + val.tr_session
          }
          else {
            var session = 1 + "/" + val.tr_session
          }



          tableData.push({
            type1: val.tr_training_mode,
            customer: val.patientName,
            package: val.tr_package_name,
            sessions: session,
            time: val && this.formatTimeShow(val.from_time),
            id: val.trainerBookingId,
          });
          responseAllData.push(val);
        });
      self.setState({
        tableData: tableData,
        responseAllData: responseAllData,
        props_loading:false
      });
    });
  };

  dateUpdate = (item) => {
    console.log("item", item[0].startDate);
    var from = item[0].startDate;
    var fromDate = moment(from).format("YYYY-MM-DD");
    var endDate = moment(item[0].endDate).format("YYYY-MM-DD");
    this.setState(
      {
        from_date: fromDate,
        to_date: endDate,
      },
      () => {
        this.getAppointmentListByDate();
      }
    );
  };

  render() {
    const { Search } = Input;
    console.log(dateFormat(new Date(), "dd mmm yyyy"));
    //SERACH FUNCTION
    const Tabledatas = this.state.tableData.filter((data) => {
      console.log(data, "Search_data");
      if (this.state.search === null) return data;
      else if (
        (data.time !== null &&
          data.time.toLowerCase().includes(this.state.search.toLowerCase())) ||
        (data.customer != null &&
          data.customer
            .toLowerCase()
            .includes(this.state.search.toLowerCase())) ||
        (data.trainingcat != null &&
          data.trainingcat.toString().includes(this.state.search.toString())) ||
        (data.training != null &&
          data.training
            .toLowerCase()
            .includes(this.state.search.toLowerCase())) ||
        (data.package != null &&
          data.package
            .toLowerCase()
            .includes(this.state.search.toLowerCase())) ||
        (data.sessions != null &&
          data.sessions.toString().includes(this.state.search.toString()))
      ) {
        return data;
      }
    });
    //EXCEL FUNCTION

    var multiDataSetbody = [];
    this.state.tableData.map((xldata, index) => {
      console.log(xldata.type1, "xldata.type1")
      if (index % 2 !== 0) {
        multiDataSetbody.push([
          {
            value: index + 1,
            style: { alignment: { horizontal: "center" } },
          },
          { value: xldata.type1.includes("1") ? "Home" : xldata.type1.includes("2") ? "Online" : "Center" },
          { value: xldata.customer },
          // { value: xldata.trainingcat },
          // { value: xldata.training },
          { value: xldata.package },
          { value: xldata.sessions },
          { value: xldata.time },
        ]);
      } else {
        multiDataSetbody.push([
          {
            value: index + 1,
            style: {
              alignment: { horizontal: "center" },
              fill: {
                patternType: "solid",
                fgColor: { rgb: "e2e0e0" },
              },
            },
          },
          {
            value: xldata.type1.includes("1") ? "Home" : xldata.type1.includes("2") ? "Online" : "Center",
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "e2e0e0" },
              },
            },
          },
          {
            value: xldata.customer,
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "e2e0e0" },
              },
            },
          },
          // {
          //   value: xldata.trainingcat,
          //   style: {
          //     fill: {
          //       patternType: "solid",
          //       fgColor: { rgb: "e2e0e0" },
          //     },
          //   },
          // },
          // {
          //   value: xldata.training,
          //   style: {
          //     fill: {
          //       patternType: "solid",
          //       fgColor: { rgb: "e2e0e0" },
          //     },
          //   },
          // },
          {
            value: xldata.package,
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "e2e0e0" },
              },
            },
          },
          {
            value: xldata.sessions,
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "e2e0e0" },
              },
            },
          },
          {
            value: xldata.time,
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "e2e0e0" },
              },
            },
          },
        ]);
      }
    });
    const multiDataSet = [
      {
        columns: [
          {
            title: "S.No",
            width: { wpx: 35 },
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "86b149" },
              },
            },
          },
          {
            title: "Type",
            width: { wch: 20 },
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "86b149" },
              },
            },
          },
          {
            title: "Customer",
            width: { wch: 20 },
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "86b149" },
              },
            },
          },
          // {
          //   title: "Training Category",
          //   width: { wpx: 90 },
          //   style: {
          //     fill: {
          //       patternType: "solid",
          //       fgColor: { rgb: "86b149" },
          //     },
          //   },
          // },
          // {
          //   title: "Training",
          //   width: { wpx: 100 },
          //   style: {
          //     fill: {
          //       patternType: "solid",
          //       fgColor: { rgb: "86b149" },
          //     },
          //   },
          // },
          {
            title: "Package",
            width: { wpx: 90 },
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "86b149" },
              },
            },
          },
          {
            title: "Sessions",
            width: { wpx: 90 },
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "86b149" },
              },
            },
          },
          {
            title: "Time",
            width: { wch: 20 },
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "86b149" },
              },
            },
          },
        ],
        data: multiDataSetbody,
      },
    ];
    return (
      <div className="trainer_appointment">
        <Paper>
          {/*APPOINTMENT HEADING  */}
          <div className="hms_trainer_header">
            <div className="titleuser">
              <div>
                TODAY'S APPOINTMENTS {"   "}{" "}
                <div
                  style={{
                    fontSize: 15,
                    // fontWeight: "bold",
                    color: "rgba(0, 0, 0, 0.54)",
                    paddingLeft: 9,
                  }}
                >
                  {" "}
                  {this.state.userdata.trainingCategory} -{" "}
                  {this.state.userdata.trainingName}
                </div>
              </div>
            </div>

            {/* SEARCH AREA */}
            <div className="appointment_container">
              <div className="group_buttons_div">
                <DateRangeSelect
                  dynalign={"dynalign"}
                  rangeDate={(item) => this.dateUpdate(item)}
                />
                {/* <DateRangeSelect
                // dynalign={"dynalign"}
                // rangeDate={(item) => this.dayReport(item)}
                // setselectedDate={this.state.tabindex}
                /> */}
                {/* <ButtonGroup
                  className="trainer_group_details"
                  size="small"
                  aria-label="small outlined button group"
                >
                  <Button className="trainer_details_first">This Week</Button>
                  <Button className="trainer_details">This Month</Button>
                  <Button className="trainer_details">This Year</Button>
                </ButtonGroup> */}

                {/* <div className="currentdate">
                  <ChevronLeftIcon className="right_arrowicon" />
                  {current_date}
                  <ChevronRightIcon className="right_arrowicon" />
                </div> */}
                <Search
                  placeholder=" Search "
                  onSearch={(value) => console.log(value)}
                  style={{ width: 150 }}
                  className="search_box_container"
                  onChange={(e) => this.searchChange(e)}
                />
                {/* <div>
                  <img src={Pdf} className="seach_near_icon" />
                  <img src={Excel} className="seach_near_icon" />
                  <img src={Print} className="seach_near_icon" />
                </div> */}
                <div className="icon_head">
                  <ReactSVG
                    src={Pdf}
                    onClick={this.generatepdf}
                    style={{ marginRight: "15px", marginLeft: "15px" }}
                  />
                  {this.state.tableData.length === 0 ? (
                    <ReactSVG src={Excel} style={{ marginRight: "15px" }} />
                  ) : (
                      <ExcelFile filename={"TodayAppointments"}
                        element={
                          <ReactSVG src={Excel} style={{ marginRight: "15px" }} />
                        }
                      >
                        <ExcelSheet
                          dataSet={multiDataSet}
                          name="Today Appointments"
                        />
                      </ExcelFile>
                    )}
                  <ReactToPrint
                    trigger={() => <ReactSVG src={Print} />}
                    content={() => this.componentRef}
                  />
                  <div style={{ display: "none" }}>
                    <PrintData
                      printTableData={this.state.tableData}
                      ref={(el) => (this.componentRef = el)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <AppointmentsTable /> */}
          <div>
            <Tablecomponent
              heading={[
                { id: "", label: "S.No" },
                { id: "type1", label: "Type" },


                { id: "customer", label: "Customer" },

                { id: "package", label: "Package" },
                { id: "sessions", label: "Sessions" },
                { id: "time", label: "Time" },
                { id: "", label: "Action" },
              ]}
              //  rowdata={this.state.tableData}
              rowdata={Tabledatas.length === 0 ? [] : Tabledatas}
              tableicon_align={"cell_eye"}
              modelopen={(e, currentid) => this.modelopen(e, currentid)}
              props_loading={this.state.props_loading}
              EditIcon="close"
              DeleteIcon="close"
            />

            <Profilepage
              open={this.state.openview}
              onClose={this.closemodal}
              view={this.state.viewdata}
            />

            <Modalcomp
              visible={this.state.editopen}
              title={"Edit details"}
              closemodal={(e) => this.closemodal(e)}
              xswidth={"xs"}
            ></Modalcomp>
          </div>
        </Paper>
      </div>
    );
  }
}

export default AppointmentsDashboard;
