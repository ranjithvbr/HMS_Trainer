import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";

import "./Clientsdetails.css";
import Clientsmodal from "./clientsmodal";
import links from "../../helpers/Constant";
import axios from "axios";

class Clientsdetails extends React.Component {
  state = {
    openview: false,
    tableData: [],
    responseAllData: [],
    viewdata: [],
    editdata: [],
    packageDetail: [],
    trainerId: localStorage.getItem("trainerId"),
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

  getTableData = () => {
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
        },
        () => console.log("pushed", tableData)
      );
    });
  };

  modelopen = (data, id) => {
    console.log("id", id);
    if (data === "view") {
      alert()
      var viewdata = this.state.responseAllData.filter((viewdata) => {
        return viewdata.patientId === id;
      });
      this.getPackageDetail(viewdata[0]);
      this.setState({ openview: true, viewdata: viewdata[0] });
      console.log('viewdata',viewdata[0])
    } else if (data === "edit") {
      var editdata = this.state.responseAllData.filter((editdata) => {
        return editdata.lab_id === id;
      });

      console.log(editdata, "editdata");
      this.setState({ editopen: true, editdata: editdata });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false, packageDetail: [] });
  };
  render() {
    return (
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
          rowdata={this.state.tableData}
          modelopen={(e, currentid) => this.modelopen(e, currentid)}
          DeleteIcon="close"
        />
        <Modalcomp
          visible={this.state.openview}
          clrchange="text_clr_change"
          title={"CLIENTS"}
          closemodal={(e) => this.closemodal(e)}
        >
          <Clientsmodal viewdata={this.state.packageDetail} other={this.state.viewdata} />
        </Modalcomp>
      </div>
    );
  }
}

export default Clientsdetails;
