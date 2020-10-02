import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";

import "./RevenueTable.css";

class RevenueTable extends React.Component {
  state = {
    openview: false,
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

  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };

  render() {
    return (
      <div>
        <div><div className="mode_of_pay">Mode of payment</div></div>
       <div className="line_payment"><div className="inner_line"></div></div> 
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "trainingcat", label: "Training Category" },
            { id: "training", label: "Training" },
            { id: "package", label: "Package" },
            { id: "bookingDate", label: "Booked Date" },
            { id: "cost", label: "Cost" },
            { id: "cash", label: "Cash" },
            { id: "card", label: "Card" },
            { id: "wallet", label: "Wallet" },
            { id: "totalcharge", label: "Total Charge(KWD)" },
          ]}
          rowdata={[
            this.createData({
              customer: "Priya",
              trainingcat: "Indoor",
              training: "Fitness",
              package: "6 Pack Abs",
              bookingDate: "",
              cost: "100",
              cash: "0",
              card: "1000",
              wallet: "400",
              totalcharge: "1400",
              
            }),
          ]}
          tableicon_align={""}
          modelopen={(e) => this.modelopen(e)}
          EditIcon="close"
          DeleteIcon="close"
          VisibilityIcon="close"
          grandtotal="total"
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

export default RevenueTable;
