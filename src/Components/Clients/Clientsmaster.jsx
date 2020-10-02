import React, { Component } from "react";
import "./Clientsmaster.css";
import { Input } from "antd";
import Clientsdetails from "./Clientsdetails";

import dateFormat from "dateformat";
import Paper from "@material-ui/core/Paper";
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";

import "./Clientsdetails.css";
import Clientsmodal from "./clientsmodal";
import links from "../../helpers/Constant";
import axios from "axios";
import moment from "moment";
import WatchDetails from "../ClientWatch/WatchComp";

const { Search } = Input;

export default class Clientsmaster extends Component {
  state = {
    openview: false,
    tableData: [],
    responseAllData: [],
    viewdata: [],
    editdata: [],
    packageDetail: [],
    search: null,

    trainerId: localStorage.getItem("trainerId"),
    from_date: "",
    to_date: "",
  };

  componentDidMount() {
    this.getTableData();
  }

  componentWillReceiveProps() {
    console.log(this.props, "getdatacall");

    if (this.props.getdatacall) {
      this.getTableData();
    }
  }

  getPackageDetail = (obj) => {
    console.log("obj", obj);
    var self = this;
    axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/getTrainerParticularClientDetails",
      data: {
        trainerId: this.state.trainerId,
        patientId: obj.patientId,
      },
    }).then((response) => {
      console.log("response_data", response.data.data);
      if (response.data.status == 1) {
        this.setState({ packageDetail: response.data.data[0] });
      } else {
      }
    });
  };

  handleClickclose = () => {
    this.setState({ open: false });
  };
  searchChange = (e) => {
    this.setState({
      search: e.target.value,
    });
    this.setState({});
  };

  getTableData = () => {
    this.setState({props_loading:true})
    var self = this;
    axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/getTrainerClientList",
      data: {
        trainerId: this.state.trainerId,
        limit: 10,
        pageno: 1,
      },
    }).then((response) => {
      var tableData = [];
      var responseAllData = [];
      response.data.data.length > 0 &&
        response.data.data[0].details.map((val) => {
          tableData.push({
            customer: val.name,
            phonenumber: val.phone_no,

            id: val.patientId,
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

  getTrainerClientListByDate = () => {
    this.setState({props_loading:true})
    var self = this;
    axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/getTrainerClientListByDate",
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
            customer: val.name,
            phonenumber: val.phone_no,
            id: val.patientId,
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
    console.log("id", id);
    if (data === "view") {
      var viewdata = this.state.responseAllData.filter((viewdata) => {
        return viewdata.patientId === id;
      });
      this.getPackageDetail(viewdata[0]);
      this.setState({ openview: true, viewdata: viewdata[0] });
    } else if (data === "edit") {
      var editdata = this.state.responseAllData.filter((editdata) => {
        return editdata.lab_id === id;
      });

      console.log(editdata, "editdata");
      this.setState({ editopen: true, editdata: editdata });
    }else if(data === "watch"){
      this.setState({ watchdetailOpen: true});
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false, packageDetail: [],watchdetailOpen:false });
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
        this.getTrainerClientListByDate();
      }
    );
  };

  render() {
    const { Search } = Input;

    //SERACH FUNCTION
    const Tabledatas = this.state.tableData.filter((data) => {
      console.log(data, "Search_data");
      if (this.state.search === null) return data;
      else if (
        (data.customer != null &&
          data.customer
            .toLowerCase()
            .includes(this.state.search.toLowerCase())) ||
        (data.phonenumber != null &&
          data.phonenumber.toString().includes(this.state.search.toString()))
      ) {
        return data;
      }
    });
    return (
      <div className="trainer_appointment">
        <Paper>
          {/*APPOINTMENT HEADING  */}
          <div className="hms_trainer_header">
            <div className="center_headline">
              CLIENTS
            </div>

            {/* SEARCH AREA */}
            <div className="appointment_container">
              <div className="group_buttons_div">
                <DateRangeSelect
                  // dynalign={"dynalign"}
                  rangeDate={(item) => this.dateUpdate(item)}
                  // setselectedDate={this.state.tabindex}
                />
                {/* <ButtonGroup className="_trainer_clients_details" size="small" aria-label="small outlined button group">
                  <Button className="trainer_clients_details_first">This Week</Button>
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
              </div>
            </div>
          </div>
          {/* <Clientsdetails /> */}
          <div>
            {/* Table part */}
            <Tablecomponent
              heading={[
                { id: "", label: "S.No" },
                { id: "customer", label: "Customer" },
                { id: "phonenumber", label: "Phone Number" },
                { id: "action", label: "Action" },
              ]}
              tableicon_align={""}
              //  rowdata={this.state.tableData}
              rowdata={Tabledatas.length === 0 ? [] : Tabledatas}
              modelopen={(e, currentid) => this.modelopen(e, currentid)}
              DeleteIcon="close"
              EditIcon="close"
              props_loading={this.state.props_loading}
              WatchIcon = {"WatchIcon"}
            />
            <Modalcomp
              visible={this.state.openview}
              clrchange="text_clr_change"
              title={"CLIENTS"}
              closemodal={(e) => this.closemodal(e)}
            >
              <Clientsmodal
                viewdata={this.state.packageDetail}
                other={this.state.viewdata}
              />
            </Modalcomp>

            <Modalcomp
              visible={this.state.watchdetailOpen}
              clrchange="text_clr_change"
              title={"Watch Report"}
              closemodal={(e) => this.closemodal(e)}
            >
              <WatchDetails
              />
            </Modalcomp>
          </div>
        </Paper>
      </div>
    );
  }
}
