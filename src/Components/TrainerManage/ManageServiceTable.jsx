import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";

import "./ManageServiceTable.css";
import ManageServiceModal from "./ManageServiceModal";
import DeleteMedia from "./DeleteMedia";
import links from "../../helpers/Constant";
import axios from "axios";
import ManageViewModal from "./ManageViewModal";

class ManageServiceTable extends React.Component {
  state = {
    open: false,
    currentDeleteId: null,
    openview: false,
    tableData: [],
    responseAllData: [],
    viewdata: [],
    editdata: [],
    packageDetail: [],
    trainerId: localStorage.getItem("trainerId"),
  };

  componentDidMount() {
    alert('didcalled')
    this.getTableData();
  }

  componentWillReceiveProps() {
    console.log(this.props, "getdatacall");
    // this.getTableData();
    if (this.props.getdatacall) {
      alert('called')
      this.getTableData();
    }

    // if (this.props.refresh ==true) {
    //   alert('called')

    // }
  }

  handleClickclose = () => {
    this.setState({ open: false });
  };

  refresh = (data) => {

    this.closemodal(false)
    this.getTableData();
  };

  getTableData = () => {
    var self = this;
    axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/getTrainingManagePackageWeb",
      data: {
        trainerId: this.state.trainerId,
        trainingCategoryId: "1",
      },
    }).then((response) => {
      var tableData = [];
      var responseAllData = [];
      response.data.data.length > 0 &&
        response.data.data.map((val) => {
          tableData.push({
            category: val.training_category,
            training: val.training,
            totpack: val.packageCount,
            id: val.trainingId,
          });
          responseAllData.push(val);
        });
      self.setState(
        {
          tableData: tableData,
          responseAllData: responseAllData,
        },
        () => console.log("pushed", tableData)
      );
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getPackageDetail = (obj) => {
    console.log("obj", obj);
    var self = this;
    axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/getParticualarPackageListMobile",
      data: {
        trainerId: this.state.trainerId,
        trainingCategoryId: obj.trainingCategoryId,
        trainingId: obj.trainingId,
      },
    }).then((response) => {
      if (response.data.status == 1) {
        this.setState({ packageDetail: response.data.data });
      } else {
      }
    });
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
      self.setState({ open: false });
      self.getTableData();
    });
  };

  modelopen = (data, id) => {
    console.log("id", id);
    console.log(data);
    if (data === "view") {
      var viewdata = this.state.responseAllData.filter((viewdata) => {
        return viewdata.trainingId === id;
      });
      this.getPackageDetail(viewdata[0]);
      this.setState({ openview: true, viewdata: viewdata[0] });
    } else if (data === "edit") {
      var editdata = this.state.responseAllData.filter((editdata) => {
        return editdata.trainingId === id;
      });
      this.getPackageDetail(editdata[0]);
      console.log(editdata, "editdata");
      this.setState({ editopen: true, editdata: editdata[0] });
    } else if (data == "delete") {
    }
  };

  deleteopen = (id) => {
    console.log("id1", id);
    this.setState({ openview: false, open: true, currentDeleteId: id });
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false, packageDetail: [] });
  };

  render() {
    console.log(this.state.packageDetail, "tableData");
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "package", label: "Package" },
            { id: "cost", label: "Cost" },
            // { id: "category", label: "Training Category" },
            // { id: "training", label: "Training" },
            // { id: "totpack", label: "Total Package" },
            // { id: "", label: "Action" },
          ]}
          rowdata={this.state.tableData}
          modelopen={(e, currentid) => this.modelopen(e, currentid)}
          tableicon_align={""}
          DeleteIcon="close"
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
          title={this.state.viewdata.training_category}
          closemodal={(e) => this.closemodal(e)}
        >
          <div className="title_tag">{this.state.viewdata.training}</div>
          <ManageViewModal
            view={this.state.packageDetail}
            deleteopen={this.deleteopen}
          />
        </Modalcomp>

        <Modalcomp
          visible={this.state.editopen}
          clrchange="text_clr_change"
          closemodal={(e) => this.closemodal(e)}
        >
          <ManageServiceModal
            closemodal={(e) => this.closemodal(e)}
            refresh={(data) => this.refresh(data)}
            packageDetail={this.state.packageDetail}
            editdata={this.state.editdata}
            edithide={true}
          />
        </Modalcomp>
      </div>
    );
  }
}

export default ManageServiceTable;
