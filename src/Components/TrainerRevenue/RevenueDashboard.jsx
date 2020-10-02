import React, { Component } from "react";
import "./RevenueDashboard.css";
import "antd/dist/antd.css";
import RevenueTable from "./RevenueTable";
import { Input } from "antd";
import dateFormat from "dateformat";
import Print from "../../Images/print.svg";
import Excel from "../../Images/excel.svg";
import Pdf from "../../Images/pdf.svg";
import Paper from "@material-ui/core/Paper";
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import moment from "moment";
import links from "../../helpers/Constant";
import axios from "axios";
import "./RevenueTable.css";

import ReactSVG from "react-svg";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactExport from "react-data-export";
import ReactToPrint from "react-to-print";
import PrintData from "./printdata";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
class RevenueDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "rrr",
      openview: false,
      from_date: "",
      to_date: "",
      search: null,

      trainerId: localStorage.getItem("trainerId"),
      tableData: [],
      responseAllData: [],
      userdata: JSON.parse(localStorage.getItem("trainer")),
    };
  }
  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);

    var returnobj = {};

    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };

  componentWillReceiveProps() {
    console.log(this.props, "getdatacall");

    if (this.props.getdatacall) {
      this.getTableData();
    }
  }

  componentDidMount() {
    this.getTableData();
  }
  searchChange = (e) => {
    this.setState({
      search: e.target.value,
    });
    this.setState({});
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
          data.customer,
          data.package,
          data.cost,
          data.cash,
          data.card,
          data.wallet,
          data.totalcharge,
          data.bookingDate,
        ]);
      });
      doc.autoTable({
        beforePageContent: function (data) {
          doc.text("Appointments Details", 15, 23); // 15,13 for css
        },
        margin: { top: 30 },
        showHead: "everyPage",
        theme: "grid",
        head: [
          [
            "S.No",
            "Customer",
            "Package",
            "Booked Date",

            "Cost",
            "Cash",
            "Card",
            "Wallet",
            "Total Charge(KWD)",
          ],
        ],
        body: bodydata,
      });

      doc.save("Revenue.pdf");
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
      url: links.APIURL + "trainer/getRevenueByDate",
      data: {
        trainerId: this.state.trainerId,
        limit: 10,
        pageno: 1,
        date: moment().format("YYYY-MM-DD"),
      },
    }).then((response) => {
      var tableData = [];
      var responseAllData = [];
      response.data.data.length > 0 &&
        response.data.data[0].details.map((val) => {
          tableData.push({
            customer: val.patientName,
            // trainingcat: val.trainingCategoryName,
            // training: val.trainingName,
            package: val.tr_package_name,
            bookingDate: moment(val.book_date).format("DD MMM YYYY"),
            cost: val.cost,
            cash: val.payment_mode_id == 2 ? val.charge : 0,
            card: val.payment_mode_id == 1 ? val.charge : 0,
            wallet: val.payment_mode_id == 4 ? val.charge : 0,
            totalcharge: val.kwd,
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

  getRevenueFromToDate = () => {
    this.setState({props_loading:true})
    var self = this;
    axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/getRevenueFromToDate",
      data: {
        trainerId: this.state.trainerId,
        limit: 10,
        pageno: 1,
        from_date: this.state.from_date,
        to_date: this.state.to_date,
      },
    }).then((response) => {
      var tableData = [];
      var responseAllData = [];
      response.data.data.length > 0 &&
        response.data.data[0].details.map((val) => {
          tableData.push({
            customer: val.patientName,
            package: val.tr_package_name,
            bookingDate: moment(val.book_date).format("DD MMM YYYY"),
            cost: val.cost,
            cash: val.payment_mode_id == 2 ? val.charge : 0,
            card: val.payment_mode_id == 1 ? val.charge : 0,
            wallet: val.payment_mode_id == 4 ? val.charge : 0,
            totalcharge: val.kwd,
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

  getTotalKWD = () => {
    var kwd = 0;
    this.state.tableData.map((item) => {
      kwd += item.totalcharge;
    });

    return kwd;
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false });
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
        this.getRevenueFromToDate();
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
        (data.customer !== null &&
          data.customer
            .toLowerCase()
            .includes(this.state.search.toLowerCase())) ||
        (data.package != null &&
          data.package
            .toLowerCase()
            .includes(this.state.search.toLowerCase())) ||
        (data.cost != null &&
          data.cost.toString().includes(this.state.search.toString())) ||
        (data.cash != null &&
          data.cash.toString().includes(this.state.search.toString())) ||
        (data.card != null &&
          data.card.toString().includes(this.state.search.toString())) ||
        (data.wallet != null &&
          data.wallet.toString().includes(this.state.search.toString())) ||
        (data.totalcharge != null &&
          data.totalcharge
            .toLowerCase()
            .includes(this.state.search.toLowerCase.toString()))
      ) {
        return data;
      }
    });
    //EXCEL FUNCTION

    var multiDataSetbody = [];
    this.state.tableData.map((xldata, index) => {
      if (index % 2 !== 0) {
        multiDataSetbody.push([
          {
            value: index + 1,
            style: { alignment: { horizontal: "center" } },
          },
          { value: xldata.customer },
          { value: xldata.package },
          { value: xldata.cost },
          { value: xldata.cash },
          { value: xldata.card },
          { value: xldata.wallet },
          { value: xldata.totalcharge },
          { value: xldata.bookingDate },
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
            value: xldata.cost,
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "e2e0e0" },
              },
            },
          },
          {
            value: xldata.cash,
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "e2e0e0" },
              },
            },
          },
          {
            value: xldata.card,
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "e2e0e0" },
              },
            },
          },
          {
            value: xldata.wallet,
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "e2e0e0" },
              },
            },
          },
          {
            value: xldata.totalcharge,
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "e2e0e0" },
              },
            },
          },
          {
            value: xldata.bookingDate,
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
            width: { wch: 20 },
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "86b149" },
              },
            },
          },
          {
            title: "Cost",
            width: { wch: 20 },
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "86b149" },
              },
            },
          },
          {
            title: "Cash",
            width: { wpx: 90 },
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "86b149" },
              },
            },
          },
          {
            title: "Card",
            width: { wpx: 100 },
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "86b149" },
              },
            },
          },
          {
            title: "Wallet",
            width: { wpx: 90 },
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "86b149" },
              },
            },
          },
          {
            title: "Total Charge(KWD)",
            width: { wpx: 90 },
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "86b149" },
              },
            },
          },
          {
            title: "Booked Date",
            width: { wpx: 90 },
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
      <div className="trainer_revenue">
        <Paper>
          {/*APPOINTMENT HEADING  */}
          <div className="hms_trainer_header">
            <div className="titleuser">
              <div>
                REVENUE {"   "}{" "}
                <div
                  style={{
                    fontSize: 15,
                    // fontWeight: "bold",
                    color: "rgba(0, 0, 0, 0.54)",
                  }}
                >
                  {" "}
                  {this.state.userdata.trainingCategory} -{" "}
                  {this.state.userdata.trainingName}
                </div>
              </div>
            </div>

            {/* SEARCH AREA */}
            <div className="revenue_container">
              <div className="group_buttons_div">
                <DateRangeSelect
                  dynalign={"dynalign"}
                  rangeDate={(item) => this.dateUpdate(item)}
                  setselectedDate={this.state.tabindex}
                />
                {/* <ButtonGroup className="revenue_group_details" size="small" aria-label="small outlined button group">
              <Button className="revenue_details_first">This Week</Button>
              <Button className="revenue_details">This Month1</Button>
              <Button className="revenue_details">This Year</Button>
            </ButtonGroup> */}
                {/* 
                <div className="currentdate">
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
                    <ExcelFile
                      element={
                        <ReactSVG src={Excel} style={{ marginRight: "15px" }} />
                      }
                    >
                      <ExcelSheet
                        dataSet={multiDataSet}
                        name="Uploaded Details"
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
          {/* <RevenueTable /> */}
          <div>
          <div><div className="mode_of_pay">Mode of payment</div></div>
       <div className="line_payment"><div className="inner_line"></div></div> 
            <Tablecomponent
              heading={[
                { id: "", label: "S.No" },
                { id: "customer", label: "Customer" },
                { id: "package", label: "Package" },
                { id: "bookingDate", label: "Booked Date" },

                { id: "cost", label: "Cost" },
                { id: "cash", label: "Cash" },
                { id: "card", label: "Card" },
                { id: "wallet", label: "Wallet" },
                { id: "totalcharge", label: "Total Charge(KWD)" },
              ]}
              // rowdata={this.state.tableData.length === 0 ? [] : this.state.tableData}
              rowdata={Tabledatas.length === 0 ? [] : Tabledatas}
              tableicon_align={""}
              modelopen={(e) => this.modelopen(e)}
              EditIcon="close"
              DeleteIcon="close"
              VisibilityIcon="close"
              grandtotal="total"
              grandtotal_value={this.getTotalKWD()}
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

export default RevenueDashboard;
