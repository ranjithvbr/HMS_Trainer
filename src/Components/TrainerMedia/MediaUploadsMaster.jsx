import React, { Component } from "react";
import plus from "../../Images/plus.png";
import "./MediaUploadsMaster.css";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import MediaUploadsModal from "./MediaUploadsModal";
import MediaUploadsTable from "./MediaUploadsTable";
import { Input, Select, Icon } from "antd";
import dateFormat from "dateformat";

export default class MediaUploadsMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
  };

  render() {
    const { Search } = Input;
    console.log(dateFormat(new Date(), "dd mmm yyyy"));
    return (
      <div>
        <div className="hms_trainer_header">
          <div className="media_title">MEDIA UPLOADS</div>
          <img
            className="plus-icon"
            src={plus}
            alt={"hi"}
            onClick={this.handleClickopen}
          />
        </div>

        <MediaUploadsTable />
        <div className="Upload-modal-container">
          <Modalcomp
            visible={this.state.open}
            closemodal={this.handleClickclose}
            title={"New Media Uploads"}
          >
            <MediaUploadsModal
              visible={this.state.open}
              closemodal={this.handleClickclose}
            />
          </Modalcomp>
        </div>
      </div>
    );
  }
}
