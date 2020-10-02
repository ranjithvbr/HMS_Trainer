import React from "react";
import { Tabs } from "antd";
import "./WebchatMaster.css";
import MessageMaster from "./MessageMaster";
import MyVenue from "./MyVenue/MyVenue";
import OtherVenue from "./OtherVenue/OtherVenue";
import ProfileSearch from "./ProfileSearch";

class WebchatMaster extends React.Component {
  callback = key => {
    console.log(key);
  };
  render() {
    const { TabPane } = Tabs;

    return (
      <div className="web-chat-tab">
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="My Venues" key="1">
            <ProfileSearch />
            <MyVenue />
          </TabPane>
          <TabPane tab="Other Venues" key="2">
            <ProfileSearch />
            <OtherVenue />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default WebchatMaster;
