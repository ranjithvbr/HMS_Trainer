import React, { Component } from "react";
import "./ManageServiceMaster.css";
import "antd/dist/antd.css";
import Paper from "@material-ui/core/Paper";
import ManageServiceTable from "./ManageServiceTable";
import { Input } from "antd";
import dateFormat from "dateformat";
import plus from "../../Images/plus.png";
import ManageServiceModal from "./ManageServiceModal";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import Tablecomponent from "../../helpers/TableComponent/TableComp";

import "./ManageServiceTable.css";
import DeleteMedia from "./DeleteMedia";
import links from "../../helpers/Constant";
import axios from "axios";
import ManageViewModal from "./ManageViewModal";
import Modal from "./modal";
import { notification } from "antd";
const current_date = dateFormat(new Date(), "dd mmm yyyy");

class ManageServiceMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      date: "rrr",
      refresh: false,
      open: false,
      currentDeleteId: null,
      openview: false,
      tableData: [],
      responseAllData: [],
      viewdata: [],
      editdata: [],
      packageDetail: [],
      search: null,
      trainerId: localStorage.getItem("trainerId"),
      userdata: JSON.parse(localStorage.getItem("trainer")),
    };
  }
  plusopen = () => {
    this.setState({ openmodal: true });
  };
  closemodal = () => {
    this.setState({
      openmodal: false,
      openview: false,
      editopen: false,
      packageDetail: [],
    });
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

  handleClickclose = () => {
    this.setState({ open: false });
  };

  refresh = () => {
    this.getTableData();
  };

  getTableData = () => {
    this.setState({props_loading:true})
    var self = this;
    axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/getTrainingManagePackageWeb",
      data: {
        trainerId: this.state.trainerId,
        trainingCategoryId: this.state.userdata.tr_training_category_id,
        trainingId: this.state.userdata.tr_training_id,
      },
    }).then((response) => {
      var tableData = [];
      var responseAllData = [];
      response.data.data.length > 0 &&
        response.data.data.map((val) => {
          tableData.push({
            packageName: val.packageName,
            cost: val.cost,
            id: val.packageId,
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

  handleClose = () => {
    this.setState({ open: false });
  };

  generateAlert = (description) => {
    notification.success({
      message: "Success",
      description,
    });
  };

  getPackageDetail = (obj) => {
    console.log("obj", obj);
    var self = this;
    axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/getPackageById",
      data: {
        trainerId: this.state.trainerId,
        trainingCategoryId: obj.trainingCategoryId,
        trainingId: obj.trainingId,
        packageId: obj.packageId,
      },
    }).then((response) => {
      if (response.data.status == 1) {
        this.setState({ packageDetail: response.data.data });
      } else {
      }
    });
  };
  searchChange = (e) => {
    this.setState({
      search: e.target.value,
    });
    this.setState({});
  };
  deleteDealLIst = () => {
    var self = this;
    axios({
      method: "DELETE",
      url: links.APIURL + "trainer/deleteManagePackage",
      data: {
        id: this.state.currentDeleteId,
      },
    }).then((response) => {
      if(response.status == 1){
        self.generateAlert("Manage Package Deleted Successfully")
        }else if(response.data.status == 0){
        self.generateAlert("This Package is Booked")
        }
      self.setState({ open: false });
      self.getTableData();
    });
  };

  modelopen = (data, id) => {
    console.log("id", id);
    console.log(data);
    if (data === "view") {
      var viewdata = this.state.responseAllData.filter((viewdata) => {
        return viewdata.packageId === id;
      });
      this.getPackageDetail(viewdata[0]);
      this.setState({ openview: true, viewdata: viewdata[0] });
    } else if (data === "edit") {
      var editdata = this.state.responseAllData.filter((editdata) => {
        return editdata.packageId === id;
      });
      this.getPackageDetail(editdata[0]);
      console.log(editdata, "editdata");
      this.setState({ editopen: true, editdata: editdata[0] });
    } else if (data == "delete") {
    }
  };

  deleteopen = (data, id) => {
    console.log("id1", id);
    this.setState({ openview: false, open: true, currentDeleteId: id });
  };

  // closemodal = () => {
  //   this.setState({ openview: false, editopen: false, packageDetail: [] });
  // };

  render() {
    const { Search } = Input;
    console.log(dateFormat(new Date(), "dd mmm yyyy"));
    console.log(this.state.packageDetail, "tableData");
    //SERACH FUNCTION
    const Tabledatas = this.state.tableData.filter((data) => {
      console.log(data, "Search_data");
      if (this.state.search === null) return data;
      else if (
        (data.packageName != null &&
          data.packageName
            .toLowerCase()
            .includes(this.state.search.toLowerCase())) ||
        (data.cost != null &&
          data.cost.toString().includes(this.state.search.toString()))
        //   ||
        // (data.totpack != null &&
        //   data.totpack.toString().includes(this.state.search.toString()))
      ) {
        return data;
      }
    });

    return (
      <div className="trainer_manage">
        <Paper>
          {/*APPOINTMENT HEADING  */}
          <div
            className="hms_trainer_header
"
          >
            <div className="titleuser">
              <div>
                MANAGE PACKAGE {"   "}{" "}
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
                </div>{" "}
              </div>
            </div>

            {/* SEARCH AREA */}
            <div className="manage_container">
              <div className="group_buttons_div">
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
                <div className="plus_icon_parent">
                  <img
                    className="plus-icon"
                    src={plus}
                    onClick={this.plusopen}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <ManageServiceTable refresh={this.state.refresh} /> */}
          <div>
            <Tablecomponent
              heading={[
                { id: "", label: "S.No" },
                { id: "packageName", label: "Package" },
                { id: "cost", label: "Cost" },
                { id: "", label: "Action" },
              ]}
              //  rowdata={this.state.tableData}
              rowdata={Tabledatas.length === 0 ? [] : Tabledatas}
              modelopen={(e, currentid) => this.modelopen(e, currentid)}
              deleteopen={this.deleteopen}
              tableicon_align={""}
              Workflow="close"
              props_loading={this.state.props_loading}
            />

            <Modalcomp
              xswidth={"xs"}
              clrchange="textclr"
              title="Delete Package"
              visible={this.state.open}
              closemodal={this.handleClose}
            >
              <DeleteMedia
                deleteitem={this.deleteDealLIst}
                closeDeleteModel={this.handleClose}
              />
            </Modalcomp>

            <Modalcomp
              visible={this.state.openview}
              clrchange="text_clr_change"
              title={<div className="package_title">Package Details</div>}
              // title={this.state.viewdata.training_category}
              closemodal={(e) => this.closemodal(e)}
            >
              {/* <div className="title_tag">{this.state.viewdata.training}</div> */}
              <ManageViewModal
                trainingcategory={this.state.viewdata.training_category}
                training={this.state.viewdata.training}
                view={this.state.packageDetail}
                deleteopen={this.deleteopen}
              />
            </Modalcomp>

            <Modalcomp
              title="EDIT PACKAGE"
              visible={this.state.editopen}
              clrchange="text_clr_change"
              closemodal={(e) => this.closemodal(e)}
            >
              <ManageServiceModal
                closemodal={(e) => this.closemodal(e)}
                refresh={() => this.refresh()}
                packageDetail={this.state.packageDetail}
                editdata={this.state.editdata}
                edithide={true}
              />
            </Modalcomp>
          </div>
        </Paper>

        <Modalcomp
          title="ADD PACKAGE"
          visible={this.state.openmodal}
          clrchange="text_clr_change"
          closemodal={(e) => this.closemodal(e)}
        >
          <ManageServiceModal
            edithide={false}
            closemodal={(e) => this.closemodal(e)}
            refresh={() => this.refresh()}
          />
        </Modalcomp>
      </div>
    );
  }
}

export default ManageServiceMaster;
