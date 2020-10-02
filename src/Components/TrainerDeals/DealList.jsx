import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import "./DealList.css";
import { Progress } from "antd";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
const data = [{ month: "Jan.", count: 69, city: "tokyo" }];
const scale = {
  month: { alias: "Month" },
  count: { alias: "Sales" }
};
export default class DealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }
  render() {
    return (
      <div className="deal_list_paper_maincontainer">
        <Grid container>
          <Grid item xs={12} md={12}>
            <Paper style={{ marginBottom: "3px" }}>
              <Grid container>
                <Grid item xs={12} md={6} className="deal_paper">
                  <div className="date_view">
                    <h5 className="list_test_report">6 Pack Abs</h5>
                  </div>
                  <div className="date_view">
                    <p>18 06 2020 - 20 07 2010</p>
                </div> 
                  <div>
                      <p>Amount : 30 KWD</p>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} className="deal_paper">
                  <h5 className="list_test_report">Flat 30 KWD off</h5>
                  <p className="view">Deal Active</p>
                  <div className="iconsdiv">
                    <EditIcon className="edit_icon_div" />
                    <DeleteIcon className="delete_icon_div" />
                  </div>
                </Grid>
              </Grid>
            </Paper>
            <Paper style={{ marginBottom: "3px" }}>
              <Grid container>
                <Grid item xs={12} md={6} className="deal_paper">
                  <div className="date_view">
                    <h5 className="list_test_report">Super Slim</h5>
                  </div>
                  <div className="date_view">
                    <p>18 06 2020 - 20 07 2010</p>
                  </div>
                  <div>
                      <p>Percentage: 10%</p>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} className="deal_paper">
                  <h5 className="list_test_report">10% off</h5>
                  <p className="view">Deal Active</p>
                  <div className="iconsdiv">
                    <EditIcon className="edit_icon_div" />
                    <DeleteIcon className="delete_icon_div" />
                  </div>
                </Grid>
              </Grid>
            </Paper>
       
          </Grid>
        </Grid>
      </div>
    );
  }
}
