import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import { Tabs } from "antd";
import Checkbox from "@material-ui/core/Checkbox";
import "./BookingDetails.css";
import DealList from "./DealList";
import Calendar from "../AdvertisementBooking/Calendar";

export default class BookingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }
  callback = (key) => {
    console.log(key);
  };
  render() {
    const { TabPane } = Tabs;
    return (
      <div className="deals_create_tab">
        <Grid container>
          <Grid item xs={12} md={6}>
            <Calendar />
          </Grid>
          <Grid item xs={12} md={6}>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="Create Deals" key="1" className="deals_tab_align">
                <div className="container">
                  <Grid container className="create_deal_tab">
                    <Grid item xs={6} md={6}>
                      <Labelbox type="select" labelname="Package" value="All" />
                      <Labelbox type="datepicker" labelname="Valid From" />

                      <div>
                        <Labelbox
                          type="radio"
                          className="radio_button"
                          labelname="Deal Options"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} md={6} className="deal_container">
                      <Labelbox
                        type="text"
                        labelname="Deal Title"
                        value="Flat off 5%"
                        width={"90%"}
                      />
                      <div className="validdate_picker">
                        <div className="datepicker_active">
                          <Labelbox type="datepicker" labelname="Valid To" />
                        </div>
                        <div className="Deal_activecheck">
                          <Checkbox className="Deal_active_check" />
                          <span>Deal Active</span>
                        </div>
                      </div>
                      <div className="Deal_activecheck">
                        <Labelbox
                          type="text"
                          value="30"
                          width={"90%"}
                          className="Deal_active_check"
                        />
                        <span>Deal Active</span>
                      </div>
                    </Grid>
                    {/* <Grid item xs={6} md={6}></Grid> */}
                    <Grid item xs={12} md={12}>
                      <div className="createbutton-container">
                        <Button className="create_cancel">Cancel</Button>
                        <Button
                          className="media_save"
                          onClick={() => this.props.closemodal(false)}
                        >
                          Save
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </TabPane>
              <TabPane tab="Deal List" key="2">
                <DealList />
              </TabPane>
            </Tabs>
            <div></div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
