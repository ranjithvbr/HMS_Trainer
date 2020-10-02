import React from "react";
import "./printdata.css";

export default class PrintData extends React.Component {
  render() {
    console.log(this.props.printTableData, "printTableData");
    var printBodyData = this.props.printTableData.map((printdata, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{printdata.type1.includes("1")?"Home":printdata.type1.includes("2")?"Online":"Center"}</td>
          <td>{printdata.customer}</td>
          <td>{printdata.package}</td>
          <td>{printdata.booked}</td>
          <td>{printdata.cancelled}</td>
          <td>{printdata.time}</td>
        </tr>
      );
    });

    return (
      <div className="printtabledata">
        <div className="printDataTitle">Manage Appointments</div>
        <table>
          <thead>
            <th>S.No</th>
            <th>Type</th>
            <th>Customer</th>
            <th>Package</th>
            <th>Booked Date</th>
            <th>Cancelled Date</th>
            <th>Time</th>
          </thead>
          <tbody>{printBodyData}</tbody>
        </table>
      </div>
    );
  }
}
