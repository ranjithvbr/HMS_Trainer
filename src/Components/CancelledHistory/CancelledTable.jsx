import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";

import "./CancelledTable.css";

import links from "../../helpers/Constant";
import axios from "axios";
import moment from "moment";

class DashboardTable extends React.Component {
  state = {
    openview: false,
    tableData: [],
    responseAllData: [],
    viewdata: [],
    editdata: [],
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

  handleClickclose = () => {
    this.setState({ open: false });
  };

  getTableData = () => {
    var self = this;
    axios({
      method: "POST", //get method
      url: links.APIURL + "trainer/getAppointmentListBasedonDate",
      data: {
        trainerId: this.state.trainerId,
        date: "2020-06-13",
        trainerCategoryId: "1",
        limit: 10,
        pageno: 1,
      },
    }).then((response) => {
      var tableData = [];
      var responseAllData = [];
      response.data.data.length > 0 &&
        response.data.data[0].details.map((val) => {
          tableData.push({
            type1: "",
            time: val.from_time,

            customer: val.patientName,
            trainingcat: val.trainingCategoryName,
            training: val.trainingName,
            package: val.tr_package_name,
            booked: moment(val.book_date).format("LL"),
            cancelled: moment(val.book_date).format("LL"),
            // time: "",
            id: val.trainerBookingId,
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

  render() {
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "id", label: "S No" },
            { id: "type1", label: "Type" },
            { id: "time", label: "Time" },

            { id: "customer", label: "Customer" },
            { id: "trainingcat", label: "Training Category" },
            { id: "training", label: "Training" },
            { id: "package", label: "Package" },
            { id: "booked", label: "Booked Date" },
            { id: "cancelled", label: "Cancelled Date" },
          ]}
          rowdata={this.state.tableData}
          tableicon_align={""}
          modelopen={(e, currentid) => this.modelopen(e, currentid)}
          EditIcon="close"
          DeleteIcon="close"
          VisibilityIcon="close"
          Workflow="close"
        />
        <Modalcomp
          visible={this.state.editopen}
          title={"Edit details"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>
      </div>
    );
  }
}

export default DashboardTable;
