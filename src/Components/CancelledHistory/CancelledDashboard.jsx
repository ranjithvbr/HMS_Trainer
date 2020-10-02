import React, { Component } from "react";
import "./CancelledDashboard.css";
import "antd/dist/antd.css";
import CancelledTable from "./CancelledTable";
import { Input,Spin } from "antd";
import dateFormat from "dateformat";

import Print from "../../Images/print.svg";
import Excel from "../../Images/excel.svg";
import Pdf from "../../Images/pdf.svg";
import Paper from "@material-ui/core/Paper";
import Tablecomponent from "../../helpers/TableComponent/TableComp";

import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import "./CancelledTable.css";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Language";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import links from "../../helpers/Constant";
import axios from "axios";
import moment from "moment";
import ReactSVG from "react-svg";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactExport from "react-data-export";
import ReactToPrint from "react-to-print";
import PrintData from "./printdata";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
class CancelledDashboard extends Component {
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

      trainerId: localStorage.getItem("trainerId"),
      from_date: "",
      to_date: "",
      userdata: JSON.parse(localStorage.getItem("trainer")),
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
          data.type1.includes("1")?"Home":data.type1.includes("2")?"Online":"Center",
          data.customer,
          data.package,
          data.booked,
          data.cancelled,
          data.time,

        ]);
      });
      doc.autoTable({
        beforePageContent: function (data) {
          doc.text("Manage Appointments", 15, 23); // 15,13 for css
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
            "Booked Date",
            "Cancelled Date",
            "Time",
          ],
        ],
        body: bodydata,
      });

      doc.save("ManageAppointments.pdf");
    }
  };
  // PRINT FUNCTION
  generateprint = () => {
    this.setState({
      printComOpen: true,
    });
  };

  getTableData = () => {
    this.setState({props_loading:true})
    var self = this;
    axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/getCancelledAppointment",
      data: {
        trainerId: this.state.trainerId,
        fromDate:moment().format("YYYY-MM-DD"),
        toDate:moment().format("YYYY-MM-DD"),
        limit: 100,
        pageno: 1,
      },
    }).then((response) => {
      var tableData = [];
      var responseAllData = [];
      response.data.data.length > 0 &&
        response.data.data[0].details.map((val) => {
          tableData.push({
            type1: val.tr_training_mode,
            customer: val.patientName,
            package: val.tr_package_name,
            booked: moment(val.book_date).format("DD MMM YYYY"),
            cancelled: moment(val.book_date).format("DD MMM YYYY"),
            time: val && this.formatTimeShow(val.from_time),
            id: val.trainerBookingId,
          });
          responseAllData.push(val);
        });
      self.setState(
        {
          tableData: tableData,
          responseAllData: responseAllData,
          props_loading:false
        },
        () => console.log("pushed", tableData)
      );
    });
  };

  modelopen = (data, id) => {
    if (data === "view") {
      var viewdata = this.state.responseAllData.filter((viewdata) => {
        return viewdata.lab_id === id;
      });
      this.setState({ openview: true, viewdata: viewdata });
    } else if (data === "edit") {
      var editdata = this.state.responseAllData.filter((editdata) => {
        return editdata.lab_id === id;
      });

      console.log(editdata, "editdata");
      this.setState({ editopen: true, editdata: editdata });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };

  getCanceledAppointmentListByDate = () => {
    this.setState({props_loading:true})
    var self = this;
    axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/getCancelledAppointment",
      data: {
        trainerId: this.state.trainerId,
        fromDate:moment(this.state.from_date).format("YYYY-MM-DD"),
        toDate:moment(this.state.to_date).format("YYYY-MM-DD"),
        limit: 100,
        pageno: 1,
      },
    }).then((response) => {
      var tableData = [];
      var responseAllData = [];
      response.data.data.length > 0 &&
        response.data.data[0].details.map((val) => {
          tableData.push({
            type1: val.tr_training_mode,
            customer: val.patientName,
            package: val.tr_package_name,
            booked: moment(val.book_date).format("DD MMM YYYY"),
            cancelled: moment(val.book_date).format("DD MMM YYYY"),
            time: val && this.formatTimeShow(val.from_time),
            id: val.trainerBookingId,
          });
          responseAllData.push(val);
        });
      self.setState(
        {
          tableData: tableData,
          responseAllData: responseAllData,
          props_loading:false
        },
        () => console.log("pushed", tableData)
      );
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
        this.getCanceledAppointmentListByDate();
      }
    );
  };

  render() {
    var moment = require("moment");

    const { Search } = Input;
    console.log(dateFormat(new Date(), "dd mmm yyyy"));
    //SERACH FUNCTION
    const Tabledatas = this.state.tableData.filter((data) => {
      console.log(data, "Search_data");
      if (this.state.search === null) return data;
      else if (
        (data.time !== null &&
          data.time.toString().includes(this.state.search.toString())) ||
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
        (data.booked != null &&
          data.booked
            .toLowerCase()
            .includes(this.state.search.toLowerCase())) ||
        (data.cancelled != null &&
          data.cancelled
            .toLowerCase()
            .includes(this.state.search.toLowerCase()))
      ) {
        return data;
      }
    });
    //EXCEL FUNCTION

    var multiDataSetbody = [];
    this.state.tableData.map((xldata, index) => {
      console.log(xldata,"xldata")
      if (index % 2 !== 0) {
        multiDataSetbody.push([
          {
            value: index + 1,
            style: { alignment: { horizontal: "center" } },
          },
          { value: xldata.type1.includes("1")?"Home":xldata.type1.includes("2")?"Online":"Center" },
          { value: xldata.customer },
          { value: xldata.package },
          { value: xldata.booked },
          { value: xldata.cancelled },
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
            value: xldata.type1.includes("1")?"Home":xldata.type1.includes("2")?"Online":"Center",
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
            value: xldata.booked,
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "e2e0e0" },
              },
            },
          },
          {
            value: xldata.cancelled,
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
            title: "booked",
            width: { wpx: 90 },
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "86b149" },
              },
            },
          },
          {
            title: "cancelled",
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
      <div className="trainer_cancelled">
        <Paper>
          {/*APPOINTMENT HEADING  */}
          <div className="hms_trainer_header">
            <div className="titleuser">
              <div>
                MANAGE APPOINTMENTS {"   "}{" "}
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
            <div className="cancelled_container">
              <div className="group_buttons_div">
                <DateRangeSelect
                  dynalign={"dynalign"}
                  rangeDate={(item) => this.dateUpdate(item)}
                />

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
                    <ExcelFile filename={"Manage Appointments"} 
                      element={
                        <ReactSVG src={Excel} style={{ marginRight: "15px" }} />
                      }
                    >
                      <ExcelSheet
                        dataSet={multiDataSet}
                        name="ManageAppointments"
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
          {/* <CancelledTable /> */}
          <div>
            <Tablecomponent
              heading={[
                { id: "id", label: "S No" },
                { id: "type1", label: "Type" },

                { id: "customer", label: "Customer" },

                { id: "package", label: "Package" },
                { id: "booked", label: "Booked Date" },
                { id: "cancelled", label: "Cancelled Date" },
                { id: "time", label: "Time" },

              ]}
              // rowdata={this.state.tableData}
              rowdata={Tabledatas.length === 0 ? [] : Tabledatas}
              tableicon_align={""}
              modelopen={(e, currentid) => this.modelopen(e, currentid)}
              EditIcon="close"
              DeleteIcon="close"
              VisibilityIcon="close"
              props_loading={this.state.props_loading}
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

export default CancelledDashboard;
