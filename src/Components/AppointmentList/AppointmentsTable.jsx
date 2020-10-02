import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./AppointmentsTable.css";

import Profilepage from "./Profilepage";
import links from "../../helpers/Constant";
import axios from "axios";
import dateFormat from "dateformat"

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
        // trainerCategoryId: "1",
        fromDate:dateFormat(new Date(),"yyyy-mm-dd"),
        toDate:dateFormat(new Date(),"yyyy-mm-dd"),
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
          var todate  = new Date(val.to_date)

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
            type1: "",
            time: val.from_time,

            customer: val.patientName,
            trainingcat: val.trainingCategoryName,
            training: val.trainingName,
            package: val.tr_package_name,
            sessions: session,
            id: val.trainerBookingId,
          });
          responseAllData.push(val);
        });

      self.setState({
        tableData: tableData,
        responseAllData: responseAllData,
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

  render() {
    return (
      <div>
        <div>
          <Tablecomponent
            heading={[
              { id: "", label: "S.No" },
              { id: "type1", label: "Type" },

              { id: "time", label: "Time" },
              { id: "customer", label: "Customer" },
              { id: "trainingcat", label: "Training Category" },
              { id: "training", label: "Training" },
              { id: "package", label: "Package" },
              { id: "sessions", label: "Sessions" },
              { id: "", label: "Action" },
            ]}
            rowdata={this.state.tableData}
            tableicon_align={"cell_eye"}
            modelopen={(e, currentid) => this.modelopen(e, currentid)}
            EditIcon="close"
            DeleteIcon="close"
            Workflow="close"
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
      </div>
    );
  }
}

export default DashboardTable;
