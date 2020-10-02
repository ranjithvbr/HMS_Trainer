import React from "react";
import "./printdata.css";

export default class PrintData extends React.Component {
  render() {
    console.log(this.props.printTableData, "printTableData");
    var printBodyData = this.props.printTableData.map((printdata, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{printdata.customer}</td>
          <td>{printdata.package}</td>

          <td>{printdata.cost}</td>
          <td>{printdata.cash}</td>
          <td>{printdata.card}</td>
          <td>{printdata.wallet}</td>
          <td>{printdata.totalcharge}</td>
          <td>{printdata.bookingDate}</td>
        </tr>
      );
    });

    return (
      <div className="printtabledata">
        <div className="printDataTitle">Revenue</div>
        <table>
          <thead>
            <th>S.No</th>
            <th>Customer</th>

            <th>Package</th>
            <th>Booked Date</th>

            <th>Cost</th>
            <th>Cash</th>
            <th>Card</th>
            <th>Wallet</th>
            <th>Total Charge(KWD)</th>
          </thead>
          <tbody>{printBodyData}</tbody>
        </table>
      </div>
    );
  }
}
